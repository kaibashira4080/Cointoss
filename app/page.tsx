"use client";

import { useState, useEffect } from "react";

type CoinResult = "heads" | "tails" | null;

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<CoinResult>(null);
  const [headsText, setHeadsText] = useState("");
  const [tailsText, setTailsText] = useState("");

  // Initialize theme from system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const tossCoin = () => {
    setIsSpinning(true);
    setResult(null);

    // Spin for a random duration between 1-2 seconds
    const spinDuration = 1000 + Math.random() * 1000;

    setTimeout(() => {
      setIsSpinning(false);
      const coinResult: CoinResult = Math.random() < 0.5 ? "heads" : "tails";
      setResult(coinResult);
    }, spinDuration);
  };

  return (
    <div className="container">
      {/* Theme Toggle */}
      <header className="header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="テーマ切替"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      {/* Main Content */}
      <main className="main">
        <h1 className="title">コイントス</h1>
        <p className="subtitle">運命に任せて決めよう</p>

        {/* Coin */}
        <div className="coin-container">
          <div className={`coin ${isSpinning ? "spinning" : ""}`}>
            {result === "heads" ? "表" : result === "tails" ? "裏" : "？"}
          </div>
          <div className="coin-result">
            {result === "heads" && "表が出ました！"}
            {result === "tails" && "裏が出ました！"}
          </div>
        </div>

        {/* Toss Button */}
        <button
          className="toss-button"
          onClick={tossCoin}
          disabled={isSpinning}
        >
          {isSpinning ? "回転中..." : "コインを投げる"}
        </button>

        {/* Input Sections */}
        <div className="inputs-container">
          {/* Heads Input */}
          <div
            className={`input-section ${result === "heads" ? "highlighted" : ""
              }`}
          >
            <label className="input-label">
              <span className="input-label-icon">⭕</span>
              表が出たら
            </label>
            <input
              type="text"
              className="text-input"
              placeholder="例: ラーメンを食べる"
              value={headsText}
              onChange={(e) => setHeadsText(e.target.value)}
            />
          </div>

          {/* Tails Input */}
          <div
            className={`input-section ${result === "tails" ? "highlighted" : ""
              }`}
          >
            <label className="input-label">
              <span className="input-label-icon">❌</span>
              裏が出たら
            </label>
            <input
              type="text"
              className="text-input"
              placeholder="例: カレーを食べる"
              value={tailsText}
              onChange={(e) => setTailsText(e.target.value)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
