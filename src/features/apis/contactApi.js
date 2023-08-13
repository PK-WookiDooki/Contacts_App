import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
    reducerPath: "contactsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://contacts-api.onrender.com" }),
    tagTypes: ["api"],
    endpoints: (builder) => ({
        getAllContacts: builder.query({
            query: () => ({
                url: "/contacts",
                method: "GET",
            }),
            providesTags: ["api"],
        }),

        getContactById: builder.query({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: "GET",
            }),
            providesTags: ["api"],
        }),

        createNewContact: builder.mutation({
            query: (contact) => ({
                url: "/contacts",
                method: "POST",
                body: contact,
            }),
            invalidatesTags: ["api"],
        }),

        updateContact: builder.mutation({
            query: ({ id, contact }) => ({
                url: `/contacts/${id}`,
                method: "PUT",
                body: contact,
            }),
            invalidatesTags: ["api"],
        }),

        deleteContact: builder.mutation({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["api"],
        }),
    }),
});

export const {
    useGetAllContactsQuery,
    useGetContactByIdQuery,
    useCreateNewContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation,
} = contactApi;
