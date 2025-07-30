import React from 'react';

export default function TodoItem({ todo, isDone, onToggle }) {
    return (
        <li
            className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded shadow-sm"
        >
            <label className="flex items-center space-x-3 cursor-pointer w-full">
                <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => onToggle(todo.id)}
                    className="form-checkbox h-5 w-5 text-green-600"
                />
                <span
                    className={`text-lg ${isDone
                            ? 'line-through text-gray-500 dark:text-gray-400'
                            : 'text-gray-800 dark:text-white'
                        }`}
                >
                    {todo.title}
                </span>
            </label>

            {isDone && <span className="text-green-500 text-xl select-none">✔️</span>}
        </li>
    );
}

