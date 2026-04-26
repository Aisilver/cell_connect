import { enviromentBase } from "./enviroment-config";
import { Enviroment } from "./types";

export const enviroment: Enviroment =  {
    ...enviromentBase,
    production: false,
    development: true,
    apiBaseUrl: "http://localhost:3000"
}