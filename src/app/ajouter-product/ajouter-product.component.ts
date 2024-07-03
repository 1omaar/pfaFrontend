import { Component, OnInit } from '@angular/core';
import { ProductService } from "../product.service";
import { Product } from "../Models/product.model";
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajouter-product',
  templateUrl: './ajouter-product.component.html',
  styleUrls: ['./ajouter-product.component.css']
})
export class AjouterProductComponent implements OnInit {
  products: Product[] = [];

  constructor(     private toastr: ToastrService, // Inject ToastrService
  private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  addProduct(form: NgForm): void {
    const { productName, productDescription, productPrice, productQuantite } = form.value;
    const newProduct = new Product(productName, productDescription, productPrice, productQuantite);

    this.productService.createProduct(newProduct).subscribe(
      (product: Product) => {
        this.products.push(product);
        this.toastr.success('Produit ajouté avec succès', 'Succès'); // Display success toast
        this.router.navigate(['/produit']);
      },
      (error) => {
        this.toastr.error('Une erreur est survenue lors de l\'ajout du produit', 'Erreur'); // Display error toast
      }
    );
  }
}
