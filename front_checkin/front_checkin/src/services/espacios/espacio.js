import Axios from "axios";

const baseUrl = "http://localhost:3000";

export async function getEspacios() {
    try {
        const response = await Axios({
            url: `${baseUrl}/espacios`,
            method: "GET",
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}

export async function getEspaciosEmpresa(id) {
    try {
        const response = await Axios({
            url: `${baseUrl}/getEspacioFindOne/${id}`,
            method: "POST",
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}



export async function getEspaciosById(id) {
    try {
        const response = await Axios({
            url: `${baseUrl}/espacio/${id}`,
            method: "GET",
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}

export async function saveEspacio(espacioData) {
    try {
        const response = await Axios({
            url: `${baseUrl}/setEspacio`,
            method: 'POST',
            data: espacioData
        });
    return response;
    } catch (e) {
    console.log(e);
    }
}