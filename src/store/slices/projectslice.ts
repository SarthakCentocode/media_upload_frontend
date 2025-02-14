import { projectSliceInterface as ProjectDetails } from "@/shared/interface/user-slice-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProjectDetails = {
  projectId: null,
  projectName: null,
  projectStatus: null,
  projectPlan: null,
};

export const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    setProjectData: (state, action: PayloadAction<ProjectDetails>) => {
      state.projectId = action?.payload?.projectId;
      state.projectName = action?.payload?.projectName;
      state.projectPlan = action?.payload?.projectPlan;
      state.projectStatus = action?.payload?.projectStatus;
    },
  },
});

export const { setProjectData } = projectSlice.actions;
export default projectSlice.reducer;
