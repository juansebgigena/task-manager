import { useState, useEffect, useMemo } from 'react';
import { getTasksRequest, updateTaskRequest, createTaskRequest, deleteTaskRequest } from '../api/tasksApi.js';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [error, setError] = useState(null);


    const fetchTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            setError(error.response?.data?.message || "Error while loading tasks");
            throw error;
        }
    };

    const completeTask = async (id, status) => {
        try {
            await updateTaskRequest(id, status);

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? { ...task, status } : task
                )
            );
        } catch (error) {
            setError(error.response?.data?.message || "Error while completing a task");
            throw error;
        }
    };

    const addTask = async (taskData) => {
        try {
            const res = await createTaskRequest(taskData);

            setTasks((prevTasks) => [...prevTasks, res.data.task]);

            return res.data;
        } catch (error) {
            setError(error.response?.data?.message || "Error while creating a task");
            throw error;
        }
    };

    const deleteTask = async (id) => {
        try {
            await deleteTaskRequest(id);
            setTasks(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            setError(error.response?.data?.message || "Error while deleting a task");
            throw error;
        }
    };

    useEffect(() => { fetchTasks(); }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    const filteredTasks = useMemo(() => {
        return tasks.filter(t => {
            const matchesStatus = filter === 'all' || t.status === filter;
            const matchesSearch = t.title?.toLowerCase().includes(debouncedSearch.toLowerCase())

            return matchesStatus && matchesSearch;
        });
    }, [tasks, filter, debouncedSearch]);

    return {
        tasks: filteredTasks,
        currentFilter: filter,
        searchTerm,
        error,
        setSearchTerm,
        setFilter,
        completeTask,
        addTask,
        deleteTask
    };
};