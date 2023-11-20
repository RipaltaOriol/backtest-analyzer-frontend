import { apiSlice } from "../../api/apiSlice";

export const templateApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTemplateMapping: builder.query({
            query: ({ documentId }) => ({
                url: `/documents/${documentId}/templates/mapping`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetTemplateMappingQuery } = templateApiSlice;
