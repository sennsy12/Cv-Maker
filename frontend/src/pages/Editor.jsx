import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { GripVertical, Trash2, X, MapPin, Mail, Phone, Globe, Menu } from 'lucide-react'
import PersonalSection from '../components/sections/PersonalSection'
import ExperienceSection from '../components/sections/ExperienceSection'
import EducationSection from '../components/sections/EducationSection'
import SkillsSection from '../components/sections/SkillsSection'
import InterestsSection from '../components/sections/InterestsSection'
import ContactSection from '../components/sections/ContactSection'
import CustomSection from '../components/sections/CustomSection'
import EditorToolbar from '../components/EditorToolbar'
import A4Preview from '../components/A4Preview'
import TemplateSelector from '../components/TemplateSelector'
import SectionSelector from '../components/SectionSelector'
import { TEMPLATES } from '../templates'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const SECTION_TYPES = {
  PERSONAL: 'personal',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  CERTIFICATIONS: 'certifications',
  INTERESTS: 'interests',
  CONTACT: 'contact',
  CUSTOM: 'custom'
}

export default function Editor() {
  const [sections, setSections] = useState([
    { id: 'personal', type: SECTION_TYPES.PERSONAL, title: 'Personal Information', data: {} }
  ])
  const [showLeftSidebar, setShowLeftSidebar] = useState(true)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [showSectionSelector, setShowSectionSelector] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState('modern')
  const [isPreview, setIsPreview] = useState(false)
  const [zoom, setZoom] = useState(0.8)
  const [isMobileView, setIsMobileView] = useState(false)

  // Add useEffect for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setShowLeftSidebar(false)
      } else {
        setShowLeftSidebar(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleDragEnd = (result) => {
    if (!result.destination) return
    
    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    
    setSections(items)
  }

  const handleRemoveSection = (id) => {
    setSections(sections.filter(section => section.id !== id))
  }

  const handleAddSection = (section) => {
    const newId = `${section.type}-${Date.now()}`
    let initialData = {}

    switch (section.type) {
      case SECTION_TYPES.PERSONAL:
        initialData = {}
        break
      case SECTION_TYPES.EXPERIENCE:
        initialData = {
          experiences: [{
            id: Date.now(),
            role: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
            achievements: ['']
          }]
        }
        break
      case SECTION_TYPES.EDUCATION:
        initialData = {
          education: [{
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
          }]
        }
        break
      case SECTION_TYPES.SKILLS:
        initialData = {
          skills: {
            'Technical Skills': [{
              name: '',
              level: ''
            }]
          }
        }
        break
      case SECTION_TYPES.INTERESTS:
        initialData = {
          interests: ['']
        }
        break
      case SECTION_TYPES.CONTACT:
        initialData = {
          email: '',
          phone: '',
          location: '',
          socialLinks: [{
            id: Date.now(),
            platform: 'linkedin',
            url: '',
            username: ''
          }]
        }
        break
      case SECTION_TYPES.CUSTOM:
        initialData = {
          title: '',
          content: ''
        }
        break
      default:
        initialData = {}
    }

    setSections([...sections, { ...section, id: newId, data: initialData }])
  }

  const handleUpdateSectionData = (sectionId, newData) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, data: newData }
        : section
    ))
  }

  const getSectionInputComponent = (type, sectionId, data) => {
    const props = {
      data,
      onChange: (newData) => handleUpdateSectionData(sectionId, newData)
    }

    switch (type) {
      case SECTION_TYPES.PERSONAL:
        return <PersonalSection {...props} />
      case SECTION_TYPES.EXPERIENCE:
        return <ExperienceSection {...props} />
      case SECTION_TYPES.EDUCATION:
        return <EducationSection {...props} />
      case SECTION_TYPES.SKILLS:
        return <SkillsSection {...props} />
      case SECTION_TYPES.INTERESTS:
        return <InterestsSection {...props} />
      case SECTION_TYPES.CONTACT:
        return <ContactSection {...props} />
      case SECTION_TYPES.CUSTOM:
        return <CustomSection {...props} />
      default:
        return <div>Section content coming soon...</div>
    }
  }

  const renderPreviewSection = (section) => {
    const { type, data } = section
    const template = TEMPLATES[currentTemplate.toUpperCase()]
    
    if (!template?.layout[type]) {
      // Fallback to default rendering if template doesn't support this section
      switch (type) {
        case SECTION_TYPES.PERSONAL:
          return (
            <div className="mb-6">
              {data.fullName && <h1 className="text-2xl font-bold mb-2">{data.fullName}</h1>}
              {data.title && <p className="text-gray-600 text-lg mb-2">{data.title}</p>}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                {data.location && <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {data.location}
                </div>}
                {data.email && <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {data.email}
                </div>}
                {data.phone && <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {data.phone}
                </div>}
                {data.website && <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  {data.website}
                </div>}
              </div>
              {data.summary && <p className="text-gray-700">{data.summary}</p>}
            </div>
          )
        case SECTION_TYPES.EXPERIENCE:
          return (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
              {data.experiences?.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{exp.role}</h3>
                      <p className="text-gray-600">{exp.company} • {exp.location}</p>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  {exp.description && <p className="mt-2 text-gray-700">{exp.description}</p>}
                  {exp.achievements?.length > 0 && exp.achievements[0] !== '' && (
                    <ul className="list-disc ml-4 mt-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-700">{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )
        case SECTION_TYPES.EDUCATION:
          return (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Education</h2>
              {data.education?.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-600">{edu.school} • {edu.location}</p>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </p>
                  </div>
                  {edu.gpa && <p className="text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                  {edu.achievements?.length > 0 && edu.achievements[0] !== '' && (
                    <div className="mt-2">
                      <p className="font-medium">Achievements & Awards:</p>
                      <ul className="list-disc ml-4">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-700">{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {edu.courses?.length > 0 && edu.courses[0] !== '' && (
                    <div className="mt-2">
                      <p className="font-medium">Relevant Courses:</p>
                      <p className="text-gray-700">{edu.courses.join(', ')}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        case SECTION_TYPES.SKILLS:
          return (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              {Object.entries(data.skills || {}).map(([category, skills]) => (
                <div key={category} className="mb-4">
                  <h3 className="font-medium mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {skill.name} {skill.level && `• ${skill.level}`}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        case SECTION_TYPES.INTERESTS:
          return (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {data.interests?.map((interest, index) => (
                  <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )
        case SECTION_TYPES.CONTACT:
          return (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                {/* Basic Contact Info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {data.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <span>{data.email}</span>
                    </div>
                  )}
                  {data.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-600" />
                      <span>{data.phone}</span>
                    </div>
                  )}
                  {data.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span>{data.location}</span>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                {data.socialLinks?.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {data.socialLinks.map((link, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-600" />
                        <div>
                          <p className="font-medium">{link.platform}</p>
                          <a href={link.url} className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            {link.username}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        case SECTION_TYPES.CUSTOM:
          return (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">{data.title || 'Additional Information'}</h2>
              <div className="prose prose-sm max-w-none">
                {data.content}
              </div>
            </div>
          )
        default:
          return null
      }
    }

    // Use template-specific rendering
    const templateSection = template.layout[type](data)
    return <div dangerouslySetInnerHTML={{ __html: templateSection.section || templateSection.header }} />
  }

  const handleDownload = async (format) => {
    const cvElement = document.querySelector('.cv-preview') // Add this class to your A4Preview component
    if (!cvElement) return

    try {
      if (format === 'png') {
        const canvas = await html2canvas(cvElement, {
          scale: 2, // Higher quality
          useCORS: true,
          logging: false
        })
        const dataUrl = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.download = 'my-cv.png'
        link.href = dataUrl
        link.click()
      } else {
        const canvas = await html2canvas(cvElement, {
          scale: 2,
          useCORS: true,
          logging: false
        })
        const imgData = canvas.toDataURL('image/jpeg', 1.0)
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        })
        pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height)
        pdf.save('my-cv.pdf')
      }
    } catch (error) {
      console.error('Error generating download:', error)
      // You might want to show an error message to the user here
    }
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Save CV')
  }

  return (
    <div className="h-screen flex flex-col">
      <EditorToolbar
        onDownload={handleDownload}
        onSave={handleSave}
        isPreview={isPreview}
        onPreview={() => setIsPreview(!isPreview)}
        zoom={zoom}
        onZoomChange={setZoom}
        onChangeTemplate={() => setShowTemplateSelector(true)}
        isMobileView={isMobileView}
        showLeftSidebar={showLeftSidebar}
        onToggleSidebar={() => setShowLeftSidebar(!showLeftSidebar)}
      />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-gray-50 relative">
        {/* Mobile Sidebar Toggle */}
        {isMobileView && !showLeftSidebar && (
          <button
            onClick={() => setShowLeftSidebar(true)}
            className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}

        {/* Left Sidebar with Input Forms */}
        <div className={`
          fixed inset-0 z-40 lg:static lg:z-auto
          ${showLeftSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-transform duration-300 ease-in-out
          w-full lg:w-96 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 
          flex flex-col overflow-hidden
        `}>
          {/* Mobile Close Button */}
          {isMobileView && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Edit CV</h2>
              <button
                onClick={() => setShowLeftSidebar(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="p-3 border-b border-gray-200">
            <button
              onClick={() => setShowSectionSelector(true)}
              className="w-full text-left px-3 py-1.5 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md"
            >
              + Add New Section
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <style>
              {`
                .sidebar-section {
                  font-size: 0.75rem;
                }
                .sidebar-section input,
                .sidebar-section textarea,
                .sidebar-section select {
                  font-size: 0.75rem;
                  line-height: 1.2;
                  padding: 0.15rem 0.25rem;
                  border-radius: 0.25rem;
                  min-height: 1.5rem;
                  width: 100%;
                  border: 1px solid #E5E7EB;
                  background-color: white;
                }
                .sidebar-section input[type="month"] {
                  padding-left: 1.75rem;
                  font-size: 0.7rem;
                }
                .sidebar-section textarea {
                  min-height: 2.25rem;
                  resize: vertical;
                }
                .sidebar-section label {
                  font-size: 0.7rem;
                  color: #6B7280;
                  margin-bottom: 0.125rem;
                  display: block;
                }
                .sidebar-section .form-group {
                  margin-bottom: 0.375rem;
                }
                .sidebar-section .grid {
                  gap: 0.375rem;
                  display: grid;
                }
                .sidebar-section .grid-cols-2 {
                  grid-template-columns: repeat(2, 1fr);
                }
                .sidebar-section .grid-cols-3 {
                  grid-template-columns: repeat(3, minmax(0, 1fr));
                }
                .sidebar-section button {
                  font-size: 0.7rem;
                  padding: 0.15rem 0.25rem;
                }
                .sidebar-section h3 {
                  font-size: 0.75rem;
                  font-weight: 500;
                }
                .sidebar-section p {
                  font-size: 0.7rem;
                  color: #6B7280;
                }
                .sidebar-section .section-header {
                  padding: 0.375rem 0.5rem;
                  background: #F9FAFB;
                  border-bottom: 1px solid #E5E7EB;
                  display: flex;
                  align-items: center;
                  gap: 0.375rem;
                }
                .sidebar-section .section-content {
                  padding: 0.5rem;
                  background: white;
                }
                .sidebar-section .input-icon-wrapper {
                  position: relative;
                  display: flex;
                  align-items: center;
                }
                .sidebar-section .input-icon {
                  position: absolute;
                  left: 0.25rem;
                  width: 0.875rem;
                  height: 0.875rem;
                  color: #9CA3AF;
                  pointer-events: none;
                }
                .sidebar-section input[type="checkbox"] {
                  width: auto;
                  min-height: auto;
                }
                .sidebar-section .checkbox-label {
                  display: flex;
                  align-items: center;
                  gap: 0.25rem;
                  font-size: 0.7rem;
                  color: #6B7280;
                }
              `}
            </style>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="cv-sections">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="divide-y divide-gray-200"
                  >
                    {sections.map((section, index) => (
                      <Draggable
                        key={section.id}
                        draggableId={section.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="sidebar-section"
                          >
                            <div className="section-header">
                              <div {...provided.dragHandleProps} className="cursor-move">
                                <GripVertical className="w-3 h-3 text-gray-400" />
                              </div>
                              <div className="flex-1 flex items-center justify-between">
                                <h3 className="text-gray-900">{section.title}</h3>
                                <button 
                                  onClick={() => handleRemoveSection(section.id)}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            <div className="section-content">
                              {getSectionInputComponent(section.type, section.id, section.data)}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {isMobileView && showLeftSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setShowLeftSidebar(false)}
          />
        )}

        {/* A4 Preview */}
        <div className={`
          flex-1 overflow-y-auto p-4 lg:p-8 justify-center
          ${showLeftSidebar && isMobileView ? 'hidden' : 'flex'}
        `}>
          <div className="w-full max-w-[794px] mx-auto">
            <A4Preview scale={zoom} className="bg-white cv-preview">
              <div className="p-8">
                {sections.map(section => (
                  <div key={section.id} className="cv-section">
                    {renderPreviewSection(section)}
                  </div>
                ))}
              </div>
            </A4Preview>
          </div>
        </div>
      </div>

      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Choose Template</h2>
              <button onClick={() => setShowTemplateSelector(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <TemplateSelector
              currentTemplate={currentTemplate}
              onSelect={(template) => {
                setCurrentTemplate(template)
                setShowTemplateSelector(false)
              }}
            />
          </div>
        </div>
      )}

      {/* Section Selector Modal */}
      {showSectionSelector && (
        <SectionSelector
          onSelect={handleAddSection}
          onClose={() => setShowSectionSelector(false)}
        />
      )}
    </div>
  )
} 