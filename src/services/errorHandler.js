/**
 * Centralized error handling service for SampleSecure
 * Provides consistent error handling, logging, and user feedback
 */

// Error types for categorization
export const ERROR_TYPES = {
  NETWORK: 'NETWORK',
  AUTHENTICATION: 'AUTHENTICATION',
  AUTHORIZATION: 'AUTHORIZATION',
  VALIDATION: 'VALIDATION',
  PAYMENT: 'PAYMENT',
  UPLOAD: 'UPLOAD',
  API: 'API',
  UNKNOWN: 'UNKNOWN'
}

// Error severity levels
export const ERROR_SEVERITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
}

class ErrorHandler {
  constructor() {
    this.errorLog = []
    this.maxLogSize = 100
    this.enableConsoleLogging = import.meta.env.DEV
  }

  /**
   * Handle and process errors
   * @param {Error|string} error - Error object or message
   * @param {Object} context - Additional context information
   * @returns {Object} Processed error information
   */
  handle(error, context = {}) {
    const processedError = this.processError(error, context)
    this.logError(processedError)
    
    // In production, you might want to send errors to a service like Sentry
    if (processedError.severity === ERROR_SEVERITY.CRITICAL) {
      this.reportCriticalError(processedError)
    }

    return processedError
  }

  /**
   * Process raw error into structured format
   * @param {Error|string} error - Raw error
   * @param {Object} context - Additional context
   * @returns {Object} Processed error
   */
  processError(error, context = {}) {
    const timestamp = new Date().toISOString()
    const id = this.generateErrorId()

    let message, type, severity, stack, code

    if (error instanceof Error) {
      message = error.message
      stack = error.stack
      code = error.code
      
      // Determine error type based on error properties
      type = this.determineErrorType(error)
      severity = this.determineSeverity(error, type)
    } else if (typeof error === 'string') {
      message = error
      type = ERROR_TYPES.UNKNOWN
      severity = ERROR_SEVERITY.MEDIUM
    } else {
      message = 'An unknown error occurred'
      type = ERROR_TYPES.UNKNOWN
      severity = ERROR_SEVERITY.MEDIUM
    }

    return {
      id,
      message,
      type,
      severity,
      timestamp,
      stack,
      code,
      context,
      userMessage: this.generateUserMessage(type, message)
    }
  }

  /**
   * Determine error type from error object
   * @param {Error} error - Error object
   * @returns {string} Error type
   */
  determineErrorType(error) {
    const message = error.message.toLowerCase()
    const code = error.code

    // Network errors
    if (message.includes('network') || message.includes('fetch') || code === 'NETWORK_ERROR') {
      return ERROR_TYPES.NETWORK
    }

    // Authentication errors
    if (message.includes('unauthorized') || message.includes('authentication') || code === 401) {
      return ERROR_TYPES.AUTHENTICATION
    }

    // Authorization errors
    if (message.includes('forbidden') || message.includes('permission') || code === 403) {
      return ERROR_TYPES.AUTHORIZATION
    }

    // Validation errors
    if (message.includes('validation') || message.includes('invalid') || code === 400) {
      return ERROR_TYPES.VALIDATION
    }

    // Payment errors
    if (message.includes('payment') || message.includes('stripe') || message.includes('billing')) {
      return ERROR_TYPES.PAYMENT
    }

    // Upload errors
    if (message.includes('upload') || message.includes('file') || message.includes('storage')) {
      return ERROR_TYPES.UPLOAD
    }

    // API errors
    if (message.includes('api') || message.includes('openai') || message.includes('supabase')) {
      return ERROR_TYPES.API
    }

    return ERROR_TYPES.UNKNOWN
  }

  /**
   * Determine error severity
   * @param {Error} error - Error object
   * @param {string} type - Error type
   * @returns {string} Severity level
   */
  determineSeverity(error, type) {
    const message = error.message.toLowerCase()

    // Critical errors
    if (type === ERROR_TYPES.AUTHENTICATION || 
        message.includes('critical') || 
        message.includes('fatal')) {
      return ERROR_SEVERITY.CRITICAL
    }

    // High severity errors
    if (type === ERROR_TYPES.PAYMENT || 
        type === ERROR_TYPES.AUTHORIZATION ||
        message.includes('failed to save') ||
        message.includes('data loss')) {
      return ERROR_SEVERITY.HIGH
    }

    // Medium severity errors
    if (type === ERROR_TYPES.API || 
        type === ERROR_TYPES.UPLOAD ||
        type === ERROR_TYPES.NETWORK) {
      return ERROR_SEVERITY.MEDIUM
    }

    // Low severity errors
    return ERROR_SEVERITY.LOW
  }

