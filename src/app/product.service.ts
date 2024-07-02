import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8083/api/products'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Create headers with authorization token
  private createAuthorizationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      );
    } else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders(); // Return an empty headers object if no token is found
  }

  // Create a new product
  createProduct(product: Product): Observable<Product> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<Product>(this.apiUrl, product, { headers });
  }

  // Get a product by its ID
  getProductById(id: number): Observable<Product> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers });
  }

  // Get a list of all products
  getAllProducts(): Observable<Product[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Product[]>(this.apiUrl, { headers });
  }

  // Update an existing product
  updateProduct(id: number | undefined, product: Product): Observable<Product> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, { headers });
  }

  // Delete a product by its ID
  deleteProduct(id: number | undefined): Observable<void> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Search for products
  searchProducts(query: string): Observable<Product[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Product[]>(`${this.apiUrl}/search?query=${query}`, { headers });
  }
}
