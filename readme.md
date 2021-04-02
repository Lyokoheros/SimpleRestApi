# Simple REST API

## Table of content
* [General info and usage](#General-info-and-usage)
* [Technologies](#Technologies)
* [Setup](#Setup)


## General info and usage
Simple REST API example. 
Endpoints: 
- [GET] my-api/words - return list of words (as objects containing id, 'word' field storing the word bolean field unique(indicating if the word is unique or not))
- [GET] my-api/words/:id - return word of given id
- [GET] my-api/words?find=word - returns quantity of given word* (as an object with one field: 'count')
- [GET] my-api/words?unique=true - returns list of unique words*
- [POST] my-api/words - add word specified in request body, it should contain request body with such object {word: newWord}, when newWord is word to be added
- [DELETE] my-api/words/:id - delete word of given id
*those two endpoints are meant to work separately, if both parameter of query string are specified the find paramater will be ommited.

## Technologies
- JavaScript
- npm
- Node.js
- Express.js


## Setup
To run this app You have do have node.js and npm installed. Then You have to  run 
```
npm install
``` 
to install dependencies.
Run the API by using command node index.js (or nodemon, if You have nodemon installed). 