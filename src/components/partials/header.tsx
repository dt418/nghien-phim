import * as React from 'react'
import { Suspense } from 'react'

import Link from 'next/link'

import { Menu } from 'lucide-react'

import { Button } from '~/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '~/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'
import { VisuallyHidden } from '~/components/ui/visually-hidden'

import { menuItems } from '~/config'

import { cn } from '~/lib/utils'

import type { MenuItem } from '~/types/menu'

import SearchBar from '../ui/header/search-bar'

/**
 * Logo component that renders the site's main logo with a link to home
 * @example
 * ```tsx
 * <Logo />
 * ```
 */
function Logo() {
  return (
    <Link href="/" className="text-gradient text-2xl font-bold uppercase">
      <span className="hidden lg:inline">Nghiện Phim</span>
      <span className="inline lg:hidden">NP</span>
    </Link>
  )
}

/**
 * Props for the ListItem component
 * @extends {React.ComponentPropsWithoutRef<typeof Link>}
 */
type ListItemProps = React.ComponentPropsWithoutRef<typeof Link> & {
  /** The text to display as the item's title */
  title: string
}

/**
 * A list item component used in navigation dropdowns
 * @example
 * ```tsx
 * <ListItem title="Action Movies" href="/movies/action">
 *   View our collection of action movies
 * </ListItem>
 * ```
 */
function ListItem({ ref, className, title, children, ...props }: ListItemProps & { ref?: React.RefObject<React.ComponentRef<typeof Link> | null> }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
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
}
ListItem.displayName = 'ListItem'

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
function DropdownContent({ items }: { items: MenuItem[] }) {
  return (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
      {items.map((child: MenuItem) => (
        <ListItem key={child.href} title={child.label} href={child.href} />
      ))}
    </ul>
  )
}

/**
 * Mobile menu component that renders menu items in a slide-out sheet
 */
function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="xl:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <VisuallyHidden>
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            This is mobile menu that contains all the navigation links
          </SheetDescription>
        </VisuallyHidden>
        <nav className="scrollbar-thin flex max-h-full flex-col space-y-4 overflow-y-scroll">
          {menuItems.map(item => (
            <div key={item.href}>
              <Link href={item.href} className="text-lg font-medium">
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-4 mt-2 flex flex-col space-y-2">
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="text-sm text-muted-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

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
function NavigationMenuItems({ item }: { item: MenuItem }) {
  if (!item.children) {
    return (
      <Link href={item.href} legacyBehavior passHref>
        <NavigationMenuLink>{item.label}</NavigationMenuLink>
      </Link>
    )
  }

  return (
    <>
      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <DropdownContent items={item.children} />
      </NavigationMenuContent>
    </>
  )
}

/**
 * Main navigation component that renders the menu items
 * Hidden on mobile, visible on large screens
 */
function Navigation() {
  return (
    <NavigationMenu className="hidden xl:block">
      <NavigationMenuList className="flex items-center gap-2">
        {menuItems.map(item => (
          <NavigationMenuItem
            key={item.href}
            className="flex-shrink-0 flex-nowrap"
          >
            <NavigationMenuItems item={item} />
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/**
 * Content wrapper for the header
 * Handles responsive layout and positioning of logo, navigation and search
 */
function HeaderContent() {
  return (
    <div className="container flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar />
        </Suspense>
        <MobileMenu />
      </div>
    </div>
  )
}

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
  )
}
