/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as EditTemplateTemplateIdImport } from './routes/edit-template.$templateId'

// Create Virtual Routes

const NewTemplateLazyImport = createFileRoute('/new-template')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const NewTemplateLazyRoute = NewTemplateLazyImport.update({
  path: '/new-template',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/new-template.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const EditTemplateTemplateIdRoute = EditTemplateTemplateIdImport.update({
  path: '/edit-template/$templateId',
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
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  NewTemplateLazyRoute,
  EditTemplateTemplateIdRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/new-template",
        "/edit-template/$templateId"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/new-template": {
      "filePath": "new-template.lazy.tsx"
    },
    "/edit-template/$templateId": {
      "filePath": "edit-template.$templateId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
