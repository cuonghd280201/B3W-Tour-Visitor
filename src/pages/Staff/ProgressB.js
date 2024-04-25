import React, { useState } from 'react';
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import Step1Form from "./Form/Step1Form";
import Step2Form from "./Form/Step2Form";
import Step3Form from "./Form/Step3Form";
import Step4Form from "./Form/Step4Form";
import Step5Form from "./Form/Step5Form";

import { Steps, Button, message } from 'antd';
const { Step } = Steps;


export const ProgressB = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const onNextStep = (stepName, data) => {
    // Update formData with data from the current step
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));

    // Move to the next step
    switch (stepName) {
      case 'step2form':
        setCurrentStep(1);
        break;
      case 'step3form':
        setCurrentStep(2);
        break;
      case 'step4form':
        setCurrentStep(3);
        break;
      case 'step5form':
        setCurrentStep(4);
        break;
      default:
        setCurrentStep(0);
        break;
    }
  };

  const onPrevStep = () => {
    // Go back to the previous step
    if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
    }
};

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1Form onButtonClick={onNextStep} {...formData} />;
      case 1:
        return <Step2Form onButtonClick={onNextStep} {...formData} />;
      case 2:
        return <Step3Form onButtonClick={onNextStep} {...formData} />;
      case 3:
        return <Step4Form onButtonClick={onNextStep} {...formData} />;
      case 4:
        return <Step5Form {...formData} />;
      default:
        return <Step1Form onButtonClick={onNextStep} {...formData} />;
    }
  };

  return (
    <div>
      <Steps current={currentStep}>
        <Step title="Bước 1" />
        <Step title="Bước 2" />
        <Step title="Bước 3" />
        <Step title="Bước 4" />
        <Step title="Bước 5" />
      </Steps>

      {renderStep()}

      <div style={{ marginTop: 24 }}>
        {currentStep > 0 && (
          <Button style={{ marginRight: 8 }} onClick={onPrevStep}>
            Trở lại
          </Button>
        )}
        {currentStep === 4 && (
          <Button type="primary" onClick={() => message.success('Đã hoàn thành!')}>
            Hoàn thành
          </Button>
        )}
      </div>

    </div>
  );
};
