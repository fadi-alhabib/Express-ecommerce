import { connect } from "mongoose";


const dbConnection = () => {
    const connectionString = process.env.DB_URI;

    connect(connectionString).then((connection) => {
        console.log(`Database Connected: ${connection.connection.host}`);
    }).catch((err) => {
        console.error(`Database Error: ${err}`);
        process.exit(1);
    });
}

export default dbConnection;