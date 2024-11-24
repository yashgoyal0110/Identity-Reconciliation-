import dotenv from 'dotenv';
import express from 'express';
import router from './routes/route.js';
dotenv.config()
const app = express();
app.use(express.json());


app.get('/', async(req, res)=>{
    return res.status(200).json({message: 'test get api'});
})

app.use('/api/v1', router);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
