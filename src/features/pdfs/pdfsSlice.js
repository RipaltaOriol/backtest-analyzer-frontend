import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { apiSlice } from "../../api/apiSlice";

export const pdfsSlice = apiSlice.injectEndpoints({
    baseQuery: fetchBaseQuery({ baseUrl: "/ " }),
    endpoints: (builder) => ({
        downloadPDFFile: builder.mutation({
            queryFn: async (
                { setupId, name },
                api,
                extraOptions,
                baseQuery
            ) => {
                const result = await baseQuery({
                    url: `/setups/${setupId}/file`,
                    responseHandler: (response) => response.blob(),
                });
                var hiddenElement = document.createElement("a");
                var url = window.URL || window.webkitURL;
                var blobPDF = url.createObjectURL(result.data);
                hiddenElement.href = blobPDF;
                hiddenElement.target = "_blank";
                hiddenElement.download = `${name}_report.pdf`;
                hiddenElement.click();
                return { data: null };
            },
        }),
    }),
});

export const { useDownloadPDFFileMutation } = pdfsSlice;
