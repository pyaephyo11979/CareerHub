import { Skeleton,Typography,TextField,Button,Grid,Card,CardContent } from "@mui/material";

import { useJobContext } from "../ctx/JobContext";

import JobCard from "./JobCard";

const LoadingSkeleton = ({ index }) => {
    return (
        <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
                <CardContent>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="text" width="60%" height={20} />
                    </div>
                    <Skeleton variant="text" width="80%" height={28} sx={{ mt: 2 }} />
                    <Skeleton variant="text" width="50%" height={24} sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={40} sx={{ mt: 2 }} />
                </CardContent>
            </Card>
        </Grid>
    );
};


export default function Jobs({data,isLoading,error}) {
    const sortedData = data ? [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];


    if(isLoading){
        return (
            Array.from(new Array(6)).map((_, index) => (
            <LoadingSkeleton key={index} index={index} />
              ))
        )
    }
    if(error){
        return <div>Error fetching data</div>
    }
    return(
        <Grid container minWidth={"1000px"} spacing={2}>
            {sortedData.map((job,index)=>(
                <Grid item xs={12} sm={8} md={4} key={index}>
                <JobCard key={index} data={job}/>
                </Grid>
            ))}
        </Grid>
    )
    
}