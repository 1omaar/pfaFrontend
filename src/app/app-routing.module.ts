import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import {AjouterProductComponent} from "./ajouter-product/ajouter-product.component";
import {UpdateProductComponent} from "./update-product/update-product.component";

const routes: Routes = [

  {
    path: '',
    redirectTo: '/produit', // Redirect to dashboard by default
    pathMatch: 'full'
  },
  {
    path: 'produit',
    component: ProductListComponent,

  },
  {
    path: 'AjouterProduct',
    component: AjouterProductComponent,

  },
  { path: 'update/:id', component: UpdateProductComponent }, // Replace with your update component

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
