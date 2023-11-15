import { Item } from "../../invoice/_models/ item"

export class DtoCartDetails{
    cart_id: number = 0;
    rfc: string = "";
    gtin: string = "";
    quantity: number = 0;
    status: number = 0;

    item: Item = new Item();
    image: string = "";
}