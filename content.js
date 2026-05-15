console.log("CaptionPeek content script loaded.");

let captionTimeout = null; // Variable to store the timeout ID for hiding captions

document.addEventListener("keydown", (event) => {
    // Check if extension is enabled
    chrome.storage.sync.get(["enabled", "timeoutDuration"], (data) => {
        if (data.enabled === false) return;
        const timeoutDuration = (data.timeoutDuration || 7) * 1000; // Convert seconds to milliseconds

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
