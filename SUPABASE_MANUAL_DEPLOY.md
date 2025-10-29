# Déploiement Manuel Supabase

## 🚨 Problème : Base de données vide en production

### Solution : Déployer manuellement via le Dashboard Supabase

#### 1. Aller sur le Dashboard Supabase
- URL : https://supabase.com/dashboard
- Sélectionnez votre projet : `enfgjsucpmsmrqxencxz`

#### 2. Créer les tables (SQL Editor)

1. **Allez dans SQL Editor** (icône `</>` dans le menu de gauche)
2. **Créez un nouveau script**
3. **Copiez-collez ce code** :

```sql
-- ============================================
-- Base de données : AppleStore (PostgreSQL)
-- ============================================

-- Table des catégories
CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    libelle VARCHAR(100) NOT NULL
);

-- Table des produits
CREATE TABLE IF NOT EXISTS product (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    tagline VARCHAR(255),
    price NUMERIC(10,2),
    image TEXT,
    categoryid INT NOT NULL,
    CONSTRAINT fk_category FOREIGN KEY (categoryid)
        REFERENCES category(id)
        ON DELETE CASCADE
);

-- Table des couleurs
CREATE TABLE IF NOT EXISTS product_color (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(100) REFERENCES product(id) ON DELETE CASCADE,
    name VARCHAR(50),
    hex VARCHAR(10),
    code VARCHAR(50),
    image TEXT
);

-- Table des stockages
CREATE TABLE IF NOT EXISTS product_storage (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(100) REFERENCES product(id) ON DELETE CASCADE,
    size VARCHAR(20),
    price NUMERIC(10,2)
);

-- Table des features
CREATE TABLE IF NOT EXISTS product_feature (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(100) REFERENCES product(id) ON DELETE CASCADE,
    feature TEXT
);
```

4. **Cliquez sur "Run"** pour exécuter le script

#### 3. Insérer les données

1. **Créez un nouveau script** dans SQL Editor
2. **Copiez-collez ce code** :

