export const TEMPLATES = {
  MODERN: {
    id: 'modern',
    name: 'Modern',
    layout: {
      personal: (data) => ({
        header: `
          <div class="relative mb-12 pb-8 border-b-2 border-blue-600/20">
            <div class="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-blue-600/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <h1 class="text-4xl font-bold text-gray-900 mb-3 tracking-tight">${data.fullName || ''}</h1>
            <p class="text-xl font-medium text-blue-600/90 mb-6">${data.title || ''}</p>
            
            <div class="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
              ${data.location ? `
                <div class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                  <MapPin class="w-4 h-4 text-blue-600/70" />
                  <span>${data.location}</span>
                </div>` : ''}
              ${data.email ? `
                <div class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                  <Mail class="w-4 h-4 text-blue-600/70" />
                  <span>${data.email}</span>
                </div>` : ''}
              ${data.phone ? `
                <div class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                  <Phone class="w-4 h-4 text-blue-600/70" />
                  <span>${data.phone}</span>
                </div>` : ''}
              ${data.website ? `
                <div class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                  <Globe class="w-4 h-4 text-blue-600/70" />
                  <span>${data.website}</span>
                </div>` : ''}
            </div>
            
            ${data.summary ? `
              <p class="text-gray-600 leading-relaxed max-w-3xl">
                ${data.summary}
              </p>` : ''}
          </div>
        `
      }),
      experience: (data) => ({
        section: `
          <div class="mb-10">
            <div class="flex items-center gap-4 mb-8">
              <h2 class="text-2xl font-bold text-gray-900">Work Experience</h2>
              <div class="flex-1 h-px bg-gradient-to-r from-blue-600/20 to-transparent"></div>
            </div>
            
            ${data.experiences?.map(exp => `
              <div class="relative pl-8 pb-12 last:pb-0">
                <div class="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/20 via-blue-600/10 to-transparent"></div>
                <div class="absolute left-0 top-2 w-2 h-2 rounded-full bg-blue-600 ring-4 ring-blue-600/10"></div>
                
                <div class="mb-4">
                  <div class="flex justify-between items-start gap-4">
                    <div>
                      <h3 class="text-xl font-semibold text-gray-900 mb-1">${exp.role}</h3>
                      <p class="text-blue-600/90 font-medium">${exp.company}</p>
                      <p class="text-sm text-gray-500">${exp.location}</p>
                    </div>
                    <div class="px-3 py-1 bg-blue-50 rounded-full text-sm font-medium text-blue-600">
                      ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  
                  ${exp.description ? `
                    <p class="mt-4 text-gray-600 leading-relaxed">
                      ${exp.description}
                    </p>` : ''}
                  
                  ${exp.achievements?.length > 0 && exp.achievements[0] !== '' ? `
                    <ul class="mt-4 space-y-2">
                      ${exp.achievements.map(achievement => `
                        <li class="flex items-start gap-2">
                          <div class="w-1.5 h-1.5 rounded-full bg-blue-600/40 mt-2"></div>
                          <span class="text-gray-600 leading-relaxed">${achievement}</span>
                        </li>
                      `).join('')}
                    </ul>
                  ` : ''}
                </div>
              </div>
            `).join('') || ''}
          </div>
        `
      }),
      contact: (data) => ({
        section: `
          <div class="mb-10">
            <div class="flex items-center gap-4 mb-8">
              <h2 class="text-2xl font-bold text-gray-900">Contact Information</h2>
              <div class="flex-1 h-px bg-gradient-to-r from-blue-600/20 to-transparent"></div>
            </div>
            
            <div class="space-y-6">
              <div class="flex flex-wrap gap-4">
                ${data.email ? `
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <Mail class="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">Email</p>
                      <p class="text-sm text-gray-600">${data.email}</p>
                    </div>
                  </div>
                ` : ''}
                ${data.phone ? `
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <Phone class="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">Phone</p>
                      <p class="text-sm text-gray-600">${data.phone}</p>
                    </div>
                  </div>
                ` : ''}
                ${data.location ? `
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <MapPin class="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">Location</p>
                      <p class="text-sm text-gray-600">${data.location}</p>
                    </div>
                  </div>
                ` : ''}
              </div>

              ${data.socialLinks?.length > 0 ? `
                <div class="grid grid-cols-2 gap-6">
                  ${data.socialLinks.map(link => `
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <Globe class="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-900">${link.platform}</p>
                        <a href="${link.url}" class="text-sm text-blue-600 hover:underline" target="_blank">${link.username || link.url}</a>
                      </div>
                    </div>
                  `).join('') || ''}
                </div>
              ` : ''}
            </div>
          </div>
        `
      }),
      custom: (data) => ({
        section: `
          <div class="mb-10">
            <div class="flex items-center gap-4 mb-8">
              <h2 class="text-2xl font-bold text-gray-900">${data.title || 'Additional Information'}</h2>
              <div class="flex-1 h-px bg-gradient-to-r from-blue-600/20 to-transparent"></div>
            </div>
            
            <div class="prose prose-blue max-w-none">
              ${data.content || ''}
            </div>
          </div>
        `
      })
    }
  },
  MINIMAL: {
    id: 'minimal',
    name: 'Minimal',
    layout: {
      personal: (data) => ({
        header: `
          <div class="mb-16 text-center relative">
            <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-gray-50 to-transparent -z-10"></div>
            
            <h1 class="text-[2.75rem] font-light text-gray-900 mb-3 tracking-wide">${data.fullName || ''}</h1>
            <p class="text-xl text-gray-500 mb-8 tracking-wide">${data.title || ''}</p>
            
            <div class="flex justify-center flex-wrap gap-x-12 gap-y-4 text-sm text-gray-600 max-w-2xl mx-auto">
              ${data.location ? `
                <div class="flex items-center gap-2 group">
                  <MapPin class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <span class="tracking-wide">${data.location}</span>
                </div>` : ''}
              ${data.email ? `
                <div class="flex items-center gap-2 group">
                  <Mail class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <span class="tracking-wide">${data.email}</span>
                </div>` : ''}
              ${data.phone ? `
                <div class="flex items-center gap-2 group">
                  <Phone class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <span class="tracking-wide">${data.phone}</span>
                </div>` : ''}
              ${data.website ? `
                <div class="flex items-center gap-2 group">
                  <Globe class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <span class="tracking-wide">${data.website}</span>
                </div>` : ''}
            </div>
            
            ${data.summary ? `
              <div class="mt-10 max-w-2xl mx-auto">
                <p class="text-gray-600 leading-relaxed tracking-wide">
                  ${data.summary}
                </p>
              </div>` : ''}
          </div>
        `
      }),
      experience: (data) => ({
        section: `
          <div class="mb-16">
            <h2 class="text-2xl font-light text-center text-gray-900 mb-12 tracking-wide">Work Experience</h2>
            
            ${data.experiences?.map(exp => `
              <div class="mb-12 last:mb-0 grid grid-cols-[1fr,2.5fr] gap-8 items-start">
                <div class="text-right">
                  <div class="sticky top-0">
                    <div class="inline-block px-3 py-1 bg-gray-50 rounded-md text-sm text-gray-600 tracking-wide mb-2">
                      ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
                    </div>
                    <p class="font-medium text-gray-900 mb-1">${exp.company}</p>
                    <p class="text-sm text-gray-500">${exp.location}</p>
                  </div>
                </div>
                
                <div>
                  <h3 class="text-xl font-medium text-gray-900 mb-4">${exp.role}</h3>
                  
                  ${exp.description ? `
                    <p class="text-gray-600 leading-relaxed tracking-wide mb-4">
                      ${exp.description}
                    </p>` : ''}
                  
                  ${exp.achievements?.length > 0 && exp.achievements[0] !== '' ? `
                    <ul class="space-y-3">
                      ${exp.achievements.map(achievement => `
                        <li class="flex items-start gap-3 group">
                          <span class="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 group-hover:bg-gray-400 transition-colors"></span>
                          <span class="text-gray-600 leading-relaxed tracking-wide">${achievement}</span>
                        </li>
                      `).join('')}
                    </ul>
                  ` : ''}
                </div>
              </div>
            `).join('') || ''}
          </div>
        `
      }),
      contact: (data) => ({
        section: `
          <div class="mb-16">
            <h2 class="text-2xl font-light text-center text-gray-900 mb-12 tracking-wide">Contact Information</h2>
            
            <div class="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
              ${data.socialLinks?.map(link => `
                <div class="group flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <Globe class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  <div>
                    <p class="font-medium text-gray-900 tracking-wide">${link.platform}</p>
                    <a href="${link.url}" class="text-sm text-gray-600 hover:text-gray-900 tracking-wide transition-colors" target="_blank">
                      ${link.username}
                    </a>
                  </div>
                </div>
              `).join('') || ''}
            </div>
          </div>
        `
      }),
      custom: (data) => ({
        section: `
          <div class="mb-16">
            <h2 class="text-2xl font-light text-center text-gray-900 mb-12 tracking-wide">${data.title || 'Additional Information'}</h2>
            
            <div class="prose prose-gray max-w-2xl mx-auto">
              ${data.content || ''}
            </div>
          </div>
        `
      })
    }
  },
  CREATIVE: {
    id: 'creative',
    name: 'Creative',
    layout: {
      personal: (data) => ({
        header: `
          <div class="relative mb-16">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl -z-10"></div>
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] rounded-2xl -z-10"></div>
            
            <div class="relative p-10 text-white">
              <div class="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3"></div>
              <div class="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-xl transform -translate-x-1/3 translate-y-1/3"></div>
              
              <div class="relative">
                <h1 class="text-5xl font-bold mb-3 tracking-tight">${data.fullName || ''}</h1>
                <p class="text-2xl text-white/90 mb-8">${data.title || ''}</p>
                
                <div class="grid grid-cols-2 gap-6 text-sm max-w-2xl mb-8">
                  ${data.location ? `
                    <div class="flex items-center gap-3 group">
                      <div class="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                        <MapPin class="w-5 h-5" />
                      </div>
                      <span class="text-white/80 group-hover:text-white transition-colors">${data.location}</span>
                    </div>` : ''}
                  ${data.email ? `
                    <div class="flex items-center gap-3 group">
                      <div class="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                        <Mail class="w-5 h-5" />
                      </div>
                      <span class="text-white/80 group-hover:text-white transition-colors">${data.email}</span>
                    </div>` : ''}
                  ${data.phone ? `
                    <div class="flex items-center gap-3 group">
                      <div class="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                        <Phone class="w-5 h-5" />
                      </div>
                      <span class="text-white/80 group-hover:text-white transition-colors">${data.phone}</span>
                    </div>` : ''}
                  ${data.website ? `
                    <div class="flex items-center gap-3 group">
                      <div class="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                        <Globe class="w-5 h-5" />
                      </div>
                      <span class="text-white/80 group-hover:text-white transition-colors">${data.website}</span>
                    </div>` : ''}
                </div>
                
                ${data.summary ? `
                  <p class="text-white/80 leading-relaxed max-w-3xl text-base">
                    ${data.summary}
                  </p>` : ''}
              </div>
            </div>
          </div>
        `
      }),
      experience: (data) => ({
        section: `
          <div class="mb-16">
            <div class="flex items-center gap-4 mb-10">
              <div class="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white">
                <Building2 class="w-6 h-6" />
              </div>
              <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Work Experience
              </h2>
            </div>
            
            <div class="space-y-12">
              ${data.experiences?.map(exp => `
                <div class="relative pl-12">
                  <div class="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600/30 via-purple-600/30 to-transparent"></div>
                  
                  <div class="relative">
                    <div class="absolute -left-12 top-0 p-1.5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full">
                      <div class="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-sm">
                      <div class="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                          <h3 class="text-xl font-bold text-gray-900 mb-1">${exp.role}</h3>
                          <p class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                            ${exp.company}
                          </p>
                          <p class="text-sm text-gray-500">${exp.location}</p>
                        </div>
                        
                        <div class="px-4 py-1.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full">
                          <span class="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                      </div>
                      
                      ${exp.description ? `
                        <p class="text-gray-600 leading-relaxed mb-4">
                          ${exp.description}
                        </p>` : ''}
                      
                      ${exp.achievements?.length > 0 && exp.achievements[0] !== '' ? `
                        <ul class="space-y-3">
                          ${exp.achievements.map(achievement => `
                            <li class="flex items-start gap-3">
                              <div class="p-1 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full">
                                <div class="w-1.5 h-1.5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full"></div>
                              </div>
                              <span class="text-gray-600 leading-relaxed">${achievement}</span>
                            </li>
                          `).join('')}
                        </ul>
                      ` : ''}
                    </div>
                  </div>
                </div>
              `).join('') || ''}
            </div>
          </div>
        `
      }),
      contact: (data) => ({
        section: `
          <div class="mb-16">
            <div class="flex items-center gap-4 mb-10">
              <div class="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white">
                <Globe class="w-6 h-6" />
              </div>
              <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Contact Information
              </h2>
            </div>
            
            <div class="grid grid-cols-2 gap-6">
              ${data.socialLinks?.map(link => `
                <div class="group relative">
                  <div class="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-500/5 rounded-xl -z-10"></div>
                  <div class="relative p-4 rounded-xl">
                    <div class="flex items-center gap-4">
                      <div class="p-2 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-lg group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-colors">
                        <Globe class="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900">${link.platform}</p>
                        <a href="${link.url}" class="text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity" target="_blank">
                          ${link.username}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('') || ''}
            </div>
          </div>
        `
      }),
      custom: (data) => ({
        section: `
          <div class="mb-16">
            <div class="flex items-center gap-4 mb-10">
              <div class="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white">
                <File class="w-6 h-6" />
              </div>
              <h2 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${data.title || 'Additional Information'}
              </h2>
            </div>
            
            <div class="prose prose-blue max-w-none">
              ${data.content || ''}
            </div>
          </div>
        `
      })
    }
  }
} 