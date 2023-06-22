import Axios from "axios";

import baseUrl from "../server";


export async function getReservasDeportes(data) {
    try {
        console.log(data);
        const response = await Axios({
            url: `${baseUrl}/reservasDeportes`,
            method: "POST",
            data: data
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}

export async function saveReservasVisitante(data) {
    try {
        console.log(data);
        const response = await Axios({
            url: `${baseUrl}/reservarSinIdCliente`,
            method: "POST",
            data: data
        });
        
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}

export async function getReservas(data) {
    try {
        const response = await Axios({
            url: `${baseUrl}/reservas`,
            method: "POST",
            data: data
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}
export async function getArbitros() {
    try {
        const response = await Axios({
            url: `${baseUrl}/getArbitros`,
            method: "GET",
        });
        
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}

export async function updateReserva(data) {
    try {
        const response = await Axios({
            url: `${baseUrl}/updateEstadoReservaDeporte`,
            method: "POST",
            data: data
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}


