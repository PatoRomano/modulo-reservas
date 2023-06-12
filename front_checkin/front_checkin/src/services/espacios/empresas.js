import Axios from "axios";

const baseUrl = "http://localhost:3000";

export async function getEmpresasDeportes() {
    try {
        const response = await Axios({
            url: `${baseUrl}/empresasDeportes`,
            method: "GET",
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}

export async function getEmpresasDepartamentos() {
    try {
        const response = await Axios({
            url: `${baseUrl}/empresasDepartamentos`,
            method: "GET",
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}

export async function getEmpresasSalones() {
    try {
        const response = await Axios({
            url: `${baseUrl}/empresasSalones`,
            method: "GET",
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}