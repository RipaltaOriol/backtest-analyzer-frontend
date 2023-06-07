import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { logOut, setCredentials } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
    mode: "cors",
    prepareHeaders: (headers, { getState, endpoint }) => {
        const token = getState().auth.token;
        if (token && endpoint !== "refresh") {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    // check this error!
    if (result?.error?.status === 403) {
        // send refresh token to get new access token
        const refreshResult = await baseQuery(
            "/refresh",
            { ...api, endpoint: "refresh" },
            extraOptions
        );
        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            // store the new token
            await api.dispatch(
                setCredentials({
                    token: refreshResult.data.access_token,
                    user,
                })
            );
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        "Document",
        "Setup",
        "Stats",
        "Graphs",
        "DocumentTable",
        "Charts",
        "CalendarTable",
        "CompareSetups",
    ],
    endpoints: (builder) => ({}),
});
