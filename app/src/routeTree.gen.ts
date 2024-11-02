/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LogoutImport } from './routes/logout'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/auth'
import { Route as EditTemplateTemplateIdImport } from './routes/edit-template.$templateId'
import { Route as EditTemplateTemplateIdManageTodosImport } from './routes/edit-template_.$templateId/manage-todos'

// Create Virtual Routes

const NewTemplateLazyImport = createFileRoute('/new-template')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const NewTemplateLazyRoute = NewTemplateLazyImport.update({
  path: '/new-template',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/new-template.lazy').then((d) => d.Route))

const LogoutRoute = LogoutImport.update({
  path: '/logout',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const EditTemplateTemplateIdRoute = EditTemplateTemplateIdImport.update({
  path: '/edit-template/$templateId',
  getParentRoute: () => rootRoute,
} as any)

const EditTemplateTemplateIdManageTodosRoute =
  EditTemplateTemplateIdManageTodosImport.update({
    path: '/edit-template/$templateId/manage-todos',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/logout': {
      id: '/logout'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof LogoutImport
      parentRoute: typeof rootRoute
    }
    '/new-template': {
      id: '/new-template'
      path: '/new-template'
      fullPath: '/new-template'
      preLoaderRoute: typeof NewTemplateLazyImport
      parentRoute: typeof rootRoute
    }
    '/edit-template/$templateId': {
      id: '/edit-template/$templateId'
      path: '/edit-template/$templateId'
      fullPath: '/edit-template/$templateId'
      preLoaderRoute: typeof EditTemplateTemplateIdImport
      parentRoute: typeof rootRoute
    }
    '/edit-template/$templateId/manage-todos': {
      id: '/edit-template/$templateId/manage-todos'
      path: '/edit-template/$templateId/manage-todos'
      fullPath: '/edit-template/$templateId/manage-todos'
      preLoaderRoute: typeof EditTemplateTemplateIdManageTodosImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  AuthRoute,
  LoginRoute,
  LogoutRoute,
  NewTemplateLazyRoute,
  EditTemplateTemplateIdRoute,
  EditTemplateTemplateIdManageTodosRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth",
        "/login",
        "/logout",
        "/new-template",
        "/edit-template/$templateId",
        "/edit-template/$templateId/manage-todos"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/auth": {
      "filePath": "auth.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/logout": {
      "filePath": "logout.tsx"
    },
    "/new-template": {
      "filePath": "new-template.lazy.tsx"
    },
    "/edit-template/$templateId": {
      "filePath": "edit-template.$templateId.tsx"
    },
    "/edit-template/$templateId/manage-todos": {
      "filePath": "edit-template_.$templateId/manage-todos.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
