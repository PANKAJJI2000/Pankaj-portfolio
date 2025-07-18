import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';

// Configure dotenv to load environment variables
dotenv.config();

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const atlasUri = process.env.MONGO_URI;

mongoose.connect(atlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
});

// Routes
app.use('/', contactRoutes);

// Serve the home page
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});