import { useState } from "react";
import { Link as RouterLink, useNavigate, useLoaderData } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LanguageIcon from "@mui/icons-material/Language";

import i18n from "../i18n";
import { useTranslation } from "react-i18next";

import { useApp } from "../App";

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = useLoaderData("root"); 
  const {setUser} = useApp();
  const {t,i18n} = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  setUser(user);

  const navItems = [
    { label: t("home"), path: "/" },
    { label: t("jobs"), path: "/jobs" },
    ...(user
      ? [
          { label: `${user.name}`, path: `/profile/${user._id}` },
          { label: "Logout", path: "/logout" },
        ]
      : [{ label: t("login"), path: "/login" }]),
    ...(user && user.role === "employer" ? [{ label: "CreateJobPost", path: "/jobs/create" }] : []),
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const { mode, setMode } = useApp();

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.label} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Career Hub
          </Typography>
          {!isMobile && (
            <Box sx={{ display: "flex" }}>
              {navItems.map((item) => (
                <Button key={item.label} color="inherit" onClick={() => navigate(item.path)}>
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
          <Box>
            <IconButton
              onClick={handleOpen}
              color="inherit"
            >
              <LanguageIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
              <MenuItem onClick={() => changeLanguage("mm")}>မြန်မာ</MenuItem>
              </Menu>
          </Box>
          <IconButton
            sx={{ ml: 1 }}
            onClick={() => {
              mode === "dark" ? setMode("light") : setMode("dark");
            }}
            color="inherit"
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </>
  );
}

export default Header;