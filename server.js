import dotenv from 'dotenv';
import express from 'express';
import { identifyContact } from './controllers/controller.js';
dotenv.config()
const app = express();
app.use(express.json());
app.post('api/vi', identifyContact)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
