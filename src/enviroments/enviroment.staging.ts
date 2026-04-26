import { enviromentBase } from "./enviroment-config";
import { Enviroment } from "./types";

export const enviroment: Enviroment =  {
    ...enviromentBase,
    production: false,
    development: false,
    apiBaseUrl: "https://dominon-cell-staging-server.onrender.com"
}