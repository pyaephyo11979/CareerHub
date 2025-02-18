import { Typography, Button, Container, Box } from "@mui/material"
import { useRouteError, Link as RouterLink } from "react-router-dom"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"

function ErrorPage() {
  const error = useRouteError()

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: "error.main", mb: 4 }} />
        <Typography variant="h4" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {error.statusText || error.message || "We couldn't find the page you're looking for."}
        </Typography>
        <Button variant="contained" color="primary" component={RouterLink} to="/" sx={{ mt: 2 }}>
          Go back to homepage
        </Button>
      </Box>
    </Container>
  )
}

export default ErrorPage

