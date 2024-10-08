export const AllTodoStates = ['New', 'Complete', 'DidNotComplete'] as const;
export type TodoState = (typeof AllTodoStates)[number];
