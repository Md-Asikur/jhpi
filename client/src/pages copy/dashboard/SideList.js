import {
  CampaignOutlined,
  ChevronLeft,
  Dashboard,
  Diversity1,
  Diversity2,
  Diversity3,
  Group,
  HomeRepairService,
  KingBed,
  Logout,
  MarkChatUnread,
  NotificationsActive,
  PeopleAlt,
  SportsTennis,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import { storeRoom } from "../../actions/room";
import { logout } from "../../actions/user";
import MuiDrawer from '@mui/material/Drawer';
import { useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useValue } from '../../context/ContextProvider';
import Main from './main/Main';
import Messages from './messages/Messages';
import Requests from './requests/Requests';
import Rooms from './rooms/Rooms';
import Users from './users/Users';
import useCheckToken from '../../hooks/useCheckToken';
import IsAdmin from './utils/IsAdmin';
import ViewEnter from '../../components/admin/viewProducts/ViewEnter';
import ViewProducts from '../../components/admin/viewProducts/ViewProducts';
import ViewTeachers from '../../components/admin/viewProducts/ViewTeacher';
import ViewProject from '../../components/admin/viewProducts/ViewProject';
import ViewNotices from '../../components/admin/viewProducts/ViewNotice';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const SideList = ({ open, setOpen }) => {
  useCheckToken()
  const {
    state: {
      currentUser,
      location,
      details,
      images,
      updatedRoom,
      deletedImages,
      addedImages,
    },
    dispatch,
  } = useValue();

  const [selectedLink, setSelectedLink] = useState('');

  const list = useMemo(
    () => [
      ...(IsAdmin(currentUser)
        ? [
            {
              title: "Main",
              icon: <Dashboard />,
              link: "",
              component: <Main {...{ setSelectedLink, link: "" }} />,
            },
            {
              title: "Users",
              icon: <PeopleAlt />,
              link: "users",
              component: <Users {...{ setSelectedLink, link: "users" }} />,
            },
          ]
        : []),

      {
        title: "All-Students",
        icon: <Diversity3 />,
        link: "All-Students",
        component: <ViewProducts {...{ setSelectedLink, link: "All-Students" }} />,
      },
      {
        title: "All-Teachers",
        icon: <Diversity1 />,
        link: "All-Teachers",
        component: <ViewTeachers {...{ setSelectedLink, link: "All-Teachers" }} />,
      },
      {
        title: "All-Projects",
        icon: <HomeRepairService />,
        link: "All-Projects",
        component: <ViewProject {...{ setSelectedLink, link: "All-Projects" }} />,
      },
      {
        title: "All-Notices",
        icon: <CampaignOutlined />,
        link: "All-Notices",
        component: <ViewNotices {...{ setSelectedLink, link: "All-Notices" }} />,
      },
      {
        title: "Entertainments",
        icon: <SportsTennis />,
        link: "all-entertainments",
        component: <ViewEnter {...{ setSelectedLink, link: "all-entertainments" }} />,
      },
    ],
    []
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    storeRoom(
      location,
      details,
      images,
      updatedRoom,
      deletedImages,
      addedImages,
      currentUser.id
    );
    logout(dispatch);
    
  };
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)} style={{ paddingTop: "40px" }}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(item.link)}
                selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ mx: "auto", mt: 3, mb: 1 }}>
          <Tooltip title={currentUser?.name || ""}>
            <Avatar
              src={currentUser?.photoURL}
              {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          {open && <Typography>{currentUser?.name}</Typography>}
          <Typography variant="body2">{currentUser?.role || "role"}</Typography>
          {open && <Typography variant="body2">{currentUser?.email}</Typography>}
          <Tooltip title="Logout" sx={{ mt: 1 }}>
            <IconButton onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {list.map((item) => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))}
        </Routes>
      </Box>
    </>
  );
};

export default SideList;
