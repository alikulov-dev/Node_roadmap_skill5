import bodyParser from "body-parser";
import cors from "cors";
import {Ctrl} from "../app/controllers/index";

const createRoutes = (app) => {
    const Controller = new Ctrl();
    const options = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: true,
        //origin: "*",
        optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
        preflightContinue: false
    };
    app.use(cors());
    app.options("*", cors(options));

    app.use(bodyParser.json());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    // parse the raw data
    app.use(bodyParser.raw());
    // parse text
    app.use(bodyParser.text());

    app.get("/", (_, res) => {
        res.send("Hello, World!");
    });

    app.get("/task", Controller.IndexTask);
    app.get("/contact", Controller.IndexContact);
    app.get("/task/:id", Controller.IndexTaskbyId);
    app.get("/contact/:id", Controller.IndexContactbyId);
    app.delete("/task/:id", Controller.deleteDataTask);
    app.delete("/contact/:id", Controller.deleteDataContact);
    app.post("/task", Controller.createTask);
    app.post("/contact", Controller.createContact);
    app.put("/task/:id", Controller.updateDataTask);
    app.put("/contact/:id", Controller.updateDataContact);
};
export default createRoutes;