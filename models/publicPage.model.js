import mongoose from "mongoose";

const PublicPageSchema = new mongoose.Schema({
  publicPageId: { type: String, required: true, unique: true },
  publicPageName: { type: String, required: true },
  projectId: { type: String, required: true },
  backgroundColor: { type: String, required: true, default: "#121218" },
  accessibilityOn: {type: Boolean, required: true, default: true},
  backgroundImage: {
    type: String,
    required: true,
    default:
      "https://backend071.wheelodeal.com/uploads/publicpage/1734642048779-Gala-background.jpg"},
      mobileBackgroundImage: {
        type: String,
        required: true,
        default:
          "https://backend071.wheelodeal.com/uploads/publicpage/1734642048779-Gala-background.jpg"},
  logo: {
    type: String,
    required: true,
    default:
      "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid",
  },
  headerTitle: { type: String, required: true, default: "Spin & Win!" },
  subtitle: {
    type: String,
    required: true,
    default: "Try your luck and win amazing prizes!",
  },
  lowerFooter: {type: String, default: "Your Footer"}, 
  footer: {type: String,  default: "<p>Default footer content. Add your <a href='/terms'>terms and conditions</a>.</p>"},
  finalCta: {
    text: { type: String, required: true, default: "Click Me!" }, // Button text
    link: { type: String, required: true, default: "#" }, // Link URL
    size: { type: String, required: true, default: "medium" }, // Button size: small, medium, large
    textColor: { type: String, required: true, default: "#FFFFFF" }, // Text color
    backgroundColor: { type: String, required: true, default: "#6C63FF" }, // Button background color
    gradient: { type: Boolean, required: false, default: false }, // Toggle for gradient
    gradientStart: { type: String, required: false, default: "#6C63FF" }, // Start color for gradient
    gradientEnd: { type: String, required: false, default: "#4B4AC9" }, // End color for gradient
    gradientDirection: { type: String, required: false, default: "to right" },
    hoverColor: { type: String, required: false, default: "#4B4AC9" }, // Optional hover effect color
  },
  
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
        expirationDate: { type: Date, required: true },
        bonusCode: {type: String, required: true},
      },
    ],
    default: [
      {
        id: "1",
        text: "Edit Deal",
        color: "#5B04E9",
        probability: 0.2,
        redirectUrl: "https://example.com/free-coffee",
        glowColor: "#9800EB",
        expirationDate: new Date("2024-12-13T12:34:56.789Z"),
        bonusCode: 'example'
      },
      {
        id: "2",
        text: "Edit Deal",
        color: "#9800EB",
        probability: 0.3,
        redirectUrl: "https://example.com/discount-voucher",
        glowColor: "#85FFBD",
        expirationDate: new Date("2024-12-20T10:00:00.000Z"),
        bonusCode: 'example'
      },
      {
        id: "3",
        text: "Edit Deal",
        color: "#5B04E9",
        probability: 0.1,
        redirectUrl: "https://example.com/gift-card",
        glowColor: "#85C1FF",
        expirationDate: new Date("2025-01-01T00:00:00.000Z"),
        bonusCode: 'example'
      },
      {
        id: "4",
        text: "Edit Deal",
        color: "#9800EB",
        probability: 0.15,
        redirectUrl: "https://example.com/tshirt",
        glowColor: "#FFC1E3",
        expirationDate: new Date("2024-11-30T23:59:59.000Z"),
        bonusCode: 'example'
      },
      {
        id: "5",
        text: "Edit Deal",
        color: "#5B04E9",
        probability: 0.25,
        redirectUrl: "https://example.com/free-lunch",
        glowColor: "#FFFF99",
        expirationDate: new Date("2024-12-31T23:59:59.000Z"),
        bonusCode: 'example'
      },
      {
        id: "6",
        text: "Edit Deal",
        color: "#9800EB",
        probability: 0.25,
        redirectUrl: "https://example.com/free-watch",
        glowColor: "#FFFF99",
        expirationDate: new Date("2024-12-15T18:00:00.000Z"),
        bonusCode: 'example',
      },
    ],
  },
  googlePixelId: {type: String, required: false},
  facebookPixelId: {type : String , required: false},
  carouselImages: {
    type: [
      {
        url: { type: String, required: true },
        alt: { type: String, required: false },
      },
    ], // Array of carousel image subdocuments
    required: false,
   
  },
  videoId: {
    type: String,
    required: false,
  },
  musicEnabled: {type: Boolean, required: true, default: true},
  wheelButton: {
    text: {type: String, required: true, default: "SPIN"},
    textColor: { type: String, required: true, default: "#FFFFFF" }, // Text color
    backgroundColor: { type: String, required: true, default: "#6C63FF" }, // Button background color
    gradient: { type: Boolean, required: false, default: false }, // Toggle for gradient
    gradientStart: { type: String, required: false, default: "#6C63FF" }, // Start color for gradient
    gradientEnd: { type: String, required: false, default: "#4B4AC9" }, // End color for gradient
    gradientDirection: { type: String, required: false, default: "to right" },
    
  },
});

const PublicPage = mongoose.model("PublicPage", PublicPageSchema);

export default PublicPage;
