const { client } = require("./client");

const createReview = async ({ userId, businessId, text, rating }) => {
    try {
        const SQL = `
        INSERT INTO reviews(user_id, business_id, review_text, rating) VALUES($1, $2, $3, $4) RETURNING *
        `;
        const response = await client.query(SQL, [userId, businessId, text, rating]);
        return response.rows[0];
    } catch (error) {
        console.error('Error in createReview:', error);
        throw error;
    }
};

const getReviews = async () => {
    const SQL = `
        SELECT reviews.*, businesses.name AS business_name
        FROM reviews
        JOIN businesses ON reviews.business_id = businesses.id;
    `;
    const response = await client.query(SQL);
    return response.rows;
};

const fetchReviewsByUserId = async (userId) => {
    const SQL = `
        SELECT reviews.*, businesses.name AS business_name
        FROM reviews
        JOIN businesses ON reviews.business_id = businesses.id
        WHERE reviews.user_id=$1;
    `;
    const response = await client.query(SQL, [userId]);
    return response.rows;
};

const updateReview = async (reviewId, { text, score }) => {
    const SQL = `
        UPDATE reviews SET review_text=$1, rating=$2 WHERE id=$3 RETURNING *
    `;
    const response = await client.query(SQL, [text, score, reviewId]);
    return response.rows[0];
};

const deleteReview = async (reviewId) => {
    const SQL = `
        DELETE FROM reviews WHERE id=$1;
    `;
    await client.query(SQL, [reviewId]);
};

const findExistingReview = async (businessId, userId) => {
    const SQL = `SELECT * FROM reviews WHERE business_id=$1 AND user_id=$2;`;
    const response = await client.query(SQL, [businessId, userId]);
    return response.rows[0]; // Return the existing review if found
};

module.exports = { createReview, getReviews, updateReview, deleteReview, fetchReviewsByUserId, findExistingReview };