import axios from "axios";

const host = 'http://localhost:8080/api'
export const signIn = async (user: any) => {
    try {
        const response = await axios.post(host + '/auth/authenticate', user, {headers: {'Content-Type': 'application/json'}})
        const tokenJwt = response.data.token
        localStorage.setItem("token", tokenJwt)
        return response.status;
    } catch (error: any) {
        console.log("Login error: ", error.response.status)
        return error.response.status;
    }
}
export const signUp = async (user: any) => {
    try {
        const response = await axios.post(host + '/auth/register', user, {headers: {'Content-Type': 'application/json'}})
        return response.status;
    } catch (error: any) {
        console.log("Login error: ", error.response.status)
        return error.response.status;
    }
}

export const getRooms = async () => {
    try {
        const response = await axios.get(host + "/room/type")
        return response.data;
    } catch (error) {
        console.error('Get rooms error: ', error);
    }
}

export const reservation = async (body: any) => {
    try {
        const response = await axios.post(host + "/reservation", body, {headers: {'Content-Type': 'application/json'}})
        return response.data;
    } catch (error) {
        console.error('Reservation room error: ', error);
    }
}

export const availableRooms = async (body: any) => {
    try {
        const response = await axios.post(host + "/reservation/available", body, {headers: {'Content-Type': 'application/json'}})
        return response.data;
    } catch (error) {
        console.error('Search available room error: ', error);
    }
}