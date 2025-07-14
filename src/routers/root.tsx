import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
// import './index.css';
import Layout from "../components/Layout";
import Products from "../pages/Products";
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
                element: <Products onlyFavorites={true} />,
            },
            {
                path:"products",
                element:<Products onlyFavorites={false} />
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
