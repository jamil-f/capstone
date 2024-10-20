const { client } = require("./client");

const { createUser, fetchUsers, createBusiness, createReview } = require("./index.js");

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS businesses;
    DROP TABLE IF EXISTS users cascade;

    CREATE TABLE businesses (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL,
      owner VARCHAR(100),
      establishedYear INT
    );

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE reviews (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      business_id INTEGER REFERENCES businesses(id), -- Ensure businesses table is created first
      review_text TEXT NOT NULL,
      rating INTEGER CHECK (rating >= 1 and rating <= 5),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (user_id, business_id) -- Ensure each user can only review a business once
    );

    CREATE TABLE comments (
      id SERIAL PRIMARY KEY,
      review_id INTEGER REFERENCES reviews(id),
      user_id UUID REFERENCES users(id),
      comment_text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  await client.query(SQL);
};

const init = async () => {
  await client.connect();
  console.log("connected to database");

  await createTables();
  console.log("tables created");

  const [moe, lucy, ethyl, curly] = await Promise.all([
    createUser({ username: "moe", password: "m_pw" }),
    createUser({ username: "lucy", password: "l_pw" }),
    createUser({ username: "ethyl", password: "e_pw" }),
    createUser({ username: "curly", password: "c_pw" }),
  ]);

  const business1 = await createBusiness({ name: "Call of Duty", owner: "Activision", establishedYear: 2003 });
  const business2 = await createBusiness({ name: "Halo", owner: "Microsoft", establishedYear: 2001 });

  await Promise.all([
    createReview({ userId: moe.id, businessId: business1.id, text: "Great game!", rating: 5 }),
    createReview({ userId: lucy.id, businessId: business2.id, text: "Not my favorite.", rating: 3 }),
  ]);

  console.log(await fetchUsers());
  client.end();
};

init();