```sql
-- ============================================
-- Catégories
-- ============================================
INSERT INTO category (libelle) VALUES
('Mac'),
('iPhone'),
('iPad'),
('AirPods'),
('Watch');

-- ============================================
-- 💻 MAC - 5 produits
-- ============================================
INSERT INTO product (id, name, tagline, price, image, categoryid) VALUES
('macbook-pro-14','MacBook Pro 14"','Supercharged by M5',1999.00,'https://res.cloudinary.com/dlna2kuo1/image/upload/macbook_pro_14.jpg',1),
('macbook-pro-16','MacBook Pro 16"','Power. Moves.',2499.00,'https://res.cloudinary.com/dlna2kuo1/image/upload/macbook_pro_16.jpg',1),
('macbook-air-m5','MacBook Air M5','Light. Speed.',1199.00,'https://res.cloudinary.com/dlna2kuo1/image/upload/macbook_air_m5.jpg',1),
('imac-24','iMac 24"','Boldly colorful. Brilliantly capable.',1499.00,'https://res.cloudinary.com/dlna2kuo1/image/upload/imac_24.jpg',1),
('mac-mini-m5','Mac Mini M5','Compact. Powerful.',699.00,'https://res.cloudinary.com/dlna2kuo1/image/upload/mac_mini_m5.jpg',1);

-- Mac colors with images
INSERT INTO product_color (product_id,name,hex,code,image) VALUES
('macbook-pro-14','Space Gray','#8E8E93','space-gray','https://res.cloudinary.com/dlna2kuo1/image/upload/macbook_pro_14_spacegray.jpg'),
('macbook-pro-14','Silver','#C7C7CC','silver','https://res.cloudinary.com/dlna2kuo1/image/upload/macbook_pro_14_silver.jpg'),
('macbook-pro-16','Space Gray','#8E8E93','space-gray','https://res.cloudinary.com/dlna2kuo1/image/upload/macbook_pro_16_spacegray.jpg'),
('macbook-pro-16','Silver','#C7C7CC','silver','https://res.cloudinary.com/dlna2kuo1/image/upload/macbook_pro_16_silver.jpg'),
('macbook-air-m5','Space Gray','#8E8E93','space-gray','https://res.cloudinary.com/dlna2kuo1/image/upload/macbook_air_m5_spacegray.jpg'),
('macbook-air-m5','Silver','#C7C7CC','silver','https://res.cloudinary.com/dlna2kuo1/image/upload/macbook_air_m5_silver.jpg'),
('imac-24','Green','#4CAF50','green','https://res.cloudinary.com/dlna2kuo1/image/upload/imac_24_green.jpg'),
('imac-24','Blue','#2196F3','blue','https://res.cloudinary.com/dlna2kuo1/image/upload/imac_24_blue.jpg'),
('mac-mini-m5','Silver','#C7C7CC','silver','https://res.cloudinary.com/dlna2kuo1/image/upload/mac_mini_m5_silver.jpg');

-- Mac features
INSERT INTO product_feature (product_id, feature) VALUES
('macbook-pro-14','M5 chip'),
('macbook-pro-14','Liquid Retina XDR display'),
('macbook-pro-14','Up to 22 hours battery'),
('macbook-pro-14','Pro camera system'),
('macbook-pro-16','M5 chip'),
('macbook-pro-16','Liquid Retina XDR display'),
('macbook-pro-16','Up to 22 hours battery'),
('macbook-pro-16','Pro camera system'),
('macbook-air-m5','M5 chip'),
('macbook-air-m5','Liquid Retina display'),
('macbook-air-m5','Up to 18 hours battery'),
('macbook-air-m5','1080p FaceTime HD camera'),
('imac-24','M5 chip'),
('imac-24','24-inch 4.5K Retina display'),
('imac-24','1080p FaceTime HD camera'),
('imac-24','Studio-quality three-mic array'),
('mac-mini-m5','M5 chip'),
('mac-mini-m5','8-core CPU'),
('mac-mini-m5','10-core GPU'),
('mac-mini-m5','16-core Neural Engine');

-- ============================================
-- 📱 iPHONE - 5 produits
-- ============================================
INSERT INTO product (id, name, tagline, price, image, categoryid) VALUES
('iphone-17-pro','iPhone 17 Pro','Titanium. So strong. So light. So Pro.',1199.00,'https://res.cloudinary.com/dlna2kuo1/image/upload/iphone_17_pro.jpg',2),
('iphone-17','iPhone 17','A total powerhouse.',899.00,'https://res.cloudinary.com/dlna2kuo1/image/upload/iphone_17.jpg',2),
('iphone-se-4','iPhone SE 4','Serious power. Serious value.',499.00,'https://res.cloudinary.com/dlna2kuo1/image/upload/iphone_se4.jpg',2),
('iphone-16','iPhone 16','Built for everything you do.',799.00,'https://res.cloudinary.com/dlna2kuo1/image/upload/iphone_16.jpg',2),
('iphone-15','iPhone 15','Dynamic Island. A magical way to interact.',699.00,'https://res.cloudinary.com/dlna2kuo1/image/upload/iphone_15.jpg',2);

-- iPhone colors with images
INSERT INTO product_color (product_id,name,hex,code,image) VALUES
('iphone-17-pro','Silver','#C7C7CC','silver','https://res.cloudinary.com/dlna2kuo1/image/upload/iphone17pro_silver.jpg'),
('iphone-17-pro','Space Gray','#8E8E93','space-gray','https://res.cloudinary.com/dlna2kuo1/image/upload/iphone17pro_spacegray.jpg'),
('iphone-17-pro','Gold','#FFD700','gold','https://res.cloudinary.com/dlna2kuo1/image/upload/iphone17pro_gold.jpg'),
('iphone-17','Blue','#2196F3','blue','https://res.cloudinary.com/dlna2kuo1/image/upload/iphone17_blue.jpg'),
('iphone-17','Red','#F44336','red','https://res.cloudinary.com/dlna2kuo1/image/upload/iphone17_red.jpg'),
('iphone-se-4','White','#FFFFFF','white','https://res.cloudinary.com/dlna2kuo1/image/upload/iphone_se4_white.jpg'),
('iphone-16','Blue','#2196F3','blue','https://res.cloudinary.com/dlna2kuo1/image/upload/iphone16_blue.jpg'),
('iphone-16','Pink','#FFB6C1','pink','https://res.cloudinary.com/dlna2kuo1/image/upload/iphone16_pink.jpg'),
('iphone-15','Blue','#2196F3','blue','https://res.cloudinary.com/dlna2kuo1/image/upload/iphone15_blue.jpg'),
('iphone-15','Pink','#FFB6C1','pink','https://res.cloudinary.com/dlna2kuo1/image/upload/iphone15_pink.jpg');

-- iPhone features
INSERT INTO product_feature (product_id, feature) VALUES
('iphone-17-pro','A17 Bionic chip'),
('iphone-17-pro','ProMotion display'),
('iphone-17-pro','Cinematic mode'),
('iphone-17-pro','5G connectivity'),
('iphone-17','A17 Bionic chip'),
('iphone-17','Super Retina XDR display'),
('iphone-17','Advanced camera system'),
('iphone-17','5G connectivity'),
('iphone-se-4','A15 Bionic chip'),
('iphone-se-4','4.7-inch Retina HD display'),
('iphone-se-4','12MP camera'),
('iphone-se-4','5G connectivity'),
('iphone-16','A16 Bionic chip'),
('iphone-16','Super Retina XDR display'),
('iphone-16','Advanced camera system'),
('iphone-16','5G connectivity'),
('iphone-15','A16 Bionic chip'),
('iphone-15','Super Retina XDR display'),
('iphone-15','Advanced camera system'),
('iphone-15','5G connectivity');
```

3. **Cliquez sur "Run"** pour exécuter le script

#### 4. Vérifier les données

1. **Allez dans Table Editor** (icône de table dans le menu de gauche)
2. **Vérifiez que les tables existent** : `category`, `product`, `product_color`, `product_storage`, `product_feature`
3. **Vérifiez que les données sont présentes** en cliquant sur chaque table

#### 5. Tester en production

1. **Allez sur votre site Vercel**
2. **Ouvrez la console** (F12)
3. **Cliquez sur "Debug Config"** pour voir les variables d'environnement
4. **Cliquez sur "Test Connexion"** pour tester Supabase
5. **Cliquez sur "Test Produits"** pour voir les données

### Résultat attendu

Après ces étapes, vous devriez voir :
- ✅ Les variables d'environnement configurées
- ✅ La connexion Supabase fonctionnelle
- ✅ Les produits s'affichent sur la page Mac
- ✅ Les produits s'affichent sur la page iPhone
