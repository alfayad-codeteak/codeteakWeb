import type { Metadata } from "next";
import { aboutMetadata } from "@/lib/metadata";
import { BreadcrumbSchema, PersonSchema } from "@/app/components/StructuredData";

export const metadata: Metadata = aboutMetadata;

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />
      <PersonSchema
        name="Alfayad S"
        alternateName="Alfayad Shameer"
        jobTitle="Full Stack Developer & UI/UX Designer"
        description="Kerala-based full-stack developer and UI/UX designer at CodeTeak. Designs digital experiences and builds production web and mobile products. Built the CodeTeak website and works with clients across Bengaluru and Dubai."
        url="https://alfayad.clawdage.com"
        homeLocation={{ addressRegion: "Kerala", addressCountry: "IN" }}
        knowsAbout={[
          "Full stack development",
          "UI/UX design",
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "NestJS",
          "MERN stack",
          "Design systems",
          "Docker",
          "Kubernetes",
          "Web development Kerala",
          "Product engineering Bengaluru",
          "Software development Dubai",
        ]}
        sameAs={[
          "https://alfayad.clawdage.com",
          "https://github.com/Alfayad-s",
          "https://www.linkedin.com/in/alfayad",
          "https://x.com/alfayad_shameer",
        ]}
      />
      {children}
    </>
  );
}

