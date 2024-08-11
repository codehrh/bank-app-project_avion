import "./Menu.css";
import '@fontsource/exo-2';
import About from "../../pages/About.jsx";
import Home from "../../pages/Home.jsx";
import Transactions from '../../pages/Transactions.jsx';
import Login from "../../pages/Login.jsx";
import NotFound from '../../pages/NotFound.jsx';
import RootLayout from '../../layouts/RootLayout.jsx';
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <NotFound />
    },
])

export default function Menu() {
    return (
        <div className="Menu">
            <RouterProvider router={router} />
            {/* <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RootLayout></RootLayout>}>
                        <Route index element={<Home></Home>}></Route>
                        <Route
                            path="transactions"
                            element={<Transactions></Transactions>}
                        ></Route>
                        <Route path="about" element={<About></About>}></Route>
                        <Route path="*" element={<NotFound></NotFound>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter> */}


            {/* <ul className="menuList">
                <li className="listItem" id="home">Home</li>
                <li className="listItem" id="addClient">Add Client</li>
                <li className="listItem" id="clientList">Client List</li>
                <li className="listItem" id="transactions">Transactions</li>
                <li className="listItem" id="favorite">Favorite</li>
            </ul> */}
        </div>
    )
};