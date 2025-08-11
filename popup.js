// Browser Fucker Popup Controls
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleChaos');
    const superChaosButton = document.getElementById('superChaos');
    const nukeButton = document.getElementById('nukePage');
    const chaosSlider = document.getElementById('chaosLevel');
    const chaosValue = document.getElementById('chaosValue');
    const status = document.getElementById('status');

    let chaosActive = true;
    let currentChaosLevel = 10;

    // Update chaos level display
    function updateChaosDisplay(level) {
        const levels = [
            'MINIMAL ANNOYANCE',
            'LIGHT FLASHING',
            'MODERATE CHAOS',
            'HEAVY DISRUPTION',
            'SEVERE MAYHEM',
            'EXTREME DISORDER',
            'INSANE MADNESS',
            'APOCALYPTIC HELL',
            'COMPLETE DESTRUCTION',
            'MAXIMUM DEVASTATION'
        ];
        chaosValue.textContent = levels[level - 1] || 'UNKNOWN CHAOS';
    }

    // Update status display
    function updateStatus(active) {
        if (active) {
            status.innerHTML = '<strong>STATUS: 🔥 CHAOS ACTIVE 🔥</strong>';
            status.style.background = 'rgba(255, 0, 0, 0.5)';
        } else {
            status.innerHTML = '<strong>STATUS: 😴 CHAOS PAUSED 😴</strong>';
            status.style.background = 'rgba(0, 255, 0, 0.5)';
        }
    }

    // Initialize
    updateChaosDisplay(currentChaosLevel);
    updateStatus(chaosActive);

    // Chaos level slider
    chaosSlider.addEventListener('input', function() {
        currentChaosLevel = parseInt(this.value);
        updateChaosDisplay(currentChaosLevel);

        // Send chaos level to content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'setChaosLevel',
                level: currentChaosLevel
            });
        });
    });

    // Toggle chaos button
    toggleButton.addEventListener('click', function() {
        chaosActive = !chaosActive;
        updateStatus(chaosActive);

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: chaosActive ? 'startChaos' : 'stopChaos'
            });
        });

        // Update button text
        if (chaosActive) {
            toggleButton.innerHTML = '🎪 DISABLE CHAOS 🎪';
        } else {
            toggleButton.innerHTML = '🎪 ENABLE CHAOS 🎪';
        }

        // Visual feedback
        toggleButton.style.animation = 'none';
        setTimeout(() => {
            toggleButton.style.animation = 'pulse 1s infinite';
        }, 10);
    });

    // Super chaos button
    superChaosButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'superChaos'
            });
        });

        // Visual feedback
        superChaosButton.style.background = 'linear-gradient(45deg, #ff0000, #ffff00)';
        superChaosButton.innerHTML = '⚡ SUPER CHAOS ACTIVATED! ⚡';

        setTimeout(() => {
            superChaosButton.style.background = 'linear-gradient(45deg, #ff00ff, #00ffff)';
            superChaosButton.innerHTML = '⚡ SUPER CHAOS ⚡';
        }, 2000);
    });

    // Nuke page button
    nukeButton.addEventListener('click', function() {
        if (confirm('🔥💀🔥 ARE YOU SURE YOU WANT TO NUKE THIS PAGE? THIS WILL CAUSE MAXIMUM CHAOS! 🔥💀🔥')) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'nukePage'
                });
            });

            // Visual feedback
            nukeButton.style.background = 'linear-gradient(45deg, #ff0000, #ff8800)';
            nukeButton.innerHTML = '💥 PAGE NUKED! 💥';

            setTimeout(() => {
                nukeButton.style.background = 'linear-gradient(45deg, #ff00ff, #00ffff)';
                nukeButton.innerHTML = '💥 NUKE PAGE 💥';
            }, 3000);
        }
    });

    // Add some chaos to the popup itself
    setInterval(() => {
        if (chaosActive) {
            const hue = Math.random() * 360;
            document.body.style.filter = `hue-rotate(${hue}deg) saturate(150%)`;
        }
    }, 500);

    // Random popup effects
    setInterval(() => {
        if (Math.random() < 0.1) {
            const buttons = [toggleButton, superChaosButton, nukeButton];
            const randomButton = buttons[Math.floor(Math.random() * buttons.length)];

            randomButton.style.transform = 'scale(1.1) rotate(' + (Math.random() * 20 - 10) + 'deg)';
            setTimeout(() => {
                randomButton.style.transform = '';
            }, 300);
        }
    }, 1000);

    // Konami code for extra chaos
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Activate secret chaos mode
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'konamiChaos'
                });
            });

            // Visual celebration
            document.body.style.animation = 'spin 2s linear infinite';
            status.innerHTML = '<strong>🎊 KONAMI CHAOS UNLOCKED! 🎊</strong>';

            setTimeout(() => {
                document.body.style.animation = '';
                updateStatus(chaosActive);
            }, 5000);
        }
    });

    // Add floating chaos elements to popup
    function createPopupChaos() {
        for (let i = 0; i < 5; i++) {
            const chaos = document.createElement('div');
            chaos.style.cssText = `
                position: absolute;
                width: 5px;
                height: 5px;
                background: hsl(${Math.random() * 360}, 100%, 50%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float 3s infinite ease-in-out;
            `;
            document.body.appendChild(chaos);

            setTimeout(() => {
                if (chaos.parentNode) {
                    chaos.parentNode.removeChild(chaos);
                }
            }, 3000);
        }
    }

    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
    `;
    document.head.appendChild(style);

    // Create popup chaos every 2 seconds
    setInterval(createPopupChaos, 2000);

    // Initial popup chaos
    createPopupChaos();
});
