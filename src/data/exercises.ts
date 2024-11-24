export interface Exercise {
  id: number;
  title: string;
  categories: string[];
  difficulty: string;
  vulnerability: string;
  author: string;
  impact: string;
  description: string;
  solution: string;
}

export interface ExerciseProvider {
  id: number;
  name: string;
  exercises: Exercise[];
}

export const exerciseProviders: ExerciseProvider[] = [
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
];

export const categories = ['Web', 'Crypto', 'Forensics', 'Reverse Engineering', 'Pwn', 'Misc', 'Pentest', 'Active Directory'];

