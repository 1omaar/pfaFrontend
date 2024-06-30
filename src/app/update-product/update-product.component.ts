// update-product.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service'; // Import your service
import { Product } from '../Models/product.model'; // Import your product model
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product!: Product;
  private idSnapshot!: number;

  constructor(
    private activateRouter: ActivatedRoute,
    private productService: ProductService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.idSnapshot = +this.activateRouter.snapshot.params['id'];
    this.getProductById(this.idSnapshot);
  }

  getProductById(id: number): void {
    this.productService.getProductById(id).subscribe((product: Product) => {
      this.product = product;
    });
  }

  onSubmit(): void {
    this.productService.updateProduct(this.idSnapshot, this.product).subscribe(() => {
      Swal.fire({
        title: 'Success',
        text: 'Product updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/']); // Replace '/' with your product list route
      });
    });
  }
}
