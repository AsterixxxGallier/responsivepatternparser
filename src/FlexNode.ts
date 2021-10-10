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
	 * An array of links that have {@link this} as {@link FlexLink.previous},
	 * sorted in descending order by degree (and thereby length)
	 */
	linksStartingHere: FlexLink[] = []
	/**
	 * An array of links that have {@link this} as {@link FlexLink.next},
	 * sorted in descending order by degree (and thereby length)
	 */
	linksEndingHere: FlexLink[] = []

	constructor(name: string, structure?: FlexStructure) {
		this.name = name;
		this.structure = structure ?? new FlexStructure(this, this);
	}

	traverse(distance: number): [node: FlexNode, distanceToGo: number] {
		let distanceToGo = distance
		let current: FlexNode = this
		while (true) {
			let longestLink: FlexLink | null = null
			for (let link of current.linksStartingHere) {
				if (link.distance <= distanceToGo)
					if (longestLink == null || longestLink.distance < link.distance)
						longestLink = link
			}
			if (longestLink == null)
				return [current, distanceToGo]
			distanceToGo -= longestLink.distance
			current = longestLink.next
		}
	}

	toString() {
		return `<${this.name} of structure ${this.structure.first.name}.->.${this.structure.last.name}; `
			+ `starting here: ${this.linksStartingHere}; ending here: ${this.linksEndingHere}>`
	}
}