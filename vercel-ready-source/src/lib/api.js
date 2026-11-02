const BACKEND_URL =
  (typeof process !== "undefined" && process.env?.REACT_APP_BACKEND_URL) ||
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_BACKEND_URL) ||
  "";

export const API = `${BACKEND_URL}/api`;

export const fileUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("/api/")) return `${BACKEND_URL}${url}`;
  return url;
};

// Default high-quality aesthetic placeholder images (warm, cute Pinterest vibe)
export const DEFAULT_SETTINGS = {
  key: "main",
  name: "Sahaana",
  birthday_date: "2026-11-03T00:00:00+05:30",
  welcome_message:
    "I have a little something to show you, and I hope it makes you smile as much as you've made me smile.",
  cat_image: "/cat-birthday.jpg",

  // Page 2: Photo Collage (Scrapbook Board)
  collage_photo_1: "/collage-1.jpg",
  collage_photo_2: "/collage-2.jpg",
  collage_photo_3: "/collage-3.jpg",
  collage_photo_4: "/collage-4.jpg",
  collage_photo_5: "/collage-5.jpg",
  collage_cat: "/cat-birthday.jpg",

  // Page 3: Little moments, big memories (You & Me alone)
  photo_you_and_her: "/you-and-her.jpg",
  caption_you_and_her: "You and me, always creating memories",
  photo_group: "",
  caption_group: "",

  // Page 4: A Picture Close to My Heart (Favourite Photo)
  photo_favourite: "/favourite-photo.jpg",
  caption_favourite:
    "Among all the pictures I've ever taken or shared, this one has a special place in my heart. It's more than just a picture; it's a little piece of happiness that I'll always want to look back at. No matter how many new memories come along, this one will remain my forever favourite.",

  // Page 5: Step-by-Step Friendship Milestones (Time Graph)
  milestones: [
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
  ],

  // Page 6: Pookie Pinterest Image & Final Birthday Letter
  photo_pookie: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
  caption_pookie: "our cute pookie energy 🎀✨",
  final_letter: `Happiest birthday to my most incredible friend in the world! ❤️

From the day we first started talking to all the chaos, adventures, late-night calls, random conversations and little fights, you've made my life so much more beautiful.

Namma first meet aanadhe C++ lab-la dhaan. Nee enkitta oru coding-related help ketta, and honestly, adhu dhaan namma first conversation. Andha naal nee white dress potirundha. Adhukkapparam C++ lab mudichittu, class-la irukkumbodhu hackathon pathi pesittu irundhom. Appo namma oru group create pannalama nu pesinom. Naan ketadhukku, "Fine, that's okay, let's do it as a group" nu sonna. Appadi dhaan namma group start aachu.

Adhukkapparam naalu perum serndhu namma "Three City Chaos" nu oru group start pannom. Random conversations, assignments upload panradhu, doubts kekkuradhu, orutharukku oruthar help pannikiradhu nu days pochu.

And then enakku accident aachu. Andha two weeks naan veetla irundha time-la, night daily nee, naan, Ranjan moonu perum calls-la pesittu iruppom. Late-night random talks, teasing each other, sirichittu irukkuradhu, namma life-la nadakkura vishayangalai share pannikiradhu, everything! Chinna chinna sandai, teasing, silence, arguments nu ellame irundhuchu. But indha little little moments dhaan namma friendship-ah innum closer aakuchu.

No matter how many little fights, misunderstandings, silences or crazy moments come our way, I want you to know that I'll always be there for you. Whenever life gets difficult, I'll be there to lift you up, support you and remind you that you are never alone. I don't know what the future holds for us, but one thing I genuinely wish for is to have you by my side till the very end, as your best friend. Not just today, not just for a few years, but for a lifetime. Happiest birthday once again, Sahaana! ❤️`,
};

export function getLocalSettings() {
  try {
    const s = localStorage.getItem("birthday_settings");
    if (s) {
      const parsed = JSON.parse(s);
      if (parsed.welcome_message && parsed.welcome_message.includes("haven't")) {
        parsed.welcome_message = parsed.welcome_message.replace("haven't", "you've");
        try {
          localStorage.setItem("birthday_settings", JSON.stringify(parsed));
        } catch (e) {}
      }
      if (!parsed.photo_you_and_her || parsed.photo_you_and_her.includes("unsplash.com/photo-1529156069898-49953e39b3ac")) {
        parsed.photo_you_and_her = "/you-and-her.jpg";
      }
      if (parsed.photo_group && parsed.photo_group.includes("unsplash.com/photo-1511632765486-a01980e01a18")) {
        parsed.photo_group = "";
      }
      if (!parsed.photo_favourite || parsed.photo_favourite.includes("unsplash.com/photo-1534528741775-53994a69daeb")) {
        parsed.photo_favourite = "/favourite-photo.jpg";
      }
      if (!parsed.caption_favourite || parsed.caption_favourite.includes("Out of all our memories") || parsed.caption_favourite.includes("Out of every single picture")) {
        parsed.caption_favourite =
          "Among all the pictures I've ever taken or shared, this one has a special place in my heart. It's more than just a picture; it's a little piece of happiness that I'll always want to look back at. No matter how many new memories come along, this one will remain my forever favourite.";
      }
      if (!parsed.milestones || !parsed.milestones.length || parsed.milestones[0]?.title !== "1. The Day We First Met") {
        parsed.milestones = DEFAULT_SETTINGS.milestones;
      }
      if (!parsed.final_letter || !parsed.final_letter.includes("Three City Chaos")) {
        parsed.final_letter = DEFAULT_SETTINGS.final_letter;
      }
      if (!parsed.collage_photo_1) parsed.collage_photo_1 = "/collage-1.jpg";
      if (!parsed.collage_photo_2) parsed.collage_photo_2 = "/collage-2.jpg";
      if (!parsed.collage_photo_3) parsed.collage_photo_3 = "/collage-3.jpg";
      if (!parsed.collage_photo_4) parsed.collage_photo_4 = "/collage-4.jpg";
      if (!parsed.collage_photo_5) parsed.collage_photo_5 = "/collage-5.jpg";
      if (!parsed.collage_cat) parsed.collage_cat = "/cat-birthday.jpg";
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        milestones: parsed.milestones,
      };
    }
  } catch (e) {}
  return DEFAULT_SETTINGS;
}

export function saveLocalSettings(data) {
  try {
    localStorage.setItem("birthday_settings", JSON.stringify(data));
  } catch (e) {}
}

export async function getSettings() {
  if (typeof window !== "undefined" && window.location.protocol === "file:") {
    return getLocalSettings();
  }
  try {
    const res = await fetch(`${API}/settings`);
    if (res.ok) {
      const data = await res.json();
      saveLocalSettings(data);
      return data;
    }
  } catch (e) {}
  return getLocalSettings();
}

export async function updateSettings(patch) {
  const current = getLocalSettings();
  const updated = { ...current, ...patch };
  saveLocalSettings(updated);

  try {
    const res = await fetch(`${API}/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) return res.json();
  } catch (e) {}

  return updated;
}
