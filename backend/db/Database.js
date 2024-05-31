const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;



// form chat gpt to solve mongo error on signup page not working accordingly 

// const mongoose = require("mongoose");
// const ErrorHandler = require("./ErrorHandler");

// const connectDatabase = async () => {
//   try {
//     const connection = await mongoose.connect(process.env.DB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB connected with server: ${connection.connection.host}`);
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     throw new ErrorHandler("Database connection error", 500); // Throw custom error for Express middleware to handle
//   }
// };

// module.exports = connectDatabase;
