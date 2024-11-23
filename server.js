import dotenv from 'dotenv';
import express from 'express';
dotenv.config()
const app = express();
app.use(express.json());

app.use('/api/v1', ()=>{
    console.log('api hit');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
