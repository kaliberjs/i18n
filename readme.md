# i18n

Internationalize your React application.

## Motivation
i18n a.k.a. internationalization. More often than not you want to make your application available in multiple languages. @kaliber/i18n helps translating the static strings in your application.

## Polyfill
This module uses a Symbol to check wether a `I18nContextProvider` is available. At the time of writing, `Symbol` is [supported by most modern browsers](https://caniuse.com/#feat=mdn-javascript_builtins_symbol), but if you need to support IE11 you will have to polyfill it (Symbol is included in polyfill.io's `es2015` polyfill). 

## Installation

```
yarn add @kaliber/i18n
```

## Usage

[Skip to reference](#reference)

```jsx
import { I18nContextProvider, useI18n } from '@kaliber/i18n'
import { i18n } from './config/i18n.js'

function App() {
  return (
    <I18nContextProvider value={i18n} language='en'>
      <Page />
    </I18nContextProvider>
  )
}

function Page() {
  const i18n = useI18n()

  return (
    <div>
      <header>
        {i18n.navigation.map(({ label, link }, i) => (
          <a key={i} href={link}>{label}</a>
        ))}
      </header>
      <main>
        <I18nContextProvider section='home'>
          <Home />
        </I18nContextProvider>
      </main>
      <footer>
        {i18n.footer.copyright(2020)}
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
```

Example i18n object:
```js
const i18n = {
  navigation: [
    {
      label: 'Home',
      link: '#'
    },
    {
      label: {
        nl: 'Neem contact op',
        en: 'Contact us'
      },
      link: '#contact'
    }
  ],
  home: {
    title: {
      nl: 'Welkom!',
      en: 'Welcome!'
    },
    intro: {
      title: {
        nl: 'Een klein beetje typesetting tekst',
        en: 'A bit of typesetting text'
      },
      body: <p>Lorem ipsum dolor sit amet <strong>consectetur adipisicing elit</strong>.</p>,
    },
  },
  footer: {
    copyright: year => `Copyright ${year}`
  }
}
```

![](https://media.giphy.com/media/OBP5KeYczcxxK/giphy.gif)

## Reference

### `Provider`

```jsx
<Provider value={i18n} language='en' section='home'>
  {children}
</Provider>
```

| Props          |                                                                               |
|----------------|-------------------------------------------------------------------------------|
| `value`        | _Optional for nested providers._ <br />The i18n object to use. When omitted in a nested provider the parent provider's value is used. |
| `language`     | _Optional._ <br />When a language is given, normalization will be attempted at the leave nodes. E.g.: given the language `en` this means a leafnode with the shape `{ en: 'countries', nl: 'landen' }` will be normalized to just `'countries'`. |
| `section`      | _Optional._ <br />When given, the value of this provider will correspond to the subsection of the i18n object indicated by `section`. `section` should be a string corresponding to an object key. Dots may be used: `'home.introduction'` is a valid value. |
| `children`     | `children` are rendered unaffected. |

The provided i18n object may be a deeply nested object, optionally containing arrays. Values don't have to be strings, you can also provide numbers, functions or React elements (see the example i18n object under [Usage](#usage))

### `useI18n`

Returns (a subsection of) the i18n object from the nearest provider.

```js
const i18n = useI18n(section) 
```

| Input          |                                                                               |
|----------------|-------------------------------------------------------------------------------|
| `section`      | _Optional._ <br />When given, a subsection of the i18n object indicated by `section` will be returned. `section` should be a string corresponding to an object key. Dots may be used: `'home.introduction'` is a valid value. |

## Disclaimer
This library is intended for internal use, we provide __no__ support, use at your own risk. It does not import React, but expects it to be provided, which [@kaliber/build](https://kaliberjs.github.io/build/) can handle for you.

This library is not transpiled.