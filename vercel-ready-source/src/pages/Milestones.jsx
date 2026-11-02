import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Code2,
  MessageCircleHeart,
  PhoneCall,
  HeartHandshake,
  Heart,
  Quote,
} from "lucide-react";
import { FloatingHearts } from "@/pages/Welcome";

export const DEFAULT_MILESTONES = [
  {
    id: "m1",
    date: "First milestone",
    tag: "C++ Lab",
    title: "1. The Day We First Met",
    description: "It was in C++ lab, you asked for help — that's where it all began.",
    quote: "Who knew that one ordinary day would become the beginning of so many memories?",
  },
  {
    id: "m2",
    date: "A New Spark",
    tag: "Hackathon Team",
    title: "2. Our First Conversation",
    description: 'It was about the hackathon. Like you said, "yes, we can do it as a group!"',
    quote: "It started with a simple conversation, but little did we know how many more conversations would follow.",
  },
  {
    id: "m3",
    date: "11/07/26 (2:55 PM)",
    tag: "First Call",
    title: "3. Our First Call",
    description: "Our very first phone call at 2:55 PM.",
    quote: "From texting to actually hearing each other's voices. Another little memory worth keeping.",
  },
  {
    id: "m4",
    date: "Unforgettable Moments",
    tag: "Con Calls & Reconnecting",
    title: "4. And Then Came So Many Memories",
    description: "The conference calls, endless laughs, and meeting as friends for the first time after my accident.",
    quote: "More conversations, random laughs, unforgettable moments and a friendship that kept growing.",
  },
  {
    id: "m5",
    date: "Today & Always",
    tag: "Forever Friends",
    title: "5. Today, Here We Are",
    description: "Standing right here, celebrating you and the friendship that means the world to me.",
    quote: "And this is just another chapter in our story. So many more memories are waiting to be made.",
  },
];

const getMilestoneIcon = (index) => {
  switch (index) {
    case 0:
      return <Code2 size={20} />;
    case 1:
      return <MessageCircleHeart size={20} />;
    case 2:
      return <PhoneCall size={20} />;
    case 3:
      return <HeartHandshake size={20} />;
    case 4:
      return <Heart size={20} fill="currentColor" strokeWidth={0} />;
    default:
      return <Sparkles size={20} />;
  }
};

export default function Milestones({ milestones, onComplete }) {
  const items =
    milestones && milestones.length ? milestones : DEFAULT_MILESTONES;

  return (
    <div className="timegraph-screen" data-testid="milestones-screen">
      <FloatingHearts opacity={0.65} />
      <div className="timegraph-container">
        {/* Header */}
        <motion.div
          className="timegraph-header"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">
            <Sparkles size={14} /> our friendship journey
          </span>
          <h1 className="timegraph-title">
            Every friendship has a beginning. Here&apos;s ours.
          </h1>
          <p className="timegraph-sub">
            From a C++ lab question to an unbreakable bond — a timeline of moments that made us best friends.
          </p>
        </motion.div>

        {/* Time Graph Roadmap */}
        <div className="timegraph-timeline">
          <div className="timegraph-spine" />

          {items.map((m, idx) => {
            const stepNum = String(idx + 1).padStart(2, "0");
            return (
              <motion.div
                key={m.id || idx}
                className="timegraph-item"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + idx * 0.16,
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Node with pulsing ring & icon */}
                <div className="timegraph-node-col">
                  <div className="timegraph-node">
                    <span className="timegraph-node-icon">
                      {getMilestoneIcon(idx)}
                    </span>
                    <span className="timegraph-node-pulse" />
                  </div>
                  <span className="timegraph-step-badge">{stepNum}</span>
                </div>

                {/* Milestone Memory Card */}
                <div className="timegraph-card">
                  <div className="timegraph-card-header">
                    <span className="timegraph-date-pill">
                      <Sparkles size={12} />
                      <span>{m.date || `Chapter ${idx + 1}`}</span>
                    </span>
                    {m.tag && (
                      <span className="timegraph-tag-pill">{m.tag}</span>
                    )}
                  </div>

                  <h2 className="timegraph-card-title">{m.title}</h2>

                  {m.photo && (
                    <div className="timegraph-photo-wrap">
                      <img src={m.photo} alt={m.title} loading="lazy" />
                      {m.caption && (
                        <span className="timegraph-photo-caption">
                          {m.caption}
                        </span>
                      )}
                    </div>
                  )}

                  {m.description && (
                    <p className="timegraph-card-desc">{m.description}</p>
                  )}

                  {m.quote && (
                    <div className="timegraph-quote-box">
                      <span className="timegraph-quote-glyph">&ldquo;</span>
                      <p className="timegraph-quote-text">{m.quote}</p>
                      <span className="timegraph-quote-glyph-end">&rdquo;</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Finale Transition Callout */}
        <motion.div
          className="timegraph-finale-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8, ease: "backOut" }}
        >
          <div className="timegraph-finale-sparkle">🎂</div>
          <span className="eyebrow">
            <Heart size={13} fill="currentColor" strokeWidth={0} /> and now, the celebration begins
          </span>
          <h2 className="timegraph-finale-title">
            &ldquo;And the best part? Our story is still being written...&rdquo;
          </h2>
          <p className="timegraph-finale-sub">
            Our story is only just beginning. A little something from my heart, written just for you.
          </p>
          <button
            className="btn-primary timegraph-action-btn"
            onClick={onComplete}
          >
            <span>Open Final Birthday Surprise</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
