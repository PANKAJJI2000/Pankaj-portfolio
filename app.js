const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.set("views", path.join(__dirname, "/index"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/myportfoliodata", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch(err => console.log("❌ MongoDB Connection Failed:",err));

// Define Contact Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});


const Contact = mongoose.model("Contact", contactSchema);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/user", async (req, res) => {
  console.log("Received Data:", req.body); // Confirm data is received

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
  }

  try {
      const newContact = new Contact({ name, email, message });
      const savedContact = await newContact.save(); // Save to MongoDB
      console.log("✅ Data successfully saved:", savedContact);

      res.json({ message: "Contact saved successfully", redirect: "/" }); // Send success response
  } catch (error) {
      console.error("❌ Error saving data:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/user", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: "Error fetching contacts" });
    }
  });



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

