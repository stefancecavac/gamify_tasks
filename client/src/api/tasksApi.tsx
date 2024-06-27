import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskData } from "../models/Types";
import { UseToastContext } from "../context/toastContext";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useCompleteTask = () => {
    const { showToast} = UseToastContext()
    const queryClient = useQueryClient();

    const completeTask = async (id: number) => {
        const response = await fetch(`${API_BASE_URL}/api/tasks/${id}/complete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message);
        }
        return json;
    };

    const { mutate, isPending  } = useMutation({
        mutationKey: ['tasks'],
        mutationFn: completeTask,
        onSuccess: (data) => {
            showToast({reward:data})
            queryClient.invalidateQueries({queryKey:['tasks']})
            queryClient.invalidateQueries({queryKey:['auth']})
        },
    });

    return { mutate, isPending };
};


export const useCompleteSubTask = () => {
    const queryClient = useQueryClient();

    const completeSubTask = async ({ id, completed  }: { id: number, completed: boolean  }) => {
        const response = await fetch(`${API_BASE_URL}/api/tasks/subTask/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed }),
            credentials: 'include',
        });
        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message);
        }
        return json;
    };

    const { mutate, isPending } = useMutation({
        mutationKey: ['tasks'],
        mutationFn: completeSubTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['tasks']})
            queryClient.invalidateQueries({queryKey:['auth']})
        },
    });

    return { mutate, isPending };
};


export const useFetchTasks = () => {

    const fetchTasks = async () => {
        const response = await fetch(`${API_BASE_URL}/api/tasks/`, {
            credentials: 'include',
        });
        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message)
        }

        return json
    };

    const { data, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
    });

    return { data, isLoading };
};


export const useCreateTask = () => {
    const queryClient = useQueryClient();

    const createTask = async (data: taskData) => {
        const response = await fetch(`${API_BASE_URL}/api/tasks/`, {
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

    const { mutate, isPending  } = useMutation({
        mutationKey: ['tasks'],
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['tasks']})
        },
    });

    return { mutate, isPending };
};

