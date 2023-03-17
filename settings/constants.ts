export const APP_TITLE = 'Koło Naukowe Integra'

export const MENU_ITEMS = [
  {
    title: 'Aktualności',
    type: 'link',
    path: '/news'
  },
  {
    title: 'O nas',
    type: 'link',
    path: '/about'
  },
  {
    title: 'Projekty',
    type: 'dropdown',
    path: '/projects',
    children: [
      {
        title: 'Aktualne projekty',
        type: 'link',
        path: '/projects/current'
      },
      {
        title: 'Zakończone projekty',
        type: 'link',
        path: '/projects/finished'
      }
    ]
  },
  {
    title: 'Członkowie',
    type: 'link',
    path: '/members'
  },
  {
    title: 'Współpraca',
    type: 'link',
    path: '/cooperation'
  },
  {
    title: 'Kontakt',
    type: 'link',
    path: '/contact'
  },
  {
    title: 'ADR',
    type: 'link',
    path: '/adr'
  }
]
