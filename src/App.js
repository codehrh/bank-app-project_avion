import './App.css';
import bankLogo from "./assets/images/dinerobank.png";
import SearchBar from "./components/SearchBar/SearchBar";
import User from "./components/User/User.jsx";
import Logo from "./components/Logo/Logo.jsx";
import bankUsers from "./assets/data/bankUsers.json";
import Menu from "./components/Menu/Menu.jsx";
import BudgetApp from "./components/BudgetApp/BudgetApp.jsx";
import task from "./assets/task-list.json";
import AddTask from "./components/AddTask.jsx";

//React imports
import { useState } from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from "react-router-dom";


//Routing lesson
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
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
//   const bankEmployee = {
//     name: "Yael",
//     email: "spongecola@gmail.com",
//     balance: 10000,
//   };

//   const address = {
//     houseNo: 74,
//     street: "Manila Street",
//     country: "Philippines"
//   }

//   //useState

//   // array destructuring
//   // [value/variable, function to update the value/variable]
//   // useState can accept different data types (string, number, or array)
//   // right now the useState gets the string from the user input

//   const [num1, setNum1] = useState("");
//   const [num2, setNum2] = useState("");

//   // holder of result

//   const [result, setResult] = useState("");

//   // setNumx mimics
//   // const setNum1 = function () {}

//   // handle the change state of num1
//   const handleNum1Change = (event) => {
//     setNum1(event.target.value);
//     console.log(num1);
//   };

//   const handleNum2Change = (event) => {
//     setNum2(event.target.value);
//     console.log(num1);
//   };

//   const handleAddition = () => {
//     let add = Number(num1) + Number(num2);
//     setResult(add);
//   }

//   const handleSubtraction = () => {
//     let minus = Number(num1) - Number(num2);
//     setResult(minus);
//   }

//   const handleMultiplication = () => {
//     let multiply = Number(num1) * Number(num2);
//     setResult(multiply);
//   }

//   const handleDivision = () => {
//     let divide = Number(num1) / Number(num2);
//     setResult(divide);
//   }

//   const [datas, setDatas] = useState(task)
//   // datas.push(newData)
//   const handleDatas = (newData) => {
//     // [...prevData] - creates a new array that contains the prev data and newly created task and gives back to data state
//     //spread operator
//     setDatas((prevData) => [...prevData, newData]);
//   };

  return (
    <body>
      <div className="App">
      <RouterProvider router={router} />
        {/* <BrowserRouter>
          <Routes>
            {/* Default route pointing to Login */}
            {/* <Route path="/" element={<Navigate to="/login" />} /> */}

            {/* Login page */}
            {/* <Route path="/login" element={<Login />} /> */}

            {/* Other routes under RootLayout */}
            {/* <Route path="/" element={<RootLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route> */}
          {/* </Routes> */}
        {/* </BrowserRouter> */}
      </div>
    </body>
  );
}