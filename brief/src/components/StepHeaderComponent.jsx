import React from "react";
import { Stepper, Step, StepLabel, StepConnector } from "@mui/material";
import { styled } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  "&.MuiStepConnector-root": {
    top: 10,
    left: "calc(-50% + 12px)",
    right: "calc(50% + 12px)",
  },
  "& .MuiStepConnector-line": {
    borderColor: "#D8A7C0",
    borderTopWidth: 4,
    borderRadius: 1,
  },
}));

const CustomStepIcon = ({ active, completed, icon }) => {
  if (completed) {
    return <CheckCircleIcon color="primary" />;
  }
  if (active) {
    return <ArrowCircleRightIcon color="primary" />;
  }
  return <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EDD2DD" }}></div>;
};

const steps = ["2025", "2035", "2045"];

export default function StepHeader({ currentStep }) {
  return (
    <Stepper alternativeLabel activeStep={currentStep} connector={<CustomConnector />}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel StepIconComponent={(props) => <CustomStepIcon {...props} icon={index + 1} />}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
