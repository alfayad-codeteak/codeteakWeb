import type { Metadata } from "next";
import { generateProductMetadata } from "@/lib/metadata";
import { productSeo } from "@/lib/productSeo";
import { BreadcrumbSchema, FAQSchema, ProductSchema } from "@/app/components/StructuredData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productSeo[slug];

  if (!product) {
    return generateProductMetadata(
      slug,
      "Product",
      "Simple software products from CodeTeak, including Yaadro for shop home delivery."
    );
  }

  return generateProductMetadata(slug, product.title, product.description, product.keywords, {
    noIndex: product.noIndex,
  });
}

export default async function ProductDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productSeo[slug];

  const pushSeo = product && !product.noIndex;

  return (
    <>
      {pushSeo && (
        <>
          <BreadcrumbSchema
            items={[
              { name: "Home", url: "/" },
              { name: "Products", url: "/products" },
              { name: product.name, url: `/products/${product.slug}` },
            ]}
          />
          <ProductSchema
            name={product.name}
            alternateName={product.title}
            description={product.description}
            url={`/products/${product.slug}`}
            image={product.image}
            applicationSubCategory={product.category}
            featureList={product.features}
            audience={product.audience}
          />
          {product.faq.length > 0 && <FAQSchema items={product.faq} />}
        </>
      )}
      {children}
    </>
  );
}
