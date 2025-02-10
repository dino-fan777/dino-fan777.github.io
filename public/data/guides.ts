export interface Guide {
  id: number;
  title: string;
  content: string;
  categories: string[];
  difficulty: string;
  vulnerability: string;
  author: string;
  guideFilePath: string; // New field for the solution file path
}


export const guides : Guide[] = [
  {
    id: 1,
    title: "Making your own shellcode",
    content: "Create your own shellcode to better understand how it works and avoid using any restricted characters. This includes the process of converting shellcode into raw bytes while steering clear of certain system calls that may be blocked or problematic.",
    categories: ["Pwn", "Reverse Engineering"],
    difficulty: "Easy",
    vulnerability: "Buffer Overflow + NX disabled",
    author: "dino_fan",
    guideFilePath:  "/data/guides/guide1.txt",
  },
  {
    id: 2,
    title: "Rop Chain (in progress)",
    content:
      "----",
    categories: ["Crypto"],
    difficulty: "----",
    vulnerability: "----",
    author: "---",
    guideFilePath: "---"
  },
  {
    id: 3,
    title: "Vulnerable C functions",
    content: "C functions that are either vulnerable by themselvs or by combination of certain factors.",
    categories: ["Pwn", "Reverse Engineering"],
    difficulty: "Easy",
    vulnerability: "Depends on the function",
    author: "dino_fan",
    guideFilePath: "/data/guides/guide3.txt"
    },
    {
      id: 4,
      title: "Memory (Stack, Heap, .bss, .data, etc)",
      content: "A guide to the stack and some usefull tricks.",
      categories: ["Pwn", "Reverse Engineering"],
      difficulty: "Easy",
      vulnerability: "Depends on the function",
      author: "dino_fan",
      guideFilePath: "/data/guides/guide4.txt"
      },
];

export const categories = [
  "Web",
  "Crypto",
  "Forensics",
  "Reverse Engineering",
  "Pwn",
  "Network",
  "Misc",
  "Active Directory",
];
