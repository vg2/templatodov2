import { Add } from '@mui/icons-material'
import { Box, Button, Divider, Stack, Typography } from '@mui/joy'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import logo from "../assets/logo.png";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/atoms/NavigationMenu';
import { Separator } from '@/components/atoms/Separator';

// export const Route = createRootRoute({
//   component: () => (
//     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '98vh' }}>
//       <Box component='main' sx={{ flexGrow: 1, p: 2 }}>
//         <Outlet />
//       </Box>
//       <Divider />
//       <Box component='footer' sx={{ p: 2 }}>
//         <Stack direction='row' gap={2} alignItems='center' justifyContent='space-between'>
//           <Link to="/">
//             <img src={logo} width="50" height="50" alt="Templatodo logo" />
//           </Link>
//           <Button component={Link} to="/new-template" startDecorator={<Add />}>New template</Button>
//           <Typography level='title-lg'>Templatodo</Typography>
//         </Stack>
//       </Box>
//     </Box>
//   ),
// })

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <div className="mx-2 my-2 flex-grow overflow-auto">
        <Outlet />
      </div>
      <div className="sticky bottom-0 z-10 bg-white">
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
                  New template
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  ),
})