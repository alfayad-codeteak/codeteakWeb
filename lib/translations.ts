export type Language = "en" | "ar";

export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      product: "Products",
      services: "Services",
      solution: "Solution",
      pricing: "Pricing",
      about: "About",
      contact: "Contact",
      blog: "Blog",
    },
    // Product dropdown
    product: {
      yaadro: {
        title: "Yaadro",
        description: "Delivery and online ordering",
      },
      lens: {
        title: "Lens",
        description: "Simple staff attendance",
      },
      learnMore: "Learn more",
    },
    // Hero section
    hero: {
      badge: "Generate any solution",
      headline: "Transform Your Ideas Into",
      headlineHighlight: "Digital Excellence",
      description: "We craft innovative software solutions that drive your business forward. From web and mobile apps to AI integration, we turn your vision into reality with cutting-edge technology.",
      cta: "Start Your Project",
      stats: {
        projects: "100+",
        projectsLabel: "Projects Delivered",
        clients: "50+",
        clientsLabel: "Active Clients",
        satisfaction: "95%",
        satisfactionLabel: "Client Satisfaction",
        partners: "25+",
        partnersLabel: "Partners",
      },
      circle1: "Easily get a new job",
      circle2: "Competently present experience in a resume",
      circle3: "Determine a career track for several years ahead",
    },
    // Partners section
    partners: {
      title: "Partnering with top industry experts",
    },
    // Services section
    services: {
      title: "Our Services",
      subtitle: "Comprehensive solutions to meet all your software development needs",
      // Cyber Security Services
      cyberSecurity: {
        title: "Cyber Security",
        tagline: "Protecting your digital assets with advanced security solutions and AI-powered threat detection",
        threatDetection: {
          title: "Threat Detection & Prevention",
          description: "AI-powered systems that identify and neutralize cyber threats in real-time, protecting your infrastructure from attacks before they cause damage.",
        },
        fraudPrevention: {
          title: "Fraud Prevention & Detection",
          description: "Advanced fraud detection systems that analyze patterns and behaviors to prevent financial fraud, identity theft, and unauthorized access.",
        },
        securityAudit: {
          title: "Security Audit & Compliance",
          description: "Comprehensive security assessments and compliance checks to ensure your systems meet industry standards and regulatory requirements.",
        },
        networkSecurity: {
          title: "Network Security",
          description: "Robust network security solutions including firewall management, intrusion detection, and secure network architecture design.",
        },
        dataProtection: {
          title: "Data Protection & Encryption",
          description: "End-to-end encryption and data protection services to safeguard sensitive information and ensure secure data storage and transmission.",
        },
        incidentResponse: {
          title: "Incident Response & Recovery",
          description: "Rapid response services to mitigate security breaches, investigate incidents, and restore systems to secure operational states.",
        },
      },
      // Product Engineering Services
      productEngineering: {
        title: "Product Engineering",
        tagline: "Building scalable and innovative products from concept to market",
        backendDevelopment: {
          title: "Backend Development",
          description: "Robust server-side architecture and APIs that power your applications with scalability and reliability.",
        },
        frontendDevelopment: {
          title: "Frontend Development",
          description: "Creating intuitive, responsive user interfaces that deliver exceptional user experiences across all devices.",
        },
        cloudInfrastructure: {
          title: "Cloud Infrastructure",
          description: "Designing and deploying scalable cloud solutions that adapt to your growing business needs.",
        },
        devOps: {
          title: "DevOps & CI/CD",
          description: "Automating workflows and deployment pipelines for faster, more reliable software delivery.",
        },
        microservices: {
          title: "Microservices Architecture",
          description: "Building modular, independent services that work together to create flexible and maintainable systems.",
        },
        apiDevelopment: {
          title: "API Development",
          description: "Creating secure, well-documented APIs that enable seamless integration and communication between systems.",
        },
      },
      // Product Design Services
      productDesign: {
        title: "Product Design",
        tagline: "Crafting beautiful, intuitive experiences that users love",
        uiDesign: {
          title: "UI Design",
          description: "Creating visually stunning and cohesive interfaces that align with your brand and engage users.",
        },
        uxDesign: {
          title: "UX Design",
          description: "Designing user-centered experiences that are intuitive, accessible, and solve real user problems.",
        },
        prototyping: {
          title: "Prototyping",
          description: "Building interactive prototypes to test concepts and validate ideas before development begins.",
        },
        designSystems: {
          title: "Design Systems",
          description: "Establishing comprehensive design systems that ensure consistency and accelerate development across teams.",
        },
        userResearch: {
          title: "User Research",
          description: "Understanding user needs and behaviors through research to inform data-driven design decisions.",
        },
        accessibility: {
          title: "Accessibility Design",
          description: "Ensuring products are usable by everyone, including users with disabilities, following WCAG guidelines.",
        },
      },
      // Legacy services (for backward compatibility)
      webDevelopment: {
        title: "Web Development",
        description: "Build modern, responsive, and scalable web applications using the latest technologies and frameworks.",
      },
      mobileAppDevelopment: {
        title: "Mobile App Development",
        description: "Create native and cross-platform mobile applications for iOS and Android with exceptional user experiences.",
      },
      softwareDevelopment: {
        title: "Software Development",
        description: "Custom software solutions tailored to your business needs, from concept to deployment.",
      },
      aiIntegration: {
        title: "AI Integration Systems",
        description: "Integrate artificial intelligence and machine learning capabilities into your existing systems and workflows.",
      },
      securityProtection: {
        title: "Security & Protection Systems",
        description: "Enterprise-grade security solutions to protect your data, applications, and infrastructure from threats.",
      },
      ourProducts: {
        title: "Our Own Products",
        description: "Innovative products like Yaadro designed to solve real-world business challenges.",
      },
    },
    // Features section
    features: {
      title: "Why Choose CodeTeak?",
      description: "We combine technical expertise with business acumen to deliver solutions that not only work flawlessly but also drive real business value.",
      items: [
        "Modern tech stack",
        "Agile methodology",
        "24/7 support",
        "Scalable architecture",
        "Code quality assurance",
        "Fast delivery",
      ],
      stats: {
        projects: "100+",
        projectsLabel: "Projects Delivered",
      },
    },
    // About section
    about: {
      title: "ABOUT",
      titleHighlight: "US",
      description1: "At CodeTeak, we are passionate about creating exceptional software solutions that solve real-world problems. Our team of experienced developers, designers, and consultants work together to bring your vision to life.",
      description2: "With years of experience in the industry, we've helped startups and enterprises alike build scalable, secure, and high-performance applications that stand the test of time.",
    },
    // FAQ section
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about our services",
      items: [
        {
          question: "What services does CodeTeak offer?",
          answer: "CodeTeak offers comprehensive software development services including custom development, performance optimization, security & compliance, and team augmentation. We build scalable, secure, and high-performance applications tailored to your business needs.",
        },
        {
          question: "How long does a typical project take?",
          answer: "Project timelines vary based on complexity and scope. Simple applications can be completed in weeks, while enterprise solutions may take several months. We work closely with you to establish realistic timelines and deliver on schedule.",
        },
        {
          question: "What technologies do you work with?",
          answer: "We work with modern tech stacks including React, Next.js, Node.js, Python, and cloud platforms like AWS and Azure. Our team stays current with the latest technologies to deliver cutting-edge solutions.",
        },
        {
          question: "Do you provide ongoing support?",
          answer: "Yes, we offer 24/7 support and maintenance services. We provide ongoing support, updates, and enhancements to ensure your applications continue to perform optimally after launch.",
        },
        {
          question: "Can you work with our existing team?",
          answer: "Absolutely! Our team augmentation services allow us to seamlessly integrate with your existing development team. We can provide additional expertise and resources to accelerate your projects.",
        },
        {
          question: "How do you ensure code quality?",
          answer: "We follow industry best practices including code reviews, automated testing, continuous integration, and quality assurance processes. Our team is committed to delivering clean, maintainable, and well-documented code.",
        },
      ],
    },
    // Contact section
    contact: {
      title: "CONTACT",
      titleHighlight: "US",
      email: "Email",
      phone: "Phone",
      address: "Address",
      form: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        message: "Message",
        submit: "Send Message",
        agreeToTerms: "By submitting you agree to our",
        and: "and",
      },
    },
    // Blog (coming soon)
    blog: {
      comingSoon: "Coming Soon",
      comingSoonPrefix: "Coming ",
      comingSoonHighlight: "Soon",
      subtitle: "We're working on something great. Check back later for articles, insights, and updates.",
    },
    // Footer
    footer: {
      brand: {
        title: "CodeTeak",
        description: "CodeTeak is a software company. Our product Yaadro is a delivery management system and online store for shops. We also build custom software for businesses.",
        products: "Our products",
        yaadroDms: "Yaadro Delivery Management",
        yaadroEcommerce: "Yaadro Ecommerce",
        lens: "Lens Attendance",
      },
      explore: {
        title: "Explore",
        home: "Home",
        about: "About",
        services: "Services",
        products: "Products",
        contact: "Contact",
      },
      follow: {
        title: "Follow Us",
      },
      call: "Call CodeTeak",
      courses: "Courses & Tools",
      codeteak: "Codeteak",
      copyright: "© 2024 CodeTeak. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms and Conditions",
      location: "Location",
      time: "Time",
      weather: "Weather",
    },
    // Products page
    products: {
      title: "Our Products",
      subtitle: "Discover our innovative solutions designed to transform your business",
      backToHome: "Back to Home",
      welcome: {
        eyebrow: "Yaadro Platform",
        welcomeTo: "Welcome to",
        brand: "Yaadro",
        description:
          "Help shops deliver orders and sell online. Built for shops, delivery partners, and customers.",
      },
      aboutYaadro: {
        eyebrow: "About Us",
        title: "About Yaadro",
        paragraph1:
          "Yaadro helps shops send home delivery orders. It connects the shop, the delivery person, and the customer in one simple place.",
        paragraph2:
          "You can track orders live, use apps for shops and delivery partners, and let customers order online and pay when the order arrives.",
      },
      yaadro: {
        name: "Yaadro",
        description:
          "Manage home delivery for your shop. Track orders, assign delivery partners, and keep customers updated. Also includes online ordering with pay on delivery.",
        features: [
          "See where every order is",
          "Apps for shops and delivery partners",
          "Simple dashboard for managers",
          "Online orders with pay on delivery",
          "Clear updates for everyone",
        ],
      },
      lens: {
        name: "Lens",
        description:
          "Easy attendance for any business. Staff check in by looking at the camera. No cards or fingerprints.",
        features: [
          "Check in with a quick camera look",
          "Works even without internet",
          "One place or many locations",
          "Clear reports for managers",
          "Private and safe staff records",
          "Grows with your team",
        ],
      },
      viewDetails: "View Details",
    },
    // Product detail page
    productDetail: {
      backToProducts: "Back to Products",
      notFound: "Product Not Found",
      yaadro: {
        headline: "Deliver faster. Stay connected.",
        description:
          "Yaadro helps shops manage home delivery from start to finish. Shops, delivery partners, and customers stay connected with simple apps and a clear dashboard.",
        smartFeatures: {
          title: "What you get",
          supermarketApp: {
            title: "Shop App",
            description: "Manage orders and deliveries from your phone anytime.",
          },
          deliveryPartnerApp: {
            title: "Delivery Partner App",
            description: "Get orders, follow the route, and update delivery status.",
          },
          webDashboard: {
            title: "Web Dashboard",
            description: "See all orders and operations in one simple screen.",
          },
          realTimeTracking: {
            title: "Live Tracking",
            description: "Follow deliveries as they happen and get instant updates.",
          },
          smartCommunication: {
            title: "Easy Messaging",
            description: "Chat between the shop, delivery partner, and customer.",
          },
          orderManagement: {
            title: "Order Control",
            description: "Create, assign, and finish deliveries without confusion.",
          },
        },
        partners: {
          title: "Trusted by shops",
        },
        integration: {
          title: "Works with",
          subtitle: "Yaadro connects with Task billing so delivery orders move smoothly",
          description:
            "Shops create home delivery orders in Task. Those orders go straight into Yaadro, where you can assign a delivery partner and track the order until it arrives.",
        },
        process: {
          title: "How it works",
          subtitle: "Three simple steps",
          steps: {
            createOrder: {
              title: "Create the order",
              description: "Make a home delivery order in your shop system. It appears in Yaadro automatically.",
            },
            assignPartner: {
              title: "Assign a delivery partner",
              description: "Yaadro helps send the order to the right available delivery partner.",
            },
            completeOrder: {
              title: "Deliver and finish",
              description: "Track the trip live and mark the order done when it reaches the customer.",
            },
          },
        },
        stats: {
          activeOrders: "Active Orders",
          deliveryStats: "Delivery Stats",
        },
      },
      lens: {
        headline: "Simple attendance for your team",
        description:
          "Lens helps any business mark attendance quickly. No cards. No fingerprints. Just a camera look.",
        heroDescription:
          "Lens helps any business track attendance just by looking at the camera. It is fast, accurate, and keeps working even when there is no internet.",
        topFeatures: {
          title: "Top features",
          subtitle: "What Lens helps you do every day",
          items: [
            {
              title: "Clock in with a glance",
              description:
                "Staff look at a tablet at the door. No cards, no PINs, no paper registers.",
            },
            {
              title: "See who is at work, live",
              description:
                "Know who is in, late, or absent as it happens, not at the end of the day.",
            },
            {
              title: "Pay and advances in one place",
              description:
                "Track salaries, bonuses, and salary advances with a clear history of every change.",
            },
            {
              title: "Reports in one click",
              description:
                "Download attendance and payment sheets for HR, finance, or audits whenever you need them.",
            },
          ],
        },
        mainTask: {
          title: "01/ THE PROBLEM WE FIXED",
          description:
            "Paper lists and fingerprint machines slow people down. With Lens, staff walk in, the camera knows them, and attendance is marked. No cards to lose and no long queues.",
        },
        features: {
          faceRecognition: {
            title: "QUICK FACE CHECK IN",
            description:
              "Staff are recognized as they enter. Attendance is marked in seconds, even on busy days.",
          },
          offlineFirst: {
            title: "WORKS WITHOUT INTERNET",
            description:
              "If the internet goes down, Lens still records attendance. When it comes back, records sync automatically.",
          },
          multiTenant: {
            title: "ONE OR MANY LOCATIONS",
            description:
              "Manage one place or many from the same system. Each location stays private and separate.",
          },
        },
        faq: {
          tag: "Common questions",
          title: "Simple",
          titleHighlight: "answers",
          description: "Clear answers for owners and managers. Easy words only.",
          items: [
            {
              question: "What is Lens?",
              answer:
                "Lens is an attendance system for any business. Staff check in by looking at the camera. No cards, PINs, or fingerprint machines.",
            },
            {
              question: "How does Lens work?",
              answer:
                "When someone arrives, the camera recognizes them and marks attendance. Managers can see who is present anytime.",
            },
            {
              question: "Is Lens safe?",
              answer:
                "Yes. Only the right people can see staff and attendance data. Each location stays private.",
            },
            {
              question: "Can it work without internet?",
              answer:
                "Yes. Lens keeps marking attendance offline. When the internet returns, everything syncs.",
            },
            {
              question: "How accurate is it?",
              answer:
                "Lens is very accurate at recognizing the right person, and it gets better with everyday use.",
            },
          ],
        },
      },
    },
    // Common
    common: {
      top: "Top",
      india: "India",
      english: "English",
      uae: "UAE",
      arabic: "Arabic",
    },
  },
  ar: {
    // Navigation
    nav: {
      home: "الرئيسية",
      product: "المنتجات",
      services: "الخدمات",
      solution: "الحلول",
      pricing: "الأسعار",
      about: "من نحن",
      contact: "اتصل بنا",
      blog: "المدونة",
    },
    // Product dropdown
    product: {
      yaadro: {
        title: "يادرو",
        description: "التوصيل والطلب أونلاين",
      },
      lens: {
        title: "لينز",
        description: "حضور الموظفين بسهولة",
      },
      learnMore: "اعرف المزيد",
    },
    // Hero section
    hero: {
      badge: "إنشاء أي حل",
      headline: "حوّل أفكارك إلى",
      headlineHighlight: "تميز رقمي",
      description: "نحن نصمم حلولاً برمجية مبتكرة تقود عملك إلى الأمام. من تطبيقات الويب والجوال إلى تكامل الذكاء الاصطناعي، نحول رؤيتك إلى واقع بتكنولوجيا متطورة.",
      cta: "ابدأ مشروعك",
      stats: {
        projects: "100+",
        projectsLabel: "مشروع تم تسليمه",
        clients: "50+",
        clientsLabel: "عميل نشط",
        satisfaction: "95%",
        satisfactionLabel: "رضا العملاء",
        partners: "25+",
        partnersLabel: "شريك",
      },
      circle1: "الحصول على وظيفة جديدة بسهولة",
      circle2: "تقديم الخبرة في السيرة الذاتية بشكل صحيح",
      circle3: "تحديد المسار الوظيفي لعدة سنوات قادمة",
    },
    // Partners section
    partners: {
      title: "شراكة مع كبار خبراء الصناعة",
    },
    // Services section
    services: {
      title: "خدماتنا",
      subtitle: "حلول شاملة لتلبية جميع احتياجات تطوير البرمجيات الخاصة بك",
      // Cyber Security Services
      cyberSecurity: {
        title: "الأمن السيبراني",
        tagline: "حماية أصولك الرقمية بحلول أمنية متقدمة وكشف التهديدات المدعومة بالذكاء الاصطناعي",
        threatDetection: {
          title: "كشف التهديدات والوقاية",
          description: "أنظمة مدعومة بالذكاء الاصطناعي تكتشف التهديدات السيبرانية وتحييدها في الوقت الفعلي، لحماية بنيتك التحتية من الهجمات قبل أن تسبب ضررًا.",
        },
        fraudPrevention: {
          title: "منع وكشف الاحتيال",
          description: "أنظمة متقدمة لكشف الاحتيال تحلل الأنماط والسلوكيات لمنع الاحتيال المالي وسرقة الهوية والوصول غير المصرح به.",
        },
        securityAudit: {
          title: "تدقيق الأمن والامتثال",
          description: "تقييمات أمنية شاملة وفحوصات الامتثال لضمان أن أنظمتك تلبي المعايير الصناعية والمتطلبات التنظيمية.",
        },
        networkSecurity: {
          title: "أمان الشبكة",
          description: "حلول أمنية قوية للشبكة تشمل إدارة جدار الحماية وكشف التسلل وتصميم هندسة شبكة آمنة.",
        },
        dataProtection: {
          title: "حماية البيانات والتشفير",
          description: "خدمات التشفير من طرف إلى طرف وحماية البيانات لحماية المعلومات الحساسة وضمان تخزين ونقل البيانات الآمن.",
        },
        incidentResponse: {
          title: "الاستجابة للحوادث والتعافي",
          description: "خدمات استجابة سريعة للتخفيف من خروقات الأمن والتحقيق في الحوادث واستعادة الأنظمة إلى حالات تشغيل آمنة.",
        },
      },
      // Product Engineering Services
      productEngineering: {
        title: "هندسة المنتجات",
        tagline: "بناء منتجات قابلة للتوسع ومبتكرة من المفهوم إلى السوق",
        backendDevelopment: {
          title: "تطوير الواجهة الخلفية",
          description: "هندسة معمارية قوية للخادم وواجهات برمجة التطبيقات التي تعمل على تشغيل تطبيقاتك مع قابلية التوسع والموثوقية.",
        },
        frontendDevelopment: {
          title: "تطوير الواجهة الأمامية",
          description: "إنشاء واجهات مستخدم بديهية ومتجاوبة توفر تجارب مستخدم استثنائية عبر جميع الأجهزة.",
        },
        cloudInfrastructure: {
          title: "البنية التحتية السحابية",
          description: "تصميم ونشر حلول سحابية قابلة للتوسع تتكيف مع احتياجات عملك المتنامية.",
        },
        devOps: {
          title: "DevOps و CI/CD",
          description: "أتمتة سير العمل وخطوط النشر لتسليم برمجيات أسرع وأكثر موثوقية.",
        },
        microservices: {
          title: "هندسة الخدمات المصغرة",
          description: "بناء خدمات معيارية ومستقلة تعمل معًا لإنشاء أنظمة مرنة وقابلة للصيانة.",
        },
        apiDevelopment: {
          title: "تطوير واجهات برمجة التطبيقات",
          description: "إنشاء واجهات برمجة تطبيقات آمنة وموثقة جيدًا تمكن من التكامل والتواصل السلس بين الأنظمة.",
        },
      },
      // Product Design Services
      productDesign: {
        title: "تصميم المنتجات",
        tagline: "صياغة تجارب جميلة وبديهية يحبها المستخدمون",
        uiDesign: {
          title: "تصميم واجهة المستخدم",
          description: "إنشاء واجهات مذهلة بصريًا ومتماسكة تتوافق مع علامتك التجارية وتجذب المستخدمين.",
        },
        uxDesign: {
          title: "تصميم تجربة المستخدم",
          description: "تصميم تجارب مركزة على المستخدم تكون بديهية ويمكن الوصول إليها وتحل مشاكل المستخدم الحقيقية.",
        },
        prototyping: {
          title: "إنشاء النماذج الأولية",
          description: "بناء نماذج أولية تفاعلية لاختبار المفاهيم والتحقق من الأفكار قبل بدء التطوير.",
        },
        designSystems: {
          title: "أنظمة التصميم",
          description: "إنشاء أنظمة تصميم شاملة تضمن الاتساق وتسريع التطوير عبر الفرق.",
        },
        userResearch: {
          title: "بحث المستخدم",
          description: "فهم احتياجات وسلوكيات المستخدم من خلال البحث لإعلام قرارات التصميم القائمة على البيانات.",
        },
        accessibility: {
          title: "تصميم إمكانية الوصول",
          description: "ضمان أن المنتجات قابلة للاستخدام من قبل الجميع، بما في ذلك المستخدمون ذوو الإعاقات، باتباع إرشادات WCAG.",
        },
      },
      // Legacy services (for backward compatibility)
      webDevelopment: {
        title: "تطوير الويب",
        description: "بناء تطبيقات ويب حديثة ومتجاوبة وقابلة للتوسع باستخدام أحدث التقنيات والأطر.",
      },
      mobileAppDevelopment: {
        title: "تطوير تطبيقات الهاتف المحمول",
        description: "إنشاء تطبيقات محمولة أصلية ومتعددة المنصات لـ iOS و Android مع تجارب مستخدم استثنائية.",
      },
      softwareDevelopment: {
        title: "تطوير البرمجيات",
        description: "حلول برمجية مخصصة مصممة لاحتياجات عملك، من المفهوم إلى النشر.",
      },
      aiIntegration: {
        title: "أنظمة تكامل الذكاء الاصطناعي",
        description: "دمج قدرات الذكاء الاصطناعي والتعلم الآلي في أنظمتك وسير العمل الحالية.",
      },
      securityProtection: {
        title: "أنظمة الأمان والحماية",
        description: "حلول أمنية على مستوى المؤسسات لحماية بياناتك وتطبيقاتك والبنية التحتية من التهديدات.",
      },
      ourProducts: {
        title: "منتجاتنا الخاصة",
        description: "منتجات مبتكرة مثل يادرو مصممة لحل تحديات الأعمال الواقعية.",
      },
    },
    // Features section
    features: {
      title: "لماذا تختار كودتيك؟",
      description: "نجمع بين الخبرة التقنية والفطنة التجارية لتقديم حلول لا تعمل بشكل لا تشوبه شائبة فحسب، بل تدفع أيضًا قيمة تجارية حقيقية.",
      items: [
        "تقنية حديثة",
        "منهجية رشيقة",
        "دعم على مدار الساعة",
        "هندسة معمارية قابلة للتوسع",
        "ضمان جودة الكود",
        "تسليم سريع",
      ],
      stats: {
        projects: "100+",
        projectsLabel: "مشروع تم تسليمه",
      },
    },
    // About section
    about: {
      title: "حول",
      titleHighlight: "نا",
      description1: "في كودتيك، نحن شغوفون بإنشاء حلول برمجية استثنائية تحل المشاكل الواقعية. يعمل فريقنا من المطورين والمصممين والمستشارين ذوي الخبرة معًا لتحقيق رؤيتك.",
      description2: "مع سنوات من الخبرة في الصناعة، ساعدنا الشركات الناشئة والشركات على حد سواء في بناء تطبيقات قابلة للتوسع وآمنة وعالية الأداء تثبت على مر الزمن.",
    },
    // FAQ section
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "كل ما تحتاج لمعرفته حول خدماتنا",
      items: [
        {
          question: "ما هي الخدمات التي تقدمها كودتيك؟",
          answer: "تقدم كودتيك خدمات تطوير برمجيات شاملة تشمل التطوير المخصص، وتحسين الأداء، والأمان والامتثال، وتعزيز الفريق. نبني تطبيقات قابلة للتوسع وآمنة وعالية الأداء مصممة خصيصًا لاحتياجات عملك.",
        },
        {
          question: "كم يستغرق المشروع النموذجي؟",
          answer: "تختلف الجداول الزمنية للمشروع بناءً على التعقيد والنطاق. يمكن إكمال التطبيقات البسيطة في أسابيع، بينما قد تستغرق حلول المؤسسات عدة أشهر. نعمل عن كثب معك لإنشاء جداول زمنية واقعية والتسليم في الوقت المحدد.",
        },
        {
          question: "ما هي التقنيات التي تعملون بها؟",
          answer: "نعمل مع تقنيات حديثة تشمل React و Next.js و Node.js و Python ومنصات السحابة مثل AWS و Azure. يظل فريقنا محدثًا بأحدث التقنيات لتقديم حلول متطورة.",
        },
        {
          question: "هل تقدمون دعمًا مستمرًا؟",
          answer: "نعم، نقدم خدمات الدعم والصيانة على مدار الساعة. نقدم دعمًا مستمرًا وتحديثات وتحسينات لضمان استمرار أداء تطبيقاتك بشكل مثالي بعد الإطلاق.",
        },
        {
          question: "هل يمكنكم العمل مع فريقنا الحالي؟",
          answer: "بالتأكيد! تسمح خدمات تعزيز الفريق لدينا بالتكامل بسلاسة مع فريق التطوير الحالي الخاص بك. يمكننا توفير خبرة وموارد إضافية لتسريع مشاريعك.",
        },
        {
          question: "كيف تضمنون جودة الكود؟",
          answer: "نتبع أفضل الممارسات في الصناعة بما في ذلك مراجعات الكود، والاختبار الآلي، والتكامل المستمر، وعمليات ضمان الجودة. ملتزم فريقنا بتسليم كود نظيف وقابل للصيانة وموثق جيدًا.",
        },
      ],
    },
    // Contact section
    contact: {
      title: "اتصل",
      titleHighlight: "بنا",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      address: "العنوان",
      form: {
        firstName: "الاسم الأول",
        lastName: "اسم العائلة",
        email: "البريد الإلكتروني",
        message: "الرسالة",
        submit: "إرسال الرسالة",
        agreeToTerms: "بإرسالك أنت توافق على",
        and: "و",
      },
    },
    // Blog (coming soon)
    blog: {
      comingSoon: "قريباً",
      comingSoonPrefix: "قريب",
      comingSoonHighlight: "اً",
      subtitle: "نحن نعمل على شيء رائع. تفضل بالعودة لاحقاً للمقالات والرؤى والتحديثات.",
    },
    // Footer
    footer: {
      brand: {
        title: "كودتيك",
        description: "كودتيك شركة برمجيات. منتجنا يادرو هو نظام إدارة التوصيل ومتجر إلكتروني للمتاجر. ونبني أيضًا برمجيات مخصصة للشركات.",
        products: "منتجاتنا",
        yaadroDms: "يادرو لإدارة التوصيل",
        yaadroEcommerce: "يادرو للتجارة الإلكترونية",
        lens: "لينز للحضور",
      },
      explore: {
        title: "استكشف",
        home: "الرئيسية",
        about: "من نحن",
        services: "الخدمات",
        products: "المنتجات",
        contact: "اتصل بنا",
      },
      follow: {
        title: "تابعنا",
      },
      call: "اتصل بكودتيك",
      courses: "الدورات والأدوات",
      codeteak: "كودتيك",
      copyright: "© 2024 كودتيك. جميع الحقوق محفوظة.",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      location: "الموقع",
      time: "الوقت",
      weather: "الطقس",
    },
    // Products page
    products: {
      title: "منتجاتنا",
      subtitle: "اكتشف حلولنا المبتكرة المصممة لتحويل عملك",
      backToHome: "العودة إلى الرئيسية",
      welcome: {
        eyebrow: "منصة يادرو",
        welcomeTo: "مرحباً بكم في",
        brand: "يادرو",
        description:
          "ساعد المتاجر على توصيل الطلبات والبيع أونلاين. مصمم للمتاجر وشركاء التوصيل والعملاء.",
      },
      aboutYaadro: {
        eyebrow: "من نحن",
        title: "عن يادرو",
        paragraph1:
          "يساعد يادرو المتاجر على إدارة التوصيل المنزلي. يربط المتجر وموظف التوصيل والعميل في مكان واحد بسيط.",
        paragraph2:
          "يمكنك تتبع الطلبات مباشرة، واستخدام تطبيقات للمتاجر وشركاء التوصيل، والسماح للعملاء بالطلب أونلاين والدفع عند الاستلام.",
      },
      yaadro: {
        name: "يادرو",
        description:
          "أدِر التوصيل المنزلي لمتجرك. تتبع الطلبات وعيّن شركاء التوصيل وأبقِ العملاء على اطلاع. ويشمل أيضاً الطلب أونلاين مع الدفع عند الاستلام.",
        features: [
          "اعرف مكان كل طلب",
          "تطبيقات للمتاجر وشركاء التوصيل",
          "لوحة تحكم بسيطة للمديرين",
          "طلبات أونلاين مع الدفع عند الاستلام",
          "تحديثات واضحة للجميع",
        ],
      },
      lens: {
        name: "لينز",
        description:
          "حضور سهل لأي نوع من الأعمال. يسجّل الموظفون حضورهم بالنظر إلى الكاميرا. بدون بطاقات أو بصمات.",
        features: [
          "تسجيل حضور سريع بالنظر إلى الكاميرا",
          "يعمل حتى بدون إنترنت",
          "موقع واحد أو عدة مواقع",
          "تقارير واضحة للمديرين",
          "سجلات موظفين خاصة وآمنة",
          "ينمو مع فريقك",
        ],
      },
      viewDetails: "عرض التفاصيل",
    },
    // Product detail page
    productDetail: {
      backToProducts: "العودة إلى المنتجات",
      notFound: "المنتج غير موجود",
      yaadro: {
        headline: "توصيل أسرع. اتصال أوضح.",
        description:
          "يساعد يادرو المتاجر على إدارة التوصيل المنزلي من البداية إلى النهاية. المتجر وشريك التوصيل والعميل يبقون متصلين عبر تطبيقات بسيطة ولوحة تحكم واضحة.",
        smartFeatures: {
          title: "ماذا تحصل",
          supermarketApp: {
            title: "تطبيق المتجر",
            description: "أدِر الطلبات والتوصيلات من هاتفك في أي وقت.",
          },
          deliveryPartnerApp: {
            title: "تطبيق شريك التوصيل",
            description: "استقبل الطلبات واتبع الطريق وحدّث حالة التوصيل.",
          },
          webDashboard: {
            title: "لوحة التحكم",
            description: "شاهد كل الطلبات والعمليات في شاشة واحدة بسيطة.",
          },
          realTimeTracking: {
            title: "تتبع مباشر",
            description: "تابع التوصيلات أثناء حدوثها واحصل على تحديثات فورية.",
          },
          smartCommunication: {
            title: "رسائل سهلة",
            description: "تواصل بين المتجر وشريك التوصيل والعميل.",
          },
          orderManagement: {
            title: "إدارة الطلبات",
            description: "أنشئ الطلب وعيّنه وأكمله بدون تعقيد.",
          },
        },
        partners: {
          title: "موثوق به من المتاجر",
        },
        integration: {
          title: "يعمل مع",
          subtitle: "يادرو يتصل مع تاسك للفوترة حتى تتحرك طلبات التوصيل بسهولة",
          description:
            "ينشئ المتجر طلبات التوصيل المنزلي في تاسك. تنتقل هذه الطلبات مباشرة إلى يادرو، حيث يمكنك تعيين شريك توصيل وتتبع الطلب حتى يصل.",
        },
        process: {
          title: "كيف يعمل",
          subtitle: "ثلاث خطوات بسيطة",
          steps: {
            createOrder: {
              title: "أنشئ الطلب",
              description: "أنشئ طلب توصيل منزلي في نظام المتجر. يظهر تلقائياً في يادرو.",
            },
            assignPartner: {
              title: "عيّن شريك التوصيل",
              description: "يساعد يادرو على إرسال الطلب لشريك التوصيل المتاح المناسب.",
            },
            completeOrder: {
              title: "وصّل وأكمل",
              description: "تتبع الرحلة مباشرة وعلّم الطلب مكتملاً عند وصوله للعميل.",
            },
          },
        },
        stats: {
          activeOrders: "الطلبات النشطة",
          deliveryStats: "إحصائيات التوصيل",
        },
      },
      lens: {
        headline: "حضور بسيط لفريقك",
        description:
          "يساعد لينز أي نوع من الأعمال على تسجيل الحضور بسرعة. بدون بطاقات. بدون بصمات. فقط نظرة إلى الكاميرا.",
        heroDescription:
          "يساعد Lens أي نوع من الأعمال على تتبع الحضور بمجرد النظر إلى الكاميرا. سريع ودقيق ويستمر في العمل حتى بدون إنترنت.",
        topFeatures: {
          title: "أهم الميزات",
          subtitle: "ماذا يساعدك لينز على فعله كل يوم",
          items: [
            {
              title: "تسجيل حضور بنظرة",
              description:
                "الموظفون ينظرون إلى جهاز عند الباب. بدون بطاقات، بدون أرقام سرية، بدون سجلات ورقية.",
            },
            {
              title: "اعرف من في العمل مباشرة",
              description:
                "اعرف من حاضر أو متأخر أو غائب أثناء حدوث ذلك، وليس في نهاية اليوم.",
            },
            {
              title: "الرواتب والسلف في مكان واحد",
              description:
                "تابع الرواتب والمكافآت وسلف الراتب مع سجل واضح لكل تغيير.",
            },
            {
              title: "تقارير بنقرة واحدة",
              description:
                "حمّل كشوف الحضور والدفع للموارد البشرية أو المالية أو التدقيق متى احتجت.",
            },
          ],
        },
        mainTask: {
          title: "01/ المشكلة التي حللناها",
          description:
            "القوائم الورقية وأجهزة البصمة تبطئ الناس. مع لينز يدخل الموظف، تتعرف الكاميرا عليه، ويُسجَّل الحضور. لا بطاقات تضيع ولا طوابير طويلة.",
        },
        features: {
          faceRecognition: {
            title: "تسجيل حضور سريع بالوجه",
            description:
              "يُتعرَّف على الموظفين عند الدخول. يُسجَّل الحضور خلال ثوانٍ حتى في الأيام المزدحمة.",
          },
          offlineFirst: {
            title: "يعمل بدون إنترنت",
            description:
              "إذا انقطع الإنترنت يستمر لينز في تسجيل الحضور. وعند عودة الاتصال تتم المزامنة تلقائياً.",
          },
          multiTenant: {
            title: "موقع واحد أو عدة مواقع",
            description:
              "أدِر مكاناً واحداً أو عدة أماكن من نفس النظام. كل موقع يبقى خاصاً ومنفصلاً.",
          },
        },
        faq: {
          tag: "أسئلة شائعة",
          title: "إجابات",
          titleHighlight: "بسيطة",
          description: "إجابات واضحة للملاك والمديرين. كلمات سهلة فقط.",
          items: [
            {
              question: "ما هو Lens؟",
              answer:
                "لينز نظام حضور لأي نوع من الأعمال. يسجّل الموظفون حضورهم بالنظر إلى الكاميرا. بدون بطاقات أو أرقام سرية أو أجهزة بصمة.",
            },
            {
              question: "كيف يعمل Lens؟",
              answer:
                "عند وصول الشخص تتعرف الكاميرا عليه وتسجّل الحضور. ويمكن للمديرين معرفة من الحاضر في أي وقت.",
            },
            {
              question: "هل Lens آمن؟",
              answer:
                "نعم. فقط الأشخاص المصرح لهم يرون بيانات الموظفين والحضور. وكل موقع يبقى خاصاً.",
            },
            {
              question: "هل يعمل بدون إنترنت؟",
              answer:
                "نعم. يستمر لينز في تسجيل الحضور بدون إنترنت. وعند عودة الاتصال تتم المزامنة.",
            },
            {
              question: "ما مدى دقته؟",
              answer:
                "لينز دقيق جداً في التعرف على الشخص الصحيح، ويتحسن مع الاستخدام اليومي.",
            },
          ],
        },
      },
    },
    // Common
    common: {
      top: "أعلى",
      india: "الهند",
      english: "الإنجليزية",
      uae: "الإمارات",
      arabic: "العربية",
    },
  },
};

export function getTranslations(lang: Language) {
  return translations[lang];
}

