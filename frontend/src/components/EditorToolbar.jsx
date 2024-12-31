import { Download, Eye, EyeOff, ChevronDown, Menu, X } from 'lucide-react'
import PropTypes from 'prop-types'
import { useState } from 'react'

export default function EditorToolbar({ 
  onDownload, 
  isPreview, 
  onPreview, 
  zoom, 
  onZoomChange,
  onChangeTemplate,
  isMobileView,
  showLeftSidebar,
  onToggleSidebar
}) {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleDownload = (format) => {
    setShowDownloadMenu(false)
    onDownload(format)
  }

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left Side */}
          <div className="flex items-center gap-2">
            {isMobileView && (
              <button
                onClick={onToggleSidebar}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                {showLeftSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
            
            {/* Preview Toggle - Hidden on Mobile */}
            <button
              onClick={onPreview}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {isPreview ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span>Edit Mode</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </>
              )}
            </button>
          </div>

          {/* Center - Zoom Controls - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onZoomChange(Math.max(0.4, zoom - 0.1))}
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              -
            </button>
            <span className="text-sm text-gray-600 min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => onZoomChange(Math.min(1.5, zoom + 0.1))}
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              +
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={onChangeTemplate}
                className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Change Template
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showDownloadMenu && (
                  <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    <button
                      onClick={() => handleDownload('pdf')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Download as PDF
                    </button>
                    <button
                      onClick={() => handleDownload('png')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Download as PNG
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <div className="space-y-2">
              <button
                onClick={onPreview}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {isPreview ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    <span>Edit Mode</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </>
                )}
              </button>

              <button
                onClick={onChangeTemplate}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Change Template
              </button>

              <div className="px-4 py-2 space-y-2">
                <p className="text-xs text-gray-500">Download As:</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload('pdf')}
                    className="flex-1 px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                  >
                    PDF
                  </button>
                  <button
                    onClick={() => handleDownload('png')}
                    className="flex-1 px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                  >
                    PNG
                  </button>
                </div>
              </div>

              <div className="px-4 py-2">
                <p className="text-xs text-gray-500 mb-2">Zoom:</p>
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={() => onZoomChange(Math.max(0.4, zoom - 0.1))}
                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    -
                  </button>
                  <span className="text-sm text-gray-600">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={() => onZoomChange(Math.min(1.5, zoom + 0.1))}
                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

EditorToolbar.propTypes = {
  onDownload: PropTypes.func.isRequired,
  isPreview: PropTypes.bool.isRequired,
  onPreview: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired,
  onZoomChange: PropTypes.func.isRequired,
  onChangeTemplate: PropTypes.func.isRequired,
  isMobileView: PropTypes.bool.isRequired,
  showLeftSidebar: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired
} 