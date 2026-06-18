import { Search, Filter, Star, MapPin, Briefcase } from "lucide-react";

export default function CandidatesPage() {
  const candidates = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    name: `Candidate ${i + 1}`,
    role: "Senior Frontend Engineer",
    location: "San Francisco, CA",
    experience: "5+ years",
    match: 85 + i * 2,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Candidate Database</h1>
          <p className="text-zinc-500 mt-1">Search and filter top talent for your open positions.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center space-x-2 text-sm font-medium">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 flex items-center space-x-4">
        <Search className="w-5 h-5 text-zinc-400 ml-2" />
        <input 
          type="text" 
          placeholder="Search by skills, role, or location..." 
          className="flex-1 bg-transparent border-none focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500"
        />
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors text-sm font-medium">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                  {candidate.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{candidate.name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{candidate.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded text-xs font-medium text-green-700 dark:text-green-400">
                <Star className="w-3 h-3 fill-current" />
                <span>{candidate.match}% Match</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                <MapPin className="w-4 h-4 mr-2" />
                {candidate.location}
              </div>
              <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                <Briefcase className="w-4 h-4 mr-2" />
                {candidate.experience}
              </div>
            </div>

            <div className="mt-auto flex space-x-3">
              <button className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg transition-colors text-sm font-medium shadow-sm">
                View Profile
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium shadow-md">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
