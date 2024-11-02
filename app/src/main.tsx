import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/inter";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { queryClient } from "./queries/query-client.ts";
import { routeTree } from "./routeTree.gen.ts";
import { Auth0Provider } from "@auth0/auth0-react";

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
			<Auth0Provider
				domain="dev-7kcpmwzjlcul8yq6.us.auth0.com"
				clientId="R3mmZeyBZWbmG5fydDL0ka5EmaQvLUXJ"
				authorizationParams={{
					redirect_uri: `${window.location.origin}/auth`,
				}}
			>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</Auth0Provider>
		</React.StrictMode>,
	);
}
