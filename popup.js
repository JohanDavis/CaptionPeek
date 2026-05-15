// popup.js
// Logic for the extension's popup UI

document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const statusText = document.getElementById('status');

  // Load current state
  chrome.storage.sync.get('enabled', (data) => {
    const isEnabled = data.enabled !== false; // Default to true
    toggleSwitch.checked = isEnabled;
    updateStatusText(isEnabled);
  });

  // Listen for changes
  toggleSwitch.addEventListener('change', (e) => {
    const isEnabled = e.target.checked;
    chrome.storage.sync.set({ enabled: isEnabled });
    updateStatusText(isEnabled);
  });

  function updateStatusText(isEnabled) {
    statusText.textContent = isEnabled ? 'Active' : 'Inactive';
    statusText.style.color = isEnabled ? 'green' : 'red';
  }
});
