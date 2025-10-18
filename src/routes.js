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
      }
    ]
  }
]

export {
  routes as default
}
