import * as Y from 'yjs'
import { HocuspocusProvider } from '@hocuspocus/provider'

const ydoc = new Y.Doc()
const provider = new HocuspocusProvider({
  url: 'ws://localhost:1234', // URL of your Hocuspocus server
  name: 'counter-document',   // Unique name for your Yjs document
  document: ydoc,
})

const counter = ydoc.getMap('counter')

const counterElement = document.getElementById('counter')
const incrementButton = document.getElementById('increment')
const decrementButton = document.getElementById('decrement')

// Update the counter element when the counter value changes
counter.observe(() => {
  counterElement.textContent = counter.get('value') || 0
})

// Initialize the counter value if it doesn't exist
if (!counter.has('value')) {
  counter.set('value', 0)
}

incrementButton.addEventListener('click', () => {
  counter.set('value', (counter.get('value') || 0) + 1)
})

decrementButton.addEventListener('click', () => {
  counter.set('value', (counter.get('value') || 0) - 1)
})

// Initial display update
counterElement.textContent = counter.get('value') || 0
