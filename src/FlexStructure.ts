import {FlexNode} from "./FlexNode";

export class FlexStructure {
	root: FlexNode
	end: FlexNode

	constructor(root: FlexNode, end: FlexNode) {
		this.root = root;
		this.end = end;
	}
}