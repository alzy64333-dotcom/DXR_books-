import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: string }
> {
  state = { error: '' }

  static getDerivedStateFromError(error: Error) {
    return { error: error.stack || error.message }
  }

  componentDidCatch(error: Error) {
    console.error('DXR ERROR:', error)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          direction: 'ltr',
          background: '#18090b',
          color: '#ff7373',
          padding: '20px',
          minHeight: '100vh',
          whiteSpace: 'pre-wrap',
          overflowWrap: 'anywhere',
          fontSize: '14px'
        }}>
          <h2>DXR BOOKS - RUNTIME ERROR</h2>
          {this.state.error}
        </div>
      )
    }
    return this.props.children
  }
}

window.addEventListener('error', (event) => {
  document.body.innerHTML = `
    <pre style="direction:ltr;background:#18090b;color:#ff7373;padding:20px;white-space:pre-wrap">
    ${event.message}
    ${event.filename}:${event.lineno}
    </pre>`
})

window.addEventListener('unhandledrejection', (event) => {
  document.body.innerHTML = `
    <pre style="direction:ltr;background:#18090b;color:#ff7373;padding:20px;white-space:pre-wrap">
    ${String(event.reason)}
    </pre>`
})

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
