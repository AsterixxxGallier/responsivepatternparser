import {FlexLink} from "./FlexLink";
import {FlexStructure} from "./FlexStructure";

export class FlexNode {
	/**
	 * Name of this node. In the future, this field will be replaced.
	 */
	name: string
	/**
	 * The root of the structure this node is part of
	 */
	structure: FlexStructure
	/**
	 * A list of links that have {@link this} as {@link FlexLink.previous}
	 */
	linksStartingHere: FlexLink[] = []
	/**
	 * A list of links that have {@link this} as {@link FlexLink.next}
	 */
	linksEndingHere: FlexLink[] = []

	constructor(name: string, structure?: FlexStructure) {
		this.name = name;
		this.structure = structure ?? new FlexStructure(this, this);
	}

	add(node: FlexNode, distance: number) {
		FlexLink.link(this, node, distance, 0)
		for (let degree = 1; ; degree++) {
			const firstLinkBack = node.linksEndingHere.find(link => link.degree == degree - 1)
			if (firstLinkBack == undefined) break
			const secondLinkBack = firstLinkBack.previous.linksEndingHere.find(link => link.degree == degree - 1)
			if (secondLinkBack == undefined) break
			const lastSameDegreeLink = secondLinkBack.previous.linksEndingHere.find(link => link.degree == degree)
			if (lastSameDegreeLink == undefined && secondLinkBack.previous != this.structure.root) break
			FlexLink.link(secondLinkBack.previous, node, firstLinkBack.distance + secondLinkBack.distance, degree)
		}
	}

	toString() {
		return `<${this.name} of structure ${this.structure.root.name}.->.${this.structure.root.name}; `
			+ `starting here: ${this.linksStartingHere}; ending here: ${this.linksEndingHere}>`
	}
}