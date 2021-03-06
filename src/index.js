import "babel-polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";
import Routes from "./client/Routes";
import renderer from "./helper/renderer";
import createStore from "./helper/createStore";

const app = express();
app.use(
    "/api",
    proxy("http://react-ssr-api.herokuapp.com", {
        proxyReqOptDecorator(opts) {
            opts.headers["x-forwarded-host"] = "localhost:3000";
            return opts;
        }
    })
);
app.use(express.static("public"));

app.get("*", (req, res) => {
    const store = createStore(req);
    // Output of matchRoutes(Routes, req.path):
    // [ { route:
    //  { loadData: [Function: loadData],
    //    path: '/users',
    //    component: [Object] },
    // match: { path: '/users', url: '/users', isExact: true, params: {} } } ]
    // console.log(matchRoutes(Routes, req.path));
    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null;
    });

    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);
        if(context.notFound){
            res.status(404);
        }
        res.send(content);
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});