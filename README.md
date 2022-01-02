# Full stack exercise

## To setup ...

#### 1. Clone current repo to your local

`git clone https://github.com/LizzMancilla/mongo_graphql_react.git`

#### 2. Go to docker-compose parent folder

`cd mongo_graphql_react`

#### 3. Execute following command

`docker-compose up -d`

## To test ...

#### First, open in your browser. (It can takes some minutes until it shows information)

Graphql UI: http://localhost:4000/graphql

Front UI: http://localhost:3000/

#### 2a. In *Graphql UI* execute this query
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
It will shows default productsg
<img src="https://user-images.githubusercontent.com/51000492/147873485-f657c9c6-2f55-4a92-84bf-1577035b6dce.png" width="80%" height="80%">

#### 2b. Now, *Front UI* should shows a table with same data as Graphql UI
<img src="https://user-images.githubusercontent.com/51000492/147873565-7cb92b85-d505-4a8b-ad7d-52a4eb2e0624.png" width="75%" height="75%">

#### 3a. Lets add a new product, execute this mutation in *Graphql UI*
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

#### 3b. Refresh *Front UI* and it should show a new row that contains test product data
<img src="https://user-images.githubusercontent.com/51000492/147873588-5e59daba-0c17-4731-aa24-d2e002d7cafd.png" width="75%" height="75%">

#### 4a. Lets modify test product, execute this mutation in *Graphql UI*
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

#### 4b. Refresh *Front UI* and it should show test product with new values
<img src="https://user-images.githubusercontent.com/51000492/147873633-2fb99693-a950-40ba-9acf-c091c2dd7ccf.png" width="75%" height="75%">

#### 5a. Finally, lets delete test product, execute this mutation in *Graphql UI*
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

#### 5b. Refresh *Front UI* and it should shows just initial products without test product
