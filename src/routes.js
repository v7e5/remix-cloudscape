const routes = [
  {
    file: 'routes/index.jsx',
    index: true
  },
  {
    file: 'routes/ks/route.jsx',
    path: '/ks',
    children: [
      {
        file: 'routes/ks/index.jsx',
        index: true
      },
      {
        file: 'routes/ks/alert.jsx',
        path: '/ks/alert'
      },
      {
        file: 'routes/ks/badge.jsx',
        path: '/ks/badge'
      },
      {
        file: 'routes/ks/box.jsx',
        path: '/ks/box'
      },
      {
        file: 'routes/ks/breadcrumb.jsx',
        path: '/ks/breadcrumb'
      },
      {
        file: 'routes/ks/cards.jsx',
        path: '/ks/cards'
      },
      {
        file: 'routes/ks/column-layout.jsx',
        path: '/ks/column-layout'
      },
      {
        file: 'routes/ks/container.jsx',
        path: '/ks/container'
      },
      {
        file: 'routes/ks/content-layout.jsx',
        path: '/ks/content-layout'
      },
      {
        file: 'routes/ks/drawer.jsx',
        path: '/ks/drawer'
      },
      {
        file: 'routes/ks/expandable-section.jsx',
        path: '/ks/expandable-section'
      },
      {
        file: 'routes/ks/flashbar.jsx',
        path: '/ks/flashbar'
      },
      {
        file: 'routes/ks/grid.jsx',
        path: '/ks/grid'
      },
      {
        file: 'routes/ks/header.jsx',
        path: '/ks/header'
      },
      {
        file: 'routes/ks/icon.jsx',
        path: '/ks/icon'
      },
      {
        file: 'routes/ks/link.jsx',
        path: '/ks/link'
      },
      {
        file: 'routes/ks/loading-bar.jsx',
        path: '/ks/loading-bar'
      },
      {
        file: 'routes/ks/sidenav.jsx',
        path: '/ks/sidenav'
      }
    ]
  }
]

export {
  routes as default
}
