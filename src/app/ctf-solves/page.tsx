"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchFilter } from "@/components/SearchFilter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ctfSolves } from "@/data/ctf";
import { categories } from "@/data/exercises";

const years = Array.from(new Set(ctfSolves.map((solve) => solve.year))).sort(
  (a, b) => b - a
);

export default function CTFSolves() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSolve, setSelectedSolve] = useState<number | null>(null);

  const filteredSolves = ctfSolves.filter(
    (solve) =>
      solve.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.some((cat) => solve.categories.includes(cat))) &&
      (selectedYear === "all" || solve.year.toString() === selectedYear)
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "hard":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">CTF Solves</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow">
            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              categories={categories}
            />
          </div>
          <div className="w-full md:w-48">
            <Select
              value={selectedYear}
              onValueChange={(value) => setSelectedYear(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {selectedSolve === null ? (
            <motion.div
              key="solve-list"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                {filteredSolves.map((solve) => (
                  <motion.div
                    key={solve.id}
                    className="bg-gray-800 p-4 rounded hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => setSelectedSolve(solve.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      {solve.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Categories: {solve.categories.join(", ")}
                    </p>
                    <p className="text-sm">
                      Difficulty:{" "}
                      <span className={getDifficultyColor(solve.difficulty)}>
                        {solve.difficulty}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400">Year: {solve.year}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="solve-detail"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="mb-4 text-blue-500 hover:underline"
                onClick={() => setSelectedSolve(null)}
              >
                &larr; Back to Solves
              </button>
              <div className="bg-gray-800 p-6 rounded">
                {(() => {
                  const solve = ctfSolves.find((s) => s.id === selectedSolve);

                  if (!solve) return <p>Solve not found</p>;

                  return (
                    <>
                      <h2 className="text-2xl font-bold mb-4">{solve.title}</h2>
                      <p className="mb-2">
                        <strong>Categories:</strong>{" "}
                        {solve.categories.join(", ")}
                      </p>
                      <p className="mb-2">
                        <strong>Difficulty:</strong>{" "}
                        <span className={getDifficultyColor(solve.difficulty)}>
                          {solve.difficulty}
                        </span>
                      </p>
                      <p className="mb-2">
                        <strong>Vulnerability:</strong> {solve.vulnerability}
                      </p>
                      <p className="mb-2">
                        <strong>Author:</strong> {solve.author}
                      </p>
                      <p className="mb-2">
                        <strong>Impact:</strong> {solve.impact}
                      </p>
                      <p className="mb-2">
                        <strong>Year:</strong> {solve.year}
                      </p>
                      <h3 className="text-xl font-semibold mt-6 mb-2">
                        Description
                      </h3>
                      <p className="mb-4">{solve.description}</p>
                      <h3 className="text-xl font-semibold mt-6 mb-2">
                        Solution
                      </h3>
                      <p>{solve.solution}</p>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
