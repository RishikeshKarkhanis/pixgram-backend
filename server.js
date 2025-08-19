const express = require('express');

const userRoutes = require('./routes/user.routes.js');
const postRoutes = require('./routes/post.routes.js');
const likeRoutes = require('./routes/like.routes.js');
const commentRoutes = require('./routes/comments.routes.js');

const connectDatabase = require('./services/databaseConnection.js');

const app = express()

const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/likes', likeRoutes);
app.use('/comments', commentRoutes);


connectDatabase();


app.listen(port, () => {
  console.log(`\nApplication Running On : 'http://localhost:${port}'\n`)
})