import express from 'express';
import morgan from 'morgan';
import { twig } from 'twig';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.set('view engine', 'twig');

app.get('/', (req, res) => {
    res.render('../src/views/index.twig');
})

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));