export class Category{
    category_id: number = 0;
    code: number = 0;
    category: string = "";
    status: string = "";

    constructor(category_id: number, code: number, category: string, status: string){
        this.category_id = category_id;
        this.code = code;
        this.category = category;
        this.status = status;
    }

}