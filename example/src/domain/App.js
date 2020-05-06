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
        {i18n('navigation').map(({ label, link }, i) => (
          <a key={i} href={link}>{label}</a>
        ))}
      </header>
      <main>
        <PageMain i18nPath='home' />
      </main>
      <footer>
        {i18n('footer').copyright()} - {i18n('footer').visitorCount(visitorCount)} - {language.toUpperCase()}
      </footer>
    </div>
  )
}

function PageMain({ i18nPath }) {
  const i18n = useI18n()

  return (
    <article>
      <header>
        {/* Prefix the path with the i18nPath */}
        <h1>{i18n(i18nPath, 'title')}</h1>
        <em>{i18n('global.writtenBy')}: Kaliber</em>

        {/* Pass down the internationalized items as props */}
        <Tags tags={i18n(i18nPath, 'meta.tags')} />
      </header>

      {/* Or pass down the i18nPath and handle translations lower in the tree */}
      <PageContent {...{ i18nPath }} />
    </article>
  )
}

function PageContent({ i18nPath }) {
  /*
   * Please note that this causes a tight coupling between <PageMain /> and
   * it's parent component. */
  const i18n = useI18n(i18nPath)

  return (
    <section>
      <h2>{i18n('content.title')}</h2>
      <div>{i18n('content.body')}</div>
    </section>
  )
}

function Tags({ tags }) {
  const i18n = useI18n('global')

  return (
    <div>
      {i18n('tags')}:&nbsp;
      {tags.map((tag, i) => (
        <span key={i}>
          <em>{tag}</em>{(i !== tags.length - 1) && ', '}
        </span>
      ))}
    </div>
  )
}
