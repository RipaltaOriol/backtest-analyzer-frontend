import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';

const setupsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = setupsAdapter.getInitialState()

export const setupsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Setup'],
    endpoints: builder => ({
        getSetups: builder.query({
            query: ({ documentId }) => ({
                url: `/documents/${documentId}/setups`,
                method: 'GET'
            }),
            // providesTags: ['Setup'],
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
        addSetups: builder.mutation({
            query: ({ documentId, name }) => ({
                url: `/documents/${documentId}/setups`,
                method: 'POST',
                body: { name },
            }),
            invalidatesTags: [
                { type: 'Setup', id: "LIST" }
            ]
            // invalidatesTags: ['Setups']
        }),
        updateSetups: builder.mutation({
            query: ({ documentId, name, setupId }) => ({
                url: `/documents/${documentId}/setups/${setupId}`,
                method: 'PUT',
                body: { name },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Setup', id: arg.id }
            ]
            // invalidatesTags: ['Setups']
        }),
        deleteSetups: builder.mutation({
            query: ({ documentId, setupId }) => ({
                url: `/documents/${documentId}/setups/${setupId}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Setup', id: arg.id }
            ]
            // invalidatesTags: ['Setups']
        })
    })
})

export const {
    useGetSetupsQuery,
    useGetSetupQuery,
    useAddSetupsMutation,
    useUpdateSetupsMutation,
    useDeleteSetupsMutation
} = setupsApiSlice

// export const selectSetupsResult = setupsApiSlice.endpoints.getSetups.select()

// // Creates memoized selector
// const selectSetupsData = createSelector(
//     selectSetupsResult,
//     setupsResult => setupsResult.data // normalized state object with ids & entities
// )

// export const {
//     selectAll: selectAllSetups,
//     selectById: selectSetupById,
// } = setupsAdapter.getSelectors(state => {
//     console.log('Here')
//     console.log(state)
//     return state.setups ?? initialState
// })

// Define function to get selectors based on arguments (query) of getSetups
export const getSelectors = (
    query,
) => {
    const selectSetupsResult = setupsApiSlice.endpoints.getSetups.select(query)

    const adapterSelectors = createSelector(
        selectSetupsResult,
        (result) => setupsAdapter.getSelectors(() => result?.data ?? initialState)
    )

    return {
        selectAll: createSelector(adapterSelectors, (s) =>
            s.selectAll(undefined)
        ),
        selectEntities: createSelector(adapterSelectors, (s) =>
            s.selectEntities(undefined)
        ),
        selectIds: createSelector(adapterSelectors, (s) =>
            s.selectIds(undefined)
        ),
        selectTotal: createSelector(adapterSelectors, (s) =>
            s.selectTotal(undefined)
        ),
        selectById: (id) => createSelector(adapterSelectors, (s) =>
            s.selectById(s, id)
        ),
    }
}