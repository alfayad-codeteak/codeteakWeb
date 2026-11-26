import { productSeo } from "@/lib/productSeo";
import { BreadcrumbSchema, ItemListSchema } from "../components/StructuredData";
import ProductsPageClient from "./ProductsPageClient";

export default function ProductsPage() {
  return (
    <>
      <section className="sr-only" aria-label="CodeTeak products">
        <h1>CodeTeak Products</h1>
        <p>
          CodeTeak is a software company. Our flagship product is Yaadro, a
          delivery management system (DMS) and ecommerce platform for shops.
        </p>
        <a href="/products/yaadro">Yaadro — Delivery Management & Ecommerce</a>
      </section>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/products" },
        ]}
      />
      <ItemListSchema
        name="CodeTeak Products"
        items={Object.values(productSeo)
          .filter((product) => !product.noIndex)
          .map((product) => ({
            name: product.name,
            url: `/products/${product.slug}`,
            description: product.description,
          }))}
      />
      <ProductsPageClient />
    </>
  );
}
