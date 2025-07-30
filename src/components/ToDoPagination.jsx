import React, { useState } from 'react';
import TodoList from './ToDoList';

const ITEMS_PER_LOAD = 10;

export default function TodoLoader({ todos, doneMap, onToggleDone, children }) {
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

    const visibleTodos = todos.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + ITEMS_PER_LOAD, todos.length));
    };

    return (
        <>
            <TodoList todos={visibleTodos} doneMap={doneMap} onToggleDone={onToggleDone}>
                {children}
            </TodoList>

            {visibleCount < todos.length && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleLoadMore}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                    >
                        Load More
                    </button>
                </div>
            )}
        </>
    );
}

