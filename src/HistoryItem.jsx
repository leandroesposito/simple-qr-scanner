import { Clipboard, ClipboardCheck, QrCode, Share2, Trash } from "lucide-react";
import encodeQR from "qr";
import { useEffect, useState } from "react";

export default function HistoryItem({ data, date, index, onItemDeleteClick }) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);

  async function onShareClick() {
    const shareData = {
      title: "Qr result",
      text: data,
    };
    await navigator.share(shareData);
  }

  async function onClipboardClick() {
    await navigator.clipboard.writeText(data);
    setCopied(true);
  }

  function onDeleteClick() {
    onItemDeleteClick(index);
  }

  function onQrClick() {
    setShowQr(!showQr);
  }

  const qrImg = showQr && encodeQR(data, "data-url", { scale: 8 });

  return (
    <div className="history-item">
      <div className="date">
        {date
          .toISOString()
          .replaceAll(/[a-zA-Z]/g, " ")
          .trim()}
      </div>
      <div className="data">{data}</div>
      <div className="buttons">
        {typeof navigator.share === "function" && (
          <button className="button" aria-label="share" onClick={onShareClick}>
            <Share2 />
          </button>
        )}
        <button
          className="button"
          aria-label={copied ? "copied" : "copy"}
          onClick={onClipboardClick}
        >
          {copied ? <ClipboardCheck /> : <Clipboard />}
        </button>
        <button className="button" aria-label="delete" onClick={onDeleteClick}>
          <Trash />
        </button>
        <button className="button" aria-label="view qr" onClick={onQrClick}>
          <QrCode />
        </button>
      </div>
      {showQr && <img src={qrImg} alt="Qr Code" />}
    </div>
  );
}
