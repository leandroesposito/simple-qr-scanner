import HistoryItem from "./HistoryItem";

export default function HistoryContainer({ items, onItemDeleteClick }) {
  return (
    <div className="history-container">
      {items.map((item, i) => {
        return (
          <HistoryItem
            data={item.data}
            date={item.date}
            key={item.date}
            index={i}
            onItemDeleteClick={onItemDeleteClick}
          />
        );
      })}
    </div>
  );
}
