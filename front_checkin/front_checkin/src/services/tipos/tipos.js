import Axios from "axios";

import baseUrl from "../server";

export async function getTiposDeportes() {
    try {
        const response = await Axios({
            url: `${baseUrl}/tipodeportes`,
            method: "GET",
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}

export async function getTipos(id) {
    try {
        const response = await Axios({
            url: `${baseUrl}/tipo`,
            method: "GET",
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}