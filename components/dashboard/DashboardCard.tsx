type Props = {
  title: string;
  value: string | number;
};

export default function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-slate-800 mt-3">
        {value}
      </h2>

    </div>
  );
}