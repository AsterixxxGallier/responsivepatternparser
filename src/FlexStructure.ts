import {FlexNode} from "./FlexNode";

export class FlexStructure {
	root: FlexNode
	end: FlexNode
	parent: FlexStructure | null

	constructor(root: FlexNode, end: FlexNode, parent: FlexStructure | null = null) {
		this.root = root;
		this.end = end;
		this.parent = parent;
	}
}