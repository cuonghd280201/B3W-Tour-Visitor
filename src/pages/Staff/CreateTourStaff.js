import React, { useState } from "react";
import { Layout, Button } from "antd";
import NavBarWebStaff from "./Navbar/NavBarWebStaff";
import SiderBarWebStaff from "./SlideBar/SiderBarWebStaff";
import Footer from "../../layout/CommonLayout/Footer";
import Step1Form from "../Staff/Form/Step1Form";
import Step2Form from "../Staff/Form/Step2Form";
import Step3Form from "../Staff/Form/Step3Form";
import Step4Form from "../Staff/Form/Step4Form";
import Step5Form from "../Staff/Form/Step5Form";
import Step6Form from "../Staff/Form/Step6Form";
import tourServices from "../../services/tour.services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const CreateTourStaff = () => {
    // Initialize form data with default values
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        step1Data: {
            title: "",
            starLocation: "",
            endLocation: "",
            description: "",
            price: "",
            coverImage: "",
            city: "",
        },
        step2Data: {
            listTourSchedule: [],
        },
        step3Data: {
            time: "",
            vehicle: "",
            location: "",
            food: "",
            hotel: "",
        },
        step4Data: {
            tourTimeCreateFormSet: [],
        },
        step5Data: {
            tourImageCreateForms: [],
        },
        step6Data: {
            submitHere: "",
        },
    });

    // Function to handle the next step and save form data
    const handleNextStep = (stepKey, data) => {
        setFormData((prevData) => ({
            ...prevData,
            [stepKey]: data,
        }));
        setCurrentStep((prevStep) => prevStep + 1);
    };

    // Function to handle the previous step
    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    // Function to create the tour with complete data
    const handleCreateTour = async () => {
        const completeData = {
            ...formData.step1Data,
            tourDetailCreateForm: formData.step3Data,
            listTourSchedule: formData.step2Data.listTourSchedule,
            tourTimeCreateFormSet: formData.step4Data.tourTimeCreateFormSet,
            tourImageCreateForms: formData.step5Data.tourImageCreateForms,
        };
        console.log('completeData:', completeData);


        try {
            const response = await tourServices.createTour(completeData);

            if (response.status === 200) {
                toast.success("Tour created successfully!");
                // Reset form data and go back to the first step
                setFormData({
                    step1Data: {
                        title: "",
                        starLocation: "",
                        endLocation: "",
                        description: "",
                        price: "",
                        coverImage: "",
                        city: "",
                    },
                    step2Data: {
                        listTourSchedule: [],
                    },
                    step3Data: {
                        time: "",
                        vehicle: "",
                        location: "",
                        food: "",
                        hotel: "",
                    },
                    step4Data: {
                        tourTimeCreateFormSet: [],
                    },
                    step5Data: {
                        tourImageCreateForms: [],
                    },
                });
                setCurrentStep(1);
                navigate("/listTourStaff");
            } else {
                toast.success("Tour created successfully!");
                navigate("/listTourStaff");
            }
        } catch (error) {
            console.error("Error creating tour:", error);
            toast.error("An error occurred while creating the tour.");
        }
    };

    // Function to render the form for the current step
    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1Form
                        formData={formData.step1Data}
                        onNext={(data) => handleNextStep("step1Data", data)}
                    />
                );
            case 2:
                return (
                    <Step2Form
                        formData={formData.step2Data}
                        onNext={(data) => handleNextStep("step2Data", data)}
                    />
                );
            case 3:
                return (
                    <Step3Form
                        formData={formData.step3Data}
                        onNext={(data) => handleNextStep("step3Data", data)}
                    />
                );
            case 4:
                return (
                    <Step4Form
                        formData={formData.step4Data}
                        onNext={(data) => handleNextStep("step4Data", data)}
                    />
                );
            case 5:
                return (
                    <Step5Form
                        formData={formData.step5Data}
                        onNext={(data) => handleNextStep("step5Data", data)}
                    />
                );
            case 6:
                return (
                    <Step6Form
                        formData={formData.step6Data}
                        onNext={(data) => handleCreateTour(data)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
 <SiderBarWebStaff choose={"menu-key/1"} />
            <Layout>
                <NavBarWebStaff />
                <div
                    style={{
                        padding: "30px",
                        background: "white",
                        margin: "30px",
                        borderRadius: "12px",
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    }}
                >       
                    <div>
                        {renderCurrentStep()}
                        <div style={{ marginTop: "20px" }}>
                            {currentStep > 1 && (
                                <Button type="default" onClick={handlePreviousStep} style={{ marginRight: "10px" }}>
                                    Previous
                                </Button>
                            )}
                            {/* {currentStep < 6 ? (
                                <Button
                                    type="primary"
                                    onClick={() => renderCurrentStep().props.onNext(formData[`step${currentStep}Data`])}
                                >
                                    
                                </Button>
                            ) : (
                                <Button type="primary" onClick={handleCreateTour}>
                                    Submit Tour
                                </Button>
                            )} */}
                        </div>
                    </div>
                </div>

            </Layout>
        </Layout>
    );
};

export default CreateTourStaff;