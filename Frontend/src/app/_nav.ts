import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Administracion'
  },
  {
    name: 'Academica',
    url: '/base',
    icon: 'icon-graduation',
    children: [
      {
        name: 'Asignaturas',
        url: '/base/asignaturas',
        icon: 'icon-notebook'
      },
      {
        name: 'Grados',
        url: '/base/grados',
        icon: 'icon-control-pause'
      },
      {
        name: 'Jornada',
        url: '/base/jornadas',
        icon: 'icon-hourglass  '
      },
      {
        name: 'Periodo',
        url: '/base/periodos',
        icon: 'icon-calendar '
      },
      {
        name: 'Secciones',
        url: '/base/secciones',
        icon: 'icon-grid'
      },   
    ],
  },
  {
    name: 'Usuarios',
    url: '/buttons',
    icon: 'icon-people',
    children: [
      {
        name: 'Mantenimiento',
        url: '/buttons/mantenimientos',
        icon: 'icon-settings'
      },
      {
        name: 'Roles',
        url: '/buttons/roles',
        icon: 'icon-layers'
      }
    ]
  },
  {
    title: true,
    name: 'Procesos'
  },
  {
    name: 'Matricula',
    url: '/charts',
    icon: 'icon-folder-alt'
  },
  {
    name: 'Lista Matriculas',
    url: '/dashboard',
    icon: 'icon-notebook'
  }
];
