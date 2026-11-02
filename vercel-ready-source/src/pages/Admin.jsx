import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { Heart, Trash2, Plus, Save, Upload, ArrowLeft, Image as ImageIcon, Users, Crown, Sparkles } from "lucide-react";
import { getSettings, updateSettings } from "@/lib/api";

const toLocalInput = (iso) => {
  if (!iso) return "";
  if (iso.includes("+05:30")) return iso.slice(0, 16);
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const ist = new Date(d.getTime() + 5.5 * 3600000);
  return ist.toISOString().slice(0, 16);
};

const fromLocalInput = (v) => (v ? `${v}:00+05:30` : "");

export default function Admin() {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    getSettings().then(setSettings).catch(() => {});
  };

  useEffect(load, []);

  const set = (k, v) => setSettings((s) => ({ ...s, [k]: v }));

  const saveSettings = async () => {
    setSaving(true);
    try {
      const updated = {
        ...settings,
        name: settings.name,
        birthday_date: fromLocalInput(
          settings._birthday_local || toLocalInput(settings.birthday_date)
        ),
        welcome_message: settings.welcome_message,
        cat_image: settings.cat_image,
        photo_you_and_her: settings.photo_you_and_her,
        caption_you_and_her: settings.caption_you_and_her,
        photo_group: settings.photo_group,
        caption_group: settings.caption_group,
        photo_favourite: settings.photo_favourite,
        caption_favourite: settings.caption_favourite,
        photo_pookie: settings.photo_pookie,
        caption_pookie: settings.caption_pookie,
        final_letter: settings.final_letter,
        milestones: settings.milestones || [],
      };
      await updateSettings(updated);
      toast.success("All settings and photos saved successfully!");
      load();
    } catch (e) {
      toast.error("Could not save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = (key, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      set(key, reader.result);
      toast.success("Photo attached! Remember to click Save.");
    };
    reader.readAsDataURL(file);
  };

  const setMilestone = (i, k, v) => {
    const list = [...(settings.milestones || [])];
    list[i] = { ...list[i], [k]: v };
    set("milestones", list);
  };

  const addMilestone = () => {
    const list = [
      ...(settings.milestones || []),
      {
        id: `m_${Date.now()}`,
        date: "Memory Date",
        title: "New Memory",
        description: "Write your story here...",
        photo: "",
        caption: "",
      },
    ];
    set("milestones", list);
  };

  const removeMilestone = (i) => {
    const list = settings.milestones.filter((_, idx) => idx !== i);
    set("milestones", list);
  };

  const handleMilestonePhoto = (i, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setMilestone(i, "photo", reader.result);
      toast.success("Milestone photo attached!");
    };
    reader.readAsDataURL(file);
  };

  const relockCountdown = () => {
    localStorage.removeItem("unlocked");
    toast.success("Countdown relocked! Return to main page to experience countdown.");
  };

  if (!settings) return <div className="admin-loading">loading secret workshop...</div>;

  return (
    <div className="admin" data-testid="admin-screen">
      <Toaster position="top-center" richColors />

      {/* Top Header */}
      <header className="admin-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>
            <Heart size={18} fill="currentColor" strokeWidth={0} /> the secret workshop
          </h1>
          <a
            href="/"
            className="btn-ghost"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} /> View Surprise
          </a>
        </div>
        <p>this page is only for you — easily customize all 6 pages of her surprise below.</p>
      </header>

      {/* SECTION 1: BASIC DETAILS */}
      <section className="admin-card">
        <h2>1. Basic Details & Countdown</h2>
        <label className="field">
          <span>Her name / nickname</span>
          <input
            data-testid="admin-name"
            value={settings.name || ""}
            onChange={(e) => set("name", e.target.value)}
          />
        </label>
        <label className="field">
          <span>Birthday Date & Time (IST)</span>
          <input
            type="datetime-local"
            data-testid="admin-birthday"
            value={settings._birthday_local || toLocalInput(settings.birthday_date)}
            onChange={(e) => set("_birthday_local", e.target.value)}
          />
        </label>
        <label className="field">
          <span>First Page Custom Message (replaces default intro)</span>
          <textarea
            rows={3}
            value={settings.welcome_message || ""}
            onChange={(e) => set("welcome_message", e.target.value)}
            placeholder="I have a little something to show you..."
          />
        </label>

        <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
          <button className="btn-primary" onClick={saveSettings} disabled={saving}>
            <Save size={15} /> {saving ? "saving..." : "Save changes"}
          </button>
          <button className="btn-ghost" onClick={relockCountdown} title="Reset countdown state">
            Relock Countdown
          </button>
        </div>
      </section>

      {/* SECTION 2: PAGE 3 - LITTLE MOMENTS, BIG MEMORIES */}
      <section className="admin-card">
        <h2>2. Page 3: Little Moments, Big Memories (You & Me)</h2>
        <p style={{ color: "var(--plum-soft)", fontSize: "0.85rem", marginBottom: 16 }}>
          Showcases your special picture together (&ldquo;You and Me alone&rdquo;). You can also optionally add a circle photo if desired.
        </p>

        {/* You & Her */}
        <div style={{ background: "rgba(255,255,255,0.7)", padding: 16, borderRadius: 16, marginBottom: 16, border: "1px solid rgba(229,107,159,0.2)" }}>
          <span style={{ fontWeight: 600, color: "var(--rose-deep)", display: "block", marginBottom: 8 }}>
            Photo A: You & Her
          </span>
          {settings.photo_you_and_her ? (
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <img src={settings.photo_you_and_her} alt="You and Her" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10, border: "2px solid #fff" }} />
              <button className="btn-ghost danger" onClick={() => set("photo_you_and_her", "")} style={{ fontSize: "0.8rem" }}>
                Remove image
              </button>
            </div>
          ) : (
            <label className="btn-ghost" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <Upload size={14} /> Upload photo of You & Her
              <input type="file" accept="image/*" hidden onChange={(e) => handleFileUpload("photo_you_and_her", e.target.files?.[0])} />
            </label>
          )}
          <label className="field">
            <span>Caption</span>
            <input value={settings.caption_you_and_her || ""} onChange={(e) => set("caption_you_and_her", e.target.value)} placeholder="e.g. Partners in crime" />
          </label>
        </div>

        {/* The Gang */}
        <div style={{ background: "rgba(255,255,255,0.7)", padding: 16, borderRadius: 16, border: "1px solid rgba(229,107,159,0.2)" }}>
          <span style={{ fontWeight: 600, color: "var(--rose-deep)", display: "block", marginBottom: 8 }}>
            Photo B: The Gang / Circle
          </span>
          {settings.photo_group ? (
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <img src={settings.photo_group} alt="The Gang" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10, border: "2px solid #fff" }} />
              <button className="btn-ghost danger" onClick={() => set("photo_group", "")} style={{ fontSize: "0.8rem" }}>
                Remove image
              </button>
            </div>
          ) : (
            <label className="btn-ghost" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <Upload size={14} /> Upload Group photo
              <input type="file" accept="image/*" hidden onChange={(e) => handleFileUpload("photo_group", e.target.files?.[0])} />
            </label>
          )}
          <label className="field">
            <span>Caption</span>
            <input value={settings.caption_group || ""} onChange={(e) => set("caption_group", e.target.value)} placeholder="e.g. The whole crazy gang" />
          </label>
        </div>
      </section>

      {/* SECTION 3: PAGE 4 - A PICTURE CLOSE TO MY HEART */}
      <section className="admin-card">
        <h2>3. Page 4: A Picture Close to My Heart</h2>
        <p style={{ color: "var(--plum-soft)", fontSize: "0.85rem", marginBottom: 16 }}>
          Dedicated spotlight page featuring your favourite memory together, with your personal heartfelt note.
        </p>

        {settings.photo_favourite ? (
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <img src={settings.photo_favourite} alt="Favourite" style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 10, border: "2px solid #fff" }} />
            <button className="btn-ghost danger" onClick={() => set("photo_favourite", "")} style={{ fontSize: "0.8rem" }}>
              Remove image
            </button>
          </div>
        ) : (
          <label className="btn-ghost" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
            <Crown size={14} /> Upload your favourite photo of her
            <input type="file" accept="image/*" hidden onChange={(e) => handleFileUpload("photo_favourite", e.target.files?.[0])} />
          </label>
        )}

        <label className="field">
          <span>Why this picture is your favourite (personal note)</span>
          <textarea
            rows={4}
            value={settings.caption_favourite || ""}
            onChange={(e) => set("caption_favourite", e.target.value)}
            placeholder="Tell her why this specific photo means so much to you..."
          />
        </label>
      </section>

      {/* SECTION 4: PAGE 5 - STEP-BY-STEP FRIENDSHIP MILESTONES */}
      <section className="admin-card">
        <h2>4. Page 5: Friendship Milestones ("How It All Started")</h2>
        <p style={{ color: "var(--plum-soft)", fontSize: "0.85rem", marginBottom: 16 }}>
          Interactive step-by-step memory cards starting from when you first talked to where you are today.
        </p>

        {(settings.milestones || []).map((m, i) => (
          <div
            key={m.id || i}
            style={{
              padding: 16,
              background: "rgba(255, 255, 255, 0.65)",
              border: "1px solid rgba(229, 107, 159, 0.2)",
              borderRadius: 16,
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontWeight: 600, color: "var(--rose-deep)", fontSize: "0.9rem" }}>
                Memory #{i + 1}
              </span>
              <button className="btn-ghost danger" onClick={() => removeMilestone(i)} style={{ padding: "4px 8px" }}>
                <Trash2 size={14} /> Remove
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 10, marginBottom: 10 }}>
              <label className="field">
                <span>Date / Tag</span>
                <input value={m.date || ""} onChange={(e) => setMilestone(i, "date", e.target.value)} placeholder="e.g. 14 June 2021" />
              </label>
              <label className="field">
                <span>Memory Title</span>
                <input value={m.title || ""} onChange={(e) => setMilestone(i, "title", e.target.value)} placeholder="e.g. The Day We Started Talking" />
              </label>
            </div>

            <label className="field" style={{ marginBottom: 10 }}>
              <span>Story / Description</span>
              <textarea rows={3} value={m.description || ""} onChange={(e) => setMilestone(i, "description", e.target.value)} placeholder="Tell the story of this memory..." />
            </label>

            <label className="field" style={{ marginBottom: 10 }}>
              <span>Highlighted Quote</span>
              <input value={m.quote || ""} onChange={(e) => setMilestone(i, "quote", e.target.value)} placeholder="e.g. Who knew that one ordinary day would become..." />
            </label>

            {/* Photo */}
            <div>
              {m.photo ? (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={m.photo} alt="" style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }} />
                  <button className="btn-ghost danger" onClick={() => setMilestone(i, "photo", "")} style={{ fontSize: "0.78rem" }}>
                    Remove photo
                  </button>
                </div>
              ) : (
                <label className="btn-ghost" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <Upload size={14} /> Attach memory photo (optional)
                  <input type="file" accept="image/*" hidden onChange={(e) => handleMilestonePhoto(i, e.target.files?.[0])} />
                </label>
              )}
            </div>
          </div>
        ))}

        <button className="btn-ghost add-moment" onClick={addMilestone} style={{ width: "100%", justifyContent: "center" }}>
          <Plus size={14} /> Add Another Memory Card
        </button>
      </section>

      {/* SECTION 5: PAGE 6 - POOKIE IMAGE & BIRTHDAY LETTER */}
      <section className="admin-card">
        <h2>5. Page 6: Pookie Pinterest Image & Birthday Letter</h2>
        <p style={{ color: "var(--plum-soft)", fontSize: "0.85rem", marginBottom: 16 }}>
          Upload your aesthetic "pookie" Pinterest picture and write your heartfelt birthday letter here.
        </p>

        {/* Pookie Image */}
        <div style={{ background: "rgba(255,255,255,0.7)", padding: 16, borderRadius: 16, marginBottom: 16, border: "1px solid rgba(229,107,159,0.2)" }}>
          <span style={{ fontWeight: 600, color: "var(--rose-deep)", display: "block", marginBottom: 8 }}>
            Pookie / Pinterest Image (🎀 ✨)
          </span>
          {settings.photo_pookie ? (
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <img src={settings.photo_pookie} alt="Pookie" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10, border: "2px solid #fff" }} />
              <button className="btn-ghost danger" onClick={() => set("photo_pookie", "")} style={{ fontSize: "0.8rem" }}>
                Remove image
              </button>
            </div>
          ) : (
            <label className="btn-ghost" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <Sparkles size={14} /> Upload Pookie image
              <input type="file" accept="image/*" hidden onChange={(e) => handleFileUpload("photo_pookie", e.target.files?.[0])} />
            </label>
          )}
          <label className="field">
            <span>Pookie Caption</span>
            <input value={settings.caption_pookie || ""} onChange={(e) => set("caption_pookie", e.target.value)} placeholder="e.g. our cute pookie energy 🎀✨" />
          </label>
        </div>

        {/* Final Letter */}
        <label className="field">
          <span>Heartfelt Birthday Letter</span>
          <textarea
            rows={8}
            value={settings.final_letter || ""}
            onChange={(e) => set("final_letter", e.target.value)}
          />
        </label>

        <button className="btn-primary" onClick={saveSettings} disabled={saving} style={{ marginTop: 14 }}>
          <Save size={15} /> {saving ? "saving..." : "Save all changes"}
        </button>
      </section>
    </div>
  );
}
