
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let users = [
    { id: 1, name: "Shahid", email: "shahid@example.com" },
    { id: 2, name: "Ali", email: "ali@example.com" }
];

app.get("/users", (req, res) => res.json(users));

app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).json({ message: "Not found" });
});

app.post("/users", (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "Not found" });

    const { name, email } = req.body;
    user.name = name;
    user.email = email;
    res.json(user);
});

app.patch("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "Not found" });

    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;

    res.json(user);
});

app.delete("/users/:id", (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
