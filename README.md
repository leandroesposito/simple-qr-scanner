# Simple QR Scanner - Privacy-First QR Tool

A minimalist, privacy-focused QR code scanner and generator that runs entirely in your browser. No servers, no accounts, no tracking—all data stays on your device.

## 🌐 Live Demo

[Try it now](https://leandroesposito.github.io/simple-qr-scanner/)

## Privacy First

**Your data never leaves your device.**

- **100% Client-Side** - All processing happens locally in your browser
- **No Backend** - No data is ever sent to a server
- **No Accounts** - No sign-up, no login, no tracking
- **Local Storage Only** - Scan history is saved in your browser's local storage
- **No Analytics** - Zero third-party tracking

## Features

### Scan QR Codes

- Use your device's camera to scan QR codes
- Torch/flashlight support for low-light scanning
- Zoom slider for precise scanning
- Auto-detection with configurable FPS

### Generate QR Codes

- Regenerate QR codes from scan history
- Copy and share results with ease

### History Management

- Automatically saves all scans and generated codes
- View timestamps for each entry
- Delete individual items from history
- Stored locally in your browser

### Progressive Web App (PWA)

- **Install on your phone** - Add to home screen for app-like experience
- **Works offline** - Service worker caches app for offline use
- **Native feel** - Standalone display mode without browser UI

### Sharing & Clipboard

- **Copy to clipboard** - One-tap copy of any QR content
- **Native share** - Use your device's share sheet (when supported)

## Tech Stack

| Package          | Purpose                   |
| ---------------- | ------------------------- |
| **React 19**     | UI framework              |
| **Vite**         | Build tool and dev server |
| **html5-qrcode** | Camera-based QR scanning  |
| **qr**           | QR code generation        |
| **lucide-react** | Icon library              |

## Installation

```bash
# Clone the repository
git clone https://github.com/leandroesposito/simple-qr-scanner.git
cd simple-qr-scanner

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

### Scanning a QR Code

1. Open the app and grant camera permission
2. Point your camera at a QR code
3. The code is automatically detected and added to history

### Generating a QR Code

1. Click the QR icon on any history item
2. The QR code is generated and displayed
3. Click again to hide

### Sharing Results

- **Copy** - Click the clipboard icon to copy content
- **Share** - Click the share icon (if supported by device)
- **View QR** - Click the QR icon to see the encoded image

## 📁 Project Structure

```
simple-qr-scanner/
├── index.html                   # Entry point with PWA registration
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── service-worker.js       # Offline caching
│   └── icon-192.png            # PWA icon
└── src/
    ├── App.jsx                 # Main app component
    ├── Html5QrcodePlugin.jsx   # Camera scanner integration
    ├── HistoryContainer.jsx    # History list container
    ├── HistoryItem.jsx         # Individual history entry
    ├── About.jsx               # About section
    ├── index.css               # Global styles
    └── main.jsx                # React entry point
```

## Technical Highlights

### Smart History Deduplication

```jsx
// App.jsx - Prevents duplicate consecutive scans
const onNewScanResult = useCallback((decodedText) => {
  setHistory((prevHistory) => {
    if (prevHistory.length > 0 && decodedText === prevHistory[0].data) {
      return prevHistory; // Skip duplicate of latest scan
    }

    const newHistory = [
      { data: decodedText, date: new Date() },
      ...prevHistory,
    ];
    saveHistory(newHistory);
    return newHistory;
  });
  setDecodedText(decodedText);
}, []);
```

### PWA Service Worker

```javascript
// service-worker.js - Cache-first strategy for offline support
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200) return response;

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }),
  );
});
```

### Clipboard with Visual Feedback

```jsx
// HistoryItem.jsx - Copy with 2-second visual confirmation
const [copied, setCopied] = useState(false);

async function onClipboardClick() {
  await navigator.clipboard.writeText(data);
  setCopied(true);
}

useEffect(() => {
  if (copied) {
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }
}, [copied]);
```

## PWA Installation

### Android

1. Open the app in Chrome or Firefox
2. Tap the menu (three dots)
3. Select "Add to Home screen"
4. Confirm installation

### iOS

1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Confirm installation
