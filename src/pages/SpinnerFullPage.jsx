import { CircularProgress } from "@mui/material";

export default function SpinnerFullPage() {
    return (
        <div className="w-full h-screen bg-zinc-900 p-40">
            <CircularProgress color="primary" size={100} />
        </div>
    )
}