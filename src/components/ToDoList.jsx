import React from 'react';
import TodoItem from './ToDoItem';

export default function TodoList({ todos, doneMap, onToggleDone, children }) {
    return (
        <div className="bg-white
                        dark:bg-gray-900
                        shadow-lg
                        dark:shadow-gray-800
                        rounded
                        p-8
                        w-full
                        max-w-4xl
                        mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                My To-Do List
            </h1>

            {children}

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {todos.map((todo) => {
                    const isDone = doneMap[todo.id] ?? todo.completed;
                    return (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            isDone={isDone}
                            onToggle={onToggleDone}
                        />
                    );
                })}
            </div>
        </div>
    );
}

