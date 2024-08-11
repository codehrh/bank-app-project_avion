import './App.css';

//Currently Unused:

// import bankLogo from "./assets/images/dinerobank.png";
// import SearchBar from "./components/SearchBar/SearchBar";
// import User from "./components/User/User.jsx";
// import Logo from "./components/Logo/Logo.jsx";
// import bankUsers from "./assets/data/bankUsers.json";
// import Menu from "./components/Menu/Menu.jsx";
// import BudgetApp from "./components/BudgetApp/BudgetApp.jsx";
// import task from "./assets/task-list.json";
// import AddTask from "./components/AddTask.jsx";

//React imports
import { useState } from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from "react-router-dom";


//Routing lesson
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Transactions from './pages/Transactions.jsx';
import NotFound from './pages/NotFound.jsx';
import RootLayout from './layouts/RootLayout.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home/>,
        errorElement: <NotFound />,
      },
      {
        index: true,
        element: <Transactions/>,
        errorElement: <NotFound />,
      },
      {
        index: true,
        element: <Home/>,
        errorElement: <NotFound />,
      },
    ]
  },
])

export default function App() {

  return (
    <body>
      <div className="App">
      <RouterProvider router={router} />
      </div>
    </body>
  );
}