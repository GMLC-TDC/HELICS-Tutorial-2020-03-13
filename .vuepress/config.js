const base = process.env.BASE_HREF || '/HELICS-Tutorial-2020-03-13';
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  base,
  isProd,
  title: 'HELICS Tutorial',
  description: 'HELICS Tutorial',
  markdown: {
    lineNumbers: true,
    toc: {
        includeLevel: [2, 3],
    }
  },
  themeConfig: {
    smoothScroll: true,
    displayAllHeaders: true,
    sidebar: 'auto',
    sidebar: [
      '/',
      '/installation',
      '/introduction',
      '/advanced',
    ],
    nav: [
      { text: 'Agenda', link: '/' },
      { text: 'Installation', link: '/installation.md' },
      { text: 'Introduction', link: '/introduction.md' },
      { text: 'Advanced', link: '/advanced.md' }
    ]
  }
}
