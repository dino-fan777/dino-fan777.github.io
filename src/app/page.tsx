import { Header } from '@/components/Header'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to my CTF page!</h1>
        <p className="text-xl mb-8">Explore my collection of CTF solves and exercises!</p>
        <p>
        Competed for ISCTE - University of Lisbon cybersecurity team 'Carpe Diem'. 
        </p>
        <p>
        Currently competing for Técnico University cybersecurity team 'STT'.
        </p>
        <p>
        Big fan of PWN and Reverse Engineering challenges. Trying to dig into kernel/internals of Linux and Windows.
        </p>
      </main>
      <footer className="bg-gray-800 text-center p-4">
        <p>Access code is "irony"</p>
      </footer>
    </div>
  )
}

