import { auth, db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const emptyWorkflow = {
  currentStage: "understand",
  currentMatrix: null,
  progress: 0,
  completedMatrices: [],
};

export const createRawIdea = async (rawIdea) => {
  if (!auth.currentUser) {
    throw new Error("You must be signed in to start a discovery journey.");
  }

  const now = new Date().toISOString();
  return await addDoc(collection(db, "ideas"), {
    studentId: auth.currentUser.uid,
    studentEmail: auth.currentUser.email,
    status: "draft",
    currentStep: 0,
    submittedForAI: false,
    mentorStatus: "pending",
    incubationStatus: "not_recommended",
    createdAt: now,
    updatedAt: now,
    basics: {
      rawIdea,
      title: "",
      domain: "",
      elevatorPitch: "",
    },
    discovery: {
      problem: {},
      customer: {},
      solution: {},
      market: {},
      competition: {},
      business: {},
      feasibility: {},
      risk: {},
    },
    assumptions: [],
    evidence: [],
    refinements: [{ version: 1, label: "Raw idea", statement: rawIdea, createdAt: now }],
    validation: { missions: [] },
    scores: {
      problem: 0,
      customer: 0,
      solution: 0,
      differentiation: 0,
      market: 0,
      competition: 0,
      business: 0,
      feasibility: 0,
      evidence: 0,
      risk: 0,
      overallReadiness: 0,
      ideaQuality: 0,
      evidenceConfidence: 0,
    },
    analysis: { swot: {}, recommendations: [] },
    blueprint: {},
    workflow: emptyWorkflow,
  });
};

export const updateWorkflow = async (id, workflow) => {
  if (!auth.currentUser) {
    throw new Error("You must be signed in to update your discovery journey.");
  }

  await updateDoc(doc(db, "ideas", id), {
    workflow,
    updatedAt: new Date().toISOString(),
  });
};

export const saveStartup = async (formData) => {
  return await addDoc(collection(db, "ideas"), {
    studentId: auth.currentUser.uid,
    studentEmail: auth.currentUser.email,

   // Workflow Status
status: "draft",
currentStep: 5,

// AI & Review Status
submittedForAI: false,
mentorStatus: "pending",
incubationStatus: "not_recommended",

// Timestamps
createdAt: new Date().toISOString(),
updatedAt: new Date().toISOString(),
    basics: {
      title: formData.title,
      domain: formData.domain,
      elevatorPitch: formData.elevatorPitch,
    },

    problem: {
      problem: formData.problem,
      affectedUsers: formData.affectedUsers,
      frequency: formData.frequency,
      importance: formData.importance,
    },

    solution: {
      solution: formData.solution,
      uniqueness: formData.uniqueness,
      technology: formData.technology,
    },

    market: {
      targetAudience: formData.targetAudience,
      competitors: formData.competitors,
      competitiveAdvantage: formData.competitiveAdvantage,
    },

    business: {
      expectedImpact: formData.expectedImpact,
      revenueModel: formData.revenueModel,
      vision: formData.vision,
    },
  });
};
export const getStartup = async (id) => {
  const docRef = doc(db, "ideas", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  }

  return null;
};

export const updateStartup = async (id, formData) => {

  const docRef = doc(db, "ideas", id);

  await updateDoc(docRef, {

    updatedAt: new Date().toISOString(),

    basics: {
      title: formData.title,
      domain: formData.domain,
      elevatorPitch: formData.elevatorPitch,
    },

    problem: {
      problem: formData.problem,
      affectedUsers: formData.affectedUsers,
      frequency: formData.frequency,
      importance: formData.importance,
    },

    solution: {
      solution: formData.solution,
      uniqueness: formData.uniqueness,
      technology: formData.technology,
    },

    market: {
      targetAudience: formData.targetAudience,
      competitors: formData.competitors,
      competitiveAdvantage: formData.competitiveAdvantage,
    },

    business: {
      expectedImpact: formData.expectedImpact,
      revenueModel: formData.revenueModel,
      vision: formData.vision,
    },

  });

};

export const deleteStartup = async (id) => {
  await deleteDoc(doc(db, "ideas", id));
};