export const startupPrompt = (startup)=>`
Analyze this startup.

Title:
${startup.basics.title}

Domain:
${startup.basics.domain}

Problem:
${startup.problem.problem}

Solution:
${startup.solution.solution}

Market:
${startup.market.targetAudience}

Business:
${startup.business.revenueModel}

Return ONLY JSON.
`;