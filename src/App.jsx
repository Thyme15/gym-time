import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// 1. We IMPORT our component file here
import NavBar from './components/ui/Nav-Bar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar 
        title="GymTime" 
        links={[
          { text: "Home", url: "/" },
          { text: "Workouts", url: "/workouts" },
          { text: "Profile", url: "/profile" }
        ]} 
      />
    </>
  )
}

export default App
