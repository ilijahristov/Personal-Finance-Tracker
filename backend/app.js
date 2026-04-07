require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const transactionRoutes = require('./routes/transactions');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/transactions', transactionRoutes);



app.get('/', (req, res) => {
    res.send('Server is running');
});


app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});