import app from "./app.js";
import { v2 as cloudianry } from "cloudinary";
import { database } from "./src/database/db.js";

const PORT = process.env.PORT;

cloudianry.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

database()
  .then(() => {
    console.log("Database connected Successfully");
    app.listen(PORT, () => {
      console.log("Server is listing on PORT : ", PORT);
    });
  })
  .catch((err) => {
    console.log("Somethin went wrong : ", err);
  });
