const express = require('express');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user.routes.js');
const postRoutes = require('./routes/post.routes.js');
const likeRoutes = require('./routes/like.routes.js');
const commentRoutes = require('./routes/comments.routes.js');
const followRoutes = require('./routes/follow.routes.js');

const connectDatabase = require('./services/databaseConnection.js');
const restrictAccess = require('./middlewares/auth.middleware.js')


const app = express()

const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/posts', restrictAccess, postRoutes);
app.use('/likes', restrictAccess, likeRoutes);
app.use('/comments', restrictAccess, commentRoutes);
app.use('/follows', restrictAccess, followRoutes);


connectDatabase();


app.listen(port, () => {
  console.log(`\nApplication Running On : 'http://localhost:${port}'\n`)
})