const express = require("express");
const app = express();
const cors = require("cors")
const sampleRouter = require("./routes/route");
const router = express.Router();


app.use(express.json());

app.use(cors());

app.use('/',sampleRouter);


app.listen(process.env.PORT || 9000, () => {
    console.log("Backend server is running!");
});