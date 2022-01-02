# Full stack exercise

## To setup ...

1. Clone current repo to your local
`git clone https://github.com/LizzMancilla/mongo_graphql_react.git`

2. Go to docker-compose parent folder
`cd mongo_graphql_react`

3. Execute following command
`docker-compose up -d`

## To test ...

1. Open in your browser
Graphql UI: http://localhost:4000/graphql
Front UI: http://localhost:3000/

2a. In *Graphql UI* execute this query
```graphql
{
  products{
    code
    position
    quantity
    image
    price
    description
  }
}
```
It will shows default products

2b. Now, *Front UI* should shows a table with same data as Graphql UI

3a. Lets add a new product, execute this mutation in *Graphql UI*
```graphql
mutation{
  addProduct(code:"test",image:"google.png",image_url:"https://www.google.com/images/srpr/logo3w.png",quantity:100,price:99,description:"Test product"){
    code
    position
    quantity
    image
    price
    description
  }
}
```

3b. Refresh *Front UI* and it should show a new row that contains test product data

4a. Lets modify test product, execute this mutation in *Graphql UI*
```graphql
mutation{
  updProduct(code:"test",image:"McDonalds.jpg",image_url:"https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg",quantity:0,price:0,description:"Test product modified"){
    code
    position
    quantity
    image
    price
    description
  }
}
```

4b. Refresh *Front UI* and it should show test product with new values

5a. Finally, lets delete test product, execute this mutation in *Graphql UI*
```graphql
mutation{
  delProduct(code:"test"){
    code
    position
    quantity
    image
    price
    description
  }
}
```

4b. Refresh *Front UI* and it should shows just initial products without test product
