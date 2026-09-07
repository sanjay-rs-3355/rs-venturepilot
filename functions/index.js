const { GoogleGenerativeAI } = require("@google/generative-ai");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

const geminiApiKey = defineSecret("GEMINI_API_KEY");

const responseShape = {
  type: "object",
  properties: {
    summary: { type: "string" },
    swot: {
      type: "object",
      properties: {
        strengths: { type: "array", items: { type: "string" } },
        weaknesses: { type: "array", items: { type: "string" } },
        opportunities: { type: "array", items: { type: "string" } },
        threats: { type: "array", items: { type: "string" } },
      },
      required: ["strengths", "weaknesses", "opportunities", "threats"],
    },
    missions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          why: { type: "string" },
          method: { type: "string" },
          success: { type: "string" },
        },
        required: ["id", "title", "why", "method", "success"],
      },
    },
  },
  required: ["summary", "swot", "missions"],
};

function cleanStartup(startup) {
  return JSON.stringify(startup).slice(0, 18000);
}

function parseModelJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("Gemini returned no JSON object.");
  return JSON.parse(candidate.slice(start, end + 1));
}

function isValidAnalysis(value) {
  const sections = ["strengths", "weaknesses", "opportunities", "threats"];
  return Boolean(
    value &&
      typeof value.summary === "string" &&
      value.swot &&
      sections.every((section) => Array.isArray(value.swot[section])) &&
      Array.isArray(value.missions) &&
      value.missions.length > 0 &&
      value.missions.every((mission) =>
        ["id", "title", "why", "method", "success"].every((key) => typeof mission[key] === "string")
      )
  );
}

exports.generateStartupAnalysis = onCall(
  { secrets: [geminiApiKey], enforceAppCheck: false },
  async (request) => {
    if (!request.auth) throw new HttpsError("unauthenticated", "Sign in to generate startup analysis.");

    const startup = request.data?.startup;
    if (!startup) throw new HttpsError("invalid-argument", "Startup context is required.");

    const model = new GoogleGenerativeAI(geminiApiKey.value()).getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.3,
        responseMimeType: "application/json",
        responseSchema: responseShape,
      },
    });

    const result = await model.generateContent(`
You are VP-One, a rigorous but constructive startup discovery coach.
Analyze the founder's current evidence, not just the idea's promise. Do not invent market facts,
competitors, traction, or customer behavior. Clearly label uncertainty in weaknesses and threats.
Return practical next missions that produce observable evidence within two weeks.

Startup context:
${cleanStartup(startup)}
`);

    try {
      const analysis = parseModelJson(result.response.text());
      if (!isValidAnalysis(analysis)) throw new Error("Gemini returned an invalid analysis shape.");
      return analysis;
    } catch (error) {
      throw new HttpsError("internal", error.message || "Could not parse AI analysis.");
    }
  }
);
