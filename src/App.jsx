import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { useCallback, useEffect, useState } from "react";
import HistoryContainer from "./HistoryContainer";
import About from "./About";

function App() {
  const [decodedText, setDecodedText] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const storageHistory = JSON.parse(localStorage.getItem("history"));
      setHistory(
        storageHistory
          ? storageHistory.map((item) => {
              return {
                data: item.data,
                date: new Date(item.date),
              };
            })
          : [],
      );
    });
  }, []);

  function saveHistory(history) {
    localStorage.setItem("history", JSON.stringify(history));
  }

  function onItemDeleteClick(index) {
    const newHistory = history.filter((val, i) => {
      return i != index;
    });
    setHistory(newHistory);
    saveHistory(newHistory);
  }

  const onNewScanResult = useCallback((decodedText) => {
    setHistory((prevHistory) => {
      if (prevHistory.length > 0 && decodedText === prevHistory[0].data) {
        return prevHistory;
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

  return (
    <>
      <h1>Simple QR</h1>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
        showZoomSliderIfSupported={true}
        showTorchButtonIfSupported={true}
      />
      <div className="last-result">{decodedText}</div>
      <HistoryContainer items={history} onItemDeleteClick={onItemDeleteClick} />
      <About />
    </>
  );
}

export default App;
