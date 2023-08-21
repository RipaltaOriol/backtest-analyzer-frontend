import { apiSlice } from "../../api/apiSlice";

export const templatesSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSetupRow: builder.query({
            query: ({ setupId, rowId }) => `/setups/${setupId}/${rowId}`,
            providesTags: ["SetupRow"],
        }),
        putSetupRow: builder.mutation({
            query: ({ setupId, rowId, template }) => ({
                url: `/setups/${setupId}/${rowId}`,
                method: "POST",
                body: { row: template },
            }),
            invalidatesTags: ["SetupRow"],
        }),
    }),
});

export const { useGetSetupRowQuery, usePutSetupRowMutation } = templatesSlice;
