'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { SearchFilter } from '@/components/SearchFilter'
import { ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const exerciseProviders = [
  {
    id: 1,
    name: 'HackTheBox',
    exercises: [
      {
        id: 101,
        title: 'Basic SQL Injection',
        categories: ['Web'],
        difficulty: 'Easy',
        vulnerability: 'SQL Injection',
        author: 'SQLRaptor',
        impact: 'High',
        description: 'Learn the basics of SQL injection and how to exploit vulnerable web applications.',
        solution: 'The solution involves identifying input fields that are vulnerable to SQL injection, crafting malicious SQL queries, and bypassing authentication or extracting sensitive data from the database.'
      },
      {
        id: 102,
        title: 'Advanced XSS',
        categories: ['Web'],
        difficulty: 'Medium',
        vulnerability: 'Cross-Site Scripting',
        author: 'XSSaurus',
        impact: 'Medium',
        description: 'Explore advanced techniques for exploiting cross-site scripting vulnerabilities in web applications.',
        solution: 'The solution requires identifying XSS vulnerabilities, bypassing common XSS filters, and crafting payloads that can steal sensitive information or perform actions on behalf of the victim.'
      },
      {
        id: 103,
        title: 'Active Directory Enumeration',
        categories: ['Active Directory'],
        difficulty: 'Medium',
        vulnerability: 'Information Disclosure',
        author: 'ADMaster',
        impact: 'High',
        description: 'Learn techniques for enumerating Active Directory environments and discovering potential attack vectors.',
        solution: 'The solution involves using tools like BloodHound, PowerView, and ADExplorer to map out the AD structure, identify misconfigurations, and find potential privilege escalation paths.'
      }
    ]
  },
  {
    id: 2,
    name: 'TryHackMe',
    exercises: [
      {
        id: 201,
        title: 'Buffer Overflow 101',
        categories: ['Pwn'],
        difficulty: 'Medium',
        vulnerability: 'Buffer Overflow',
        author: 'StackSmash',
        impact: 'Critical',
        description: 'Learn the fundamentals of buffer overflow vulnerabilities and how to exploit them.',
        solution: 'The solution involves understanding memory layout, identifying buffer overflow vulnerabilities, crafting payloads to overwrite the return address, and gaining control of program execution.'
      },
      {
        id: 202,
        title: 'Reverse Engineering Basics',
        categories: ['Reverse Engineering'],
        difficulty: 'Hard',
        vulnerability: 'Obfuscation',
        author: 'BinaryBrontosaurus',
        impact: 'Medium',
        description: 'Dive into the basics of reverse engineering and learn how to analyze obfuscated binaries.',
        solution: 'The solution requires using disassemblers and debuggers to analyze the binary, identifying and understanding obfuscation techniques, and reverse engineering the program logic to achieve the desired outcome.'
      }
    ]
  }
]

const categories = ['Web', 'Crypto', 'Forensics', 'Reverse Engineering', 'Pwn', 'Misc', 'Pentest', 'Active Directory']

export default function Exercises() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null)
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null)

  const filteredProviders = exerciseProviders.map(provider => ({
    ...provider,
    exercises: provider.exercises.filter(exercise =>
      exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.some(cat => exercise.categories.includes(cat)))
    )
  })).filter(provider => provider.exercises.length > 0)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-500'
      case 'medium':
        return 'text-yellow-500'
      case 'hard':
        return 'text-red-500'
      default:
        return ''
    }
  }

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
                  {exerciseProviders.find(p => p.id === selectedProvider)?.name} Exercises
                </h2>
                <div className="space-y-4">
                  {filteredProviders
                    .find(p => p.id === selectedProvider)
                    ?.exercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="bg-gray-700 p-4 rounded hover:bg-gray-600 transition-colors cursor-pointer"
                        onClick={() => setSelectedExercise(exercise.id)}
                      >
                        <h3 className="text-lg font-semibold mb-2">{exercise.title}</h3>
                        <p className="text-sm text-gray-400">Categories: {exercise.categories.join(', ')}</p>
                        <p className="text-sm">
                          Difficulty: <span className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</span>
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
                    .flatMap(p => p.exercises)
                    .find(e => e.id === selectedExercise)
                  
                  if (!exercise) return <p>Exercise not found</p>

                  return (
                    <>
                      <h2 className="text-2xl font-bold mb-4">{exercise.title}</h2>
                      <p className="mb-2"><strong>Categories:</strong> {exercise.categories.join(', ')}</p>
                      <p className="mb-2">
                        <strong>Difficulty:</strong>{' '}
                        <span className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</span>
                      </p>
                      <p className="mb-2"><strong>Vulnerability:</strong> {exercise.vulnerability}</p>
                      <p className="mb-2"><strong>Author:</strong> {exercise.author}</p>
                      <p className="mb-2"><strong>Impact:</strong> {exercise.impact}</p>
                      <h3 className="text-xl font-semibold mt-6 mb-2">Description</h3>
                      <p className="mb-4">{exercise.description}</p>
                      <h3 className="text-xl font-semibold mt-6 mb-2">Solution</h3>
                      <p>{exercise.solution}</p>
                    </>
                  )
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

