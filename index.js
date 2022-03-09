const express = require("express");
const mongoose= require("mongoose");
const wilderController = require("./controllers/Wilders");
const app = express();

function execAsyncHandler(handler) {
    return async function (req, res, next) {
        try {
            await handler(req, res, next);
        } catch {
            next(err);
        }
    }
};

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
app.post("/api/wilders", execAsyncHandler(wilderController.create));
app.get("/api/wilders", execAsyncHandler(wilderController.findAll));
app.get("/api/wilders/:id", execAsyncHandler(wilderController.findOne));
app.put("/api/wilders/:id", execAsyncHandler(wilderController.update));
app.delete("/api/wilders/:id", execAsyncHandler(wilderController.delete));

// Handle 500 error
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'An error occured, sorry' });
});

// Handle 404 not found
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

//Start Server
app.listen(3000, () => console.log("Server started on 3000"));
