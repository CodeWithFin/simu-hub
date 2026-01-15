-- Seed Products: Phone Models
-- This file contains INSERT statements for all phone models
-- NOTE: All prices are in Kenyan Shillings (KSH)

-- Apple iPhone Models (6 types)
INSERT INTO products (brand, model, price, storage_capacity, ram, camera_specs, battery_capacity, screen_size, has_5g, color, stock_status) VALUES
-- iPhone 16 Pro Max
('Apple', 'iPhone 16 Pro Max', 1199.00, '256GB', '8GB', '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto', '4676 mAh', '6.9"', true, 'Natural Titanium', 'in_stock'),
('Apple', 'iPhone 16 Pro Max', 1299.00, '512GB', '8GB', '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto', '4676 mAh', '6.9"', true, 'Natural Titanium', 'in_stock'),
('Apple', 'iPhone 16 Pro Max', 1499.00, '1TB', '8GB', '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto', '4676 mAh', '6.9"', true, 'Natural Titanium', 'in_stock'),

-- iPhone 16 Pro
('Apple', 'iPhone 16 Pro', 999.00, '128GB', '8GB', '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto', '3582 mAh', '6.3"', true, 'Natural Titanium', 'in_stock'),
('Apple', 'iPhone 16 Pro', 1099.00, '256GB', '8GB', '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto', '3582 mAh', '6.3"', true, 'Natural Titanium', 'in_stock'),
('Apple', 'iPhone 16 Pro', 1299.00, '512GB', '8GB', '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto', '3582 mAh', '6.3"', true, 'Natural Titanium', 'in_stock'),
('Apple', 'iPhone 16 Pro', 1499.00, '1TB', '8GB', '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto', '3582 mAh', '6.3"', true, 'Natural Titanium', 'in_stock'),

-- iPhone 16 Plus
('Apple', 'iPhone 16 Plus', 899.00, '128GB', '8GB', '48MP Fusion + 12MP Ultra Wide', '4674 mAh', '6.7"', true, 'Blue', 'in_stock'),
('Apple', 'iPhone 16 Plus', 999.00, '256GB', '8GB', '48MP Fusion + 12MP Ultra Wide', '4674 mAh', '6.7"', true, 'Blue', 'in_stock'),
('Apple', 'iPhone 16 Plus', 1199.00, '512GB', '8GB', '48MP Fusion + 12MP Ultra Wide', '4674 mAh', '6.7"', true, 'Blue', 'in_stock'),

-- iPhone 16
('Apple', 'iPhone 16', 799.00, '128GB', '8GB', '48MP Fusion + 12MP Ultra Wide', '3561 mAh', '6.1"', true, 'Blue', 'in_stock'),
('Apple', 'iPhone 16', 899.00, '256GB', '8GB', '48MP Fusion + 12MP Ultra Wide', '3561 mAh', '6.1"', true, 'Blue', 'in_stock'),
('Apple', 'iPhone 16', 1099.00, '512GB', '8GB', '48MP Fusion + 12MP Ultra Wide', '3561 mAh', '6.1"', true, 'Blue', 'in_stock'),

-- iPhone 15 Pro Max
('Apple', 'iPhone 15 Pro Max', 1099.00, '256GB', '8GB', '48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto', '4441 mAh', '6.7"', true, 'Natural Titanium', 'in_stock'),
('Apple', 'iPhone 15 Pro Max', 1199.00, '512GB', '8GB', '48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto', '4441 mAh', '6.7"', true, 'Natural Titanium', 'in_stock'),
('Apple', 'iPhone 15 Pro Max', 1399.00, '1TB', '8GB', '48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto', '4441 mAh', '6.7"', true, 'Natural Titanium', 'in_stock'),

-- iPhone SE 4
('Apple', 'iPhone SE 4', 429.00, '128GB', '8GB', '48MP Single Rear Camera', '3279 mAh', '6.1"', true, 'Black', 'in_stock'),

