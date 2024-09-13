import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import logo from "../assets/logo.png";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/atoms/NavigationMenu';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/atoms/Separator';

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <div className="mx-4 flex-grow overflow-auto p-2">
        <Outlet />
      </div>
      <div className="sticky bottom-0 z-10 bg-white">
      <Separator />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                <Link to="/">
                  <div className="flex flex-row items-center gap-2">
                    <img src={logo} width="32" height="32" alt="Templatodo logo" />
                    Templatodo
                  </div>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/new-template">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Plus/> New template
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  ),
})