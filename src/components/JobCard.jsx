import { Card, CardActions, CardContent, Button, Typography, Avatar, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUserDetail from "../store/useUserDetail";
import { convertDriveUrl } from "../utils/misc";

export default function JobCard({ data }) {
    const navigate = useNavigate();
    const { userData, isLoading, error } = useUserDetail(data.postedBy.id);
    const user = userData ? userData : null;
    user? console.log(user.image):null;
    const imgUrl= userData? convertDriveUrl(userData.image):null;
    return (
        <Card>
            <CardContent>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {!isLoading && !error ? (
                        <Avatar alt={user?.name} src={imgUrl} />
                    ) : (
                        <Avatar /> // Default Avatar when loading
                    )}
                    <Link href={`/profile/${user?._id}`} underline="none" color="inherit">
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {user?.name || "Loading..."}
                        </Typography>
                    </Link>
                </div>

                <Typography variant="h5" component="div">
                    {data.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {data.companyName}
                </Typography>

                <Typography variant="body2">
                    {data.description.length > 100
                        ? `${data.description.slice(0, 100)}...`
                        : data.description}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small" onClick={() => navigate(`/jobs/${data._id}`)}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
