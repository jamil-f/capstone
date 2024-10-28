const { client } = require("./client");


const createBusiness = async ({ name, owner, establishedYear, description, image_url }) => {
    const SQL = `
    INSERT INTO businesses(name, owner, establishedyear, description, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const response = await client.query(SQL, [
        name,
        owner,
        establishedYear,
        description,
        image_url
    ]);
    return response.rows[0];
}
const fetchBusinesses = async () => {
  const SQL = `
    SELECT 
      b.id, 
      b.name, 
      b.owner, 
      b.establishedyear, 
      b.description, 
      b.image_url, 
      COALESCE(
        json_agg(
          json_build_object('rating', r.rating)
        ) FILTER (WHERE r.id IS NOT NULL), '[]'
      ) AS reviews
    FROM businesses b
    LEFT JOIN reviews r ON b.id = r.business_id
    GROUP BY b.id;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchBusinessById = async (id) => {
  try {
    const businessQuery = `
      SELECT 
        b.id AS business_id, 
        b.name, 
        b.description, 
        b.image_url, 
        b.establishedyear, 
        COALESCE(AVG(r.rating), 0) AS averageRating
      FROM businesses b
      LEFT JOIN reviews r ON b.id = r.business_id
      WHERE b.id = $1
      GROUP BY b.id;
    `;

    const reviewsQuery = `
      SELECT 
        r.id AS review_id, 
        r.review_text AS comment, 
        r.rating, 
        u.username AS user_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.business_id = $1;
    `;

    const businessResult = await client.query(businessQuery, [id]);
    const reviewsResult = await client.query(reviewsQuery, [id]);

    if (businessResult.rows.length > 0) {
      return {
        ...businessResult.rows[0],
        reviews: reviewsResult.rows,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching business or reviews:", error.message);
    throw error;
  }
};


module.exports = { createBusiness,fetchBusinesses, fetchBusinessById };