-- Samsung Galaxy Models (5 types)
-- Galaxy S25 Ultra
('Samsung', 'Galaxy S25 Ultra', 1299.00, '256GB', '12GB', '200MP Main + 50MP Ultra Wide + 50MP 5x Zoom + 10MP 3x Zoom', '5000 mAh', '6.9"', true, 'Titanium Black', 'in_stock'),
('Samsung', 'Galaxy S25 Ultra', 1399.00, '512GB', '12GB', '200MP Main + 50MP Ultra Wide + 50MP 5x Zoom + 10MP 3x Zoom', '5000 mAh', '6.9"', true, 'Titanium Black', 'in_stock'),
('Samsung', 'Galaxy S25 Ultra', 1599.00, '1TB', '16GB', '200MP Main + 50MP Ultra Wide + 50MP 5x Zoom + 10MP 3x Zoom', '5000 mAh', '6.9"', true, 'Titanium Black', 'in_stock'),

-- Galaxy S25 Plus
('Samsung', 'Galaxy S25 Plus', 999.00, '256GB', '12GB', '50MP Main + 12MP Ultra Wide + 10MP 3x Zoom', '4900 mAh', '6.7"', true, 'Titanium Gray', 'in_stock'),
('Samsung', 'Galaxy S25 Plus', 1099.00, '512GB', '12GB', '50MP Main + 12MP Ultra Wide + 10MP 3x Zoom', '4900 mAh', '6.7"', true, 'Titanium Gray', 'in_stock'),

-- Galaxy S25
('Samsung', 'Galaxy S25', 799.00, '128GB', '8GB', '50MP Main + 12MP Ultra Wide + 10MP 3x Zoom', '4000 mAh', '6.2"', true, 'Titanium Gray', 'in_stock'),
('Samsung', 'Galaxy S25', 899.00, '256GB', '8GB', '50MP Main + 12MP Ultra Wide + 10MP 3x Zoom', '4000 mAh', '6.2"', true, 'Titanium Gray', 'in_stock'),
('Samsung', 'Galaxy S25', 1099.00, '512GB', '12GB', '50MP Main + 12MP Ultra Wide + 10MP 3x Zoom', '4000 mAh', '6.2"', true, 'Titanium Gray', 'in_stock'),

-- Galaxy Z Fold 6
('Samsung', 'Galaxy Z Fold 6', 1799.00, '256GB', '12GB', '50MP Main + 12MP Ultra Wide + 10MP 3x Telephoto', '4400 mAh', '7.6" Foldable', true, 'Phantom Black', 'in_stock'),
('Samsung', 'Galaxy Z Fold 6', 1999.00, '512GB', '12GB', '50MP Main + 12MP Ultra Wide + 10MP 3x Telephoto', '4400 mAh', '7.6" Foldable', true, 'Phantom Black', 'in_stock'),
('Samsung', 'Galaxy Z Fold 6', 2199.00, '1TB', '12GB', '50MP Main + 12MP Ultra Wide + 10MP 3x Telephoto', '4400 mAh', '7.6" Foldable', true, 'Phantom Black', 'in_stock'),

-- Galaxy A55 5G
('Samsung', 'Galaxy A55 5G', 449.00, '128GB', '8GB', '50MP Main + 12MP Ultra Wide + 5MP Macro', '5000 mAh', '6.6"', true, 'Awesome Navy', 'in_stock'),
('Samsung', 'Galaxy A55 5G', 499.00, '256GB', '8GB', '50MP Main + 12MP Ultra Wide + 5MP Macro', '5000 mAh', '6.6"', true, 'Awesome Navy', 'in_stock'),
('Samsung', 'Galaxy A55 5G', 549.00, '256GB', '12GB', '50MP Main + 12MP Ultra Wide + 5MP Macro', '5000 mAh', '6.6"', true, 'Awesome Navy', 'in_stock'),

-- Google Pixel Models (4 types)
-- Pixel 9 Pro XL
('Google', 'Pixel 9 Pro XL', 1299.00, '128GB', '16GB', '50MP Main + 48MP Ultra Wide + 48MP 5x Telephoto', '5060 mAh', '6.8"', true, 'Obsidian', 'in_stock'),
('Google', 'Pixel 9 Pro XL', 1399.00, '256GB', '16GB', '50MP Main + 48MP Ultra Wide + 48MP 5x Telephoto', '5060 mAh', '6.8"', true, 'Obsidian', 'in_stock'),
('Google', 'Pixel 9 Pro XL', 1599.00, '512GB', '16GB', '50MP Main + 48MP Ultra Wide + 48MP 5x Telephoto', '5060 mAh', '6.8"', true, 'Obsidian', 'in_stock'),
('Google', 'Pixel 9 Pro XL', 1799.00, '1TB', '16GB', '50MP Main + 48MP Ultra Wide + 48MP 5x Telephoto', '5060 mAh', '6.8"', true, 'Obsidian', 'in_stock'),

