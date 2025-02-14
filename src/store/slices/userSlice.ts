import {
  CurrentUserInterface,
  userIdAndToken,
  UserSliceInterface,
} from "@/shared/interface/user-slice-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserSliceInterface = {
  userId: "",
  token: "",
  currentUser: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "",
    type: "",
    username: "",
    createdAt: "",
    updatedAt: "",
    status: "",
  },
  users: null,
  projectId: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setTokenAndId: (state, action: PayloadAction<userIdAndToken>) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    setCurrentUserDetails: (
      state,
      action: PayloadAction<CurrentUserInterface>
    ) => {
      state.currentUser.firstName = action.payload.firstName;
      state.currentUser.lastName = action.payload.lastName;
      state.currentUser.countryCode = action.payload.countryCode;
      state.currentUser.phone = action.payload.phone;
      state.currentUser.email = action.payload.email;
      state.currentUser.type = action.payload.type;
      state.currentUser.status = action.payload.status;
      state.currentUser.createdAt = action.payload.createdAt;
      state.currentUser.updatedAt = action.payload.updatedAt;
    },
    setOtherUserDetails: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
    setProjectId: (state, action: PayloadAction<string>) => {
      state.projectId = action.payload;
    },
  },
});

export const {
  setTokenAndId,
  setCurrentUserDetails,
  setOtherUserDetails,
  setProjectId,
} = userSlice.actions;
export default userSlice.reducer;
