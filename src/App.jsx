import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout";
import MainView from "./pages/MainView";
import DetailView from "./pages/DetailView";

import "./App.scss";

// ToDo: move router to different file
const router = createBrowserRouter([
  {
    element: <Layout />,

    children: [
      {
        index: true,
        path: "/",

        element: <MainView />,
      },
      {
        path: "/:id",
        element: <DetailView />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
