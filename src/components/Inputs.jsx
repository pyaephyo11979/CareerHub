import { Box,TextField,Input } from "@mui/material"

export default function Inputs({type,onChange,id,name,label,...props}){
    return(
        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} autoComplete="off">
            <Input  type={type} onChange={onChange} id={id} name={name} {...props}></Input>
        </Box>
    )
}