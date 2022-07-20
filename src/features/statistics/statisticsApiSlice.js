import { apiSlice } from '../../api/apiSlice';

export const statisticsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStatistics: builder.query({
            query: ({ setupId }) => ({
                url: `/setups/${setupId}/stats`,
                method: 'GET'
            }),
            providesTags: ['Stats']
        }),
        getCharts: builder.query({
            query: ({ setupId }) => ({
                url: `/setups/${setupId}/charts`,
                method: 'GET'
            }),
            providesTags: ['Graphs']
        })
    })
})

export const {
    useGetStatisticsQuery,
    useGetChartsQuery,
} = statisticsApiSlice