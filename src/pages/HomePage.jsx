import { Typography, Button, Grid, Paper } from "@mui/material"
import { Link as RouterLink, } from "react-router-dom"
import i18n from "../i18n"
import { useTranslation } from "react-i18next"

import coverImage from "../assets/career-hub-cover.svg"

function HomePage() {
  const { t, i18n } = useTranslation()
  return (
    <Grid container sx={{p:2}} spacing={4} alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h2" gutterBottom>
          {t("welcome")}
        </Typography>
        <Typography variant="h5" paragraph>
          {t("findJob")}
        </Typography>
        <Button variant="contained" color="primary" component={RouterLink} to="/jobs" size="large">
          {t("exploreJobs")}
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
