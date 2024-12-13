import mongoose from "mongoose";



const PublicPageSchema = new mongoose.Schema({
  publicPageId: {type: String, required: true, unique:true},
  publicPageName: {type: String, requird: true, unique: true},
  projectId: {type: String, required: true},
  backgroundColor: { type: String, required: true, default: "#121218" },
  backgroundImage: {type: String,
    required: true,
    default:"https://media.istockphoto.com/id/1434782845/vector/purple-light-defocused-blurred-motion-gradient-abstract-background-vector.jpg?s=612x612&w=0&k=20&c=XdziynSGjaoVCLk9LI1A70ibGgpUi2IZ23PtkOWdjOM="
  },
  logo: {
    type: String,
    required: true,
    default: "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid",
  },
  headerTitle: { type: String, required: true, default: "Spin & Win!" },
  subtitle: { type: String, required: true, default: "Try your luck and win amazing prizes!" },
  prizes: {
    type: [
      {
        id: { type: String, required: true },
        text: { type: String, required: true },
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
  carouselImages: {
    type: [ {url: { type: String, required: true },
        alt: { type: String, required: true }}], // Array of carousel image subdocuments
    required: true,
    default: [
      {
        url: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1920&q=80",
        alt: "Prize showcase 1",
      },
      {
        url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1920&q=80",
        alt: "Prize showcase 2",
      },
    ],
  },
  videoId: {
    type: String,
    required: false
  }
});

const PublicPage = mongoose.model("PublicPage", PublicPageSchema);

export default PublicPage;
