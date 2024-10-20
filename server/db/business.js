const { client } = require("./client");


const createBusiness = async ({ name, owner, establishedYear }) => {
    const SQL = `
    INSERT INTO businesses(name, owner, establishedyear) VALUES ($1, $2, $3) RETURNING *
    `;
    const response = await client.query(SQL, [
        name,
        owner,
        establishedYear
    ]);
    return response.rows[0];
}
const fetchBusinesses = async () => {
    const SQL = `
    SELECT * FROM businesses;`
    const response = await client.query(SQL);
    return response.rows;
}

const fetchBusinessById = async (id) => {
    const SQL = `
    SELECT * FROM businesses WHERE id = $1;
    `;
    const response = await client.query(SQL, [id]);
    return response.rows[0];  // Return the first matching business
}


module.exports = { createBusiness,fetchBusinesses, fetchBusinessById };