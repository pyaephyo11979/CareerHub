import { Drawer,Box,Button,IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

import {useApp} from "../App.jsx"

export default function AppDrawer(){
    const {drawerOpen,setDrawerOpen} = useApp();

    const navigate = useNavigate();

    return(
        <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={()=>setDrawerOpen(false)}
        >
            <Box sx={{width:250}}>
                <IconButton size="large" edge="end" onClick={()=>setDrawerOpen(false)} >
                    <CloseIcon />
                </IconButton>
                <Button color="inherit" onClick={()=>{navigate("/")}}>Home</Button>
                <Button color="inherit" onClick={()=>{navigate("/jobs")}}>Jobs</Button>
                <Button color="inherit" onClick={()=>{navigate("/login")}}>Login</Button>
            </Box>
        </Drawer>
    )
}