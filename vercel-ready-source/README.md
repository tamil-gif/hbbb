# 🎂 Bestie Birthday Surprise Website

A heartwarming, 6-phase interactive birthday surprise web application crafted with love for celebrating your best friend.

---

## ✨ The 6-Phase Interactive Flow

1. **🎧 Page 1: The Welcome Screen**
   - Ambient floating hearts and twinkling sparkles.
   - Masked typography reveal: *"Dear [Name], before anything else — press start"*.
   - Friendly audio recommendation: *"headphones on, volume up. this whole page is yours."*
   - Interactive glowing **Start** button that kicks off background audio (*"Aval — Manithan"*) and displays the floating music player pill.

2. **⏳ Page 2: Live Birthday Countdown**
   - Live ticker counting down **Days**, **Hours**, **Minutes**, and **Seconds** to the exact birthday moment.
   - **🧪 Test Mode Toggle**: A 60-second preview countdown with a real-time progress bar to preview the unlock sequence anytime.
   - Reaching zero automatically unlocks the journey and moves to Page 3.

3. **📸 Page 3: "You, Me & The Gang" (Memories Showcase)**
   - Dual aesthetic polaroid cards:
     - **Card A (You & Her)**: A special snapshot of the two of you with washi tape and custom caption.
     - **Card B (Our Circle)**: A lively group photo of your whole friend circle together.
   - Action button: *"There's one more picture I need you to see ➔"*.

4. **👑 Page 4: "My Absolute Favourite Picture" (Centrepiece Spotlight)**
   - Standalone spotlight page exclusively for the single photo of her that you love most.
   - Decorated with a satin ribbon bow, ambient glow, and your custom heartfelt note explaining why this picture is so special to you.
   - Action button: *"Now, let's look back at how it all started ➔"*.

5. **📖 Page 5: Step-by-Step Friendship Milestones ("How It All Started")**
   - Interactive card-by-card story recounting when you first started talking to where you are today:
     - Memory 1: *The Day We Started Talking*
     - Memory 2: *Becoming Inseparable* (late nights, laughter)
     - Memory 3: *My Safe Haven* (through thick and thin)
     - Memory 4: *Celebrating You*
   - Progress dots and smooth card slide animations with *"Previous"* and *"Next memory ➔"*.

6. **🎉 Page 6: Grand Finale, Pookie Card & Birthday Letter**
   - Multi-burst canvas confetti explosions (`canvas-confetti`).
   - 3-tier birthday cake with glowing, flickering candle flames.
   - **Pookie / Pinterest Aesthetic Card**: Cute sticker frame (🎀 ✨) ready for your Pinterest pookie picture.
   - **Heartfelt Birthday Letter**: Framed letter with sweet birthday wishes, promises, and gratitude.
   - *"Relive Our Story"* button to restart the experience anytime.

7. **🛠️ Secret Workshop (`/admin`)**
   - Accessible anytime at `/admin` (or `#admin`).
   - Easily upload all your photos:
     - Photo of You & Her
     - Group Photo
     - Favourite Photo & personal note
     - Milestone photos & stories (add/remove milestones)
     - Pookie / Pinterest image
     - Final Birthday Letter
   - **Relock Countdown** button to test the experience from scratch anytime.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open:
- **Main Surprise**: [http://localhost:3000](http://localhost:3000)
- **Secret Workshop**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🌐 How to Host on GitHub Pages (Single File)

You can host the entire website for free on GitHub Pages in 1 minute using the pre-compiled standalone file:

📁 **`standalone/index.html`**

1. Go to [github.com](https://github.com) and create a new public repository.
2. Click **Add file** ➔ **Upload files**.
3. Drag & drop **`standalone/index.html`** (rename to `index.html` on GitHub) and commit.
4. Go to repository **Settings** ➔ **Pages** ➔ select `main` (root) branch and save.
5. Your live link will be active at:
   ```text
   https://<your-username>.github.io/<repo-name>/
   ```
