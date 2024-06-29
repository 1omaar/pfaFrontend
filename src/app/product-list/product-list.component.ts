import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/product.model';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

    addProduct(name: string, description: string, price: number , quantite:number): void {

    console.log(quantite)
    const newProduct = new Product(name, description, price , quantite);
    this.productService.createProduct(newProduct).subscribe((product: Product) => {
      this.products.push(product);
      Swal.fire('Success', 'Product added successfully', 'success');
    });
  }

  updateProduct(id: number|undefined, name: string, description: string, price: number): void {
    const updatedProduct = new Product(name, description, price, id);
    this.productService.updateProduct(id, updatedProduct).subscribe((product: Product) => {
      const index = this.products.findIndex(p => p.id === id);
      if (index !== -1) {
        this.products[index] = product;
        Swal.fire('Success', 'Product updated successfully', 'success');
      }
    });
  }

  deleteProduct(id: number|undefined): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(() => {
          this.products = this.products.filter(p => p.id !== id);
          Swal.fire('Deleted!', 'Product has been deleted.', 'success');
        });
      }
    });
  }
}
