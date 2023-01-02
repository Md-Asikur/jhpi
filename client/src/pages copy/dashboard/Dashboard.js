import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { Brightness4, Brightness7, Home, Menu } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideList from './SideList';
import Protected from '../../com_1/components/protected/Protected';
import Login from "../../com_1/components/user/Login";
import { Link } from 'react-router-dom';
import { useValue } from '../../context/ContextProvider';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Dashboard() {
   const {
     state: { currentUser },
     dispatch,
   } = useValue();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? 'dark' : 'light',
        },
      }),
    [dark]
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <Menu />
            </IconButton>
            <Tooltip title="Go back to home page">
              <IconButton sx={{ mr: 1 }} onClick={() => navigate("/")}>
                <Home />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 7 }}>
              Dashboard
            </Typography>
            {currentUser && currentUser?.role === "admin" ? (
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                <Link
                  style={{ color: "white", fontWeight: "400", fontStyle: "inherit" }}
                  to="/admin/add-product/ADD"
                >
                  Add-Teacher
                </Link>
              </Typography>
            ) : (
              ""
            )}
            {currentUser && currentUser?.role === "admin" ? (
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                <Link
                  style={{ color: "white", fontWeight: "400", fontStyle: "inherit" }}
                  to="/admin/add-product/ADD"
                >
                  Add-Students
                </Link>
              </Typography>
            ) : (
              ""
            )}
            <IconButton onClick={() => setDark(!dark)}>
              {dark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Protected>
          <SideList {...{ open, setOpen }} />
        </Protected>
      </Box>
      <Login />
    </ThemeProvider>
  );
}
