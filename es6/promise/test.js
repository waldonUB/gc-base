const routes = [
  {
    path: '/first',
    name: 'second',
    component: First,
    children: [
      {
        path: 'second',
        name: 'second',
        component: Second,
        children: [
          {
            path: 'third',
            name: 'third',
            component: Third,
          },
        ],
      },
    ],
  },
]
