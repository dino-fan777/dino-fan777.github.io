import { Header } from '@/components/Header'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to DinoFan CTF</h1>
        <p className="text-xl mb-8">Explore our collection of CTF solves and exercises for dinosaur enthusiasts!</p>
      </main>
      <footer className="bg-gray-800 text-center p-4">
        <p>&copy; 2023 DinoFan CTF. All rights reserved.</p>
      </footer>
    </div>
  )
}

