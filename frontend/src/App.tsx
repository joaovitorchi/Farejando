import { useState, useEffect, useMemo, ReactElement, JSXElementConstructor, Key } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brandWhite from "assets/images/logo.png";
import brandDark from "assets/images/logo.png";


import Dashboard from "layouts/Dashboard";
import ProductSearch from "layouts/ProductSearch/ProductSearch";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignInCover from "layouts/authentication/sign-up/cover";
import ResetCover from "layouts/authentication/reset-password/cover";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;

  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState<any>(null);
  const { pathname } = useLocation();


  useMemo(() => {
    const cacheRtl = createCache({ key: "rtl", stylisPlugins: [rtlPlugin] });
    setRtlCache(cacheRtl);
  }, []);


  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };


  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);


  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);


  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement!.scrollTop = 0;
  }, [pathname]);

  // Botão flutuante de configuração
  // const configsButton = (
  //   <MDBox
  //     display="flex"
  //     justifyContent="center"
  //     alignItems="center"
  //     width="3.25rem"
  //     height="3.25rem"
  //     bgColor="white"
  //     shadow="sm"
  //     borderRadius="50%"
  //     position="fixed"
  //     right="2rem"
  //     bottom="2rem"
  //     zIndex={99}
  //     color="dark"
  //     sx={{ cursor: "pointer" }}
  //     onClick={handleConfiguratorOpen}
  //   >
  //     <Icon fontSize="small" color="inherit">
  //       settings
  //     </Icon>
  //   </MDBox>
  // );


  const renderLayoutComponents = () => (
    <>
      <Sidenav
        color={sidenavColor}
        brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
        brandName="Farejando"
        routes={routes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      <Configurator />
      {/* {configsButton} */}
    </>
  );


  const getRoutes = (allRoutes: any[]): ReactElement[] =>
    allRoutes.flatMap(
      (route: {
        type: string;
        collapse?: any;
        route?: string;
        component?: ReactElement<any, string | JSXElementConstructor<any>>;
        key: Key;
      }) => {
        if (route.collapse) return getRoutes(route.collapse);
        if (route.route && route.type !== "auth" && route.component)
          return <Route path={route.route} element={route.component} key={route.key} />;
        return [];
      }
    );

  const themeToUse =
    direction === "rtl" ? (darkMode ? themeDarkRTL : themeRTL) : darkMode ? themeDark : theme;

  const AppContent = (
    <ThemeProvider theme={themeToUse}>
      <CssBaseline />
      {layout === "dashboard" && renderLayoutComponents()}
      <Routes>
        <Route path="/auth/login" element={<SignInIllustration />} />
        <Route path="/auth/sign-up" element={<SignInCover />} />
        <Route path="/auth/reset" element={<ResetCover />} />
        <Route path="/Produtos" element={<ProductSearch />} />
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>{AppContent}</CacheProvider>
  ) : (
    AppContent
  );
}
