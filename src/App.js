import { colorScheme } from './utils/colorScheme';
import Landing from './component/Landing'
import Homepage from './component/Homepage';
import { Routes, Route } from "react-router-dom";

import "./App.css";

const App = () => {
  return (
    <main className={`h-[auto] bg-${colorScheme.primary}`}>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Homepage />} />

      </Routes>
    </main>
  )
}

export default App
