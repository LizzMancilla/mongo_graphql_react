FROM mongo

COPY products.json /products.json
CMD mongoimport --host mongodb --db form --collection products --type json --file /products.json --jsonArray