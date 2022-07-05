import { apiSlice } from '../../api/apiSlice';

export const statisticsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStatistics: builder.query({
            query: ({ documentId, setupId }) => ({
                url: `/documents/${documentId}/setups/${setupId}/stats`,
                method: 'GET'
            })
        }),
        getCharts: builder.query({
            query: ({ documentId, setupId }) => ({
                url: `/documents/${documentId}/setups/${setupId}/charts`,
                method: 'GET'
            })
        })
    })
})

export const {
    useGetStatisticsQuery,
    useGetChartsQuery,
} = statisticsApiSlice