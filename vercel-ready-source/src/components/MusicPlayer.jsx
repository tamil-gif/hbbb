import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Loader2, Music2, RotateCcw, Settings2, X, Check } from "lucide-react";

// Candidate video IDs for "Aval — Manithan"
// If one has embed restrictions (error 150/101), the player automatically falls back to the next!
export const DEFAULT_TRACKS = [
  { id: "My_S68DAAPg", title: "Aval — Manithan" },
  { id: "y_IVLTDJemw", title: "Aval — Manithan (Lyric Video)" },
  { id: "h5S138-FpQk", title: "Aval — Manithan (Full Song)" },
  { id: "R9ZtVvC_eWI", title: "Aval — Manithan" },
];

export const music = {
  play: () => {},
  pause: () => {},
  toggle: () => {},
  seek: () => {},
  changeTrack: () => {},
};

export default function MusicPlayer({ hidden = false }) {
  const hostRef = useRef(null);
  const playerRef = useRef(null);

  // Read saved track & start time from localStorage if present
  const [trackIndex, setTrackIndex] = useState(() => {
    try {
      const saved = localStorage.getItem("birthday_music_track_index");
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [customVideoId, setCustomVideoId] = useState(() => {
    try {
      return localStorage.getItem("birthday_custom_video_id") || "";
    } catch {
      return "";
    }
  });

  const [startTime, setStartTime] = useState(() => {
    try {
      const saved = localStorage.getItem("birthday_music_start_time");
      return saved ? parseInt(saved, 10) || 95 : 95; // 1:35 default
    } catch {
      return 95;
    }
  });

  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [inputStart, setInputStart] = useState("95");

  const startedRef = useRef(false);
  const playingRef = useRef(false);
  const trackIndexRef = useRef(trackIndex);
  const customVideoIdRef = useRef(customVideoId);
  const startTimeRef = useRef(startTime);

  trackIndexRef.current = trackIndex;
  customVideoIdRef.current = customVideoId;
  startTimeRef.current = startTime;
  playingRef.current = playing;

  const currentVideoId = customVideoId || DEFAULT_TRACKS[trackIndex % DEFAULT_TRACKS.length].id;
  const currentTitle = customVideoId ? "Custom Song" : DEFAULT_TRACKS[trackIndex % DEFAULT_TRACKS.length].title;

  // Initialize YouTube Iframe API
  useEffect(() => {
    // In file:// mode, Chrome security forbids cross-origin iframes and displays about:blank#blocked.
    // Guard against file:// to prevent the browser from showing #blocked.
    if (typeof window !== "undefined" && window.location.protocol === "file:") {
      console.info("Running via file:// protocol. YouTube iframe is bypassed to prevent Chrome #blocked error.");
      return;
    }

    let destroyed = false;

    const loadPlayer = () => {
      if (destroyed || !hostRef.current || !window.YT || !window.YT.Player) return;
      if (playerRef.current) return;

      hostRef.current.innerHTML = "";
      const container = document.createElement("div");
      hostRef.current.appendChild(container);

      const activeId = customVideoIdRef.current || DEFAULT_TRACKS[trackIndexRef.current % DEFAULT_TRACKS.length].id;

      try {
        playerRef.current = new window.YT.Player(container, {
          videoId: activeId,
          host: "https://www.youtube-nocookie.com",
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            loop: 1,
            playlist: activeId,
            playsinline: 1,
            modestbranding: 1,
            rel: 0,
            start: startTimeRef.current,
            origin: window.location.protocol.startsWith("http") ? window.location.origin : undefined,
          },
          events: {
            onReady: (e) => {
              if (destroyed) return;
              try {
                e.target.setVolume(80);
              } catch (err) {}
              setReady(true);

              if (startedRef.current) {
                try {
                  e.target.seekTo(startTimeRef.current, true);
                  const promise = e.target.playVideo();
                  if (promise && typeof promise.catch === "function") {
                    promise.catch(() => setNeedsInteraction(true));
                  }
                } catch {
                  setNeedsInteraction(true);
                }
              }
            },
            onStateChange: (e) => {
              if (destroyed) return;
              const isNowPlaying = e.data === window.YT.PlayerState.PLAYING;
              setPlaying(isNowPlaying);
              if (isNowPlaying) {
                setNeedsInteraction(false);
              }
              if (e.data === window.YT.PlayerState.ENDED) {
                try {
                  e.target.seekTo(startTimeRef.current, true);
                  e.target.playVideo();
                } catch (err) {}
              }
            },
            onError: (e) => {
              console.warn("YouTube Player error:", e.data, "Trying fallback track...");
              // Code 101/150: Not allowed to embed
              // Code 100: Not found
              // Code 2/5: HTML5 error
              if (!customVideoIdRef.current) {
                const nextIdx = (trackIndexRef.current + 1) % DEFAULT_TRACKS.length;
                trackIndexRef.current = nextIdx;
                setTrackIndex(nextIdx);
                try {
                  localStorage.setItem("birthday_music_track_index", String(nextIdx));
                } catch {}
                try {
                  const nextTrack = DEFAULT_TRACKS[nextIdx];
                  if (playerRef.current?.loadVideoById) {
                    playerRef.current.loadVideoById({
                      videoId: nextTrack.id,
                      startSeconds: startTimeRef.current,
                    });
                  }
                } catch {}
              } else {
                setNeedsInteraction(true);
              }
            },
          },
        });
      } catch (err) {
        console.error("Failed to construct YT.Player:", err);
      }
    };

    if (!window.YT || !window.YT.Player) {
      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === "function") prevCallback();
        loadPlayer();
      };
      // Fallback check in case script was already loaded
      const poll = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(poll);
          loadPlayer();
        }
      }, 300);
      return () => {
        destroyed = true;
        clearInterval(poll);
      };
    } else {
      loadPlayer();
    }

    return () => {
      destroyed = true;
    };
  }, []);

  // Wire up music control singleton
  useEffect(() => {
    music.play = () => {
      startedRef.current = true;
      setStarted(true);
      try {
        if (playerRef.current?.playVideo) {
          const cur = playerRef.current.getCurrentTime?.();
          if (typeof cur !== "number" || cur < startTimeRef.current - 2) {
            playerRef.current.seekTo(startTimeRef.current, true);
          }
          const p = playerRef.current.playVideo();
          if (p && typeof p.catch === "function") {
            p.catch(() => setNeedsInteraction(true));
          }
        } else {
          setNeedsInteraction(true);
        }
      } catch {
        setNeedsInteraction(true);
      }
    };

    music.pause = () => {
      startedRef.current = false;
      try {
        playerRef.current?.pauseVideo?.();
      } catch {}
    };

    music.toggle = () => {
      startedRef.current = true;
      setStarted(true);
      try {
        const st = playerRef.current?.getPlayerState?.();
        if (st === 1) {
          playerRef.current.pauseVideo();
        } else {
          const cur = playerRef.current?.getCurrentTime?.();
          if (typeof cur !== "number" || cur < startTimeRef.current - 2) {
            playerRef.current?.seekTo?.(startTimeRef.current, true);
          }
          playerRef.current?.playVideo?.();
          setNeedsInteraction(false);
        }
      } catch {
        setNeedsInteraction(true);
      }
    };

    music.seek = (seconds) => {
      try {
        playerRef.current?.seekTo?.(seconds, true);
      } catch {}
    };
  }, [ready]);

  // Global browser autoplay-unblock handler:
  // If the browser prevented unmuted playback, the very first click/tap anywhere on the page starts it cleanly!
  useEffect(() => {
    const unblockAudioOnGesture = () => {
      if (startedRef.current && !playingRef.current) {
        try {
          if (playerRef.current?.playVideo) {
            const cur = playerRef.current.getCurrentTime?.();
            if (typeof cur !== "number" || cur < startTimeRef.current - 2) {
              playerRef.current.seekTo(startTimeRef.current, true);
            }
            playerRef.current.playVideo();
            setNeedsInteraction(false);
          }
        } catch {}
      }
    };

    window.addEventListener("pointerdown", unblockAudioOnGesture, { passive: true });
    window.addEventListener("click", unblockAudioOnGesture, { passive: true });
    window.addEventListener("keydown", unblockAudioOnGesture, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", unblockAudioOnGesture);
      window.removeEventListener("click", unblockAudioOnGesture);
      window.removeEventListener("keydown", unblockAudioOnGesture);
    };
  }, []);

  const toggleMute = () => {
    try {
      if (muted) {
        playerRef.current?.unMute?.();
        setMuted(false);
      } else {
        playerRef.current?.mute?.();
        setMuted(true);
      }
    } catch {}
  };

  const handleApplyCustomSong = (e) => {
    e.preventDefault();
    let vId = inputUrl.trim();
    // Parse YouTube ID if full URL pasted
    if (vId.includes("youtube.com/watch")) {
      const m = vId.match(/[?&]v=([^&#]+)/);
      if (m) vId = m[1];
    } else if (vId.includes("youtu.be/")) {
      const m = vId.match(/youtu\.be\/([^?&#]+)/);
      if (m) vId = m[1];
    }

    const sTime = parseInt(inputStart, 10) || 0;
    setCustomVideoId(vId);
    setStartTime(sTime);
    startTimeRef.current = sTime;

    try {
      localStorage.setItem("birthday_custom_video_id", vId);
      localStorage.setItem("birthday_music_start_time", String(sTime));
    } catch {}

    if (playerRef.current?.loadVideoById && vId) {
      playerRef.current.loadVideoById({
        videoId: vId,
        startSeconds: sTime,
      });
      playerRef.current.playVideo();
    }
    setShowConfig(false);
  };

  const handleResetToAval = () => {
    setCustomVideoId("");
    setStartTime(95);
    startTimeRef.current = 95;
    try {
      localStorage.removeItem("birthday_custom_video_id");
      localStorage.setItem("birthday_music_start_time", "95");
      localStorage.setItem("birthday_music_track_index", "0");
    } catch {}
    setTrackIndex(0);
    trackIndexRef.current = 0;
    if (playerRef.current?.loadVideoById) {
      playerRef.current.loadVideoById({
        videoId: DEFAULT_TRACKS[0].id,
        startSeconds: 95,
      });
      playerRef.current.playVideo();
    }
    setShowConfig(false);
  };

  return (
    <>
      {/* 
        Container for YouTube iframe:
        Must NOT have opacity:0 or 1px width, otherwise Chrome blocks audio under Autoplay policy.
        Off-screen position keeps it completely invisible to users while fully recognized as active media by Chrome.
      */}
      <div ref={hostRef} className="yt-host" aria-hidden="true" />

      {/* Floating Audio Pill */}
      {!hidden && started && (
        <div className={`music-pill ${needsInteraction && !playing ? "music-pill-prompt" : ""}`} data-testid="music-player">
          {/* Main Play/Pause Button */}
          <button
            className="music-btn"
            data-testid="music-toggle-button"
            onClick={() => music.toggle()}
            aria-label={playing ? "Pause music" : "Play music"}
            title={playing ? "Pause" : "Play"}
          >
            {ready ? (
              playing ? (
                <Pause size={15} />
              ) : (
                <Play size={15} className={needsInteraction ? "pulse-icon" : ""} />
              )
            ) : (
              <Loader2 size={15} className="spin-slow" />
            )}
          </button>

          {/* Prompt or Song Title */}
          {needsInteraction && !playing ? (
            <button
              className="music-prompt-btn"
              onClick={() => music.toggle()}
              title="Click to play music"
            >
              <Music2 size={13} className="music-note-bounce" />
              <span>Tap to play song 🎵</span>
            </button>
          ) : (
            <span className="music-label" title={currentTitle}>
              {currentTitle}
            </span>
          )}

          {/* Mute/Unmute */}
          <button
            className="music-btn-sub"
            data-testid="music-mute-button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute music" : "Mute music"}
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>

          {/* Settings / Change Song Button */}
          <button
            className="music-btn-sub"
            onClick={() => {
              setInputUrl(customVideoId || currentVideoId);
              setInputStart(String(startTime));
              setShowConfig(!showConfig);
            }}
            aria-label="Change song settings"
            title="Change song or timing"
          >
            <Settings2 size={13} />
          </button>
        </div>
      )}

      {/* Change Song Modal */}
      {showConfig && (
        <div className="music-modal-overlay" onClick={() => setShowConfig(false)}>
          <div className="music-modal" onClick={(e) => e.stopPropagation()}>
            <div className="music-modal-header">
              <div className="music-modal-title">
                <Music2 size={18} />
                <span>Song Settings</span>
              </div>
              <button className="music-modal-close" onClick={() => setShowConfig(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleApplyCustomSong} className="music-modal-form">
              <label className="music-modal-label">
                YouTube URL or Video ID:
                <input
                  type="text"
                  className="music-modal-input"
                  placeholder="e.g. My_S68DAAPg or youtube.com/watch?v=..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                />
              </label>

              <label className="music-modal-label">
                Start Time (seconds):
                <input
                  type="number"
                  className="music-modal-input"
                  placeholder="95 (1:35)"
                  value={inputStart}
                  onChange={(e) => setInputStart(e.target.value)}
                />
                <span className="music-modal-hint">Tip: 95 = 1 minute 35 seconds</span>
              </label>

              <div className="music-modal-actions">
                <button type="submit" className="music-modal-save">
                  <Check size={14} />
                  <span>Save & Play</span>
                </button>
                <button
                  type="button"
                  className="music-modal-reset"
                  onClick={handleResetToAval}
                  title="Reset to default Aval — Manithan at 1:35"
                >
                  <RotateCcw size={14} />
                  <span>Reset to Aval (1:35)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
