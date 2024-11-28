"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import { SearchFilter } from "@/components/SearchFilter";
import { motion, AnimatePresence } from "framer-motion";
import { categories, guides } from "../../../public/data/guides";


export default function Guides() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<number | null>(null);
  const [guideText, setGuideText] = useState<string | null>(null)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      router.push("/");
      return; // Exit early if not logged in
    }
  
    const fetchGuideContent = async () => {
      if (selectedGuide !== null) {
        const guide = guides.find((g) => g.id === selectedGuide);
        if (guide) {
          try {
            const response = await fetch(guide.guideFilePath);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            setGuideText(text); // Update the guide content state
          } catch (error) {
            console.error("Failed to fetch guide content:", error);
            setGuideText("Error loading guide content. Please try again later.");
          }
        }
      }
    };
    fetchGuideContent();
  }, [router, selectedGuide]);

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.some((cat) => guide.categories.includes(cat)))
  );


  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-500";
      case "beginner":
        return "text-green-500";
      case "intermediate":
        return "text-yellow-500";
      case "advanced":
        return "text-orange-500";
      case "expert":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4 text-red-500">Guides</h1>
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          categories={categories}
        />
        <AnimatePresence mode="wait">
          {selectedGuide === null ? (
            <motion.div
              key="guide-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6"
            >
              {filteredGuides.map((guide) => (
                <motion.div
                  key={guide.id}
                  className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() => setSelectedGuide(guide.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {guide.categories.join(", ")}
                  </p>
                  <p
                    className={`text-sm font-bold ${getDifficultyColor(
                      guide.difficulty
                    )}`}
                  >
                    {guide.difficulty}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="guide-detail"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="mb-4 text-blue-500 hover:underline"
                onClick={() => setSelectedGuide(null)}
              >
                &larr; Back to Guides
              </button>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                {(() => {
                  const guide = guides.find((g) => g.id === selectedGuide);

                  if (!guide) return <p>Guide not found</p>;

                  return (
                    <>
                      <h2 className="text-2xl font-bold mb-4">{guide.title}</h2>
                      <p className="mb-2">
                        <strong>Categories:</strong>{" "}
                        {guide.categories.join(", ")}
                      </p>
                      <p className="mb-2">
                        <strong>Difficulty:</strong>
                        <span
                          className={`ml-2 font-bold ${getDifficultyColor(
                            guide.difficulty
                          )}`}
                        >
                          {guide.difficulty}
                        </span>
                      </p>
                      <p className="mb-2">
                        <strong>Vulnerability:</strong> {guide.vulnerability}
                      </p>
                      <p className="mb-2">
                        <strong>Author:</strong> {guide.author}
                      </p>
                      <h3 className="text-xl font-semibold mt-6 mb-2">
                        Content
                      </h3>
                      <p>{guide.content}</p>
                      <h3 className="text-xl font-semibold mt-6 mb-2">
                        Explanation 
                      </h3>
                      <div className="bg-black p-4 rounded-lg">
                      <pre className="text-green-500 whitespace-pre-wrap font-mono text-sm">
                        {guideText || 'Loading guide...'}
                        </pre>
                        </div>
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
