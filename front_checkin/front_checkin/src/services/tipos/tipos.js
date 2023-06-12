import Axios from "axios";

const baseUrl = "http://localhost:3000";

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