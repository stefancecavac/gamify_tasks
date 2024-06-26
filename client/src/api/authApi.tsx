import { userData } from "../models/Types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export const fetchUser = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/`, {
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
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
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
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
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
    const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message)
    }

}