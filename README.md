# Gestion de Produits - Application Angular avec Backend Spring Boot

## Description
Cette application est une interface complète de gestion de produits développée avec Angular 20 (composants standalone) et qui s'intègre parfaitement avec un backend Spring Boot. Elle permet de réaliser toutes les opérations CRUD (Création, Lecture, Mise à jour, Suppression) sur des produits, avec une interface utilisateur entièrement en français.

Cette application est basée sur le tutoriel de Mohamed Youssfi et a été adaptée pour utiliser les fonctionnalités les plus récentes d'Angular.

## Captures d'écran

### Liste des produits
![Liste des produits](![image](https://github.com/user-attachments/assets/44719c15-192d-4819-bee2-b8cb0e8f7952)
)
*La page principale affiche tous les produits avec leurs informations et options d'actions.*

### Formulaire d'ajout/modification
![Formulaire de produit](![image](https://github.com/user-attachments/assets/7c04529f-47b4-44ae-a14f-5d95e4e70346)
)
*Interface pour ajouter ou modifier un produit.*
![image](https://github.com/user-attachments/assets/10a323da-59ec-4f42-9ef6-bfac858119f9)


## Fonctionnalités

- ✅ Affichage de la liste des produits
- ✅ Ajout d'un nouveau produit
- ✅ Modification d'un produit existant
- ✅ Suppression d'un produit
- ✅ Système de fallback local en cas d'indisponibilité du backend
- ✅ Interface utilisateur 100% en français
- ✅ Design responsive avec Bootstrap

## Architecture

### Frontend (Angular 20)
- Composants standalone
- Services injectables pour la gestion des données
- Utilisation des Observables RxJS pour les opérations asynchrones
- Interface utilisateur avec Bootstrap et Bootstrap Icons
- Stockage local (localStorage) pour la persistance côté client

### Backend (Spring Boot)
- API REST pour les opérations CRUD
- Persistence avec JPA/Hibernate
- Cross-Origin Resource Sharing (CORS) activé

## Installation et démarrage

### Backend (Spring Boot)

```bash
# Se positionner dans le répertoire du backend
cd reference-backend

# Compiler et lancer le serveur
./mvnw spring-boot:run
```
Le backend sera accessible sur http://localhost:8083

### Frontend (Angular)

```bash
# Dans le répertoire principal du projet
npm install
ng serve --open
```
L'application Angular sera accessible sur http://localhost:4200

## Structure du projet

```
├── src/
│   ├── app/
│   │   ├── product/         # Composant de liste des produits
│   │   ├── product-form/    # Formulaire d'ajout/modification
│   │   └── services/        # Services pour la communication avec le backend
│   └── assets/              # Ressources statiques
├── reference-backend/       # Backend Spring Boot
└── README.md               # Ce fichier
```

## Modèle de données

Chaque produit possède les propriétés suivantes :

- `id`: Identifiant unique (généré automatiquement)
- `name`: Nom du produit
- `price`: Prix du produit
- `quantity`: Quantité en stock
- `selected`: État de sélection du produit

## API Endpoints

| Méthode | URL                       | Description                   |
|---------|---------------------------|-------------------------------|
| GET     | /products                 | Récupérer tous les produits   |
| GET     | /products/{id}            | Récupérer un produit par ID   |
| POST    | /products                 | Créer un nouveau produit      |
| PUT     | /products/{id}            | Mettre à jour un produit      |
| DELETE  | /products/{id}            | Supprimer un produit          |

## Développement

### Prérequis

- Node.js (version 16+)
- Angular CLI (version 17+)
- JDK 17+
- Maven 3.8+

## Auteur

Basé sur le tutoriel de Mohamed Youssfi, adapté et amélioré.
