import { useParams } from "react-router-dom";

import useJobDetails from "../store/useJobDetail";
import CreatePostForm from "../components/CreatePostForm";

export default function EditJobPage(){
    const {id} = useParams();
    const {jobData,isLoading} = useJobDetails(id);
    console.log(jobData);

    return (
        <CreatePostForm job={jobData} isLoading={isLoading}  />
    );
}