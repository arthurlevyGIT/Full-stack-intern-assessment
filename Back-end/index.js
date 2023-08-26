const dotenv = require("dotenv");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const listeSchema = new mongoose.Schema({
  title: String,
  name: String,
  text: String,
});

const Liste = mongoose.model("Liste", listeSchema);

app.use(express.json());

// -- // -- // -- // -- // -- // -- // -- // -- //

app.post("/create", async (req, res) => {
  try {
    const { name, text, title } = req.body;

    const newListe = new Liste({
      title,
      name,
      text,
    });

    const createdListe = await newListe.save();

    res.status(201).json(createdListe);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de la liste." });
  }
});

app.get("/", async (req, res) => {
  try {
    const allItems = await Liste.find();
    res.json(allItems);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la lecture." });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedData = req.body;
    const updatedItem = await Liste.findByIdAndUpdate(itemId, updatedData, {
      new: true,
    });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour." });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    await Liste.findByIdAndRemove(itemId);
    res.json({ message: "Élément supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression." });
  }
});

//Inscription // -- // -- // -- // -- // -- // -- // -- // -- //

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    const createdUser = await newUser.save();

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'inscription." });
  }
});

// Connexion // -- // -- // -- // -- // -- // -- // -- // -- //

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Nom d'utilisateur incorrect." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    res.status(200).json({ message: "Connexion réussie !" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la connexion." });
  }
});

// -- // -- // -- // -- // -- // -- // -- // -- //

app.all("*", (req, res) => {
  res.status(404).json("Cette route n'existe pas");
});

// -- // -- // -- // -- // -- // -- // -- // -- //

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
