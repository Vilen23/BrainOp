export default function Alert({ error }: { error: string }) {
  return (
    <div
      className="px-4  text-sm text-red-800 rounded-lg dark:bg-gray-800 dark:text-red-400 bg-white"
      role="alert"
    >
      <span className="font-medium bg-white">{error}</span>
    </div>
  );
}
