import { config as configDevelopment } from "./config.development";
import { config as configProduction } from "./config.production";

export const config =
    process.env.NODE_ENV === "production"
        ? configProduction
        : configDevelopment;
