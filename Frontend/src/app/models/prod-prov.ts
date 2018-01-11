import { Product } from "./product";
import { Provider } from "./provider";

export class ProdProv{
    public _id: string;
    public price: string;
    public idProvider: Provider;
    public idProduct: Product;
    public description: string;
}