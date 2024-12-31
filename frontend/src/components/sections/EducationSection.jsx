import { Calendar, MapPin, GraduationCap, Plus, Trash2 } from 'lucide-react'
import PropTypes from 'prop-types'

export default function EducationSection({ data = { education: [] }, onChange }) {
  const handleAddEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          id: Date.now(),
          degree: '',
          field: '',
          school: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          gpa: '',
          achievements: [''],
          courses: ['']
        }
      ]
    })
  }

  const handleRemoveEducation = (id) => {
    onChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id)
    })
  }

  const handleChange = (id, field, value) => {
    onChange({
      ...data,
      education: data.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    })
  }

  const handleAddItem = (educationId, field) => {
    onChange({
      ...data,
      education: data.education.map(edu => {
        if (edu.id === educationId) {
          return {
            ...edu,
            [field]: [...edu[field], '']
          }
        }
        return edu
      })
    })
  }

  const handleChangeItem = (educationId, field, index, value) => {
    onChange({
      ...data,
      education: data.education.map(edu => {
        if (edu.id === educationId) {
          const newItems = [...edu[field]]
          newItems[index] = value
          return {
            ...edu,
            [field]: newItems
          }
        }
        return edu
      })
    })
  }

  const handleRemoveItem = (educationId, field, index) => {
    onChange({
      ...data,
      education: data.education.map(edu => {
        if (edu.id === educationId) {
          return {
            ...edu,
            [field]: edu[field].filter((_, i) => i !== index)
          }
        }
        return edu
      })
    })
  }

  return (
    <div className="space-y-6">
      {data.education.map((education, eduIndex) => (
        <div 
          key={education.id}
          className="p-4 border border-gray-200 rounded-lg space-y-4"
        >
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900">
              Education {eduIndex + 1}
            </h4>
            {data.education.length > 1 && (
              <button
                onClick={() => handleRemoveEducation(education.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={education.degree || ''}
                  onChange={(e) => handleChange(education.id, 'degree', e.target.value)}
                  className="input pl-10"
                  placeholder="Bachelor's, Master's, etc."
                />
                <GraduationCap className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                value={education.field || ''}
                onChange={(e) => handleChange(education.id, 'field', e.target.value)}
                className="input"
                placeholder="Computer Science, Business, etc."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School
              </label>
              <input
                type="text"
                value={education.school || ''}
                onChange={(e) => handleChange(education.id, 'school', e.target.value)}
                className="input"
                placeholder="University Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={education.location || ''}
                  onChange={(e) => handleChange(education.id, 'location', e.target.value)}
                  className="input pl-10"
                  placeholder="City, Country"
                />
                <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <div className="relative">
                <input
                  type="month"
                  value={education.startDate || ''}
                  onChange={(e) => handleChange(education.id, 'startDate', e.target.value)}
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
                  value={education.endDate || ''}
                  onChange={(e) => handleChange(education.id, 'endDate', e.target.value)}
                  className="input pl-10"
                  disabled={education.current}
                />
                <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <div className="mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={education.current || false}
                    onChange={(e) => handleChange(education.id, 'current', e.target.checked)}
                    className="rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <span className="ml-2 text-sm text-gray-600">Currently Studying</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GPA
              </label>
              <input
                type="text"
                value={education.gpa || ''}
                onChange={(e) => handleChange(education.id, 'gpa', e.target.value)}
                className="input"
                placeholder="3.8/4.0"
              />
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Achievements & Awards
              </label>
              <button
                type="button"
                onClick={() => handleAddItem(education.id, 'achievements')}
                className="text-sm text-accent hover:text-accent/80 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Achievement
              </button>
            </div>
            <div className="space-y-2">
              {education.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={achievement || ''}
                    onChange={(e) => handleChangeItem(education.id, 'achievements', index, e.target.value)}
                    className="input flex-grow"
                    placeholder="Dean's List, Academic Excellence Award, etc."
                  />
                  {education.achievements.length > 1 && (
                    <button
                      onClick={() => handleRemoveItem(education.id, 'achievements', index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Relevant Courses */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Relevant Courses
              </label>
              <button
                type="button"
                onClick={() => handleAddItem(education.id, 'courses')}
                className="text-sm text-accent hover:text-accent/80 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Course
              </button>
            </div>
            <div className="space-y-2">
              {education.courses.map((course, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={course || ''}
                    onChange={(e) => handleChangeItem(education.id, 'courses', index, e.target.value)}
                    className="input flex-grow"
                    placeholder="Course name"
                  />
                  {education.courses.length > 1 && (
                    <button
                      onClick={() => handleRemoveItem(education.id, 'courses', index)}
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
        onClick={handleAddEducation}
        className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-accent hover:text-accent flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Another Education
      </button>
    </div>
  )
}

EducationSection.propTypes = {
  data: PropTypes.shape({
    education: PropTypes.arrayOf(PropTypes.object)
  }),
  onChange: PropTypes.func.isRequired
} 