import WeatherPage from "./pages/WeatherPage";
import './App.css';
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import ToDoPage from "./pages/ToDoPages";

function App() {
    const router = createBrowserRouter([

        {
            path: '/',
            element: <WeatherPage />
        },
        {
            path: '/weather',
            element: <WeatherPage />
        },
        {
            path: '/todo',
            element: <ToDoPage />
        }
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App;
