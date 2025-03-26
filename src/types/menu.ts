export interface MenuItem {
  href: string
  label: string
  children?: MenuItem[]
}

export type MenuItems = MenuItem[]
