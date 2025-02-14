import { TagInterface } from "@/shared/interface/global-interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TagInterface = {
  tagList: [],
  tagCount: 0,
};

export const tagSlice = createSlice({
  name: "tagSlice",
  initialState,
  reducers: {
    setTags: (state, action) => {
      const tagItem = action.payload?.items;
      const tagCount = action.payload?.count;
      state.tagList = tagItem.map((tag: any) => tag?.tagName);
      state.tagCount = tagCount;
    },
  },
});

export const { setTags } = tagSlice.actions;

export default tagSlice.reducer;
