import { apiSlice } from "../../api/apiSlice";

export const tradeSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        deleteTrade: builder.mutation({
            query: ({ documentId, tradeId }) => ({
                url: `/documents/${documentId}/trade/${tradeId}`,
                method: "DELETE",
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
        addTrade: builder.mutation({
            query: ({ documentId }) => ({
                url: `/documents/${documentId}/trade`,
                method: "POST",
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
        updateTrade: builder.mutation({
            query: ({ documentId, tradeId, trade }) => ({
                url: `/documents/${documentId}/trade/${tradeId}`,
                method: "PUT",
                body: { trade },
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

export const {
    useDeleteTradeMutation,
    useAddTradeMutation,
    useUpdateTradeMutation,
} = tradeSlice;
