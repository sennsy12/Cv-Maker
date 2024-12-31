import { Calendar, MapPin, Building2, Plus, Trash2 } from 'lucide-react'
import PropTypes from 'prop-types'

export default function ExperienceSection({ data = { experiences: [] }, onChange }) {
  const handleAddExperience = () => {
    onChange({
      ...data,
      experiences: [
        ...data.experiences,
        {
          id: Date.now(),
          role: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          achievements: ['']
        }
      ]
    })
  }

  const handleRemoveExperience = (id) => {
    onChange({
      ...data,
      experiences: data.experiences.filter(exp => exp.id !== id)
    })
  }

  const handleChange = (id, field, value) => {
    onChange({
      ...data,
      experiences: data.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    })
  }

  const handleAddAchievement = (experienceId) => {
    onChange({
      ...data,
      experiences: data.experiences.map(exp => {
        if (exp.id === experienceId) {
          return {
            ...exp,
            achievements: [...exp.achievements, '']
          }
        }
        return exp
      })
    })
  }

  const handleChangeAchievement = (experienceId, index, value) => {
    onChange({
      ...data,
      experiences: data.experiences.map(exp => {
        if (exp.id === experienceId) {
          const newAchievements = [...exp.achievements]
          newAchievements[index] = value
          return {
            ...exp,
            achievements: newAchievements
          }
        }
        return exp
      })
    })
  }

  const handleRemoveAchievement = (experienceId, index) => {
    onChange({
      ...data,
      experiences: data.experiences.map(exp => {
        if (exp.id === experienceId) {
          return {
            ...exp,
            achievements: exp.achievements.filter((_, i) => i !== index)
          }
        }
        return exp
      })
    })
  }

  return (
    <div className="space-y-6">
      {data.experiences.map((experience, expIndex) => (
        <div
          key={experience.id}
          className="p-4 border border-gray-200 rounded-lg space-y-4"
        >
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900">
              Experience {expIndex + 1}
            </h4>
            {data.experiences.length > 1 && (
              <button
                onClick={() => handleRemoveExperience(experience.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                value={experience.role || ''}
                onChange={(e) => handleChange(experience.id, 'role', e.target.value)}
                className="input"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={experience.company || ''}
                  onChange={(e) => handleChange(experience.id, 'company', e.target.value)}
                  className="input pl-10"
                  placeholder="Company Name"
                />
                <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={experience.location || ''}
                  onChange={(e) => handleChange(experience.id, 'location', e.target.value)}
                  className="input pl-10"
                  placeholder="City, Country"
                />
                <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <div className="relative">
                <input
                  type="month"
                  value={experience.startDate || ''}
                  onChange={(e) => handleChange(experience.id, 'startDate', e.target.value)}
                  className="input pl-10"
                />
                <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <div className="relative">
                <input
                  type="month"
                  value={experience.endDate || ''}
                  onChange={(e) => handleChange(experience.id, 'endDate', e.target.value)}
                  className="input pl-10"
                  disabled={experience.current}
                />
                <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <div className="mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={experience.current || false}
                    onChange={(e) => handleChange(experience.id, 'current', e.target.checked)}
                    className="rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <span className="ml-2 text-sm text-gray-600">Current Position</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={experience.description || ''}
              onChange={(e) => handleChange(experience.id, 'description', e.target.value)}
              rows="3"
              className="input"
              placeholder="Briefly describe your role and responsibilities..."
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Key Achievements
              </label>
              <button
                type="button"
                onClick={() => handleAddAchievement(experience.id)}
                className="text-sm text-accent hover:text-accent/80 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Achievement
              </button>
            </div>
            <div className="space-y-2">
              {experience.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={achievement || ''}
                    onChange={(e) => handleChangeAchievement(experience.id, index, e.target.value)}
                    className="input flex-grow"
                    placeholder="Describe a key achievement..."
                  />
                  {experience.achievements.length > 1 && (
                    <button
                      onClick={() => handleRemoveAchievement(experience.id, index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddExperience}
        className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-accent hover:text-accent flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Another Experience
      </button>
    </div>
  )
}

ExperienceSection.propTypes = {
  data: PropTypes.shape({
    experiences: PropTypes.arrayOf(PropTypes.object)
  }),
  onChange: PropTypes.func.isRequired
} 