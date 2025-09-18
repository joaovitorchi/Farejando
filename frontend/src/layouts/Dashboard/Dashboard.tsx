import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Dados fictícios
const partnerStores = [
  {
    name: "Shopee",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg",
    alt: "Shopee",
  },
  {
    name: "AliExpress",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Aliexpress_logo.svg",
    alt: "AliExpress",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    alt: "Amazon",
  },
];

const latestPromos = [
  { id: 1, title: "Cupom R$50 Shopee", store: "Shopee" },
  { id: 2, title: "Desconto 20% AliExpress", store: "AliExpress" },
];

const shopeePromos = [
  { id: 1, title: "Frete Grátis acima de R$29" },
  { id: 2, title: "Cupom R$10 em Moda" },
];

const aliexpressPromos = [
  { id: 1, title: "Cupons até US$5" },
  { id: 2, title: "Desconto em Eletrônicos" },
];

export function Dashboard() {
  const navigate = useNavigate();

  const handleStoreClick = (storeName: string) => {
    navigate(`/Produtos?store=${encodeURIComponent(storeName)}`);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {/* Grupos Telegram/WhatsApp */}
      <MDBox mb={4}>
        <MDTypography variant="h5" fontWeight="medium" mb={3} textAlign="center" color="white">
          Participe dos nossos grupos de ofertas 👇🏻
        </MDTypography>
        <MDBox display="flex" justifyContent="center" gap={2} flexWrap="wrap">
          {/* Telegram */}
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 180,
              cursor: "pointer",
              "&:hover": { boxShadow: 8 },
              p: 3,
              textAlign: "center",
              minWidth: 200,
              bgcolor: "#ffb48a",
            }}
            onClick={() => window.open("https://farejando.promo/grupo", "_blank")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
              alt="Telegram"
              style={{ width: "80px", marginBottom: "12px" }}
            />
            <MDTypography variant="h5" fontWeight="medium" color="white">
              Telegram
            </MDTypography>
          </Card>

          {/* WhatsApp */}
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 180,
              cursor: "pointer",
              "&:hover": { boxShadow: 8 },
              p: 3,
              textAlign: "center",
              minWidth: 200,
              bgcolor: "#ffb48a",
            }}
            onClick={() => window.open("https://farejando.promo/grupo", "_blank")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              style={{ width: "80px", marginBottom: "12px" }}
            />
            <MDTypography variant="h5" fontWeight="medium" color="white">
              WhatsApp
            </MDTypography>
          </Card>
        </MDBox>
      </MDBox>

      {/* Lojas Parceiras */}
      <MDBox mb={4}>
        <MDTypography variant="h5" fontWeight="medium" mb={2} textAlign="center" color="white">
          Lojas Parceiras
        </MDTypography>
        <Grid container spacing={3} justifyContent="center">
          {partnerStores.map((store) => (
            <Grid item xs={12} sm={6} md={4} key={store.name}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 2,
                  cursor: "pointer",
                  "&:hover": { boxShadow: 6 },
                  bgcolor: "#ffb48a",
                }}
                onClick={() => handleStoreClick(store.name)}
              >
                <img
                  src={store.logo}
                  alt={store.alt}
                  style={{
                    width: "160px",
                    marginBottom: "8px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                {/* <MDTypography variant="button">{store.name}</MDTypography> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      </MDBox>

      {/* Últimas promoções */}
      <MDBox mb={4}>
        <MDTypography variant="h5" fontWeight="medium" mb={2} color="white">
          Últimas Promoções
        </MDTypography>
        <Grid container spacing={3}>
          {latestPromos.map((promo) => (
            <Grid item xs={12} sm={6} md={4} key={promo.id}>
              <Card sx={{ bgcolor: "#ffb48a" }}>
                <CardContent>
                  <Typography variant="h6">{promo.title}</Typography>
                  <MDTypography variant="button" color="info">
                    {promo.store}
                  </MDTypography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MDBox>

      {/* Promoções Shopee */}
      <MDBox mb={4}>
        <MDTypography variant="h5" fontWeight="medium" mb={2} color="white">
          Promoções Shopee
        </MDTypography>
        <Grid container spacing={3}>
          {shopeePromos.map((promo) => (
            <Grid item xs={12} sm={6} md={4} key={promo.id}>
              <Card sx={{ bgcolor: "#ffb48a" }}>
                <CardContent>
                  <Typography variant="h6">{promo.title}</Typography>
                  <MDButton variant="gradient" color="warning" size="small">
                    Ver mais
                  </MDButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MDBox>

      {/* Promoções AliExpress */}
      <MDBox mb={4}>
        <MDTypography variant="h5" fontWeight="medium" mb={2} color="white">
          Promoções AliExpress
        </MDTypography>
        <Grid container spacing={3}>
          {aliexpressPromos.map((promo) => (
            <Grid item xs={12} sm={6} md={4} key={promo.id}>
              <Card sx={{ bgcolor: "#ffb48a" }}>
                <CardContent>
                  <Typography variant="h6">{promo.title}</Typography>
                  <MDButton variant="gradient" color="error" size="small">
                    Ver mais
                  </MDButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
