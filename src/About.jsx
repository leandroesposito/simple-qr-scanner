export default function About() {
  return (
    <section class="about-section">
      <div class="about-container">
        <h2>About this application</h2>

        <p class="app-title">
          <strong>QR Scanner</strong> is a minimalist web application built with{" "}
          <strong>React</strong> that lets you scan and generate QR codes
          quickly and effortlessly.
        </p>

        <h3>Why it's different</h3>
        <p>
          🔒 <strong>Your privacy comes first</strong> — All data is processed
          locally on your device. Nothing ever leaves your browser, ensuring
          complete privacy and security.
        </p>

        <h3>What you can do</h3>
        <ul>
          <li>
            <strong>Scan QR codes</strong> using your device's camera with{" "}
            <code>html5-qrcode</code>
          </li>
          <li>
            <strong>Generate QR codes</strong> instantly with the{" "}
            <code>qr</code> package
          </li>
          <li>
            <strong>Save history</strong> of all scans and generated codes
            (stored locally)
          </li>
          <li>
            <strong>Delete items</strong> from your history anytime
          </li>
          <li>
            <strong>Regenerate QR codes</strong> from your scan history
          </li>
          <li>
            <strong>Copy and share</strong> results with ease
          </li>
        </ul>

        <h3>A simple, privacy-first tool</h3>
        <p>
          No accounts. No tracking. No external servers. Just a lightweight,
          zero-complexity app that respects your data.
        </p>

        <div class="warning-note">
          <strong>Note:</strong> Your history is stored in your browser's local
          cache. Clearing your browser data will permanently delete your
          history.
        </div>
        <h3>Source code</h3>
        <p>
          You can read the source code{" "}
          <a href="https://github.com/leandroesposito/simple-qr-scanner">
            here
          </a>
        </p>
      </div>
    </section>
  );
}
