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
    intro: {
      title: {
        nl: 'Een klein beetje typesetting tekst',
        en: 'A bit of typesetting text'
      },
      body: <p>Lorem ipsum dolor sit amet <strong>consectetur adipisicing elit</strong>. Facere esse unde aut officiis repudiandae vero placeat totam voluptas. Doloribus iste quae maiores officia praesentium magni, perspiciatis quibusdam necessitatibus sequi nemo.</p>,
    },
  },
  footer: {
    visitorCount: {
      nl: n => `${n} ${n === 1 ? 'bezoeker' : 'bezoekers'} tot nu toe.`,
      en: n => `${n} ${n === 1 ? 'visitor' : 'visitors'} so far.`
    },
    copyright: () => `Copyright ${(new Date()).getFullYear()}`
  }
}
