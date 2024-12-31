import PropTypes from 'prop-types'
import { TEMPLATES } from '../templates'

export default function TemplateSelector({ currentTemplate, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(TEMPLATES).map(([id, template]) => (
        <button
          key={id}
          onClick={() => onSelect(id.toLowerCase())}
          className={`
            relative overflow-hidden rounded-lg border-2 transition-all
            ${currentTemplate === id.toLowerCase()
              ? 'border-blue-600 shadow-md'
              : 'border-gray-200 hover:border-blue-600/50'
            }
          `}
        >
          {/* Template Preview */}
          <div className="aspect-[210/297] bg-white p-3">
            <div className="w-full h-full bg-gray-50 rounded border border-gray-100">
              {/* Template Preview Content */}
              <div className="p-2">
                <div className="h-2 w-24 bg-gray-200 rounded mb-1" />
                <div className="h-1.5 w-16 bg-gray-100 rounded mb-3" />
                <div className="space-y-1">
                  <div className="h-1 w-full bg-gray-100 rounded" />
                  <div className="h-1 w-5/6 bg-gray-100 rounded" />
                  <div className="h-1 w-4/6 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Template Name */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white via-white to-white/80 p-3">
            <p className="text-sm font-medium text-gray-900">{template.name}</p>
          </div>

          {/* Selected Indicator */}
          {currentTemplate === id.toLowerCase() && (
            <div className="absolute top-2 right-2">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

TemplateSelector.propTypes = {
  currentTemplate: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
} 