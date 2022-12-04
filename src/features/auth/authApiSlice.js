import { apiSlice } from '../../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Document', 'Setup', 'Stats', 'Graphs', 'Charts']
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Document', 'Setup', 'Stats', 'Graphs', 'Charts']
        }),
        refreshToken: builder.mutation({
            query: () => '/refresh' 
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRefreshTokenMutation
} = authApiSlice