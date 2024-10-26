import { Be_Vietnam_Pro } from "next/font/google";

export const fontBeVietnamPro = Be_Vietnam_Pro({
    subsets: ["latin"],
    variable: "--font-be",
    weight: ["400", "500", "600", "700", "800", "900"],
    display: "swap",
    preload: true, // <--- add this
});