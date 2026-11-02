import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, RotateCcw, Image as ImageIcon } from "lucide-react";
import { FloatingHearts } from "@/pages/Welcome";

export default function FinalWish({ settings, onRestart }) {
  const name = settings?.name || "Sahaana";
  const photoPookie = settings?.photo_pookie || "";
  const captionPookie = settings?.caption_pookie || "our cute pookie energy 🎀✨";
  const letter =
    settings?.final_letter ||
    `Happiest birthday to my most incredible friend in the world! ❤️

From the day we first started talking to all the chaos, adventures, late-night calls, random conversations and little fights, you've made my life so much more beautiful.

Namma first meet aanadhe C++ lab-la dhaan. Nee enkitta oru coding-related help ketta, and honestly, adhu dhaan namma first conversation. Andha naal nee white dress potirundha. Adhukkapparam C++ lab mudichittu, class-la irukkumbodhu hackathon pathi pesittu irundhom. Appo namma oru group create pannalama nu pesinom. Naan ketadhukku, "Fine, that's okay, let's do it as a group" nu sonna. Appadi dhaan namma group start aachu.

Adhukkapparam naalu perum serndhu namma "Three City Chaos" nu oru group start pannom. Random conversations, assignments upload panradhu, doubts kekkuradhu, orutharukku oruthar help pannikiradhu nu days pochu.

And then enakku accident aachu. Andha two weeks naan veetla irundha time-la, night daily nee, naan, Ranjan moonu perum calls-la pesittu iruppom. Late-night random talks, teasing each other, sirichittu irukkuradhu, namma life-la nadakkura vishayangalai share pannikiradhu, everything! Chinna chinna sandai, teasing, silence, arguments nu ellame irundhuchu. But indha little little moments dhaan namma friendship-ah innum closer aakuchu.

No matter how many little fights, misunderstandings, silences or crazy moments come our way, I want you to know that I'll always be there for you. Whenever life gets difficult, I'll be there to lift you up, support you and remind you that you are never alone. I don't know what the future holds for us, but one thing I genuinely wish for is to have you by my side till the very end, as your best friend. Not just today, not just for a few years, but for a lifetime. Happiest birthday once again, Sahaana! ❤️`;

  useEffect(() => {
    const colors = ["#F9A8C9", "#E56B9F", "#FFD9E8", "#FFF", "#F6C453"];

    // Initial big burst
    const t1 = setTimeout(() => {
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.5 },
        colors,
      });
    }, 300);

    // Left cannon
    const t2 = setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0.05, y: 0.7 },
        colors,
      });
    }, 800);

    // Right cannon
    const t3 = setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 0.95, y: 0.7 },
        colors,
      });
    }, 1200);

    // Continuous celebration shower
    const t4 = setInterval(() => {
      confetti({
        particleCount: 18,
        spread: 60,
        startVelocity: 20,
        origin: { x: Math.random(), y: -0.05 },
        gravity: 0.5,
        scalar: 0.8,
        colors,
      });
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(t4);
    };
  }, []);

  return (
    <div className="final-wish-screen" data-testid="final-wish-screen">
      <FloatingHearts opacity={0.7} />
      <div className="final-wish-container">
        {/* Animated 3-Tier Cake */}
        <motion.div
          className="cake-wrap"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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

        {/* Heading */}
        <motion.div
          className="final-wish-head"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="eyebrow">
            <Sparkles size={14} /> made with all my heart
          </span>
          <h1 className="final-wish-title">Happy Birthday, {name}!</h1>
        </motion.div>

        {/* Pookie Pinterest Card */}
        {photoPookie && (
          <motion.div
            className="pookie-card-wrap"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="pookie-card">
              <span className="pookie-sticker-star">✨</span>
              <span className="pookie-sticker-bow">🎀</span>
              <img src={photoPookie} alt="Pookie memory" loading="lazy" />
              <span className="pookie-caption">{captionPookie}</span>
            </div>
          </motion.div>
        )}

        {/* Heartfelt Letter Card */}
        <motion.div
          className="final-letter-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="letter-bow" aria-hidden="true">
            <svg viewBox="0 0 64 28" width="52" height="24">
              <path d="M2 14 C10 2, 26 4, 30 14 C26 24, 10 26, 2 14 Z" fill="#E56B9F" />
              <path d="M62 14 C54 2, 38 4, 34 14 C38 24, 54 26, 62 14 Z" fill="#E56B9F" />
              <circle cx="32" cy="14" r="6" fill="#C94D80" />
            </svg>
          </div>
          <div className="letter-body">
            {letter
              .split(/\n\s*\n/)
              .filter((p) => p.trim())
              .map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
          </div>
          <div className="letter-signature">
            <span>Always your best friend</span>
            <Heart size={16} fill="currentColor" strokeWidth={0} />
          </div>
        </motion.div>

        {/* Replay Action */}
        <motion.div
          className="final-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <button className="btn-ghost" onClick={onRestart}>
            <RotateCcw size={15} /> Relive Our Memories
          </button>
        </motion.div>
      </div>
    </div>
  );
}
