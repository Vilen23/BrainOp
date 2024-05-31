export default function Alert({ error }: { error: string }) {
  return (
    <div
      className="text-sm text-red-800 rounded-lg dark:text-red-400 bg-white"
      role="alert"
    >
      <span className="text-xs bg-white">{error}</span>
    </div>
  );
}
