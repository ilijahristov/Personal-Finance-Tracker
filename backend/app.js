require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;

const transactionRoutes = require('./routes/transactions');

app.get('/', (req, res) => {
    res.send('Hello, Ge!');
});

app.use(express.json());
app.use('/transactions', transactionRoutes);


app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});