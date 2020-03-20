import express from "express";

const app = express();

app.listen(3000, () => {
    console.log("uruchomiono server CDN na porcie 3000");
});

app.use(express.static("./../public"));
