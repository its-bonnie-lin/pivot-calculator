import { useState } from "react";

const FIBO = 1.382;

export default function PivotCalculator() {
  const [high, setHigh] = useState("");
  const [low, setLow] = useState("");

  const h = parseFloat(high);
  const l = parseFloat(low);
  const valid = !isNaN(h) && !isNaN(l) && h > l;

  const diff = h - l;
  const upper = l + diff * FIBO;
  const mid = (h + l) / 2;
  const lower = h - diff * FIBO;

  const fmt = (n) =>
    n.toLocaleString("zh-TW", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Courier New', monospace",
      padding: "24px",
    }}>
      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(rgba(0,255,180,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,180,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 420 }}>
        {/* Header */}
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 6, color: "#00ffb4", opacity: 0.6, marginBottom: 8 }}>
            FIBONACCI
          </div>
          <h1 style={{
            fontSize: 28, fontWeight: 900, color: "#fff",
            margin: 0, letterSpacing: 2,
          }}>
            三關價計算器
          </h1>
          <div style={{ fontSize: 11, color: "#888", marginTop: 6, letterSpacing: 1 }}>
            × 1.382 延伸區間
          </div>
        </div>

        {/* Input card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: 28,
          marginBottom: 20,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "最高價", value: high, setter: setHigh, color: "#ff6b6b" },
              { label: "最低價", value: low, setter: setLow, color: "#00ffb4" },
            ].map(({ label, value, setter, color }) => (
              <div key={label}>
                <label style={{ fontSize: 10, letterSpacing: 2, color: "#666", display: "block", marginBottom: 8 }}>
                  {label}
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder="0"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${value ? color + "60" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: 8,
                    padding: "12px 14px",
                    color: value ? color : "#444",
                    fontSize: 18,
                    fontFamily: "'Courier New', monospace",
                    fontWeight: 700,
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                />
              </div>
            ))}
          </div>

          {valid && (
            <div style={{
              marginTop: 16, padding: "8px 12px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: 6,
              fontSize: 12, color: "#666",
              display: "flex", justifyContent: "space-between",
            }}>
              <span>高低落差</span>
              <span style={{ color: "#fff", fontWeight: 700 }}>{fmt(diff)}</span>
            </div>
          )}
        </div>

        {/* Results */}
        {valid ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                label: "上界", sublabel: "壓力位",
                value: upper, color: "#ff6b6b",
                formula: `${fmt(l)} + ${fmt(diff)} × 1.382`,
                bar: 100,
              },
              {
                label: "中軸", sublabel: "均衡點",
                value: mid, color: "#ffd166",
                formula: `(${fmt(h)} + ${fmt(l)}) ÷ 2`,
                bar: ((mid - lower) / (upper - lower)) * 100,
              },
              {
                label: "下界", sublabel: "支撐位",
                value: lower, color: "#00ffb4",
                formula: `${fmt(h)} - ${fmt(diff)} × 1.382`,
                bar: 0,
              },
            ].map(({ label, sublabel, value, color, formula, bar }) => (
              <div key={label} style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${color}30`,
                borderRadius: 12,
                padding: "16px 20px",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Glow bar */}
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0,
                  width: 3, background: color,
                  borderRadius: "12px 0 0 12px",
                }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color, letterSpacing: 1 }}>{label}</span>
                      <span style={{ fontSize: 10, color: "#555", letterSpacing: 1 }}>{sublabel}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#444", fontFamily: "monospace" }}>{formula}</div>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color, letterSpacing: 1 }}>
                    {fmt(value)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center", padding: "32px 0",
            color: "#333", fontSize: 13, letterSpacing: 1,
          }}>
            輸入最高價與最低價以計算
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 24, fontSize: 10, color: "#333", letterSpacing: 2 }}>
          上界 = 低點 + 落差 × 1.382 ｜ 下界 = 高點 − 落差 × 1.382
        </div>
      </div>
    </div>
  );
}
