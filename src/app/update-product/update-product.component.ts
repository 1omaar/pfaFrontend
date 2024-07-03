import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../Models/product.model';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import Swal from 'sweetalert2';

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
    private toastr: ToastrService, // Inject ToastrService
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
      this.toastr.success('Produit mis à jour avec succès', 'Succès'); // Display success toast in French
      this.router.navigate(['/']); // Navigate to the product list route
    }, error => {
      this.toastr.error('Une erreur s\'est produite lors de la mise à jour du produit', 'Erreur');

    });
  }
}
