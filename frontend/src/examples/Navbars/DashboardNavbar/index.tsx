import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import TikTokIcon from "@mui/icons-material/MusicNote"; // TikTok custom

import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

import { useMaterialUIController, setTransparentNavbar, setMiniSidenav } from "context";

interface Props {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
  title?: string;
}

function DashboardNavbar({ absolute, light, isMini, title }: Props): JSX.Element {
  const [navbarType, setNavbarType] = useState<
    "fixed" | "absolute" | "relative" | "static" | "sticky"
  >();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller;
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    if (fixedNavbar) setNavbarType("sticky");
    else setNavbarType("static");

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }: {
    palette: any;
    functions: any;
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;
      if (transparentNavbar && !light) colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={navbarContainer}>
        {/* Breadcrumbs + Menu */}
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <IconButton sx={navbarDesktopMenu} onClick={handleMiniSidenav} size="small" disableRipple>
            <Icon fontSize="medium" sx={iconsStyle}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
        </MDBox>

        {!isMini && (
          <MDBox
            sx={(theme) => navbarRow(theme, { isMini })}
            alignItems="center"
            display="flex"
            gap={2}
          >
            {/* Search */}
            <MDBox pr={1}>
              <MDInput
                label="Procurar produtos..."
                size="small"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    const target = e.target as HTMLInputElement;
                    const query = target.value;
                    window.location.href = `/product-search?query=${encodeURIComponent(query)}`;
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </MDBox>

            {/* Botões sociais */}
            <MDBox display="flex" alignItems="center" gap={1}>
              <Tooltip title="Instagram">
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => window.open("https://instagram.com/sua_conta", "_blank")}
                >
                  <InstagramIcon sx={iconsStyle} />
                </IconButton>
              </Tooltip>
              <Tooltip title="YouTube">
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => window.open("https://youtube.com/sua_conta", "_blank")}
                >
                  <YouTubeIcon sx={iconsStyle} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Twitter">
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => window.open("https://twitter.com/sua_conta", "_blank")}
                >
                  <TwitterIcon sx={iconsStyle} />
                </IconButton>
              </Tooltip>
              <Tooltip title="TikTok">
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => window.open("https://tiktok.com/@sua_conta", "_blank")}
                >
                  <TikTokIcon sx={iconsStyle} />
                </IconButton>
              </Tooltip>
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

export default DashboardNavbar;
