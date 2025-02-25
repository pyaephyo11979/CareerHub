import { useRef, useState, useEffect } from "react";
import { useApp } from "../App";
import { Skeleton, Box, IconButton, Paper, InputBase,Pagination } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useJobContext } from "../ctx/JobContext";
import Jobs from "../components/Jobs";

const JOBS_PER_PAGE = 6;

export default function JobsPage() {
    const { setIsJobsPage } = useApp();
    const searchTermRef = useRef(null); // Initialize as null for input reference
    const { data, setData, isLoading, error } = useJobContext(); // State for filtered data
    const [filteredJobs, setFilteredJobs] = useState([])
    const [page, setPage] = useState(1)
    const originalData = useRef(data); // Store original data

    useEffect(() => {
        if (data) {
          setFilteredJobs(data)
        }
      }, [data])
    
      const handleSearch = (e) => {
        e.preventDefault()
        const searchTerm = searchTermRef.current.value.toLowerCase()
        const filtered = data.filter(
          (job) => job.title.toLowerCase().includes(searchTerm) || job.companyName.toLowerCase().includes(searchTerm),
        )
        setFilteredJobs(filtered)
        setPage(1) // Reset to first page after search
      }
    
      const handlePageChange = (event, value) => {
        setPage(value)
      }
    
      // Calculate pagination
      const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE)
      const startIndex = (page - 1) * JOBS_PER_PAGE
      const endIndex = startIndex + JOBS_PER_PAGE
      const currentJobs = filteredJobs.slice(startIndex, endIndex)
    

    let jobNotFound;
    if (!currentJobs?.length && !isLoading && !error) {
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
            <Jobs data={currentJobs} isLoading={isLoading} error={error} />
            {jobNotFound}
            
            {
                !isLoading && filteredJobs.length > 0 && (
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                    />
                )
            }
        </Box>
    );
}