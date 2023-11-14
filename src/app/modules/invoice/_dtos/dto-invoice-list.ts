/* REQUERIMIENTO 3. Implementar modelo Invoice */
import { Item } from "../../invoice/_models/ item"
import { Customer } from "../../customer/_models/customer"

export class DtoInvoiceList{
    invoice_id: number = 0;
    created_at:	string = "";
    rfc: string = "";
    taxes: number = 0;
    subtotal: number = 0;
    total: number =0;

    customer: Customer = new Customer();
    items: Item = new Item();
}