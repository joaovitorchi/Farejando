// src/layouts/ProductSearch/ProductSearch.tsx
import { useState, ChangeEvent, useEffect } from "react";
import { useLocation } from "react-router-dom"; // para pegar query params

// Material Dashboard Pro components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// MUI
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// Icones
import SearchIcon from "@mui/icons-material/Search";

// Tipo de produto
type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  store: string;
  image: string;
};

// Hook para ler query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductSearch() {
  const queryParams = useQuery();
  const initialStoreFilter = queryParams.get("store") || "";

  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  // filtros
  const [categories, setCategories] = useState<string[]>([]);
  const [stores, setStores] = useState<string[]>(initialStoreFilter ? [initialStoreFilter] : []);
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");

  // mock de produtos
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Relógio Smartwatch",
      price: 120,
      category: "Eletrônicos",
      store: "AliExpress",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Fone Bluetooth",
      price: 80,
      category: "Eletrônicos",
      store: "Shopee",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 3,
      name: "Tênis Esportivo",
      price: 250,
      category: "Moda",
      store: "Amazon",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 4,
      name: "Cafeteira Automática",
      price: 300,
      category: "Casa",
      store: "Shopee",
      image: "https://via.placeholder.com/200",
    },
  ];

  // Função para alternar filtros (categoria/loja)
  const toggleFilter = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setList((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const applyFilters = (): Product[] => {
    return allProducts.filter((p) => {
      const matchQuery = query === "" || p.name.toLowerCase().includes(query.toLowerCase());
      const matchCategory = categories.length === 0 || categories.includes(p.category);
      const matchStore = stores.length === 0 || stores.includes(p.store);
      const matchPrice =
        (!priceMin || p.price >= parseFloat(priceMin)) &&
        (!priceMax || p.price <= parseFloat(priceMax));

      return matchQuery && matchCategory && matchStore && matchPrice;
    });
  };

  const filteredProducts = applyFilters();

  // Atualiza stores se a query string mudar
  useEffect(() => {
    if (initialStoreFilter) {
      setStores([initialStoreFilter]);
    }
  }, [initialStoreFilter]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* Barra de pesquisa */}
        <MDBox mb={3} display="flex" alignItems="center" gap={2}>
          <MDInput
            fullWidth
            label="Pesquisar produtos (Shopee, AliExpress, etc...)"
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
          <MDButton variant="gradient" color="primary">
            <SearchIcon />
          </MDButton>
        </MDBox>

        <Grid container spacing={3}>
          {/* Sidebar de filtros */}
          <Grid item xs={12} md={3}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h6">Filtros</MDTypography>

                {/* Categoria */}
                <MDBox mt={2}>
                  <MDTypography variant="button">Categoria</MDTypography>
                  <FormGroup>
                    {["Eletrônicos", "Moda", "Casa"].map((cat) => (
                      <FormControlLabel
                        key={cat}
                        control={
                          <Checkbox
                            checked={categories.includes(cat)}
                            onChange={() => toggleFilter(categories, setCategories, cat)}
                          />
                        }
                        label={cat}
                      />
                    ))}
                  </FormGroup>
                </MDBox>

                {/* Lojas */}
                <MDBox mt={2}>
                  <MDTypography variant="button">Lojas</MDTypography>
                  <FormGroup>
                    {["AliExpress", "Shopee", "Amazon"].map((st) => (
                      <FormControlLabel
                        key={st}
                        control={
                          <Checkbox
                            checked={stores.includes(st)}
                            onChange={() => toggleFilter(stores, setStores, st)}
                          />
                        }
                        label={st}
                      />
                    ))}
                  </FormGroup>
                </MDBox>

                {/* Preço */}
                <MDBox mt={2}>
                  <MDTypography variant="button">Preço</MDTypography>
                  <MDInput
                    type="number"
                    label="Mínimo"
                    fullWidth
                    margin="dense"
                    value={priceMin}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPriceMin(e.target.value)}
                  />
                  <MDInput
                    type="number"
                    label="Máximo"
                    fullWidth
                    margin="dense"
                    value={priceMax}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPriceMax(e.target.value)}
                  />
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {/* Resultados */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.image}
                        alt={product.name}
                      />
                      <CardContent>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          R$ {product.price}
                        </Typography>
                        <Typography variant="caption">
                          {product.store} • {product.category}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <MDBox p={3}>
                  <MDTypography variant="body1" color="text">
                    Nenhum produto encontrado
                  </MDTypography>
                </MDBox>
              )}
            </Grid>

            {/* Paginação */}
            <MDBox mt={4} display="flex" justifyContent="center">
              <Pagination
                count={5}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ProductSearch;
