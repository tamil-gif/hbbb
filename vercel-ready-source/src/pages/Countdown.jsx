import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Heart, PartyPopper, ArrowRight, Sparkles } from "lucide-react";
import { getSettings } from "@/lib/api";

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

function Unit({ value, label }) {
  return (
    <div className="unit" data-testid={`countdown-${label}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="unit-value"
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <span className="unit-label">{label}</span>
    </div>
  );
}

export default function Countdown({ onUnlock }) {
  const [settings, setSettings] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [testMode, setTestMode] = useState(false);
  const [testEnd, setTestEnd] = useState(null);

  useEffect(() => {
    getSettings().then(setSettings).catch(() => setSettings({}));
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, []);

  const realTarget = useMemo(() => {
    if (!settings || !settings.birthday_date) {
      // Default to 2 days in future if not loaded yet
      return Date.now() + 2 * 86400000;
    }
    const parsed = new Date(settings.birthday_date).getTime();
    return isNaN(parsed) ? Date.now() + 2 * 86400000 : parsed;
  }, [settings]);

  const target = testMode && testEnd ? testEnd : realTarget;
  const rawDiff = target ? target - now : null;
  const isExpired = rawDiff !== null && rawDiff <= 0;
  const diff = isExpired ? 0 : rawDiff;

  // Auto-unlock when test mode finishes
  useEffect(() => {
    if (testMode && testEnd && now >= testEnd) {
      onUnlock();
    }
  }, [testMode, testEnd, now, onUnlock]);

  const days = diff !== null ? Math.floor(diff / 86400000) : 0;
  const hours = diff !== null ? Math.floor(diff / 3600000) % 24 : 0;
  const mins = diff !== null ? Math.floor(diff / 60000) % 60 : 0;
  const secs = diff !== null ? Math.floor(diff / 1000) % 60 : 0;

  const prettyDate = useMemo(() => {
    if (!settings?.birthday_date) return "";
    const d = new Date(settings.birthday_date);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }, [settings]);

  const progress =
    testMode && testEnd
      ? Math.min(1, Math.max(0, 1 - (testEnd - now) / 60000))
      : 0;

  return (
    <div className="countdown" data-testid="countdown-screen">
      <div className="countdown-inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {testMode ? "test countdown running" : "something unlocks in"}
        </motion.p>
        <motion.h1
          className="countdown-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {testMode ? "the grand reveal, in one tiny minute" : "until your day arrives"}
        </motion.h1>

        <motion.div
          className="units"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          {testMode ? (
            <>
              <Unit value={pad(mins)} label="minutes" />
              <Unit value={pad(secs)} label="seconds" />
            </>
          ) : (
            <>
              <Unit value={days} label="days" />
              <Unit value={pad(hours)} label="hours" />
              <Unit value={pad(mins)} label="minutes" />
              <Unit value={pad(secs)} label="seconds" />
            </>
          )}
        </motion.div>

        {!testMode && (
          <motion.p
            className="countdown-date"
            data-testid="countdown-date"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            {prettyDate
              ? `unlocking at exactly ${prettyDate} — refreshed or reopened, it never resets`
              : "counting down to your special day..."}
          </motion.p>
        )}

        {testMode && (
          <div className="test-progress" data-testid="test-progress">
            <div className="test-progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>
        )}

        {/* Quick Unlock Button for Previewing & Testing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{ marginTop: 22, display: "flex", justifyContent: "center" }}
        >
          <button className="btn-primary" onClick={onUnlock}>
            <span>{isExpired ? "It's Time! Open Surprise" : "Unlock & View Surprise"}</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>

        {/* Test Mode Switch */}
        <motion.div
          className="test-mode"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <label className="switch" data-testid="test-mode-switch">
            <input
              type="checkbox"
              checked={testMode}
              onChange={(e) => {
                setTestMode(e.target.checked);
                if (e.target.checked) setTestEnd(Date.now() + 60000);
                else setTestEnd(null);
              }}
            />
            <span className="slider" />
          </label>
          <div className="test-mode-text">
            <span className="test-mode-title">
              <FlaskConical size={14} /> Test mode (1 minute)
            </span>
            <span className="test-mode-sub">
              Runs a 60-second preview countdown with progress bar
            </span>
          </div>
        </motion.div>

        <motion.div
          className="countdown-foot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <Heart size={13} fill="currentColor" strokeWidth={0} />
          <span>stay here — at midnight (or minute zero), the magic begins</span>
          <PartyPopper size={13} />
        </motion.div>
      </div>
    </div>
  );
}
