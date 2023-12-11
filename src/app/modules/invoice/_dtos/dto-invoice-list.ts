/* REQUERIMIENTO 3. Implementar modelo Invoice */
import { Customer } from "../../customer/_models/customer"
import { DtoItem } from "./dto-item";

export class DtoInvoiceList{
    rfc: string = "";
    taxes: number = 0;
    subtotal: number = 0;
    total: number =0;

    customer: Customer = new Customer();
    items: DtoItem[] = [];
}