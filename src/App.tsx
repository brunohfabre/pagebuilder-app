import { BrowserRouter } from 'react-router-dom'

import { Provider } from '@siakit/core'
import { DialogProvider } from '@siakit/dialog'
import { LoadingProvider } from '@siakit/loading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Routes } from './Routes'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <LoadingProvider>
          <DialogProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </DialogProvider>
        </LoadingProvider>
      </Provider>
    </QueryClientProvider>
  )
}
