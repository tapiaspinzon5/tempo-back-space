console.clear();

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const properties = require("./properties/properties");
const csrf = require("csurf");
// const csrfProtection = csrf({cookie: true});
const port = properties.PORT;
const app = express();
const requestIp = require("request-ip");
const helmet = require("helmet");
const router = express.Router();
const routes = require("./routes/router");
const { logger, middleware, errorHandler } = require("./controllers/err.handler");
const { exceptionHandler } = require("./controllers/csrf.handler");
const { jwt } = require("./controllers/jwt.controller");
const { configure } = require("./controllers/configure");
const path = require("path");
const { init } = require("./firebaseConfig/firebaseConfig");
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://gamificationtest.teleperformance.co",
    "https://spacegptest.teleperformance.co",
    "https://gptest.teleperformance.co",
    "https://spacegp.teleperformance.co",
    "https://spacedev.teleperformance.co",
    "https://spacetest.teleperformance.co",
  ],
};
app.use(cors(corsOptions));
app.use(helmet.frameguard({ action: "SAMEORIGIN" }));
app.use((req, res, next) => {
  res.set({
    "Cache-Control": `no-cache, no-store, must-revalidate`,
  });
  next();
});
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.permittedCrossDomainPolicies());
app.use(express.urlencoded({ extended: true }));
// app.use(csrfProtection);
app.disable("x-powered-by");
app.use(express.json({ limit: "10mb", type: "application/json" }));
app.use(requestIp.mw());
configure((call) => {
  app.use(jwt());
});
app.use(logger);
app.use(express.static(path.join(__dirname, "/dist")));

app.use(middleware);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(exceptionHandler);
app.use(errorHandler);
app.use("/api", router);

init();

routes(router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(port, function () {
  console.log(properties.ENV, ": Listening on port", port, "- start:", Date(Date.now()).toString());
});
