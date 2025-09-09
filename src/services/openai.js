import OpenAI from 'openai'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

if (!apiKey) {
  console.warn('OpenAI API key missing. Sample identification will use mock data.')
}

const openai = apiKey ? new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true // Note: In production, this should be handled server-side
}) : null

export const openaiService = {
  /**
   * Analyze audio file and identify potential samples
   * @param {File} audioFile - The audio file to analyze
   * @param {string} description - Optional description of the audio
   * @returns {Promise<Object>} Analysis results
   */
  async identifySample(audioFile, description = '') {
    if (!openai) {
      // Return mock data when OpenAI is not configured
      return {
        identifiedSongs: [
          {
            title: 'Amen, Brother',
            artist: 'The Winstons',
            album: 'Color Him Father',
            year: 1969,
            confidence: 0.95,
            rightsHolder: 'Universal Music Group',
            sampleType: 'drum break',
            startTime: '1:26',
            duration: '7 seconds',
            bpm: 136,
            key: 'G major'
          },
          {
            title: 'Funky Drummer',
            artist: 'James Brown',
            album: 'In the Jungle Groove',
            year: 1970,
            confidence: 0.87,
            rightsHolder: 'Sony Music Entertainment',
            sampleType: 'drum pattern',
            startTime: '5:20',
            duration: '4 seconds',
            bpm: 100,
            key: 'E minor'
          }
        ],
        audioAnalysis: {
          duration: audioFile.size / 44100, // Rough estimate
          format: audioFile.type,
          size: audioFile.size,
          bpm: 120,
          key: 'C major',
          tempo: 'moderate'
        }
      }
    }

    try {
      // Convert audio file to base64 for analysis
      const audioBase64 = await fileToBase64(audioFile)
      
      const prompt = `
        Analyze this audio sample and identify potential source songs that may have been sampled.
        
        Audio description: ${description}
        
        Please provide:
        1. Most likely source songs with confidence scores
        2. Rights holders information
        3. Sample characteristics (BPM, key, type)
        4. Timestamp information if identifiable
        
        Format the response as JSON with the following structure:
        {
          "identifiedSongs": [
            {
              "title": "Song Title",
              "artist": "Artist Name",
              "album": "Album Name",
              "year": 1970,
              "confidence": 0.95,
              "rightsHolder": "Rights Holder Name",
              "sampleType": "drum break/vocal/bass line/etc",
              "startTime": "1:26",
              "duration": "7 seconds",
              "bpm": 136,
              "key": "G major"
            }
          ],
          "audioAnalysis": {
            "duration": 30.5,
            "format": "audio/wav",
            "bpm": 120,
            "key": "C major",
            "tempo": "moderate"
          }
        }
      `

      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: `data:${audioFile.type};base64,${audioBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 1000
      })

      const result = JSON.parse(response.choices[0].message.content)
      return result

    } catch (error) {
      console.error('OpenAI sample identification error:', error)
      throw new Error('Failed to identify sample. Please try again.')
    }
  },

  /**
   * Generate clearance request text
   * @param {Object} sampleInfo - Information about the sample
   * @param {Object} userInfo - Information about the requesting user
   * @returns {Promise<string>} Generated clearance request text
   */
  async generateClearanceRequest(sampleInfo, userInfo) {
    if (!openai) {
      return `
Dear Rights Holder,

I am writing to request clearance for the use of a sample from "${sampleInfo.originalSong}" by ${sampleInfo.originalArtist} in my upcoming musical work.

Sample Details:
- Original Song: ${sampleInfo.originalSong}
- Original Artist: ${sampleInfo.originalArtist}
- Sample Type: ${sampleInfo.sampleType || 'Audio sample'}
- Duration: ${sampleInfo.duration || 'TBD'}
- Usage: Remix/derivative work

Project Information:
- Artist/Producer: ${userInfo.name || userInfo.email}
- Project Title: ${sampleInfo.projectName || 'TBD'}
- Intended Use: Commercial release
- Distribution: Digital platforms

I would be happy to discuss licensing terms and provide any additional information you may require. Please let me know your standard rates and requirements for sample clearance.

Thank you for your time and consideration.

Best regards,
${userInfo.name || userInfo.email}
${userInfo.email}
      `.trim()
    }

    try {
      const prompt = `
        Generate a professional sample clearance request letter with the following information:
        
        Sample Information:
        - Original Song: ${sampleInfo.originalSong}
        - Original Artist: ${sampleInfo.originalArtist}
        - Sample Type: ${sampleInfo.sampleType || 'Audio sample'}
        - Duration: ${sampleInfo.duration || 'TBD'}
        
        User Information:
        - Name: ${userInfo.name || userInfo.email}
        - Email: ${userInfo.email}
        - Project: ${sampleInfo.projectName || 'TBD'}
        
        The letter should be:
        - Professional and respectful
        - Include all necessary details
        - Request licensing terms
        - Offer to provide additional information
        - Be concise but comprehensive
      `

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a professional music industry assistant helping to draft sample clearance requests. Generate clear, professional correspondence."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })

      return response.choices[0].message.content.trim()

    } catch (error) {
      console.error('OpenAI clearance request generation error:', error)
      throw new Error('Failed to generate clearance request. Please try again.')
    }
  },

  /**
   * Analyze and suggest improvements for clearance request
   * @param {string} requestText - The clearance request text
   * @returns {Promise<Object>} Suggestions and improvements
   */
  async analyzeClearanceRequest(requestText) {
    if (!openai) {
      return {
        score: 85,
        suggestions: [
          'Consider adding more specific details about the intended use',
          'Include information about expected distribution numbers',
          'Mention your willingness to provide a demo or preview'
        ],
        improvements: [
          'The tone is professional and respectful',
          'All essential information is included',
          'The request is clear and concise'
        ]
      }
    }

    try {
      const prompt = `
        Analyze this sample clearance request and provide feedback:
        
        "${requestText}"
        
        Please provide:
        1. A score out of 100 for professionalism and completeness
        2. Specific suggestions for improvement
        3. What the request does well
        
        Format as JSON:
        {
          "score": 85,
          "suggestions": ["suggestion 1", "suggestion 2"],
          "improvements": ["strength 1", "strength 2"]
        }
      `

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a music industry expert analyzing sample clearance requests for effectiveness and professionalism."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.3
      })

      return JSON.parse(response.choices[0].message.content)

    } catch (error) {
      console.error('OpenAI clearance analysis error:', error)
      throw new Error('Failed to analyze clearance request. Please try again.')
    }
  }
}

/**
 * Convert file to base64 string
 * @param {File} file - File to convert
 * @returns {Promise<string>} Base64 string
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = error => reject(error)
  })
}
