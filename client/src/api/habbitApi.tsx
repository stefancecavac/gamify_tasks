import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { habbitData } from "../models/Types";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useCompleteHabbit = () => {
    const queryClient = useQueryClient();

    const completeHabbit = async ({ id, status  }: { id: number, status: boolean  }) => {
        const response = await fetch(`${API_BASE_URL}/api/habbits/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
            credentials: 'include',
        });
        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message);
        }
        return json;
    };

    const { mutate, isPending } = useMutation({
        mutationKey: ['habbits'],
        mutationFn: completeHabbit,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['habbits']})
            queryClient.invalidateQueries({queryKey:['auth']})
        },
    });

    return { mutate, isPending };
};


export const useFetchHabbits = () => {

    const fetchHabbits = async () => {
        const response = await fetch(`${API_BASE_URL}/api/habbits/`, {
            credentials: 'include',
        });
        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message)
        }

        return json
    };

    const { data, isLoading } = useQuery({
        queryKey: ['habbits'],
        queryFn: fetchHabbits,
    });

    return { data, isLoading };
};


export const useCreateHabbit = () => {
    const queryClient = useQueryClient();

    const createHabbit = async (data: habbitData) => {
        const response = await fetch(`${API_BASE_URL}/api/habbits/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message)
        }

        return json

    };

    const { mutate, isPending } = useMutation({
        mutationKey: ['habbits'],
        mutationFn: createHabbit,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['habbits']})
        },
    });

    return { mutate, isPending };
};



export const useDeleteHabbit = () => {
    const queryClient = useQueryClient();

    const deleteHabbit = async (id: number) => {
        const response = await fetch(`${API_BASE_URL}/api/habbits/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message)
        }

        return json

    };

    const { mutate, isPending } = useMutation({
        mutationKey: ['habbits'],
        mutationFn: deleteHabbit,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['habbits']})
        },
    });

    return { mutate, isPending };
};
