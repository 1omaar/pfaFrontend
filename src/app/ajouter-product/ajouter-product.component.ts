import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../Models/product.model";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajouter-product',
  templateUrl: './ajouter-product.component.html',
  styleUrls: ['./ajouter-product.component.css']
})
export class AjouterProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService ,  private router: Router) { }

  ngOnInit(): void {
  }

  addProduct(name: string, description: string, price: number, quantite: number): void {
    const newProduct = new Product(name, description, price, quantite);

    this.productService.createProduct(newProduct).subscribe((product: Product) => {
      this.products.push(product);
      Swal.fire('Success', 'Product added successfully', 'success').then(() => {
        // Navigate to the "produit" page after closing the SweetAlert popup
        this.router.navigate(['/produit']);
      });
    });
  }


}
