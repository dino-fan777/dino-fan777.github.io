export const cheatsheets = [
  {
    id: 1,
    title: "Linux x64 Calling Convention",
    category: "Pwn",
    content: (
      <div>
        <p className="mb-4">The x64 calling convention for Linux systems:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            First 6 integer or pointer arguments are passed in registers: RDI,
            RSI, RDX, RCX, R8, R9
          </li>
          <li>First 8 floating point arguments are passed in XMM0-XMM7</li>
          <li>
            Additional arguments are pushed onto the stack from right to left
          </li>
          <li>
            The stack pointer (RSP) must be aligned to a 16-byte boundary before
            making a call
          </li>
          <li>
            The caller is responsible for cleaning up the stack after the call
          </li>
          <li>Integer return values up to 64 bits are stored in RAX</li>
          <li>Floating point return values are stored in XMM0</li>
          <li>
            Larger return values are handled by passing a hidden first argument
            pointing to the return location
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    title: "Linux System Call Table",
    category: "Pwn",
    content: (
      <div>
        <p className="mb-4">
          Common Linux system calls and their numbers (for x86-64):
        </p>
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
        <p className="mt-4">
          Note: This is a partial list. The complete system call table includes
          many more entries.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    title: "Common Web Vulnerabilities",
    category: "Web",
    content: (
      <div>
        <p className="mb-4">
          Key web vulnerabilities to look for in CTF challenges:
        </p>
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
    ),
  },
  {
    id: 4,
    title: "Basic Cryptography Concepts",
    category: "Crypto",
    content: (
      <div>
        <p className="mb-4">
          Fundamental cryptography concepts for CTF challenges:
        </p>
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
    ),
  },
  {
    id: 5,
    title: "Reverse Engineering Basics",
    category: "Reverse",
    content: (
      <div>
        <p className="mb-4">
          Essential concepts and tools for reverse engineering:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Disassemblers: IDA Pro, Ghidra, Radare2</li>
          <li>Debuggers: GDB, WinDbg, x64dbg</li>
          <li>File formats: ELF, PE</li>
          <li>Common architectures: x86, x64, ARM</li>
          <li>Static vs. Dynamic analysis</li>
          <li>Code obfuscation techniques</li>
          <li>
            Identifying common patterns: loops, function calls, string
            references
          </li>
          <li>Analyzing stack frames and function prologues/epilogues</li>
        </ul>
      </div>
    ),
  },
];

export const categories = Array.from(
  new Set(cheatsheets.map((c) => c.category))
);
