const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const { client } = require("./db");
client.connect();
const path = require("path");

// // Serve static files from the React app (after building the React app)
// app.use(express.static(path.join(__dirname, "../client/build")));

// // Catch-all route to send back index.html for any non-API routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build", "index.html"));
// });

app.use(express.json());
app.use(cors());

const reviewsRouter = require('./api/reviews');
app.use('/api/reviews', reviewsRouter);
app.use("/api", require("./api"));

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.status || 500)
    .send({ error: err.message ? err.message : err });
});

app.listen(port, () => console.log(`listening on port ${port}`));