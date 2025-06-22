import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { ProductModel } from '../product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // URL du backend de référence
  private baseUrl = 'http://localhost:8083/products';
  // Accessible publiquement pour le component
  products: ProductModel[] = [];

  constructor(private http: HttpClient) {
    // Charger les produits depuis le localStorage au démarrage
    this.loadFromLocalStorage();
  }

  // Charger les produits depuis le localStorage
  private loadFromLocalStorage(): void {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    }
  }

  // Sauvegarder les produits dans le localStorage
  private saveToLocalStorage(): void {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  // Get all products
  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.baseUrl}`).pipe(
      tap(data => {
        console.log('Produits chargés avec succès:', data);
        this.products = data;
        this.saveToLocalStorage();
      }),
      catchError(err => {
        console.error('Erreur lors du chargement des produits:', err);
        return of(this.products); // Retourner les produits stockés localement en cas d'erreur
      })
    );
  }

  // Get product by id
  getProduct(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.baseUrl}/${id}`).pipe(
      catchError(err => {
        console.error(`Erreur lors de la récupération du produit ${id}:`, err);
        // Fallback vers les données locales
        const product = this.products.find(p => p.id === id);
        if (!product) {
          throw new Error(`Produit avec id ${id} non trouvé`);
        }
        return of(product);
      })
    );
  }

  // Add new product
  addProduct(product: ProductModel): Observable<ProductModel> {
    // Créer une copie du produit sans l'ID pour POST
    const productToAdd = {
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      selected: product.selected
    };
    
    return this.http.post<ProductModel>(`${this.baseUrl}`, productToAdd).pipe(
      tap(newProduct => {
        console.log('Produit ajouté avec succès:', newProduct);
        this.products.push(newProduct);
        this.saveToLocalStorage();
      }),
      catchError(err => {
        console.error('Erreur lors de l\'ajout du produit:', err);
        console.log('Détails de l\'erreur:', JSON.stringify(err));
        console.log('Création d\'un produit en mode fallback local');
        // Fallback en cas d'erreur
        const newProduct = {...product};
        newProduct.id = this.getNextId();
        this.products.push(newProduct);
        this.saveToLocalStorage();
        return of(newProduct);
      })
    );
  }
  
  // Update existing product
  updateProduct(product: ProductModel): Observable<ProductModel> {
    // Créer une copie du produit pour PUT
    const productToUpdate = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      selected: product.selected
    };
    
    return this.http.put<ProductModel>(`${this.baseUrl}/${product.id}`, productToUpdate).pipe(
      tap(updatedProduct => {
        console.log('Produit mis à jour avec succès:', updatedProduct);
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
          this.saveToLocalStorage();
        }
      }),
      catchError(err => {
        console.error('Erreur lors de la mise à jour du produit:', err);
        console.log('Détails de l\'erreur:', JSON.stringify(err));
        console.log('Mise à jour du produit en mode fallback local');
        // Fallback en cas d'erreur
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products[index] = product;
          this.saveToLocalStorage();
        }
        return of(product);
      })
    );
  }
  
  // Delete product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        console.log('Produit supprimé avec succès');
        this.products = this.products.filter(p => p.id !== id);
        this.saveToLocalStorage();
      }),
      catchError(err => {
        console.error('Erreur lors de la suppression du produit:', err);
        // Fallback en cas d'erreur
        this.products = this.products.filter(p => p.id !== id);
        this.saveToLocalStorage();
        return of(undefined);
      })
    );
  }

  // Helper method to generate next id for local storage operation
  private getNextId(): number {
    if (this.products.length === 0) {
      return 1;
    }
    return Math.max(...this.products.map(p => p.id)) + 1;
  }

  /**
   * Handle HTTP operation that failed.
   */
  private handleError<T>(operation = 'opération') {
    return (error: any): Observable<T> => {
      console.error(`${operation} échoué: ${error.message}`);
      // Let the app keep running by returning an empty result
      return of(null as T);
    };
  }
}
