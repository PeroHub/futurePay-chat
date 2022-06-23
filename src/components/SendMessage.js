import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const drawerWidth = 240;

function SendMessage({setSendMessage, sendMessageFuc, sentLoader}) {
    const [ value, setValue] = useState("")
    const handleOnchange = (e) => {
        setSendMessage(e.target.value)
    }
    // console.log(value)
    console.log(sentLoader)

   
    
    return ( 
        <Box sx={{background: "rgb(248 250 252)", width: {xs: "100%", sm: "80    %", md: "100%"}, position: "relative",  display: "flex", justifyContent: "center",  p:2}}>
            <input 
             style={{ background: "#fff", width: "100%", border: "1px solid #0d6efd", padding: "16px", borderRadius: "10px"}}
             
             onChange={handleOnchange}
            />
            
            <Button  sx={{}} onClick={sendMessageFuc} variant="contained">Send</Button>
        </Box>
     );
}

export default SendMessage;