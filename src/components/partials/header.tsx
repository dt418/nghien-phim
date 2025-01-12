import Link from 'next/link';
import * as React from 'react';
import { Suspense } from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { menuItems } from '@/config/menuItems';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/types/menu';

import SearchBar from '../ui/header/search-bar';

/**
 * Logo component that renders the site's main logo with a link to home
 * @example
 * ```tsx
 * <Logo />
 * ```
 */
const Logo = () => (
  <Link href="/" className="text-gradient text-2xl font-bold uppercase">
    <span>Nghiện Phim</span>
  </Link>
);

/**
 * Props for the ListItem component
 * @extends {React.ComponentPropsWithoutRef<typeof Link>}
 */
type ListItemProps = React.ComponentPropsWithoutRef<typeof Link> & {
  /** The text to display as the item's title */
  title: string;
};

/**
 * A list item component used in navigation dropdowns
 * @example
 * ```tsx
 * <ListItem title="Action Movies" href="/movies/action">
 *   View our collection of action movies
 * </ListItem>
 * ```
 */
const ListItem = React.forwardRef<React.ElementRef<typeof Link>, ListItemProps>(
  ({ className, title, children, ...props }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  )
);
ListItem.displayName = 'ListItem';

/**
 * Renders the content of a dropdown menu
 * @example
 * ```tsx
 * <DropdownContent items={[
 *   { label: 'Action', href: '/action' },
 *   { label: 'Comedy', href: '/comedy' }
 * ]} />
 * ```
 */
const DropdownContent = ({ items }: { items: MenuItem[] }) => (
  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
    {items.map((child) => (
      <ListItem key={child.href} title={child.label} href={child.href} />
    ))}
  </ul>
);

/**
 * Renders either a link or a dropdown menu based on whether the item has children
 * @example
 * ```tsx
 * <NavigationMenuItems item={{
 *   label: 'Categories',
 *   href: '/categories',
 *   children: [{ label: 'Action', href: '/action' }]
 * }} />
 * ```
 */
const NavigationMenuItems = ({ item }: { item: MenuItem }) => {
  if (!item.children) {
    return (
      <Link href={item.href} legacyBehavior passHref>
        <NavigationMenuLink>{item.label}</NavigationMenuLink>
      </Link>
    );
  }

  return (
    <>
      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <DropdownContent items={item.children} />
      </NavigationMenuContent>
    </>
  );
};

/**
 * Main navigation component that renders the menu items
 * Hidden on mobile, visible on large screens
 */
const Navigation = () => (
  <NavigationMenu className="hidden lg:block">
    <NavigationMenuList className="flex items-center gap-2">
      {menuItems.map((item) => (
        <NavigationMenuItem
          key={item.href}
          className="flex-shrink-0 flex-nowrap"
        >
          <NavigationMenuItems item={item} />
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

/**
 * Content wrapper for the header
 * Handles responsive layout and positioning of logo, navigation and search
 */
const HeaderContent = () => (
  <div className="container flex flex-col flex-wrap justify-between gap-2 py-4 md:flex-row">
    <Logo />
    <section className="flex flex-1 flex-row items-start justify-end gap-2">
      <Navigation />
      <Suspense>
        <SearchBar />
      </Suspense>
    </section>
  </div>
);

/**
 * Main header component of the application
 * Includes logo, navigation menu, and search functionality
 * @example
 * ```tsx
 * <Header />
 * ```
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <HeaderContent />
    </header>
  );
}
