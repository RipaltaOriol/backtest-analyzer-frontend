import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState, endpoint }) => {
        const token = getState().auth.token
        if (token && endpoint !== 'refresh') {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    // check this error!
    if (result?.error?.status === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token
        const refreshResult = await baseQuery('/refresh', { ...api, endpoint: 'refresh' } , extraOptions)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // store the new token 
            await api.dispatch(setCredentials({
                token: refreshResult.data.access_token,
                user,
            }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})