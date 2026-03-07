# 💻 Kaustubh's Terminal Portfolio

An interactive terminal-style portfolio website built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — just pure web tech.

> **[🌐 Live Demo](https://kaustubh-terminal.vercel.app)**

![Commands](https://img.shields.io/badge/Commands-50%2B-brightgreen) ![Themes](https://img.shields.io/badge/Themes-3-blue) ![Build](https://img.shields.io/badge/Build-Static-orange)

---

## ✨ Features

- **50+ Interactive Commands** — from portfolio info to games, utilities, and network tools
- **3 Themes** — Dark, Light, and Hacker (with distinct color palettes)
- **Inline Auto-Suggestions** — faded ghost hints as you type
- **Tab Auto-Complete** — press Tab to complete commands
- **Command History** — navigate with ↑/↓ arrow keys
- **Matrix Rain** — toggle the classic green rain overlay
- **Hacker Mode** — fullscreen Hollywood-style hacking scene with 9 live panes
- **Shutdown/Resume Simulation** — Linux-style boot sequence with sound effects
- **Weather Widget** — auto-detects location, cached for 10 min
- **Session Timer** — live uptime counter in the header
- **Calendar with Today Highlight** — current date shown in a circle
- **Reminder with Chime** — set timed reminders with pleasant notification sound
- **Theme Toggle Button** — quick switch from the top bar
- **Responsive** — works on desktop and mobile
- **No Dependencies** — zero npm packages, zero build step

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/kaustubh93-dev/kaustubh-terminal.git

# Open in browser
cd kaustubh-terminal
# Double-click index.html OR use a local server:
npx serve .
```

---

## 📦 Project Structure

```
kaustubh-terminal/
├── index.html              # Main HTML — terminal layout, header, footer
├── assets/
│   ├── css/
│   │   └── styles.css      # All styling — themes, animations, layouts
│   └── js/
│       ├── constants.js    # Config — banner, about, skills, projects, socials
│       └── app.js          # Core logic — all 50+ command handlers
├── robots.txt
├── site.webmanifest
└── README.md
```

---

## 🎮 Commands

Type `help` to see all commands. Here's a highlight:

| Category | Commands |
|----------|----------|
| **Portfolio** | `about`, `skills`, `projects`, `social`, `contact` |
| **Themes** | `theme`, `set theme <name>` |
| **Utilities** | `date`, `time`, `calendar`, `timer`, `stopwatch`, `remind`, `uptime`, `uuid` |
| **Text Tools** | `echo`, `uppercase`, `lowercase`, `capitalize`, `reverse`, `base64`, `hash` |
| **Network** | `weather`, `ip`, `geo`, `dns`, `ping`, `curl`, `json`, `github` |
| **Fun** | `matrix`, `hacker`, `coin`, `dice`, `rps`, `ttt`, `emoji`, `quote`, `ascii` |
| **Lookup** | `define`, `synonym`, `antonym`, `country`, `stock`, `translate` |
| **System** | `whoami`, `sysinfo`, `history`, `clear`, `reset`, `shutdown`, `sudo` |

---

## 🎨 Themes

| Theme | Description |
|-------|-------------|
| **Dark** | Pure black background, white text — clean and minimal |
| **Light** | White background, dark text — easy on the eyes |
| **Hacker** | Black background, matrix green with cyan accents — full terminal vibes |

Switch with `theme` command or click the 🎨 button in the header.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Auto-complete command |
| `↑` / `↓` | Navigate command history |
| `Ctrl+C` | Cancel current input |
| `Ctrl+K` | Clear screen |
| `Esc` | Exit Matrix / Hacker mode |

---

## 🛠️ Customization

All personal content is in **`assets/js/constants.js`**:

```javascript
window.TERM = {
    site: {
        domain: "your-domain.com",
        owner: "Your Name",
        email: "you@example.com",
        socials: {
            github: "https://github.com/you",
            linkedin: "https://linkedin.com/in/you"
        }
    },
    aboutText: [...],     // Your bio
    skillsText: [...],    // Your skills
    projectsText: [...],  // Your projects
};
```

---

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repo
3. Click Deploy — done! Auto-deploys on every push.

### GitHub Pages
1. Go to repo Settings → Pages
2. Set source to `main` branch, root folder
3. Your site is live at `https://username.github.io/repo-name`

### Netlify
1. Drag and drop the project folder at [netlify.com/drop](https://app.netlify.com/drop)

---

## 📄 License

MIT License — feel free to fork and customize for your own portfolio.

---

## 🙏 Credits

- Inspired by [terminal.iabhinav.me](https://terminal.iabhinav.me/)
- Font: [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- Weather: [Open-Meteo API](https://open-meteo.com/)
- Quotes: [Quotable API](https://quotable.io/)

---

<p align="center">
  Built with ☕ and <code>console.log()</code> by <a href="https://www.linkedin.com/in/kaustubh-sharma993/">Kaustubh Sharma</a>
</p>
