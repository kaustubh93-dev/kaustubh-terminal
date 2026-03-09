window.TERM = {
    site: {
        domain: "kausha.in",
        owner: "Kaustubh",
        email: "sharma.kaustubh93@gmail.com",
        socials: {
            github: "https://github.com/kaustubh93-dev",
            linkedin: "https://www.linkedin.com/in/kaustubh-sharma993/"
        }
    },

    banner: `
<div style="display: flex; align-items: center; gap: 24px; overflow-x: auto;">
  <pre style="color: var(--accent); line-height: 1.15; font-size: 0.72em; margin: 0; flex-shrink: 0;">                      ..........   
                  ...:---======--:.
                ..:--=============-
              .::--================
             .:---=====+===========
            .-:--====+++++++++++++=
            :-:---======++====++++=
           .::-=o*****o+++========-
         . .:-o*8W#%@%#W8*ooo****o+
        :++-:+*W##%@@@%W*o**W%%@@%#
        :oo-=o*&amp;&amp;8W###W&amp;===o#@@%@%#
        :oo:---=++oooo+=---=&amp;8WW###
        :o+:-:---=+oo+=-----=oooo*o
....... .======+*&amp;&amp;o==----:-=oo=---
.........-**oo*#%#WW#W*++++oo+&amp;&amp;+==
.........-8W8&amp;W@@@@@@@@%%%@@%888*oo
.........:8##8W@@%%888&amp;8W###%@@@W**
..........o####@@8**&amp;&amp;*&amp;*&amp;WW#%@@#&amp;8
......:=-:.&amp;@@@@%8&amp;*888888&amp;*8#@%8#%
:::...:o=--*#@@@%W8W#%@@%#W8W#@%%@%
....:::-+W@%o#@@@%W888W##WWW#@@@@#-
**&amp;&amp;8##%@@@#+*W%@@@%##WWW#%@@@@@8WW
@@@@@%@@@@@8o+o&amp;W%@@@@@@@@@@@#W&amp;8@@
@@@@@@@@@@#*o++oo&amp;&amp;8W##%%#W8&amp;**W@@@
@@@@@@@@@W&amp;ooo+++oo**&amp;&amp;&amp;**oo*8%@@@@
@@@@@@@@W*++=o++++oo*oo++o*&amp;W@@@@@@
@@@@@@@@&amp;+===++++++++++o*&amp;W#@@@@@@@
@@@@@@@@8-----=-======+*&amp;8%@@@@@@@@
@@@@@@@@#=::::-------==oW@@@@@@@@@@
@@@@@@@@@8-:::-------=8%@@@@@@@@@@@</pre>
  <div style="display: flex; flex-direction: column; justify-content: center; min-width: 0;">
    <pre style="color: var(--fg); line-height: 1.1; margin: 0; font-size: 0.85em;"> ██╗  ██╗ █████╗ ██╗   ██╗███████╗████████╗██╗   ██╗██████╗ ██╗  ██╗
 ██║ ██╔╝██╔══██╗██║   ██║██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║  ██║
 █████╔╝ ███████║██║   ██║███████╗   ██║   ██║   ██║██████╔╝███████║
 ██╔═██╗ ██╔══██║██║   ██║╚════██║   ██║   ██║   ██║██╔══██╗██╔══██║
 ██║  ██╗██║  ██║╚██████╔╝███████║   ██║   ╚██████╔╝██████╔╝██║  ██║
 ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝  ╚═╝</pre>
    <div style="margin-top: 12px; color: var(--muted); font-size: 0.9em; line-height: 1.6;">
      <span style="color: var(--accent); font-weight: bold;">Cloud Solution Architect</span> · 9.5+ yrs in Infrastructure &amp; Cloud<br>
      Azure · Windows Server · Terraform · PowerShell · Docker<br>
      <span style="color: var(--muted); font-style: italic;">📍 Thane, India · 📧 sharma.kaustubh93@gmail.com</span>
    </div>
  </div>
</div>
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
        "Hi, I'm <span style='color: var(--accent); font-weight: bold;'>Kaustubh Sharma</span> — a Cloud Solution Architect with <span class='accent'>9.5+ years</span> of experience in system administration, cloud infrastructure, and enterprise IT.",
        "<br>",
        "Currently at <span style='font-weight:bold; color: var(--fg);'>Concentrix</span>, architecting solutions for mission-critical banking infrastructure — managing <span class='accent'>500+ servers</span> across on-prem and Azure cloud environments for ICICI Bank.",
        "<br>",
        "I specialize in turning reactive IT chaos into proactive, automated, and resilient systems. From failover clusters to security hardening, I make infrastructure <span class='accent'>boring</span> (in the best way).",
        "<br>",
        "<span style='color: var(--muted); font-style: italic;'>📍 Thane, India  •  📧 sharma.kaustubh93@gmail.com  •  🌐 <a href='https://www.kausha.in' target='_blank' style='color: var(--accent);'>kausha.in</a></span>"
    ],

    projectsText: [
        "<div style='border-left: 2px solid var(--accent); padding-left: 12px; margin-bottom: 16px;'><span style='color: var(--fg); font-weight: bold;'>🏗️ Terraform Static Website Deployment</span><br><span style='color: var(--muted);'>Reusable Terraform module for Azure Storage static sites + Azure Front Door CDN. Automates frontend infra provisioning.</span></div>",
        "<div style='border-left: 2px solid #60a5fa; padding-left: 12px; margin-bottom: 16px;'><span style='color: var(--fg); font-weight: bold;'>☁️ Cloud Resume Challenge</span><br><span style='color: var(--muted);'>Serverless resume on Azure using Python Functions — built to deepen cloud proficiency.</span></div>",
        "<div style='border-left: 2px solid #a855f7; padding-left: 12px; margin-bottom: 16px;'><span style='color: var(--fg); font-weight: bold;'>📤 CloudUploader-CLI</span><br><span style='color: var(--muted);'>Bash-based CLI tool for uploading files to Azure Blob Storage. Fast, scriptable, cloud-native.</span></div>",
        "<div style='border-left: 2px solid #f59e0b; padding-left: 12px; margin-bottom: 16px;'><span style='color: var(--fg); font-weight: bold;'>🤖 Azure AI Vision + OpenAI App</span><br><span style='color: var(--muted);'>Web app integrating Azure AI Vision and Azure OpenAI for image analysis and generation.</span></div>",
        "<div style='border-left: 2px solid #10b981; padding-left: 12px; margin-bottom: 16px;'><span style='color: var(--fg); font-weight: bold;'>🦙 Llama2 Transaction Categorizer</span><br><span style='color: var(--muted);'>Local Llama2 model to auto-categorize personal bank transaction data.</span></div>",
        "<div style='border-left: 2px solid #ef4444; padding-left: 12px; margin-bottom: 16px;'><span style='color: var(--fg); font-weight: bold;'>💻 Terminal Portfolio</span><br><span style='color: var(--muted);'>This site! A fully interactive terminal with 50+ commands, themes, and sound effects.</span></div>"
    ],

    skillsText: [
        "<div style='margin-bottom: 8px;'><span class='accent' style='font-weight: bold;'>☁️ Cloud Technologies:</span> Azure (IaaS, PaaS), Blob Storage, Azure Arc, Azure Front Door, WAC</div>",
        "<div style='margin-bottom: 8px;'><span class='accent' style='font-weight: bold;'>🖥️ Operating Systems:</span> Windows Server (2025/2022/2019/2016), Linux</div>",
        "<div style='margin-bottom: 8px;'><span class='accent' style='font-weight: bold;'>⚙️ Virtualization:</span> Hyper-V, Failover Clustering, Storage Spaces Direct, Scale-Out File Servers</div>",
        "<div style='margin-bottom: 8px;'><span class='accent' style='font-weight: bold;'>🔧 Scripting & IaC:</span> PowerShell, Bash, Terraform</div>",
        "<div style='margin-bottom: 8px;'><span class='accent' style='font-weight: bold;'>🌐 Networking & Security:</span> TCP/IP, DNS, DHCP, VPN, Firewalls, SSL/TLS, Load Balancing, CIS Hardening</div>",
        "<div style='margin-bottom: 8px;'><span class='accent' style='font-weight: bold;'>🚀 DevOps & Deployment:</span> CI/CD, MDT, WDS, Docker, Git</div>",
        "<div style='margin-bottom: 8px;'><span class='accent' style='font-weight: bold;'>📜 Certifications:</span> MCSA: Microsoft Certified Solutions Associate</div>",
        "<div><span class='accent' style='font-weight: bold;'>🧠 Soft Skills:</span> Problem-Solving, Analytical Thinking, Collaboration, Communication</div>"
    ]
};
