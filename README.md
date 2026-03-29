# Personal-Finance-Tracker
A basic CRUD personal finance tracker fullstack web app


# API Endpoints

Creating a transaction
POST /transactions

Reading transactions
GET    /transactions          → get all transactions (with optional filters)
GET    /transactions/:id      → get one specific transaction

Update a transaction
PUT    /transactions/:id  

Delete a transaction
DELETE /transactions/:id


# DATABASE SCHEMA

Transactions Table
ID
Amount
Type
Category
Description
Date
Created_at