import { createRef, useEffect } from 'react';
import './App.css'
import { setup } from './utils/pixi'

function App() {
  const appRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!appRef.current) return
    setup(appRef);
  }, [])

  return (
    <div className="App" ref={appRef}>
    </div>
  )
}

export default App
