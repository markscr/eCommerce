import { createApi } from "@reduxjs/toolkit/query/react";
import { Basket, Item } from "../../models/Basket";
import { baseQueryWithErrorHandling } from "../../api/baseApi";
import { Product } from "../../models/Product";

function isBasketItem(product: Product | Item): product is Item {
  return (product as Item).quantity !== undefined;
}

export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Basket"],
  endpoints: (builder) => ({
    fetchBasket: builder.query<Basket, void>({
      query: () => ({ url: "basket" }),
      providesTags: ["Basket"],
    }),
    addBasketItem: builder.mutation<
      Basket,
      { product: Product | Item; quantity: number }
    >({
      query: ({ product, quantity }) => {
        const productId = isBasketItem(product)
          ? product.productId
          : product.id;
        return {
          url: "basket",
          params: { productId: productId, quantity: quantity },
          method: "POST",
        };
      },
      onQueryStarted: async (
        { product, quantity },
        { dispatch, queryFulfilled }
      ) => {
        let isNewBasket = false;
        const patchResults = dispatch(
          basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
            const productId = isBasketItem(product)
              ? product.productId
              : product.id;

            if (!draft?.basketId) isNewBasket = true;

            if (!isNewBasket) {
              const existingItem = draft.items.find(
                (item) => item.productId === productId
              );
              if (existingItem) existingItem.quantity += quantity;
              else
                draft.items.push(
                  isBasketItem(product)
                    ? product
                    : { ...product, productId: product.id, quantity }
                );
            }
          })
        );

        try {
          await queryFulfilled;
          if (isNewBasket) dispatch(basketApi.util.invalidateTags(["Basket"]));
        } catch (error) {
          console.log(error);
          patchResults.undo(); // Undo what we did in the dispatch call
        }
      },
    }),
    removeBasketItem: builder.mutation<
      void,
      { productId: string; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: "basket",
        params: { productId, quantity },
        method: "DELETE",
      }),
      onQueryStarted: async (
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) => {
        const deleteItem = dispatch(
          basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
            const itemIndex = draft.items.findIndex(
              (item) => item.productId === productId
            );
            if (itemIndex >= 0) {
              draft.items[itemIndex].quantity -= quantity;
              if (draft.items[itemIndex].quantity <= 0)
                draft.items.splice(itemIndex, 1); // Remove the 1 item
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          deleteItem.undo(); // Undo what we did in the dispatch call
        }
      },
    }),
  }),
});

export const {
  useFetchBasketQuery,
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} = basketApi;
