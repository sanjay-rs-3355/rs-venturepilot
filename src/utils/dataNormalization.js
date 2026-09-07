export function normalizeStartup(startup) {
  if (!startup) return null;

  const basics = startup.basics || {};
  const problem = startup.problem || {};
  const solution = startup.solution || {};
  const market = startup.market || {};
  const business = startup.business || {};

  return {
    ...startup,
    basics: {
      ...basics,
      rawIdea: basics.rawIdea || startup.problemStatement || startup.title || "",
      title: basics.title || startup.title || "",
      domain: basics.domain || startup.domain || "",
      elevatorPitch: basics.elevatorPitch || "",
    },
    problem: {
      ...problem,
      problem: problem.problem || startup.problemStatement || "",
      affectedUsers: problem.affectedUsers || startup.targetAudience || "",
    },
    solution: {
      ...solution,
      solution: solution.solution || startup.solution || "",
    },
    market: {
      ...market,
      targetAudience: market.targetAudience || startup.targetAudience || "",
    },
    business: {
      ...business,
      expectedImpact: business.expectedImpact || startup.expectedImpact || "",
    },
    discovery: startup.discovery || {},
    assumptions: startup.assumptions || [],
    evidence: startup.evidence || [],
    refinements: startup.refinements || [],
    scores: startup.scores || {},
    workflow: startup.workflow || {
      currentStage: "understand",
      currentMatrix: null,
      progress: 0,
      completedMatrices: [],
    },
  };
}