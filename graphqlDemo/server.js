/* eslint-disable no-console */
const express = require('express');
const dotenv = require('dotenv');
// const { graphqlHTTP } = require('express-graphql');

// const schema = require('./src/graphql/schema');
const connectToDB = require('./src/db/connection');
const authorization = require('./src/middlewares/auth');

const userRoute = require('./src/routes/users.routes');
const postRoute = require('./src/routes/posts.routes');
const commentRoute = require('./src/routes/comments.routes');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

// Make connection with database
connectToDB();
app.use(authorization);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// app.use('/graphql', graphqlHTTP({
//   schema,
//   graphiql: true,
// }));

app.use('/users', userRoute);
app.use('/posts', postRoute);
app.use('/comment', commentRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
