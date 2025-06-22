import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Product } from './product/product';
import { ProductForm } from './product-form/product-form';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'products', component: Product },
  { path: 'products/new', component: ProductForm },
  { path: 'products/edit/:id', component: ProductForm },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
