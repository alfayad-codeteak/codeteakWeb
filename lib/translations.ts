export type Language = "en" | "ar";

export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      product: "Product",
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
        description: "Advanced analytics platform",
      },
      lens: {
        title: "Lens",
        description: "Visual data insights",
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
        description: "Innovative products like Yaadro and Lens designed to solve real-world business challenges.",
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
      },
    },
    // Footer
    footer: {
      brand: {
        title: "CodeTeak",
        description: "We build cutting-edge software solutions that drive your business forward. Expert development, design, and consulting services.",
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
      location: "Location",
      time: "Time",
      weather: "Weather",
    },
    // Products page
    products: {
      title: "Our Products",
      subtitle: "Discover our innovative solutions designed to transform your business",
      backToHome: "Back to Home",
      yaadro: {
        name: "Yaadro",
        description: "Comprehensive delivery management system designed to seamlessly connect supermarkets, delivery partners, and customers. Streamline the entire delivery process from order placement to doorstep delivery.",
        features: [
          "Real-time order tracking and management",
          "Dedicated mobile apps for supermarkets and delivery partners",
          "Comprehensive web dashboard for supermarket management",
          "Seamless communication between all parties",
          "Automated delivery assignment and routing",
          "Real-time notifications and updates",
        ],
      },
      lens: {
        name: "Lens",
        description: "AI-powered face recognition attendance system for retail stores and supermarkets. Provides contactless, automated attendance tracking with offline capabilities and enterprise-grade security.",
        features: [
          "DeepFace ML with 90%+ accuracy in employee identification",
          "Offline-first architecture - works without internet",
          "Multi-tenant SaaS platform with secure data isolation",
          "Real-time analytics dashboards and comprehensive reports",
          "Enterprise-grade security with JWT authentication",
          "Scalable architecture supporting multiple locations",
        ],
      },
      viewDetails: "View Details",
    },
    // Product detail page
    productDetail: {
      backToProducts: "Back to Products",
      notFound: "Product Not Found",
      yaadro: {
        headline: "Deliver Smarter, Connect Effortlessly",
        description: "Yaadro is a comprehensive delivery management system designed to seamlessly connect supermarkets, delivery partners, and customers. With dedicated mobile apps for supermarkets and delivery partners, plus a powerful web dashboard, Yaadro streamlines the entire delivery process from order placement to doorstep delivery.",
        smartFeatures: {
          title: "Smart Features",
          supermarketApp: {
            title: "Supermarket App",
            description: "Manage orders, inventory, and deliveries from your mobile device on the go.",
          },
          deliveryPartnerApp: {
            title: "Delivery Partner App",
            description: "Receive orders, navigate routes, and update delivery status in real-time.",
          },
          webDashboard: {
            title: "Web Dashboard",
            description: "Comprehensive management platform for supermarkets to oversee all operations.",
          },
          realTimeTracking: {
            title: "Real-Time Tracking",
            description: "Track deliveries live with GPS integration and instant status updates.",
          },
          smartCommunication: {
            title: "Smart Communication",
            description: "Seamless messaging between supermarkets, partners, and customers.",
          },
          orderManagement: {
            title: "Order Management",
            description: "Automated order processing, assignment, and delivery scheduling.",
          },
        },
        partners: {
          title: "Trusted by Leading Supermarkets",
        },
        integration: {
          title: "Integrated with",
          subtitle: "Yaadro seamlessly integrates with Task billing software to streamline your delivery workflow",
          description: "Task is the billing software where supermarkets create home delivery orders. When an order is placed, it automatically flows into the Yaadro application, where you can manage and track the order simply and effectively from placement to delivery.",
        },
        process: {
          title: "Learn More About Process",
          subtitle: "Simple steps to manage your delivery operations efficiently",
          steps: {
            createOrder: {
              title: "Create Home Delivery Order",
              description: "Start by creating a home delivery order through your supermarket system. The order automatically syncs to Yaadro for seamless management.",
            },
            assignPartner: {
              title: "Assign to Delivery Partner",
              description: "The system intelligently assigns your order to the best available delivery partner based on location and availability.",
            },
            completeOrder: {
              title: "Complete the Order Easily",
              description: "Track the delivery in real-time and complete the order with ease. Get instant notifications and updates throughout the process.",
            },
          },
        },
        stats: {
          activeOrders: "Active Orders",
          deliveryStats: "Delivery Stats",
        },
      },
      lens: {
        headline: "Visualize Your Data",
        description: "Lens is a cutting-edge visualization platform that makes complex data accessible and understandable.",
        heroDescription: "YaadroLens is an innovative AI-powered face recognition system that enables retail stores and supermarkets to track employee attendance contactlessly with over 90% accuracy, even when offline.",
        mainTask: {
          title: "01/ MAIN TASK & CHALLENGES",
          description: "The primary goal of YaadroLens is to provide a seamless solution for contactless employee attendance management through advanced face recognition technology. The platform aims to meet the needs of retail stores, supermarkets, and businesses seeking automated, accurate, and secure attendance tracking with offline capabilities.",
        },
        features: {
          faceRecognition: {
            title: "FACE RECOGNITION TECHNOLOGY",
            description: "Advanced DeepFace ML with ArcFace embeddings delivering over 90% accuracy in employee identification, ensuring reliable and precise attendance tracking.",
          },
          offlineFirst: {
            title: "OFFLINE-FIRST ARCHITECTURE",
            description: "Works seamlessly without internet connectivity, automatically syncing all attendance data when connection is restored. Perfect for locations with unreliable network coverage.",
          },
          multiTenant: {
            title: "MULTI-TENANT SAAS",
            description: "Secure, isolated data management for multiple shops and locations. Enterprise-grade security with JWT authentication, role-based access control, and rate limiting.",
          },
        },
        faq: {
          tag: "Frequently asked questions",
          title: "Frequently asked",
          titleHighlight: "questions",
          description: "Choose a solution that fits your business needs and budget. No hidden fees, no surprises—just straightforward pricing for powerful attendance management.",
          items: [
            {
              question: "What is YaadroLens?",
              answer: "YaadroLens is an AI-powered face recognition attendance system designed for retail stores and supermarkets. It provides contactless, automated attendance tracking with offline capabilities, real-time analytics, and enterprise-grade security using DeepFace ML technology.",
            },
            {
              question: "How does YaadroLens work?",
              answer: "YaadroLens uses advanced DeepFace ML with ArcFace embeddings to identify employees with over 90% accuracy. The system captures employee faces at entry points, matches them against registered profiles, and automatically records attendance. It works offline and syncs data when internet connection is restored.",
            },
            {
              question: "Is YaadroLens secure?",
              answer: "Yes, YaadroLens employs enterprise-grade security measures including JWT authentication, role-based access control, multi-tenant data isolation, and rate limiting. All face recognition data is encrypted and stored securely with proper access controls.",
            },
            {
              question: "Can YaadroLens work without internet?",
              answer: "Yes, YaadroLens features an offline-first architecture. The system continues to function and record attendance even without internet connectivity. All data is stored locally and automatically synchronized when the connection is restored.",
            },
            {
              question: "What is the accuracy of face recognition?",
              answer: "YaadroLens achieves over 90% accuracy in employee identification using DeepFace ML with ArcFace embeddings. The system continuously learns and improves its recognition capabilities through ML performance monitoring.",
            },
          ],
        },
      },
    },
    // Common
    common: {
      top: "Top",
      english: "English India",
      uae: "UAE",
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
        description: "منصة تحليلات متقدمة",
      },
      lens: {
        title: "لينز",
        description: "رؤى البيانات المرئية",
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
        description: "منتجات مبتكرة مثل يادرو ولينز مصممة لحل تحديات الأعمال الواقعية.",
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
      },
    },
    // Footer
    footer: {
      brand: {
        title: "كودتيك",
        description: "نبني حلول برمجيات متطورة تدفع عملك إلى الأمام. خدمات تطوير وتصميم واستشارات خبيرة.",
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
      location: "الموقع",
      time: "الوقت",
      weather: "الطقس",
    },
    // Products page
    products: {
      title: "منتجاتنا",
      subtitle: "اكتشف حلولنا المبتكرة المصممة لتحويل عملك",
      backToHome: "العودة إلى الرئيسية",
      yaadro: {
        name: "يادرو",
        description: "نظام شامل لإدارة التوصيل مصمم للربط بسلاسة بين المتاجر الكبرى وشركاء التوصيل والعملاء. يبسط عملية التوصيل بأكملها من وضع الطلب إلى التسليم على الباب.",
        features: [
          "تتبع وإدارة الطلبات في الوقت الفعلي",
          "تطبيقات الهاتف المحمول المخصصة للمتاجر وشركاء التوصيل",
          "لوحة تحكم ويب شاملة لإدارة المتاجر الكبرى",
          "اتصال سلس بين جميع الأطراف",
          "تعيين وتوجيه التوصيلات تلقائياً",
          "إشعارات وتحديثات فورية",
        ],
      },
      lens: {
        name: "لينز",
        description: "نظام حضور بذكاء اصطناعي للتعرف على الوجوه لمتاجر التجزئة والمتاجر الكبرى. يوفر تتبع حضور تلقائي بدون تلامس مع إمكانيات العمل دون اتصال وأمان على مستوى المؤسسات.",
        features: [
          "DeepFace ML بدقة تزيد عن 90% في تحديد الموظفين",
          "هندسة معمارية تعمل دون اتصال - تعمل بدون إنترنت",
          "منصة SaaS متعددة المستأجرين مع عزل بيانات آمن",
          "لوحات تحليلات فورية وتقارير شاملة",
          "أمان على مستوى المؤسسات مع مصادقة JWT",
          "هندسة معمارية قابلة للتوسع تدعم مواقع متعددة",
        ],
      },
      viewDetails: "عرض التفاصيل",
    },
    // Product detail page
    productDetail: {
      backToProducts: "العودة إلى المنتجات",
      notFound: "المنتج غير موجود",
      yaadro: {
        headline: "تسليم أذكى، اتصال سلس",
        description: "يادرو هو نظام شامل لإدارة التوصيل مصمم للربط بسلاسة بين المتاجر الكبرى وشركاء التوصيل والعملاء. مع تطبيقات الهاتف المحمول المخصصة للمتاجر الكبرى وشركاء التوصيل، بالإضافة إلى لوحة تحكم ويب قوية، يبسط يادرو عملية التوصيل بأكملها من وضع الطلب إلى التسليم على الباب.",
        smartFeatures: {
          title: "الميزات الذكية",
          supermarketApp: {
            title: "تطبيق المتجر الكبير",
            description: "إدارة الطلبات والمخزون والتوصيلات من جهازك المحمول أثناء التنقل.",
          },
          deliveryPartnerApp: {
            title: "تطبيق شريك التوصيل",
            description: "استقبل الطلبات وانتقل عبر الطرق وقم بتحديث حالة التوصيل في الوقت الفعلي.",
          },
          webDashboard: {
            title: "لوحة تحكم الويب",
            description: "منصة إدارة شاملة للمتاجر الكبرى للإشراف على جميع العمليات.",
          },
          realTimeTracking: {
            title: "التتبع في الوقت الفعلي",
            description: "تتبع التوصيلات مباشرة مع تكامل GPS وتحديثات الحالة الفورية.",
          },
          smartCommunication: {
            title: "التواصل الذكي",
            description: "رسائل سلسة بين المتاجر الكبرى والشركاء والعملاء.",
          },
          orderManagement: {
            title: "إدارة الطلبات",
            description: "معالجة الطلبات الآلية والتعيين وجدولة التوصيل.",
          },
        },
        partners: {
          title: "موثوق به من قبل المتاجر الكبرى الرائدة",
        },
        integration: {
          title: "متكامل مع",
          subtitle: "يتكامل يادرو بسلاسة مع برنامج الفوترة تاسك لتبسيط سير عمل التوصيل",
          description: "تاسك هو برنامج الفوترة حيث تقوم المتاجر الكبرى بإنشاء طلبات التوصيل للمنازل. عند تقديم الطلب، يتدفق تلقائيًا إلى تطبيق يادرو، حيث يمكنك إدارة وتتبع الطلب ببساطة وفعالية من التقديم إلى التسليم.",
        },
        process: {
          title: "تعرف على العملية",
          subtitle: "خطوات بسيطة لإدارة عمليات التوصيل بكفاءة",
          steps: {
            createOrder: {
              title: "إنشاء طلب توصيل منزلي",
              description: "ابدأ بإنشاء طلب توصيل منزلي من خلال نظام المتجر الكبير الخاص بك. يتم مزامنة الطلب تلقائيًا مع يادرو للإدارة السلسة.",
            },
            assignPartner: {
              title: "تعيين شريك التوصيل",
              description: "يقوم النظام بتعيين طلبك تلقائيًا لأفضل شريك توصيل متاح بناءً على الموقع والتوفر.",
            },
            completeOrder: {
              title: "إكمال الطلب بسهولة",
              description: "تتبع التوصيل في الوقت الفعلي وأكمل الطلب بسهولة. احصل على إشعارات وتحديثات فورية طوال العملية.",
            },
          },
        },
        stats: {
          activeOrders: "الطلبات النشطة",
          deliveryStats: "إحصائيات التوصيل",
        },
      },
      lens: {
        headline: "تصور بياناتك",
        description: "لينز هو منصة تصور متطورة تجعل البيانات المعقدة في متناول اليد وسهلة الفهم.",
        heroDescription: "YaadroLens هو نظام مبتكر للتعرف على الوجوه يعمل بالذكاء الاصطناعي يتيح لمتاجر التجزئة والمتاجر الكبرى تتبع حضور الموظفين بدون تلامس بدقة تزيد عن 90%، حتى عند عدم الاتصال بالإنترنت.",
        mainTask: {
          title: "01/ المهمة الرئيسية والتحديات",
          description: "الهدف الرئيسي من YaadroLens هو توفير حل سلس لإدارة حضور الموظفين بدون تلامس من خلال تقنية التعرف على الوجوه المتقدمة. تهدف المنصة إلى تلبية احتياجات متاجر التجزئة والمتاجر الكبرى والشركات التي تسعى للحصول على تتبع حضور آلي ودقيق وآمن مع إمكانيات العمل دون اتصال.",
        },
        features: {
          faceRecognition: {
            title: "تقنية التعرف على الوجوه",
            description: "DeepFace ML المتقدم مع ArcFace embeddings يوفر دقة تزيد عن 90% في تحديد الموظفين، مما يضمن تتبع حضور موثوق ودقيق.",
          },
          offlineFirst: {
            title: "هندسة معمارية تعمل دون اتصال",
            description: "يعمل بسلاسة بدون اتصال بالإنترنت، ويقوم بمزامنة جميع بيانات الحضور تلقائياً عند استعادة الاتصال. مثالي للمواقع ذات تغطية الشبكة غير الموثوقة.",
          },
          multiTenant: {
            title: "SaaS متعدد المستأجرين",
            description: "إدارة بيانات آمنة ومعزولة لعدة متاجر ومواقع. أمان على مستوى المؤسسات مع مصادقة JWT، والتحكم في الوصول المستند إلى الأدوار، والحد من معدل الطلبات.",
          },
        },
        faq: {
          tag: "الأسئلة الشائعة",
          title: "الأسئلة",
          titleHighlight: "الشائعة",
          description: "اختر حلاً يناسب احتياجات عملك وميزانيتك. لا توجد رسوم مخفية، لا مفاجآت—فقط تسعير مباشر لإدارة حضور قوية.",
          items: [
            {
              question: "ما هو YaadroLens؟",
              answer: "YaadroLens هو نظام حضور للتعرف على الوجوه يعمل بالذكاء الاصطناعي مصمم لمتاجر التجزئة والمتاجر الكبرى. يوفر تتبع حضور آلي بدون تلامس مع إمكانيات العمل دون اتصال، وتحليلات فورية، وأمان على مستوى المؤسسات باستخدام تقنية DeepFace ML.",
            },
            {
              question: "كيف يعمل YaadroLens؟",
              answer: "يستخدم YaadroLens DeepFace ML المتقدم مع ArcFace embeddings لتحديد الموظفين بدقة تزيد عن 90%. يلتقط النظام وجوه الموظفين عند نقاط الدخول، ويطابقها مع الملفات الشخصية المسجلة، ويسجل الحضور تلقائياً. يعمل دون اتصال ومزامنة البيانات عند استعادة اتصال الإنترنت.",
            },
            {
              question: "هل YaadroLens آمن؟",
              answer: "نعم، يستخدم YaadroLens تدابير أمان على مستوى المؤسسات بما في ذلك مصادقة JWT، والتحكم في الوصول المستند إلى الأدوار، وعزل بيانات متعدد المستأجرين، والحد من معدل الطلبات. جميع بيانات التعرف على الوجوه مشفرة ومخزنة بشكل آمن مع ضوابط الوصول المناسبة.",
            },
            {
              question: "هل يمكن لـ YaadroLens العمل بدون إنترنت؟",
              answer: "نعم، يتميز YaadroLens بهندسة معمارية تعمل دون اتصال. يستمر النظام في العمل وتسجيل الحضور حتى بدون اتصال بالإنترنت. يتم تخزين جميع البيانات محلياً ومزامنتها تلقائياً عند استعادة الاتصال.",
            },
            {
              question: "ما هي دقة التعرف على الوجوه؟",
              answer: "يحقق YaadroLens دقة تزيد عن 90% في تحديد الموظفين باستخدام DeepFace ML مع ArcFace embeddings. يتعلم النظام باستمرار ويحسن قدراته على التعرف من خلال مراقبة أداء ML.",
            },
          ],
        },
      },
    },
    // Common
    common: {
      top: "أعلى",
      english: "الإنجليزية الهند",
      uae: "الإمارات",
    },
  },
};

export function getTranslations(lang: Language) {
  return translations[lang];
}

