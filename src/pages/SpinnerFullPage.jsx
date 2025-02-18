import { CircularProgress,Box } from "@mui/material";

export default function SpinnerFullPage() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress color="primary" size={100} />
        </Box>
    )
}