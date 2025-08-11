// Browser Blaster Popup Controls
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleChaos");
  const superChaosButton = document.getElementById("superChaos");
  const nukeButton = document.getElementById("nukePage");
  const chaosSlider = document.getElementById("chaosLevel");
  const chaosValue = document.getElementById("chaosValue");
  const status = document.getElementById("status");

  let chaosActive = true;
  let currentChaosLevel = 10;

  // Load saved settings
  chrome.storage.local.get(["chaosActive", "chaosLevel"], function (result) {
    chaosActive = result.chaosActive !== undefined ? result.chaosActive : true;
    currentChaosLevel =
      result.chaosLevel !== undefined ? result.chaosLevel : 10;

    chaosSlider.value = currentChaosLevel;
    updateChaosDisplay(currentChaosLevel);
    updateStatus(chaosActive);

    if (chaosActive) {
      toggleButton.innerHTML = "🎪 DISABLE CHAOS 🎪";
    } else {
      toggleButton.innerHTML = "🎪 ENABLE CHAOS 🎪";
    }
  });

  // Update chaos level display
  function updateChaosDisplay(level) {
    const levels = [
      "MINIMAL ANNOYANCE",
      "LIGHT FLASHING",
      "MODERATE CHAOS",
      "HEAVY DISRUPTION",
      "SEVERE MAYHEM",
      "EXTREME DISORDER",
      "INSANE MADNESS",
      "APOCALYPTIC HELL",
      "COMPLETE DESTRUCTION",
      "MAXIMUM DEVASTATION",
    ];
    chaosValue.textContent = levels[level - 1] || "UNKNOWN CHAOS";
  }

  // Update status display
  function updateStatus(active) {
    if (active) {
      status.innerHTML = "<strong>STATUS: 🔥 CHAOS ACTIVE 🔥</strong>";
      status.style.background = "rgba(255, 0, 0, 0.5)";
    } else {
      status.innerHTML = "<strong>STATUS: 😴 CHAOS PAUSED 😴</strong>";
      status.style.background = "rgba(0, 255, 0, 0.5)";
    }
  }

  // Save settings to storage
  function saveSettings() {
    chrome.storage.local.set({
      chaosActive: chaosActive,
      chaosLevel: currentChaosLevel,
    });
  }

  // Chaos level slider
  chaosSlider.addEventListener("input", function () {
    currentChaosLevel = parseInt(this.value);
    updateChaosDisplay(currentChaosLevel);
    saveSettings();

    // Send chaos level to content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs
          .sendMessage(tabs[0].id, {
            action: "setChaosLevel",
            level: currentChaosLevel,
          })
          .catch(() => {
            console.log("Could not send message to content script");
          });
      }
    });
  });

  // Toggle chaos button
  toggleButton.addEventListener("click", function () {
    chaosActive = !chaosActive;
    updateStatus(chaosActive);
    saveSettings();

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs
          .sendMessage(tabs[0].id, {
            action: chaosActive ? "startChaos" : "stopChaos",
          })
          .catch(() => {
            console.log("Could not send message to content script");
          });
      }
    });

    // Update button text
    if (chaosActive) {
      toggleButton.innerHTML = "🎪 DISABLE CHAOS 🎪";
    } else {
      toggleButton.innerHTML = "🎪 ENABLE CHAOS 🎪";
    }

    // Visual feedback
    toggleButton.style.animation = "none";
    setTimeout(() => {
      toggleButton.style.animation = "pulse 1s infinite";
    }, 10);
  });

  // Super chaos button
  superChaosButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs
          .sendMessage(tabs[0].id, {
            action: "superChaos",
          })
          .catch(() => {
            console.log("Could not send message to content script");
          });
      }
    });

    // Visual feedback
    superChaosButton.style.background =
      "linear-gradient(45deg, #ff0000, #ffff00)";
    superChaosButton.innerHTML = "⚡ SUPER CHAOS ACTIVATED! ⚡";

    setTimeout(() => {
      superChaosButton.style.background =
        "linear-gradient(45deg, #ff00ff, #00ffff)";
      superChaosButton.innerHTML = "⚡ SUPER CHAOS ⚡";
    }, 2000);
  });

  // Nuke page button
  nukeButton.addEventListener("click", function () {
    if (
      confirm(
        "do you want to fuck your browser? the only options are yes and yes",
      )
    ) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0]) {
          chrome.tabs
            .sendMessage(tabs[0].id, {
              action: "nukePage",
            })
            .catch(() => {
              console.log("Could not send message to content script");
            });
        }
      });

      // Visual feedback
      nukeButton.style.background = "linear-gradient(45deg, #ff0000, #ff8800)";
      nukeButton.innerHTML = "page fucked";

      setTimeout(() => {
        nukeButton.style.background =
          "linear-gradient(45deg, #ff00ff, #00ffff)";
        nukeButton.innerHTML = "fuck page";
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

      randomButton.style.transform =
        "scale(1.1) rotate(" + (Math.random() * 20 - 10) + "deg)";
      setTimeout(() => {
        randomButton.style.transform = "";
      }, 300);
    }
  }, 1000);

  // Konami code for extra chaos
  let konamiCode = [];
  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];

  document.addEventListener("keydown", function (e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }

    if (konamiCode.join(",") === konamiSequence.join(",")) {
      // Activate secret chaos mode
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0]) {
          chrome.tabs
            .sendMessage(tabs[0].id, {
              action: "konamiChaos",
            })
            .catch(() => {
              console.log("Could not send message to content script");
            });
        }
      });

      // Visual celebration
      document.body.style.animation = "spin 2s linear infinite";
      status.innerHTML = "<strong>🎊 KONAMI CHAOS UNLOCKED! 🎊</strong>";

      setTimeout(() => {
        document.body.style.animation = "";
        updateStatus(chaosActive);
      }, 5000);
    }
  });

  // Add floating chaos elements to popup
  function createPopupChaos() {
    for (let i = 0; i < 5; i++) {
      const chaos = document.createElement("div");
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
  const style = document.createElement("style");
  style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
    `;
  document.head.appendChild(style);

  // popups every 2 sec
  setInterval(createPopupChaos, 2000);

  createPopupChaos();
});
