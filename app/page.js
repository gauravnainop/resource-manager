"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
export default function Home() {
  return (<>
    <div className="h-screen bg-white text-center flex flex-col items-center justify-center">
      <motion.h1
        className="text-5xl font-bold text-blue-800 mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome To PolyResource
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        You Can Now Access all The Resource Uploaded By
        <br /> Your Favourite Teachers And all The Previous Question Papers
      </motion.p>
      <div className=" flex justify-center  items-center gap-5 flex-col">
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link href="/questions">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition">
              Get Old Question Papers
            </button>
          </Link>
        </motion.div>
        
      </div>
      <motion.div
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >

      </motion.div>
    </div>
  </>
  );
}