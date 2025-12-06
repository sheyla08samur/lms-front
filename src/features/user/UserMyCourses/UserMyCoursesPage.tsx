export default function UserMyCoursesPage() {
    const courses = [
        { id: 1, title: "Quantum Physics 101", instructor: "Dr. Evelyn Reed", progress: 75 },
        { id: 2, title: "Advanced AI", instructor: "Dr. John Smith", progress: 30 },
        { id: 3, title: "Modern Web Development", instructor: "Sarah Johnson", progress: 95 },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Courses</h1>
                <div className="space-y-4">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 hover:border-blue-500 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                                    <p className="text-gray-400 mb-4">{course.instructor}</p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 max-w-xs">
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className="text-gray-400">Progress</span>
                                                <span className="text-white">{course.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full"
                                                    style={{ width: `${course.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="ml-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                                    Continue Learning
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

