import { I18nContextProvider, useI18n }  from '@kaliber/i18n'

const translations = {
  en: {
    'dutch': 'Dutch',
    'english': 'English',
    'switch-to': 'Switch to',
    'hello-world': 'Hello world!'
  },
  nl: {
    'dutch': 'Nederlands',
    'english': 'Engels',
    'switch-to': 'Wissel naar',
    'hello-world': 'Dag wereld!'
  }
}

export default function App() {
  const [language, setLanguage] = React.useState('en')
  return (
    <I18nContextProvider value={translations[language]}>
      <Page onLanguageChange={setLanguage} {...{ language }} />
    </I18nContextProvider>
  )
}

function Page({ language, onLanguageChange }) {
  const i18n = useI18n()

  return (
    <main>
      <Component />
      <button onClick={() => onLanguageChange(language === 'en' ? 'nl' : 'en')}>
        {i18n('switch-to')} {i18n(language === 'en' ? 'dutch' : 'english')}
      </button>
    </main>
  )
}

function Component() {
  const i18n = useI18n()

  return (
    <h1>
      {i18n('hello-world')}
    </h1>
  )
}
