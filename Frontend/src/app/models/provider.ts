import { ProdProv } from "./prod-prov";

export class Provider {
    public _id: string;
    public cuit: string;
    public company: string;
    public adress: string;
    public phone: string;
    public prodprovs: ProdProv[];
}