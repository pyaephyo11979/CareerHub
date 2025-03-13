import {Box,Button,Typography} from "@mui/material";
import {useNavigate,useLocation} from "react-router-dom";

import i18n from "../i18n";
import {useTranslation} from 'react-i18next';

export default function FormFooter(){
    const route = useLocation();
    const navigate = useNavigate();
    const {t,i18n} = useTranslation();
    return(
        <Box sx={{display:"flex",justifyContent:"space-between",mt:2}}>
            <Typography variant="body2" color="textSecondary">
                {route.pathname === "/login" ? t("noAcc") : t("haveAcc")}
                <Button
                    color="inherit"
                    size="small"
                    onClick={() => navigate(route.pathname === "/login" ? "/register" : "/login")}
                >
                    {route.pathname === "/login" ? t("register") : t("login")}
                </Button>
            </Typography>
        </Box>
    )

}