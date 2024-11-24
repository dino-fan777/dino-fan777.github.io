"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchFilter } from "@/components/SearchFilter";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { exerciseProviders, categories } from "@/data/exercises";

export default function Exercises() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);

  const filteredProviders = exerciseProviders
    .map((provider) => ({
      ...provider,
      exercises: provider.exercises.filter(
        (exercise) =>
          exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategories.length === 0 ||
            selectedCategories.some((cat) => exercise.categories.includes(cat)))
      ),
    }))
    .filter((provider) => provider.exercises.length > 0);

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
        <h1 className="text-3xl font-bold mb-4">Non-CTF Exercises</h1>
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          categories={categories}
        />
        <AnimatePresence mode="wait">
          {selectedProvider === null ? (
            <motion.div
              key="provider-list"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredProviders.map((provider) => (
                <div key={provider.id} className="bg-gray-800 p-4 rounded">
                  <button
                    className="w-full text-left flex justify-between items-center"
                    onClick={() => setSelectedProvider(provider.id)}
                  >
                    <h2 className="text-xl font-semibold">{provider.name}</h2>
                    <ChevronRight />
                  </button>
                </div>
              ))}
            </motion.div>
          ) : selectedExercise === null ? (
            <motion.div
              key="exercise-list"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="mb-4 text-blue-500 hover:underline"
                onClick={() => setSelectedProvider(null)}
              >
                &larr; Back to Providers
              </button>
              <div className="bg-gray-800 p-4 rounded">
                <h2 className="text-2xl font-semibold mb-4">
                  {
                    exerciseProviders.find((p) => p.id === selectedProvider)
                      ?.name
                  }{" "}
                  Exercises
                </h2>
                <div className="space-y-4">
                  {filteredProviders
                    .find((p) => p.id === selectedProvider)
                    ?.exercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="bg-gray-700 p-4 rounded hover:bg-gray-600 transition-colors cursor-pointer"
                        onClick={() => setSelectedExercise(exercise.id)}
                      >
                        <h3 className="text-lg font-semibold mb-2">
                          {exercise.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Categories: {exercise.categories.join(", ")}
                        </p>
                        <p className="text-sm">
                          Difficulty:{" "}
                          <span
                            className={getDifficultyColor(exercise.difficulty)}
                          >
                            {exercise.difficulty}
                          </span>
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="exercise-detail"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="mb-4 text-blue-500 hover:underline"
                onClick={() => setSelectedExercise(null)}
              >
                &larr; Back to Exercises
              </button>
              <div className="bg-gray-800 p-6 rounded">
                {(() => {
                  const exercise = filteredProviders
                    .flatMap((p) => p.exercises)
                    .find((e) => e.id === selectedExercise);

                  if (!exercise) return <p>Exercise not found</p>;

                  return (
                    <>
                      <h2 className="text-2xl font-bold mb-4">
                        {exercise.title}
                      </h2>
                      <p className="mb-2">
                        <strong>Categories:</strong>{" "}
                        {exercise.categories.join(", ")}
                      </p>
                      <p className="mb-2">
                        <strong>Difficulty:</strong>{" "}
                        <span
                          className={getDifficultyColor(exercise.difficulty)}
                        >
                          {exercise.difficulty}
                        </span>
                      </p>
                      <p className="mb-2">
                        <strong>Vulnerability:</strong> {exercise.vulnerability}
                      </p>
                      <p className="mb-2">
                        <strong>Author:</strong> {exercise.author}
                      </p>
                      <p className="mb-2">
                        <strong>Impact:</strong> {exercise.impact}
                      </p>
                      <h3 className="text-xl font-semibold mt-6 mb-2">
                        Description
                      </h3>
                      <p className="mb-4">{exercise.description}</p>
                      <h3 className="text-xl font-semibold mt-6 mb-2">
                        Solution
                      </h3>
                      <p>{exercise.solution}</p>
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
