import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import './index.css'
import BearCounter from './components/Bears'
import { useQuery } from '@tanstack/react-query'
import { fetchArticles } from './api/todos'

function App() {
  const [count, setCount] = useState(0)


  // Queries
  const query = useQuery({ queryKey: ['article'], queryFn: fetchArticles });

  return (
    <>
      <div className='bg-black-700 flex gap-2 items-center justify-center'>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className='text-red-700'>Vite + React</h1>
      <div className="card border-2 border-red-700">
        <button className='bg-red-700' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <h1 className="text-3xl font-bold underline">
        React 19 with Tailwind CSS v4
      </h1>
      <Button>Button</Button>
      <BearCounter />
      <ul>{query.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>

    </>
  )
}

export default App
