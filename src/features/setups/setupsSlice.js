import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';

const setupsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date_created.localeCompare(a.date_created)
})

const initialState = setupsAdapter.getInitialState()

export const setupsSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSetups: builder.query({
            query: () => '/setups',
            transformResponse: responseData => {
                return setupsAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'Setup', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Setup', id }))
            ]
        }),
        getSetup: builder.query({
            query: ({ documentId, setupId }) => ({
                url: `/documents/${documentId}/setups/${setupId}`,
                method: 'GET'
            })
        }),
        addFilterSetup: builder.mutation({
            query: ({ setupId, filter }) => ({
                url: `/setups/${setupId}/filters`,
                method: 'POST',
                body: filter
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Setup', id: arg.id },
                'Stats',
                'Graphs'
            ]
        }),
        deleteFilterSetup: builder.mutation({
            query: ({ setupId, filterId}) => ({
                url: `/setups/${setupId}/filters/${filterId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Setup', id: arg.id },
                'Stats',
                'Graphs'
            ]
        }),
        addSetups: builder.mutation({
            query: ({ document, name }) => ({
                url: `/setups`,
                method: 'POST',
                body: { document, name },
            }),
            invalidatesTags: [
                { type: 'Setup', id: "LIST" }
            ]
        }),
        updateSetups: builder.mutation({
            query: ({setupId, name, notes, isDefault }) => ({
                url: `/setups/${setupId}`,
                method: 'PUT',
                body: { name, notes, default: isDefault },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Setup', id: arg.id }
            ]
        }),
        deleteSetups: builder.mutation({
            query: ({ setupId }) => ({
                url: `/setups/${setupId}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Setup', id: arg.id }
            ]
        })
    })
})

export const {
    useGetSetupsQuery,
    useGetSetupQuery,
    useAddSetupsMutation,
    useUpdateSetupsMutation,
    useDeleteSetupsMutation,
    useAddFilterSetupMutation,
    useDeleteFilterSetupMutation,
} = setupsSlice

export const {
    selectAll: selectAllSetups,
    selectById: selectSetupById,
    selectIds: selectSetupsIds
    // Pass in a selector that returns the posts slice of state
} = setupsAdapter.getSelectors(data => data ?? initialState)

export const selectSetupsByDocument = createSelector(
    [selectAllSetups, (data, documentId) => documentId],
    (setups, documentId) => setups.filter(setup => setup.documentId === documentId)
); 

export const selectDefaultSetup = createSelector(
    [selectAllSetups, (data, documentId) => documentId],
    (setups, documentId) => setups.find(setup => setup.default && setup.documentId === documentId)
);

export const selectSetupOnId = createSelector(
    [selectAllSetups, (data, setupId) => setupId],
    (setups, setupId) => setups.find(setup => setup.id === setupId)
);