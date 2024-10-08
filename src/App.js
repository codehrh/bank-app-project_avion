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
import Accounts from './pages/Accounts.jsx';
import BudgetTracker from './pages/BudgetApp.jsx';
import { GrDashboard } from 'react-icons/gr';
import Dashboard from "./pages/Dashboard.jsx";
import { ToastContainer } from 'react-toastify';
import MyAccount from './pages/MyAccount.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import UserTransactions from './pages/UserTransactions.jsx';

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
        element: <Dashboard />,
        errorElement: <NotFound />,
      },
      {
        path: "Dashboard",
        element: <Dashboard />,
        errorElement: <NotFound />,
      },
      {
        path: "UserDashboard",
        element: <UserDashboard />,
        errorElement: <NotFound />,
      },
      {
        path: "Accounts",
        element: <Accounts />,
        errorElement: <NotFound />,
      },
      {
        path: "MyAccount",
        element: <MyAccount />,
        errorElement: <NotFound />,
      },
      {
        path: "Transactions",
        element: <Transactions />,
        errorElement: <NotFound />,
      },
      {
        path: "UserTransactions",
        element: <UserTransactions />,
        errorElement: <NotFound />,
      },
      {
        path: "BudgetApp",
        element: <BudgetTracker />,
        errorElement: <NotFound />,
      },
      {
        path: "logout",
        element: <Login />,
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
        <div className="text-xs text-left">
          <ToastContainer />
        </div>
      </div>
    </body>
  );
}