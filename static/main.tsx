import { createRoot } from "react-dom/client";
import { SignInScreen } from "@/components/sign-in-screen";
import "@/app/globals.css";
import "./fonts.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root");
createRoot(root).render(<SignInScreen />);
