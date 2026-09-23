import React from "react";
import { createRoot } from "react-dom/client";
import LandingPage from "./landing/LandingPage.jsx";
import "./preview.css";

const productionHost = "https://hallium.vercel.app";
function authHref(destination = "/") {
  const next = destination.startsWith("/") && !destination.startsWith("//") ? destination : "/";
  return productionHost + "/auth/google?next=" + encodeURIComponent(next);
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LandingPage authHref={authHref} />
    <footer className="preview-legal">
      <div><strong>Hallim <span lang="ko">한림</span></strong><span>V2 concept · V1 safely preserved</span></div>
      <nav aria-label="Legal links">
        <a href={productionHost + "/privacy"}>Privacy Policy</a>
        <a href={productionHost + "/terms"}>Terms & Conditions</a>
        <a href={productionHost + "/demo"}>Product tour</a>
      </nav>
    </footer>
  </React.StrictMode>
);
