import { apiSlice } from '../../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            })
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