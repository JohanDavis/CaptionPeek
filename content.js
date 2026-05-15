console.log("CaptionPeek content script loaded.");

let captionTimeout = null; // Variable to store the timeout ID for hiding captions
const timeoutDuration = 7000; // Duration of caption visibility

document.addEventListener("keydown", (event) => {
    // Check if extension is enabled
    chrome.storage.sync.get("enabled", (data) => {
        if (data.enabled === false) return;

        if (event.key === "ArrowLeft") {
            const captionButton = document.querySelector(
                ".ytp-subtitles-button",
            );
            if (!captionButton) return;

            const captionsOn =
                captionButton.getAttribute("aria-pressed") === "true";

            if (captionsOn !== "true") {
                captionButton.click();
                captionTimeout = setTimeout(() => {
                    if (captionButton.getAttribute("aria-pressed") === "true")
                        captionButton.click();
                }, timeoutDuration);
            }
        }
    });
});
