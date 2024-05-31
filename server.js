import express from "express";
import { handler } from "./build/handler.js";
const app = express();

app.get("health-check", (req,res) => {
    res.send({
        message: "server is up and running",
        status: 200
    })
})

app.use(handler)
app.listen(8000,()=>{
    console.log("Server is running on port: ", 8000);
})