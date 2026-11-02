import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Heart, Headphones, Sparkles } from "lucide-react";
import { getSettings } from "@/lib/api";

export const FLOATERS = [
  { left: "8%", top: "18%", size: 22, dur: 9, delay: 0 },
  { left: "82%", top: "12%", size: 16, dur: 11, delay: 1.2 },
  { left: "16%", top: "68%", size: 14, dur: 10, delay: 0.6 },
  { left: "88%", top: "62%", size: 20, dur: 12, delay: 2 },
  { left: "48%", top: "84%", size: 13, dur: 9.5, delay: 1.6 },
  { left: "68%", top: "32%", size: 12, dur: 10.5, delay: 0.3 },
];

export function FloatingHearts({ opacity = 1 }) {
  return (
    <div className="floaters" style={{ opacity }}>
      {FLOATERS.map((f, i) => (
        <motion.div
          key={i}
          className="floater"
          style={{ left: f.left, top: f.top }}
          animate={{ y: [-14, 14, -14], rotate: [-8, 8, -8] }}
          transition={{
            duration: f.dur,
            delay: f.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart size={f.size} fill="currentColor" strokeWidth={0} />
        </motion.div>
      ))}
      {FLOATERS.slice(0, 4).map((f, i) => (
        <motion.div
          key={`s${i}`}
          className="floater sparkle"
          style={{ left: `calc(${f.left} + 4%)`, top: `calc(${f.top} + 22%)` }}
          animate={{ scale: [0.6, 1.15, 0.6], opacity: [0.3, 0.9, 0.3] }}
          transition={{
            duration: f.dur / 2,
            delay: f.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles size={f.size - 4} />
        </motion.div>
      ))}
    </div>
  );
}

export default function Welcome({ onStart }) {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .catch(() => {});
  }, []);

  const name =
    settings?.name && settings?.name.toLowerCase() !== "sahaana"
      ? settings.name
      : "Snowman";
  const welcomeMessage =
    settings?.welcome_message ||
    "I have a little something to show you, and I hope it makes you smile as much as you've made me smile.";
  const catImage = settings?.cat_image || "/cat-birthday.jpg";

  return (
    <div className="welcome" data-testid="welcome-screen">
      <FloatingHearts />
      <div className="welcome-inner welcome-cat-layout">
        {/* Adorable Birthday Cat Mascot */}
        <motion.div
          className="welcome-cat-wrapper"
          initial={{ opacity: 0, scale: 0.85, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cat-card-frame">
            <span className="cat-floating-sparkle sparkle-top">✨</span>
            <span className="cat-floating-sparkle sparkle-bottom">🎀</span>
            <img src={catImage} alt="Happy Birthday Cat" className="welcome-cat-img" />
          </div>
        </motion.div>

        {/* Text & Action Section */}
        <div className="welcome-content-section">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Sparkles size={14} /> a little surprise, made only for you
          </motion.p>

          <motion.h1
            className="welcome-dear-name"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Dear {name},
          </motion.h1>

          <motion.p
            className="welcome-intro-sub"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
          >
            before anything else —
          </motion.p>

          <motion.div
            className="welcome-message-bubble"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="bubble-quote-mark">&ldquo;</span>
            <p className="welcome-message-text">{welcomeMessage}</p>
            <span className="bubble-quote-mark-end">&rdquo;</span>
          </motion.div>

          <motion.p
            className="welcome-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            headphones on, volume up. this whole page is yours.
          </motion.p>

          <motion.button
            className="btn-start"
            data-testid="start-button"
            onClick={onStart}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.7, ease: "backOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="btn-start-ring">
              <Play size={20} fill="currentColor" strokeWidth={0} />
            </span>
            <span>Start</span>
            <Heart size={16} fill="currentColor" strokeWidth={0} className="btn-heart" />
          </motion.button>

          <motion.div
            className="welcome-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 1 }}
          >
            <Headphones size={14} />
            <span>music begins with your tap — no autoplay surprises</span>
          </motion.div>
        </div>
      </div>
      <div className="welcome-vignette" />
    </div>
  );
}
