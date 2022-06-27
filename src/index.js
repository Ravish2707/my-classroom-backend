const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToMongoDb = require('../db/database');

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
connectToMongoDb();

app.use(express.json());
app.use(cors())
app.use('/api', require('../routes/Auth'));
app.use('/api', require('../routes/Classroom'));

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
