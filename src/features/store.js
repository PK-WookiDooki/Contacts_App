import { configureStore } from "@reduxjs/toolkit";
import { contactApi } from "./apis/contactApi";
import contactsSlice from "./services/contactsSlice";

export const store = configureStore({
    reducer: {
        contacts: contactsSlice,
        [contactApi.reducerPath]: contactApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(contactApi.middleware),
    devTools: false,
});
