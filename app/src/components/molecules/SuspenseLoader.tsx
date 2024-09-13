import { CircularProgress } from "@mui/joy";
import { type PropsWithChildren, Suspense } from "react";

export const SuspenseLoader = ({ children }: PropsWithChildren) => {
	return (
		<Suspense fallback={<CircularProgress determinate={false} />}>
			{children}
		</Suspense>
	);
};
