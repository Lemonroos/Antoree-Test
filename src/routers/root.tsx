import { ConfigProvider } from "antd";
import viVN from "antd/es/locale/vi_VN";
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
// import './index.css';
import Layout from "../components/Layout";
// import



export const rootRouter = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        // errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "favorites",
                element: <Favorites />,
            },
            {
            }
        ]
    },
    // {
    //     path: "/favorites",
    //     element: <Favorites />,
    // }
], {})

// createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//         <ConfigProvider locale={viVN}>
//             <RouterProvider router={router} />
//         </ConfigProvider>
//     </React.StrictMode>
// )
