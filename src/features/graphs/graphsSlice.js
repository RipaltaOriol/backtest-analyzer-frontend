import { apiSlice } from '../../api/apiSlice';

export const graphsSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getGraph: builder.query({
            query: ({ setupId, type }) => ({
                url: `/setups/${setupId}/graphs`,
                method: 'GET',
                params: { type }
            }),
            providesTags: ['Charts']
        })
    })
})

export const {
    useGetGraphQuery
} = graphsSlice;