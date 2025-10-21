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
        file: 'routes/ks/modal.jsx',
        path: '/ks/modal'
      },
      {
        file: 'routes/ks/pagination.jsx',
        path: '/ks/pagination'
      },
      {
        file: 'routes/ks/progressbar.jsx',
        path: '/ks/progressbar'
      },
      {
        file: 'routes/ks/propertyfilter.jsx',
        path: '/ks/propertyfilter'
      },
      {
        file: 'routes/ks/seg-cont.jsx',
        path: '/ks/seg-cont'
      },
      {
        file: 'routes/ks/sidenav.jsx',
        path: '/ks/sidenav'
      },
      {
        file: 'routes/ks/space-between.jsx',
        path: '/ks/space-between'
      },
      {
        file: 'routes/ks/spinner.jsx',
        path: '/ks/spinner'
      },
      {
        file: 'routes/ks/split-panel/route.jsx',
        path: '/ks/split-panel'
      },
      {
        file: 'routes/ks/status-indicator.jsx',
        path: '/ks/status-indicator'
      },
      {
        file: 'routes/ks/table.jsx',
        path: '/ks/table'
      },
      {
        file: 'routes/ks/table-expan.jsx',
        path: '/ks/table-expan'
      }
    ]
  }
]

export {
  routes as default
}
