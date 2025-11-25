import { InitialNode } from "@/components/nodes/initial-node";
import { NodeType } from "@/lib/generated/prisma/enums";
import { NodeTypes } from "@xyflow/react";

export const NODE_COMPONENTS = {
    [NodeType.INITIAL]: InitialNode,
} as const satisfies NodeTypes

export type RegisteredNodeTypes = keyof typeof NODE_COMPONENTS