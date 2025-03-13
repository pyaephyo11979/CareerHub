import { Form,useActionData,useNavigate } from "react-router-dom";

import { FormGroup,InputLabel,Button,Typography,Link,TextField,Box } from "@mui/material";

import Inputs from "./Inputs";
import FormFooter from "./FormFooter";

import i18n from "../i18n";
import {useTranslation} from 'react-i18next';

import { useApp } from "../App";

export default function LoginForm(){
    const actionData = useActionData();
    const navigation = useNavigate();
    const {t,i18n} = useTranslation();
    return(
        <Box maxWidth={400} sx={{p:2}} margin="auto">
        <Typography variant="h4" gutterBottom>
          {t("login")}
        </Typography>
        <Form method="post" action="/login">
          <TextField label={t("email")} variant="outlined" fullWidth margin="normal" name="email" required />
          <TextField
            label={t("password")}
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            name="password"
            required
          />
          {actionData?.error && (
            <Typography color="error" variant="body2">
              {actionData.error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            disabled={navigation.state === "submitting"}
          >
            {navigation.state === "submitting" ? "Logging in..." : t("login")}
          </Button>
        </Form>
        <FormFooter />
      </Box>
    )
}