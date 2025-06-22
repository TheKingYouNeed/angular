
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';

// Product model interface
export interface ProductModel {
  id: number;
  name: string;
  price: number;
  quantity: number;
  selected: boolean;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class Product implements OnInit {
  products: ProductModel[] = [];
  loading: boolean = false;
  error: string | null = null;
  
  constructor(public productService: ProductService) {
    // S'assurer que le composant a toujours une référence aux produits du service
    this.products = this.productService.products;
  }
  
  ngOnInit(): void {
    this.loadProducts();
  }
  
  getAllProducts(): void {
    this.loading = true;
    
    // Essayer de récupérer depuis le serveur
    this.productService.getAllProducts().subscribe({
      next: resp => {
        this.products = resp;
        this.loading = false;
      },
      error: err => {
        // En cas d'erreur, utiliser les données locales
        this.products = this.productService.products;
        console.log('Utilisant les données locales pour l\'affichage');
        this.loading = false;
      }
    });
  }
  
  loadProducts(): void {
    this.getAllProducts();
  }
  
  handleDelete(product: ProductModel) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
        }
      });
    }
  }
}
