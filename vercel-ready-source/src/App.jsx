import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import "@/App.css";
import MusicPlayer, { music } from "@/components/MusicPlayer";
import Welcome from "@/pages/Welcome";
import PhotoCollage from "@/pages/PhotoCollage";
import Countdown from "@/pages/Countdown";
import UsAndGang from "@/pages/UsAndGang";
import FavouritePhoto from "@/pages/FavouritePhoto";
import Milestones from "@/pages/Milestones";
import FinalWish from "@/pages/FinalWish";
import Admin from "@/pages/Admin";
import { getSettings } from "@/lib/api";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }
  static getDerivedStateFromError(e) {
    return { err: e };
  }
  render() {
    if (this.state.err) {
      return (
        <div className="error-screen" data-testid="error-boundary">
          <p>Something went wrong.</p>
          <small>{String(this.state.err)}</small>
        </div>
      );
    }
    return this.props.children;
  }
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function Site() {
  const [phase, setPhase] = useState("welcome");
  const [settings, setSettings] = useState(null);
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return localStorage.getItem("unlocked") === "1";
    } catch {
      return false;
    }
  });
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  const refreshSettings = () => {
    getSettings().then(setSettings).catch(() => {});
  };

  useEffect(refreshSettings, []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const link =
      document.querySelector("link[rel~='icon']") ||
      document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = "/favicon.svg";
    document.head.appendChild(link);
    if (settings?.name) {
      document.title = `For ${settings.name} — Happy Birthday`;
    }
  }, [settings?.name]);

  const start = () => {
    music.play();
    setPhase("collage");
  };

  const unlock = () => {
    localStorage.setItem("unlocked", "1");
    setUnlocked(true);
    setPhase("collage");
  };

  if (isAdmin) return <Admin />;

  return (
    <div className="site">
      <MusicPlayer />
      {phase === "welcome" && <Welcome onStart={start} />}
      {phase === "collage" && (
        <PhotoCollage settings={settings} onNext={() => setPhase("us_and_gang")} />
      )}
      {phase === "us_and_gang" && (
        <UsAndGang settings={settings} onNext={() => setPhase("favourite")} />
      )}
      {phase === "favourite" && (
        <FavouritePhoto settings={settings} onNext={() => setPhase("milestones")} />
      )}
      {phase === "milestones" && (
        <Milestones
          milestones={settings?.milestones}
          onComplete={() => setPhase("final_wish")}
        />
      )}
      {phase === "final_wish" && (
        <FinalWish
          settings={settings}
          onRestart={() => setPhase("collage")}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="*" element={<Site />} />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  );
}
