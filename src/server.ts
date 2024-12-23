import mongoose from "mongoose";
import config from "./config";
import app from "./app";

async function server() {
    try {
        await mongoose.connect(config.database_url as string)

        app.listen(config.port, () => {
            console.log(`Server is listening ${config.port}`)
        })
    } catch (error) {
        console.log(error);
    }
}



server()