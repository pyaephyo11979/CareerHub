import { Typography, TextField, Button, Box,Link, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { Form, useActionData, useNavigation } from "react-router-dom"

import FormFooter   from "./FormFooter"
function RegisterForm() {
  const actionData = useActionData()
  const navigation = useNavigation()

  return (
    <Box maxWidth={400} sx={{p:2}} margin="auto">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Form method="post" action="/register">
        <TextField label="Username" variant="outlined" fullWidth margin="normal" name="username" required />
        <TextField label="Email" variant="outlined" fullWidth margin="normal" name="email" type="email" required />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          name="password"
          required
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          name="confirmation"
          required
        />
        <TextField label="Phone" variant="outlined" fullWidth margin="normal" name="phone" required />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select name="gender" label="Gender" required>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select name="role" label="Role" required>
            <MenuItem value="jobseeker">Job Seeker</MenuItem>
            <MenuItem value="employer">Employer</MenuItem>
          </Select>
        </FormControl>
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
          {navigation.state === "submitting" ? "Registering..." : "Register"}
        </Button>
      </Form>
      <FormFooter />
    </Box>
  )
}

export default RegisterForm

