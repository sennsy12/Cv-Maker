import { 
  User, Briefcase, GraduationCap, 
  Award, Heart, FileText, 
  Phone, Code
} from 'lucide-react'
import PropTypes from 'prop-types'

const availableSections = [
  { 
    id: 'personal',
    type: 'personal',
    title: 'Personal Information',
    icon: User,
    description: 'Your basic information'
  },
  {
    id: 'experience',
    type: 'experience',
    title: 'Work Experience',
    icon: Briefcase,
    description: 'Your professional history'
  },
  {
    id: 'education',
    type: 'education',
    title: 'Education',
    icon: GraduationCap,
    description: 'Your academic background'
  },
  {
    id: 'skills',
    type: 'skills',
    title: 'Skills',
    icon: Code,
    description: 'Your technical abilities'
  },
  {
    id: 'certifications',
    type: 'certifications',
    title: 'Certifications',
    icon: Award,
    description: 'Your professional certifications'
  },
  {
    id: 'interests',
    type: 'interests',
    title: 'Interests',
    icon: Heart,
    description: 'Your hobbies and interests'
  },
  {
    id: 'contact',
    type: 'contact',
    title: 'Contact Information',
    icon: Phone,
    description: 'Your contact details'
  },
  {
    id: 'custom',
    type: 'custom',
    title: 'Custom Section',
    icon: FileText,
    description: 'Add a custom section'
  }
]

export default function SectionList({ onAddSection }) {
  return (
    <div className="space-y-2">
      {availableSections.map((section) => {
        const Icon = section.icon
        return (
          <button
            key={section.id}
            onClick={() => onAddSection(section)}
            className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex-shrink-0">
              <Icon className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <h3 className="font-medium text-sm">{section.title}</h3>
              <p className="text-xs text-gray-500">{section.description}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

SectionList.propTypes = {
  onAddSection: PropTypes.func.isRequired
} 