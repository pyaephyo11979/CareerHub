import { useState } from "react";
import { useApp } from "../App";
import { Skeleton, Box, IconButton, Paper, InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useJobContext } from "../ctx/JobContext";
import Jobs from "../components/Jobs";

export default function JobsPage() {
    const { setIsJobsPage } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const { data, setData, isLoading, error } = useJobContext();
    const [originalData, setOriginalData] = useState(data); 
    
    function handleSearchValueChange(event){
        setSearchTerm(event.target.value)
    }

    const filteredData = data.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

    let jobNotFound;

    if (!filteredData.length && !isLoading && !error ){
        jobNotFound = <h1 className="text-stone-500 text-center">Job not Found...</h1>
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm) {
            setData(originalData); // Reset data when search is empty
            return;
        }

        const filteredJobs = originalData.filter((job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setData(filteredJobs);
        console.log("Searching for:", searchTerm);
    };

    const SearchBar = () => {
        return (
            <Paper
                component="form"
                sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%",mb: 4 }}
                onSubmit={handleSearchValueChange}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Jobs"
                    inputProps={{ "aria-label": "search jobs" }}
                    value={searchTerm}
                    onChange={handleSearchValueChange}
                />
                <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        );
    };

    return (
        <Box  sx={{ width: "100%", maxWidth: "100%", padding: 2}}>
            <SearchBar />
            {searchTerm
                ? <Jobs data={filteredData} isLoading={isLoading} error={error} />
                : <Jobs data={data} isLoading={isLoading} error={error} />
            }

            { jobNotFound }
        </Box>
    );
}
