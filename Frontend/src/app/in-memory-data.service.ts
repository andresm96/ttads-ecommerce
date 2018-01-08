import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
        { id: 11, name: 'Samsung Galaxy J1' },
        { id: 12, name: 'Iphone X' },
        { id: 13, name: 'Sony TV 14 inches' },
        { id: 14, name: 'Lenovo Ideapad 320' },
        { id: 15, name: 'Mac Book Pro' },
        { id: 16, name: 'Phillips 42 inches' }
    ];
    const categories = [
        { id: 1, 
          name: 'Celulares',
          subcategories: [
            { id: 1, name: "Samsung" },
            { id: 2, name: "Motorola" },
            { id: 3, name: "Iphone" }
          ] },
        { id: 2, 
          name: 'Notebooks',
          subcategories: [
            { id: 1, name: "Lenovo" },
            { id: 2, name: "Asus" },
            { id: 3, name: "Mac" },
            { id: 4, name: "Samsung"}
          ] },
        { id: 3, 
          name: 'Televisores',
          subcategories: [
            { id: 1, name: "Sony" },
            { id: 2, name: "Pionner" },
          ] },
        { id: 4, 
          name: 'Electrodomésticos',
          subcategories: [
            { id: 1, name: "Tostadoras" },
            { id: 2, name: "Heladeras" },
            { id: 3, name: "Aires Ac." }
          ] },
        { id: 3, 
          name: 'Muebles',
          subcategories: [
            { id: 1, name: "Comedor" },
            { id: 2, name: "Living" },
            { id: 2, name: "Jardin" },
          ] }
    ];
    return {products, categories};
  }
}