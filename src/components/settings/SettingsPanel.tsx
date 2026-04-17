"use client";
import { useSettingsContext } from "@/context/SettingsContext";
import { FONT_OPTIONS, FONT_SIZE_RANGE, TRANSLATION_OPTIONS } from "@/lib/constants";
import { RotateCcw } from "lucide-react";
import type { AppSettings } from "@/types";

export function SettingsPanel() {
  const { settings, updateSetting, resetSettings } = useSettingsContext();

  return (
    <div className="p-4 space-y-6">
      {/* Arabic Font */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Arabic Font</label>
        <div className="space-y-2">
          {FONT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateSetting("arabicFont", opt.value as AppSettings["arabicFont"])}
              className={`cursor-pointer w-full text-left rounded-md border px-3 py-2 text-sm transition-colors ${
                settings.arabicFont === opt.value
                  ? "border-primary bg-primary-light text-primary"
                  : "border-border hover:border-gray-300"
              }`}
            >
              <span className="font-medium">{opt.label}</span>
              <span className="text-gray-400 ml-1">&mdash; {opt.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Arabic Font Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Arabic Font Size: {settings.arabicFontSize}px
        </label>
        <input
          type="range"
          min={FONT_SIZE_RANGE.arabic.min}
          max={FONT_SIZE_RANGE.arabic.max}
          step={FONT_SIZE_RANGE.arabic.step}
          value={settings.arabicFontSize}
          onChange={(e) => updateSetting("arabicFontSize", Number(e.target.value))}
          className="cursor-pointer w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{FONT_SIZE_RANGE.arabic.min}px</span>
          <span>{FONT_SIZE_RANGE.arabic.max}px</span>
        </div>
      </div>

      {/* Translation Font Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Translation Font Size: {settings.translationFontSize}px
        </label>
        <input
          type="range"
          min={FONT_SIZE_RANGE.translation.min}
          max={FONT_SIZE_RANGE.translation.max}
          step={FONT_SIZE_RANGE.translation.step}
          value={settings.translationFontSize}
          onChange={(e) => updateSetting("translationFontSize", Number(e.target.value))}
          className="cursor-pointer w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{FONT_SIZE_RANGE.translation.min}px</span>
          <span>{FONT_SIZE_RANGE.translation.max}px</span>
        </div>
      </div>

      {/* Translation Language */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Translation Language</label>
        <div className="space-y-2">
          {TRANSLATION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateSetting("translationLang", opt.value as AppSettings["translationLang"])}
              className={`cursor-pointer w-full text-left rounded-md border px-3 py-2 text-sm transition-colors ${
                settings.translationLang === opt.value
                  ? "border-primary bg-primary-light text-primary"
                  : "border-border hover:border-gray-300"
              }`}
            >
              <span className="font-medium">{opt.label}</span>
              <span className="text-gray-400 ml-1">&mdash; {opt.source}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-md border border-border p-3">
        <p className="text-xs text-gray-400 mb-2">Preview</p>
        <p
          className={`arabic-text transition-font font-${settings.arabicFont === "noto-naskh" ? "noto-naskh" : settings.arabicFont}`}
          dir="rtl"
          lang="ar"
          style={{ fontSize: `${settings.arabicFontSize}px`, fontFamily: settings.arabicFont === "amiri" ? '"Amiri", serif' : settings.arabicFont === "scheherazade" ? '"Scheherazade New", serif' : '"Noto Naskh Arabic", sans-serif' }}
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>
      </div>

      {/* Reset */}
      <button
        onClick={resetSettings}
        className="cursor-pointer flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset to defaults
      </button>
    </div>
  );
}
