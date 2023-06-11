import Axios from "axios";
import React from "react";
import baseUrl from "../server";

export async function login(data) {
    try {
        const response = await Axios({
            url: `${baseUrl}/login`,
            method: "POST",
            data:data
        });
    return response;
    } catch (e) {
    console.log("error"+e);
    }
}
