import { useEffect, useState } from "react"
import axios from "axios"
import Messages from "./Messages";
import ActiveMessages from "./ActiveMessages";

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


import SendMessage from "./SendMessage";




const drawerWidth = 240;

function Home(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [ allMessages, setAllMessages ] = useState([])
    const [ isLoading, setIsLoading ] = useState("Not loading")
    const [ error, setError ] = useState(false)
    const [ activeNumber, setActiveNumber ] = useState(null)
    const [ chats, setChats ] = useState([])
    const [ chatsLoading, setChatsLoading ] = useState("rest")
   
   
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    //function for all incoming message from client
    const apiCall = async() => {
      try {
        // setIsLoading("loading")
        await axios.get('https://paychat.azurewebsites.net/chat/all')
        .then(res => {
          setIsLoading("fetched")
          // console.log(res.data)
          setAllMessages(res.data.payContacts)
          setError(false)
        })
        
      } catch (error) {
        setError(true)
        setIsLoading("network error")
        console.error(error)
      }
    }

    useEffect(() => {
      apiCall()

      //making api call every 10 second
      const interval = setInterval(() => {
        apiCall()
      }, 10000)

      // Clearing the side effect
      return()=> clearInterval(interval)
    }, [])
  
   
   

      const userApiCall = async() => {
        try {
          setChatsLoading("loading")
          await axios.get(`https://paychat.azurewebsites.net/chat/${activeNumber}`)
          .then(res => {
            
            
            console.log(res.data.chats)
            setChatsLoading("loaded")
            setChats(res.data.chats)
          
          })
          
        } catch (error) {
          
          console.error(error)
        }
      }


      useEffect(() => {
        userApiCall()
      }, [activeNumber])

      

      


      //seection for sending messages request
      const [ sendMessage, setSendMessage ] = useState("")
      const [ sentLoader, setSentLoader ] = useState("rest")
      // console.log(sendMessage)

      let sentContent 
      if(sentLoader === "error"){
          sentContent = <Typography sx={{textAlign: "start", background: "red", color: "#fff", p:2, position: "fixed", borderRadius: "10px"}} >Could not send message..Try again</Typography>
          setTimeout(() => {
            sentContent = ""
          }, 3000);
      }else {
        if(sentLoader === "loading"){
            sentContent =  <Typography  sx={{textAlign: "start", background: "blue", color: "#fff", p:2, position: "fixed", borderRadius: "10px"}}>Sending......</Typography>
           
        }else if(sentLoader === "loaded"){
          sentContent =  <Typography  sx={{textAlign: "start", background: "green", color: "#fff", p:2, position: "fixed", borderRadius: "10px"}}>Message Sent</Typography>
          setTimeout(() => {
            sentContent = ""
          }, 3000);
        }
      }

      const Token = 'EAAHEyCpLP8oBAASTqbl1DQvwAj8oRYZBCgCl8NzZAKZCPZCKfn3nZCXSyplW7aupQIiZBCIlkPl74MpxsypLeIRdHlyQ2ozr2biLUecbwEgfmsH6GkuRhD5lgWZB2ifUCQCegXZCFq5KfRVfZBKJA2lXfIcJNtA4GjapBQ873tfmKbKtuOVGyVuM8HpKUV7JX04kLOoJ1Agf9qDXNEsTZBMOEnxEZBAmieskLMZD'

      const sendMessageFuc = async () => {
        setSentLoader("loading")
        try {
          await axios.post(`https://paychat.azurewebsites.net/chat/${activeNumber}/reply/${Token}`, {
            msg: sendMessage,
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
          .then(res => {
            console.log(res.data.chats)
            setChats(res.data.chats)
            setSentLoader("loaded")
          })
          
        } catch (error) {
          console.error(error)
          setSentLoader("error")
        }

        //setting back state to its origin state
        setTimeout(() => {
          setSentLoader("rest")
        }, 4000);
      }
       //seection for sending messages request
    
    const drawer = (
      <div style={{background: "rgb(248 250 252)"}}>
        <Toolbar />
        <Typography sx={{textAlign: "center"}}>Messages</Typography>
        <Divider />
       <Box sx={{background: "rgb(248 250 252)", height: "87vh", p:1}}>
          <Messages allMessages={allMessages} setActiveNumber={setActiveNumber} userApiCall={userApiCall} />
       </Box>
       

      </div>
    );

    //aa done
  
    const container = window !== undefined ? () => window().document.body : undefined;
  
    return (
      <Box sx={{ display: 'flex', background: "rgb(248 250 252)", overFlowX: "hidden"}}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            background: "rgb(248 250 252)",
            color: "#000"
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              { activeNumber !== null ? `+${activeNumber}` : null}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              height: "50vh"
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - ${drawerWidth}px)` },mb: "130px" }}
        >
          <Toolbar />
          {sentContent}
          <ActiveMessages activeNumber={activeNumber} setSendMessage={setSendMessage} sentLoader={sentLoader} sendMessageFuc={sendMessageFuc} chats={chats} chatsLoading={chatsLoading} />
          <SendMessage setSendMessage={setSendMessage} sentLoader={sentLoader} sendMessageFuc={sendMessageFuc} />
        </Box>
      </Box>
    );
  }
  
  Home.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
  
  export default Home;

  