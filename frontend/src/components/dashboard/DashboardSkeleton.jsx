import Skeleton from "../common/Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">

      {/* Market Overview */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8">

        <Skeleton className="h-4 w-40 mb-6" />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

          {[1,2,3,4,5].map((i)=>(
            <div
              key={i}
              className="border rounded-2xl p-5"
            >
              <Skeleton className="h-4 w-16 mb-4"/>
              <Skeleton className="h-8 w-24 mb-3"/>
              <Skeleton className="h-3 w-12"/>
            </div>
          ))}

        </div>

      </div>

      {/* Analysis Form */}

      <div className="rounded-3xl border bg-white p-8">

        <Skeleton className="h-5 w-64 mb-8"/>

        <div className="grid md:grid-cols-2 gap-6">

          {[1,2,3,4,5,6].map((i)=>(
            <Skeleton
              key={i}
              className="h-14 w-full"
            />
          ))}

        </div>

        <Skeleton className="mt-8 h-12 w-44"/>

      </div>

      {/* Cards */}

      <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-5">

        {[1,2,3,4].map((i)=>(
          <div
            key={i}
            className="rounded-2xl border bg-white p-6"
          >
            <Skeleton className="h-5 w-32 mb-5"/>
            <Skeleton className="h-10 w-24 mb-4"/>
            <Skeleton className="h-3 w-full"/>
          </div>
        ))}

      </div>

    </div>
  );
}