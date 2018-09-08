var mysql = require("mysql");
var inquirer = require("inquirer");

// npm install mysql and inquirer
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
    // productSearch();
});

function runSearch() {

    connection.query("SELECT * FROM products", function(err,res) {
    if (err) throw err;
    console.log("--------------------------------");
    for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + ": " + res[i].product_name + " | $" + res[i].price + " | " + res[i].stock_quantity + " units available");
      }
      console.log("--------------------------------");
      productSearch();
    // orderSearch();
    // connection.end();
  });

}

function productSearch() {
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "Please enter the Product-ID you would like to order: "
    })
    .then(function(answer) {
        var idNum = answer.id;
        inquirer
        .prompt({
          name: "quantity",
          type: "input",
          message: "Please enter how many you would like to order: "
        })
    .then(function(answer) {
        var quant = answer.quantity;
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, { item_id: idNum}, function(err, res) {
            for (var i = 0; i < res.length; i++) {
                var price = res[i].price;
            // console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Availability: " + res[i].stock_quantity);
            if (idNum > res[i].stock_quantity){
                console.log("Insufficient Stock Quantity");
            }else{
                var newQuant = res[i].stock_quantity - quant;
                updateProduct(newQuant, idNum);
                var total = quant * price;
                console.log("Your total is $" + total);
                // process.exit();
                runSearch();
            }
            }
        // runSearch();
      });
    });
    });
}

function updateProduct(newQuant, idNum) {
    // console.log("Updating quantities...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: newQuant
        },
        {
          item_id: idNum
        }
      ],
      function(err, res) {
        // console.log(res.affectedRows + "\n");
        // Call deleteProduct AFTER the UPDATE completes
        // deleteProduct();
      }
    );
  
    // logs the actual query being run
    // console.log(query.sql);
  }
