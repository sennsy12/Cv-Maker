import { Menu } from 'lucide-react'
import { useState } from 'react'
import PropTypes from 'prop-types'

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-md lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-primary">CV Maker</h1>
          </div>
          <nav className="hidden lg:flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-primary">Templates</a>
            <a href="#" className="text-gray-600 hover:text-primary">Examples</a>
            <button className="btn btn-primary">Create CV</button>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-64 bg-white p-4" onClick={e => e.stopPropagation()}>
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-gray-600 hover:text-primary">Templates</a>
              <a href="#" className="text-gray-600 hover:text-primary">Examples</a>
              <button className="btn btn-primary">Create CV</button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white mt-auto">
        <div className="container py-6">
          <p className="text-center">&copy; {new Date().getFullYear()} CV Maker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
} 