-- Pixel 9 Pro
('Google', 'Pixel 9 Pro', 999.00, '128GB', '16GB', '50MP Main + 48MP Ultra Wide + 48MP 5x Telephoto', '4700 mAh', '6.3"', true, 'Obsidian', 'in_stock'),
('Google', 'Pixel 9 Pro', 1099.00, '256GB', '16GB', '50MP Main + 48MP Ultra Wide + 48MP 5x Telephoto', '4700 mAh', '6.3"', true, 'Obsidian', 'in_stock'),
('Google', 'Pixel 9 Pro', 1299.00, '512GB', '16GB', '50MP Main + 48MP Ultra Wide + 48MP 5x Telephoto', '4700 mAh', '6.3"', true, 'Obsidian', 'in_stock'),
('Google', 'Pixel 9 Pro', 1499.00, '1TB', '16GB', '50MP Main + 48MP Ultra Wide + 48MP 5x Telephoto', '4700 mAh', '6.3"', true, 'Obsidian', 'in_stock'),

-- Pixel 9
('Google', 'Pixel 9', 699.00, '128GB', '12GB', '50MP Main + 48MP Ultra Wide', '4700 mAh', '6.3"', true, 'Obsidian', 'in_stock'),
('Google', 'Pixel 9', 799.00, '256GB', '12GB', '50MP Main + 48MP Ultra Wide', '4700 mAh', '6.3"', true, 'Obsidian', 'in_stock'),

-- Pixel 9 Pro Fold
('Google', 'Pixel 9 Pro Fold', 1799.00, '256GB', '16GB', '48MP Main + 10.5MP Ultra Wide + 10.8MP 5x Telephoto', '4650 mAh', '8.0" Foldable', true, 'Obsidian', 'in_stock'),
('Google', 'Pixel 9 Pro Fold', 1999.00, '512GB', '16GB', '48MP Main + 10.5MP Ultra Wide + 10.8MP 5x Telephoto', '4650 mAh', '8.0" Foldable', true, 'Obsidian', 'in_stock'),

-- Oppo Models (3 types)
-- Oppo Find X8 Pro
('Oppo', 'Find X8 Pro', 1099.00, '256GB', '12GB', 'Quad 50MP System (Two Periscope: 3x and 6x)', '5910 mAh', '6.78"', true, 'Glossy Black', 'in_stock'),
('Oppo', 'Find X8 Pro', 1199.00, '512GB', '12GB', 'Quad 50MP System (Two Periscope: 3x and 6x)', '5910 mAh', '6.78"', true, 'Glossy Black', 'in_stock'),
('Oppo', 'Find X8 Pro', 1399.00, '1TB', '16GB', 'Quad 50MP System (Two Periscope: 3x and 6x)', '5910 mAh', '6.78"', true, 'Glossy Black', 'in_stock'),

-- Oppo Find X8
('Oppo', 'Find X8', 899.00, '256GB', '12GB', '50MP Main + 50MP Ultra Wide + 50MP 3x Telephoto', '5630 mAh', '6.59"', true, 'Glossy Black', 'in_stock'),
('Oppo', 'Find X8', 999.00, '512GB', '12GB', '50MP Main + 50MP Ultra Wide + 50MP 3x Telephoto', '5630 mAh', '6.59"', true, 'Glossy Black', 'in_stock'),
('Oppo', 'Find X8', 1099.00, '512GB', '16GB', '50MP Main + 50MP Ultra Wide + 50MP 3x Telephoto', '5630 mAh', '6.59"', true, 'Glossy Black', 'in_stock'),

-- Oppo Reno 12 Pro 5G
('Oppo', 'Reno 12 Pro 5G', 599.00, '256GB', '12GB', '50MP Main + 8MP Ultra Wide + 50MP 2x Telephoto', '5000 mAh', '6.7"', true, 'Starry Black', 'in_stock'),
('Oppo', 'Reno 12 Pro 5G', 649.00, '512GB', '12GB', '50MP Main + 8MP Ultra Wide + 50MP 2x Telephoto', '5000 mAh', '6.7"', true, 'Starry Black', 'in_stock');
