import express from "express";
import cors from "cors";
import appConfig from "./2-utils/app-config";
import dal from "./2-utils/dal";
import authController from './6-controllers/auth-controller'
import riddleController from './6-controllers/riddle-controller'
import routeNotFound from "./3-middlewares/route-not-found";
import catchAll from "./3-middlewares/catch-all";
import sanitize from "./3-middlewares/sanitize";

dal.connect();

const server = express();

server.use(cors(appConfig.frontendURL));
server.use(sanitize)

server.use(express.json());

server.use("/api/auth", authController);
server.use("/api", riddleController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));