  /**
   * Generate user-friendly error message
   * @param {string} type - Error type
   * @param {string} originalMessage - Original error message
   * @returns {string} User-friendly message
   */
  generateUserMessage(type, originalMessage) {
    const userMessages = {
      [ERROR_TYPES.NETWORK]: 'Unable to connect to our servers. Please check your internet connection and try again.',
      [ERROR_TYPES.AUTHENTICATION]: 'Your session has expired. Please sign in again.',
      [ERROR_TYPES.AUTHORIZATION]: 'You don\'t have permission to perform this action. Please upgrade your subscription or contact support.',
      [ERROR_TYPES.VALIDATION]: 'Please check your input and try again.',
      [ERROR_TYPES.PAYMENT]: 'There was an issue processing your payment. Please check your payment method and try again.',
      [ERROR_TYPES.UPLOAD]: 'Failed to upload file. Please ensure your file is in a supported format and try again.',
      [ERROR_TYPES.API]: 'Our service is temporarily unavailable. Please try again in a few moments.',
      [ERROR_TYPES.UNKNOWN]: 'Something went wrong. Please try again or contact support if the problem persists.'
    }

    return userMessages[type] || userMessages[ERROR_TYPES.UNKNOWN]
  }

  /**
   * Log error to internal log
   * @param {Object} processedError - Processed error object
   */
  logError(processedError) {
    // Add to internal log
    this.errorLog.unshift(processedError)
    
    // Maintain log size
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(0, this.maxLogSize)
    }

    // Console logging in development
    if (this.enableConsoleLogging) {
      console.group(`🚨 Error [${processedError.type}] - ${processedError.severity}`)
      console.error('Message:', processedError.message)
      console.error('User Message:', processedError.userMessage)
      console.error('Context:', processedError.context)
      if (processedError.stack) {
        console.error('Stack:', processedError.stack)
      }
      console.groupEnd()
    }
  }

  /**
   * Report critical errors to external service
   * @param {Object} error - Error object
   */
  reportCriticalError(error) {
    // In production, integrate with error reporting service like Sentry
    console.error('CRITICAL ERROR REPORTED:', error)
    
    // Example Sentry integration:
    // if (window.Sentry) {
    //   window.Sentry.captureException(new Error(error.message), {
    //     tags: {
    //       type: error.type,
    //       severity: error.severity
    //     },
    //     extra: error.context
    //   })
    // }
  }

  /**
   * Generate unique error ID
   * @returns {string} Unique error ID
   */
  generateErrorId() {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Get recent errors
   * @param {number} limit - Number of errors to return
   * @returns {Array} Recent errors
   */
  getRecentErrors(limit = 10) {
    return this.errorLog.slice(0, limit)
  }

  /**
   * Clear error log
   */
  clearLog() {
    this.errorLog = []
  }

  /**
   * Get error statistics
   * @returns {Object} Error statistics
   */
  getStats() {
    const stats = {
      total: this.errorLog.length,
      byType: {},
      bySeverity: {},
      recent: this.errorLog.slice(0, 5)
    }

    this.errorLog.forEach(error => {
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1
    })

    return stats
  }
}

// Create singleton instance
const errorHandler = new ErrorHandler()

// Convenience functions
export const handleError = (error, context) => errorHandler.handle(error, context)
export const getErrorStats = () => errorHandler.getStats()
export const getRecentErrors = (limit) => errorHandler.getRecentErrors(limit)
export const clearErrorLog = () => errorHandler.clearLog()

// React hook for error handling
export const useErrorHandler = () => {
  const handleError = (error, context = {}) => {
    return errorHandler.handle(error, context)
  }

  const showError = (error, context = {}) => {
    const processedError = handleError(error, context)
    
    // You can integrate with a toast notification system here
    // For example, with react-hot-toast:
    // toast.error(processedError.userMessage)
    
    return processedError
  }

  return {
    handleError,
    showError,
    getStats: getErrorStats,
    getRecentErrors,
    clearLog: clearErrorLog
  }
}

export default errorHandler
