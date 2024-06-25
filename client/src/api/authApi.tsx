import { userData } from "../models/Types";



export const fetchUser = async () => {
    const response = await fetch(`http://localhost:3000/api/users/`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    const json = await response.json()

    if (!response.ok) {
        throw new Error(json.message)
    }
    return json

}


export const loginUser = async (data: userData) => {
    const response = await fetch(`http://localhost:3000/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message)
    }

    return json
}


export const registerUser = async (data: userData) => {
    const response = await fetch(`http://localhost:3000/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message)
    }

    return json
}


export const logoutUser = async () => {
    const response = await fetch(`http://localhost:3000/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message)
    }

}