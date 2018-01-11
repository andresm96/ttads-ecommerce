import { Subcategory } from "./subcategory";
import { Provider } from "./provider";
import { ProdProv } from "./prod-prov";

export class Product {
  public _id: string;
  public name: string;
  public description: string;
  public subcategory: Subcategory;
  public prodprovs: ProdProv[];
  public provider: Provider[];
}