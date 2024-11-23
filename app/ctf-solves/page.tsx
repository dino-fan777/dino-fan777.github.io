'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { SearchFilter } from '@/components/SearchFilter'
import { motion, AnimatePresence } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ctfSolves = [
  {
    id: 1,
    title: 'Web Challenge 1',
    categories: ['Web'],
    difficulty: 'Easy',
    vulnerability: 'XSS',
    author: 'DinoHacker',
    impact: 'Medium',
    description: 'This challenge involves exploiting a cross-site scripting vulnerability in a web application.',
    solution: 'The solution involves injecting a malicious script into a user input field that gets reflected back to the user without proper sanitization.',
    year: 2023
  },
  {
    id: 2,
    title: 'Crypto Puzzle',
    categories: ['Crypto'],
    difficulty: 'Medium',
    vulnerability: 'Weak Encryption',
    author: 'CryptoSaurus',
    impact: 'High',
    description: 'This challenge requires breaking a weak encryption algorithm used to protect sensitive data.',
    solution: 'The solution involves analyzing the encryption algorithm and exploiting its weaknesses to decrypt the protected information.',
    year: 2022
  },
  {
    id: 3,
    title: 'Forensics Investigation',
    categories: ['Forensics'],
    difficulty: 'Hard',
    vulnerability: 'Data Exfiltration',
    author: 'DetectiveDino',
    impact: 'Critical',
    description: 'This challenge involves investigating a complex data exfiltration scenario and uncovering hidden evidence.',
    solution: 'The solution requires using advanced forensic tools and techniques to analyze network traffic, file systems, and memory dumps to piece together the exfiltration method and recover the stolen data.',
    year: 2023
  },
  {
    id: 4,
    title: 'Web Forensics Challenge',
    categories: ['Web', 'Forensics'],
    difficulty: 'Medium',
    vulnerability: 'Log Manipulation',
    author: 'WebSleuth',
    impact: 'High',
    description: 'This challenge combines web application analysis with forensic investigation to uncover manipulated log files.',
    solution: 'The solution involves analyzing web server logs, identifying inconsistencies, and using forensic techniques to recover and reconstruct the original, unaltered log entries.',
    year: 2022
  },
  {
    id: 5,
    title: 'Active Directory Takeover',
    categories: ['Active Directory'],
    difficulty: 'Hard',
    vulnerability: 'Kerberoasting',
    author: 'ADNinja',
    impact: 'Critical',
    description: 'This challenge involves exploiting Kerberos authentication in an Active Directory environment to gain domain admin privileges.',
    solution: 'The solution requires identifying service accounts with SPNs, performing Kerberoasting attacks to obtain TGS tickets, cracking the tickets offline, and using the compromised credentials to escalate privileges in the domain.',
    year: 2023
  }
]

const categories = ['Web', 'Crypto', 'Forensics', 'Reverse Engineering', 'Pwn', 'Misc', 'Pentest', 'Active Directory']
const years = Array.from(new Set(ctfSolves.map(solve => solve.year))).sort((a, b) => b - a)

export default function CTFSolves() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [selectedSolve, setSelectedSolve] = useState<number | null>(null)

  const filteredSolves = ctfSolves.filter((solve) => 
    solve.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategories.length === 0 || selectedCategories.some(cat => solve.categories.includes(cat))) &&
    (selectedYear === 'all' || solve.year.toString() === selectedYear)
  )

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
                    <h3 className="text-lg font-semibold mb-2">{solve.title}</h3>
                    <p className="text-sm text-gray-400">Categories: {solve.categories.join(', ')}</p>
                    <p className="text-sm">
                      Difficulty: <span className={getDifficultyColor(solve.difficulty)}>{solve.difficulty}</span>
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
                  const solve = ctfSolves.find(s => s.id === selectedSolve)
                  
                  if (!solve) return <p>Solve not found</p>

                  return (
                    <>
                      <h2 className="text-2xl font-bold mb-4">{solve.title}</h2>
                      <p className="mb-2"><strong>Categories:</strong> {solve.categories.join(', ')}</p>
                      <p className="mb-2">
                        <strong>Difficulty:</strong>{' '}
                        <span className={getDifficultyColor(solve.difficulty)}>{solve.difficulty}</span>
                      </p>
                      <p className="mb-2"><strong>Vulnerability:</strong> {solve.vulnerability}</p>
                      <p className="mb-2"><strong>Author:</strong> {solve.author}</p>
                      <p className="mb-2"><strong>Impact:</strong> {solve.impact}</p>
                      <p className="mb-2"><strong>Year:</strong> {solve.year}</p>
                      <h3 className="text-xl font-semibold mt-6 mb-2">Description</h3>
                      <p className="mb-4">{solve.description}</p>
                      <h3 className="text-xl font-semibold mt-6 mb-2">Solution</h3>
                      <p>{solve.solution}</p>
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

