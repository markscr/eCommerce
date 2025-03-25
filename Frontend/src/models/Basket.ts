import { Product } from "./Product";

export type Basket = {
  basketId: string;
  items: Item[];
};

export class Item {
  constructor(product: Product, quantity: number) {
    this.brand = product.brand;
    this.description = product.description;
    this.name = product.name;
    this.pictureUrl = product.pictureUrl;
    this.price = product.price;
    this.productId = product.id;
    this.quantity = quantity;
    this.quantityInStock = product.quantityInStock;
    this.type = product.type;
  }

  productId: string;
  quantity: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quantityInStock: number;
}
