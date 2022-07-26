import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from "../../api/apiSlice"

const documentsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = documentsAdapter.getInitialState()

export const documentsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDocuments: builder.query({
            query: () => '/documents',
            transformResponse: responseData => {
                return documentsAdapter.setAll(initialState, responseData)
            },

            // providesTags: ['Documents'],
            providesTags: (result, error, arg) => [
                { type: 'Document', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Document', id }))
            ]
        }),
        uploadDocument: builder.mutation({
            query: file => ({
                url: '/documents/upload',
                method: 'POST',
                body: file,
            }),
            invalidatesTags: [
                { type: 'Document', id: 'LIST' },
                'Setup'
            ]
        }),
        cloneDocument: builder.mutation({
            query: ({ id }) => ({
                url: `/documents/${id}`,
                method: 'POST'
            }),
            invalidatesTags: [
                { type: 'Document', id: 'LIST' },
                'Setup'
            ]
        }),
        renameDocument: builder.mutation({
            query: ({ id, name }) => ({
                url: `/documents/${id}`,
                method: 'PUT',
                body: { name },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Document', id: arg.id }
            ]
        }),
        deleteDocument: builder.mutation({
            query: ({ id }) => ({
                url: `/documents/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [
                { type: 'Document', id: 'LIST' }
            ]
        })
    })
})

export const {
    useGetDocumentsQuery,
    useUploadDocumentMutation,
    useCloneDocumentMutation,
    useRenameDocumentMutation,
    useDeleteDocumentMutation,
} = documentsApiSlice

// returns the query result object
export const selectDocumentsResult = documentsApiSlice.endpoints.getDocuments.select()

// Creates memoized selector
const selectDocumentsData = createSelector(
    selectDocumentsResult,
    documentsResult => {
        return documentsResult.data
    } // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllDocuments,
    selectById: selectDocumentById,
    selectIds: selectDocumentIds,
    // Pass in a selector that returns the posts slice of state
} = documentsAdapter.getSelectors(state => selectDocumentsData(state) ?? initialState)