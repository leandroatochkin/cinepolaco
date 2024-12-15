require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

const admin = process.env.ADMIN_USER
const storedPassword = process.env.ADMIN_PASSWORD


const allowedOrigins = [
    'http://localhost:5173',
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
app.post('/articles', upload.array('images'), (req, res) => {
    console.log('Body:', req.body); // Logs the fields
    console.log('Files:', req.files); // Logs the uploaded files
  
    const { title, content, category, date, comments } = req.body;
  
    // Validate required fields
    if (!title || !content || !category || !date) {
      return res.status(400).send('Title, content, category, and date are required.');
    }
  
    // Ensure comments is an array
    const commentsArray = Array.isArray(comments) ? comments : [comments];
  
    // Map files to their respective comments
    const images = req.files.map((file, index) => ({
      file: `/images/${file.filename}`,
      comment: commentsArray[index] || '', // Use the corresponding comment or an empty string
    }));
  
    const article = {
      id: uuidv4(),
      title,
      content,
      category,
      date,
      images, // Array of images with comments
    };
  
    // Save the article to a file (or database, if necessary)
    const articlePath = path.join(articlesPath, `${article.id}.json`);
    fs.writeFileSync(articlePath, JSON.stringify(article, null, 2));
  
    // Respond with the created article
    res.status(201).json(article);
  });

app.post('/login', (req, res)=>{
    const {username, password} = req.body;
    if(!username || !password){
        throw new Error('username and password are required')
    }
    if(username !== admin || password !== storedPassword){
        return res.status(200).json({valid: false})
    }

    return res.status(200).json({valid: true})
    
})
  
// Delete an article
app.delete('/articles/:id', (req, res) => {
    const articleFile = path.join(articlesPath, `${req.params.id}.json`);
    if (!fs.existsSync(articleFile)) return res.status(404).send('Article not found.');
    fs.unlinkSync(articleFile);
    res.send('Article deleted.');
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));