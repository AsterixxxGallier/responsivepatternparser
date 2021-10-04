import {FlexLink} from "./FlexLink";

export class FlexNode {
	/**
	 * Name of this node. In the future, this field will be replaced.
	 */
	name: string
	/**
	 * A list of links that have {@link this} as {@link FlexLink.previous}
	 */
	linksStartingHere: FlexLink[] = []
	/**
	 * A list of links that have {@link this} as {@link FlexLink.next}
	 */
	linksEndingHere: FlexLink[] = []

	constructor(name: string) {
		this.name = name;
	}

    add(node: FlexNode, distance: number) {
        this.linksStartingHere.forEach(link => link.distance += distance)
        FlexLink.link(this, node, distance, 1)
    }

	toString() {
		return `<${this.name}; starting here: ${this.linksStartingHere}; ending here: ${this.linksEndingHere}>`
	}
}