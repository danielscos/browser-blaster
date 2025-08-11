// Browser Fucker Content Script - Maximum JavaScript Chaos
(function() {
    'use strict';

    let chaosActive = true;
    let intervalIds = [];
    let timeoutIds = [];

    // Create floating chaos elements
    function createFloatingChaos() {
        const chaosCount = 50;
        for (let i = 0; i < chaosCount; i++) {
            const chaosElement = document.createElement('div');
            chaosElement.className = 'browser-fucker-chaos';
            chaosElement.style.cssText = `
                position: fixed !important;
                width: 20px !important;
                height: 20px !important;
                background: radial-gradient(circle, #ff0000, #00ff00, #0000ff) !important;
                border-radius: 50% !important;
                pointer-events: none !important;
                z-index: 999999 !important;
                animation: float-around 2s infinite linear !important;
                left: ${Math.random() * 100}vw !important;
                top: ${Math.random() * 100}vh !important;
                box-shadow: 0 0 20px #ff00ff !important;
            `;
            document.body.appendChild(chaosElement);

            // Animate the floating elements
            let x = Math.random() * window.innerWidth;
            let y = Math.random() * window.innerHeight;
            let vx = (Math.random() - 0.5) * 5;
            let vy = (Math.random() - 0.5) * 5;

            const moveElement = () => {
                x += vx;
                y += vy;

                if (x <= 0 || x >= window.innerWidth) vx = -vx;
                if (y <= 0 || y >= window.innerHeight) vy = -vy;

                chaosElement.style.left = x + 'px';
                chaosElement.style.top = y + 'px';
                chaosElement.style.background = `hsl(${Date.now() % 360}, 100%, 50%)`;
            };

            intervalIds.push(setInterval(moveElement, 16));
        }
    }

    // Create screen flash overlay
    function createScreenFlash() {
        const flashOverlay = document.createElement('div');
        flashOverlay.id = 'browser-fucker-flash';
        flashOverlay.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            pointer-events: none !important;
            z-index: 999998 !important;
            background: radial-gradient(circle, transparent 30%, rgba(255,0,0,0.3) 100%) !important;
            animation: flash-screen 0.1s infinite !important;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes flash-screen {
                0% { background: radial-gradient(circle, rgba(255,0,0,0.5), transparent) !important; }
                25% { background: radial-gradient(circle, rgba(0,255,0,0.5), transparent) !important; }
                50% { background: radial-gradient(circle, rgba(0,0,255,0.5), transparent) !important; }
                75% { background: radial-gradient(circle, rgba(255,255,0,0.5), transparent) !important; }
                100% { background: radial-gradient(circle, rgba(255,0,255,0.5), transparent) !important; }
            }
            @keyframes float-around {
                0% { transform: translate(0, 0) rotate(0deg) scale(1) !important; }
                25% { transform: translate(50px, -30px) rotate(90deg) scale(1.5) !important; }
                50% { transform: translate(-30px, 20px) rotate(180deg) scale(0.5) !important; }
                75% { transform: translate(20px, 40px) rotate(270deg) scale(1.2) !important; }
                100% { transform: translate(0, 0) rotate(360deg) scale(1) !important; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(flashOverlay);
    }

    // Fuck with the mouse cursor
    function chaosMouseEffects() {
        let mouseTrail = [];

        document.addEventListener('mousemove', (e) => {
            if (!chaosActive) return;

            // Create mouse trail
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed !important;
                width: 10px !important;
                height: 10px !important;
                background: hsl(${Date.now() % 360}, 100%, 50%) !important;
                border-radius: 50% !important;
                pointer-events: none !important;
                z-index: 999997 !important;
                left: ${e.clientX}px !important;
                top: ${e.clientY}px !important;
                animation: fade-out 1s ease-out forwards !important;
            `;

            document.body.appendChild(trail);
            mouseTrail.push(trail);

            timeoutIds.push(setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
                mouseTrail = mouseTrail.filter(t => t !== trail);
            }, 1000));

            // Limit trail length
            if (mouseTrail.length > 20) {
                const oldTrail = mouseTrail.shift();
                if (oldTrail.parentNode) {
                    oldTrail.parentNode.removeChild(oldTrail);
                }
            }
        });

        const style = document.createElement('style');
        style.textContent += `
            @keyframes fade-out {
                0% { opacity: 1; transform: scale(1) !important; }
                100% { opacity: 0; transform: scale(0) !important; }
            }
        `;
        document.head.appendChild(style);
    }

    // Randomly move elements around
    function elementChaos() {
        const elements = document.querySelectorAll('*');
        const chaosElements = Array.from(elements).filter(el =>
            el.tagName !== 'SCRIPT' &&
            el.tagName !== 'STYLE' &&
            el.tagName !== 'META' &&
            !el.classList.contains('browser-fucker-chaos')
        );

        chaosElements.forEach(el => {
            if (Math.random() < 0.1) { // 10% chance per element
                const originalTransform = el.style.transform || '';
                const randomX = (Math.random() - 0.5) * 20;
                const randomY = (Math.random() - 0.5) * 20;
                const randomRotate = (Math.random() - 0.5) * 10;

                el.style.transform = `${originalTransform} translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;

                timeoutIds.push(setTimeout(() => {
                    if (el.style) {
                        el.style.transform = originalTransform;
                    }
                }, 500));
            }
        });
    }

    // Text replacement chaos
    function textChaos() {
        const textNodes = [];
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.trim() && node.parentNode.tagName !== 'SCRIPT') {
                textNodes.push(node);
            }
        }

        textNodes.forEach(node => {
            if (Math.random() < 0.05) { // 5% chance
                const originalText = node.textContent;
                const chaosText = originalText.split('').map(char => {
                    if (Math.random() < 0.3) {
                        return ['🔥', '💀', '⚡', '💥', '🌈', '👹', '🎪', '🎭'][Math.floor(Math.random() * 8)];
                    }
                    return char;
                }).join('');

                node.textContent = chaosText;

                timeoutIds.push(setTimeout(() => {
                    if (node.textContent === chaosText) {
                        node.textContent = originalText;
                    }
                }, 2000));
            }
        });
    }

    // Audio chaos (if possible)
    function audioChaos() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(Math.random() * 1000 + 200, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Audio not available, that's fine
        }
    }

    // Screen shake
    function screenShake() {
        const body = document.body;
        const originalTransform = body.style.transform || '';

        let shakeCount = 0;
        const maxShakes = 20;

        const shake = () => {
            if (shakeCount >= maxShakes) {
                body.style.transform = originalTransform;
                return;
            }

            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            body.style.transform = `${originalTransform} translate(${x}px, ${y}px)`;

            shakeCount++;
            timeoutIds.push(setTimeout(shake, 50));
        };

        shake();
    }

    // Popup chaos
    function popupChaos() {
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed !important;
            top: ${Math.random() * 80}% !important;
            left: ${Math.random() * 80}% !important;
            width: 200px !important;
            height: 100px !important;
            background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff) !important;
            border: 3px solid #ffff00 !important;
            border-radius: 10px !important;
            z-index: 999999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 16px !important;
            font-weight: bold !important;
            color: white !important;
            text-shadow: 2px 2px 4px #000000 !important;
            animation: popup-dance 0.5s infinite !important;
            cursor: pointer !important;
        `;

        const messages = [
            "🔥 BROWSER FUCKED! 🔥",
            "💀 CHAOS MODE! 💀",
            "⚡ VISUAL OVERLOAD! ⚡",
            "🌈 RAINBOW HELL! 🌈",
            "💥 SENSORY CHAOS! 💥"
        ];

        popup.textContent = messages[Math.floor(Math.random() * messages.length)];

        const style = document.createElement('style');
        style.textContent += `
            @keyframes popup-dance {
                0% { transform: rotate(-5deg) scale(1) !important; }
                25% { transform: rotate(5deg) scale(1.1) !important; }
                50% { transform: rotate(-5deg) scale(0.9) !important; }
                75% { transform: rotate(5deg) scale(1.1) !important; }
                100% { transform: rotate(-5deg) scale(1) !important; }
            }
        `;
        document.head.appendChild(style);

        popup.onclick = () => {
            document.body.removeChild(popup);
        };

        document.body.appendChild(popup);

        timeoutIds.push(setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 5000));
    }

    // Initialize chaos when DOM is ready
    function initChaos() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initChaos);
            return;
        }

        console.log('🔥💀🔥 BROWSER FUCKER ACTIVATED 🔥💀🔥');

        // Create initial chaos elements
        createFloatingChaos();
        createScreenFlash();
        chaosMouseEffects();

        // Set up recurring chaos
        intervalIds.push(setInterval(elementChaos, 2000));
        intervalIds.push(setInterval(textChaos, 3000));
        intervalIds.push(setInterval(screenShake, 10000));
        intervalIds.push(setInterval(popupChaos, 8000));
        intervalIds.push(setInterval(audioChaos, 5000));

        // Add some random chaos triggers
        intervalIds.push(setInterval(() => {
            if (Math.random() < 0.3) {
                document.body.style.filter = `
                    hue-rotate(${Math.random() * 360}deg)
                    saturate(${200 + Math.random() * 300}%)
                    brightness(${150 + Math.random() * 100}%)
                `;
            }
        }, 1000));

        // Chaos click events
        document.addEventListener('click', (e) => {
            if (Math.random() < 0.7) {
                e.preventDefault();
                e.stopPropagation();

                // Create explosion effect at click
                const explosion = document.createElement('div');
                explosion.style.cssText = `
                    position: fixed !important;
                    left: ${e.clientX - 25}px !important;
                    top: ${e.clientY - 25}px !important;
                    width: 50px !important;
                    height: 50px !important;
                    background: radial-gradient(circle, #ff0000, transparent) !important;
                    border-radius: 50% !important;
                    pointer-events: none !important;
                    z-index: 999999 !important;
                    animation: explode 0.6s ease-out forwards !important;
                `;

                const style = document.createElement('style');
                style.textContent += `
                    @keyframes explode {
                        0% { transform: scale(0) !important; opacity: 1 !important; }
                        100% { transform: scale(10) !important; opacity: 0 !important; }
                    }
                `;
                document.head.appendChild(style);

                document.body.appendChild(explosion);

                timeoutIds.push(setTimeout(() => {
                    if (explosion.parentNode) {
                        explosion.parentNode.removeChild(explosion);
                    }
                }, 600));
            }
        }, true);

        // Prevent page unload to keep the chaos going
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            e.returnValue = '🔥 THE CHAOS MUST CONTINUE! 🔥';
            return '🔥 THE CHAOS MUST CONTINUE! 🔥';
        });

        // Override console to add chaos
        const originalLog = console.log;
        console.log = function(...args) {
            originalLog.apply(console, ['🔥💀🔥', ...args, '🔥💀🔥']);
        };
    }

    // Cleanup function (in case we need to stop the madness)
    window.stopBrowserChaos = function() {
        chaosActive = false;
        intervalIds.forEach(id => clearInterval(id));
        timeoutIds.forEach(id => clearTimeout(id));
        intervalIds = [];
        timeoutIds = [];

        // Remove chaos elements
        document.querySelectorAll('.browser-fucker-chaos, #browser-fucker-flash').forEach(el => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });

        console.log('Browser chaos stopped');
    };

    // Start the chaos!
    initChaos();

})();
