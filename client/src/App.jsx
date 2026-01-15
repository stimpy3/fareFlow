import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div className="h-screen bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white text-4xl">
  Tailwind is alive
</div>
  )
}

export default App
