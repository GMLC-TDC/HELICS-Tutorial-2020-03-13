const base = process.env.BASE_HREF || '/HELICS-Tutorial-2020-03-13';
const isProd = true

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
      '/guide/',
      '/advanced/',
    ],
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Advanced', link: '/advanced/' }
    ]
  }
}
