export class Category{
    category: string = "";
    
    
    category_id: number = 0;
    code: string = "";
    status: number = 0;

    constructor(category_id: number, code: string, category: string, status: number){
        
        this.category = category;
        this.category_id = category_id;
        this.code = code;
        this.status = status;
    }

}