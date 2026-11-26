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
    image: product.image,
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
      {slug === "yaadro" && product && (
        <section className="sr-only" aria-label="About Yaadro">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>
            Yaadro is a product by CodeTeak, a software company based in
            Bengaluru, India and Dubai, UAE.
          </p>
          <h2>Key features</h2>
          <ul>
            {product.features.slice(0, 8).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <nav>
            <a href="/">CodeTeak home</a>
            <a href="/products">All products</a>
            <a href="/contact">Contact CodeTeak</a>
          </nav>
        </section>
      )}
      {children}
    </>
  );
}
