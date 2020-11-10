
export interface IProduct{
    id:number;
    name:string;
    code:string;
    description:string;
    price:number;
    image:string
    
}
export class Product {
    id:number;
    name:string;
    code:string;
    description:string;
    price:number;
    image:string
    constructor(name?:string,code?:string,description?:string, price?:number,image?:string){
        this.name = name;
        this.code = code;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}
