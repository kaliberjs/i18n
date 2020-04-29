const i18nContext = React.createContext(null)

export function useI18n(section) {
  const { i18n } = React.useContext(i18nContext)
  if (!i18n) throw new Error('Please provide an i18n context')
  return i18n(section)
}

export function Provider({ value: providedValue, language: providedLanguage, section = undefined, children }) {
  const parentProviderValue = React.useContext(i18nContext)
  
  const value = getProp(providedValue || parentProviderValue.value, section)
  const language = providedLanguage || parentProviderValue.language
  const i18n = React.useMemo(
    () => {
      i18n.language = language

      return i18n

      function i18n(section) {
        return normalize(language, getProp(value, section))
      }
    },
    [value, section, language]
  )

  const providerValue = React.useMemo(
    () => ({ value, language, i18n }),
    [value, language, i18n]
  )

  return (
    <i18nContext.Provider value={providerValue}>
      {children}
    </i18nContext.Provider>
  )
}

function normalize(language, value) {
  return (
    Array.isArray(value) ? value.map(x => normalize(language, x)):
    typeof value === 'function' ? value :
    typeof value === 'object' && value !== null ? normalizeObject(language, value) :
    value
  )
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