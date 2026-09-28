import { productSeo } from "@/lib/productSeo";
import { BreadcrumbSchema, ItemListSchema } from "../components/StructuredData";
import ProductsPageClient from "./ProductsPageClient";

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/products" },
        ]}
      />
      <ItemListSchema
        name="CodeTeak Products"
        items={Object.values(productSeo).map((product) => ({
          name: product.name,
          url: `/products/${product.slug}`,
          description: product.description,
        }))}
      />
      <ProductsPageClient />
    </>
  );
}
