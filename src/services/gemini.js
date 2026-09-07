import { getGenerativeModel } from "firebase/ai";
import { ai } from "./firebase";

const generateStartupAnalysis = getGenerativeModel(ai, {
	model: "gemini-2.5-flash",
	generationConfig: {
		temperature: 0.3,
		responseMimeType: "application/json",
		responseJsonSchema: {
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
		},
	},
});

export async function analyzeStartup(startup) {
	if (!startup) return null;

	const result = await generateStartupAnalysis.generateContent(`
You are VP-One, a rigorous but constructive startup discovery coach.
Analyze the founder's current evidence, not just the idea's promise. Do not invent market facts,
competitors, traction, or customer behavior. Clearly label uncertainty in weaknesses and threats.
Return practical next missions that produce observable evidence within two weeks.

Startup context:
${JSON.stringify({
		basics: startup.basics,
		discovery: startup.discovery,
		assumptions: startup.assumptions,
		refinements: startup.refinements,
		scores: startup.scores,
	}).slice(0, 18000)}
`);

	return JSON.parse(result.response.text());
}