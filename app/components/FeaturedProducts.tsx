import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Language } from "@/lib/translations";

const copy = {
  en: {
    eyebrow: "Our products",
    title: "Yaadro: delivery and online selling for shops",
    subtitle:
      "One platform to run home delivery and take online orders. Built for shops, delivery partners, and customers.",
    dms: {
      tag: "Delivery Management System",
      title: "Run every home delivery from one place",
      points: [
        "Track every order live",
        "Assign delivery partners in a tap",
        "Apps for shops and delivery partners",
        "Works with Task billing",
      ],
      cta: "Explore Yaadro delivery",
      imageAlt: "Yaadro delivery management system dashboard and apps",
    },
    ecommerce: {
      tag: "Ecommerce",
      title: "Your own online store. Pay on delivery.",
      points: [
        "Each shop gets its own store link",
        "Own products and prices",
        "Customers order from phone or computer",
        "Orders flow straight into delivery",
      ],
      cta: "Explore Yaadro ecommerce",
      imageAlt: "Yaadro ecommerce online store for shops",
    },
    lens: {
      tag: "Also from CodeTeak",
      title: "Lens: simple camera attendance for any business",
      description: "Staff clock in with a glance. Live attendance, pay tracking, and one-click reports.",
      cta: "Explore Lens",
    },
  },
  ar: {
    eyebrow: "منتجاتنا",
    title: "يادرو: التوصيل والبيع أونلاين للمتاجر",
    subtitle: "منصة واحدة لإدارة التوصيل للمنازل واستقبال الطلبات أونلاين. للمتاجر وشركاء التوصيل والعملاء.",
    dms: {
      tag: "نظام إدارة التوصيل",
      title: "أدر كل طلبات التوصيل من مكان واحد",
      points: [
        "تتبع كل طلب مباشرة",
        "عيّن شريك التوصيل بلمسة",
        "تطبيقات للمتاجر وشركاء التوصيل",
        "يعمل مع نظام الفواتير Task",
      ],
      cta: "اكتشف يادرو للتوصيل",
      imageAlt: "لوحة وتطبيقات نظام يادرو لإدارة التوصيل",
    },
    ecommerce: {
      tag: "التجارة الإلكترونية",
      title: "متجرك الإلكتروني الخاص. الدفع عند الاستلام.",
      points: [
        "رابط متجر خاص لكل محل",
        "منتجات وأسعار خاصة بك",
        "يطلب العملاء من الهاتف أو الكمبيوتر",
        "تنتقل الطلبات مباشرة إلى التوصيل",
      ],
      cta: "اكتشف متجر يادرو",
      imageAlt: "متجر يادرو الإلكتروني للمتاجر",
    },
    lens: {
      tag: "أيضًا من كودتيك",
      title: "لينز: حضور بسيط بالكاميرا لأي نشاط تجاري",
      description: "يسجّل الموظفون الحضور بنظرة. حضور مباشر وتتبع الرواتب وتقارير بنقرة واحدة.",
      cta: "اكتشف لينز",
    },
  },
};

const purpleText = "text-[#6C3CE0] dark:text-[#A78BFA]";

function YaadroCard({
  href,
  image,
  data,
}: {
  href: string;
  image: string;
  data: (typeof copy)["en"]["dms"];
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-[#6C3CE0]/50">
      <Link href={href} className="relative block aspect-[3/2] overflow-hidden bg-muted" tabIndex={-1} aria-hidden="true">
        <Image
          src={image}
          alt={data.imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className={`mb-2 text-xs font-mono uppercase tracking-[0.2em] ${purpleText}`}>{data.tag}</p>
        <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{data.title}</h3>
        <ul className="mb-6 space-y-2">
          {data.points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground md:text-base">
              <Check className={`mt-0.5 h-4 w-4 shrink-0 ${purpleText}`} aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
        <Link
          href={href}
          className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#6C3CE0] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {data.cta}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function FeaturedProducts({ language }: { language: Language }) {
  const t = copy[language] ?? copy.en;

  return (
    <section id="products" className="border-t border-border px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl md:mb-14">
          <p className={`mb-3 text-xs font-mono uppercase tracking-[0.25em] sm:text-sm ${purpleText}`}>{t.eyebrow}</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">{t.title}</h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <YaadroCard href="/products/yaadro" image="/products-image/yaadro.png" data={t.dms} />
          <YaadroCard href="/products/yaadro#ecommerce" image="/products-image/yaadro-ecommerce.png" data={t.ecommerce} />
        </div>

        {/* Lens promo hidden — product is noindex / not being pushed */}
        <div className="hidden" aria-hidden="true">
          <Link
            href="/products/lens"
            className="group mt-5 flex flex-col items-start gap-5 rounded-3xl border border-border bg-card p-5 transition-colors hover:border-[#FC4B01]/50 sm:flex-row sm:items-center md:mt-6 md:p-6"
          >
            <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden rounded-2xl bg-muted sm:w-40">
              <Image src="/products-image/lens.png" alt="" fill sizes="160px" className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="mb-1 text-xs font-mono uppercase tracking-[0.2em] text-brand-text">{t.lens.tag}</p>
              <h3 className="mb-1 text-lg font-bold text-foreground md:text-xl">{t.lens.title}</h3>
              <p className="text-sm text-muted-foreground">{t.lens.description}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-text">
              {t.lens.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
