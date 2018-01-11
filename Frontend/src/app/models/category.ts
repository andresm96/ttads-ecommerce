import { Subcategory } from "./subcategory";

export class Category{
    public _id: string;
    public name: string;
    public subcategory: Subcategory[];
}