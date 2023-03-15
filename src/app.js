import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import colors from 'colors'
import userRoutes from './routes/user.routes.js'
import protect from './middleware/auth.middleWare.js';

dotenv.config();
const app = express();

if (process.env.MODE === 'DEV') app.use(morgan('dev'));
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        msg: 'Hello World',
    });
});

//Le indico que para las rutas que entren por /user, usará userRoutes
app.use('/api/users', userRoutes)

// Crear una ruta protegida
app.get('/dashboard', protect, (req, res) => {
    res.json({
        msg: 'Entered to Dashboard'
    })
})

export default app; 