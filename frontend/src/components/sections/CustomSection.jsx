import { FileText } from 'lucide-react'
import PropTypes from 'prop-types'

export default function CustomSection({ data = { title: '', content: '' }, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Section Title
        </label>
        <div className="relative">
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="input pl-10"
            placeholder="e.g., Volunteer Work, Publications, etc."
          />
          <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          value={data.content || ''}
          onChange={(e) => handleChange('content', e.target.value)}
          className="input"
          rows="4"
          placeholder="Add the content for this section..."
        />
      </div>
    </div>
  )
}

CustomSection.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func.isRequired
} 