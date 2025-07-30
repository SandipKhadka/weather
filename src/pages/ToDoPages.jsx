import React, { useState, useEffect } from 'react';
import TodoPagination from '../components/ToDoPagination';
import { fetchTodos } from '../utils/fetch';
import NavBar from '../components/NavBar';

export default function TodoPage() {
    const [todos, setTodos] = useState([]);
    const [doneMap, setDoneMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTodos()
            .then(data => {
                setTodos(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || 'Error fetching todos');
                setLoading(false);
            });
    }, []);

    const toggleDone = (id) => {
        setDoneMap(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if (loading)
        return (
            <p className="text-center text-gray-700 dark:text-gray-300 mt-12">Loading todos...</p>
        );
    if (error)
        return (
            <p className="text-center text-red-500 mt-12">
                Error: {error}
            </p>
        );
    if (todos.length === 0)
        return (
            <p className="text-center text-gray-700 dark:text-gray-300 mt-12">
                No todos found.
            </p>
        );

    return (
        <>
        <NavBar /> 
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
            <TodoPagination todos={todos} doneMap={doneMap} onToggleDone={toggleDone} />
        </div>
        </>
    );
}

