
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';
import ViewListIcon from '@mui/icons-material/ViewList';
import Registration from './Registration';
import { Route,Routes } from 'react-router-dom';
import { RegistrationDetails } from '../../Type';
import { useState,useContext } from 'react';
import Participationdetails from './Participationdetails';
import { useNavigate } from 'react-router-dom';
import CountContext from '../../store/count-context';
import { Count } from '../../Type';
import Analysis from './Analysis';


const drawerWidth = 240;



const Dashboard = (props : any) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] =  useState(false);

  const[isSelected,SetisSelected] = useState<boolean>(true);

  const {count} = useContext<Count>(CountContext);

  const array : {id : number}[] =  JSON.parse(localStorage.getItem('participantsarray') || '[]')

  let lastObjectId : number;

if(array.length > 0)
  {
     lastObjectId = array[array.length -1].id + 1 ;
  }

  else
  {
    lastObjectId = 1
  }

 
  const[cid,setId] = useState<number>(lastObjectId);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const[list,setList] = useState<RegistrationDetails[]>([]);

  const getDataHandler = (item : RegistrationDetails) => 
    {
               setList((prevState) => {return[...prevState,item]})
    }

    const detailsNavigate = useNavigate();
    const navigate = useNavigate();

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        
        <ListItem disablePadding >
            <ListItemButton selected={isSelected} onClick={() => {  SetisSelected(true); navigate('/')}} >
              <ListItemIcon>
                <CreateIcon /> 
              </ListItemIcon>
              <ListItemText>Registration</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding >
            <ListItemButton selected = {!isSelected} onClick={() => {  SetisSelected(false); navigate('/Details')}} >
              <ListItemIcon>
              <ViewListIcon />
              </ListItemIcon>
              <ListItemText>Show Details</ListItemText>
            </ListItemButton>
          </ListItem>
          
       
      </List>
     
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
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
          <Typography variant="h6" noWrap component="div" style={{display : 'flex' , justifyContent : 'space-between', width : '100%'}}>
           
                 <div>
                 Indoor Games
                 </div>
                 <div>
                  Total Participants :  {count}
                 </div>
          
             
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
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
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
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
       
          <Routes>
            <Route path = '/' element = {<Registration onGetData = {getDataHandler} list = {list} cid = {cid} setId = {setId}/>}  />
            <Route path = '/Details' element = {<Participationdetails list = {list} />} />
           
          </Routes>
     
       
      </Box>
    
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default Dashboard;