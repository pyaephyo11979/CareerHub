import { useState } from "react"
import { Typography, TextField, Button, Box, Link, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { Form, useActionData, useNavigation } from "react-router-dom"
import FormFooter from "./FormFooter"

import i18n from "../i18n";
import {useTranslation} from 'react-i18next';

function RegisterForm() {
  const actionData = useActionData()
  const navigation = useNavigation()

  // Manage state for select fields
  const [gender, setGender] = useState("")
  const [role, setRole] = useState("")

  const {t,i18n} = useTranslation();

  return (
    <Box maxWidth={400} sx={{ p: 2 }} margin="auto">
      <Typography variant="h4" gutterBottom>
        {t("register")}
      </Typography>
      <Form method="post" action="/register">
        <TextField label={t("username")} variant="outlined" fullWidth margin="normal" name="username" required />
        <TextField label={t("email")} variant="outlined" fullWidth margin="normal" name="email" type="email" required />
        <TextField label={t("password")} variant="outlined" fullWidth margin="normal" type="password" name="password" required />
        <TextField label={t("confirmPassword")} variant="outlined" fullWidth margin="normal" type="password" name="confirmation" required />
        <TextField label={t("phone")} variant="outlined" fullWidth margin="normal" name="phone" required />

        {/* Gender Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>{t("gender")}</InputLabel>
          <Select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <MenuItem value="male">{t("male")}</MenuItem>
            <MenuItem value="female">{t("female")}</MenuItem>
            <MenuItem value="other">{t("other")}</MenuItem>
          </Select>
        </FormControl>

        {/* Role Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>{t("role")}</InputLabel>
          <Select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <MenuItem value="user">{t("seeker")}</MenuItem>
            <MenuItem value="employer">{t("employer")}</MenuItem>
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
          {navigation.state === "submitting" ? "Registering..." : t("register")}
        </Button>
      </Form>
      <FormFooter />
    </Box>
  )
}

export default RegisterForm
