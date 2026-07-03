interface Props {
  title: string;
  items: string[];
}

export default function AnalysisCard({
  title,
  items,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        {title}
      </h2>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-gray-700"
          >
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}