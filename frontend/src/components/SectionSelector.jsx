import PropTypes from 'prop-types'
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Star, 
  Heart, 
  Phone, 
  FileText 
} from 'lucide-react'

const AVAILABLE_SECTIONS = [
  {
    type: 'personal',
    title: 'Personal Information',
    icon: User
  },
  {
    type: 'experience',
    title: 'Work Experience',
    icon: Briefcase
  },
  {
    type: 'education',
    title: 'Education',
    icon: GraduationCap
  },
  {
    type: 'skills',
    title: 'Skills',
    icon: Star
  },
  {
    type: 'interests',
    title: 'Interests',
    icon: Heart
  },
  {
    type: 'contact',
    title: 'Contact Information',
    icon: Phone
  },
  {
    type: 'custom',
    title: 'Custom Section',
    icon: FileText
  }
]

export default function SectionSelector({ onSelect, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Add Section</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AVAILABLE_SECTIONS.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.type}
                onClick={() => {
                  onSelect(section)
                  onClose()
                }}
                className="flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg group transition-colors"
              >
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-900">{section.title}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

SectionSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
} 