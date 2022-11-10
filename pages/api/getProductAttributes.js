import mysql from 'mysql2/promise';

export default async function dbhandler(req, res) {
    const configuration = {
        host: process.env.NEXT_PUBLIC_MYSQL_HOST,
        database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
        user: process.env.NEXT_PUBLIC_MYSQL_USERNAME,
        password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
        port: process.env.NEXT_PUBLIC_MYSQL_PORT
    }
    const dbconnection = await mysql.createConnection(configuration);
    try {
        const query = "SELECT `category_id` as `id`, GROUP_CONCAT(DISTINCT `name` SEPARATOR '/|') as `values` FROM `product_attributes` GROUP BY `category_id`";
        const value = []
        const [data] = await dbconnection.execute(query, value)
        dbconnection.end();

        res.status(200).json({results: data});

    } catch (error) {
        //res.status(500).json({error: error.message});
    }
}