import { motion } from "framer-motion";
import { Crown, Sparkles, ArrowRight, Heart } from "lucide-react";
import { FloatingHearts } from "@/pages/Welcome";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + custom * 0.25,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function FavouritePhoto({ settings, onNext }) {
  const photo = settings?.photo_favourite || "/favourite-photo.jpg";
  const caption =
    settings?.caption_favourite ||
    "Among all the pictures I've ever taken or shared, this one has a special place in my heart. It's more than just a picture; it's a little piece of happiness that I'll always want to look back at. No matter how many new memories come along, this one will remain my forever favourite.";

  return (
    <div className="fav-photo-screen" data-testid="favourite-photo-screen">
      <FloatingHearts opacity={0.7} />
      <div className="fav-photo-container">
        {/* Header */}
        <motion.div
          className="fav-photo-header"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeInUp}
        >
          <span className="eyebrow">
            <Heart size={14} fill="currentColor" strokeWidth={0} /> a picture close to my heart
          </span>
          <h1 className="fav-photo-title">A Picture Close to My Heart</h1>
          <p className="fav-photo-sub">
            Little moments, big memories. And makes life so special.
          </p>
        </motion.div>

        {/* Big Spotlight Centrepiece Card */}
        <motion.div
          className="fav-spotlight-card"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeInUp}
        >
          {/* Satin Ribbon Bow */}
          <div className="fav-bow" aria-hidden="true">
            <svg viewBox="0 0 64 28" width="56" height="26">
              <path d="M2 14 C10 2, 26 4, 30 14 C26 24, 10 26, 2 14 Z" fill="#E56B9F" />
              <path d="M62 14 C54 2, 38 4, 34 14 C38 24, 54 26, 62 14 Z" fill="#E56B9F" />
              <circle cx="32" cy="14" r="6" fill="#C94D80" />
            </svg>
          </div>

          <div className="fav-image-frame">
            <img src={photo} alt="A Picture Close to My Heart" loading="lazy" />
          </div>

          <div className="fav-note-box">
            <div className="fav-note-badge">
              <Sparkles size={13} />
              <span>why this picture is so special to me</span>
            </div>
            <p className="fav-note-text">{caption}</p>
          </div>
        </motion.div>

        {/* Navigation Action */}
        <motion.div
          className="fav-photo-action"
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeInUp}
        >
          <button className="btn-primary" onClick={onNext}>
            <span>Now, let's look back at how it all started</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
