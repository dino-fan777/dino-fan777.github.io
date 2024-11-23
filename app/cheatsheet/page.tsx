'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const cheatsheets = [
  {
    id: 1,
    title: 'Linux x64 Calling Convention',
    category: 'Pwn',
    content: (
      <div>
        <p className="mb-4">The x64 calling convention for Linux systems:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>First 6 integer or pointer arguments are passed in registers: RDI, RSI, RDX, RCX, R8, R9</li>
          <li>First 8 floating point arguments are passed in XMM0-XMM7</li>
          <li>Additional arguments are pushed onto the stack from right to left</li>
          <li>The stack pointer (RSP) must be aligned to a 16-byte boundary before making a call</li>
          <li>The caller is responsible for cleaning up the stack after the call</li>
          <li>Integer return values up to 64 bits are stored in RAX</li>
          <li>Floating point return values are stored in XMM0</li>
          <li>Larger return values are handled by passing a hidden first argument pointing to the return location</li>
        </ul>
      </div>
    )
  },
  {
    id: 2,
    title: 'Linux System Call Table',
    category: 'Pwn',
    content: (
      <div>
        <p className="mb-4">Common Linux system calls and their numbers (for x86-64):</p>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700">
              <th className="border border-gray-600 px-4 py-2">System Call</th>
              <th className="border border-gray-600 px-4 py-2">Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-600 px-4 py-2">read</td>
              <td className="border border-gray-600 px-4 py-2">0</td>
            </tr>
            <tr>
              <td className="border border-gray-600 px-4 py-2">write</td>
              <td className="border border-gray-600 px-4 py-2">1</td>
            </tr>
            <tr>
              <td className="border border-gray-600 px-4 py-2">open</td>
              <td className="border border-gray-600 px-4 py-2">2</td>
            </tr>
            <tr>
              <td className="border border-gray-600 px-4 py-2">close</td>
              <td className="border border-gray-600 px-4 py-2">3</td>
            </tr>
            <tr>
              <td className="border border-gray-600 px-4 py-2">stat</td>
              <td className="border border-gray-600 px-4 py-2">4</td>
            </tr>
            <tr>
              <td className="border border-gray-600 px-4 py-2">fstat</td>
              <td className="border border-gray-600 px-4 py-2">5</td>
            </tr>
            <tr>
              <td className="border border-gray-600 px-4 py-2">lstat</td>
              <td className="border border-gray-600 px-4 py-2">6</td>
            </tr>
            <tr>
              <td className="border border-gray-600 px-4 py-2">poll</td>
              <td className="border border-gray-600 px-4 py-2">7</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4">Note: This is a partial list. The complete system call table includes many more entries.</p>
      </div>
    )
  },
  {
    id: 3,
    title: 'Common Web Vulnerabilities',
    category: 'Web',
    content: (
      <div>
        <p className="mb-4">Key web vulnerabilities to look for in CTF challenges:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>SQL Injection (SQLi)</li>
          <li>Cross-Site Scripting (XSS)</li>
          <li>Cross-Site Request Forgery (CSRF)</li>
          <li>Server-Side Request Forgery (SSRF)</li>
          <li>Remote Code Execution (RCE)</li>
          <li>Local File Inclusion (LFI) / Remote File Inclusion (RFI)</li>
          <li>XML External Entity (XXE) Injection</li>
          <li>Insecure Direct Object References (IDOR)</li>
        </ul>
      </div>
    )
  },
  {
    id: 4,
    title: 'Basic Cryptography Concepts',
    category: 'Crypto',
    content: (
      <div>
        <p className="mb-4">Fundamental cryptography concepts for CTF challenges:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Symmetric vs. Asymmetric Encryption</li>
          <li>Common Ciphers: Caesar, Vigenère, Substitution</li>
          <li>Hashing: MD5, SHA family</li>
          <li>Public Key Cryptography: RSA, Diffie-Hellman</li>
          <li>Block Ciphers vs. Stream Ciphers</li>
          <li>Modes of Operation: ECB, CBC, CTR</li>
          <li>Padding: PKCS#7</li>
          <li>Frequency Analysis</li>
        </ul>
      </div>
    )
  },
  {
    id: 5,
    title: 'Reverse Engineering Basics',
    category: 'Reverse',
    content: (
      <div>
        <p className="mb-4">Essential concepts and tools for reverse engineering:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Disassemblers: IDA Pro, Ghidra, Radare2</li>
          <li>Debuggers: GDB, WinDbg, x64dbg</li>
          <li>File formats: ELF, PE</li>
          <li>Common architectures: x86, x64, ARM</li>
          <li>Static vs. Dynamic analysis</li>
          <li>Code obfuscation techniques</li>
          <li>Identifying common patterns: loops, function calls, string references</li>
          <li>Analyzing stack frames and function prologues/epilogues</li>
        </ul>
      </div>
    )
  }
]

const categories = Array.from(new Set(cheatsheets.map(c => c.category)))

export default function Cheatsheet() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const [selectedCheatsheet, setSelectedCheatsheet] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
    if (!loggedIn) {
      router.push('/')
    }
  }, [router])

  if (!isLoggedIn) {
    return null
  }

  const filteredCheatsheets = cheatsheets.filter((cheatsheet) =>
    cheatsheet.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategories.length === 0 || selectedCategories.includes(cheatsheet.category))
  )

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6">CTF Cheatsheets</h1>
        <AnimatePresence mode="wait">
          {selectedCheatsheet === null ? (
            <motion.div
              key="cheatsheet-list"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Search cheatsheets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64"
                />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-1">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm">{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {filteredCheatsheets.map((cheatsheet) => (
                  <motion.div
                    key={cheatsheet.id}
                    className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => setSelectedCheatsheet(cheatsheet.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-semibold">{cheatsheet.title}</h2>
                        <p className="text-sm text-gray-400">{cheatsheet.category}</p>
                      </div>
                      <ChevronRight />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cheatsheet-detail"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="mb-4 text-blue-500 hover:underline"
                onClick={() => setSelectedCheatsheet(null)}
              >
                &larr; Back to Cheatsheets
              </button>
              <div className="bg-gray-800 p-6 rounded">
                {(() => {
                  const cheatsheet = cheatsheets.find(c => c.id === selectedCheatsheet)
                  
                  if (!cheatsheet) return <p>Cheatsheet not found</p>

                  return (
                    <>
                      <h2 className="text-2xl font-bold mb-4">{cheatsheet.title}</h2>
                      <p className="text-sm text-gray-400 mb-4">Category: {cheatsheet.category}</p>
                      {cheatsheet.content}
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

