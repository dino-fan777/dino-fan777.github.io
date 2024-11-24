"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prefix } from "@/lib/utils";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showGuides, setShowGuides] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    setShowGuides(loggedIn);
  }, []);

  const handleLogin = () => {
    const code = prompt("Enter access code:");
    if (code === "irony") {
      setIsLoggedIn(true);
      setShowGuides(true);
      localStorage.setItem("isLoggedIn", "true");
    } else {
      alert("Invalid code");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowGuides(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <header className="bg-green-700 p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-xl font-bold">
            DinoFan CTF
          </Link>
          <img
            src={`${prefix}/triceratops.svg`}
            alt="Triceratops"
            width={40}
            height={40}
          />
        </div>
        <nav className="space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/exercises" className="hover:text-gray-300">
            Non-CTF Exercises
          </Link>
          <Link href="/ctf-solves" className="hover:text-gray-300">
            CTF Solves
          </Link>
          {showGuides && (
            <>
              <Link
                href="/guides"
                className="text-red-500 font-bold hover:text-red-300 transition-colors duration-300"
              >
                Guides
              </Link>
              <Link
                href="/cheatsheet"
                className="text-yellow-300 font-bold hover:text-yellow-100 transition-colors duration-300"
              >
                Cheatsheet
              </Link>
            </>
          )}
        </nav>
        <div className="mt-4 sm:mt-0">
          {isLoggedIn ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Button onClick={handleLogin}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
}
