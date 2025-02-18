import { Box,Container,Snackbar } from "@mui/material";

import {Outlet,useLocation,useNavigation} from 'react-router-dom';

import { useApp } from "./App";

import Header from "./components/Header";
import AppDrawer from "./components/AppDrawer";
import SpinnerFullPage from "./pages/SpinnerFullPage";

export default function Layout(){
    const {globalMsg,setGlobalMsg,setIsJobsPage} = useApp();

    const location=useLocation();
    const navigation=useNavigation();

    if(location != "/jobs"){
        setIsJobsPage(false)
    }

    return(
        <Box>
            <AppDrawer />
            <Header />
            <Container maxWidth="sm" sx={{mt:4}}>
                {navigation.state == "submitting" && <SpinnerFullPage /> }
                {navigation.state == "loading" && <SpinnerFullPage /> }
                {navigation.state == "idle" && <Outlet />}
            </Container>
            <Snackbar anchorOrigin={{
                horizontal:"center",
                vertical:"bottom",
            }} 
            open={Boolean(globalMsg)}
            autoHideDuration={6000}
            onClose={()=>setGlobalMsg(null)}
            message={globalMsg}
            />
        </Box>
    )
}