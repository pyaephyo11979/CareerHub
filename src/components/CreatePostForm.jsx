import { useState, useEffect } from "react"
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  IconButton,
} from "@mui/material"
import { Form, useActionData, useNavigation } from "react-router-dom"
import DeleteIcon from "@mui/icons-material/Delete"

import SpinnerFullPage from "../pages/SpinnerFullPage"

function CreatePostForm({ job = {}, isLoading = false }) {
  const actionData = useActionData()
  const navigation = useNavigation()
  const [requirements, setRequirements] = useState([""])

  // Set requirements only when job.requirements changes
  useEffect(() => {
    if (job.requirements) {
      setRequirements(job.requirements)
    }
  }, [job.requirements])

  const handleAddRequirement = () => {
    setRequirements([...requirements, ""])
  }

  const handleRemoveRequirement = (index) => {
    const newRequirements = requirements.filter((_, i) => i !== index)
    setRequirements(newRequirements)
  }

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...requirements]
    newRequirements[index] = value
    setRequirements(newRequirements)
  }

  return isLoading ? (
    <SpinnerFullPage />
  ) : (
    <Paper elevation={3} sx={{ p: 3, my: 1, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        {job._id ? "Edit Job Post" : "Create Job Post"}
      </Typography>
      <Form
        method={job._id ? "patch" : "post"}
        action={job._id ? `/jobs/edit/${job._id}` : "/jobs/create"}
      >
        {job._id && <input type="hidden" name="id" value={job._id} />}

        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          defaultValue={job.title || ""}
          required
        />

        <TextField
          label="Company Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="company_name"
          defaultValue={job.companyName || ""}
          required
        />

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          name="description"
          multiline
          rows={4}
          defaultValue={job.description || ""}
          required
        />

        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Requirements
          </Typography>
          <List>
            {requirements.map((req, index) => (
              <ListItem key={index} disablePadding>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={req}
                  onChange={(e) => handleRequirementChange(index, e.target.value)}
                  name={`requirements`}
                  placeholder={`Requirement ${index + 1}`}
                  sx={{ mr: 1 }}
                />
                <IconButton onClick={() => handleRemoveRequirement(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button variant="outlined" onClick={handleAddRequirement} sx={{ mt: 1 }}>
            Add Requirement
          </Button>
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel id="type-label">Position</InputLabel>
          <Select
            labelId="type-label"
            name="position"
            defaultValue={job.position || ""}
            required
          >
            <MenuItem value="full-time">Full-time</MenuItem>
            <MenuItem value="part-time">Part-time</MenuItem>
            <MenuItem value="junior">Junior</MenuItem>
            <MenuItem value="senior">Senior</MenuItem>
            <MenuItem value="mid">Mid</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
            <MenuItem value="internship">Internship</MenuItem>
          </Select>
        </FormControl>

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
          {navigation.state === "submitting"
            ? "Saving..."
            : job._id
            ? "Update Job Post"
            : "Create Job Post"}
        </Button>
      </Form>
    </Paper>
  )
}

export default CreatePostForm
