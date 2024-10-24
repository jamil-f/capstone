const { client } = require("./client");

// Fetch reviews by business ID
async function fetchReviewsByBusinessId(businessId) {
    try {
      const { rows } = await client.query(
        `SELECT * FROM reviews WHERE business_id = $1::int`,
        [businessId]
      );
      return rows;
    } catch (err) {
      throw new Error("Failed to fetch reviews by business ID: " + err.message);
    }
  }

async function findExistingReview(userId, businessId) {
    try {
      const { rows } = await client.query(
        `SELECT * FROM reviews WHERE user_id = $1 AND business_id = $2`,
        [userId, businessId]
      );
      return rows[0]; // Return the review if it exists
    } catch (err) {
      throw new Error("Failed to find existing review: " + err.message);
    }
  }

// Function to fetch reviews by business ID
async function fetchReviewsByUserId(userId) {
    const { rows } = await client.query(
      `SELECT * 
      FROM businesses
      JOIN reviews ON businesses.id = business_id
      WHERE reviews.user_id = $1`,
      [userId]
    );
//     const { rows } = await client.query(`
//     SELECT DISTINCT ON (name, business_id)
//         reviews.id AS review_id, 
//         reviews.review_text AS review_text, 
//         reviews.rating, 
//         reviews.user_id,
//         name AS business_name
//     FROM reviews
//     JOIN businesses ON reviews.business_id = business_id
//     WHERE reviews.user_id = $1
//   `, [userId]);
  console.log('rows', rows)
    return rows;
  }

const createReview = async ({ userId, businessId, review_text, rating }) => {
    const SQL = `
        INSERT INTO reviews(user_id, business_id, review_text, rating) VALUES($1, $2, $3, $4) RETURNING *
    `;
    const response = await client.query(SQL, [userId, businessId, review_text, rating]);
    return response.rows[0];
};

const getReviews = async () => {
    const SQL = `
        SELECT * FROM reviews;
    `;
    const response = await client.query(SQL);
    return response.rows;
};

const updateReview = async (reviewId, { text, rating }) => {
    const SQL = `
        UPDATE reviews SET text=$1, rating=$2 WHERE id=$3 RETURNING *
    `;
    const response = await client.query(SQL, [text, rating, reviewId]);
    return response.rows[0];
};

const deleteReview = async (reviewId) => {
    const SQL = `
        DELETE FROM reviews WHERE id=$1;
    `;
    await client.query(SQL, [reviewId]);
};



module.exports = { createReview, getReviews,fetchReviewsByUserId, updateReview, deleteReview, findExistingReview, fetchReviewsByBusinessId };