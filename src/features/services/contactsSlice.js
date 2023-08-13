import { createSlice } from "@reduxjs/toolkit";

export const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        keyword: "",
    },
    reducers: {
        setKeyword: (state, { payload }) => {
            state.keyword = payload;
        },
    },
});

export const { setKeyword } = contactsSlice.actions;

export default contactsSlice.reducer;
