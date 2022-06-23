import { Typography } from "@mui/material";
import { Box } from "@mui/system";
// import SendMessage from "./SendMessage";

function ActiveMessages({activeNumber, chats, chatsLoading}) {

    let content
    if(chatsLoading === "loading"){
        content = "loading...."
    }else if(chatsLoading === "loaded"){
        content =  <Box>
        {activeNumber !== null ? <Box>
            {chats.map((item, index) => (
                <Box key={index} >
                    <Typography style={{textAlign: item.isClientMsg ? "end": "start",  marginTop:"10px", background: item.isClientMsg ? "rgb(248 250 252)": "#fff", color:  item.isClientMsg ? "#000": "#000", padding: "10px", borderRadius: "15px"}}>{item.message}</Typography>
                </Box>
            ))}
        </Box> : "Welcome To FuturePay Chats"}
    </Box>
    }
    return ( 
        <>
          <Box sx={{ minHeight: "65vh",  p:2, background: "#fff"}}>
            {content}
            
        </Box>
        {/* <SendMessage /> */}
        </>
      
       
     );
}

export default ActiveMessages;