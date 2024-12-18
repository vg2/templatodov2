import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import logo from "../assets/parenttime-logo-2.png";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/atoms/NavigationMenu';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/atoms/Separator';
import LoginButton from '@/components/atoms/LoginButton';
import LogoutButton from '@/components/atoms/LogoutButton';

export const Route = createRootRoute({
  component: () => (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col bg-cararra-300 font-quicksand">
      <div className="mx-4 flex-grow overflow-auto p-2" >
        <Outlet />
      </div>
      <Separator />
      <div className="sticky bottom-0 z-10 w-full bg-concrete-950 pt-1 pb-1">
        <NavigationMenu className="w-full max-w-none">
          <NavigationMenuList className="flex w-full justify-center">
            <NavigationMenuItem className="flex-1">
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-center bg-transparent text-cloud-50 hover:bg-transparent hover:text-cloud-50 focus:bg-transparent focus:text-cloud-50 active:bg-transparent`} asChild>
                <Link to="/">
                  <div className="flex flex-row items-center gap-2">
                    <div className="rounded bg-cararra-200 p-1">
                      <img src={logo} width="24" height="24" alt="Templatodo logo" /></div>
                    Templatodo
                  </div>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex-1">
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-center bg-transparent text-cloud-50 hover:bg-transparent hover:text-cloud-50 focus:bg-transparent focus:text-cloud-50 active:bg-transparent`} asChild>
                <Link to="/new-template">
                  <Plus /> Template
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex-1">
              <LoginButton />
              <LogoutButton />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  ),
})
