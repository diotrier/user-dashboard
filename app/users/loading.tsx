export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-6" />

     
      <div className="flex gap-3 mb-4">
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
      </div>

  
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 grid grid-cols-6 gap-4 px-4 py-3">
          {['w-20', 'w-32', 'w-24', 'w-10', 'w-10', 'w-10'].map((w, i) => (
            <div key={i} className={`h-4 ${w} bg-gray-300 rounded animate-pulse`} />
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="grid grid-cols-6 gap-4 px-4 py-3 border-t border-gray-100">
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse mx-auto" />
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse mx-auto" />
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>
        ))}
      </div>
    </main>
  );
}