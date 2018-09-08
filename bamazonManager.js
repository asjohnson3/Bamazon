var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
  .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit Program"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        viewProducts();
        break;
        
      case "View Low Inventory":
        viewLow();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add New Product":
        addProduct();
        break;
    
      case "Exit Program":
        process.exit();
        break;
      }
    });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function(err,res) {
        if (err) throw err;
        console.log("\n");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ": " + res[i].product_name + " | $" + res[i].price + " | " + res[i].stock_quantity + " units available");
          }
        console.log("\n");
          runSearch();
    });
}

function viewLow() {
    connection.query("SELECT * FROM products", function(err,res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            var inventory = res[i].stock_quantity;
            var product = res[i].product_name;
            var counter = 0;
            if (inventory < 5) {
                console.log("You need to order more " + product +". You only have " + inventory + " units left in stock");
                counter ++;
            }

          }
          if (counter === 0){
            console.log("\nThere is no need to order anything at the current time. \n")
          }
          runSearch();
    });
}

function addInventory() {
    inquirer
    .prompt([
      {
        name: "ID",
        type: "input",
        message: "Please enter the ID of the item you wish to update: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "restock",
        type: "input",
        message: "Please enter how much new inventory you wish to add: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
        var itemID = answer.ID;
        var restockValue = Number(answer.restock);
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, { item_id: itemID}, function(err, res) {

            for (var i = 0; i < res.length; i++) {
                var present = Number(res[i].stock_quantity);
                var newQuant = present + restockValue;
                updateProduct(itemID, newQuant);
                console.log("\n" + res[i].product_name + "'s inventory was updated to " + newQuant + " units \n");
                runSearch();
            }

      });
    });
}

function updateProduct(itemID, newQuant) {
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
            stock_quantity: newQuant
          },
        {
          item_id: itemID
        }
      ],
      function(err, res) {
        // console.log(res.affectedRows + "\n");
        // Call deleteProduct AFTER the UPDATE completes
        // deleteProduct();
      }
    );
  }

function addProduct() {
    inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Please enter the Product Name: ",
        // validate: function(value) {
        //   if (isNaN(value) === false) {
        //     return true;
        //   }
        //   return false;
        // }
      },
      {
        name: "department",
        type: "input",
        message: "Please enter the Department Name: ",
        // validate: function(value) {
        //   if (isNaN(value) === false) {
        //     return true;
        //   }
        //   return false;
        // }
      },
      {
        name: "price",
        type: "input",
        message: "Please enter the Price of the Product: ",
        // validate: function(value) {
        //   if (isNaN(value) === false) {
        //     return true;
        //   }
        //   return false;
        // }
      },
      {
        name: "quantity",
        type: "input",
        message: "Please enter the Inventory Quantity: ",
        // validate: function(value) {
        //   if (isNaN(value) === false) {
        //     return true;
        //   }
        //   return false;
        // }
      }
    ])
    .then(function(answer) {
    var name = answer.name;
    var department = answer.department;
    var price = answer.price;
    var quantity = answer.quantity;
    console.log(name, department, price, quantity);
    connection.query("INSERT INTO products SET ?",
        {
          product_name: name,
          department_name: department,
          price: price,
          stock_quantity: quantity
        },
        function(err) {
          if (err) throw err;
            runSearch();
        }
    );
    // "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Cheez-its', 'food', 1, 564); "
    });
}