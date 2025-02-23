import { useEffect, useState } from "react"
import {
  Typography,
  Button,
  Paper,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton
} from "@mui/material"
import { Link, useNavigate, useParams } from "react-router-dom"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import useUserDetail from "../store/useUserDetail"
import useJobDetails from "../store/useJobDetail"
import { formatDate } from "../utils/formatDate"
import SpinnerFullPage from "../pages/SpinnerFullPage"

import { useApp } from "../App"

function JobSkeleton() {
  return (
    <Paper elevation={3} sx={{ p: 3, m: 2, bgcolor: "background.paper" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={2}>
          <Skeleton variant="circular" width={56} height={56} />
          <Skeleton variant="text" width={120} height={32} />
        </Box>
        <Box>
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: 1 }} />
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      </Box>

      <Skeleton variant="text" width="60%" height={40} />
      <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />

      <Skeleton variant="text" width="100%" height={24} />
      <Skeleton variant="text" width="100%" height={24} />
      <Skeleton variant="text" width="80%" height={24} />

      <Skeleton variant="text" width="40%" height={32} sx={{ mt: 2, mb: 1 }} />
      <Skeleton variant="text" width="100%" height={24} />
      <Skeleton variant="text" width="100%" height={24} />
      <Skeleton variant="text" width="90%" height={24} />

      <Skeleton variant="text" width="30%" height={24} sx={{ mt: 2 }} />
      <Skeleton variant="text" width="20%" height={24} sx={{ mb: 2 }} />

      <Skeleton variant="rectangular" width="100%" height={36} />
    </Paper>
  )
}

function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { jobData, isLoading, error } = useJobDetails(id)
  const [applicants, setApplicants] = useState([])
  const [isApplying, setIsApplying] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const {globalMsg,setGlobalMsg} = useApp()

  const user = JSON.parse(localStorage.getItem("user"))
  const userId = jobData?.postedBy?.id
  const { userData, error: imageError, isLoading: imageLoading } = useUserDetail(userId)
  const userDetails = userData || null

  useEffect(() => {
    if (jobData?.applicants) {
      setApplicants(jobData.applicants)
    }
  }, [jobData?.applicants])

  const alreadyApply = applicants?.some((applicant) => applicant.id === user?._id)

  const handleDeleteConfirm = () => {
    setOpenDialog(true)
  }

  const handleDeleteCancel = () => {
    setOpenDialog(false)
  }

  const handleDeleteConfirmed = async () => {
    setOpenDialog(false)
    try {
      const response = await fetch(`https://careercraftapi.onrender.com/api/post/delete/${jobData._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })

      if (response.ok) {
        navigate("/jobs")
      } else {
        const responseData = await response.json()
        console.log("Failed to delete", responseData.error)
      }
    } catch (error) {
      console.log("Error during deletion", error)
    }
  }

  const jobApplyHandler = async (postId) => {
    setIsApplying(true)
    try {
      const response = await fetch(`https://careercraftapi.onrender.com/api/post/apply/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ uid: user._id, pid: postId }),
      })

      if (!response.ok) {
        const responseData = await response.json()
        throw new Error(responseData.error)
      }

      const responseData = await response.json()
      setApplicants((prev) => [...prev, { id: user._id, name: user.name, _id: postId }])
      return responseData
    } catch (error) {
      console.error("Error during job application:", error)
    } finally {
      setGlobalMsg("Application submitted successfully")
      setIsApplying(false)
    }
  }

  if (error) {
    return (
      <Typography color="error" p={10}>
        {error}
      </Typography>
    )
  }

  if (isLoading) {
    return <JobSkeleton />
  }

  const position = jobData.position === "internship" ? jobData.position : `${jobData.position}-level`

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2, bgcolor: "background.paper" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={2}>
          {!imageError && !imageLoading && (
            <Avatar src={userDetails?.image} alt={jobData.postedBy?.name} sx={{ width: 56, height: 56 }} />
          )}
          <Link to={`/profile/${jobData.postedBy?.id}`} style={{ textDecoration: "none" }}>
            <Typography variant="h6" color="primary">
              {jobData.postedBy?.name}
            </Typography>
          </Link>
        </Box>
        {jobData.postedBy?.id === user?._id && (
          <Box>
            <IconButton component={Link} to={`/jobs/edit/${jobData._id}`}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDeleteConfirm}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
      </Box>

      <Typography variant="h4" gutterBottom>
        {jobData.title} ({position})
      </Typography>
      <Typography variant="h6" gutterBottom>
        {jobData.companyName}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Description
      </Typography>
      <Typography paragraph>{jobData.description}</Typography>

      <Typography variant="subtitle1" gutterBottom>
        Requirements:
      </Typography>
      <List>
        {jobData.requirements.map((requirement, index) => (
          <ListItem key={index}>
            <ListItemText primary={requirement} />
          </ListItem>
        ))}
      </List>

      <Typography variant="body2" color="textSecondary" gutterBottom>
        {applicants?.length} Applicants
      </Typography>
      {user && user.role === "employer" && user?._id === jobData?.postedBy?.id && (
        <List>
          {applicants.map((applicant, index) => (
            <ListItem key={index}>
              <ListItemText primary={applicant.name} />
              <Button onClick={()=>navigate(`/profile/${applicant.id}`)} variant="outlined" size="small">
                  View User
                </Button>
            </ListItem>
          ))}
        </List>
      )}

      <Typography variant="body2" color="textSecondary" gutterBottom>
        Posted on: {formatDate(jobData.createdAt)}
      </Typography>

      {!alreadyApply && user && user.role === "user" && user?._id !== jobData?.postedBy?.id && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => jobApplyHandler(jobData._id)}
          disabled={isApplying}
        >
          {isApplying ? "Applying..." : "Apply Now"}
        </Button>
      )}

      <Dialog
        open={openDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this job post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export default JobDetail

