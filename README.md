# 🎯 MACS Game - Frontend (React)

Bienvenue dans le frontend du projet **MACS GAME** !

MACS GAME est un projet IoT interactif combinant **tir IR**, **détection temps réel** et **affichage dynamique** via MQTT. Le jeu repose sur un pistolet connecté et **3 cibles physiques**. Le but : viser et tirer sur la **bonne cible** indiquée à l'écran en temps réel.

---

## 🚀 À propos du projet

MACS GAME est un **jeu de tir physique connecté** :

- Les joueurs utilisent un **pistolet** IR pour tirer sur des **cibles physiques**.
- Le **backend** traite les tirs et envoie les informations via MQTT.
- Le **frontend React** affiche en temps réel :
  - Quelle cible est la bonne 
  - Les mauvaises cibles 
  - Le score cumulé de chaque joueur (P1 / P2)

> Le frontend est abonné aux topics MQTT publiés par le backend.

---

## 📦 Installation

### 1. Cloner le repo
```git clone https://github.com/AyaAid/MacsGame-react.git ```
```cd MacsGame-react```

###2. Installer les dépendances
```npm install```

###3. Lancer le projet localement
```npm run dev```

---

Développé par Aya AIDOUNI, Celian LOISEL, Mattéo LAMARDELLE et Sacha HAREL
