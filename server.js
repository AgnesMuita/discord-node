const express = require("express")
const app = express();
const bp = require("body-parser");
const qr = require("qrcode");

//set template engine and use bodyparse to parse urlencoded bodies and JSON objects
app.set("view engine", "ejs");
app.use(bp.urlencoded({extended:false}));
app.use(bp.json());

//simple routing to index file
app.get("/",(req, res)=>{
    res.render("index");
})

//add post request listener to convert text/url to qr code
app.post("/scan", (req,res)=>{
    const url = req.body.url;

    if (url.length === 0) res.send("Empty Data");
    //convert the input in the url and return it as png representation of data stored in qr code uri
    qr.toDataURL(url,(err,src)=>{
        if(err) res.send("error occured");
        res.render("scan",{src});
     })
})

const port = 5000;
app.listen(port, ()=>console.log("Server at 5000"));