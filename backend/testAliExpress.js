const {
  searchAliExpressProducts,
} = require("./src/services/aliExpressService");

async function main() {
  try {
    const items = await searchAliExpressProducts("adidas", 1, 5);
    console.log("\n-- Resultado final --");
    console.log(items);
  } catch (err) {
    console.error("Erro ao buscar:", err);
  }
}

main();
