import {FlexLink} from "./FlexLink";

export class FlexNode {
	/**
	 * Name of this node. In the future, this field will be replaced.
	 */
	name: string
	/**
	 * The root of the structure this node is part of
	 */
	root: FlexNode
	/**
	 * A list of links that have {@link this} as {@link FlexLink.previous}
	 */
	linksStartingHere: FlexLink[] = []
	/**
	 * A list of links that have {@link this} as {@link FlexLink.next}
	 */
	linksEndingHere: FlexLink[] = []

	constructor(name: string, root?: FlexNode) {
		this.name = name;
		this.root = root ?? this;
	}

	add(node: FlexNode, distance: number, root: FlexNode = this.root) {
		FlexLink.link(this, node, distance, 0)
		for (let degree = 1; ; degree++) {
			const firstLinkBack = node.linksEndingHere.find(link => link.degree == degree - 1)
			if (firstLinkBack == undefined) break
			const secondLinkBack = firstLinkBack.previous.linksEndingHere.find(link => link.degree == degree - 1)
			if (secondLinkBack == undefined) break
			const lastSameDegreeLink = secondLinkBack.previous.linksEndingHere.find(link => link.degree == degree)
			if (lastSameDegreeLink == undefined && secondLinkBack.previous != root) break
			FlexLink.link(secondLinkBack.previous, node, firstLinkBack.distance + secondLinkBack.distance, degree)
		}
	}

	toString() {
		return `<${this.name} of root ${this.root.name}; starting here: ${this.linksStartingHere}; ending here: ${this.linksEndingHere}>`
	}
}