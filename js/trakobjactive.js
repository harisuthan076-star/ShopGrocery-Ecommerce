
function startBlink(stepId) {
    const el = document.getElementById(stepId);
    if (el) el.classList.add('blinking');
}

// Helper function to stop blinking effect
function stopBlink(stepId) {
    const el = document.getElementById(stepId);
    if (el) el.classList.remove('blinking');
}

// Load on page
window.addEventListener('DOMContentLoaded', () => {
    // Step 1: Admin clicked "Accepted"
    if (localStorage.getItem('orderAccepted')) {
        startBlink('stepReady');

        setTimeout(() => {
            stopBlink('stepReady');
            startBlink('stepPacked');
        }, 10000); // 10 seconds

        // Clear to avoid repeat
        localStorage.removeItem('orderAccepted');
    }

    // Step 2: Admin clicked "Mark as Delivered"
    if (localStorage.getItem('orderOutForDelivery')) {
        stopBlink('stepPacked');
        startBlink('stepOut');

        // Clear to avoid repeat
        localStorage.removeItem('orderOutForDelivery');
    }

    // Step 3: Delivery guy scanned QR code
    if (localStorage.getItem('orderDelivered')) {
        stopBlink('stepOut');
        startBlink('stepDelivered');

        setTimeout(() => {
            stopBlink('stepDelivered');
        }, 10000); // stop after 10 seconds

        // Clear flag
        localStorage.removeItem('orderDelivered');
    }
});





/*window.addEventListener("DOMContentLoaded", () => {
    const stepDelivered = document.getElementById("stepDelivered");
    const storedTime = localStorage.getItem("deliveredBlinkStart");

    if (storedTime) {
        const startTime = parseInt(storedTime);
        const now = Date.now();
        const delay = startTime - now;

        if (delay > 0) {
            // Wait until 10 seconds pass
            setTimeout(() => {
                stepDelivered.classList.add("blinking");

                // Stop blinking after 60s
                setTimeout(() => {
                    stepDelivered.classList.remove("blinking");
                    localStorage.removeItem("deliveredBlinkStart");
                }, 10000);
            }, delay);
        } else if (now - startTime < 60000) {
            // Already within the 1 minute window
            stepDelivered.classList.add("blinking");

            setTimeout(() => {
                stepDelivered.classList.remove("blinking");
                localStorage.removeItem("deliveredBlinkStart");
            }, 10000 - (now - startTime));
        } else {
            // Time expired
            localStorage.removeItem("deliveredBlinkStart");
        }
    }
});*/

// trakobjactive.js or directly in TrackYourProduct.html <script>

window.addEventListener('DOMContentLoaded', () => {
  const shouldBlink = localStorage.getItem('startDeliveredBlink');

  if (shouldBlink === 'true') {
    const deliveredStep = document.getElementById('stepDelivered');
    
    let isBlinking = true;
    let blinkCount = 0;
    const interval = setInterval(() => {
      deliveredStep.classList.toggle('blinking');
      blinkCount++;
      if (blinkCount >= 60) { // 1 minute = 60 seconds
        clearInterval(interval);
        deliveredStep.classList.remove('blinking');
        localStorage.removeItem('startDeliveredBlink'); // Reset flag
      }
    }, 1000);
  }
});
