import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { saveStartup, updateStartup, getStartup } from "../services/startupService";

import WizardProgress from "../components/wizard/WizardProgress";
import WizardButtons from "../components/wizard/WizardButtons";

import Step1Basics from "../components/wizard/Step1Basics";
import Step2Problem from "../components/wizard/Step2Problem";
import Step3Solution from "../components/wizard/Step3Solution";
import Step4Market from "../components/wizard/Step4Market";
import Step5Business from "../components/wizard/Step5Business";


export default function StartupWizard() {

        const navigate = useNavigate();
        const { id } = useParams();
        const isEditMode = !!id;
        const [step, setStep] = useState(1);

const [formData, setFormData] = useState({
  // Step 1
  title: "",
  domain: "",
  elevatorPitch: "",

  // Step 2
  problem: "",
  affectedUsers: "",
  frequency: "",
  importance: "",

  // Step 3
  solution: "",
  uniqueness: "",
  technology: "",

  // Step 4
  targetAudience: "",
  competitors: "",
  competitiveAdvantage: "",

  // Step 5
  expectedImpact: "",
  revenueModel: "",
  vision: "",
});
useEffect(() => {
  if (!isEditMode) return;
  let active = true;
  getStartup(id).then((startup) => {
    if (active && startup) {
      setFormData({
        title: startup.basics.title,
        domain: startup.basics.domain,
        elevatorPitch: startup.basics.elevatorPitch,

        problem: startup.problem.problem,
        affectedUsers: startup.problem.affectedUsers,
        frequency: startup.problem.frequency,
        importance: startup.problem.importance,

        solution: startup.solution.solution,
        uniqueness: startup.solution.uniqueness,
        technology: startup.solution.technology,

        targetAudience: startup.market.targetAudience,
        competitors: startup.market.competitors,
        competitiveAdvantage:
          startup.market.competitiveAdvantage,

        expectedImpact:
          startup.business.expectedImpact,

        revenueModel:
          startup.business.revenueModel,

        vision:
          startup.business.vision,
      });
    }
  }).catch((error) => console.log(error));
  return () => {
    active = false;
  };
}, [id, isEditMode]);
const saveDraft = () => {
  console.log("Saving Draft...");
};
const finishStartup = async () => {
  try {

    if (isEditMode) {

      await updateStartup(id, formData);

      alert("✅ Startup updated!");

    } else {

      await saveStartup(formData);

      alert("🎉 Startup created!");

    }

    navigate("/my-ideas");

  } catch (error) {

    console.log(error);

    alert("Failed!");

  }
};

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-5xl font-bold mb-2">
        🚀 Create Startup
      </h1>

      <WizardProgress step={step} />

      {step === 1 && (<Step1Basics formData={formData} setFormData={setFormData}/>)}
      {step === 2 && (<Step2Problem formData={formData} setFormData={setFormData}/>)}
      {step === 3 && (<Step3Solution formData={formData} setFormData={setFormData}/>)}
      {step === 4 && (<Step4Market formData={formData} setFormData={setFormData}/>)}
      {step === 5 && (<Step5Business formData={formData} setFormData={setFormData}/>)}

      <WizardButtons
            step={step}
            setStep={setStep}
            onSaveDraft={saveDraft}
            onFinish={finishStartup}
        />

    </div>
    
  );
}
