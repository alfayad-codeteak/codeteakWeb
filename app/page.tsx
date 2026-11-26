import HomePageClient from "./HomePageClient";

/**
 * Server-rendered entity copy for crawlers (Google, AI agents).
 * Visible UI remains in HomePageClient; this block ships in the initial HTML.
 */
function HomeSeoContent() {
  return (
    <section className="sr-only" aria-label="About CodeTeak">
      <h1>CodeTeak — Software Company</h1>
      <p>
        CodeTeak is a software company based in Bengaluru, India and Dubai, UAE.
        We build custom web and mobile applications, product engineering, product
        design, and cyber security services for businesses.
      </p>
      <h2>Yaadro — Our Product</h2>
      <p>
        Yaadro is CodeTeak&apos;s delivery management system (DMS) and ecommerce
        platform for shops. Track home deliveries, assign delivery partners, and
        take online orders with pay on delivery. Works with Task billing.
      </p>
      <ul>
        <li>Shop App, Delivery Partner App, and Web Dashboard</li>
        <li>Live order tracking and partner assignment</li>
        <li>Online store per shop with pay on delivery</li>
      </ul>
      <nav>
        <a href="/products/yaadro">Yaadro product page</a>
        <a href="/services">Services</a>
        <a href="/about">About CodeTeak</a>
        <a href="/contact">Contact CodeTeak</a>
      </nav>
      <p>
        Contact: info@codeteak.com · Phone: +91 99952 03149 · Website:
        https://www.codeteak.com
      </p>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeSeoContent />
      <HomePageClient />
    </>
  );
}
