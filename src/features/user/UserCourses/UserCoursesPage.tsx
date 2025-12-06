import { HiSearch, HiChevronDown, HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function UserCoursesPage() {
    const courses = [
        {
            id: 1,
            title: "Introduction to Quantum Computing",
            instructor: "Dr. Evelyn Reed",
            tags: ["Science", "Advanced"],
            progress: 75,
            hasProgress: true,
        },
        {
            id: 2,
            title: "Data Visualization with D3.js",
            instructor: "Leo Martinez",
            tags: ["Data Science", "Beginner"],
            progress: 0,
            hasProgress: false,
        },
        {
            id: 3,
            title: "Advanced SEO Strategies",
            instructor: "Chen Wei",
            tags: ["Marketing", "Intermediate"],
            progress: 0,
            hasProgress: false,
        },
        {
            id: 4,
            title: "Foundations of Project Management",
            instructor: "Aisha Khan",
            tags: ["Business", "Beginner"],
            progress: 0,
            hasProgress: false,
        },
        {
            id: 5,
            title: "UI/UX for Mobile Applications",
            instructor: "Ben Carter",
            tags: ["Design", "Intermediate"],
            progress: 25,
            hasProgress: true,
        },
        {
            id: 6,
            title: "Modern Javascript: ES6 and Beyond",
            instructor: "Sofia Rodriguez",
            tags: ["Development", "Advanced"],
            progress: 0,
            hasProgress: false,
        },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex">
            {/* Sidebar Filters */}
            <aside className="w-80 bg-[#1a1a1a] p-6 overflow-y-auto">
                <div className="mb-6">
                    <div className="relative">
                        <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for courses..."
                            className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold mb-3 flex items-center justify-between">
                        Category
                        <HiChevronDown className="w-4 h-4" />
                    </h3>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                            <span className="text-sm">Data Science</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                            <span className="text-sm">Design</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                            <span className="text-sm">Marketing</span>
                        </label>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold mb-3 flex items-center justify-between text-gray-400">
                        Difficulty Level
                        <HiChevronDown className="w-4 h-4" />
                    </h3>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold mb-3 flex items-center justify-between text-gray-400">
                        Instructor
                        <HiChevronDown className="w-4 h-4" />
                    </h3>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold mb-3 flex items-center justify-between text-gray-400">
                        Progress Status
                        <HiChevronDown className="w-4 h-4" />
                    </h3>
                </div>

                <div className="mb-6">
                    <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm">Free Courses Only</span>
                        <div className="relative">
                            <input type="checkbox" className="sr-only" />
                            <div className="w-11 h-6 bg-gray-700 rounded-full"></div>
                        </div>
                    </label>
                </div>

                <div className="space-y-3">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
                        Apply Filters
                    </button>
                    <button className="w-full text-gray-400 hover:text-white text-sm">
                        Reset
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
                        <p className="text-gray-400">Showing 6 of 128 results</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400">Sort by:</span>
                        <select className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-white">
                            <option>Relevance</option>
                            <option>Newest</option>
                            <option>Rating</option>
                        </select>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-blue-500 transition-colors">
                            <div className="h-40 bg-linear-to-br from-blue-500 to-purple-600"></div>
                            <div className="p-4">
                                <div className="flex gap-2 mb-2">
                                    {course.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                index === 0
                                                    ? "bg-blue-500/20 text-blue-400"
                                                    : "bg-green-500/20 text-green-400"
                                            }`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="font-semibold mb-1">{course.title}</h3>
                                <p className="text-sm text-gray-400 mb-3">{course.instructor}</p>
                                {course.hasProgress && (
                                    <>
                                        <div className="mb-3">
                                            <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full"
                                                    style={{ width: `${course.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium">
                                            Continue Learning
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2">
                    <button className="p-2 border border-gray-700 rounded-lg hover:bg-[#1a1a1a]">
                        <HiChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">1</button>
                    <button className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-[#1a1a1a]">2</button>
                    <button className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-[#1a1a1a]">3</button>
                    <span className="px-2 text-gray-400">...</span>
                    <button className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-[#1a1a1a]">8</button>
                    <button className="p-2 border border-gray-700 rounded-lg hover:bg-[#1a1a1a]">
                        <HiChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </main>
        </div>
    );
}

