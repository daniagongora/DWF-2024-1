import { Product } from "../../product/_models/product"

export class DtoCartDetails{
    cart_id: number = 0;
    rfc: string = "";
    gtin: string = "";
    quantity: number = 0;
    status: number = 0;

    product: Product = new Product();
    image: string = "";
}