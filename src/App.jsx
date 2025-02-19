import {createContext,useState,useContext} from 'react'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import { CssBaseline,ThemeProvider,createTheme } from '@mui/material';

import Layout from './Layout';

import {loginAction, registerAction, editProfileAction} from './utils/actions';

import JobsPage from './pages/JobsPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/Profile';
import LogOut from './pages/Logout';
import EditProfilePage from './pages/EditProfilePage';

import JobContextProvider from './ctx/JobContext';
import {checkAuthUser,authProtectedLoader} from './utils/loader';

import { deepOrange,grey,deepPurple,blueGrey,blue } from '@mui/material/colors';

export const AppContext = createContext();

export function useApp(){
  return useContext(AppContext);
};

const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout />,
    loader:checkAuthUser,
    // errorElement:<ErrorPage />,
    children:[
      {
        path:'/',
        element:<HomePage />
      },
      {
        path:'/jobs',
        element:<JobContextProvider><JobsPage /></JobContextProvider>
      },
      {
        path:'/login',
        element:<LoginPage />,
        action:loginAction
      },
      {
        path:'/register',
        element:<RegisterPage />,
        action:registerAction
      },
      {
        path:'/profile/:id',
        element:<JobContextProvider><Profile /></JobContextProvider>,
        loader:checkAuthUser
      },
      {
        path:'/logout',
        element:<LogOut />,
      },
      {
        path:'/profile/:id/edit',
        element:<EditProfilePage />,
        action:editProfileAction,
        loader:authProtectedLoader
      }

    ]
  }
])

export default function App() {
  const [globalMsg, setGlobalMsg] = useState(null);
  const [auth, setAuth] = useState(false);
  const [mode, setMode] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const [user, setUser] = useState(null);
  const [isJobsPage,setIsJobsPage] = useState(false);
  const [drawerOpen,setDrawerOpen] = useState(false);


  const theme = createTheme({
    palette:{
      mode,
      primary:blue,
      banner:mode == "dark" ? grey[900] : grey[100],
      text:{
        fade:grey[500]
      }
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{globalMsg,setGlobalMsg,auth,setAuth,mode,setMode,user,setUser,isJobsPage,setIsJobsPage,drawerOpen,setDrawerOpen}}>
        <RouterProvider router={router} />
        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  )
}

