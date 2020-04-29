const noContextProvider = Symbol('noContextProvider')
const I18nContext = React.createContext(noContextProvider)

export function useI18n() {
  const config = React.useContext(I18nContext)
  
  if (config === noContextProvider) {
    throw new Error('Please make sure I18nContextProvider is available')
  }

  return React.useCallback(
    key => {
      if (config && config[key]) {
        return config[key]
      } 
      
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Translation missing for', key)
      }

      return ''
    },
    [config]
  )
}

export function I18nContextProvider({ children, value }) {
  return <I18nContext.Provider {...{ value }}>{children}</I18nContext.Provider>
}