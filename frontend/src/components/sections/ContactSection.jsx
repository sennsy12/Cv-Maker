import { 
  Mail, Phone, MapPin, Globe, Linkedin, Github, 
  Twitter, Instagram, Facebook, Youtube, Plus, Trash2
} from 'lucide-react'
import PropTypes from 'prop-types'

const SOCIAL_PLATFORMS = [
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
  { id: 'github', name: 'GitHub', icon: Github, placeholder: 'https://github.com/username' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, placeholder: 'https://twitter.com/username' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/username' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/username' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/@channel' },
  { id: 'website', name: 'Website', icon: Globe, placeholder: 'https://yourwebsite.com' }
]

export default function ContactSection({ data = { socialLinks: [] }, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const handleAddSocialLink = () => {
    onChange({
      ...data,
      socialLinks: [...data.socialLinks, {
        id: Date.now(),
        platform: 'linkedin',
        url: ''
      }]
    })
  }

  const handleRemoveSocialLink = (id) => {
    onChange({
      ...data,
      socialLinks: data.socialLinks.filter(link => link.id !== id)
    })
  }

  const handleChangeSocialLink = (id, field, value) => {
    onChange({
      ...data,
      socialLinks: data.socialLinks.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    })
  }

  return (
    <div className="space-y-6">
      {/* Primary Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={data.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="input pl-10"
              placeholder="your@email.com"
            />
            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <div className="relative">
            <input
              type="tel"
              value={data.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="input pl-10"
              placeholder="+1 234 567 890"
            />
            <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              className="input pl-10"
              placeholder="City, Country"
            />
            <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Social Links & Profiles
          </label>
          <button
            type="button"
            onClick={handleAddSocialLink}
            className="text-sm text-accent hover:text-accent/80 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Link
          </button>
        </div>
        <div className="space-y-2">
          {data.socialLinks.map((link) => {
            const platform = SOCIAL_PLATFORMS.find(p => p.id === link.platform)
            const Icon = platform?.icon || Globe
            return (
              <div key={link.id} className="flex gap-2">
                <select
                  value={link.platform}
                  onChange={(e) => handleChangeSocialLink(link.id, 'platform', e.target.value)}
                  className="input w-40"
                >
                  {SOCIAL_PLATFORMS.map(platform => (
                    <option key={platform.id} value={platform.id}>
                      {platform.name}
                    </option>
                  ))}
                </select>
                <div className="relative flex-grow">
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleChangeSocialLink(link.id, 'url', e.target.value)}
                    className="input pl-10 w-full"
                    placeholder={platform?.placeholder || 'https://'}
                  />
                  <Icon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                {data.socialLinks.length > 1 && (
                  <button
                    onClick={() => handleRemoveSocialLink(link.id)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

ContactSection.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func.isRequired
} 