import dotenv from 'dotenv';
import express from 'express';
import router from './routes/route.js';
dotenv.config()
const app = express();
app.use(express.json());
let PORT = 3000


app.get('/', async(req, res)=>{
    return res.status(200).json({message: 'test get api'});
})

app.use('/api/v1', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
