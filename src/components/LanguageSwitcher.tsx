"use client"
import React, { useState } from "react";

type Language = 'en' | 'fr' | 'es';

const translations: Record<Language, { welcome: string; selectLanguage: string }> = {
  en: {
    welcome: "Welcome to the Marketplace",
    selectLanguage: "Select Language",
  },
  fr: {
    welcome: "Bienvenue sur le Marketplace",
    selectLanguage: "Choisir la langue",
  },
  es: {
    welcome: "Bienvenido al Mercado",
    selectLanguage: "Seleccionar idioma",
  },
};

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  // Handle language change
  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    // Placeholder for dynamic fetching logic
    console.log(`Language changed to: ${lang}`);
  };

  return (
    <div className="p-4 border rounded-md max-w-md mx-auto text-center">
      <h1 className="font-semibold text-xl mb-4">
        {translations[currentLanguage].welcome}
      </h1>
      <label htmlFor="language" className="block font-medium text-sm mb-2">
        {translations[currentLanguage].selectLanguage}
      </label>
      <select
        id="language"
        value={currentLanguage}
        onChange={(e) => handleLanguageChange(e.target.value as Language)}
        className="px-4 py-2 border rounded-md"
      >
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
      </select>
    </div>
  );
}
