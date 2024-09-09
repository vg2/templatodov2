import { Add, Home } from '@mui/icons-material'
import { Box, Button, Divider, Stack, Typography } from '@mui/joy'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import logo from "../assets/logo.png";

export const Route = createRootRoute({
  component: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '98vh' }}>
      <Box component='main' sx={{ flexGrow: 1, p: 2 }}>
        <Outlet />
      </Box>
      <Divider />
      <Box component='footer' sx={{ p: 2 }}>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='space-between'>
          <Link to="/">
            <img src={logo} width="50" height="50" alt="Templatodo logo" />
          </Link>
          <Button component={Link} to="/new-template" startDecorator={<Add />}>New template</Button>
          <Typography level='title-lg'>Templatodo</Typography>
        </Stack>
      </Box>
    </Box>
  ),
})
