import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, ArrowRight, Users } from "lucide-react";
import { FloatingHearts } from "@/pages/Welcome";
import { music } from "@/components/MusicPlayer";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.94 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function PhotoCollage({ settings, onNext }) {
  useEffect(() => {
    // Ensure music starts playing from the second page
    music.play();
  }, []);

  const p1 = settings?.collage_photo_1 || "/collage-1.jpg";
  const p2 = settings?.collage_photo_2 || "/collage-2.jpg";
  const p3 = settings?.collage_photo_3 || "/collage-3.jpg";
  const p4 = settings?.collage_photo_4 || "/collage-4.jpg";
  const p5 = settings?.collage_photo_5 || "/collage-5.jpg";

  return (
    <div className="collage-screen" data-testid="photo-collage-screen">
      <FloatingHearts opacity={0.65} />
      <div className="collage-container">
        {/* Header */}
        <motion.div
          className="collage-header"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">
            <Sparkles size={14} /> a scrapbook of pure happiness
          </span>
          <h1 className="collage-title">Pieces of Our Story</h1>
          <p className="collage-sub">
            Every candid smile, chaotic night, and sweet little memory we never want to forget.
          </p>
        </motion.div>

        {/* The Scrapbook Photo Collage Grid */}
        <div className="scrapbook-board">
          {/* Photo 1: Blush Selfie */}
          <motion.div
            className="polaroid-item polaroid-p1"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 12 }}
          >
            <div className="washi-tape washi-tape-pink" />
            <div className="polaroid-img-box">
              <img src={p1} alt="Sweet smile" loading="lazy" />
            </div>
            <span className="polaroid-script-caption">that radiant smile 🌸</span>
          </motion.div>

          {/* Photo 2: The Gang (Centerpiece) */}
          <motion.div
            className="polaroid-item polaroid-p2"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 12 }}
          >
            <div className="washi-tape washi-tape-gold" />
            <div className="polaroid-gang-tag">
              <Users size={12} />
              <span>Three City Chaos 🛵✨</span>
            </div>
            <div className="polaroid-img-box polaroid-gang-box">
              <img src={p2} alt="Three City Chaos Gang" loading="lazy" />
            </div>
            <span className="polaroid-script-caption">our crazy night outs with the gang ❤️</span>
          </motion.div>

          {/* Photo 3: Playful Helmet Candid */}
          <motion.div
            className="polaroid-item polaroid-p3"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 12 }}
          >
            <div className="washi-tape washi-tape-mint" />
            <div className="polaroid-img-box">
              <img src={p3} alt="Helmet candid" loading="lazy" />
            </div>
            <span className="polaroid-script-caption">helmet fit check 😂🪖</span>
          </motion.div>

          {/* Photo 4: Cafe Smiling Eyes Closed with 'Favorite person' sticker on top-right */}
          <motion.div
            className="polaroid-item polaroid-p4"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 12 }}
          >
            {/* 'Favorite person ⤵' sticker pinned on top-right */}
            <div className="favorite-person-badge">
              <img
                src="/favorite-person-sticker.jpg"
                alt="Favorite person"
                className="fav-person-sticker-img"
              />
            </div>
            <div className="washi-tape washi-tape-rose" />
            <div className="polaroid-img-box polaroid-landscape-box">
              <img src={p4} alt="Peaceful smiles" loading="lazy" />
            </div>
            <span className="polaroid-script-caption">pure peace & cute giggles ☕🤍</span>
          </motion.div>

          {/* Photo 5: The White Dress Memory */}
          <motion.div
            className="polaroid-item polaroid-p5"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 12 }}
          >
            <div className="washi-tape washi-tape-lavender" />
            <div className="polaroid-img-box">
              <img src={p5} alt="White dress moment" loading="lazy" />
            </div>
            <span className="polaroid-script-caption">andha white dress memory 🍦✨</span>
          </motion.div>
        </div>

        {/* Adorable Cat Making Heart with Paws Sticker */}
        <motion.div
          className="cat-heart-paws-section"
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8, ease: "backOut" }}
          whileHover={{ scale: 1.06 }}
        >
          <div className="cat-heart-frame">
            <img
              src="/cat-heart-paws.jpg"
              alt="Cat making heart with paws"
              className="cat-heart-paws-img"
            />
            <span className="cat-heart-sparkle">💖</span>
          </div>
        </motion.div>

        {/* Next Page Transition Button */}
        <motion.div
          className="collage-action-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8 }}
        >
          <button className="btn-primary collage-next-btn" onClick={onNext}>
            <span>Continue to Our Little Moments</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
