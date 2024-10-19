const { client } = require("./client");

const createReview = async ({ userId, itemId, text, score }) => {
    const SQL = `
        INSERT INTO reviews(user_id, item_id, text, score) VALUES($1, $2, $3, $4) RETURNING *
    `;
    const response = await client.query(SQL, [userId, itemId, text, score]);
    return response.rows[0];
};

const getReviews = async () => {
    const SQL = `
        SELECT * FROM reviews;
    `;
    const response = await client.query(SQL);
    return response.rows;
};

const updateReview = async (reviewId, { text, score }) => {
    const SQL = `
        UPDATE reviews SET text=$1, score=$2 WHERE id=$3 RETURNING *
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

module.exports = { createReview, getReviews, updateReview, deleteReview };