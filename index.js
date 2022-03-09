const express = require("express");
const mongoose= require("mongoose");
const wilderController = require("./controllers/Wilders");
const app = express();

//Database
mongoose
    .connect("mongodb://127.0.0.1:27017/wilderdb", {
        autoIndex: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
    res.send("Hello World");
}); 
app.post("/api/wilders", wilderController.create);
app.get("/api/wilders", wilderController.findAll);
app.get("/api/wilders/:id", wilderController.findOne);
app.put("/api/wilders/:id", wilderController.update);
app.delete("/api/wilders/:id", wilderController.delete);

// Handle 404 not found
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

//Start Server
app.listen(3000, () => console.log("Server started on 3000"));
