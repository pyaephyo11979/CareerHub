"use client"

import { useState, useEffect } from "react"
import { Typography, TextField, Button, Box, Chip, Paper, Input } from "@mui/material"
import { Form, useActionData, useNavigation, useLoaderData, useParams } from "react-router-dom"

function EditProfilePage() {
  const actionData = useActionData()
  const user = useLoaderData()
  const navigation = useNavigation()
  const { id } = useParams()

  const [skills, setSkills] = useState(user?.skills || [])
  const [newSkill, setNewSkill] = useState("")

  useEffect(() => {
    if (user?.skills) {
      setSkills(user.skills)
    }
  }, [user])

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const handleDeleteSkill = (skillToDelete) => {
    setSkills(skills.filter((skill) => skill !== skillToDelete))
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>
      <Form method="patch" action={`/profile/${user._id}/edit`} encType="multipart/form-data">
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          defaultValue={user?.name || ""}
          required
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          name="phone"
          defaultValue={user?.phone || ""}
          required
        />
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Profile Image (Optional)
          </Typography>
          <Input type="file" name="image" inputProps={{ accept: "image/*" }}  />
        </Box>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            CV (Optional)
          </Typography>
          <Input type="file" name="cv" inputProps={{ accept: ".pdf,.doc,.docx" }} />
        </Box>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Skills
          </Typography>
          {skills.map((skill) => (
            <Chip key={skill} label={skill} onDelete={() => handleDeleteSkill(skill)} sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TextField
            label="Add Skill"
            variant="outlined"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            sx={{ mr: 1 }}
          />
          <Button variant="contained" onClick={handleAddSkill}>
            Add
          </Button>
        </Box>
        {skills.map((skill, index) => (
          <input key={index} type="hidden" name="skills" value={skill} />
        ))}
        {actionData?.message && (
          <Typography color="error" sx={{ mt: 2 }}>
            {actionData.message}
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
          {navigation.state === "submitting" ? "Saving..." : "Save Changes"}
        </Button>
      </Form>
    </Paper>
  )
}

export default EditProfilePage

