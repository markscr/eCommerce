import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../api/baseApi";

export const errorApi = createApi({
  reducerPath: "errorApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    get400BadRequestError: builder.query<void, void>({
      query: () => ({ url: "buggy/bad-request" }),
    }),
    get401UnauthorizedError: builder.query<void, void>({
      query: () => ({ url: "buggy/unauthorized" }),
    }),
    get404NotFoundError: builder.query<void, void>({
      query: () => ({ url: "buddy/not-found" }),
    }),
    getValidationError: builder.query<void, void>({
      query: () => ({ url: "buggy/validation-error" }),
    }),
    get500ServerError: builder.query<void, void>({
      query: () => ({ url: "buggy/server-error" }),
    }),
  }),
});

export const {
  useLazyGet400BadRequestErrorQuery,
  useLazyGet401UnauthorizedErrorQuery,
  useLazyGet404NotFoundErrorQuery,
  useLazyGetValidationErrorQuery,
  useLazyGet500ServerErrorQuery,
} = errorApi;
