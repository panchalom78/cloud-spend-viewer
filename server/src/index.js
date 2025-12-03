import express from "express";
import router from "./routes/cloud-data.route.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:5173", // Replace with your specific origin
};

const app = express();
const PORT = 3000;

app.use(cors(corsOptions));
app.use("/api", router);
app.get("/", (req, res) => {
    res.json("Hello");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
