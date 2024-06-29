export class Product {
    id?: number;
    nom: string;
    description: string;
  prix: number;
  quantite?: number ;

    constructor(nom: string, description: string, prix: number , quantite?:number) {
      this.nom = nom;
      this.description = description;
      this.prix = prix;
      this.quantite = quantite
    }
  }
