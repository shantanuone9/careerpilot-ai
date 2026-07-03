interface Props {
  score: number;
}

export default function ScoreCard({
  score,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-8 text-center">

      <p className="text-gray-500">
        ATS Score
      </p>

      <h1 className="text-6xl font-bold text-green-600 mt-4">
        {score}%
      </h1>

    </div>
  );
}