import './App.css';

//Currently Unused:

// import bankLogo from "./assets/images/dinerobank.png";
// import SearchBar from "./components/SearchBar.jsx";
// import User from "./components/User.jsx";
// import Logo from "./components/Logo.jsx";
// import bankUsers from "./assets/data/bankUsers.json";
// import Menu from "./components/Menu.jsx";
// import BudgetApp from "./components/BudgetApp/BudgetApp.jsx";
// import task from "./assets/task-list.json";
// import AddTask from "./components/AddTask.jsx";

//React imports
// import { useState } from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from "react-router-dom";


//Routing lesson
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Transactions from './pages/Transactions.jsx';
import NotFound from './pages/NotFound.jsx';
import MoneyTransfer from './components/MoneyTransfer.jsx';
import Overview from './pages/Overview.jsx'
// import RootLayout from './layouts/RootLayout.jsx';
// import Menu from './components/Menu.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/Home",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "Overview",
        element: <Overview />,
        errorElement: <NotFound />,
      },
      {
        path: "Transactions",
        element: <Transactions />,
        errorElement: <NotFound />,
      },
      {
        path: "Transactions",
        element: <Transactions />,
        errorElement: <NotFound />,
      },
      {
        path: "MoneyTransfer",
        element: <MoneyTransfer />,
        errorElement: <NotFound />,
      },
    ]
  }
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