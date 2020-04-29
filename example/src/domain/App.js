import { I18nContextProvider, useI18n, useI18nLanguage }  from '@kaliber/i18n'
import { i18n } from './i18n'

export default function App() {
  const [language, setLanguage] = React.useState('en')
  return (
    <I18nContextProvider value={i18n} {...{ language }}>
      <select value={language} onChange={e => setLanguage(e.currentTarget.value)}>
        <option value='en'>EN</option>
        <option value='nl'>NL</option>
      </select>
      <Page/>
    </I18nContextProvider>
  )
}

function Page() {
  const i18n = useI18n()
  const language = useI18nLanguage()
  const [visitorCount, setVisitorCount] = React.useState(' ')

  React.useEffect(() => setVisitorCount(Math.round(Math.random() * 3)), [])

  return (
    <div>
      <header>
        {i18n.navigation.map(({ label, link }, i) => (
          <a key={i} href={link}>{label}</a>
        ))}
      </header>
      <main>
        <I18nContextProvider value={i18n.home}>
          <Home />
        </I18nContextProvider>
      </main>
      <footer>
        {i18n.footer.copyright()} - {i18n.footer.visitorCount(visitorCount)} - {language.toUpperCase()}
      </footer>
    </div>
  )
}

function Home() {
  const i18n = useI18n()

  return (
    <article>
      <h1>{i18n.title}</h1>
      <Intro />
    </article>
  )
}

function Intro() {
  const i18n = useI18n('intro')

  return (
    <section>
      <h2>
        {i18n.title}
      </h2>
      <div>
        {i18n.body}
      </div>
    </section>
  )
}
