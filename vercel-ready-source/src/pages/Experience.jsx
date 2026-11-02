import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X, Crown, ArrowDown } from "lucide-react";
import { getSettings, getPhotos, fileUrl } from "@/lib/api";
import { MaskedLines, FloatingHearts } from "@/pages/Welcome";

const revealUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

const ROT = [-3, 2, -1.5, 3, -2, 1.5];

function Marquee() {
  const items = ["happy birthday", "sahaana", "make a wish", "you are loved", "shine on"];
  const Track = ({ ariaHidden }) => (
    <div className="marquee-track" aria-hidden={ariaHidden}>
      {items.map((t, i) => (
        <span className="marquee-item" key={i}>
          {t}
          <Sparkles size={14} className="marquee-spark" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee" data-testid="marquee">
      <Track ariaHidden={false} />
      <Track ariaHidden />
    </div>
  );
}

function Gallery({ photos, onOpen }) {
  if (!photos.length) {
    return (
      <div className="gallery-empty" data-testid="gallery-empty">
        <Heart size={22} />
        <p>No photos yet.</p>
        <small>
          Open <code>/admin</code> to upload your favourites from your phone,
          pick the one special photo, and add captions.
        </small>
      </div>
    );
  }
  return (
    <div className="polaroid-grid">
      {photos.map((p, i) => (
        <motion.button
          key={p.id}
          className="polaroid"
          data-testid={`polaroid-${p.id}`}
          style={{ "--rot": `${ROT[i % ROT.length]}deg` }}
          onClick={() => onOpen(p)}
          initial={{ opacity: 0, y: 50, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: ROT[i % ROT.length] }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ rotate: 0, scale: 1.04, zIndex: 5 }}
        >
          {p.is_favourite && (
            <span className="polaroid-fav">
              <Crown size={13} /> favourite
            </span>
          )}
          <img src={fileUrl(p.url)} alt={p.caption || "memory"} loading="lazy" />
          <span className="polaroid-caption">{p.caption || "a little memory"}</span>
          {p.date && <span className="polaroid-date">{p.date}</span>}
        </motion.button>
      ))}
    </div>
  );
}

function Timeline({ items }) {
  if (!items || !items.length) return null;
  return (
    <div className="timeline">
      {items.map((t, i) => (
        <motion.div
          className="timeline-item"
          key={i}
          initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="timeline-dot">
            <Heart size={12} fill="currentColor" strokeWidth={0} />
          </span>
          <div className="timeline-card">
            {t.date && <span className="timeline-date">{t.date}</span>}
            <h4>{t.title}</h4>
            {t.description && <p>{t.description}</p>}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Experience() {
  const [settings, setSettings] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const { scrollY } = useScroll();
  const parallaxSlow = useTransform(scrollY, [0, 900], [0, -70]);
  const parallaxFast = useTransform(scrollY, [0, 900], [0, -160]);

  useEffect(() => {
    Promise.all([getSettings(), getPhotos()])
      .then(([s, p]) => {
        setSettings(s);
        setPhotos(p);
      })
      .catch(() => {});
  }, []);

  const name = settings?.name || "Sahaana";
  const favourite = photos.find((p) => p.is_favourite);
  const others = photos.filter((p) => !p.is_favourite);

  return (
    <div className="experience" data-testid="experience-screen">
      <section className="exp-hero">
        <FloatingHearts />
        <div className="exp-hero-inner">
          <motion.p className="eyebrow" {...revealUp} transition={{ ...revealUp.transition, delay: 0.1 }}>
            welcome to your surprise
          </motion.p>
          <MaskedLines
            as="h1"
            className="exp-hero-title"
            lines={["Happy Birthday,", name]}
          />
          <motion.p className="exp-hero-sub" {...revealUp} transition={{ ...revealUp.transition, delay: 1.4 }}>
            scroll slowly. every part of this was made for you.
          </motion.p>
        </div>
        <motion.div
          className="scroll-hint"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </section>

      <Marquee />

      {favourite && (
        <section className="section favourite-section" data-testid="favourite-section">
          <motion.div className="spotlight" {...revealUp}>
            <motion.div
              className="fav-frame"
              style={{ y: parallaxSlow }}
              data-testid="favourite-photo"
            >
              <div className="fav-bow" aria-hidden="true">
                <svg viewBox="0 0 64 28" width="52" height="24">
                  <path d="M2 14 C10 2, 26 4, 30 14 C26 24, 10 26, 2 14 Z" fill="#E56B9F" />
                  <path d="M62 14 C54 2, 38 4, 34 14 C38 24, 54 26, 62 14 Z" fill="#E56B9F" />
                  <circle cx="32" cy="14" r="6" fill="#C94D80" />
                </svg>
              </div>
              <img src={fileUrl(favourite.url)} alt={favourite.caption || "my favourite"} />
            </motion.div>
            <motion.div className="fav-text" {...revealUp}>
              <span className="fav-tag">
                <Crown size={13} /> my favourite photo, ever
              </span>
              <p className="fav-caption">{settings?.favourite_caption}</p>
            </motion.div>
          </motion.div>
        </section>
      )}

      <section className="section gallery-section" data-testid="gallery-section">
        <motion.h2 className="section-title" {...revealUp}>
          our little scrapbook
        </motion.h2>
        <motion.p className="section-sub" {...revealUp}>
          tap any polaroid to see it up close
        </motion.p>
        <Gallery photos={others} onOpen={setLightbox} />
      </section>

      <section className="section meet-section" data-testid="meet-section">
        <motion.h2 className="section-title" {...revealUp}>
          {settings?.meet_heading || "The Day Our Paths Crossed..."}
        </motion.h2>
        {settings?.meet_date && (
          <motion.p className="meet-date" {...revealUp} data-testid="meet-date">
            {settings.meet_date}
          </motion.p>
        )}
        {settings?.meet_message && (
          <motion.p className="meet-message" {...revealUp} data-testid="meet-message">
            {settings.meet_message}
          </motion.p>
        )}
        <Timeline items={settings?.timeline} />
      </section>

      <footer className="footer">
        <span>
          made with <Heart size={13} fill="currentColor" strokeWidth={0} /> for{" "}
          {name}
        </span>
      </footer>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
            data-testid="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.figure
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={fileUrl(lightbox.url)} alt={lightbox.caption || "memory"} />
              <figcaption>
                {lightbox.caption && <span>{lightbox.caption}</span>}
                {lightbox.date && <small>{lightbox.date}</small>}
              </figcaption>
            </motion.figure>
            <button className="lightbox-close" aria-label="Close">
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
