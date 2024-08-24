import { Add, Home } from '@mui/icons-material'
import { Button, Stack } from '@mui/joy'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Stack direction='row' gap={2} alignItems='center'>
        <Link to="/" className="[&.active]:font-bold">
          <Home />
        </Link>
        <Button component={Link} to="/new-template" startDecorator={<Add/>}>New template</Button> 
      </Stack>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
