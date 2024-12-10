const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors')
const uuid = require('uuid')

const app = express();
const PORT = 3001;


const allowedOrigins = [
    'http://localhost:5174',
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);  // Allow requests with no origin (e.g., mobile apps)
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, '../storage/images')));

// File storage setup
const storagePath = path.join(__dirname, '../storage');
const articlesPath = path.join(storagePath, 'articles');
const imagesPath = path.join(storagePath, 'images');

// Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagesPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Routes

// Get all articles
app.get('/articles', (req, res) => {
    fs.readdir(articlesPath, (err, files) => {
        if (err) return res.status(500).send('Failed to read articles.');
        const articles = files.map(file => {
            const filePath = path.join(articlesPath, file);
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        });
        res.json(articles);
    });
});

// Upload a new article with image
app.post('/articles', upload.single('image'), (req, res) => {
    console.log("Received file:", req.file);  // Debugging the image
    const { title, content, category, date } = req.body;
    if (!title || !content || !category || !date) return res.status(400).send('Title and content are required.');

    const article = {
        id: uuid(),
        title,
        content,
        category,
        date,
        image: req.file ? `/images/${req.file.filename}` : null
    };

    const articlePath = path.join(articlesPath, `${article.id}.json`);
    fs.writeFileSync(articlePath, JSON.stringify(article, null, 2));

    res.status(201).json(article);
});

// Delete an article
app.delete('/articles/:id', (req, res) => {
    const articleFile = path.join(articlesPath, `${req.params.id}.json`);
    if (!fs.existsSync(articleFile)) return res.status(404).send('Article not found.');
    fs.unlinkSync(articleFile);
    res.send('Article deleted.');
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));