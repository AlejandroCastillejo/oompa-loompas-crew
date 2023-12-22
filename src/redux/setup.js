import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

// The version of createSlice exported from RTK will throw an error if create.asyncThunk is called.
// This version of createSlice must be used instead
export const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
