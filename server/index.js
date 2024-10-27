const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const { client } = require('./db');
client.connect();
const path = require('path');

app.use(express.json());
app.use(cors());

const reviewsRouter = require('./api/reviews');
const commentRoutes = require('./api/comment');
app.use('/api/comment', commentRoutes);
app.use('/api/reviews', reviewsRouter);
app.use('/api', require('./api'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message || err });
});

app.listen(port, () => console.log(`Listening on port ${port}`));