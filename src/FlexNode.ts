import {FlexLink} from "./FlexLink";
import {FlexStructure} from "./FlexStructure";

export class FlexNode {
	/**
	 * Name of this node. In the future, this field will be replaced.
	 */
	name: string
	/**
	 * An array of links that have {@link this} as {@link FlexLink.previous}
	 */
	linksStartingHere: FlexLink[] = []
	/**
	 * An array of links that have {@link this} as {@link FlexLink.next}
	 */
	linksEndingHere: FlexLink[] = []

	constructor(name: string) {
		this.name = name;
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
		return `<${this.name}; starting here: ${this.linksStartingHere}; ending here: ${this.linksEndingHere}>`
	}
}