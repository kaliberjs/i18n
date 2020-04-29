const i18nContext = React.createContext(null)

export function useI18n(section = undefined) {
  const context = React.useContext(i18nContext)
  if (context === null) throwMissingContextError()
  return context.i18n(section)
}

export function useI18nLanguage() {
  const context = React.useContext(i18nContext)
  if (context === null) throwMissingContextError()
  return context.language
}

export function I18nContextProvider({ value, language, children }) {
  const i18n = React.useCallback(
    section => normalize(language, getProp(value, section)),
    [value, language]
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

export function I18nSection({ section, children }) {
  const context = React.useContext(i18nContext)
  if (context === null) throwMissingContextError()

  const value = getProp(context.value, section)

  return (
    <I18nContextProvider language={context.language} {...{ value, children }} />
  )
}

function throwMissingContextError() {
  throw new Error('Please provide an i18n context')
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
