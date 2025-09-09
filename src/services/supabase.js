import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase configuration missing. Using mock data.')
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database service functions
export const supabaseService = {
  // User operations
  async getUser(userId) {
    if (!supabase) return null
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('userId', userId)
      .single()
    
    if (error) throw error
    return data
  },

  async updateUser(userId, updates) {
    if (!supabase) return null
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('userId', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Project operations
  async getProjects(userId) {
    if (!supabase) return []
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async createProject(project) {
    if (!supabase) return { id: Date.now().toString(), ...project }
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateProject(projectId, updates) {
    if (!supabase) return null
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('projectId', projectId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteProject(projectId) {
    if (!supabase) return true
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('projectId', projectId)
    
    if (error) throw error
    return true
  },

  // Sample operations
  async getSamples(projectId) {
    if (!supabase) return []
    const { data, error } = await supabase
      .from('samples')
      .select(`
        *,
        rightsHolders (*)
      `)
      .eq('projectId', projectId)
      .order('createdAt', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async createSample(sample) {
    if (!supabase) return { id: Date.now().toString(), ...sample }
    const { data, error } = await supabase
      .from('samples')
      .insert([sample])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateSample(sampleId, updates) {
    if (!supabase) return null
    const { data, error } = await supabase
      .from('samples')
      .update(updates)
      .eq('sampleId', sampleId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteSample(sampleId) {
    if (!supabase) return true
    const { error } = await supabase
      .from('samples')
      .delete()
      .eq('sampleId', sampleId)
    
    if (error) throw error
    return true
  },

  // Rights holder operations
  async getRightsHolders() {
    if (!supabase) return []
    const { data, error } = await supabase
      .from('rightsHolders')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data || []
  },

  async createRightsHolder(rightsHolder) {
    if (!supabase) return { id: Date.now().toString(), ...rightsHolder }
    const { data, error } = await supabase
      .from('rightsHolders')
      .insert([rightsHolder])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateRightsHolder(rightsHolderId, updates) {
    if (!supabase) return null
    const { data, error } = await supabase
      .from('rightsHolders')
      .update(updates)
      .eq('rightsHolderId', rightsHolderId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Clearance request operations
  async getClearanceRequests(userId) {
    if (!supabase) return []
    const { data, error } = await supabase
      .from('clearanceRequests')
      .select(`
        *,
        samples (
          *,
          projects (*)
        )
      `)
      .eq('samples.projects.userId', userId)
      .order('createdAt', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async createClearanceRequest(request) {
    if (!supabase) return { id: Date.now().toString(), ...request }
    const { data, error } = await supabase
      .from('clearanceRequests')
      .insert([request])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateClearanceRequest(requestId, updates) {
    if (!supabase) return null
    const { data, error } = await supabase
      .from('clearanceRequests')
      .update(updates)
      .eq('clearanceRequestId', requestId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // File upload operations
  async uploadAudioFile(file, path) {
    if (!supabase) return { publicUrl: URL.createObjectURL(file) }
    
    const { data, error } = await supabase.storage
      .from('audio-samples')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('audio-samples')
      .getPublicUrl(path)
    
    return { publicUrl, path: data.path }
  },

  async deleteAudioFile(path) {
    if (!supabase) return true
    
    const { error } = await supabase.storage
      .from('audio-samples')
      .remove([path])
    
    if (error) throw error
    return true
  }
}
