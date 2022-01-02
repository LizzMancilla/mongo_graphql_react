const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
var buildSchema = require('graphql').buildSchema;
const mongoose = require('mongoose');

const productModel = require('./models/product');

var fs = require('fs');
request = require('request');
const cors = require('cors');

var schema = buildSchema(`
  type Product {
    code: String
    position: Int
    quantity: Int
    image: String
    price: Int
    description: String
  }

  type Query {
    products: [Product]
    product(code: String): [Product]
  }

  type Mutation {
    addProduct(code: String, position: Int, quantity: Int, image_url: String, image: String, price: Int, description: String): Product
    updProduct(code: String, position: Int, quantity: Int, image_url: String, image: String, price: Int, description: String): Product
    delProduct(code: String): Product
  }
`);

var root = {
    products: () => {
      return productModel.find();
    },
    product: (input) => {
      return productModel.find({code:input.code});
    },
    addProduct: (input) => {
      request.head(input.image_url, function(err, res, body){
        request(input.image_url).pipe(fs.createWriteStream('/images/'+input.image));
      });

      const newModel = new productModel(input);
      return newProduct = newModel.save();
    },
    updProduct: (input) => {
      iniProd = productModel.find({code:input.code}).exec();
      iniProd.then(function(prods){
        prods.forEach(function(prod){
          console.log(prod.image);
          fs.unlinkSync('/images/'+prod.image);
        });
      })
      request.head(input.image_url, function(err, res, body){
        request(input.image_url).pipe(fs.createWriteStream('/images/'+input.image));
      });

      return productModel.findOneAndUpdate({code:input.code},input);
    },
    delProduct: (input) => {
      iniProd = productModel.find({code:input.code}).exec();
      iniProd.then(function(prods){
        prods.forEach(function(prod){
          console.log(prod.image);
          fs.unlinkSync('/images/'+prod.image);
        });
      })

      return productModel.findOneAndRemove({code:input.code});
    }
};

var app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

mongoose
    .connect('mongodb://mongodb:27017/form')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');