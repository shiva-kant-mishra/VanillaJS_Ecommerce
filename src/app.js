//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const PORT = 5000
const products = require("./products.json").products
const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (req, res) => {
  // Get all products
  console.log(req.url)
  // console.log(req)

  if ((req.url === "/ecomm/products") && (req.method === "GET")){
    let products = productsService.getProducts()
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(products)
  }

  // Get a product with specified id
  else if ((req.url.match(/\/ecomm\/products\/([0-9]+)/)) && (req.method === "GET")){
    
    const productId = parseInt(req.url.split("/")[3])
    productsService.getProductsById(productId,(err,data)=>{
       if(err){
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end("Product not found")
      }else{
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(data)
      }
    })
    
  }

  // Create a new product
  else if( (req.url === "/ecomm/products") && (req.method === "POST") ){
    let payload = await getRequestData(req)
    productsService.saveProduct(JSON.parse(payload),(err,data)=>{
      if(err){
        res.writeHead(200, { "Content-Type": "application/json" } )
        res.end("Unable to Add Product , try again")
      }
      else{
        res.writeHead(200, { "Content-Type": "application/json" } )
        res.end(data)
      }
    })
  }

  // Update a specific product
  else if ((req.url.match(/\/ecomm\/products\/([0-9]+)/)) && (req.method === "PUT")){
    let payload = JSON.parse(await getRequestData(req))
    let productId = parseInt(req.url.split("/")[3])
    // console.log(payload,productId)
    productsService.updateProduct(productId,payload,(err,data)=>{
      if(err){
        res.writeHead(200, { "Content-Type": "application/json" } )
        res.end(err)
      }
      else{
        res.writeHead(200, { "Content-Type": "application/json" } )
        res.end(data)
      }
    })
  }


  // Delete a specific Product
  else if ((req.url.match(/\/ecomm\/products\/([0-9]+)/)) && (req.method === "DELETE")){
    let productId = parseInt(req.url.split("/")[3])
    productsService.deleteProduct(productId,(err, data)=>{
      if (err){
        res.writeHead(200, { "Content-Type": "application/json" } )
        res.end(err)
      }else{
        res.writeHead(200, { "Content-Type": "application/json" } )
        res.end(data)
      }
    })
  }

  
  else{
    res.writeHead(200, { "Content-Type": "application/json" } )
    res.end("Not a valid operation")
  }
});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})