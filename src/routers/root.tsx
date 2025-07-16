import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Layout from "../components/Layout";
import Products from "../pages/Products";



export const rootRouter = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
                errorElement: <Error />,
            },
            {
                path: "favorites",
                element: <Products onlyFavorites={true} />,
                errorElement: <Error />,

            },
            {
                path: "products",
                element: <Products onlyFavorites={false} />,
                errorElement: <Error />,
            }
        ]
    },
], {})
