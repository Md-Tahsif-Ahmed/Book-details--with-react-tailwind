import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Homepage from "../Home/Homepage";
import BookDetail from "../Home/BookDetail";
import Wishlist from "../Home/Wishlist";
 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Homepage></Homepage>
      },
      {
        path:'/book/:id',
        element:<BookDetail></BookDetail>,
      },
      {
        path: 'wishlist',
        element: <Wishlist></Wishlist>
      }
    ],
  },
]);

export default router;
