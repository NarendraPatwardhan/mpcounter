<script>
  import { onMount, onDestroy } from 'svelte';
  import * as Y from 'yjs';
  import { HocuspocusProvider } from '@hocuspocus/provider';

  let counter = 0;
  let ydoc;
  let provider;
  let ymap;

  onMount(() => {
    ydoc = new Y.Doc();
    provider = new HocuspocusProvider({
      url: 'ws://localhost:1234', // URL of your Hocuspocus server
      name: 'counter-document',   // Unique name for your Yjs document
      document: ydoc,
    });

    ymap = ydoc.getMap('counter');

    // Initialize the counter value if it doesn't exist
    if (!ymap.has('value')) {
      ymap.set('value', 0);
    }

    // Update the counter when the Yjs value changes
    const updateCounter = () => {
      counter = ymap.get('value') || 0;
    };

    ymap.observe(updateCounter);
    updateCounter(); // Initial update

    return () => {
      ymap.unobserve(updateCounter);
      provider.destroy();
    };
  });

  function increment() {
    ymap.set('value', (ymap.get('value') || 0) + 1);
  }

  function decrement() {
    ymap.set('value', (ymap.get('value') || 0) - 1);
  }
</script>

<main>
  <h1>Counter: {counter}</h1>
  <button on:click={increment}>Increment</button>
  <button on:click={decrement}>Decrement</button>
</main>
