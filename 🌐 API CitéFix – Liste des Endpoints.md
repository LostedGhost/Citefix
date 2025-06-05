# 🌐 API CitéFix – Liste des Endpoints

---

## 🛂 AUTHENTIFICATION (LostedGhost)

| Méthode | Endpoint       | Description                                              | Fait ? |
| ------- | -------------- | -------------------------------------------------------- | ------ |
| POST    | `/auth/signup` | Crée un nouveau compte utilisateur (citoyen)             |        |
| POST    | `/auth/login`  | Authentifie un utilisateur et retourne un JWT            |        |
| GET     | `/auth/me`     | Retourne le profil de l’utilisateur connecté             |        |
| POST    |                | Créer un nouveau compte utilisateur (oauth)              |        |
| POST    |                | Authentifie un utilisateur avec Oauth et retourne un JWT |        |
| POST    |                | Déconnecter un utilisateur                               |        |

---

## 👤 UTILISATEURS (LostedGhost)

| Méthode | Endpoint                | Description                                    | Fait ? |
| ------- | ----------------------- | ---------------------------------------------- | ------ |
| GET     | `/users/me`             | Récupère les infos du profil connecté          |        |
| PATCH   | `/users/me`             | Met à jour le profil utilisateur               |        |
| DELETE  | `/users/me`             | Suspend le compte (désactivation logique)      |        |
| PATCH   | `/users/deactivate`     | Désactive son compte (Tout utilisateur)        |        |
| PATCH   | `/users/activate`       | Réactive son compte (Tout utilisateur)         |        |
| GET     | `/users`                | [SYSADMIN] Liste tous les comptes utilisateurs |        |
| PATCH   | `/users/:id/deactivate` | [SYSADMIN] Désactive un compte                 |        |
| PATCH   | `/users/:id/activate`   | [SYSADMIN] Réactive un compte                  |        |

---

## 📣 PLAINTES (`complaints`) (LostedGhost)

| Méthode | Endpoint                            | Description                                           | Fait |
| ------- | ----------------------------------- | ----------------------------------------------------- | ---- |
| POST    | `/complaints`                       | [CITOYEN] Créer une nouvelle plainte avec photo/vidéo |      |
| GET     | `/complaints`                       | [TOUS] Lister les plaintes publiques                  |      |
| GET     | `/complaints/:id`                   | [TOUS] Voir les détails d'une plainte                 |      |
| PATCH   | `/complaints/:id/status`            | [RÔLE DYNAMIQUE] Modifier le statut selon le rôle     |      |
| POST    | `/complaints/:id/react`             | Réagir (like/dislike) à une plainte                   |      |
| POST    | `/complaints/:id/comment`           | Ajouter un commentaire à une plainte                  |      |
| POST    | `/complaints/:id/report-comment`    | Signaler un commentaire                               |      |
| POST    | `/complaints/:id/category-proposal` | [TECHNICIEN] Proposer une catégorie                   |      |
| POST    | `/complaints/:id/resolve`           | [CITOYEN] Valider comme Résolue ou Non résolue        |      |

---

## 💬 COMMENTAIRES (LostedGhost)

| Méthode | Endpoint                 | Description                         | Fait ? |
| ------- | ------------------------ | ----------------------------------- | ------ |
| GET     | `/comments/:complaintId` | Voir les commentaires d'une plainte |        |
| DELETE  | `/comments/:id`          | [SYSADMIN] Supprimer un commentaire |        |
| POST    | `/comments/:id/report`   | Signaler un commentaire inapproprié |        |

---

## 🛠️ TECHNICIENS (giovanus)

| Méthode | Endpoint                             | Description                               | Fait ? |
| ------- | ------------------------------------ | ----------------------------------------- | ------ |
| PATCH   | `/complaints/:id/start-intervention` | Mettre une plainte en "En intervention"   |        |
| PATCH   | `/complaints/:id/end-intervention`   | Terminer l’intervention                   |        |
| GET     | `/complaints/assigned-to-me`         | Voir les plaintes assignées au technicien |        |
| GET     | `/rewards/my-payments`               | Voir les paiements dus pour interventions |        |

---

## 🏛️ AUTORITÉ LOCALE (giovanus)

| Méthode | Endpoint                           | Description                                          | Fait ? |
| ------- | ---------------------------------- | ---------------------------------------------------- | ------ |
| GET     | `/complaints/unassigned`           | Voir les plaintes signalées non affectées            |        |
| PATCH   | `/complaints/:id/validate`         | Valider une plainte constatée                        |        |
| PATCH   | `/complaints/:id/reject`           | Rejeter une plainte fausse                           |        |
| PATCH   | `/complaints/:id/assign`           | Assigner un technicien à une plainte                 |        |
| PATCH   | `/complaints/:id/confirm-resolved` | Confirmer que la plainte est réglée                  |        |
| POST    | `/rewards/distribute`              | Répartir les récompenses par zone/technicien/citoyen |        |

---

## 👑 ADMIN (état) (conceptiabello)

| Méthode | Endpoint                   | Description                                               | Fait ? |
| ------- | -------------------------- | --------------------------------------------------------- | ------ |
| GET     | `/admin/complaints/filter` | Filtrer les plaintes par zone, date, catégorie, statut... |        |
| POST    | `/admin/rewards/allocate`  | Allouer un budget de récompense à une plainte ou une zone |        |

---

## 🧑‍💻 ADMINISTRATEUR SYSTÈME (conceptiabello)

| Méthode | Endpoint                             | Description                                     | Faits ? |
| ------- | ------------------------------------ | ----------------------------------------------- | ------- |
| GET     | `/moderation/export`                 | Extraire les données de plaintes (statistiques) |         |
| PATCH   | `/moderation/complaints/:id/disable` | Suspendre une plainte                           |         |
| PATCH   | `/moderation/complaints/:id/enable`  | Réactiver une plainte                           |         |
| GET     | `/moderation/users`                  | Voir tous les comptes utilisateurs sauf soi     |         |
| PATCH   | `/moderation/users/:id/disable`      | Désactiver un utilisateur                       |         |

---

# 🔐 Sécurité des routes

| Rôle requis   | Endpoints protégés                                                  |
| ------------- | ------------------------------------------------------------------- |
| Authentifié   | `/auth/me`, `/users/me`, `/complaints/:id/react`, `/comments`, etc. |
| Rôle TECH     | `/complaints/:id/start-intervention`                                |
| Rôle AUTORITÉ | `/complaints/:id/validate`                                          |
| Rôle ADMIN    | `/admin/*`                                                          |
| Rôle SYSADMIN | `/moderation/*`                                                     |

Utilise `@UseGuards(JwtAuthGuard, RolesGuard)` avec `@Roles(Role.TECHNICIEN)` etc.
