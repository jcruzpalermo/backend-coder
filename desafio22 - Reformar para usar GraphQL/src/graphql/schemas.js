import {
    buildSchema
} from 'graphql';

export default buildSchema(`
  type Product {
    id: ID!
    nombre: String
    codigo: Int
    imagen: String
    precio: Int
    stock: Int
  }
  input ProductInput {
    nombre: String
    codigo: Int
    imagen: String
    precio: Int
    stock: Int
  }
  type Message{
id: ID!
author :Author
text:String
date:String
  }
  
  type Author {
  email:String
    nombre: String
    apellido: String
    edad:String
    alias:String
    avatar:String
  }
  input MessageInput{
    author : AuthorInput
    text:String
    date:String
  }
   input AuthorInput {
  email:String
    nombre: String
    apellido: String
    edad:String
    alias:String
    avatar:String
  }
  type Query {
    getMessage(query: String): [Message]
    getProducts(query: String): [Product]
    getProductById(id: ID!): Product
  }
  type Mutation {
    createProduct(data: ProductInput): Product
    createMessage(data: MessageInput): Message
    setProduct(id: ID!): Product
    deleteProduct(id:ID!): Product
  }
`);