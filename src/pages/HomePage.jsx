import { Typography, Button, Grid, Paper } from "@mui/material"
import { Link as RouterLink, } from "react-router-dom"

import coverImage from "../assets/career-hub-cover.svg"

function HomePage() {
  return (
    <Grid container sx={{p:2}} spacing={4} alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h2" gutterBottom>
          Welcome to Career Craft
        </Typography>
        <Typography variant="h5" paragraph>
          Find your dream job or the perfect candidate for your company.
        </Typography>
        <Button variant="contained" color="primary" component={RouterLink} to="/jobs" size="large">
          Explore Jobs
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <img src={coverImage} alt="Career Illustration" style={{ width: "100%", height: "auto" }} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default HomePage
