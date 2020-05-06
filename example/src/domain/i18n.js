export const i18n = {
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
    meta: {
      tags: [
        {
          nl: 'dummy tekst',
          en: 'dummy text'
        },
        {
          nl: 'pagina',
          en: 'page'
        }
      ]
    },
    content: {
      title: {
        nl: 'Een klein beetje typesetting tekst',
        en: 'A bit of typesetting text'
      },
      body: <p>Lorem ipsum dolor sit amet <strong>consectetur adipisicing elit</strong>. Facere esse unde aut officiis repudiandae vero placeat totam voluptas. Doloribus iste quae maiores officia praesentium magni, perspiciatis quibusdam necessitatibus sequi nemo.</p>,
    },
  },
  contact: {
    title: {
      nl: 'Contact met ons opnemen',
      en: 'Contact us'
    },
    meta: {
      tags: [
        {
          nl: 'dummy tekst',
          en: 'dummy text'
        },
        {
          nl: 'pagina',
          en: 'page'
        },
        {
          nl: 'contact informatie',
          en: 'contact information'
        }
      ]
    },
    content: {
      title: {
        nl: 'Extra i18n waardes om wat realistischer de call count van normalize() te kunnen testen',
        en: 'Extra i18n values to test the call count of normalize() more realistically'
      },
      body: <p>Lorem ipsum dolor sit amet <strong>consectetur adipisicing elit</strong>. Facere esse unde aut officiis repudiandae vero placeat totam voluptas. Doloribus iste quae maiores officia praesentium magni, perspiciatis quibusdam necessitatibus sequi nemo.</p>,
      cta: {
        label: {
          nl: 'Neem contact op',
          en: 'Contact us'
        },
        link: '#contact'
      }
    },
  },
  footer: {
    visitorCount: {
      nl: n => `${n} ${n === 1 ? 'bezoeker' : 'bezoekers'} tot nu toe.`,
      en: n => `${n} ${n === 1 ? 'visitor' : 'visitors'} so far.`
    },
    copyright: () => `Copyright ${(new Date()).getFullYear()}`
  },
  global: {
    contactUs: {
      nl: 'Neem contact op!',
      en: 'Contact us!'
    },
    requestQuote: {
      nl: 'Een offerte opvragen',
      en: 'Request a quote',
    },
    back: {
      nl: 'terug',
      en: 'back'
    },
    next: {
      nl: 'volgende',
      en: 'next'
    },
    previous: {
      nl: 'vorige',
      en: 'previous'
    },
    writtenBy: {
      nl: 'geschreven door',
      en: 'written by'
    },
    tags: 'tags'
  }
}
