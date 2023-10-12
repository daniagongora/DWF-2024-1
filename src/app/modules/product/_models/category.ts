export class Category{
    category_id: number = 0;
    code: string = "";
    category: string = "";
    status: string = "";

    constructor(category_id: number, code: string, category: string, status: string){
        this.category_id = category_id;
        this.code = code;
        this.category = category;
        this.status = status;
    }

}