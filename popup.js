document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.getElementById("toggleSwitch");
    const statusText = document.getElementById("status");
    const timeoutInput = document.getElementById("timeoutInput");
    const statusRow = document.querySelector(".status-row");

    // Load current state
    chrome.storage.sync.get(["enabled", "timeoutDuration"], (data) => {
        const isEnabled = data.enabled !== false;
        const timeout = data.timeoutDuration || 7;
        toggleSwitch.checked = isEnabled;
        timeoutInput.value = timeout;
        updateStatusText(isEnabled);
    });

    // Listen for toggle changes
    toggleSwitch.addEventListener("change", (e) => {
        const isEnabled = e.target.checked;
        chrome.storage.sync.set({ enabled: isEnabled });
        updateStatusText(isEnabled);
    });

    // Listen for timeout duration changes
    timeoutInput.addEventListener("change", (e) => {
        const timeout = Math.max(
            1,
            Math.min(60, parseInt(e.target.value) || 7),
        );
        timeoutInput.value = timeout; // Ensure valid value is displayed
        chrome.storage.sync.set({ timeoutDuration: timeout });
    });

    function updateStatusText(isEnabled) {
        statusText.textContent = isEnabled ? "Active" : "Inactive";
        statusRow.classList.toggle("is-off", !isEnabled);
    }
});
