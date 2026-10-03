export const siteConfig = {
  name: "Sudhanshu Ghosh",
  title: "Sudhanshu Ghosh | AI & Full-Stack Developer",
  shortTitle: "Sudhanshu Ghosh — AI & Full-Stack Developer",
  description:
    "AI & Full-Stack Developer building modern, scalable web applications with React, Next.js, Node.js, MongoDB, and modern AI APIs. Specializing in real-time WebRTC/Socket.io systems and Generative AI workflows.",
  url: "https://sudhanshu-portfolio26.netlify.app",
  ogImage: "https://sudhanshu-portfolio26.netlify.app/assets/aboutMe3.png",
  locale: "en_US",
  author: {
    name: "Sudhanshu Ghosh",
    role: "AI & Full-Stack Developer",
    location: "India",
    email: "shudhanshukumar9713@gmail.com",
    availableForHire: true,
  },
  social: {
    github: "https://github.com/sudhanshu9199",
    linkedin: "https://linkedin.com/in/sudhanshu9199",
    threads: "https://www.threads.net/@sudhanshu_9199",
    hackerrank: "https://www.hackerrank.com/profile/sudhanshu9199",
  },
  keywords: [
    // Layer 1: Core Full-Stack
    "Sudhanshu Ghosh",
    "Sudhanshu Ghosh portfolio",
    "AI and Full Stack Developer",
    "Full Stack Developer India",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Express.js",
    "MongoDB",
    "REST API Architecture",
    "JavaScript Developer",
    "TypeScript",
    // Layer 2: Differentiation (Real-Time & AI Web)
    "Real-time Web Applications",
    "Socket.io Developer",
    "WebRTC Video Chat",
    "Real-time Collaboration",
    "AI API Integration",
    "Streaming AI Responses",
    "Scalable API Architecture",
    // Layer 3: Emerging Specialization (GenAI Apps)
    "Generative AI Developer",
    "Gemini API Applications",
    "Prompt Engineering",
    "Structured Outputs",
    "LLM Integration",
    "Multimodal AI Web Apps",
    "AI Agent Workflows",
  ],
};

export const faqData = [
  {
    question: "Who is Sudhanshu Ghosh?",
    answer:
      "Sudhanshu Ghosh is an AI & Full-Stack Developer based in India who builds modern, scalable web applications. He bridges modern full-stack web engineering (React, Next.js, Node.js, MongoDB) with generative AI models and real-time communication systems.",
  },
  {
    question: "What is Sudhanshu Ghosh's primary tech stack and expertise?",
    answer:
      "Sudhanshu specializes in a 3-layer architecture: 1) Core Full-Stack: React, Next.js, Node.js, Express, MongoDB, and REST APIs; 2) Real-Time & AI Collaboration: Socket.io, WebRTC, real-time messaging, and streaming AI responses; 3) Generative AI: Gemini & OpenAI APIs, prompt engineering, multimodal AI, and intelligent UI automation.",
  },
  {
    question: "What flagship projects has Sudhanshu Ghosh built?",
    answer:
      "Sudhanshu has built several notable applications including: ConnectX (a real-time chat, voice, and video communication platform with WebRTC, Socket.io, and AI reply suggestions), AURA (a context-aware conversational AI assistant powered by the Gemini API), and Caption Generator AI (a multimodal AI tool that analyzes uploaded images and produces personalized social media captions).",
  },
  {
    question: "What makes Sudhanshu Ghosh different from traditional full-stack developers?",
    answer:
      "Rather than treating AI as an afterthought or building isolated frontends, Sudhanshu focuses on 'Real-time + AI Web Applications'—engineering low-latency real-time data pipelines (WebSockets/WebRTC) coupled with streamed generative AI model integrations and modular component architecture.",
  },
  {
    question: "Is Sudhanshu Ghosh available for hiring, internships, or freelance projects?",
    answer:
      "Yes, Sudhanshu Ghosh is actively open to full-time software engineering roles, high-impact frontend/full-stack positions (India-based and global remote), and select technical collaborations. You can reach out directly via his contact form or through LinkedIn and GitHub.",
  },
];

export const generateJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Person Entity (Authority, E-E-A-T & sameAs disambiguation)
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        givenName: "Sudhanshu",
        familyName: "Ghosh",
        jobTitle: siteConfig.author.role,
        description: siteConfig.description,
        url: siteConfig.url,
        image: siteConfig.ogImage,
        sameAs: [
          siteConfig.social.github,
          siteConfig.social.linkedin,
          siteConfig.social.threads,
          siteConfig.social.hackerrank,
        ],
        nationality: {
          "@type": "Country",
          name: "India",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
        knowsAbout: [
          "Full-Stack Web Development",
          "Generative AI Application Development",
          "React.js",
          "Next.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Socket.io",
          "WebRTC",
          "Gemini API",
          "REST APIs",
          "Prompt Engineering",
          "Real-time Systems",
          "JavaScript",
          "TypeScript",
        ],
        hasOccupation: {
          "@type": "Occupation",
          name: "Full Stack Engineer",
          occupationLocation: {
            "@type": "Country",
            name: "India",
          },
          skills: "Full-Stack Development, Generative AI Integration, Real-Time WebRTC Systems",
        },
      },

      // 2. WebSite Entity
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#person`,
        },
        inLanguage: "en-US",
      },

      // 3. ProfilePage Entity (Google Knowledge Graph & Profile Anchor)
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profilepage`,
        url: siteConfig.url,
        name: siteConfig.title,
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        about: {
          "@id": `${siteConfig.url}/#person`,
        },
        mainEntity: {
          "@id": `${siteConfig.url}/#person`,
        },
        inLanguage: "en-US",
      },

      // 4. ItemList of Software Applications (Project Showcase Entity Graph)
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}/#projects`,
        name: "Sudhanshu Ghosh Featured Projects",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "SoftwareApplication",
              name: "ConnectX",
              headline: "Real-Time Communication Platform",
              description:
                "A real-time communication platform featuring chat, voice calls, and video calls with adaptive video quality, WebRTC, Socket.io, and AI-powered reply suggestions.",
              applicationCategory: "CommunicationApplication",
              operatingSystem: "Web",
              url: "https://connectx-chat-with.netlify.app/",
              codeRepository: "https://github.com/sudhanshu9199/chat-APP-Like",
              author: {
                "@id": `${siteConfig.url}/#person`,
              },
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "SoftwareApplication",
              name: "AURA",
              headline: "AI Conversational Assistant",
              description:
                "An intelligent AI chat application powered by Google Gemini API, engineered for context-aware natural conversations based on historical dialogue threads.",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: "https://first-chatbot-ai.netlify.app/",
              codeRepository: "https://github.com/sudhanshu9199/AI-ChatBot",
              author: {
                "@id": `${siteConfig.url}/#person`,
              },
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "SoftwareApplication",
              name: "Caption Generator AI",
              headline: "Multimodal AI Caption Generator",
              description:
                "An AI-powered multimodal application analyzing uploaded images and crafting personalized, high-engagement social media captions via prompt engineering.",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web",
              url: "https://caption-generator-ai.netlify.app/",
              codeRepository: "https://github.com/sudhanshu9199/caption-generator-AI",
              author: {
                "@id": `${siteConfig.url}/#person`,
              },
            },
          },
        ],
      },

      // 5. FAQPage (AEO: Direct Zero-Click Answers & AI Overviews)
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: faqData.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
};
