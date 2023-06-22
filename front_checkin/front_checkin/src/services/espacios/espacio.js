import Axios from "axios";

import baseUrl from "../server";

export async function getEspaciosPorEmpresa(data) {
    try {
        const response = await Axios({
            url: `${baseUrl}/espaciosEmpresa`,
            method: "POST",
            data: data
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}

export async function getEspaciosEmpresaDeportes(data) {
    try {
        const response = await Axios({
            url: `${baseUrl}/getEspacioFindOne`,
            method: "POST",
            data: data
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}

export async function getEspaciosEmpresaSalones(data) {
    try {
        const response = await Axios({
            url: `${baseUrl}/getEspacioFindOneSalones`,
            method: "POST",
            data: data
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}

export async function getEspaciosEmpresaDepartamentos(data) {
    try {
        const response = await Axios({
            url: `${baseUrl}/getEspacioFindOneDepartamentos`,
            method: "POST",
            data: data
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}



export async function getEspaciosById(data) {
    try {
        const response = await Axios({
            url: `${baseUrl}/getEspacioIdEspacio/`,
            method: "POST",
            data:data
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

export async function getEspaciosEmpresas(data) {
    try {
        const response = await Axios({
            url: `${baseUrl}/espaciosEmpresa`,
            method: "POST",
            data: data
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}