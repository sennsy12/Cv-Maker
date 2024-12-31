import { Mail, Phone, MapPin, Globe } from 'lucide-react'
import PropTypes from 'prop-types'

export default function PersonalSection({ data = {}, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    onChange({ ...data, [name]: value })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={data.fullName || ''}
            onChange={handleChange}
            className="input"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Professional Title
          </label>
          <input
            type="text"
            name="title"
            value={data.title || ''}
            onChange={handleChange}
            className="input"
            placeholder="Senior Software Engineer"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={data.email || ''}
              onChange={handleChange}
              className="input pl-10"
              placeholder="john@example.com"
            />
            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={data.phone || ''}
              onChange={handleChange}
              className="input pl-10"
              placeholder="+1 234 567 890"
            />
            <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              name="location"
              value={data.location || ''}
              onChange={handleChange}
              className="input pl-10"
              placeholder="New York, USA"
            />
            <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <div className="relative">
            <input
              type="url"
              name="website"
              value={data.website || ''}
              onChange={handleChange}
              className="input pl-10"
              placeholder="www.johndoe.com"
            />
            <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Professional Summary
        </label>
        <textarea
          name="summary"
          value={data.summary || ''}
          onChange={handleChange}
          rows="4"
          className="input"
          placeholder="Write a brief summary of your professional background and key achievements..."
        />
      </div>
    </div>
  )
}

PersonalSection.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func.isRequired
} 