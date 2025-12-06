import { BsPlayCircleFill } from "react-icons/bs";

export default function UserCoursePage() {
    const course = {
        title: "Introduction to Quantum Computing",
        instructor: "Dr. Evelyn Reed",
        description: "A comprehensive introduction to quantum computing covering fundamental concepts and principles.",
        duration: "8 weeks",
        level: "Beginner",
        students: 1248,
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="max-w-6xl mx-auto p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                    <p className="text-gray-400">by {course.instructor}</p>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="col-span-2">
                        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 mb-6">
                            <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                                <BsPlayCircleFill className="w-16 h-16 text-gray-600" />
                            </div>
                            <h2 className="text-xl font-semibold mb-4">Course Description</h2>
                            <p className="text-gray-300 leading-relaxed mb-6">{course.description}</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Duration</p>
                                    <p className="font-medium">{course.duration}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Level</p>
                                    <p className="font-medium">{course.level}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Students</p>
                                    <p className="font-medium">{course.students.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 sticky top-8">
                            <h3 className="font-semibold mb-4">Course Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Instructor</p>
                                    <p className="font-medium">{course.instructor}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Duration</p>
                                    <p className="font-medium">{course.duration}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Level</p>
                                    <p className="font-medium">{course.level}</p>
                                </div>
                            </div>
                            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
                                Enroll Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

