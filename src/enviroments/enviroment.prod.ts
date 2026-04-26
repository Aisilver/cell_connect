import { enviromentBase } from "./enviroment-config";
import { Enviroment } from "./types";

export const enviroment: Enviroment =  {
    ...enviromentBase,
    production: true,
    development: false,
    apiBaseUrl: ""
}