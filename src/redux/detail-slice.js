import { createSliceWithThunks } from "./setup";

import { getDetailData } from "../services/oompa-loompas.service";

export const detailSlice = createSliceWithThunks({
  name: "detail",
  initialState: {
    isLoading: false,
    errorLoading: false,
    results: {},
  },

  reducers: (create) => ({
    addItem: create.asyncThunk(
      async (id) => {
        const res = await getDetailData(id);
        console.log("action: add item", res);
        return {
          id,
          data: res.data,
        };
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        rejected: (state) => {
          state.isLoading = false;
          state.errorLoading = true;
        },
        fulfilled: (state, { payload }) => {
          state.results = {
            ...state.data,
            [payload.id]: { ...payload.data, lastUpdate: new Date().getTime() },
          };
          state.isLoading = false;
          state.errorLoading = false;
        },
      }
    ),
  }),
});

export const detailActions = detailSlice.actions;
export const detailReducer = detailSlice.reducer;
