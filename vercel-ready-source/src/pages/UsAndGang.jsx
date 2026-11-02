import { motion } from "framer-motion";
import { Heart, Sparkles, ArrowRight, Camera, Users } from "lucide-react";
import { FloatingHearts } from "@/pages/Welcome";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + custom * 0.2,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function UsAndGang({ settings, onNext }) {
  const photoYouAndHer = settings?.photo_you_and_her || "/you-and-her.jpg";
  const captionYouAndHer = settings?.caption_you_and_her || "You and me, always creating memories";
  const photoGroup = settings?.photo_group || "";
  const captionGroup = settings?.caption_group || "";

  const hasGroup = Boolean(photoGroup && photoGroup.trim());

  return (
    <div className="us-gang-screen" data-testid="us-gang-screen">
      <FloatingHearts opacity={0.65} />
      <div className="us-gang-container">
        {/* Header */}
        <motion.div
          className="us-gang-header"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeInUp}
        >
          <span className="eyebrow">
            <Sparkles size={14} /> our favorite snapshots
          </span>
          <h1 className="us-gang-title">Little moments, big memories</h1>
          <p className="us-gang-sub">Makes life so special.</p>
        </motion.div>

        {/* Showcase Cards: Single 'You and Me alone' by default */}
        {hasGroup ? (
          <div className="us-gang-grid">
            {/* Card 1: You & Her */}
            <motion.div
              className="polaroid-showcase polaroid-tilt-left"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeInUp}
              whileHover={{ rotate: 0, scale: 1.03 }}
            >
              <div className="washi-tape" />
              <div className="polaroid-badge">
                <Heart size={13} fill="currentColor" strokeWidth={0} />
                <span>You & Me</span>
              </div>
              <div className="polaroid-image-wrap">
                {photoYouAndHer ? (
                  <img src={photoYouAndHer} alt="You and Her" loading="lazy" />
                ) : (
                  <div className="polaroid-placeholder">
                    <Camera size={32} />
                    <span>Upload your photo in /admin</span>
                  </div>
                )}
              </div>
              <span className="polaroid-handwritten">{captionYouAndHer}</span>
            </motion.div>

            {/* Card 2: The Gang / Group */}
            <motion.div
              className="polaroid-showcase polaroid-tilt-right"
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeInUp}
              whileHover={{ rotate: 0, scale: 1.03 }}
            >
              <div className="washi-tape washi-right" />
              <div className="polaroid-badge">
                <Users size={13} />
                <span>Our Circle</span>
              </div>
              <div className="polaroid-image-wrap">
                <img src={photoGroup} alt="The Gang" loading="lazy" />
              </div>
              <span className="polaroid-handwritten">{captionGroup}</span>
            </motion.div>
          </div>
        ) : (
          <div className="single-polaroid-layout">
            <motion.div
              className="polaroid-showcase polaroid-single"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeInUp}
              whileHover={{ rotate: 0, scale: 1.02 }}
            >
              <div className="washi-tape" />
              <div className="polaroid-badge">
                <Heart size={14} fill="currentColor" strokeWidth={0} />
                <span>You & Me</span>
              </div>
              <div className="polaroid-image-wrap">
                {photoYouAndHer ? (
                  <img src={photoYouAndHer} alt="You and Her" loading="lazy" />
                ) : (
                  <div className="polaroid-placeholder">
                    <Camera size={32} />
                    <span>Upload your photo in /admin</span>
                  </div>
                )}
              </div>
              <span className="polaroid-handwritten">{captionYouAndHer}</span>
            </motion.div>
          </div>
        )}

        {/* Next Button */}
        <motion.div
          className="us-gang-action"
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeInUp}
        >
          <button className="btn-primary" onClick={onNext}>
            <span>There's one more picture I need you to see</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
