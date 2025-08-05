import { useState } from 'react'
import './App.css'
import Banner from './components/Banner'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Banner/>
    </div>
  )
}

export default App
