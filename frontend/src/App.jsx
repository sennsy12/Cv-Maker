import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Editor from './pages/Editor'
import LandingPage from './pages/LandingPage'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/templates" element={<div className="p-8">Templates page coming soon...</div>} />
            <Route path="/examples" element={<div className="p-8">Examples page coming soon...</div>} />
            <Route path="/pricing" element={<div className="p-8">Pricing page coming soon...</div>} />
            <Route path="/guide" element={<div className="p-8">CV Writing Guide coming soon...</div>} />
            <Route path="/blog" element={<div className="p-8">Blog coming soon...</div>} />
            <Route path="/support" element={<div className="p-8">Support page coming soon...</div>} />
            <Route path="/about" element={<div className="p-8">About page coming soon...</div>} />
            <Route path="/contact" element={<div className="p-8">Contact page coming soon...</div>} />
            <Route path="/privacy" element={<div className="p-8">Privacy Policy coming soon...</div>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}
