export default function Skeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section Skeleton */}
        <div className="text-center mb-12">
          <div className="inline-block h-8 w-48 bg-gray-200 rounded-full mb-4 animate-pulse"></div>
          <div className="h-12 w-3/4 mx-auto bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
          <div className="h-6 w-1/2 mx-auto bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div>
                  <div className="h-7 w-16 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs Skeleton */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 w-32 bg-gray-200 rounded-full animate-pulse"></div>
          ))}
        </div>

        {/* Campaign Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Image Skeleton */}
              <div className="h-56 w-full bg-gray-200 animate-pulse"></div>
              
              {/* Content Skeleton */}
              <div className="p-5">
                <div className="h-6 w-full bg-gray-200 rounded mb-3 animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded mb-4 animate-pulse"></div>
                
                {/* Progress Bar Skeleton */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex justify-between mt-1">
                    <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Buttons Skeleton */}
                <div className="flex gap-3">
                  <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}