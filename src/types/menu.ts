export type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
};

export type MenuItems = MenuItem[];
