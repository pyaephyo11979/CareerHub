import { Form,useActionData,useNavigate } from "react-router-dom";

import { FormGroup,InputLabel,Button,Typography,Link,TextField,Box } from "@mui/material";

import Inputs from "./Inputs";
import FormFooter from "./FormFooter";

import { useApp } from "../App";

export default function LoginForm(){
    const actionData = useActionData();
    const navigation = useNavigate();
    return(
        <Box maxWidth={400} margin="auto">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Form method="post" action="/login">
          <TextField label="Username or Email" variant="outlined" fullWidth margin="normal" name="email" required />
          <TextField
            label="Password"
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
            {navigation.state === "submitting" ? "Logging in..." : "Login"}
          </Button>
        </Form>
        <FormFooter />
      </Box>
    )
}