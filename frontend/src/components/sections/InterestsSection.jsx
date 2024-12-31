import { Plus, Trash2 } from 'lucide-react'
import PropTypes from 'prop-types'

export default function InterestsSection({ data = { interests: [] }, onChange }) {
  const handleAddInterest = () => {
    onChange({
      ...data,
      interests: [...data.interests, '']
    })
  }

  const handleRemoveInterest = (index) => {
    onChange({
      ...data,
      interests: data.interests.filter((_, i) => i !== index)
    })
  }

  const handleChangeInterest = (index, value) => {
    onChange({
      ...data,
      interests: data.interests.map((interest, i) =>
        i === index ? value : interest
      )
    })
  }

  return (
    <div className="space-y-4">
      {data.interests.map((interest, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={interest || ''}
            onChange={(e) => handleChangeInterest(index, e.target.value)}
            className="input flex-grow"
            placeholder="Enter an interest or hobby..."
          />
          {data.interests.length > 1 && (
            <button
              onClick={() => handleRemoveInterest(index)}
              className="p-2 text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddInterest}
        className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-accent hover:text-accent flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Another Interest
      </button>
    </div>
  )
}

InterestsSection.propTypes = {
  data: PropTypes.shape({
    interests: PropTypes.arrayOf(PropTypes.string)
  }),
  onChange: PropTypes.func.isRequired
} 