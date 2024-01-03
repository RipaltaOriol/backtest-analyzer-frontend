import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: { ...credentials },
            }),
            invalidatesTags: ["Document", "Setup", "Stats", "Graphs", "Charts"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
            invalidatesTags: ["Document", "Setup", "Stats", "Graphs", "Charts"],
        }),
        refreshToken: builder.mutation({
            query: () => "/refresh",
        }),
        updatePassword: builder.mutation({
            query: ({ newPassword }) => ({
                url: "/update-password",
                method: "PUT",
                body: { password: newPassword },
            }),
        }),
        // TODO: this should be relocated or included with auth
        getUserSettings: builder.query({
            query: () => "/users/details",
            providesTags: ["User"],
        }),
        addTemplateUserSettings: builder.mutation({
            query: ({ templateId }) => ({
                url: `/users/templates/${templateId}`,
                method: "POST",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
    useUpdatePasswordMutation,
    useGetUserSettingsQuery,
    useAddTemplateUserSettingsMutation,
} = authApiSlice;
