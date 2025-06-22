import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductModel } from '../product/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export class ProductForm implements OnInit {
  product: ProductModel = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    selected: false
  };
  
  isEditing = false;
  loading = false;
  error: string | null = null;
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // Vérifier si nous modifions un produit existant
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loading = true;
      this.productService.getProduct(Number(id)).subscribe({
        next: (product) => {
          this.product = product;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Produit non trouvé';
          this.loading = false;
          console.error('Erreur:', err);
        }
      });
    }
  }
  
  saveProduct(): void {
    this.loading = true;
    this.error = null;
    
    if (this.isEditing) {
      this.productService.updateProduct(this.product).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/products']);
        },
        error: (err) => {
          this.error = 'Erreur lors de la mise à jour du produit';
          this.loading = false;
          console.error('Erreur:', err);
        }
      });
    } else {
      this.productService.addProduct(this.product).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/products']);
        },
        error: (err) => {
          this.error = 'Erreur lors de l\'ajout du produit';
          this.loading = false;
          console.error('Erreur:', err);
        }
      });
    }
  }
  
  cancel(): void {
    this.router.navigate(['/products']);
  }
}
