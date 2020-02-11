import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Administración'
  },
  {
    name: 'Escuela',
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
        name: 'Jornadas',
        url: '/base/jornadas',
        icon: 'icon-hourglass  '
      },
      {
        name: 'Periodos',
        url: '/base/periodos',
        icon: 'icon-calendar '
      },
      {
        name: 'Secciones',
        url: '/base/secciones',
        icon: 'icon-grid'
      },   
      {
        name: 'Calificaciones',
        url: '/base/calificaciones',
        icon: 'icon-graduation'
      }, 
    ],
  },
  {
    name: 'Usuarios',
    url: '/buttons',
    icon: 'icon-people',
    children: [
      {
        name: 'Editar Usuarios',
        url: '/buttons/mantenimientos',
        icon: 'icon-settings'
      },
      {
        name: 'Editar Roles',
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
    name: 'Matricular',
    url: '/charts',
    icon: 'icon-folder-alt'
  },
  {
    name: 'Ver Alumnos',
    url: '/dashboard',
    icon: 'icon-notebook'
  }
];
