import {FlexNode} from "./FlexNode";

export class ResponsiveFlexList {
	root: FlexNode | null = null

	get isEmpty() {
		return this.root === null
	}
}