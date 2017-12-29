import express from "express";
import renderer from './helper/renderer';

// https://react-ssr-api.herokuapp.com/


const app = express();
app.use(express.static("public"));

app.get("*", (req, res) => {
    res.send(renderer(req));

});

app.listen(3030, () => {
    console.log("Listening on port 3030");
});