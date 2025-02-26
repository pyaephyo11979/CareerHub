import { Typography, Paper, Grid, Button, Chip, List, ListItem, ListItemText, Divider, Skeleton } from "@mui/material";
import { Link as RouterLink, useParams, useLoaderData } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";
import { convertDriveUrl } from "../utils/misc";

import JobCard from "../components/JobCard";

import useUserDetail from "../store/useUserDetail";
import { useJobContext } from "../ctx/JobContext";

function Profile() {
  const { id } = useParams();
  const currentUser = useLoaderData(); 
  const { userData, error, isLoading } = useUserDetail(id);
  const { data } = useJobContext();

  const user = userData;
  const imgUrl = user ? convertDriveUrl(user.image) : null;
  const userPosts = data?.filter(post => post.postedBy && post.postedBy.id === id) || [];
  

  const appliedJobs = currentUser?._id
    ? data?.filter(job => job.applicants?.some(applicant => applicant.id === currentUser._id))
    : [];

  const isCurrentUser = currentUser?._id === id;

  if (isLoading) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Skeleton variant="circular" width={200} height={200} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Skeleton variant="text" width="50%" height={40} />
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" sx={{ mt: 2 }} />
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} variant="rectangular" width={100} height={32} sx={{ mt: 1, mr: 1, display: "inline-block" }} />
            ))}
          </Grid>
        </Grid>
        {[...Array(2)].map((_, index) => (
          <Skeleton key={index} variant="rectangular" height={100} sx={{ mt: 2 }} />
        ))}
      </Paper>
    );
  }

  if (error || !user) {
    return <Typography color="error">User not found.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, my: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <img src={imgUrl|| "/public/profile.jpg"} alt="Profile" style={{ width: "100%", borderRadius: "50%" }} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" gutterBottom>{user.name}</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          {user?.role == "employer" ? (
            <>
            <Typography variant="body1">Employer</Typography>
            {
              user.companyName && <Typography variant="body1">Company: {user.companyName}</Typography>
            }
            {
              user.companyAddress && <Typography variant="body1">Address: {user.companyAddress}</Typography>
            }
            </>
          ):(
            <Typography variant="body1">Job Seeker</Typography>
          )}
          {!isCurrentUser && currentUser?.role == "employer" && (
            <Typography variant="body1">Phone: +95{user.phone}</Typography>
          )}
          {isCurrentUser && <Typography variant="body1">Phone: +95{user.phone}</Typography>}
          {user.cvLink && (
            <Button
              href={user.cvLink}
              target="_blank"
              variant="outlined"
              color="primary"
              startIcon={<WorkIcon />}
              sx={{ mt: 2 }}
            >
              View CV
            </Button>
          )}

          {user?.role !== "employer" && (
            <>
          <Typography variant="h6" sx={{ mt: 2 }}>Skills</Typography>
          {user.skills?.length > 0 ? (
            user.skills.map((skill) => <Chip key={skill} label={skill} sx={{ mr: 1, mb: 1 }} />)
          ) : (
            <Typography variant="body2">No skills listed.</Typography>
          )}
          </>
          )}

          {isCurrentUser && (
            <Button
              component={RouterLink}
              to={`/profile/${user._id}/edit`}
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          )}
        </Grid>
      </Grid>

      {isCurrentUser && currentUser.role === "user" && appliedJobs.length > 0 && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
            <WorkIcon sx={{ mr: 1 }} /> Applied Jobs
          </Typography>
          <List>
            {appliedJobs.map((job) => (
              <ListItem key={job.id} disablePadding>
                <ListItemText primary={job.title} secondary={job.company} sx={{ my: 1 }} />
                <Button component={RouterLink} to={`/jobs/${job.id}`} variant="outlined" size="small">
                  View Job
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      )}

      {isCurrentUser && currentUser.role === "employer" && userPosts.length > 0 && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
            <WorkIcon sx={{ mr: 1 }} /> Posted Jobs
          </Typography>
          <Grid container spacing={3}>
            {userPosts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <JobCard data={post} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Paper>
  );
}

export default Profile;
