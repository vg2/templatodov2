import { type PropsWithChildren, Suspense } from "react";
import { Progress } from "../atoms/Progress";

export const SuspenseLoader = ({ children }: PropsWithChildren) => {
	return (
		<Suspense fallback={<Progress indeterminate className="bg-cloud-200" />}>
			{children}
		</Suspense>
	);
};
