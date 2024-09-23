import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './pages/Login'
import Staffs from './pages/Staffs/Staffs'
import Roles from './pages/Roles/Roles'
import RootLayout from './components/RootLayout'
import EditStaff from './pages/Staffs/EditStaff'
import AddStaff from './pages/Staffs/AddStaff'
import EditRole from './pages/Roles/EditRole'
import AddRole from './pages/Roles/AddRole'
import Protected from './components/Protected'

// Defining routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "staffs",
        element: <Protected><Staffs /></Protected>,
      },
      {
        path: "staffs/add",
        element: <Protected><AddStaff /></Protected>
      },
      {
        path: "staffs/edit/:id",
        element: <Protected><EditStaff /></Protected>
      },
      {
        path: "roles",
        element: <Protected><Roles /></Protected>,
      },
      {
        path: "roles/add",
        element: <Protected><AddRole /></Protected>,
      },
      {
        path: "roles/edit/:id",
        element: <Protected><EditRole /></Protected>,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
