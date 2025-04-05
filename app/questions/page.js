"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Mock data
const trades = [
  { id: 1, name: "Computer Science" },
  { id: 2, name: "Mechanical Engineering" },
  { id: 3, name: "Civil Engineering" },
  { id: 4, name: "Electrical Engineering" },
  { id: 5, name: "Electronical Engineering" },
];

const semesters = [
  { id: 1, name: "Semester 1" },
  { id: 2, name: "Semester 2" },
  { id: 3, name: "Semester 3" },
  { id: 4, name: "Semester 4" },
  { id: 5, name: "Semester 5" },
  { id: 6, name: "Semester 6" },
];

const subjects = [
  { id: 1, name: "Applied Mathematics-I", semesterId: 1, tradeId:1 },
  { id: 2, name: "Applied Physics -I", semesterId: 1, tradeId:1 },
  { id: 3, name: "English & Communication Skills-I", semesterId: 1, tradeId:1 },
  { id: 4, name: "Fundamentals of IT", semesterId: 1, tradeId:1 },
  { id: 5, name: "Advances in IT", semesterId: 2, tradeId:1 },
  { id: 6, name: "Analog Electronics 2nd Sem", semesterId: 2, tradeId:1 },
  { id: 7, name: "Applied Mathematics-II", semesterId: 2, tradeId:1 },
  { id: 8, name: "Applied Physics -II", semesterId: 2, tradeId:1 },
  { id: 9, name: "Engineering Graphics 2nd Sem", semesterId: 2, tradeId:1 },
  { id: 10, name: "Environmental Studies & Disaster Management", semesterId: 2, tradeId:1 },
  { id: 11, name: "Multimedia Applications 2nd Sem", semesterId: 2, tradeId:1 },
  { id: 12, name: "Data Base Management System - 3rd Sem", semesterId: 3, tradeId:1 },
  { id: 13, name: "Digital Electronics - 3rd Sem", semesterId: 3, tradeId:1 },
  { id: 14, name: "Operating Systems - 3rd Sem", semesterId: 3, tradeId:1 },
  { id: 15, name: "Programming in C - 3rd Sem", semesterId: 3, tradeId:1 },
  { id: 16, name: "Computer Organisation and Architecture", semesterId: 4, tradeId:1 },
  { id: 17, name: "Data Struct. Using C", semesterId: 4, tradeId:1 },
  { id: 18, name: "English and Communication Skills-II", semesterId: 4, tradeId:1 },
  { id: 19, name: "Object Oriented Programming Using Java", semesterId: 4, tradeId:1 }
];


export default function PreviousYearPapers() {
  const [qps, setQp] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState(1);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchQp = async () => {
      try {
        const res = await fetch("/api/get-old-qp");
        const getData = await res.json();

        if (getData.success) {
          setQp(getData.data); // ✅ Set the state correctly
        }


      } catch (error) {
        console.error("Failed to fetch Question Papers", error);
      }
    };

    fetchQp();

  }, []);


  const filteredSemesters = selectedTrade
    ? semesters
    : [];

  const filteredSubjects = selectedSemester
    ? subjects.filter(sub => sub.semesterId === selectedSemester && sub.tradeId === selectedTrade)
    : [];

  const filteredPapers = qps.filter(qps => {
    return (
      (!selectedTrade || qps.tradeId === selectedTrade) &&
      (!selectedSemester || qps.semesterId === selectedSemester) &&
      (!selectedSubject || qps.subjectId === selectedSubject)
    );
  });

  const handleSearch = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Previous Year Question Papers</h1>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div whileHover={{ scale: 1.02 }}>
              <select
                value={selectedTrade || ""}
                onChange={(e) => setSelectedTrade(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Trade</option>
                {trades.map((trade) => (
                  <option key={trade.id} value={trade.id}>
                    {trade.name}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <select
                value={selectedSemester || ""}
                onChange={(e) => setSelectedSemester(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={!selectedTrade}
              >
                <option value="">Select Semester</option>
                {filteredSemesters.map((semester) => (
                  <option key={semester.id} value={semester.id}>
                    {semester.name}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <select
                value={selectedSubject || ""}
                onChange={(e) => setSelectedSubject(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={!selectedSemester}
              >
                <option value="">Select Subject</option>
                {filteredSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {filteredPapers.length > 0 && selectedSemester != null ? (
            filteredPapers.map((qp) => (
              <motion.div
                key={qp.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col mb-4 gap-6"
              >
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">
                      {qp.title}
                    </h3>
                    <div className="flex gap-2 mb-4"></div>
                    <Link
                      target="_blank"
                      href={`${qp.link}`}
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      View Paper
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500"
            >
              Select the Trade and Subject To Get The Question Papers
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}