export default function Loading() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      
      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-6" />

      <div className="border border-gray-200 rounded-lg p-6 mb-4">
        <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse mb-4" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>

     
      <div className="border border-gray-200 rounded-lg p-6 mb-4">
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>

      
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-1/3 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </main>
  );
}