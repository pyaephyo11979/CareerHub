import {Box,Button,Typography} from "@mui/material";
import {useNavigate,useLocation} from "react-router-dom";

export default function FormFooter(){
    const route = useLocation();
    const navigate = useNavigate();
    return(
        <Box sx={{display:"flex",justifyContent:"space-between",mt:2}}>
            <Typography variant="body2" color="textSecondary">
                {route.pathname === "/login" ? "Don't have an account?" : "Already have an account?"}
                <Button
                    color="inherit"
                    size="small"
                    onClick={() => navigate(route.pathname === "/login" ? "/register" : "/login")}
                >
                    {route.pathname === "/login" ? "Register" : "Login"}
                </Button>
            </Typography>
        </Box>
    )

}