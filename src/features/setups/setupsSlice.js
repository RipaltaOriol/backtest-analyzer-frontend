import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { apiSlice } from "../../api/apiSlice";

const setupsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date_created.localeCompare(a.date_created),
});

const initialState = setupsAdapter.getInitialState();

export const setupsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSetups: builder.query({
            query: () => "/setups",
            transformResponse: (responseData) => {
                return setupsAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => [
                { type: "Setup", id: "LIST" },
                ...result.ids.map((id) => ({ type: "Setup", id })),
                ...Object.values(result.entities).map((entity) => ({
                    type: "Document",
                    id: entity.documentId,
                })),
            ],
        }),
        getSetup: builder.query({
            query: ({ documentId, setupId }) => ({
                url: `/documents/${documentId}/setups/${setupId}`,
                method: "GET",
            }),
        }),
        addFilterSetup: builder.mutation({
            query: ({ setupId, filter }) => ({
                url: `/setups/${setupId}/filters`,
                method: "POST",
                body: filter,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Setup", id: arg.id },
                "Stats",
                "Graphs",
                "Charts",
                "CompareSetups",
                "CalendarTable",
                "CalendarStatistics",
            ],
        }),
        deleteFilterSetup: builder.mutation({
            query: ({ setupId, filterId }) => ({
                url: `/setups/${setupId}/filters/${filterId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Setup", id: arg.id },
                "Stats",
                "Graphs",
                "Charts",
                "CompareSetups",
                "CalendarTable",
                "CalendarStatistics",
            ],
        }),
        addSetups: builder.mutation({
            query: ({ document, name }) => ({
                url: `/setups`,
                method: "POST",
                body: { document, name },
            }),
            invalidatesTags: [{ type: "Setup", id: "LIST" }, "Document"],
        }),
        updateSetups: builder.mutation({
            query: ({ setupId, name, notes, isDefault }) => ({
                url: `/setups/${setupId}`,
                method: "PUT",
                body: { name, notes, default: isDefault },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Setup", id: arg.id },
                "Document",
            ],
        }),
        deleteSetups: builder.mutation({
            query: ({ setupId }) => ({
                url: `/setups/${setupId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Setup", id: arg.id },
                "Document",
            ],
        }),
        getCalendarTable: builder.query({
            query: ({ setupId, metric = null, date = null }) => ({
                url: `/setups/${setupId}/calendar`,
                params: {
                    metric: metric ? metric : undefined,
                    date: date ? date : undefined,
                },
            }),
            providesTags: ["CalendarTable"],
        }),
        getCalendarStatistics: builder.query({
            query: ({ versionId, metric, date, monthYear, offset }) => ({
                url: `/setups/${versionId}/calendar/statistics`,
                params: {
                    metric,
                    date,
                    monthYear,
                    offset,
                },
            }),
            providesTags: ["CalendarStatistics"],
        }),
        getSetupOpenPositions: builder.query({
            query: ({ versionId }) => `/setups/${versionId}/open-trades`,
            providesTags: ["openPositions"],
        }),
    }),
});

export const {
    useGetSetupsQuery,
    useGetSetupQuery,
    useAddSetupsMutation,
    useUpdateSetupsMutation,
    useDeleteSetupsMutation,
    useAddFilterSetupMutation,
    useGetCalendarTableQuery,
    useGetCalendarStatisticsQuery,
    useDeleteFilterSetupMutation,
    useGetSetupOpenPositionsQuery,
} = setupsSlice;

export const {
    selectAll: selectAllSetups,
    selectById: selectSetupById,
    selectIds: selectSetupsIds,
    // Pass in a selector that returns the posts slice of state
} = setupsAdapter.getSelectors((data) => data ?? initialState);

export const selectSetupsByDocument = createSelector(
    [selectAllSetups, (data, documentId) => documentId],
    (setups, documentId) =>
        setups.filter((setup) => setup.documentId === documentId)
);

export const selectDefaultSetup = createSelector(
    [selectAllSetups, (data, documentId) => documentId],
    (setups, documentId) => {
        return setups.find(
            (setup) => setup.default && setup.documentId === documentId
        );
    }
);

// NOTE: this is a duplicate - probably delete and reuse
export const selectProvidedSetup = createSelector(
    [selectAllSetups, (data, setupId) => setupId],
    (setups, setupId) => setups.find((setup) => setup.id === setupId)
);

export const selectSetupOnId = createSelector(
    [selectAllSetups, (data, setupId) => setupId],
    (setups, setupId) => setups.find((setup) => setup.id === setupId)
);
