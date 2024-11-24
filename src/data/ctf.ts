export const ctfSolves = [
  {
    id: 1,
    title: "Web Challenge 1",
    categories: ["Web"],
    difficulty: "Easy",
    vulnerability: "XSS",
    author: "DinoHacker",
    impact: "Medium",
    description:
      "This challenge involves exploiting a cross-site scripting vulnerability in a web application.",
    solution:
      "The solution involves injecting a malicious script into a user input field that gets reflected back to the user without proper sanitization.",
    year: 2023,
  },
  {
    id: 2,
    title: "Crypto Puzzle",
    categories: ["Crypto"],
    difficulty: "Medium",
    vulnerability: "Weak Encryption",
    author: "CryptoSaurus",
    impact: "High",
    description:
      "This challenge requires breaking a weak encryption algorithm used to protect sensitive data.",
    solution:
      "The solution involves analyzing the encryption algorithm and exploiting its weaknesses to decrypt the protected information.",
    year: 2022,
  },
  {
    id: 3,
    title: "Forensics Investigation",
    categories: ["Forensics"],
    difficulty: "Hard",
    vulnerability: "Data Exfiltration",
    author: "DetectiveDino",
    impact: "Critical",
    description:
      "This challenge involves investigating a complex data exfiltration scenario and uncovering hidden evidence.",
    solution:
      "The solution requires using advanced forensic tools and techniques to analyze network traffic, file systems, and memory dumps to piece together the exfiltration method and recover the stolen data.",
    year: 2023,
  },
  {
    id: 4,
    title: "Web Forensics Challenge",
    categories: ["Web", "Forensics"],
    difficulty: "Medium",
    vulnerability: "Log Manipulation",
    author: "WebSleuth",
    impact: "High",
    description:
      "This challenge combines web application analysis with forensic investigation to uncover manipulated log files.",
    solution:
      "The solution involves analyzing web server logs, identifying inconsistencies, and using forensic techniques to recover and reconstruct the original, unaltered log entries.",
    year: 2022,
  },
  {
    id: 5,
    title: "Active Directory Takeover",
    categories: ["Active Directory"],
    difficulty: "Hard",
    vulnerability: "Kerberoasting",
    author: "ADNinja",
    impact: "Critical",
    description:
      "This challenge involves exploiting Kerberos authentication in an Active Directory environment to gain domain admin privileges.",
    solution:
      "The solution requires identifying service accounts with SPNs, performing Kerberoasting attacks to obtain TGS tickets, cracking the tickets offline, and using the compromised credentials to escalate privileges in the domain.",
    year: 2023,
  },
];

export const categories = [
  "Web",
  "Crypto",
  "Forensics",
  "Reverse Engineering",
  "Pwn",
  "Misc",
  "Pentest",
  "Active Directory",
];
