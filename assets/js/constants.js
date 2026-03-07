window.TERM = {
    site: {
        domain: "kaustubh.dev",
        owner: "Kaustubh",
        email: "contact@kaustubh.dev",
        socials: {
            github: "https://github.com/your-username",
            linkedin: "https://linkedin.com/in/your-profile"
        }
    },

    banner: `
<span style="white-space: pre; display: block; overflow-x: auto;">
 ██╗  ██╗ █████╗ ██╗   ██╗███████╗████████╗██╗   ██╗██████╗ ██╗  ██╗
 ██║ ██╔╝██╔══██╗██║   ██║██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║  ██║
 █████╔╝ ███████║██║   ██║███████╗   ██║   ██║   ██║██████╔╝███████║
 ██╔═██╗ ██╔══██║██║   ██║╚════██║   ██║   ██║   ██║██╔══██╗██╔══██║
 ██║  ██╗██║  ██║╚██████╔╝███████║   ██║   ╚██████╔╝██████╔╝██║  ██║
 ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝  ╚═╝...</span>
  <span style="color:var(--fg); font-weight: 500;">Welcome to Kaustubh's Terminal Portfolio</span>
`,

    shutdownSequence: [
        "[ OK ] Stopping Network Manager...",
        "[ OK ] Disconnecting active network interfaces...",
        "[ OK ] Stopping User Sessions...",
        "[ OK ] Terminating background services...",
        "[ OK ] Stopping System Logging...",
        "[ OK ] Stopping Authorization Manager...",
        "[ OK ] Saving system clock...",
        "[ OK ] Unmounting /home...",
        "[ OK ] Unmounting /var...",
        "[ OK ] Disabling Swap...",
        "[ OK ] All file systems unmounted.",
        "[ OK ] Reached target Shutdown.",
        "[ * ] Powering off..."
    ],

    resumeSequence: [
        "[SYSTEM] Resuming Network Manager...",
        "[NETWORK] Connection restored",
        "[DEVICE] Filesystems mounted",
        "[SECURITY] Firewalls active"
    ],

    aboutText: [
        "Hi, I'm <span style='color: white; font-weight: bold;'>Kaustubh</span>. A software engineer obsessed with building elegant terminal tools and high-performance web applications.",
        "<br>",
        "Currently focused on AI integration and developer experience (DX). I believe code should be as clean as a fresh terminal session."
    ],

    projectsText: [
        "<div class='project-card' style='border-left: 2px solid var(--accent); padding-left: 10px; margin-bottom: 20px;'><h3 style='color: white; font-weight: bold; margin: 0;'>Claude Code CLI Clone</h3><p style='color: var(--muted); margin: 5px 0 0 0;'>A terminal-based interface for LLM interaction with file-system access.</p></div>",
        "<div class='project-card' style='border-left: 2px solid #a855f7; padding-left: 10px; margin-bottom: 20px;'><h3 style='color: white; font-weight: bold; margin: 0;'>HyperShell</h3><p style='color: var(--muted); margin: 5px 0 0 0;'>Custom Rust-based shell for productivity and automation.</p></div>"
    ],

    skillsText: [
        "<div><span class='accent' style='text-decoration: underline; font-style: italic;'>Languages:</span> TypeScript, Rust, Go, Python</div>",
        "<div><span class='accent' style='text-decoration: underline; font-style: italic;'>Frontend:</span> React, Next.js, Tailwind, HTML/CSS</div>",
        "<div><span class='accent' style='text-decoration: underline; font-style: italic;'>Backend:</span> Node.js, PostgreSQL, Redis, Docker</div>"
    ]
};
