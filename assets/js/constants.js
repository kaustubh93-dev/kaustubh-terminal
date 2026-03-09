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
<div style="display: flex; align-items: center; gap: 0; overflow-x: auto;">
  <pre style="white-space: pre; line-height: 1.2; margin: 0; font-family: inherit; color: var(--accent);">              ...:::::..                                                        
           ..:--=======-                                                        
         ..:--==========                                                        
        .:--============                                                        
       .-:---=========+=                                                        
       .::=+++++========           .               .                            
     ..::+*8W##W8*ooo**o    .8&amp; =W8. +Wo  oW: &amp;8..&amp;#8::WWWWW=&amp;8..8&amp;.8WW8= +W= oW:
    .++:+*8W#@@#8++*#@@@    .@#.8@&amp;. 8@W  &amp;@- W@.o@@@&amp;-@@@@@+W@..@#.#@@@@.o@+ &amp;@-
    .++:=++*&amp;&amp;&amp;*+--+W##@    .#W-@@: .#@#. &amp;@- W@:8@+@@=@@@@@+W@..@W.#@8@@-o@+ &amp;@-
    .+=:::--=++=----+o**    .#W&amp;@&amp;  :@@@- &amp;@- W@:W#.o8::+@*:.W@..@W.## *@-o@= &amp;@-
.... -====o**o=---:-=o=-    .#@@@-  =@&amp;@+ &amp;@- W@:8@#o   +@o  W@..@W.##+W@.o@W&amp;#@-
.....:**o&amp;#####8**&amp;&amp;o**+    .#@@@=  o@+@* &amp;@- W@.o@@@*  +@o .W@..@W.#@@@&amp; o@@@@@-
.....:&amp;W&amp;W@@#WWW##@@##W*    .#@@@&amp;  &amp;@:@8 &amp;@- W@:.&amp;@@@: +@o .W@..@W.#@#@@:o@@@@@-
......o#W#@W***o**88#@@8    .#@W@#..W@+##.&amp;@- W@:..=#@= +@o .W@..@W.##.o@+o@*=W@-
...-=:.W@@@8*&amp;8888&amp;*8@#W    .#@-W@-.@@@@@:*@=.##:#8 *@= +@o  8@::@W.## +@oo@= &amp;@-
...:-+&amp;&amp;W@@#88W#@#88W@@@    .## &amp;@*-@@@@@-+@#8@W.#@-8@- +@o  &amp;@WW@&amp;.#@8#@oo@+ &amp;@-
+o*&amp;8@@&amp;oW@@#W8888W#@@@8    .@# +@Wo@o:o@o:@@@@* &amp;@@@#. +@o  =@@@@=.#@@@@-o@+ &amp;@-
@@@@@@@o+o&amp;#@@@@@@@@#8&amp;W    .#W :##8@- -@&amp; o@@W: -#@@=  =@o  .&amp;@@8..#@@@&amp;.o@+ &amp;@-
@@@@@@8o+++o*&amp;8WW8&amp;*o*#@    .:: .::::. .::  :-.   .-:   .:.   .--. .::::  .:. .:.
@@@@#&amp;o+o+=+oo*oo+o*8@@@                                                        
@@@@W+===+=++++++*&amp;W@@@@                                                        
@@@@#=--------=+*&amp;#@@@@@</pre>
</div>
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
