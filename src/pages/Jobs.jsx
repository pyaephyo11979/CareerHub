import { Fullscreen } from "@mui/icons-material";
import { useApp } from "../App";
import { Skeleton, Box, Grid2 } from "@mui/material";

export default function Jobs() {
    const { setIsJobsPage } = useApp();
    setIsJobsPage(true);

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid2 container  spacing={2}>
                {[...Array(16)].map((_, index) => (
                    <Grid2 key={index} size={6}>
                        <Skeleton variant="rectangle" width={"100%"} height={400}/>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
}