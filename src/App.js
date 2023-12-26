import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./Layout";
import MainView from "./pages/MainView";
import DetailView from "./pages/DetailView";

import "./App.css";

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
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
