import { 
    HiChevronDown, HiHome, HiChevronLeft, HiChevronRight, HiCheckCircle,
    HiDownload, HiExternalLink
} from "react-icons/hi";
import { BsPlayCircleFill, BsPlayFill } from "react-icons/bs";
import { FaFilePdf, FaLink } from "react-icons/fa";

export default function MyCoursePage() {
    const units = [
        {
            id: 1,
            title: "UNIT 1: INTRODUCTION",
            expanded: true,
            lessons: [
                { id: 1, title: "1.1 What is a Quantum State?", completed: true, current: true },
                { id: 2, title: "1.2 The Schrödinger Equation", completed: false, current: false },
            ],
        },
        {
            id: 2,
            title: "UNIT 2: CORE PRINCIPLES",
            expanded: false,
            lessons: [],
        },
        {
            id: 3,
            title: "UNIT 3: ADVANCED CONCEPTS",
            expanded: false,
            lessons: [],
        },
    ];

    const objectives = [
        { id: 1, text: "Define what a quantum state represents.", completed: true },
        { id: 2, text: "Understand the concept of a wave function.", completed: true },
        { id: 3, text: "Explain the observer effect in quantum mechanics.", completed: false },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex">
            {/* Left Sidebar - Course Outline */}
            <aside className="w-80 bg-[#1a1a1a] p-6 overflow-y-auto">
                <div className="mb-6">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white font-bold">Q</span>
                    </div>
                    <h2 className="text-lg font-semibold">Quantum Physics 101</h2>
                    <p className="text-sm text-gray-400">Dr. Evelyn Reed</p>
                </div>

                <nav className="space-y-2">
                    {units.map((unit) => (
                        <div key={unit.id}>
                            <button className="w-full flex items-center justify-between px-4 py-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg">
                                <span className="text-sm font-medium">{unit.title}</span>
                                <HiChevronDown className="w-4 h-4" />
                            </button>
                            {unit.expanded && (
                                <div className="ml-4 mt-2 space-y-1">
                                    {unit.lessons.map((lesson) => (
                                        <a
                                            key={lesson.id}
                                            href="#"
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                                                lesson.current
                                                    ? "bg-teal-600 text-white"
                                                    : "text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                                            }`}
                                        >
                                            {lesson.completed ? (
                                                <HiCheckCircle className="w-5 h-5 text-teal-400" />
                                            ) : (
                                                <div className="w-5 h-5 border-2 border-gray-600 rounded-full"></div>
                                            )}
                                            {lesson.current && (
                                                <BsPlayFill className="w-4 h-4" />
                                            )}
                                            <span className="text-sm">{lesson.title}</span>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <button className="mt-8 w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2">
                    <HiHome className="w-5 h-5" />
                    Back to Dashboard
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex">
                <div className="flex-1 p-8">
                    <h1 className="text-3xl font-bold mb-8">1.1 What is a Quantum State?</h1>
                    
                    {/* Video Player */}
                    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 mb-6">
                        <div className="aspect-video bg-gray-800 flex items-center justify-center">
                            <BsPlayCircleFill className="w-20 h-20 text-gray-600" />
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between">
                        <button className="flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-lg hover:bg-[#1a1a1a] transition-colors">
                            <HiChevronLeft className="w-5 h-5" />
                            Previous
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                            Next Lesson
                            <HiChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Right Sidebar */}
                <aside className="w-80 bg-[#1a1a1a] p-6 border-l border-gray-800">
                    {/* Module Progress */}
                    <div className="mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <div className="relative w-24 h-24">
                                <svg className="transform -rotate-90 w-24 h-24">
                                    <circle cx="48" cy="48" r="44" stroke="#1a1a1a" strokeWidth="8" fill="none" />
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="44"
                                        stroke="#14b8a6"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeDasharray={`${2 * Math.PI * 44 * 0.75} ${2 * Math.PI * 44}`}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-bold">75%</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-center font-semibold mb-1">Excellent Progress!</p>
                        <p className="text-center text-sm text-gray-400">3 of 4 lessons completed</p>
                    </div>

                    {/* Lesson Objectives */}
                    <div className="mb-8">
                        <h3 className="font-semibold mb-4">Lesson Objectives</h3>
                        <div className="space-y-3">
                            {objectives.map((obj) => (
                                <div key={obj.id} className="flex items-start gap-3">
                                    {obj.completed ? (
                                        <HiCheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                                    ) : (
                                        <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5 shrink-0"></div>
                                    )}
                                    <span className={`text-sm ${obj.completed ? "text-gray-300" : "text-gray-400"}`}>
                                        {obj.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold mb-4">Resources</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FaFilePdf className="w-5 h-5 text-red-400" />
                                    <span className="text-sm">Downloadable PDF: Key Equations</span>
                                </div>
                                <HiDownload className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FaLink className="w-5 h-5 text-yellow-400" />
                                    <span className="text-sm">Link: Further Reading on Wave Functions</span>
                                </div>
                                <HiExternalLink className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}

