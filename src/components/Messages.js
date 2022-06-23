

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


  
function Messages({allMessages, setActiveNumber, userApiCall}) {
    // const handleActiveNumber = (e) => {
    //     setActiveNumber(e.target.value)
    // }
    // console.log(allMessages)
    return ( 
        <Box>
            {allMessages.map((item, index) => (
                <Box 
                    key={index} 
                    sx={{ 
                    cursor: "pointer", display:'flex', 
                    p:1,
                    background: "#fff",
                    border: "1px solid rgb(248 250 252)",
                    justifyContent: "center", 
                    alignItems:  "center"}}
                    onClick={() => {
                        setActiveNumber(item.displayName)
                        
                            userApiCall()
                       
                    }}
                    >
                <Typography sx={{p:2}}>{item.displayName}</Typography>
                {item.messages !== 0 ? <Typography sx={{background: "red", color: "#fff", display:'flex', justifyContent: "center", alignItems:  "center", fontSize: "14px", borderRadius: "50%", width: "20px", height: "20px"}}>{item.messages}</Typography>: null}
                </Box>
                
            ))}
        </Box>
     );
}

export default Messages;