export enum FilterOptionsEnum {
  ALL = "All",
  APPROVE = "Approved",
  PENDING = "Pending",
  DRAFT = "Draft",
  REJECTED = "Rejected",
}

export interface StepperStep {
  stepName: string;
  activeStep: boolean;
  isCompleted: boolean;
}

export interface ProgressData {
  activeStep: number;
  completedSteps: StepperStep[];
}

export interface TagInterface {
  tagList: any[];
  tagCount: number;
}
