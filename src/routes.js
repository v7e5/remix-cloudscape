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
        file: 'routes/ks/sidenav.jsx',
        path: '/ks/sidenav'
      },
    ]
  }
]

export {
  routes as default
}
