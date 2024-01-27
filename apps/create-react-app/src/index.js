import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import App2 from './app2' // import the second app

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

const rootElement2 = document.getElementById('root2') // get the second root element
const root2 = createRoot(rootElement2) // create a root for the second app

root2.render(
  <StrictMode>
    <App2 /> // render the second app
  </StrictMode>
)