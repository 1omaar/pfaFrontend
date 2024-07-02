import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import {AjouterProductComponent} from "./ajouter-product/ajouter-product.component";
import {UpdateProductComponent} from "./update-product/update-product.component";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/produit', 
    pathMatch: 'full'
  },
  {
    path: 'register',
    redirectTo: '/Register', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: '/login', 
    pathMatch: 'full'
  },
  {
    path: 'produit',
    component: ProductListComponent ,canActivate: [AuthGuard],

  },
  {
    path: 'AjouterProduct',
    component: AjouterProductComponent  ,canActivate: [AuthGuard],

  },
  { path: 'update/:id', component: UpdateProductComponent  ,canActivate: [AuthGuard]}, // Replace with your update component
  { path: 'Register', component: RegisterComponent }, // Replace with your update component
  { path: 'login', component: LoginComponent }, // Replace with your update component

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
