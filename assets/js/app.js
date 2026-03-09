(() => {
    const output = document.getElementById("output");
    const inputEl = document.getElementById("input");
    const hintEl = document.getElementById("input-hint");
    const promptEl = document.getElementById("prompt");
    const terminalScreen = document.getElementById("terminal-screen");

    // --- state ---
    let buffer = "";
    let history = JSON.parse(localStorage.getItem("term-history") || "[]");
    let histIndex = history.length;
    let username = localStorage.getItem("term-user") || "visitor";

    const themes = ["dark", "light", "hacker"];
    let currentThemeIndex = themes.indexOf(localStorage.getItem("term-theme") || "dark");
    if (currentThemeIndex === -1) currentThemeIndex = 0;

    const commands = {};
    let isPoweredOn = localStorage.getItem("term-power") !== "off";
    let isBusy = false;
    const STATS = { bootTime: Date.now() };

    // --- Command Registry (for help and autocomplete) ---
    const commandRegistry = [
        { command: "?", description: "Show available commands", args: "[command]" },
        { command: "about", description: "Display info about me" },
        { command: "age", description: "Calculate age from birthdate", args: "<YYYY-MM-DD | DD-MM-YYYY>" },
        { command: "antonym", description: "Get antonyms of a word", args: "<word>" },
        { command: "ascii", description: "Convert text to ASCII art", args: "<text>" },
        { command: "asciiqr", description: "Generate QR code for text", args: "<text>" },
        { command: "base64", description: "Encode or decode Base64", args: "<encode|decode> <text>" },
        { command: "calendar", description: "Show calendar", args: "[month] [year]" },
        { command: "capitalize", description: "Capitalize first letter of each word", args: "<text>" },
        { command: "clear", description: "Clear screen, history, or all", args: "[screen|history|all]" },
        { command: "coin", description: "Flip a coin" },
        { command: "commands", description: "List all commands with descriptions" },
        { command: "contact", description: "Show contact information" },
        { command: "countdays", description: "Count days to/from a date", args: "<YYYY-MM-DD | DD-MM-YYYY>" },
        { command: "country", description: "Get country information", args: "<name>" },
        { command: "curl", description: "Fetch URL content", args: "<url>" },
        { command: "date", description: "Display current date" },
        { command: "define", description: "Get word definitions", args: "<word>" },
        { command: "dice", description: "Roll a dice", args: "[sides]" },
        { command: "dns", description: "Resolve DNS records", args: "<domain>" },
        { command: "echo", description: "Print text to terminal", args: "<text>" },
        { command: "emoji", description: "Show emoji by name", args: "<name>" },
        { command: "geo", description: "Get geolocation info", args: "[ip]" },
        { command: "github", description: "Get GitHub user profile", args: "<username>" },
        { command: "hash", description: "Generate SHA-256 hash", args: "<text>" },
        { command: "help", description: "Show available commands", args: "[command]" },
        { command: "history", description: "View command history", args: "[count]" },
        { command: "hacker", description: "Hollywood-style hacking scene" },
        { command: "ip", description: "Get IP info", args: "[ip_address]" },
        { command: "json", description: "Fetch and pretty-print JSON from URL", args: "<url>" },
        { command: "lowercase", description: "Convert text to lowercase", args: "<text>" },
        { command: "matrix", description: "Toggle Matrix rain overlay", args: "[on|off]" },
        { command: "ping", description: "Measure request latency", args: "<url>" },
        { command: "projects", description: "List my projects" },
        { command: "qr", description: "Generate QR code image", args: "<text>" },
        { command: "quote", description: "Display a random quote" },
        { command: "remind", description: "Set a reminder", args: "<seconds> <message>" },
        { command: "reset", description: "Reset terminal settings" },
        { command: "reverse", description: "Reverse text", args: "<text>" },
        { command: "rps", description: "Play Rock-Paper-Scissors", args: "<rock|paper|scissors>" },
        { command: "set", description: "Set username or theme", args: "<username|theme> <value>" },
        { command: "shorten", description: "Shorten a URL", args: "<url>" },
        { command: "shutdown", description: "Simulate terminal shutdown" },
        { command: "skills", description: "Show my skills" },
        { command: "social", description: "View social profiles" },
        { command: "stock", description: "Get stock price", args: "<symbol>" },
        { command: "stopwatch", description: "Start/stop/reset a stopwatch", args: "<start|stop|reset>" },
        { command: "sudo", description: "Try superuser mode" },
        { command: "synonym", description: "Get synonyms of a word", args: "<word>" },
        { command: "sysinfo", description: "Display system information" },
        { command: "theme", description: "Cycle to next theme" },
        { command: "time", description: "Display current time", args: "[timezone]" },
        { command: "timer", description: "Start countdown timer", args: "<seconds | mm:ss | hh:mm:ss>" },
        { command: "translate", description: "Translate text", args: "<text> <target_lang>" },
        { command: "ttt", description: "Play Tic-Tac-Toe", args: "<1-9 | reset>" },
        { command: "uppercase", description: "Convert text to uppercase", args: "<text>" },
        { command: "uptime", description: "Show session uptime" },
        { command: "uuid", description: "Generate a random UUID" },
        { command: "weather", description: "Show weather for a city", args: "[city]" },
        { command: "whoami", description: "Show current user and system info" }
    ];

    // --- Emoji map ---
    const emojiMap = {
        smile: "😊", grin: "😁", laugh: "😂", joy: "🤣", wink: "😉",
        blush: "😊", cry: "😢", sad: "☹️", angry: "😠", cool: "😎",
        kiss: "😘", heart_eyes: "😍", thinking: "🤔", mindblown: "🤯", sleepy: "😴",
        shocked: "😱", sick: "🤢", ghost: "👻", robot: "🤖", mask: "😷",
        thumbsup: "👍", thumbsdown: "👎", clap: "👏", wave: "👋", ok: "👌",
        pray: "🙏", fist: "✊", punch: "👊",
        heart: "❤️", fire: "🔥", star: "⭐", sparkles: "✨", party: "🥳",
        gift: "🎁", crown: "👑", rocket: "🚀", laptop: "💻", coffee: "☕",
        pizza: "🍕", burger: "🍔", taco: "🌮", beer: "🍺",
        dog: "🐶", cat: "🐱", unicorn: "🦄", panda: "🐼",
        sun: "☀️", moon: "🌙", rainbow: "🌈", snow: "❄️", ocean: "🌊"
    };

    // --- Sound Engine ---
    const sounds = (() => {
        let ctx = null;
        const getCtx = () => {
            if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
            return ctx;
        };
        return {
            shutdown() {
                try {
                    const c = getCtx();
                    const osc = c.createOscillator();
                    const gain = c.createGain();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(200, c.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(28, c.currentTime + 1.8);
                    gain.gain.setValueAtTime(0.22, c.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 1.8);
                    osc.connect(gain); gain.connect(c.destination);
                    osc.start(); osc.stop(c.currentTime + 1.8);
                } catch (e) {}
            },
            startup() {
                try {
                    const c = getCtx();
                    [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
                        const osc = c.createOscillator();
                        const gain = c.createGain();
                        const t = c.currentTime + i * 0.13;
                        osc.type = 'sine'; osc.frequency.value = freq;
                        gain.gain.setValueAtTime(0, t);
                        gain.gain.linearRampToValueAtTime(0.18, t + 0.04);
                        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
                        osc.connect(gain); gain.connect(c.destination);
                        osc.start(t); osc.stop(t + 0.28);
                    });
                } catch (e) {}
            },
            beep(freq = 440, dur = 100) {
                try {
                    const c = getCtx();
                    const osc = c.createOscillator();
                    const gain = c.createGain();
                    osc.type = 'square'; osc.frequency.value = freq;
                    gain.gain.value = 0.15;
                    osc.connect(gain); gain.connect(c.destination);
                    osc.start(); osc.stop(c.currentTime + dur / 1000);
                } catch (e) {}
            },
            notification() {
                try {
                    const c = getCtx();
                    // Pleasant 3-note chime: C5 → E5 → G5
                    [523.25, 659.25, 783.99].forEach((freq, i) => {
                        const osc = c.createOscillator();
                        const gain = c.createGain();
                        const t = c.currentTime + i * 0.18;
                        osc.type = 'sine'; osc.frequency.value = freq;
                        gain.gain.setValueAtTime(0, t);
                        gain.gain.linearRampToValueAtTime(0.25, t + 0.03);
                        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
                        osc.connect(gain); gain.connect(c.destination);
                        osc.start(t); osc.stop(t + 0.5);
                    });
                    // Second pass — soft octave echo
                    setTimeout(() => {
                        [1046.5, 1318.5, 1568.0].forEach((freq, i) => {
                            const osc = c.createOscillator();
                            const gain = c.createGain();
                            const t = c.currentTime + i * 0.18;
                            osc.type = 'sine'; osc.frequency.value = freq;
                            gain.gain.setValueAtTime(0, t);
                            gain.gain.linearRampToValueAtTime(0.1, t + 0.03);
                            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
                            osc.connect(gain); gain.connect(c.destination);
                            osc.start(t); osc.stop(t + 0.4);
                        });
                    }, 600);
                } catch (e) {}
            }
        };
    })();

    // --- helpers ---
    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

    function setPrompt() {
        promptEl.innerHTML = `<span style="color:var(--accent)">${escapeHtml(username)}@${TERM.site.domain}:~$ </span>`;
    }

    const suggestionsEl = document.getElementById("suggestions");

    function updateHint() {
        if (!hintEl) return;
        const token = buffer.trim().toLowerCase();
        // Clear suggestions
        if (suggestionsEl) suggestionsEl.innerHTML = "";

        if (!token) { hintEl.textContent = ""; return; }

        const cmdNames = commandRegistry.map(c => c.command).filter(c => c !== '?');
        const matches = [...new Set(cmdNames)].filter(c => c.startsWith(token) && c !== token);

        // Inline hint (first match)
        if (matches.length > 0) {
            const match = matches[0];
            const entry = commandRegistry.find(c => c.command === match);
            const remainder = match.slice(buffer.length);
            const syntax = entry && entry.args ? " " + entry.args : "";
            hintEl.textContent = remainder + syntax;
        } else {
            const exact = commandRegistry.find(c => c.command === token);
            if (exact && exact.args && !buffer.includes(" ")) {
                hintEl.textContent = " " + exact.args;
            } else {
                hintEl.textContent = "";
            }
        }

        // Suggestion list below (show all matches)
        if (suggestionsEl && matches.length > 1) {
            suggestionsEl.innerHTML = matches
                .slice(0, 8)
                .map(cmd => {
                    const entry = commandRegistry.find(c => c.command === cmd);
                    const desc = entry ? entry.description : "";
                    return `<span>${cmd}</span> <span style="opacity:0.6">— ${desc}</span>`;
                })
                .join("<br>");
        }
    }

    function print(text, cls = "") {
        const div = document.createElement("div");
        if (cls) div.className = cls;
        div.innerHTML = text;
        output.appendChild(div);
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }

    function printBlock(lines, cls = "") {
        lines.forEach(line => print(line, cls));
    }

    function printGrid(items) {
        const div = document.createElement("div");
        div.className = "cmd-grid";
        items.forEach(item => {
            const span = document.createElement("span");
            span.textContent = item;
            span.style.paddingRight = "15px";
            div.appendChild(span);
        });
        output.appendChild(div);
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }

    function clearScreen() { output.innerHTML = ""; }

    function applyTheme() {
        document.documentElement.setAttribute("data-theme", themes[currentThemeIndex]);
        localStorage.setItem("term-theme", themes[currentThemeIndex]);
    }

    const fetchApi = async (url, type = 'json', headers = {}) => {
        try {
            const res = await fetch(url, { headers });
            if (!res.ok) throw new Error("HTTP " + res.status);
            return type === 'json' ? await res.json() : await res.text();
        } catch (e) { return null; }
    };

    function parseTimeArg(input) {
        if (/^\d{1,2}:\d{1,2}(:\d{1,2})?$/.test(input)) {
            const parts = input.split(":").map(Number);
            if (parts.length === 2) return parts[0] * 60 + parts[1];
            if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        return parseInt(input, 10);
    }

    function parseDateArg(input) {
        let normalized = input.replace(/\//g, "-");
        if (/^\d{2}-\d{2}-\d{4}$/.test(normalized)) {
            const [day, month, year] = normalized.split("-");
            return new Date(`${year}-${month}-${day}`);
        }
        return new Date(normalized);
    }

    // ==========================================
    //  COMMAND HANDLERS
    // ==========================================

    // --- Help ---
    commands.help = (args) => {
        if (args && args[0]) {
            const cmdName = args[0].toLowerCase();
            const entry = commandRegistry.find(c => c.command === cmdName);
            if (entry) {
                print(`<span class='accent'>${entry.command}</span>${entry.args ? ' ' + entry.args : ''}`);
                print(`  ${entry.description}`, "hint");
            } else {
                print(`No help entry for '${escapeHtml(cmdName)}'.`, "err");
            }
            return;
        }
        print("💡 <b>Terminal Help Menu:</b><br>");
        const visible = commandRegistry.filter(c => c.command !== '?').map(c => c.command).sort();
        printGrid(visible);
        print("<br><span class='accent'>📌 Tips:</span>");
        print("  • Type <span class='accent'>help &lt;command&gt;</span> for details, e.g. <span class='accent'>help about</span>", "hint");
        print("  • Press <span class='accent'>Tab</span> to auto-complete commands", "hint");
        print("  • Use <span class='accent'>↑</span> / <span class='accent'>↓</span> arrow keys to navigate command history", "hint");
    };
    commands['?'] = (args) => commands.help(args);
    commands.commands = () => commands.help();

    // --- Info ---
    commands.about = () => printBlock(TERM.aboutText);
    commands.projects = () => printBlock(TERM.projectsText);
    commands.skills = () => printBlock(TERM.skillsText);
    commands.social = (args) => {
        if (args && args[0]) {
            const platform = args[0].toLowerCase();
            const urls = TERM.site.socials;
            if (urls[platform]) {
                print(`Opening ${platform}...`);
                window.open(urls[platform], "_blank");
            } else {
                print(`Unknown platform: ${escapeHtml(platform)}. Available: ${Object.keys(urls).join(", ")}`, "err");
            }
            return;
        }
        print(`GitHub:   <a href="${TERM.site.socials.github}" target="_blank" style="color:var(--accent); text-decoration:none">${TERM.site.socials.github}</a>`);
        print(`LinkedIn: <a href="${TERM.site.socials.linkedin}" target="_blank" style="color:var(--accent); text-decoration:none">${TERM.site.socials.linkedin}</a>`);
        print(`Email:    <a href="mailto:${TERM.site.email}" style="color:var(--accent); text-decoration:none">${TERM.site.email}</a>`);
    };
    commands.contact = (args) => commands.social(args);

    // --- Terminal Settings ---
    commands.set = (args) => {
        if (!args || args.length < 2) {
            print("Usage: set &lt;username|theme&gt; &lt;value&gt;", "hint");
            print("  set username &lt;name&gt;  — change your terminal username", "hint");
            print("  set theme &lt;name&gt;     — change theme (dark, light, hacker)", "hint");
            return;
        }
        const key = args[0].toLowerCase();
        const value = args[1];

        if (key === 'username') {
            const clean = value.replace(/[^a-zA-Z0-9_-]/g, "");
            if (!clean || clean.length < 2 || clean.length > 20) {
                return print("Username must be 2-20 chars (letters, numbers, _ or -).", "err");
            }
            username = clean;
            localStorage.setItem("term-user", username);
            setPrompt();
            print(`Username updated to '<span class='accent'>${escapeHtml(username)}</span>'`);
        } else if (key === 'theme') {
            const idx = themes.indexOf(value.toLowerCase());
            if (idx === -1) return print(`Invalid theme. Available: ${themes.join(", ")}`, "err");
            currentThemeIndex = idx;
            applyTheme();
            print(`Theme changed to '<span class='accent'>${themes[currentThemeIndex]}</span>'`);
        } else {
            print(`Unknown setting: '${escapeHtml(key)}'. Use 'username' or 'theme'.`, "err");
        }
    };

    commands.theme = () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        applyTheme();
        print(`Theme switched to: <span class='accent'>${themes[currentThemeIndex]}</span>`);
    };

    commands.clear = (args) => {
        const scope = (args && args[0]) ? args[0].toLowerCase() : "screen";
        if (scope === "screen") {
            clearScreen();
        } else if (scope === "history") {
            localStorage.removeItem("term-history");
            history.length = 0;
            histIndex = 0;
            print("Command history cleared.");
        } else if (scope === "all") {
            clearScreen();
            localStorage.removeItem("term-history");
            history.length = 0;
            histIndex = 0;
            print("Terminal screen and history cleared.");
        } else {
            print("Usage: clear [screen|history|all]", "hint");
        }
    };

    commands.reset = () => {
        print("⚠️ Are you sure? This will clear all settings. Type 'yes' to confirm.");
        pendingConfirm = () => {
            localStorage.clear();
            username = "visitor";
            currentThemeIndex = 0;
            applyTheme();
            setPrompt();
            history.length = 0;
            histIndex = 0;
            print("All terminal settings reset to default.", "accent");
        };
    };
    let pendingConfirm = null;

    // --- User Info ---
    commands.whoami = () => {
        print(`Username: <span class='accent'>${escapeHtml(username)}</span>`);
        print(`OS:       ${navigator.platform || 'Unknown'}`);
        print(`Browser:  ${navigator.userAgent}`);
    };
    commands.username = () => print(escapeHtml(username));

    commands.sysinfo = () => {
        print(`Browser:    <span class='accent'>${navigator.userAgent}</span>`);
        print(`Platform:   ${navigator.platform}`);
        print(`Language:   ${navigator.language}`);
        print(`Screen:     ${screen.width}×${screen.height}`);
        print(`Viewport:   ${window.innerWidth}×${window.innerHeight}`);
        print(`Cores:      ${navigator.hardwareConcurrency || 'N/A'}`);
        print(`Online:     ${navigator.onLine ? 'Yes' : 'No'}`);
    };

    // --- Date & Time ---
    commands.date = () => print(new Date().toDateString());
    commands.time = (args) => {
        if (!args || !args.length) {
            print(new Date().toLocaleTimeString());
            return;
        }
        const tzAliases = {
            "UTC": "UTC", "GMT": "Etc/GMT", "IST": "Asia/Kolkata",
            "EST": "America/New_York", "CST": "America/Chicago",
            "MST": "America/Denver", "PST": "America/Los_Angeles",
            "JST": "Asia/Tokyo", "BST": "Europe/London",
            "CET": "Europe/Paris", "AEST": "Australia/Sydney"
        };
        const input = args.join(" ").toUpperCase();
        const tz = tzAliases[input] || args.join(" ");
        try {
            const time = new Intl.DateTimeFormat([], { timeZone: tz, timeStyle: "medium" }).format(new Date());
            print(`Time in ${escapeHtml(input)}: <span class='accent'>${time}</span>`);
        } catch {
            print("Invalid timezone. Examples: time UTC, time IST, time America/New_York", "err");
        }
    };

    commands.uptime = () => {
        const diff = Math.floor((Date.now() - STATS.bootTime) / 1000);
        const h = Math.floor(diff / 3600);
        const m = Math.floor((diff % 3600) / 60);
        const s = diff % 60;
        print(`Uptime: ${h}h ${m}m ${s}s`);
    };

    commands.countdays = (args) => {
        if (!args[0]) return print("Usage: countdays &lt;YYYY-MM-DD | DD-MM-YYYY&gt;", "hint");
        const target = parseDateArg(args[0]);
        if (isNaN(target.getTime())) return print("Invalid date format. Use YYYY-MM-DD or DD-MM-YYYY.", "err");
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const days = Math.round((target - today) / (1000 * 60 * 60 * 24));
        if (days > 0) print(`📅 ${days} day(s) until ${target.toDateString()}`);
        else if (days === 0) print("🎉 That's today!");
        else print(`📅 ${Math.abs(days)} day(s) since ${target.toDateString()}`);
    };

    commands.age = (args) => {
        if (!args || !args[0]) return print("Usage: age &lt;YYYY-MM-DD | DD-MM-YYYY&gt;", "hint");
        const dob = parseDateArg(args[0]);
        if (isNaN(dob.getTime())) return print("Invalid date. Use YYYY-MM-DD or DD-MM-YYYY.", "err");
        const now = new Date();
        let years = now.getFullYear() - dob.getFullYear();
        let months = now.getMonth() - dob.getMonth();
        let days = now.getDate() - dob.getDate();
        if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
        if (months < 0) { years--; months += 12; }
        print(`🎂 Age: <span class='accent'>${years} years, ${months} months, ${days} days</span>`);
    };

    commands.calendar = (args) => {
        const now = new Date();
        const monthNames = ['january','february','march','april','may','june','july','august','september','october','november','december'];
        let month, year;
        if (args && args[0]) {
            const m = monthNames.indexOf(args[0].toLowerCase());
            month = m !== -1 ? m : parseInt(args[0]) - 1;
        } else {
            month = now.getMonth();
        }
        year = args && args[1] ? parseInt(args[1]) : now.getFullYear();
        if (isNaN(month) || month < 0 || month > 11) month = now.getMonth();
        if (isNaN(year)) year = now.getFullYear();
        const display = new Date(year, month, 1);
        print(`<span class='accent'>${display.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>`);
        print("Su Mo Tu We Th Fr Sa", "hint");
        print("─".repeat(20), "hint");
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const isCurrentMonth = (month === now.getMonth() && year === now.getFullYear());
        const today = isCurrentMonth ? now.getDate() : -1;
        let row = "   ".repeat(firstDay);
        for (let d = 1; d <= daysInMonth; d++) {
            const dayStr = String(d).padStart(2, " ");
            if (d === today) {
                row += `<span class='cal-today'>${dayStr}</span>`;
            } else {
                row += dayStr;
            }
            if ((firstDay + d) % 7 === 0) { print(row); row = ""; }
            else row += " ";
        }
        if (row.trim()) print(row);
    };

    // --- Timers ---
    commands.timer = (args) => {
        if (!args || !args[0]) return print("Usage: timer &lt;seconds | mm:ss | hh:mm:ss&gt;", "hint");
        let totalSeconds = parseTimeArg(args[0]);
        if (isNaN(totalSeconds) || totalSeconds <= 0) return print("Invalid time format.", "err");

        const formatTime = (sec) => {
            const h = Math.floor(sec / 3600);
            const m = Math.floor((sec % 3600) / 60);
            const s = sec % 60;
            return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
        };

        print(`⏳ Timer started for ${totalSeconds} second(s)...`);
        const timerDiv = document.createElement("div");
        timerDiv.className = "accent";
        output.appendChild(timerDiv);

        let remaining = totalSeconds;
        timerDiv.textContent = `${formatTime(remaining)} remaining`;

        const interval = setInterval(() => {
            remaining--;
            if (remaining > 0) {
                timerDiv.textContent = `${formatTime(remaining)} remaining`;
                terminalScreen.scrollTop = terminalScreen.scrollHeight;
            } else {
                clearInterval(interval);
                timerDiv.textContent = "⏰ Timer finished!";
                sounds.beep(880, 300);
                terminalScreen.scrollTop = terminalScreen.scrollHeight;
            }
        }, 1000);
    };

    let stopwatchStart = 0;
    commands.stopwatch = (args) => {
        if (!args || !args[0]) return print("Usage: stopwatch &lt;start|stop|reset&gt;", "hint");
        const action = args[0].toLowerCase();
        if (action === 'start') {
            if (stopwatchStart) return print("Stopwatch already running. Use 'stopwatch stop' first.", "hint");
            stopwatchStart = Date.now();
            print("⏱️ Stopwatch started.");
        } else if (action === 'stop') {
            if (!stopwatchStart) return print("Stopwatch is not running.", "err");
            const elapsed = ((Date.now() - stopwatchStart) / 1000).toFixed(2);
            print(`⏱️ Elapsed: <span class='accent'>${elapsed}s</span>`);
            stopwatchStart = 0;
        } else if (action === 'reset') {
            stopwatchStart = 0;
            print("⏱️ Stopwatch reset.");
        } else {
            print("Usage: stopwatch &lt;start|stop|reset&gt;", "hint");
        }
    };

    commands.remind = (args) => {
        if (!args || args.length < 2) return print("Usage: remind &lt;seconds | mm:ss&gt; &lt;message&gt;", "hint");
        let totalSeconds = parseTimeArg(args[0]);
        if (isNaN(totalSeconds) || totalSeconds <= 0) return print("Invalid time. Use seconds or mm:ss.", "err");
        const message = args.slice(1).join(" ");
        print(`⏳ Reminder set for ${totalSeconds}s: "${escapeHtml(message)}"`);
        setTimeout(() => {
            print(`🔔 <span class='accent'>REMINDER:</span> ${escapeHtml(message)}`);
            sounds.notification();
            terminalScreen.scrollTop = terminalScreen.scrollHeight;
        }, totalSeconds * 1000);
    };

    // --- Text Manipulation ---
    commands.echo = (args) => print(escapeHtml(args.join(" ")));
    commands.uppercase = (args) => {
        if (!args.length) return print("Usage: uppercase &lt;text&gt;", "hint");
        print(escapeHtml(args.join(" ").toUpperCase()));
    };
    commands.lowercase = (args) => {
        if (!args.length) return print("Usage: lowercase &lt;text&gt;", "hint");
        print(escapeHtml(args.join(" ").toLowerCase()));
    };
    commands.capitalize = (args) => {
        if (!args.length) return print("Usage: capitalize &lt;text&gt;", "hint");
        print(escapeHtml(args.join(" ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())));
    };
    commands.reverse = (args) => {
        if (!args.length) return print("Usage: reverse &lt;text&gt;", "hint");
        print(escapeHtml(args.join(" ").split("").reverse().join("")));
    };

    // --- Crypto ---
    commands.base64 = (args) => {
        if (!args[0] || (args[0] !== 'encode' && args[0] !== 'decode'))
            return print("Usage: base64 &lt;encode|decode&gt; &lt;text&gt;", "hint");
        try {
            if (args[0] === 'encode') print(escapeHtml(btoa(args.slice(1).join(" "))));
            else print(escapeHtml(atob(args.slice(1).join(" "))));
        } catch (e) { print("Invalid base64 string.", "err"); }
    };
    commands.hash = async (args) => {
        if (!args.length) return print("Usage: hash &lt;text&gt;", "hint");
        const text = args.join(" ");
        const msgUint8 = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
        print(`<span class='accent'>🔒 Hash for '${escapeHtml(text)}':</span>`);
        print(`SHA-256: ${hashHex}`);
    };
    commands.uuid = () => print(crypto.randomUUID ? crypto.randomUUID() : 'UUID API not supported');
    commands.sudo = () => print("Nice try, user. This incident will be reported. 🚨", "err");

    // --- Fun & Games ---
    commands.coin = () => {
        isBusy = true;
        print("🪙 Flipping a coin...");
        setTimeout(() => {
            print(Math.random() > 0.5
                ? "<span class='accent' style='font-size:18px'>🪙 Heads</span>"
                : "<span class='accent' style='font-size:18px'>🪙 Tails</span>");
            isBusy = false;
        }, 800);
    };

    commands.dice = (args) => {
        const sides = parseInt(args && args[0]) || 6;
        if (sides < 2) return print("Dice must have at least 2 sides.", "err");
        const roll = Math.floor(Math.random() * sides) + 1;
        const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
        if (sides === 6) {
            print(`<span style='font-size:40px'>${diceFaces[roll - 1]}</span>`);
            print(`🎲 You rolled a <span class='accent'>${roll}</span>`);
        } else {
            print(`🎲 You rolled a <span class='accent'>${roll}</span> (d${sides})`);
        }
    };

    commands.rps = (args) => {
        const valid = ['rock', 'paper', 'scissors'];
        const userM = args[0]?.toLowerCase();
        if (!valid.includes(userM)) return print("Usage: rps &lt;rock|paper|scissors&gt;", "hint");
        const sysM = valid[Math.floor(Math.random() * 3)];
        print(`You chose ${userM}, computer chose ${sysM}.`);
        if (userM === sysM) print("🤝 It's a tie!");
        else if ((userM === 'rock' && sysM === 'scissors') || (userM === 'paper' && sysM === 'rock') || (userM === 'scissors' && sysM === 'paper'))
            print("🎉 You win!", "accent");
        else print("😢 You lose!", "err");
    };

    commands.emoji = (args) => {
        if (!args || !args.length) {
            print("Usage: emoji &lt;name&gt;  — e.g. emoji fire", "hint");
            print("Available: " + Object.keys(emojiMap).join(", "), "hint");
            return;
        }
        const name = args[0].toLowerCase();
        const emoji = emojiMap[name];
        if (emoji) print(`${name}: <span style='font-size:24px'>${emoji}</span>`);
        else print(`No emoji found for '${escapeHtml(name)}'. Type 'emoji' to see available names.`, "err");
    };

    // --- Matrix Rain ---
    let matrixState = { running: false, rafId: null, overlay: null };

    function startMatrix() {
        if (matrixState.running) return;
        const overlay = document.createElement('div');
        overlay.className = 'matrix-overlay active';
        overlay.setAttribute('aria-hidden', 'true');
        const canvas = document.createElement('canvas');
        overlay.appendChild(canvas);
        document.body.appendChild(overlay);
        matrixState.overlay = overlay;

        const ctx = canvas.getContext('2d');
        const fontSize = 16;
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        let columns = new Array(Math.floor(canvas.width / fontSize)).fill(1);
        const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${fontSize}px monospace`;
            ctx.fillStyle = '#0F0';
            for (let i = 0; i < columns.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * fontSize, columns[i] * fontSize);
                if (columns[i] * fontSize > canvas.height && Math.random() > 0.975) columns[i] = 0;
                columns[i]++;
            }
            matrixState.rafId = requestAnimationFrame(draw);
        }

        function stopHandler(e) {
            if (e.key === 'Escape' || e.type === 'click') stopMatrix();
        }
        document.addEventListener('keydown', stopHandler);
        overlay.addEventListener('click', stopHandler);
        overlay._stopHandler = stopHandler;
        overlay._resize = resize;

        matrixState.running = true;
        matrixState.rafId = requestAnimationFrame(draw);
    }

    function stopMatrix() {
        if (!matrixState.running) return;
        if (matrixState.rafId) cancelAnimationFrame(matrixState.rafId);
        const overlay = matrixState.overlay;
        if (overlay) {
            if (overlay._stopHandler) {
                document.removeEventListener('keydown', overlay._stopHandler);
                overlay.removeEventListener('click', overlay._stopHandler);
            }
            if (overlay._resize) window.removeEventListener('resize', overlay._resize);
            overlay.remove();
        }
        matrixState = { running: false, rafId: null, overlay: null };
    }

    commands.matrix = (args) => {
        const mode = args && args[0] ? args[0].toLowerCase() : null;
        if (mode === 'off') { stopMatrix(); print("Matrix stopped."); return; }
        if (matrixState.running) { stopMatrix(); }
        print("🌌 Starting Matrix rain... Press <span class='accent'>Esc</span> or click to stop.");
        setTimeout(() => startMatrix(), 500);
    };

    // --- Tic-Tac-Toe ---

    // --- Hacker Scene ---
    let hackerState = { running: false, intervals: [], overlay: null };

    function startHacker() {
        if (hackerState.running) return;
        hackerState.running = true;

        const overlay = document.createElement("div");
        overlay.id = "hacker-overlay";
        overlay.innerHTML = `
            <div class="hw-grid">
                <div class="hw-pane" id="hw-hex"></div>
                <div class="hw-pane" id="hw-net"></div>
                <div class="hw-pane" id="hw-sys"></div>
                <div class="hw-pane" id="hw-crack"></div>
                <div class="hw-pane" id="hw-compile"></div>
                <div class="hw-pane" id="hw-tree"></div>
                <div class="hw-pane" id="hw-cpu"></div>
                <div class="hw-pane" id="hw-dns"></div>
                <div class="hw-pane" id="hw-access"></div>
            </div>
            <div class="hw-exit-hint">Press <kbd>Esc</kbd> or click to exit</div>
        `;
        document.body.appendChild(overlay);
        hackerState.overlay = overlay;

        const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const randHex = (n) => Array.from({length: n}, () => Math.floor(Math.random()*256).toString(16).padStart(2,'0')).join(' ');
        const randIP = () => `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
        const randPort = () => Math.floor(Math.random()*65535);
        const ts = () => new Date().toISOString().replace('T',' ').slice(0,19);

        const protocols = ['TCP','UDP','ICMP','SSH','TLS','HTTP','DNS','ARP','HTTPS','SMTP'];
        const actions = ['SYN','ACK','PSH','FIN','RST','SYN-ACK','DATA','KEEPALIVE'];
        const services = ['sshd','nginx','kernel','systemd','cron','docker','firewalld','auditd','rsyslog','node'];
        const levels = ['INFO','WARN','DEBUG','NOTICE','ALERT'];
        const files = ['/usr/lib/gcc/x86_64','/opt/node_modules','/var/cache/apt','/sys/kernel','/proc/meminfo','/etc/shadow','/root/.ssh','/var/log/auth.log'];
        const hashes = () => Array.from({length:64}, () => '0123456789abcdef'[Math.floor(Math.random()*16)]).join('');

        function appendLine(paneId, text, color) {
            const pane = document.getElementById(paneId);
            if (!pane) return;
            const line = document.createElement('div');
            line.style.color = color || '#0f0';
            line.textContent = text;
            pane.appendChild(line);
            if (pane.children.length > 80) pane.removeChild(pane.firstChild);
            pane.scrollTop = pane.scrollHeight;
        }

        // Hex dump
        hackerState.intervals.push(setInterval(() => {
            const addr = Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(8,'0');
            appendLine('hw-hex', `0x${addr}  ${randHex(16)}`, rand(['#0f0','#0a0','#0d0','#0f4']));
        }, 60));

        // Network traffic
        hackerState.intervals.push(setInterval(() => {
            const src = randIP(), dst = randIP();
            const proto = rand(protocols), action = rand(actions);
            const bytes = Math.floor(Math.random()*9999);
            appendLine('hw-net', `${ts()} ${proto} ${src}:${randPort()} → ${dst}:${randPort()} [${action}] ${bytes}B`, rand(['#0ff','#0af','#08f','#0df']));
        }, 90));

        // System logs
        hackerState.intervals.push(setInterval(() => {
            const svc = rand(services), lvl = rand(levels);
            const msgs = [
                `Process ${Math.floor(Math.random()*9999)} forked successfully`,
                `Memory page fault at 0x${Math.floor(Math.random()*0xFFFF).toString(16)}`,
                `Socket connection established fd=${Math.floor(Math.random()*999)}`,
                `Buffer allocated ${Math.floor(Math.random()*4096)}KB at ring0`,
                `Firewall rule updated: ACCEPT chain INPUT`,
                `Auth attempt from ${randIP()} — key fingerprint SHA256:${hashes().slice(0,43)}`,
                `CPU thermal throttle cleared — core ${Math.floor(Math.random()*16)}`,
                `inode cache pruned: freed ${Math.floor(Math.random()*5000)} entries`
            ];
            appendLine('hw-sys', `[${ts()}] ${svc}[${lvl}]: ${rand(msgs)}`, rand(['#ff0','#fa0','#fd0','#ff4']));
        }, 120));

        // Password cracking
        let crackCount = 0;
        hackerState.intervals.push(setInterval(() => {
            crackCount++;
            const hash = hashes();
            const status = crackCount % 37 === 0 ? '✓ CRACKED' : 'testing...';
            const color = status.includes('CRACKED') ? '#f00' : '#f44';
            appendLine('hw-crack', `[${String(crackCount).padStart(6,'0')}] SHA256:${hash.slice(0,48)}... ${status}`, color);
        }, 50));

        // Compilation
        hackerState.intervals.push(setInterval(() => {
            const file = rand(files);
            const msgs = [
                `gcc -O2 -Wall -c ${file}/module_${Math.floor(Math.random()*99)}.c`,
                `ld -shared -o libcrypto.so.${Math.floor(Math.random()*9)}.${Math.floor(Math.random()*9)}`,
                `make[${Math.floor(Math.random()*5)}]: Entering directory '${file}'`,
                `Compiling ${Math.floor(Math.random()*999)} source files...`,
                `Linking object files → binary [${Math.floor(Math.random()*100)}%]`,
                `CC      drivers/gpu/drm/i915/i915_gem_context.o`,
                `AR      lib/lib.a`,
                `OBJCOPY arch/x86/boot/compressed/vmlinux.bin`
            ];
            appendLine('hw-compile', rand(msgs), rand(['#fff','#ccc','#aaa','#ddd']));
        }, 100));

        // File tree traversal
        hackerState.intervals.push(setInterval(() => {
            const depth = Math.floor(Math.random()*4);
            const indent = '│   '.repeat(depth) + rand(['├── ','└── ']);
            const names = ['exploit.py','payload.bin','keyring.db','shadow.bak','core.dump','rootkit.so','auth.log','id_rsa','token.jwt','session.key'];
            const size = `${Math.floor(Math.random()*9999)}K`;
            appendLine('hw-tree', `${indent}${rand(names)}  ${size}`, rand(['#a0f','#c0f','#80f','#b4f']));
        }, 130));

        // CPU / Memory monitor
        hackerState.intervals.push(setInterval(() => {
            const cores = Array.from({length: 8}, (_, i) => {
                const usage = Math.floor(Math.random() * 100);
                const bar = '█'.repeat(Math.floor(usage / 5)) + '░'.repeat(20 - Math.floor(usage / 5));
                return `CPU${i} [${bar}] ${String(usage).padStart(3)}%`;
            });
            const mem = Math.floor(Math.random() * 32768);
            const swap = Math.floor(Math.random() * 8192);
            const line = rand(cores);
            appendLine('hw-cpu', line, rand(['#0f0','#ff0','#f80','#f00'].slice(0, line.includes('9') ? 4 : 2)));
            if (Math.random() < 0.15) {
                appendLine('hw-cpu', `MEM: ${mem}MB/32768MB  SWAP: ${swap}MB/8192MB  LOAD: ${(Math.random()*12).toFixed(2)}`, '#0ff');
            }
        }, 110));

        // DNS resolution
        const domains = ['github.com','google.com','cloudflare.com','aws.amazon.com','api.stripe.com','cdn.jsdelivr.net','registry.npmjs.org','docker.io','kernel.org','debian.org','arch.linux.org','pypi.org'];
        const recordTypes = ['A','AAAA','CNAME','MX','NS','TXT','SOA','PTR'];
        hackerState.intervals.push(setInterval(() => {
            const domain = rand(domains);
            const type = rand(recordTypes);
            const ttl = Math.floor(Math.random() * 86400);
            const value = type === 'A' ? randIP() : type === 'AAAA' ? `2001:db8::${randHex(2).replace(' ',':')}` : type === 'MX' ? `${Math.floor(Math.random()*50)} mail.${domain}` : type === 'CNAME' ? `cdn-${Math.floor(Math.random()*99)}.${domain}` : `ns${Math.floor(Math.random()*4)+1}.${domain}`;
            appendLine('hw-dns', `dig ${type} ${domain}  →  ${value}  TTL:${ttl}`, rand(['#0f8','#0fa','#0fc','#0f6']));
        }, 140));

        // Access log (Apache/Nginx style)
        const methods = ['GET','POST','PUT','DELETE','PATCH','OPTIONS','HEAD'];
        const paths = ['/api/v1/users','/login','/dashboard','/api/data','/static/app.js','/graphql','/webhook','/api/v2/auth/token','/health','/metrics','/admin/config'];
        const agents = ['Mozilla/5.0','curl/7.88','Python-urllib/3.11','Go-http-client/2.0','PostmanRuntime/7.32'];
        const statusCodes = [200,200,200,201,301,304,400,401,403,404,500,502,503];
        hackerState.intervals.push(setInterval(() => {
            const method = rand(methods);
            const path = rand(paths);
            const code = rand(statusCodes);
            const size = Math.floor(Math.random() * 50000);
            const color = code < 300 ? '#0f0' : code < 400 ? '#0ff' : code < 500 ? '#ff0' : '#f00';
            appendLine('hw-access', `${randIP()} - [${ts()}] "${method} ${path} HTTP/2" ${code} ${size} "${rand(agents)}"`, color);
        }, 85));

        // Exit handlers
        const exitHacker = () => stopHacker();
        overlay.addEventListener('click', exitHacker);
        hackerState.escHandler = (e) => { if (e.key === 'Escape') stopHacker(); };
        document.addEventListener('keydown', hackerState.escHandler);
    }

    function stopHacker() {
        if (!hackerState.running) return;
        hackerState.intervals.forEach(clearInterval);
        hackerState.intervals = [];
        if (hackerState.overlay) {
            hackerState.overlay.remove();
            hackerState.overlay = null;
        }
        if (hackerState.escHandler) {
            document.removeEventListener('keydown', hackerState.escHandler);
            hackerState.escHandler = null;
        }
        hackerState.running = false;
    }

    commands.hacker = () => {
        if (hackerState.running) { stopHacker(); print("Hacker mode stopped."); return; }
        print("🎬 Entering hacker mode... Press <span class='accent'>Esc</span> or click to exit.");
        setTimeout(() => startHacker(), 300);
    };

    // --- Tic-Tac-Toe ---
    let tttBoard = Array(9).fill(" ");
    let tttTurn = "X";
    let tttGameOver = false;

    function renderTttBoard() {
        return ` ${tttBoard[0]} | ${tttBoard[1]} | ${tttBoard[2]}\n---+---+---\n ${tttBoard[3]} | ${tttBoard[4]} | ${tttBoard[5]}\n---+---+---\n ${tttBoard[6]} | ${tttBoard[7]} | ${tttBoard[8]}`;
    }

    function checkTttWinner() {
        const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for (const [a, b, c] of wins) {
            if (tttBoard[a] !== " " && tttBoard[a] === tttBoard[b] && tttBoard[a] === tttBoard[c]) return tttBoard[a];
        }
        return null;
    }

    commands.ttt = (args) => {
        if (!args || !args.length) return print("Usage: ttt &lt;1-9&gt; or ttt reset", "hint");
        if (args[0] === 'reset' || args[0] === 'start') {
            tttBoard = Array(9).fill(" ");
            tttTurn = "X";
            tttGameOver = false;
            print("🎮 New game! Player X goes first.\n" + renderTttBoard());
            return;
        }
        if (tttGameOver) return print("⚠️ Game over! Type 'ttt reset' to start a new one.", "hint");
        const move = parseInt(args[0], 10);
        if (isNaN(move) || move < 1 || move > 9) return print("Invalid move. Use 1-9.", "err");
        if (tttBoard[move - 1] !== " ") return print("❌ Cell already taken!\n" + renderTttBoard(), "err");
        tttBoard[move - 1] = tttTurn;
        const winner = checkTttWinner();
        if (winner) { print(renderTttBoard() + `\n🏆 Player ${winner} wins!`, "accent"); tttGameOver = true; return; }
        if (tttBoard.every(c => c !== " ")) { print(renderTttBoard() + "\n🤝 It's a draw!"); tttGameOver = true; return; }
        tttTurn = tttTurn === "X" ? "O" : "X";
        print(renderTttBoard() + `\n👉 Player ${tttTurn}'s turn.`);
    };

    // --- Terminal Utils ---
    commands.history = (args) => {
        if (!history.length) return print("No command history.", "hint");
        let count = history.length;
        if (args && args[0] && !isNaN(parseInt(args[0]))) count = Math.min(parseInt(args[0]), history.length);
        const slice = history.slice(-count);
        printBlock(slice.map((h, i) => `${i + 1}  ${escapeHtml(h)}`), "hint");
    };

    // --- Network Commands ---
    commands.ip = async (args) => {
        const ipArg = args && args[0] ? args[0] : null;
        isBusy = true;
        print(ipArg ? `Fetching info for ${escapeHtml(ipArg)}...` : "Fetching your IP...");
        try {
            if (ipArg) {
                const data = await fetchApi(`https://ipapi.co/${encodeURIComponent(ipArg)}/json/`);
                if (data && !data.error) {
                    print(`IP:      ${escapeHtml(ipArg)}`);
                    print(`City:    ${escapeHtml(data.city || 'Unknown')}`);
                    print(`Region:  ${escapeHtml(data.region || 'Unknown')}`);
                    print(`Country: ${escapeHtml(data.country_name || 'Unknown')}`);
                    print(`ISP:     ${escapeHtml(data.org || 'Unknown')}`);
                } else print(`Invalid IP address: ${escapeHtml(ipArg)}`, "err");
            } else {
                const ipData = await fetchApi('https://api.ipify.org?format=json');
                if (ipData && ipData.ip) {
                    const data = await fetchApi(`https://ipapi.co/${ipData.ip}/json/`);
                    if (data && !data.error) {
                        print(`IP:      <span class='accent'>${escapeHtml(ipData.ip)}</span>`);
                        print(`City:    ${escapeHtml(data.city || 'Unknown')}`);
                        print(`Region:  ${escapeHtml(data.region || 'Unknown')}`);
                        print(`Country: ${escapeHtml(data.country_name || 'Unknown')}`);
                        print(`ISP:     ${escapeHtml(data.org || 'Unknown')}`);
                    } else print(`Public IP: <span class='accent'>${escapeHtml(ipData.ip)}</span>`);
                } else print("Failed to resolve IP.", "err");
            }
        } catch (e) { print("Error fetching IP info.", "err"); }
        isBusy = false;
    };

    commands.geo = async (args) => {
        const ip = args && args[0] ? args[0] : '';
        isBusy = true;
        print("Locating" + (ip ? " " + escapeHtml(ip) : "") + "...");
        const data = await fetchApi(`https://ipapi.co/${encodeURIComponent(ip)}/json/`);
        if (data && !data.error) {
            print(`City:    ${escapeHtml(data.city)}`);
            print(`Region:  ${escapeHtml(data.region)}`);
            print(`Country: ${escapeHtml(data.country_name)}`);
            print(`ISP:     ${escapeHtml(data.org)}`);
            if (data.latitude) print(`Coords:  ${data.latitude}, ${data.longitude}`);
        } else print("Geolocation failed.", "err");
        isBusy = false;
    };

    commands.weather = async (args) => {
        isBusy = true;
        let city = args ? args.join(" ").trim() : "";
        if (!city) {
            print("Fetching weather for your location...");
            try {
                const loc = await fetchApi("https://ipapi.co/json/");
                if (loc && loc.latitude) {
                    const w = await fetchApi(`https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current_weather=true`);
                    if (w && w.current_weather) {
                        print(`☀️ Weather for ${escapeHtml(loc.city || 'Your Location')}:`);
                        print(`Temperature: <span class='accent'>${w.current_weather.temperature}°C</span>`);
                        print(`Wind: ${w.current_weather.windspeed} km/h`);
                    } else print("Could not fetch weather.", "err");
                } else print("Could not detect location.", "err");
            } catch { print("Weather fetch failed.", "err"); }
        } else {
            print(`Fetching weather for '${escapeHtml(city)}'...`);
            try {
                const geo = await fetchApi(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
                if (geo && geo.results && geo.results.length) {
                    const loc = geo.results[0];
                    const w = await fetchApi(`https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current_weather=true`);
                    if (w && w.current_weather) {
                        print(`☀️ Weather for ${escapeHtml(loc.name)}, ${escapeHtml(loc.country || '')}:`);
                        print(`Temperature: <span class='accent'>${w.current_weather.temperature}°C</span>`);
                        print(`Wind: ${w.current_weather.windspeed} km/h`);
                    } else print("Could not fetch weather data.", "err");
                } else print(`No location found for '${escapeHtml(city)}'.`, "err");
            } catch { print("Weather fetch failed.", "err"); }
        }
        isBusy = false;
    };

    commands.github = async (args) => {
        if (!args || !args[0]) return print("Usage: github &lt;username&gt;", "hint");
        isBusy = true;
        print(`Fetching GitHub profile for '${escapeHtml(args[0])}'...`);
        const data = await fetchApi(`https://api.github.com/users/${encodeURIComponent(args[0])}`);
        if (data && data.login) {
            const joinDate = new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
            print(`<div style="display:flex; align-items:center; gap:15px; margin:8px 0;"><img src="${escapeHtml(data.avatar_url)}" style="width:60px; height:60px; border-radius:50%; border:2px solid var(--accent);" /><div><b>${escapeHtml(data.name || data.login)}</b><br>Member since: ${joinDate}<br>Repos: ${data.public_repos} | Followers: ${data.followers} | Following: ${data.following}<br>Profile: <a href="${escapeHtml(data.html_url)}" target="_blank" style="color:var(--accent)">${escapeHtml(data.html_url)}</a></div></div>`);
        } else print("User not found.", "err");
        isBusy = false;
    };

    commands.quote = async () => {
        isBusy = true;
        const data = await fetchApi('https://dummyjson.com/quotes/random');
        if (data && data.quote) print(`💬 "${escapeHtml(data.quote)}"<br>— <span class='accent'>${escapeHtml(data.author)}</span>`);
        else print("Silence is golden.", "hint");
        isBusy = false;
    };

    commands.shorten = async (args) => {
        if (!args || !args[0]) return print("Usage: shorten &lt;url&gt;", "hint");
        isBusy = true;
        print("Shortening URL...");
        try {
            const data = await fetchApi(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(args[0])}`, 'text');
            if (data) print(`Shortened: <a href="${escapeHtml(data)}" target="_blank" class='accent'>${escapeHtml(data)}</a>`);
            else print("Failed to shorten URL.", "err");
        } catch { print("Failed to shorten URL.", "err"); }
        isBusy = false;
    };

    commands.dns = async (args) => {
        if (!args || !args[0]) return print("Usage: dns &lt;domain&gt;", "hint");
        isBusy = true;
        print(`Resolving DNS for ${escapeHtml(args[0])}...`);
        const data = await fetchApi(`https://dns.google/resolve?name=${encodeURIComponent(args[0])}`);
        if (data && data.Answer) {
            data.Answer.forEach(a => print(`${escapeHtml(a.name)} → ${escapeHtml(a.data)}`));
        } else print("No DNS records found.", "err");
        isBusy = false;
    };
    commands.dnslookup = (args) => commands.dns(args);

    commands.curl = async (args) => {
        if (!args || !args[0]) return print("Usage: curl &lt;url&gt;", "hint");
        isBusy = true;
        const url = args[0].startsWith('http') ? args[0] : 'https://' + args[0];
        print(`Fetching ${escapeHtml(url)}...`);
        try {
            const res = await fetch(url);
            const contentType = res.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
                const json = await res.json();
                print("<pre>" + escapeHtml(JSON.stringify(json, null, 2).substring(0, 2000)) + "</pre>");
            } else {
                const text = await res.text();
                print("<pre>" + escapeHtml(text.substring(0, 2000)) + "</pre>");
            }
            if (contentType.includes("json") || true) {}
        } catch (e) {
            print(`Error fetching ${escapeHtml(url)}: ${escapeHtml(e.message)}`, "err");
        }
        isBusy = false;
    };

    commands.ping = async (args) => {
        if (!args || !args[0]) return print("Usage: ping &lt;url&gt;", "hint");
        const url = args[0].startsWith('http') ? args[0] : 'https://' + args[0];
        isBusy = true;
        print(`Pinging ${escapeHtml(url)}...`);
        const start = performance.now();
        try { await fetch(url, { mode: 'no-cors' }); } catch (e) {}
        const ms = (performance.now() - start).toFixed(2);
        print(`Ping to ${escapeHtml(url)}: <span class='accent'>${ms} ms</span>`);
        isBusy = false;
    };

    commands.define = async (args) => {
        if (!args || !args[0]) return print("Usage: define &lt;word&gt;", "hint");
        const word = args.join(" ").trim();
        isBusy = true;
        print(`Fetching definitions for '${escapeHtml(word)}'...`);
        const data = await fetchApi(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
        if (data && Array.isArray(data) && data[0]) {
            const meanings = data[0].meanings.map(m =>
                `<b>${escapeHtml(m.partOfSpeech)}:</b> ${m.definitions.map(d => escapeHtml(d.definition)).join("; ")}`
            ).join("<br>");
            print(`📖 <span class='accent'>Definitions for '${escapeHtml(word)}':</span><br>${meanings}`);
        } else print(`No definition found for '${escapeHtml(word)}'.`, "err");
        isBusy = false;
    };

    commands.synonym = async (args) => {
        if (!args || !args[0]) return print("Usage: synonym &lt;word&gt;", "hint");
        const word = args.join(" ").trim();
        isBusy = true;
        print(`Fetching synonyms for '${escapeHtml(word)}'...`);
        const data = await fetchApi(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
        if (data && Array.isArray(data) && data[0]) {
            const synonyms = data[0].meanings.flatMap(m => m.definitions.flatMap(d => d.synonyms || []));
            if (synonyms.length) print(`Synonyms for '${escapeHtml(word)}': <span class='accent'>${escapeHtml(synonyms.join(", "))}</span>`);
            else print(`No synonyms found for '${escapeHtml(word)}'.`, "hint");
        } else print(`No data found for '${escapeHtml(word)}'.`, "err");
        isBusy = false;
    };

    commands.antonym = async (args) => {
        if (!args || !args[0]) return print("Usage: antonym &lt;word&gt;", "hint");
        const word = args.join(" ").trim();
        isBusy = true;
        print(`Fetching antonyms for '${escapeHtml(word)}'...`);
        const data = await fetchApi(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
        if (data && Array.isArray(data) && data[0]) {
            const antonyms = data[0].meanings.flatMap(m => m.definitions.flatMap(d => d.antonyms || []));
            if (antonyms.length) print(`Antonyms for '${escapeHtml(word)}': <span class='accent'>${escapeHtml(antonyms.join(", "))}</span>`);
            else print(`No antonyms found for '${escapeHtml(word)}'.`, "hint");
        } else print(`No data found for '${escapeHtml(word)}'.`, "err");
        isBusy = false;
    };

    commands.qr = (args) => {
        if (!args || !args[0]) return print("Usage: qr &lt;text&gt;", "hint");
        const text = args.join(" ");
        print(`Generating QR code for: ${escapeHtml(text)}`);
        print(`<div style="display:inline-block; padding:10px; background:white; border-radius:8px; margin-top:8px;"><img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}" style="width:200px; height:200px;" alt="QR Code" /></div>`);
    };
    commands.asciiqr = (args) => commands.qr(args);

    commands.ascii = async (args) => {
        if (!args || !args[0]) return print("Usage: ascii &lt;text&gt;", "hint");
        isBusy = true;
        const txt = encodeURIComponent(args.join(" "));
        const data = await fetchApi(`https://asciified.thelicato.io/api/v2/ascii?text=${txt}`, 'text');
        if (data) print(`<pre class="ascii-art">${escapeHtml(data)}</pre>`);
        else print("ASCII generator unavailable.", "err");
        isBusy = false;
    };

    commands.json = async (args) => {
        if (!args || !args[0]) return print("Usage: json &lt;url&gt;", "hint");
        const url = args[0].startsWith('http') ? args[0] : 'https://' + args[0];
        isBusy = true;
        print(`Fetching JSON from ${escapeHtml(url)}...`);
        try {
            const res = await fetch(url);
            const data = await res.json();
            print("<pre>" + escapeHtml(JSON.stringify(data, null, 2).substring(0, 3000)) + "</pre>");
        } catch (e) { print(`Error: ${escapeHtml(e.message)}`, "err"); }
        isBusy = false;
    };

    commands.country = async (args) => {
        if (!args || !args[0]) return print("Usage: country &lt;name&gt;", "hint");
        isBusy = true;
        const data = await fetchApi(`https://restcountries.com/v3.1/name/${encodeURIComponent(args.join(" "))}`);
        if (data && data[0]) {
            const c = data[0];
            const currencies = c.currencies ? Object.values(c.currencies).map(cu => `${cu.name} (${cu.symbol})`).join(", ") : 'N/A';
            print(`${c.flag} <b>${escapeHtml(c.name.common)}</b> (${escapeHtml(c.cca2)})`);
            print(`Capital:    ${escapeHtml(c.capital?.[0] || 'N/A')}`);
            print(`Region:     ${escapeHtml(c.region)} / ${escapeHtml(c.subregion || 'N/A')}`);
            print(`Population: ${c.population.toLocaleString()}`);
            print(`Currency:   ${escapeHtml(currencies)}`);
            print(`Languages:  ${c.languages ? escapeHtml(Object.values(c.languages).join(", ")) : 'N/A'}`);
        } else print("Country not found.", "err");
        isBusy = false;
    };

    commands.stock = async (args) => {
        if (!args || !args[0]) return print("Usage: stock &lt;symbol&gt;", "hint");
        isBusy = true;
        const sym = args[0].toUpperCase();
        print(`📊 Fetching stock data for ${escapeHtml(sym)}...`);
        const data = await fetchApi(`https://api.allorigins.win/raw?url=${encodeURIComponent('https://query1.finance.yahoo.com/v8/finance/chart/' + sym)}`, 'json');
        if (data && data.chart && data.chart.result) {
            const meta = data.chart.result[0].meta;
            print(`<b>${escapeHtml(sym)}</b> — ${escapeHtml(meta.exchangeName || 'N/A')}`);
            print(`💲 Price: <span class='accent'>$${meta.regularMarketPrice}</span> (${escapeHtml(meta.currency || 'USD')})`);
        } else print(`Could not fetch data for ${escapeHtml(sym)}.`, "err");
        isBusy = false;
    };

    commands.translate = async (args) => {
        if (!args || args.length < 2) return print("Usage: translate &lt;text&gt; &lt;target_lang&gt; (e.g. translate hello es)", "hint");
        isBusy = true;
        const targetLang = args[args.length - 1];
        const text = args.slice(0, -1).join(" ");
        print(`Translating "${escapeHtml(text)}" → ${escapeHtml(targetLang)}...`);
        try {
            const data = await fetchApi(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${encodeURIComponent(targetLang)}`);
            if (data && data.responseData && data.responseData.translatedText) {
                print(`Translation: <span class='accent'>${escapeHtml(data.responseData.translatedText)}</span>`);
            } else print("Translation failed.", "err");
        } catch { print("Translation service unavailable.", "err"); }
        isBusy = false;
    };

    // --- Theme Toggle Button ---
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            applyTheme();
        });
    }

    // --- Shutdown/Resume ---
    const powerScreen = document.getElementById("power-screen");
    const powerBtn = document.getElementById("power-btn");
    const footerPowerBtn = document.getElementById("footer-power-btn");

    powerScreen.addEventListener("click", resumeSystem);
    if (footerPowerBtn) {
        footerPowerBtn.addEventListener("click", () => {
            if (!isBusy && isPoweredOn) commands.shutdown();
        });
    }

    commands.shutdown = async () => {
        isBusy = true;
        sounds.shutdown();
        for (const line of TERM.shutdownSequence) {
            print(line);
            await new Promise(r => setTimeout(r, Math.random() * 200 + 50));
        }
        print("<br><b>SYSTEM IS GOING TO SLEEP NOW.</b><br>");
        await new Promise(r => setTimeout(r, 1500));
        terminalScreen.classList.add("term-hidden");
        powerScreen.classList.remove("hidden");
        localStorage.setItem("term-power", "off");
        isPoweredOn = false;
        isBusy = false;
    };

    async function resumeSystem() {
        powerScreen.classList.add("hidden");
        terminalScreen.classList.remove("term-hidden");
        localStorage.setItem("term-power", "on");
        isPoweredOn = true;
        isBusy = true;
        sounds.startup();
        clearScreen();
        print("<br>");
        for (const line of TERM.resumeSequence) {
            print(line, "hint");
            await new Promise(r => setTimeout(r, 400));
        }
        print("<br>GETTING SYSTEM READY...<br>");
        const barContainer = document.createElement("div");
        barContainer.className = "progress-container";
        const bar = document.createElement("div");
        bar.className = "progress-bar";
        barContainer.appendChild(bar);
        output.appendChild(barContainer);
        for (let i = 0; i <= 100; i += 5) {
            bar.style.width = i + "%";
            await new Promise(r => setTimeout(r, 50));
        }
        await new Promise(r => setTimeout(r, 500));
        clearScreen();
        await bootSequence();
    }

    // --- Fullscreen ---
    const fullscreenBtn = document.getElementById("fullscreen-btn");
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener("click", () => {
            if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
            else document.exitFullscreen().catch(() => {});
        });
        document.addEventListener("fullscreenchange", () => {
            fullscreenBtn.title = document.fullscreenElement ? "Exit Fullscreen" : "Enter Fullscreen";
        });
    }

    // --- Status Bar ---
    function updateStatusBarTime() {
        const dateEl = document.getElementById("status-date");
        const yearEl = document.getElementById("status-year");
        const now = new Date();
        if (dateEl) dateEl.textContent = now.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        if (yearEl) yearEl.textContent = now.getFullYear();

        // Session timer
        const timerEl = document.getElementById("session-timer");
        if (timerEl) {
            const elapsed = Math.floor((Date.now() - STATS.bootTime) / 1000);
            const h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
            const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
            const s = String(elapsed % 60).padStart(2, '0');
            timerEl.textContent = `⏱ ${h}:${m}:${s}`;
        }
    }
    setInterval(updateStatusBarTime, 1000);
    updateStatusBarTime();

    const WEATHER_CACHE_KEY = "term-weather-cache";
    const WEATHER_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

    async function fetchLocationWeather() {
        const weatherEl = document.getElementById("status-weather");
        if (!weatherEl) return;

        // 1. Check localStorage cache first (instant, no API call)
        try {
            const cached = JSON.parse(localStorage.getItem(WEATHER_CACHE_KEY));
            if (cached && (Date.now() - cached.timestamp < WEATHER_CACHE_DURATION)) {
                weatherEl.innerHTML = `${escapeHtml(cached.city)} <span class="accent">•</span> ${cached.temp}°C`;
                return;
            }
        } catch { /* cache miss or corrupt */ }

        // 2. Fetch fresh data
        try {
            let city = null, lat = null, lon = null;

            const geoApis = [
                { url: "https://ipwho.is/", parse: d => d.success !== false ? { city: d.city, lat: d.latitude, lon: d.longitude } : null },
                { url: "https://ipapi.co/json/", parse: d => d.city ? { city: d.city, lat: d.latitude, lon: d.longitude } : null },
                { url: "https://freeipapi.com/api/json", parse: d => d.cityName ? { city: d.cityName, lat: d.latitude, lon: d.longitude } : null }
            ];

            for (const api of geoApis) {
                try {
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(), 4000);
                    const res = await fetch(api.url, { signal: controller.signal });
                    clearTimeout(timeout);
                    if (!res.ok) continue;
                    const data = await res.json();
                    const parsed = api.parse(data);
                    if (parsed && parsed.city && parsed.lat && parsed.lon) {
                        city = parsed.city; lat = parsed.lat; lon = parsed.lon;
                        break;
                    }
                } catch { continue; }
            }

            // Fallback: wttr.in (returns city + weather in one call)
            if (!city) {
                try {
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(), 4000);
                    const res = await fetch("https://wttr.in/?format=j1", { signal: controller.signal });
                    clearTimeout(timeout);
                    if (res.ok) {
                        const data = await res.json();
                        const area = data.nearest_area && data.nearest_area[0];
                        const current = data.current_condition && data.current_condition[0];
                        if (area && current) {
                            city = area.areaName[0].value;
                            const temp = current.temp_C;
                            localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({ city, temp, timestamp: Date.now() }));
                            weatherEl.innerHTML = `${escapeHtml(city)} <span class="accent">•</span> ${temp}°C`;
                            return;
                        }
                    }
                } catch { /* wttr.in failed */ }
            }

            if (lat && lon) {
                const wRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
                const wData = await wRes.json();
                const temp = Math.round(wData.current_weather.temperature);
                localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({ city, temp, timestamp: Date.now() }));
                weatherEl.innerHTML = `${escapeHtml(city)} <span class="accent">•</span> ${temp}°C`;
            } else {
                weatherEl.textContent = "Weather unavailable";
            }
        } catch (e) { weatherEl.textContent = "Offline"; }
    }
    fetchLocationWeather();

    // --- Keyboard handling ---
    function runCommand(raw) {
        if (isBusy) return;
        const line = raw.trim();
        if (!line) { print(`${promptEl.innerHTML}&nbsp;`); return; }

        // Handle pending confirmation
        if (pendingConfirm) {
            print(`${promptEl.innerHTML} ${escapeHtml(line)}`);
            if (["y", "yes"].includes(line.toLowerCase())) {
                pendingConfirm();
            } else {
                print("Cancelled.", "hint");
            }
            pendingConfirm = null;
            return;
        }

        print(`${promptEl.innerHTML} ${escapeHtml(line)}`);
        history.push(line);
        localStorage.setItem("term-history", JSON.stringify(history.slice(-200)));
        histIndex = history.length;

        const [cmd, ...args] = line.split(/\s+/);
        const handler = commands[cmd.toLowerCase()];
        if (!handler) {
            print(`Command not found: ${escapeHtml(cmd)}. Type 'help' to see available commands.`, "err");
            return;
        }
        handler(args);
    }

    function autocomplete() {
        const token = buffer.trim().toLowerCase();
        if (!token) return;
        const cmdNames = commandRegistry.map(c => c.command).filter(c => c !== '?');
        const matches = [...new Set(cmdNames)].filter(k => k.startsWith(token));
        if (matches.length === 1) {
            buffer = matches[0] + " ";
            inputEl.textContent = buffer;
        } else if (matches.length > 1) {
            print(`${promptEl.textContent} ${buffer}`);
            const suggestions = matches.map(m => {
                const entry = commandRegistry.find(c => c.command === m);
                return `  ${m.padEnd(15)} ${entry ? entry.description : ''}`;
            });
            suggestions.forEach(s => print(s, "hint"));
        }
    }

    document.addEventListener("keydown", (e) => {
        if (isBusy) { e.preventDefault(); return; }
        if (e.ctrlKey && e.key === "c") {
            print(`${promptEl.innerHTML} ${buffer}^C`);
            buffer = ""; inputEl.textContent = buffer; updateHint();
            pendingConfirm = null;
            e.preventDefault(); return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault(); clearScreen(); return;
        }
        if (e.key === "Enter") {
            runCommand(buffer); buffer = ""; inputEl.textContent = ""; updateHint();
            e.preventDefault(); terminalScreen.scrollTop = terminalScreen.scrollHeight; return;
        }
        if (e.key === "Backspace") { buffer = buffer.slice(0, -1); inputEl.textContent = buffer; updateHint(); e.preventDefault(); return; }
        if (e.key === "Tab") { autocomplete(); updateHint(); e.preventDefault(); return; }
        if (e.key === "ArrowUp") {
            if (histIndex > 0) histIndex--;
            buffer = history[histIndex] || ""; inputEl.textContent = buffer; updateHint(); e.preventDefault(); return;
        }
        if (e.key === "ArrowDown") {
            if (histIndex < history.length - 1) { histIndex++; buffer = history[histIndex]; }
            else { histIndex = history.length; buffer = ""; }
            inputEl.textContent = buffer; updateHint(); e.preventDefault(); return;
        }
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            buffer += e.key; inputEl.textContent = buffer; updateHint();
            e.preventDefault(); terminalScreen.scrollTop = terminalScreen.scrollHeight;
        }
    });

    // --- Boot ---
    async function bootSequence() {
        applyTheme();
        setPrompt();
        if (!isPoweredOn) {
            terminalScreen.classList.add("term-hidden");
            powerScreen.classList.remove("hidden");
            isBusy = true;
            return;
        }
        print(TERM.banner, "ascii-art");
        print("Type <span class='accent'>'?'</span> or <span class='accent'>'help'</span> to view a list of available commands.<br>");
        print("<br>");
        isBusy = false;
    }

    bootSequence();
})();
