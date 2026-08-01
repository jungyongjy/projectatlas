export default function Loading() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center px-6 py-24">
      <div className="flex items-center gap-2 text-atlas-text-muted">
        <div className="h-2 w-2 rounded-full bg-atlas-accent animate-pulse" />
        <span className="text-sm">Loading handbook...</span>
      </div>
    </div>
  );
}
