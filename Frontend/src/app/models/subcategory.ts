import { Product } from "./product";
import { Category } from "./category";

export class Subcategory {
    id: string;
    name: string;
    category: String;
    products: Product[];
}