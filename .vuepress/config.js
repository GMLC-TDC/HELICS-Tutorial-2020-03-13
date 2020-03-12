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
    sidebar: 'auto',
    sidebar: [
        { title: "HELICS Tutorial",
            path: '/',
        },
        {
            title: 'Beginner',
            path: '/beginner/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/beginner/',
              '/beginner/installation/',
              '/beginner/cosimulation-example',
            ]
        },
        {
            title: 'Advanced',
            path: '/advanced/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/advanced/',
            ]
        },
    ],
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Advanced', link: '/advanced/' }
    ]
  }
}
