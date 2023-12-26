import { createSliceWithThunks } from "./setup";

import { getPageData } from "../services/oompa-loompas.service";

export const mainSlice = createSliceWithThunks({
  name: "main",
  initialState: {
    allResults: [],
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
          state.allResults = payload?.results;
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
          state.lastPage = payload?.current;
          state.totalPages = payload?.total;
          payload?.results && state.allResults.push(...payload.results);
        },
      }
    ),

    changeSearchResults: (state, { payload }) => {
      state.searchResults = payload.searchResults;
      state.searchActive = payload.searchActive;
    },
  }),
});

export const mainActions = mainSlice.actions;
export const mainReducer = mainSlice.reducer;
