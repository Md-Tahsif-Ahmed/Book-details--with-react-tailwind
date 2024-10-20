import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Homepage from "../Home/Homepage";
 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Homepage></Homepage>
      },
      
    ],
  },
]);

export default router;
