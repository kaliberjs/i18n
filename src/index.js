const i18nContext = React.createContext(null)

export function useI18n(...pathSegments) {
  const context = React.useContext(i18nContext)
  if (context === null) throwMissingContextError()
  
  const language = context.language
  const value = getProp(context.value, pathSegments.join('.'))

  return React.useCallback(
    (...pathSegments) => normalize(
      language, 
      getProp(value, pathSegments.join('.'))
    ), 
    [value, language]
  )
}

export function useI18nLanguage() {
  const context = React.useContext(i18nContext)
  if (context === null) throwMissingContextError()
  return context.language
}

export function I18nContextProvider({ value, language, children }) {
  const providerValue = React.useMemo(() => ({ value, language }), [value, language])

  return (
    <i18nContext.Provider value={providerValue}>
      {children}
    </i18nContext.Provider>
  )
}

function throwMissingContextError() {
  throw new Error('Please provide an i18n context')
}

function normalize(language, value) {
  return Array.isArray(value)
    ? value.map(x => normalize(language, x))
    : typeof value === "function"
    ? value
    : typeof value === "object" && value !== null
    ? normalizeObject(language, value)
    : value;
}

function normalizeObject(language, o) {
  const result = o[language]

  return (
    result !== undefined ? result :
    isReactElement(o) ? o :
    mapValues(o, x => normalize(language, x))
  )
}

function mapValues(o, f) {
  return (
    Object.entries(o).reduce(
      (result, [k, v]) => ({ ...result, [k]: f(v) }),
      {}
    )
  )
}

function isReactElement(o) {
  const reactId = o['$$typeof']
  return reactId === Symbol.for('react.element') || reactId === 0xeac7
}

function getProp(o, path) {
  if (!path) return o
  return path.split('.').reduce((result, key) => result && result[key], o)
}
