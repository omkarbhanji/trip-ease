require('dotenv').config();
const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.MONGODB_URL

    mongoose.connect(DB).then((con) => {
        console.log("DB connection successful !");
      });
      
      app.listen(5000, () => {
        console.log(`Linstening on Port : localhost:5000`);
      });

