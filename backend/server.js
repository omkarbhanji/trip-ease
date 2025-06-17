const app = require("./app");
const mongoose = require("mongoose");


const DB = 
    "mongodb+srv://bhanjiomkar:Sucasa2021@cluster0.2q2oe.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0"

    mongoose.connect(DB).then((con) => {
        console.log("DB connection successful !");
      });
      
      app.listen(5000, () => {
        console.log(`Linstening on Port : localhost:5000`);
      });

