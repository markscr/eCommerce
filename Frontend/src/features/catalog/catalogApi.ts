import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "../../models/Product";
import { baseQueryWithErrorHandling } from "../../api/baseApi";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({
      query: () => ({ url: "products" }),
    }),
    fetchProductDetails: builder.query<Product, string>({
      query: (productId) => `products/${productId}`,
    }),
  }),
});

// These hooks are automatically generated by Redux toolkit query
export const { useFetchProductDetailsQuery, useFetchProductsQuery } =
  catalogApi;
