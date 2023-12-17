import { apiSlice } from "../../api/apiSlice";

export const templatesSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRow: builder.query({
            query: ({ documentId, rowId }) => `/setups/${documentId}/${rowId}`,
            providesTags: ["SetupRow"],
        }),
        putRow: builder.mutation({
            query: ({ documentId, rowId, template }) => ({
                url: `/setups/${documentId}/${rowId}`,
                method: "POST",
                body: { row: template },
            }),
            invalidatesTags: [
                "SetupRow",
                "DocumentTable",
                "CalendarTable",
                "Setup",
                "Stats",
                "Graphs",
                "Charts",
            ],
        }),
    }),
});

export const { useGetRowQuery, usePutRowMutation } = templatesSlice;
