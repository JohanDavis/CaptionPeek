# CaptionPeek

CaptionPeek is a lightweight browser extension for YouTube that temporarily enables captions when you rewind a video using the left arrow key. The extension is designed for users who want a quick glimpse of missed dialogue without leaving subtitles on permanently.

## What CaptionPeek Does

- Detects when the user presses the left arrow key while watching a YouTube video.
- Automatically enables YouTube captions if they are currently disabled.
- Keeps captions visible for a configurable number of seconds.
- Turns captions off automatically after the timeout expires.

## How It Works

CaptionPeek is built as a Chrome/Edge-compatible extension using Manifest V3.

- `content.js` runs on YouTube pages and listens for the `ArrowLeft` key press.
- When rewind is triggered, it finds the YouTube captions button (`.ytp-subtitles-button`).
- If captions are off, it clicks the caption button to enable subtitles.
- After the configured timeout, it clicks the button again to disable captions if they are still active.
- `popup.js` provides a small settings interface that stores extension state and timeout values using `chrome.storage.sync`.

## Features

- Automatic caption activation on rewind
- Configurable caption display duration
- Enable/disable toggle in the popup UI
- Works on all YouTube pages under `*.youtube.com`

## Extension Files

- `manifest.json` - Extension metadata, permissions, host access, and content script registration.
- `content.js` - Main logic that watches for the left arrow key and toggles captions temporarily.
- `popup.html` - Settings popup UI shown when the extension action is clicked.
- `popup.js` - Saves and loads user settings, including enable state and timeout duration.
- `popup.css` - Styling for the popup interface.
- `icons/logo.png` - Extension icon used in the browser toolbar.

## Settings

From the popup UI, you can:

- Enable or disable CaptionPeek entirely.
- Set how many seconds captions stay visible after rewind. The default is `7` seconds.
- The timeout value is saved automatically and synced using Chrome storage.

## How to Load the Extension in a Browser

### Chrome / Edge / Brave

1. Open the browser and go to the extensions page:
    - Chrome: `chrome://extensions/`
    - Edge: `edge://extensions/`
    - Brave: `brave://extensions/`
2. Enable `Developer mode` in the top-right corner.
3. Click `Load unpacked`.
4. Select the `CaptionPeek` folder from this repository.
5. Confirm the extension has loaded and look for the `CaptionPeek` icon in the toolbar.

### Firefox (Developer Edition / Nightly only)

Firefox does not support Manifest V3 extensions in stable releases in the same way as Chromium browsers. Use a Chromium-based browser for best compatibility.

## Usage

1. Open YouTube and play a video.
2. Press the left arrow key to rewind the video while CaptionPeek is active.
3. Captions will appear automatically if they were off.
4. Captions turn off again after the configured timeout.

> Note: If captions are already enabled, the extension does not toggle them again on rewind.

## Permissions

CaptionPeek uses these permissions:

- `storage` - to save the enabled state and timeout duration.
- Host permission for `*://*.youtube.com/*` - to allow the content script to run on YouTube pages.

## Development

If you want to make changes:

1. Edit the source files in this folder.
2. Reload the extension from the browser extensions page after saving changes.
3. Test on YouTube to verify the rewind caption behavior.

## Troubleshooting

- If the popup settings do not update, refresh the YouTube page.
- If captions do not appear on rewind, verify the extension is enabled and that you are on a YouTube video page.
- Make sure the browser has permission to run the extension on `youtube.com`.
