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

// ============================================
// Interactive Terminal Module
// ============================================
(function initInteractiveTerminal() {
    const inputEl = document.getElementById('commandInput');
    const terminalBody = document.getElementById('terminalBody');
    
    if (!inputEl || !terminalBody) return;
    
    const commands = {
        help: () => {
            return `Available commands:<br>
- <span class="cmd-highlight">help</span> : Show this message<br>
- <span class="cmd-highlight">skills</span> : List technical skills<br>
- <span class="cmd-highlight">contact</span> : Show contact info<br>
- <span class="cmd-highlight">clear</span> : Clear terminal screen<br>
- <span class="cmd-highlight">whoami</span> : About me`;
        },
        skills: () => {
    return `
<span class="cmd-highlight">🔹 CyberSecurity</span><br>
- Network Security <br>
- Penetration Testing / CEH <br>
- SOC Operations <br>
- Vulnerability Assessment <br>
- Wireshark <br>
<br>
<span class="cmd-highlight">🔹 Networking</span><br>
- Network Engineering <br>
- Cisco / CCNA <br>
- TCP/IP & Subnetting <br>
- Firewall & VPN <br>
- Routing & Switching <br>
- VLANs <br>
<br>
<span class="cmd-highlight">🔹 System Administration</span><br>
- Windows Server <br>
- Active Directory <br>
- Group Policy / GPO <br>
- DNS / DHCP Server <br>
- VMware ESXi <br>
- Server Virtualization <br>
- Hyper-V <br>
<br>
<span class="cmd-highlight">🔹 Programming</span><br>
- Python <br>
- C <br>
- OOP <br>
- Data Structures <br>
- Linux <br>
- Git <br>
<br>
<span class="cmd-highlight">🔹 Backend & Database</span><br>
- Django <br>
- MySQL <br>
- PostgreSQL <br>
- DBMS <br>
<br>
<span class="cmd-highlight">🔹 Frontend</span><br>
- HTML5 / CSS3 <br>
- JavaScript <br>
- Bootstrap / Tailwind <br>
- SASS <br>
- jQuery / AJAX <br>
`;
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
        }
    };
    
    function addLine(text, isOutput = true) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'terminal-line';
        if (isOutput) {
            lineDiv.innerHTML = `<span class="terminal-output">${text}</span>`;
        } else {
            lineDiv.innerHTML = text;
        }
        terminalBody.insertBefore(lineDiv, terminalBody.lastElementChild);
        terminalBody.scrollTop = terminalBody.scrollHeight;
        return lineDiv;
    }
    
    function executeCommand(cmd) {
        const cmdLower = cmd.trim().toLowerCase();
        if (cmdLower === 'clear') {
            const lines = terminalBody.querySelectorAll('.terminal-line:not(:last-child)');
            lines.forEach(line => line.remove());
            return;
        }
        let response = '';
        if (commands[cmdLower]) {
            response = commands[cmdLower]();
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
                cmdLine.className = 'terminal-line';
                cmdLine.innerHTML = `<span class="prompt">$</span> ${cmd}`;
                terminalBody.insertBefore(cmdLine, terminalBody.lastElementChild);
                executeCommand(cmd);
            }
            inputEl.innerText = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }
    
    inputEl.addEventListener('keydown', handleKey);
    terminalBody.addEventListener('click', () => {
        inputEl.focus();
    });
    inputEl.focus();
})();

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
            return `CyberSecurity: Network Security(90%) | Penetration Testing(85%) | SOC(75%) | Vuln Assessment(80%) | Wireshark(80%)<br>
Networking: Network Eng(88%) | CCNA(85%) | TCP/IP(90%) | Firewall/VPN(75%) | Routing(75%) | VLANs(75%)<br>
SysAdmin: Windows Server(80%) | AD(78%) | GPO(75%) | DNS/DHCP(80%) | VMware(75%) | Virtualization(78%) | Hyper-V(70%)<br>
Programming: Python(75%) | C(70%) | OOP(80%) | Data Structures(75%) | Linux(85%) | Git(80%)<br>
Backend/Database: Django(70%) | MySQL(70%) | PostgreSQL(65%) | DBMS(72%)<br>
Frontend: HTML/CSS(95%) | JS(85%) | Bootstrap/Tailwind(88%) | SASS(78%) | jQuery/AJAX(80%)`;
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
// Skills Radar Chart with Chart.js
// ============================================

(function initRadarChart() {
    const canvas = document.getElementById('skillsRadarChart');
    if (!canvas) return;
    if (typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'CyberSecurity',
                'Networking',
                'BackEnd',
                'System Administration',
                'FrontEnd'
            ],
            datasets: [{
                label: '',
                data: [70, 65, 45, 60, 50],  
                backgroundColor: 'rgba(0, 255, 140, 0.2)',
                borderColor: 'rgba(0, 255, 140, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 255, 140, 1)',
                pointBorderColor: '#fff',
                pointRadius: 4,
                pointHoverRadius: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        display: false,      
                        stepSize: 20,
                    },
                    grid: {
                        color: 'rgba(0, 255, 140, 0.2)',
                        circular: true,
                    },
                    angleLines: {
                        color: 'rgba(0, 255, 140, 0.2)',
                    },
                    pointLabels: {
                        color: '#0f0',
                        font: {
                            size: 12,
                            family: "'Courier New', monospace",
                            weight: 'bold'
                        },
                    
                    },
                    title: {
                        display: false,     
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: false,          
                },
                legend: {
                    display: false,        
                }
            },
            elements: {
                line: {
                    borderWidth: 2
                }
            }
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



