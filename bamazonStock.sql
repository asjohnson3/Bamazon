DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cheez-its", "food", 1, 564);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Airpods", "electronics", 160, 50000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro", "electronics", 2000, 896);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chocolate Protein Powder", "fitness", 50, 1003);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro", "electronics", 2000, 896);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rayban Sunglasses", "clothing", 200, 382);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mophie Phone Charger", "electronics", 100, 242);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Car Battery", "automotive", 196, 160);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dark wood table", "furniture", 2000, 896);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas Shoes", "clothing", 190, 38);