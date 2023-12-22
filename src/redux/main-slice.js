import { createSliceWithThunks } from "./setup";

import { getPageData } from "../services/oompa-loompas.service";

export const mainSlice = createSliceWithThunks({
  name: "main",
  initialState: {
    results: [],
    searchResults: [],
    searchActive: false,
    lastPage: 0,
    totalPages: 1,
    lastUpdate: null,
    isLoading: false,
    errorLoading: false,
  },

  reducers: (create) => ({
    updateResults: create.asyncThunk(
      // Resets the initial state, loads the first page in 'results' and updates 'lastUpdate'
      async () => {
        console.log("action: update results");
        const res = await getPageData(1);
        // console.log(res);
        return res.data;
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
          state.results = payload?.results;
          state.lastPage = payload?.current;
          state.totalPages = payload?.total;
          state.lastUpdate = new Date().getTime();
          state.isLoading = false;
          state.errorLoading = false;
        },
      }
    ),

    addPage: create.asyncThunk(
      // Adds additional pages to 'results'
      async (page) => {
        const res = await getPageData(page);
        console.log("action: add page", page);
        console.log(res.data);
        return res.data;
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
          state.isLoading = false;
          state.errorLoading = false;
          // console.log("res", payload.results);
          state.lastPage = payload?.current;
          state.totalPages = payload?.total;
          payload?.results && state.results.push(...payload.results);
        },
      }
    ),

    changeSearchResults: (state, { payload }) => {
      console.log("change..", payload);
      state.searchResults = payload;
      state.searchActive = payload !== "";
    },
  }),
});

export const mainActions = mainSlice.actions;
export const mainReducer = mainSlice.reducer;
