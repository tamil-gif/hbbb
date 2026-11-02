import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight } from "lucide-react";
import { getSettings } from "@/lib/api";
import { FloatingHearts } from "@/pages/Welcome";

const line = {
  hidden: { y: "115%" },
  show: (i) => ({
    y: "0%",
    transition: { delay: 0.5 + i * 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Reveal({ onFinish }) {
  const [name, setName] = useState("Sahaana");
  const [canContinue, setCanContinue] = useState(false);

  useEffect(() => {
    getSettings()
      .then((s) => s.name && setName(s.name))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const colors = ["#F9A8C9", "#E56B9F", "#FFD9E8", "#FFf", "#F6C453"];
    const t1 = setTimeout(
      () =>
        confetti({
          particleCount: 160,
          spread: 100,
          origin: { y: 0.6 },
          colors,
        }),
      400
    );
    const t2 = setTimeout(
      () =>
        confetti({
          particleCount: 90,
          angle: 60,
          spread: 70,
          origin: { x: 0, y: 0.7 },
          colors,
        }),
      900
    );
    const t3 = setTimeout(
      () =>
        confetti({
          particleCount: 90,
          angle: 120,
          spread: 70,
          origin: { x: 1, y: 0.7 },
          colors,
        }),
      1200
    );
    const t4 = setInterval(
      () =>
        confetti({
          particleCount: 24,
          spread: 60,
          startVelocity: 22,
          origin: { x: Math.random(), y: -0.05 },
          gravity: 0.5,
          scalar: 0.8,
          colors,
        }),
      1400
    );
    const t5 = setTimeout(() => setCanContinue(true), 5200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  return (
    <div className="reveal" data-testid="reveal-screen">
      <div className="reveal-glow" />
      <FloatingHearts opacity={0.85} />
      <div className="reveal-inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Sparkles size={14} /> it's finally here
        </motion.p>
        <h1 className="reveal-title">
          {["Happy", "Birthday,"].map((w, i) => (
            <span className="mask-line" key={w}>
              <motion.span
                className="mask-inner"
                custom={i}
                variants={line}
                initial="hidden"
                animate="show"
              >
                {w}
              </motion.span>
            </span>
          ))}
          <span className="mask-line">
            <motion.span
              className="mask-inner script-name"
              custom={2}
              variants={line}
              initial="hidden"
              animate="show"
            >
              {name}
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="cake-wrap"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          data-testid="birthday-cake"
        >
          <div className="cake">
            <div className="candles">
              {[0, 1, 2].map((i) => (
                <div className="candle" key={i} style={{ "--d": `${i * 0.4}s` }}>
                  <div className="flame" />
                </div>
              ))}
            </div>
            <div className="cake-layer cake-top" />
            <div className="cake-layer cake-mid" />
            <div className="cake-layer cake-base" />
            <div className="cake-plate" />
          </div>
        </motion.div>

        <motion.button
          className="btn-start btn-reveal-continue"
          data-testid="reveal-continue"
          onClick={onFinish}
          initial={{ opacity: 0, y: 20 }}
          animate={canContinue ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span>Step inside your surprise</span>
          <ArrowRight size={16} />
        </motion.button>
      </div>
      <canvas className="confetti-canvas" id="reveal-confetti" />
    </div>
  );
}
