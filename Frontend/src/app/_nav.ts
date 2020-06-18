import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  
  {
    title: true,
    name: 'Procesos'
  },
  {
    name: 'Matricula',
    // url: '/charts',
    // icon: 'icon-folder-alt',
    children: [
      {
        name: 'Matricular',
        url: '/charts',
        icon: 'icon-folder-alt'
      },
      {
        name: 'Ver Alumnos',
        url: '/dashboard',
        icon: 'icon-people'
      },
    ]
  },
  {
    name: 'Calificaciones',
    // url: '/charts',
    // icon: 'icon-folder-alt',
    children: [
      {
        name: 'Agregar Calificación',
        url: '/base/agregarcalificaciones',
        icon: 'icon-check'
      },
      {
        name: 'Ver Calificaciones',
        url: '/base/calificaciones',
        icon: 'icon-notebook'
      },
    ]
  },
  {
    name: 'Inventarios',
    // url: '/buttons',
    // icon: 'icon-folder',
    children: [
      {
        name: 'Mobiliario',
        url: '/inventario/mobiliario',
        icon: 'icon-layers'
      },
      // {
      //   name: 'Medicinas',
      //   url: '/buttons/medicinas',
      //   icon: 'icon-layers'
      // },
      // {
      //   name: 'Alimentos',
      //   url: '/buttons/alimentos',
      //   icon: 'icon-layers'
      // }
    ]
  },
  
  {
    title: true,
    name: 'Administración',
  },
  {
    name: 'Mantenimientos',
    url: '/base',
    icon: 'icon-settings',
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
  }
];
