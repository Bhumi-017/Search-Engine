
const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json()); 

let articles = [];
let nextId = 1;

const loadArticles = () => {
    if (fs.existsSync('articles.json')) {
        const data = fs.readFileSync('articles.json');
        articles = JSON.parse(data);
        nextId = articles.length > 0 ? Math.max(...articles.map(article => article.id)) + 1 : 1;
    }
};

const saveArticles = () => {
    fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));
};

loadArticles();

app.post('/articles', (req, res) => {
    const { title, content, tags } = req.body;
    const newArticle = { id: nextId++, title, content, tags };
    articles.push(newArticle);
    saveArticles(); 
    res.status(201).json(newArticle);
});

app.get('/articles/search', (req, res) => {
    const keyword = req.query.keyword;
    if (!keyword) {
        return res.status(400).send('Keyword is required');
    }

    const lowerKeyword = keyword.toLowerCase();
    const results = articles.filter(article => {
        return (
            article.title.toLowerCase().includes(lowerKeyword) ||
            article.content.toLowerCase().includes(lowerKeyword) ||
            article.tags.some(tag => tag.toLowerCase() === lowerKeyword)
        );
    });

    results.sort((a, b) => {
        const aFrequency = (a.content.match(new RegExp(lowerKeyword, 'g')) || []).length;
        const bFrequency = (b.content.match(new RegExp(lowerKeyword, 'g')) || []).length;
        return bFrequency - aFrequency; 
    });

    res.json(results);
});

app.get('/articles/:id', (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const article = articles.find(a => a.id === articleId);
    if (!article) {
        return res.status(404).send('Article not found');
    }
    res.json(article);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
