import { useRef, useState, useEffect } from "react";
import { useApp } from "../App";
import { Skeleton, Box, IconButton, Paper, InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useJobContext } from "../ctx/JobContext";
import Jobs from "../components/Jobs";

export default function JobsPage() {
    const { setIsJobsPage } = useApp();
    const searchTermRef = useRef(null); // Initialize as null for input reference
    const { data, setData, isLoading, error } = useJobContext();
    const [filteredData, setFilteredData] = useState(data); // State for filtered data
    const originalData = useRef(data); // Store original data

    // Update originalData and filteredData when data changes
    useEffect(() => {
        originalData.current = data;
        setFilteredData(data);
    }, [data]);

    const handleSearch = () => {
        const searchTerm = searchTermRef.current.value;
        if (!searchTerm) {
            setFilteredData(originalData.current); // Reset data when search is empty
            return;
        }

        const filteredJobs = originalData.current.filter((job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredJobs); // Update filtered data
    };

    let jobNotFound;
    if (!filteredData?.length && !isLoading && !error) {
        jobNotFound = <h1 className="text-stone-500 text-center">Job not Found...</h1>;
    }

    const SearchBar = () => (
        <Paper
            sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%", mb: 4 }}
            component={"form"}
            onSubmit={handleSearch}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Jobs"
                inputProps={{ "aria-label": "search jobs" }}
                inputRef={searchTermRef}// Trigger search on input change
            />
            <IconButton sx={{ p: "10px" }} aria-label="search" type="submit" onClick={handleSearch}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );

    return (
        <Box sx={{ width: "100%", maxWidth: "100%", padding: 2 }}>
            <SearchBar />
            <Jobs data={filteredData} isLoading={isLoading} error={error} />
            {jobNotFound}
        </Box>
    );
}