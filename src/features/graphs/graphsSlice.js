import { apiSlice } from "../../api/apiSlice";

export const graphsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // TODO: I belive its better to have separate slices (cache) for each graph type
        getGraph: builder.query({
            query: ({ setupId, type, currentMetric }) => ({
                url: `/setups/${setupId}/graphs`,
                method: "GET",
                params: { type, currentMetric },
            }),
            providesTags: ["Charts"],
        }),
        getDailyDistribution: builder.query({
            query: ({ setupId }) => ({
                url: `/setups/${setupId}/stats/daily`,
                method: "GET",
            }),
            providesTags: ["DailyDistributions"],
        }),
        getNetReturn: builder.query({
            query: ({ setupId }) => ({
                url: `/setups/${setupId}/charts/net`,
                method: "GET",
            }),
            providesTags: ["NetReturn"],
        }),
        getCumulativeReturn: builder.query({
            query: ({ setupId }) => ({
                url: `/setups/${setupId}/charts/cum`,
                method: "GET",
            }),
            providesTags: ["CumulativeReturn"],
        }),
    }),
});

export const {
    useGetGraphQuery,
    useGetDailyDistributionQuery,
    useGetNetReturnQuery,
    useGetCumulativeReturnQuery,
} = graphsSlice;
