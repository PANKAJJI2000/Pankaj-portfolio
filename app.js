const express= require("express");
const app= express();
const path= require("path");
const mongoose=require("mongoose");
const  methodOverride= require("method-override");
let port=8080;

app.set("views", path.join(__dirname, "/index"));
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));                             


const MONGO_URL="mongodb://127.0.0.1:27017/myportfolio";
main()
.then(() =>{
    console.log("Portfolio connected to data base"); 
})
.catch((err) =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
};

app.get("/", (req,res)=>{
    res.render("index.ejs");
});
app.post("/contactme", async (req, res) => {
    try {
        // Create a new contact using the Contact model
        const newContact = new Contact(req.body.contact);
        
        // Save the new contact to the database
        await newContact.save();
        
        res.send('User data saved successfully!');
    } catch (err) {
        console.log('Error saving user data:', err);
        res.send('Error saving data');
    }
});

app.get("/pankaj", (req,res) =>{
    res.send("Your are on : Pankaj Portfolio");
});

app.listen(port, ()=>{
    console.log("App listening on port :8080");
});
