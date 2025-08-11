// Browser Fucker Content Script - Maximum JavaScript Chaos
(function () {
  "use strict";

  let chaosActive = true;
  let chaosLevel = 10; // 1-10 chaos intensity
  let intervalIds = [];
  let timeoutIds = [];
  let chaosElements = [];

  // Create floating chaos elements
  function createFloatingChaos(count = 50) {
    const chaosCount = count;
    for (let i = 0; i < chaosCount; i++) {
      const chaosElement = document.createElement("div");
      chaosElement.className = "browser-fucker-chaos";
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

        chaosElement.style.left = x + "px";
        chaosElement.style.top = y + "px";
        chaosElement.style.background = `hsl(${Date.now() % 360}, 100%, 50%)`;
      };

      intervalIds.push(setInterval(moveElement, 16));
    }
  }

  // Create screen flash overlay
  function createScreenFlash() {
    const flashOverlay = document.createElement("div");
    flashOverlay.id = "browser-fucker-flash";
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

    const style = document.createElement("style");
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

    document.addEventListener("mousemove", (e) => {
      if (!chaosActive) return;

      // Create mouse trail
      const trail = document.createElement("div");
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

      timeoutIds.push(
        setTimeout(() => {
          if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
          }
          mouseTrail = mouseTrail.filter((t) => t !== trail);
        }, 1000),
      );

      // Limit trail length
      if (mouseTrail.length > 20) {
        const oldTrail = mouseTrail.shift();
        if (oldTrail.parentNode) {
          oldTrail.parentNode.removeChild(oldTrail);
        }
      }
    });

    const style = document.createElement("style");
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
    const elements = document.querySelectorAll("*");
    const chaosElements = Array.from(elements).filter(
      (el) =>
        el.tagName !== "SCRIPT" &&
        el.tagName !== "STYLE" &&
        el.tagName !== "META" &&
        !el.classList.contains("browser-fucker-chaos"),
    );

    chaosElements.forEach((el) => {
      if (Math.random() < 0.1) {
        // 10% chance per element
        const originalTransform = el.style.transform || "";
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        const randomRotate = (Math.random() - 0.5) * 10;

        el.style.transform = `${originalTransform} translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;

        timeoutIds.push(
          setTimeout(() => {
            if (el.style) {
              el.style.transform = originalTransform;
            }
          }, 500),
        );
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
      false,
    );

    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent.trim() && node.parentNode.tagName !== "SCRIPT") {
        textNodes.push(node);
      }
    }

    textNodes.forEach((node) => {
      if (Math.random() < 0.05) {
        // 5% chance
        const originalText = node.textContent;
        const chaosText = originalText
          .split("")
          .map((char) => {
            if (Math.random() < 0.3) {
              return ["🔥", "💀", "⚡", "💥", "🌈", "👹", "🎪", "🎭"][
                Math.floor(Math.random() * 8)
              ];
            }
            return char;
          })
          .join("");

        node.textContent = chaosText;

        timeoutIds.push(
          setTimeout(() => {
            if (node.textContent === chaosText) {
              node.textContent = originalText;
            }
          }, 2000),
        );
      }
    });
  }

  // Audio chaos (if possible)
  function audioChaos() {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(
        Math.random() * 1000 + 200,
        audioContext.currentTime,
      );
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
    const originalTransform = body.style.transform || "";

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
    const popup = document.createElement("div");
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
      "💥 SENSORY CHAOS! 💥",
    ];

    popup.textContent = messages[Math.floor(Math.random() * messages.length)];

    const style = document.createElement("style");
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

    timeoutIds.push(
      setTimeout(() => {
        if (popup.parentNode) {
          popup.parentNode.removeChild(popup);
        }
      }, 5000),
    );
  }

  // Add click chaos (level 10 only)
  function addClickChaos() {
    document.addEventListener(
      "click",
      (e) => {
        if (!chaosActive || chaosLevel < 10) return;

        if (Math.random() < 0.3) {
          // Reduced from 0.7 to 0.3 for level 10
          e.preventDefault();
          e.stopPropagation();

          // Create explosion effect at click
          const explosion = document.createElement("div");
          explosion.className = "browser-fucker-chaos";
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

          if (!document.getElementById("explode-keyframes")) {
            const style = document.createElement("style");
            style.id = "explode-keyframes";
            style.textContent = `
                        @keyframes explode {
                            0% { transform: scale(0) !important; opacity: 1 !important; }
                            100% { transform: scale(10) !important; opacity: 0 !important; }
                        }
                    `;
            document.head.appendChild(style);
          }

          document.body.appendChild(explosion);
          chaosElements.push(explosion);

          timeoutIds.push(
            setTimeout(() => {
              if (explosion.parentNode) {
                explosion.parentNode.removeChild(explosion);
              }
              chaosElements = chaosElements.filter((el) => el !== explosion);
            }, 600),
          );
        }
      },
      true,
    );
  }

  // Special chaos modes
  function superChaosMode() {
    const originalLevel = chaosLevel;
    chaosLevel = 10;
    updateChaosIntensity();

    // Extra effects for super chaos
    for (let i = 0; i < 100; i++) {
      setTimeout(() => createFloatingChaos(1), i * 10);
    }

    timeoutIds.push(
      setTimeout(() => {
        chaosLevel = originalLevel;
        updateChaosIntensity();
      }, 10000),
    );
  }

  function nukePageMode() {
    // Temporary maximum chaos
    const originalLevel = chaosLevel;
    chaosLevel = 10;
    updateChaosIntensity();

    // Screen shake burst
    for (let i = 0; i < 10; i++) {
      timeoutIds.push(setTimeout(screenShake, i * 100));
    }

    // Popup spam
    for (let i = 0; i < 5; i++) {
      timeoutIds.push(setTimeout(popupChaos, i * 500));
    }

    timeoutIds.push(
      setTimeout(() => {
        chaosLevel = originalLevel;
        updateChaosIntensity();
      }, 15000),
    );
  }

  function konamiChaosMode() {
    // Secret mode with special effects
    createFloatingChaos(200);

    const konamiMessage = document.createElement("div");
    konamiMessage.className = "browser-fucker-chaos";
    konamiMessage.style.cssText = `
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            font-size: 48px !important;
            color: #ff0000 !important;
            text-shadow: 0 0 20px #ffff00 !important;
            z-index: 999999 !important;
            animation: spin 1s linear infinite !important;
        `;
    konamiMessage.textContent = "🎊 KONAMI CHAOS! 🎊";

    document.body.appendChild(konamiMessage);
    chaosElements.push(konamiMessage);

    timeoutIds.push(
      setTimeout(() => {
        if (konamiMessage.parentNode) {
          konamiMessage.parentNode.removeChild(konamiMessage);
        }
        chaosElements = chaosElements.filter((el) => el !== konamiMessage);
      }, 5000),
    );
  }

  // Initialize chaos when DOM is ready
  function initChaos() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initChaos);
      return;
    }

    console.log("🔥💀🔥 BROWSER FUCKER LOADED 🔥💀🔥");

    // Initialize with saved settings
    updateChaosIntensity();

    // Prevent page unload only at high chaos levels
    window.addEventListener("beforeunload", (e) => {
      if (chaosActive && chaosLevel >= 8) {
        e.preventDefault();
        e.returnValue = "🔥 THE CHAOS MUST CONTINUE! 🔥";
        return "🔥 THE CHAOS MUST CONTINUE! 🔥";
      }
    });
  }

  // Cleanup function (in case we need to stop the madness)
  window.stopBrowserChaos = function () {
    chaosActive = false;
    intervalIds.forEach((id) => clearInterval(id));
    timeoutIds.forEach((id) => clearTimeout(id));
    intervalIds = [];
    timeoutIds = [];

    // Remove chaos elements
    document
      .querySelectorAll(".browser-fucker-chaos, #browser-fucker-flash")
      .forEach((el) => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });

    console.log("Browser chaos stopped");
  };

  // Update chaos intensity based on level
  function updateChaosIntensity() {
    // Clear existing intervals
    intervalIds.forEach((id) => clearInterval(id));
    intervalIds = [];

    // Remove existing chaos CSS
    const existingStyles = document.querySelectorAll("style[data-chaos-style]");
    existingStyles.forEach((style) => style.remove());

    if (!chaosActive || chaosLevel === 0) {
      // Remove all chaos elements
      document
        .querySelectorAll(".browser-fucker-chaos, #browser-fucker-flash")
        .forEach((el) => {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        });
      chaosElements = [];
      return;
    }

    // Apply chaos based on level
    applyChaosLevel();

    // Set up recurring chaos based on level
    if (chaosLevel >= 3) {
      intervalIds.push(
        setInterval(elementChaos, Math.max(5000 - chaosLevel * 300, 1000)),
      );
    }

    if (chaosLevel >= 5) {
      intervalIds.push(
        setInterval(textChaos, Math.max(8000 - chaosLevel * 500, 2000)),
      );
    }

    if (chaosLevel >= 7) {
      intervalIds.push(
        setInterval(screenShake, Math.max(15000 - chaosLevel * 1000, 5000)),
      );
    }

    if (chaosLevel >= 8) {
      intervalIds.push(
        setInterval(popupChaos, Math.max(12000 - chaosLevel * 800, 3000)),
      );
    }

    if (chaosLevel >= 9) {
      intervalIds.push(
        setInterval(audioChaos, Math.max(8000 - chaosLevel * 400, 2000)),
      );
    }

    // Random chaos triggers
    if (chaosLevel >= 4) {
      intervalIds.push(
        setInterval(
          () => {
            if (Math.random() < chaosLevel / 20) {
              document.body.style.filter = `
            hue-rotate(${Math.random() * 360}deg)
            saturate(${100 + chaosLevel * 20}%)
            brightness(${100 + chaosLevel * 10}%)
          `;
            }
          },
          Math.max(2000 - chaosLevel * 100, 500),
        ),
      );
    }
  }

  // Apply chaos styles based on level
  function applyChaosLevel() {
    const chaosStyle = document.createElement("style");
    chaosStyle.setAttribute("data-chaos-style", "true");

    let cssRules = "";

    // Level 1-2: Minimal effects (just slight color changes)
    if (chaosLevel >= 1) {
      cssRules += `
        html, body {
          animation: subtle-hue ${Math.max(5 - chaosLevel, 1)}s infinite linear !important;
        }
        @keyframes subtle-hue {
          0% { filter: hue-rotate(0deg) !important; }
          100% { filter: hue-rotate(360deg) !important; }
        }
      `;
    }

    // Level 3-4: Light flashing and movement
    if (chaosLevel >= 3) {
      cssRules += `
        * {
          animation: light-wiggle ${Math.max(2 - chaosLevel * 0.1, 0.5)}s infinite !important;
        }
        @keyframes light-wiggle {
          0%, 100% { transform: rotate(0deg) !important; }
          50% { transform: rotate(${Math.min(chaosLevel * 0.5, 2)}deg) !important; }
        }
      `;
    }

    // Level 5-6: Moderate chaos with colors
    if (chaosLevel >= 5) {
      cssRules += `
        html, body {
          animation: flash-colors ${Math.max(1 - chaosLevel * 0.1, 0.2)}s infinite !important;
        }
        @keyframes flash-colors {
          0% { background-color: rgba(255,0,0,${chaosLevel * 0.05}) !important; }
          25% { background-color: rgba(0,255,0,${chaosLevel * 0.05}) !important; }
          50% { background-color: rgba(0,0,255,${chaosLevel * 0.05}) !important; }
          75% { background-color: rgba(255,255,0,${chaosLevel * 0.05}) !important; }
          100% { background-color: rgba(255,0,255,${chaosLevel * 0.05}) !important; }
        }
      `;
    }

    // Level 7-8: Heavy effects with shaking
    if (chaosLevel >= 7) {
      cssRules += `
        html, body {
          animation: shake ${Math.max(0.2 - chaosLevel * 0.02, 0.05)}s infinite,
                     flash-colors ${Math.max(0.5 - chaosLevel * 0.05, 0.1)}s infinite !important;
        }
        @keyframes shake {
          0% { transform: translate(1px, 1px) !important; }
          25% { transform: translate(-1px, -2px) !important; }
          50% { transform: translate(-2px, 0px) !important; }
          75% { transform: translate(2px, 2px) !important; }
          100% { transform: translate(1px, -1px) !important; }
        }

        * {
          text-shadow: 0 0 ${chaosLevel}px #ff0000, 0 0 ${chaosLevel * 2}px #00ff00 !important;
        }
      `;
    }

    // Level 9-10: Maximum chaos (original intense effects)
    if (chaosLevel >= 9) {
      cssRules += `
        html, body {
          animation: flash-rainbow 0.1s infinite, shake 0.05s infinite, pulse 0.2s infinite alternate !important;
          filter: hue-rotate(0deg) saturate(200%) brightness(150%) !important;
        }

        * {
          animation: flash-text 0.15s infinite, wiggle 0.08s infinite, hue-spin 1s infinite linear !important;
          text-shadow: 0 0 5px #ff0000, 0 0 10px #00ff00, 0 0 15px #0000ff, 0 0 20px #ffff00 !important;
          box-shadow: 0 0 10px #ff00ff, inset 0 0 10px #00ffff !important;
        }

        @keyframes flash-rainbow {
          0% { background-color: #ff0000 !important; }
          14% { background-color: #ff7f00 !important; }
          28% { background-color: #ffff00 !important; }
          42% { background-color: #00ff00 !important; }
          57% { background-color: #0000ff !important; }
          71% { background-color: #4b0082 !important; }
          85% { background-color: #9400d3 !important; }
          100% { background-color: #ff0000 !important; }
        }

        @keyframes flash-text {
          0% { color: #ff0000 !important; }
          20% { color: #00ff00 !important; }
          40% { color: #0000ff !important; }
          60% { color: #ffff00 !important; }
          80% { color: #ff00ff !important; }
          100% { color: #00ffff !important; }
        }

        @keyframes wiggle {
          0% { transform: rotate(-1deg) !important; }
          25% { transform: rotate(1deg) !important; }
          50% { transform: rotate(-1deg) !important; }
          75% { transform: rotate(1deg) !important; }
          100% { transform: rotate(-1deg) !important; }
        }

        @keyframes pulse {
          0% { transform: scale(1) !important; opacity: 1 !important; }
          100% { transform: scale(1.02) !important; opacity: 0.8 !important; }
        }

        @keyframes hue-spin {
          0% { filter: hue-rotate(0deg) saturate(300%) brightness(200%) !important; }
          25% { filter: hue-rotate(90deg) saturate(300%) brightness(200%) !important; }
          50% { filter: hue-rotate(180deg) saturate(300%) brightness(200%) !important; }
          75% { filter: hue-rotate(270deg) saturate(300%) brightness(200%) !important; }
          100% { filter: hue-rotate(360deg) saturate(300%) brightness(200%) !important; }
        }
      `;
    }

    chaosStyle.textContent = cssRules;
    document.head.appendChild(chaosStyle);

    // Create visual elements based on level
    if (chaosLevel >= 6) {
      createFloatingChaos(Math.min(chaosLevel * 5, 50));
    }

    if (chaosLevel >= 8) {
      createScreenFlash();
    }

    if (chaosLevel >= 4) {
      chaosMouseEffects();
    }

    if (chaosLevel >= 10) {
      addClickChaos();
    }
  }

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
      case "startChaos":
        chaosActive = true;
        updateChaosIntensity();
        console.log("🔥 Chaos started!");
        sendResponse({ status: "Chaos activated" });
        break;

      case "stopChaos":
        chaosActive = false;
        updateChaosIntensity();
        console.log("😴 Chaos stopped!");
        sendResponse({ status: "Chaos deactivated" });
        break;

      case "setChaosLevel":
        chaosLevel = request.level || 10;
        updateChaosIntensity();
        console.log(`🎮 Chaos level set to: ${chaosLevel}`);
        sendResponse({ status: `Chaos level: ${chaosLevel}` });
        break;

      case "superChaos":
        superChaosMode();
        console.log("⚡ SUPER CHAOS ACTIVATED!");
        sendResponse({ status: "Super chaos activated" });
        break;

      case "nukePage":
        nukePageMode();
        console.log("💥 PAGE NUKED!");
        sendResponse({ status: "Page nuked" });
        break;

      case "konamiChaos":
        konamiChaosMode();
        console.log("🎊 KONAMI CHAOS!");
        sendResponse({ status: "Konami chaos activated" });
        break;

      default:
        sendResponse({ status: "Unknown command" });
    }
    return true; // Keep message channel open for async response
  });

  // Start the chaos!
  initChaos();
})();
