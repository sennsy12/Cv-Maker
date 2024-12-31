import { Plus, Trash2 } from 'lucide-react'
import PropTypes from 'prop-types'

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

export default function SkillsSection({ data = { skills: {} }, onChange }) {
  const handleAddCategory = () => {
    const categoryName = 'New Category'
    onChange({
      ...data,
      skills: {
        ...data.skills,
        [categoryName]: []
      }
    })
  }

  const handleRemoveCategory = (category) => {
    const newSkills = { ...data.skills }
    delete newSkills[category]
    onChange({
      ...data,
      skills: newSkills
    })
  }

  const handleRenameCategory = (oldName, newName) => {
    if (oldName === newName) return
    const newSkills = { ...data.skills }
    newSkills[newName] = newSkills[oldName]
    delete newSkills[oldName]
    onChange({
      ...data,
      skills: newSkills
    })
  }

  const handleAddSkill = (category) => {
    onChange({
      ...data,
      skills: {
        ...data.skills,
        [category]: [
          ...data.skills[category],
          { name: '', level: '' }
        ]
      }
    })
  }

  const handleRemoveSkill = (category, index) => {
    onChange({
      ...data,
      skills: {
        ...data.skills,
        [category]: data.skills[category].filter((_, i) => i !== index)
      }
    })
  }

  const handleChangeSkill = (category, index, field, value) => {
    onChange({
      ...data,
      skills: {
        ...data.skills,
        [category]: data.skills[category].map((skill, i) =>
          i === index ? { ...skill, [field]: value } : skill
        )
      }
    })
  }

  return (
    <div className="space-y-6">
      {Object.entries(data.skills).map(([category, skills]) => (
        <div key={category} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={category}
              onChange={(e) => handleRenameCategory(category, e.target.value)}
              className="font-medium text-gray-900 bg-transparent border-none p-0 focus:ring-0"
              placeholder="Category Name"
            />
            {Object.keys(data.skills).length > 1 && (
              <button
                onClick={() => handleRemoveCategory(category)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="space-y-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={skill.name || ''}
                  onChange={(e) => handleChangeSkill(category, index, 'name', e.target.value)}
                  className="input flex-grow"
                  placeholder="Skill name"
                />
                <select
                  value={skill.level || ''}
                  onChange={(e) => handleChangeSkill(category, index, 'level', e.target.value)}
                  className="input w-40"
                >
                  <option value="">No Level</option>
                  {SKILL_LEVELS.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {skills.length > 1 && (
                  <button
                    onClick={() => handleRemoveSkill(category, index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleAddSkill(category)}
            className="text-sm text-accent hover:text-accent/80 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddCategory}
        className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-accent hover:text-accent flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Skill Category
      </button>
    </div>
  )
}

SkillsSection.propTypes = {
  data: PropTypes.shape({
    skills: PropTypes.object
  }),
  onChange: PropTypes.func.isRequired
} 