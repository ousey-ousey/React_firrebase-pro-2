import React from "react";
import "./Footer.css";
import "../i18n";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { i18n } = useTranslation();
  return (
    <div className="myfooter">
      <footer className="ali   ">
        {i18n.language === "en" && "Designed and developed by"}
        {i18n.language === "ar" && "تم التصمي والكود بواسطه "}
        {i18n.language === "fr" && "qu'est que li je suis mald >>>"}
        <a
          style={{ color: "lightblue", textDecoration: "underline" }}
          href="https://protifolio-gray.vercel.app/"
        >
          yousef@noumany
        </a>
        <span>
          {" "}
          <i className="fa-solid fa-heart"></i>{" "}
        </span>
      </footer>
    </div>
  );
};

export default Footer;
