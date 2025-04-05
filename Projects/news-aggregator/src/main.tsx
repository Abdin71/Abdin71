import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import IndexPage from './pages/index.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <IndexPage />
    </QueryClientProvider >
  </StrictMode>,
)
