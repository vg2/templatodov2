import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/inter";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queries/query-client.ts";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
const rootNode = document.getElementById("root");
if (rootNode) {
	ReactDOM.createRoot(rootNode).render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</React.StrictMode>,
	);
}
