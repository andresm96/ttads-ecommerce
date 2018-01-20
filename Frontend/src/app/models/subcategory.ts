import { Product } from "./product";
import { Category } from "./category";

export class Subcategory {
    public _id: string;
    public name: string;
    public category: Category;
    public products: Product[];
}