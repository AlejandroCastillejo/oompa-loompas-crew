import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "./components/Header";
import MainView from "./pages/MainView";
import DetailView from "./pages/DetailView";

import "./App.css";

// ToDo: move router to different file
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
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
        <Header />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
