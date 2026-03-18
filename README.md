# 💻 Kaustubh Terminal Portfolio

**An interactive terminal-style portfolio where every command tells my story.**

### **[▶ Try the Live Demo](https://kaustubh-terminal.vercel.app)**

![Commands](https://img.shields.io/badge/commands-50%2B-brightgreen) ![Themes](https://img.shields.io/badge/themes-3-blue) ![Dependencies](https://img.shields.io/badge/dependencies-0-orange) ![Deploy](https://img.shields.io/badge/deploy-Vercel-black)

---

## ✨ Features

- **50+ commands** — portfolio, games, utilities, network tools, and more
- **3 themes** — Dark, Light, and Hacker (matrix green with glow effects)
- **Smart input** — auto-suggestions, tab completion, command history (↑/↓)
- **Matrix rain** — toggleable green rain overlay animation
- **Hacker mode** — 9-pane Hollywood-style hacking scene
- **Live widgets** — weather (auto-location), session uptime, calendar
- **Shutdown sim** — Linux-style boot sequence with sound effects
- **PWA-ready** — installable, responsive, CRT scanline effect
- **Zero dependencies** — no npm, no build step, just open `index.html`

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Font** | JetBrains Mono |
| **APIs** | Open-Meteo · Quotable · GEO IP · GitHub |
| **Hosting** | Vercel + Web Analytics |

---

## ⌨️ Key Commands

| Category | Examples |
|----------|----------|
| **Portfolio** | `about` · `skills` · `projects` · `social` · `contact` |
| **Themes** | `theme` · `set theme hacker` |
| **Utilities** | `weather` · `calendar` · `timer` · `stopwatch` · `remind` · `uuid` |
| **Text** | `echo` · `uppercase` · `reverse` · `base64` · `hash` |
| **Network** | `ip` · `geo` · `dns` · `ping` · `curl` · `github` |
| **Fun** | `matrix` · `hacker` · `coin` · `dice` · `rps` · `ttt` · `ascii` |
| **System** | `whoami` · `sysinfo` · `history` · `clear` · `shutdown` |

> Type `help` for the full list.

---

## 🎨 Themes

Switch with the `theme` command or click the 🎨 button in the header.

- **Dark** — pure black, white text, clean and minimal
- **Light** — white background, dark text, easy on the eyes
- **Hacker** — black + matrix green with cyan accents and glow

---

## 🚀 Getting Started

```bash
git clone https://github.com/kaustubh93-dev/kaustubh-terminal.git
cd kaustubh-terminal
```

Open `index.html` in your browser — that's it. No install, no build.

**Deploy to Vercel:** push to GitHub → import at [vercel.com](https://vercel.com) → done.

---

## 📁 Project Structure

```
kaustubh-terminal/
├── index.html            # Terminal layout and shell
├── assets/
│   ├── css/styles.css    # Themes, animations, responsive layout
│   └── js/
│       ├── app.js        # Core logic — all 50+ command handlers
│       └── constants.js  # Personal config — bio, skills, projects, socials
├── robots.txt
├── site.webmanifest      # PWA manifest
└── README.md
```

---

## 🔧 Customization

Edit **`assets/js/constants.js`** to make it yours:

```javascript
window.TERM = {
    site: { domain: "you.dev", owner: "Your Name", email: "you@example.com" },
    aboutText: [...],      // Your bio
    skillsText: [...],     // Your skills
    projectsText: [...],   // Your projects
};
```

---

## 📄 License

MIT — fork it, customize it, make it yours.

---

<p align="center">
  Built with ☕ and <code>console.log()</code> by <a href="https://www.linkedin.com/in/kaustubh-sharma993/">Kaustubh Sharma</a>
</p>
