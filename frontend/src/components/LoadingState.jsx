export default function LoadingState() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-line bg-panel p-5 animate-pulse h-[104px]">
            <div className="h-3 w-1/2 bg-line rounded" />
            <div className="h-6 w-2/3 bg-line rounded mt-4" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-line bg-panel p-5 animate-pulse h-72">
          <div className="h-3 w-1/3 bg-line rounded mb-4" />
          <div className="h-52 w-full bg-line/60 rounded" />
        </div>
        <div className="rounded-xl border border-line bg-panel p-5 animate-pulse h-72">
          <div className="h-3 w-1/3 bg-line rounded mb-4" />
          <div className="h-52 w-full bg-line/60 rounded" />
        </div>
      </div>
      <div className="rounded-xl border border-line bg-panel p-5 animate-pulse h-72">
        <div className="h-3 w-1/3 bg-line rounded mb-4" />
        <div className="h-52 w-full bg-line/60 rounded" />
      </div>
    </div>
  );
}
