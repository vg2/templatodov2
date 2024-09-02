import { Sheet, Stack } from "@mui/joy";
import type { PropsWithChildren } from "react";

export const FloatingActionBar = ({ children }: PropsWithChildren) => {
	return (
		<Sheet
			sx={{
				position: "fixed",
				bottom: "96px",
				width: "90%",
				height: "56px",
			}}
		>
			<Stack direction="row" gap={1} justifyContent="flex-end">
				{children}
			</Stack>
		</Sheet>
	);
};
