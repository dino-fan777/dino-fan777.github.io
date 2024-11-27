export interface Exercise {
  id: number;
  title: string;
  categories: string[];
  difficulty: string;
  vulnerability: string;
  author: string;
  impact: string;
  description: string;
  solutionFilePath: string; // New field for the solution file path
  scriptFileName: string;
}

export interface ExerciseProvider {
  id: number;
  name: string;
  exercises: Exercise[];
}

export const categories = ['Web', 'Crypto', 'Forensics', 'Reverse Engineering', 'Pwn', 'Misc', 'Pentest', 'Active Directory'];

export const exerciseProviders: ExerciseProvider[] = [
  {
  id: 1,
  name: 'Ret2Systems Wargames',
  exercises:[
    {
      id: 101,
      title: 'Reverse Engineering Level 2',
      categories: ['Pwn', 'Reverse Engineering'],
      difficulty: 'Easy',
      vulnerability: 'Insecure Authentication',
      author: 'Ret2Systems',
      impact: 'High',
      description: 'Simple XOR cipher to decrypt the flag.',
      solutionFilePath: '/data/solutions/Ret2Systems/Level2Mission2.txt',
      scriptFileName: '/data/solutions/Ret2Systems/level2mission2.py'
    },
    {
      id: 102,
      title: 'Memory Corruption Level 1',
      categories: ['Pwn', 'Reverse Engineering'],
      difficulty: 'Easy',
      vulnerability: 'Buffer Overflow',
      author: 'Ret2Systems',
      impact: 'High',
      description: 'Simple buffer overflow to get the flag. Interesting info about strcmp() and fgets().',
      solutionFilePath: '/src/data/solutions/Ret2Systems/Level3Mission1.txt',
      scriptFileName: 'none'
    },
    {
      id: 103,
      title: 'Memory Corruption Level 2',
      categories: ['Pwn', 'Reverse Engineering'],
      difficulty: 'Easy',
      vulnerability: 'Buffer Overflow',
      author: 'Ret2Systems',
      impact: 'High',
      description: 'Buffer overflow combined with manipulation of the binary execution.',
      solutionFilePath: '/src/data/solutions/Ret2Systems/Level3Mission2.txt',
      scriptFileName: '/src/data/solutions/Ret2Systems/level3Mission2.py'
    },
    {
      id: 104,
      title: 'Shellcoding Level 1',
      categories: ['Pwn', 'Reverse Engineering'],
      difficulty: 'Easy',
      vulnerability: 'Bufferoverflow + Executable Stack',
      author: 'Ret2Systems',
      impact: 'High',
      description: 'Shellcode combined with a bufferoverflow.',
      solutionFilePath: '/src/data/solutions/Ret2Systems/Level4Mission1.txt',
      scriptFileName: 'none'
    },
    {
      id: 105,
      title: 'Shellcoding Level 2',
      categories: ['Pwn', 'Reverse Engineering'],
      difficulty: 'Easy',
      vulnerability: 'Buffer Overflow + Executable Stack',
      author: 'Ret2Systems',
      impact: 'High',
      description: 'Shellcode combined with a buffer overflow. Also evading banned characters.',
      solutionFilePath: '/src/data/solutions/Ret2Systems/Level4Mission2.txt',
      scriptFileName: 'none'
    }
  ]
  },
  {
    id: 2,
    name: 'Hack the Box',
    exercises: [
      {
        id: 102,
        title: 'Reverse Engineering Mission 2',
        categories: ['Pwn'],
        difficulty: 'Easy',
        vulnerability: 'Insecure Authentication',
        author: 'Ret2Systems',
        impact: 'High',
        description: 'Simple XOR cipher to decrypt the flag.',
        solutionFilePath:".",
        scriptFileName: ""
      }
    ]
  },
  {
    id: 3,
    name: 'PwnCollege',
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
        solutionFilePath: 'The solution involves understanding memory layout, identifying buffer overflow vulnerabilities, crafting payloads to overwrite the return address, and gaining control of program execution.',
        scriptFileName: ''
      }

    ]
  }
];
