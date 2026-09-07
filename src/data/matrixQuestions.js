export const matrixQuestions = {
  problem: {
    title: "Problem discovery",
    eyebrow: "01 / Problem",
    purpose: "Find out whether the problem is meaningful before you fall in love with the solution.",
    questions: [
      { id: "problem_description", type: "longText", label: "What exactly is happening for the person you want to help?", placeholder: "Describe the moment when this problem appears.", required: true },
      { id: "problem_frequency", type: "scale", label: "How frequently does this problem occur?", options: ["Rarely", "Sometimes", "Often", "Daily"] },
      { id: "problem_severity", type: "scale", label: "How painful is it when it happens?", options: ["Minor", "Uncomfortable", "Serious", "Critical"] },
      { id: "problem_evidence", type: "evidence", label: "What evidence supports this problem today?" },
    ],
  },
  customer: {
    title: "Customer discovery",
    eyebrow: "02 / Customer",
    purpose: "A broad audience is a starting point, not a customer segment.",
    questions: [
      { id: "primary_customer", type: "longText", label: "Who experiences this problem most often?", placeholder: "Describe one specific person and their context.", required: true },
      { id: "customer_role", type: "singleChoice", label: "Who uses and benefits from the solution?", options: ["Student or individual", "Team or organization", "Parent or buyer", "Institution or administrator", "Not sure yet"] },
      { id: "customer_payment", type: "singleChoice", label: "Who would pay or enable access?", options: ["The user", "An employer or organization", "An institution", "A sponsor or advertiser", "Not sure yet"] },
      { id: "customer_evidence", type: "evidence", label: "How much direct customer evidence do you have?" },
    ],
  },
  solution: {
    title: "Solution validation",
    eyebrow: "03 / Solution",
    purpose: "Connect the solution to the problem instead of listing features.",
    questions: [
      { id: "solution_description", type: "longText", label: "How does your solution directly change that moment?", placeholder: "Explain the smallest useful version and what it replaces.", required: true },
      { id: "solution_stage", type: "singleChoice", label: "What is the current development stage?", options: ["Only an idea", "Prototype", "MVP", "In use by early users", "Growing product"] },
      { id: "solution_difference", type: "longText", label: "What makes this meaningfully different from existing tools?", placeholder: "Name the specific advantage, not just the feature." },
      { id: "solution_confidence", type: "confidence", label: "How confident are you that this solves the problem?" },
    ],
  },
  market: {
    title: "Market opportunity",
    eyebrow: "04 / Market",
    purpose: "Explore reachability and timing, not just a giant market number.",
    questions: [
      { id: "first_users", type: "longText", label: "Where could your first 100 users realistically come from?", placeholder: "Describe the community, channel, or moment where you can reach them.", required: true },
      { id: "market_growth", type: "scale", label: "How strong is the market timing or growth signal?", options: ["Weak", "Emerging", "Growing", "Urgent"] },
      { id: "market_barrier", type: "longText", label: "What could slow adoption?", placeholder: "Think about trust, switching costs, access, or regulation." },
      { id: "market_evidence", type: "evidence", label: "What market evidence do you have?" },
    ],
  },
  competition: {
    title: "Competition",
    eyebrow: "05 / Competition",
    purpose: "Your real competitor may be a workaround, spreadsheet, or doing nothing.",
    questions: [
      { id: "current_alternatives", type: "longText", label: "What do people use today instead?", placeholder: "Include direct competitors, workarounds, and doing nothing.", required: true },
      { id: "difference_axis", type: "singleChoice", label: "Where can you be meaningfully different first?", options: ["Price", "Speed", "Quality", "Access", "Experience", "Distribution", "Not sure yet"] },
      { id: "copy_risk", type: "scale", label: "How easy would it be for an existing competitor to copy this?", options: ["Very easy", "Possible", "Difficult", "Very difficult"] },
      { id: "competition_evidence", type: "evidence", label: "How well have you researched alternatives?" },
    ],
  },
  business: {
    title: "Business viability",
    eyebrow: "06 / Business",
    purpose: "Separate what could work from what you are currently assuming.",
    questions: [
      { id: "business_model", type: "singleChoice", label: "How might this become viable?", options: ["Subscription", "Transaction fee", "B2B contract", "Marketplace", "Advertising or sponsorship", "Not sure yet"] },
      { id: "pricing_signal", type: "longText", label: "What makes you believe someone will pay or enable this?", placeholder: "Name the value and the signal behind your belief." },
      { id: "cost_risk", type: "longText", label: "What cost assumption worries you most?", placeholder: "Technology, people, distribution, operations, or something else?" },
      { id: "business_confidence", type: "confidence", label: "How confident are you in the business model?" },
    ],
  },
  feasibility: {
    title: "Feasibility",
    eyebrow: "07 / Feasibility",
    purpose: "A promising idea still needs a path to becoming real.",
    questions: [
      { id: "hardest_build", type: "longText", label: "What is the hardest part to build or operate?", placeholder: "Name the biggest technical or operational constraint.", required: true },
      { id: "technical_feasibility", type: "scale", label: "How technically feasible is the first version?", options: ["Unknown", "Hard", "Possible", "Straightforward"] },
      { id: "resources", type: "singleChoice", label: "Do you have access to the resources needed for a first test?", options: ["Yes, already", "Partially", "Not yet", "I do not know"] },
      { id: "feasibility_evidence", type: "evidence", label: "What feasibility evidence do you have?" },
    ],
  },
  risk: {
    title: "Risk map",
    eyebrow: "08 / Risk",
    purpose: "Make the riskiest assumptions visible while they are still cheap to test.",
    questions: [
      { id: "riskiest_assumption", type: "longText", label: "What has to be true for this idea to work?", placeholder: "Write the assumption that would most damage the idea if wrong.", required: true },
      { id: "risk_probability", type: "scale", label: "How likely is that assumption to be wrong?", options: ["Unlikely", "Possible", "Likely", "Very likely"] },
      { id: "risk_impact", type: "scale", label: "How damaging would that be?", options: ["Low", "Moderate", "High", "Critical"] },
      { id: "risk_mitigation", type: "longText", label: "What is the cheapest way to test it?", placeholder: "Describe an experiment or conversation." },
    ],
  },
};

export const matrixOrder = Object.keys(matrixQuestions);
