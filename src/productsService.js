// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;


const getProducts = () => {
    // get all products
    return JSON.stringify(productsList) 
}

const getProductsById = (productId, done) => {
  return new Promise( (resolve,reject)=>{
    // get a product by ID
    let product = productsList.find((item)=> item.id === productId )
    if(!product){
      return done("Requested product doesn't exist..!", null);
    }else{
      return done(null, JSON.stringify(product));
    }
  })
}

const saveProduct = (newProduct, done) => {
 return new Promise ((resolve,reject)=>{
  let product = productsList.find((item)=> item.id === newProduct.id )
  if(!product){
      productsList.push(newProduct)
      resolve(done(null, JSON.stringify(productsList)));
  }else{
      resolve(done("Product already exists..!", null));
  }
  
 })
}

const updateProduct = (productId, updateData, done) => {
  return new Promise((resolve,reject)=>{
    const product = productsList.find((item)=> item.id === productId)
    if(!product){
      resolve(done("Requested product doesn't exist..!", null));
    }else{
      product.name = updateData.name
      product.description = updateData.description
      product.price = updateData.price
      product.quantity = product.quantity
      let updatedProductList = productsList;
      // update the product list
      resolve(done(null, JSON.stringify(updatedProductList)));
    }
    
  })
  
}

const deleteProduct = (productId, done) => {
  return new Promise((resolve,reject)=>{
    const product = productsList.find((item)=> item.id === productId)
    if(!product){
      resolve(done("Requested product doesn't exist..!", null)); 
    }
    else{
      const index = productsList.indexOf(product)
      productsList.splice(index,1)
      // delete a product 
      resolve(done(null, JSON.stringify(productsList)));
    }
  })
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}