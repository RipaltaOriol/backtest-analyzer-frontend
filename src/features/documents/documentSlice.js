import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { apiSlice } from "../../api/apiSlice";

const documentsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = documentsAdapter.getInitialState();

export const documentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDocuments: builder.query({
            query: () => "/documents",
            transformResponse: (responseData) => {
                return documentsAdapter.setAll(initialState, responseData);
            },

            // providesTags: ['Documents'],
            providesTags: (result, error, arg) => [
                { type: "Document", id: "LIST" },
                ...result.ids.map((id) => ({ type: "Document", id })),
            ],
        }),
        getDocument: builder.query({
            query: ({ documentId }) => `/documents/${documentId}`,
            providesTags: ["DocumentTable"],
        }),
        postDocument: builder.mutation({
            query: ({ name, fields, checkbox }) => ({
                url: "/documents",
                method: "POST",
                body: { name, fields, checkbox },
            }),
            invalidatesTags: [{ type: "Document", id: "LIST" }, "Setup"],
        }),
        updateDocument: builder.mutation({
            query: ({ id, method, data }) => ({
                url: `/documents/${id}/update`,
                method: "PUT",
                body: { method, data },
            }),
            invalidatesTags: [
                "DocumentTable",
                "CalendarTable",
                "Setup",
                "Stats",
                "Graphs",
                "Charts",
            ], // maybe not invalidate all setups
        }),
        uploadDocument: builder.mutation({
            query: (file) => ({
                url: "/documents/upload",
                method: "POST",
                body: file,
            }),
            invalidatesTags: [{ type: "Document", id: "LIST" }, "Setup"],
        }),
        cloneDocument: builder.mutation({
            query: ({ id }) => ({
                url: `/documents/${id}`,
                method: "POST",
            }),
            invalidatesTags: [{ type: "Document", id: "LIST" }, "Setup"],
        }),
        renameDocument: builder.mutation({
            query: ({ id, name }) => ({
                url: `/documents/${id}`,
                method: "PUT",
                body: { name },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Document", id: arg.id },
            ],
        }),
        deleteDocument: builder.mutation({
            query: ({ id }) => ({
                url: `/documents/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Document", id: "LIST" }],
        }),
        getDocumentColumns: builder.query({
            query: ({ documentId }) => `/documents/${documentId}/columns`,
        }),
        compareDocumentSetups: builder.query({
            query: ({ documentId, metric = null }) => ({
                url: `/documents/${documentId}/compare`,
                params: metric ? { metric: metric } : null,
            }),
            providesTags: ["CompareSetups"],
        }),
        getCalendarTable: builder.query({
            query: ({ documentId, metric = null, date = null }) => ({
                url: `/documents/${documentId}/calendar`,
                params: {
                    metric: metric ? metric : undefined,
                    date: date ? date : undefined,
                },
            }),
            providesTags: ["CalendarTable"],
        }),
    }),
});

export const {
    useGetDocumentQuery,
    useGetDocumentsQuery,
    useUpdateDocumentMutation,
    useUploadDocumentMutation,
    useCloneDocumentMutation,
    useRenameDocumentMutation,
    usePostDocumentMutation,
    useDeleteDocumentMutation,
    useCompareDocumentSetupsQuery,
    useGetCalendarTableQuery,
    useGetDocumentColumnsQuery,
} = documentsApiSlice;

// returns the query result object
export const selectDocumentsResult =
    documentsApiSlice.endpoints.getDocuments.select();

// Creates memoized selector
const selectDocumentsData = createSelector(
    selectDocumentsResult,
    (documentsResult) => {
        return documentsResult.data;
    } // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllDocuments,
    selectById: selectDocumentById,
    selectIds: selectDocumentIds,
    // Pass in a selector that returns the posts slice of state
} = documentsAdapter.getSelectors(
    (state) => selectDocumentsData(state) ?? initialState
);
