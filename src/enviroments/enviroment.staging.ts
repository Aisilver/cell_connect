import { enviromentBase } from "./enviroment-config";
import { Enviroment } from "./types";

export const enviroment: Enviroment =  {
    ...enviromentBase,
    production: false,
    development: false,
    apiBaseUrl: "https://cell-connect-server.onrender.com"
}