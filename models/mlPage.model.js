import mongoose from "mongoose";

const MLPSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: false,
      default: "M7FIvfx5J10",
    },
    hero: {
      headline: {
        type: String,
        required: true,
        default:
          "Turn Engagement Into Results With a Spinning Wheel of Fortune!",
      },
      subheadline: {
        type: String,
        required: true,
        default:
          "Attract, engage, and convert customers with the ultimate customizable landing page tool. Perfect for businesses of any size.",
      },
      ctaButton: {
        text: { type: String, required: true, default: "Try the Demo" },
        color: { type: String, required: true, default: "#C33AFF" },
        glowColor: {type: String, required: true, default: "#C33AFF"},
        textColor: { type: String, required: true, default: "#FFFFFF" },
        link: { type: String, required: true, default: "#demo" },
        isGradient: { type: Boolean, required: false, default: false },
        gradientStart: { type: String, required: false, default: "#6C63FF" },
        gradientEnd: { type: String, required: false, default: "#4B4AC9" },
        gradientDirection: { type: String, required: false, default: "to right" },
      },
      backgroundImage: {
        type: String,
        required: false,
        default:
          "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1920&q=80",
      },
      logo: {
        type: String,
        required: true,
        default:
          "https://s3.amazonaws.com/www-inside-design/uploads/2019/05/woolmarkimagelogo-1024x576.png",
      },
    },
    demo: {
      title: {
        type: String,
        required: true,
        default: "See the Wheel in Action!",
      },
      caption: {
        type: String,
        required: true,
        default: "Watch how easy it is to create your personalized experience.",
      },
      secondaryCta: {
        text: { type: String, required: true, default: "Learn More" },
        glowColor: {type: String, required: true, default: "#C33AFF"},
        color: { type: String, required: true, default: "#C33AFF" },
        textColor: { type: String, required: true, default: "#FFFFFF" },
        link: { type: String, required: true, default: "#video" },
        isGradient: { type: Boolean, required: false, default: false },
        gradientStart: { type: String, required: false, default: "#6C63FF" },
        gradientEnd: { type: String, required: false, default: "#4B4AC9" },
        gradientDirection: { type: String, required: false, default: "to right" },
      },
    },
    features: {
      title: { type: String, required: true, default: "Why Choose Us!" },
      description: {
        type: String,
        required: true,
        default: "Why Businesses Love Our Platform.",
      },
      items: {
        type: [
          {
            icon: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
          },
        ],
        default: [
          {
            icon: "Settings",
            title: "Easy to Customize",
            description:
              "Personalize your wheel with your own branding, colors, prizes, and fonts.",
          },
          {
            icon: "Smartphone",
            title: "Mobile Responsive",
            description:
              "Works seamlessly on all devices, ensuring accessibility for everyone.",
          },
          {
            icon: "BarChart",
            title: "Analytics Included",
            description:
              "Track engagement, spins, and results with built-in analytics.",
          },
        ],
      },
    },
    benefits: {
      title: {
        type: String,
        required: true,
        default:
          "The Benefits of Adding Gamification to Your Marketing Strategy!",
      },
      description: {
        type: String,
        required: true,
        default:
          "Our spinning wheel landing pages are more than just fun—they're proven to boost engagement, increase conversions, and build brand loyalty.",
      },
      items: {
        type: [String],
        required: true,
        default: [
          "Boost user engagement by 70%",
          "Increase conversions and sales",
          "Delight your customers with rewards",
          "Simplify lead generation",
        ],
      },
    },
    howItWorks: {
      title: { type: String, required: true, default: "How It Works" },
      steps: {
        type: [
          {
            icon: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
          },
        ],
        default: [
          {
            icon: "Settings",
            title: "Customize Your Wheel",
            description: "Set up your prizes and branding.",
          },
          {
            icon: "Share2",
            title: "Share With Your Audience",
            description: "Embed on your website or share the link.",
          },
          {
            icon: "Trophy",
            title: "Watch Results Roll In",
            description: "Track engagement and conversions.",
          },
        ],
      },
    },
    testimonials: {
      title: {
        type: String,
        required: true,
        default: "What Our Customers Say",
      },
      subtitle: {
        type: String,
        required: true,
        default: "Success stories from businesses like yours",
      },
      items: {
        type: [
          {
            id: { type: String, required: true },
            content: { type: String, required: true },
            name: { type: String, required: true },
            role: { type: String, required: true },
            company: { type: String, required: true },
            rating: { type: Number, required: true },
          },
        ],
        default: [
          {
            id: "1",
            content: "This tool has transformed our lead generation process!",
            name: "John Smith",
            role: "Marketing Director",
            company: "Tech Corp",
            rating: 5,
          },
          {
            id: "2",
            content: "Absolutely amazing for boosting engagement!",
            name: "Jane Doe",
            role: "Head of Sales",
            company: "SalesForce Inc",
            rating: 4,
          },
        ],
      },
    },
    pricing: {
      title: { type: String, required: true, default: "Choose Your Plan" },
      plans: {
        type: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
            monthlyPrice: { type: String, required: true },
            yearlyPrice: { type: String, required: true },
            features: { type: [String], required: true },
            buttonText: { type: String, required: true },
            buttonColor: { type: String, required: true },
            buttonTextColor: { type: String, required: true },
            glowColor: {type: String, required: true, default: "#C33AFF"},
            buttonLink: { type: String, required: true },
            isGradient: { type: Boolean, required: false, default: false },
            gradientStart: { type: String, required: false, default: "#6C63FF" },
            gradientEnd: { type: String, required: false, default: "#4B4AC9" },
            gradientDirection: { type: String, required: false, default: "to right" },
            monthlyplanText: { type: String, required: true, default: "Billed Monthly" },
            yearlyPlanText: { type: String, required: true, default: "Billed Yearly" },
            planText: { type: String, required: true, default: "Save 33%" },
          },
        ],
        default: [
          {
            id: "basic",
            name: "Basic Plan",
            monthlyPrice: "$29/month",
            yearlyPrice: "$99/year",
            features: ["1 Landing Page"],
            buttonText: "Get Started",
            buttonColor: "#C33AFF",
            buttonTextColor: "#FFFFFF",
            buttonLink: "/signup",
          },
          {
            id: "pro",
            name: "Better",
            monthlyPrice: "$69/month",
            yearlyPrice: "$199/year",
            features: ["3 Landing Pages", "Priority Support"],
            buttonText: "Get Started",
            buttonColor: "#C33AFF",
            buttonTextColor: "FFFFFF",
            buttonLink: "/signup",
          },
          {
            id: "best",
            name: "Best",
            monthlyPrice: "$99/month",
            yearlyPrice: "$349/year",
            features: ["6 Landing Pages", "Priority Support"],
            buttonText: "Get Started",
            buttonColor: "#C33AFF",
            buttonTextColor: "FFFFFF",
            buttonLink: "/signup",
          }
        ],
      },
    },
    faq: {
      title: {
        type: String,
        required: true,
        default: "Frequently Asked Questions",
      },
      items: {
        type: [
          {
            id: { type: String, required: true },
            question: { type: String, required: true },
            answer: { type: String, required: true },
          },
        ],
        default: [
          {
            id: "1",
            question: "What is included in each plan?",
            answer:
              "Each plan includes access to all core features and support.",
          },
          {
            id: "2",
            question: "Can I cancel my subscription?",
            answer:
              "Yes, you can cancel anytime from your account settings. You'll retain access until the billing cycle ends.",
          },
        ],
      },
    },
    finalCta: {
      title: {
        type: String,
        required: true,
        default: "Ready to Boost Your Engagement?",
      },
      buttonText: { type: String, required: true, default: "Get Started Now" },
      buttonLink: { type: String, required: true, default: "/login-form" },
      glowColor: {type: String, required: true, default: "#C33AFF"},
      buttonColor: { type: String, required: true, default: "#C33AFF" },
      buttonTextColor: { type: String, required: true, default: "#FFFFFF" },
      isGradient: { type: Boolean, required: false, default: false },
      gradientStart: { type: String, required: false, default: "#6C63FF" },
      gradientEnd: { type: String, required: false, default: "#4B4AC9" },
      gradientDirection: { type: String, required: false, default: "to right" },
      guarantee: {
        type: String,
        required: true,
        default: "30-day money-back guarantee",
      },
    },
    footer:{type: String, required: true, default: "Terms and condition"},
    prizes: {
      type: [
        {
          id: { type: String, required: true },
          text: { type: String, required: true },
          gradient: { type: Boolean, required: false, default: false }, // Toggle for gradient
          gradientStart: { type: String, required: false, default: "#6C63FF" }, // Start color for gradient
          gradientEnd: { type: String, required: false, default: "#4B4AC9" }, // End color for gradient
          gradientDirection: { type: String, required: false, default: "to right" },      
          color: { type: String, required: true },
          probability: { type: Number, required: true },
          redirectUrl: { type: String, required: true },
          glowColor: { type: String, required: true },
        },
      ],
      default: [
        {
          id: "1",
          text: "Free Coffee",
          color: "#5B04E9",
          probability: 0.2,
          redirectUrl: "https://example.com/free-coffee",
          glowColor: "#9800EB",
        },
        {
          id: "2",
          text: "Discount Voucher",
          color: "#9800EB",
          probability: 0.3,
          redirectUrl: "https://example.com/discount-voucher",
          glowColor: "#85FFBD",
        },
        {
          id: "3",
          text: "Gift Card",
          color: "#5B04E9",
          probability: 0.1,
          redirectUrl: "https://example.com/gift-card",
          glowColor: "#85C1FF",
        },
        {
          id: "4",
          text: "T-Shirt",
          color: "#9800EB",
          probability: 0.15,
          redirectUrl: "https://example.com/tshirt",
          glowColor: "#FFC1E3",
        },
        {
          id: "5",
          text: "Free Lunch",
          color: "#5B04E9",
          probability: 0.25,
          redirectUrl: "https://example.com/free-lunch",
          glowColor: "#FFFF99",
        },
        {
          id: "6",
          text: "Free Watch",
          color: "#9800EB",
          probability: 0.25,
          redirectUrl: "https://example.com/free-watch",
          glowColor: "#FFFF99",
        },
      ],
    },
  
  },
  { timestamps: true }
);

export default mongoose.model("MLP", MLPSchema);
