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

	get linkToNext() {
		if (this.linksStartingHere.length == 0)
			return null
		else
			return this.linksStartingHere[this.linksStartingHere.length - 1]
	}

	get linkToPrevious() {
		if (this.linksEndingHere.length == 0)
			return null
		else
			return this.linksEndingHere[this.linksEndingHere.length - 1]
	}

	get linkToNextInStructure() {
		const linkToNext = this.linkToNext
		if (linkToNext == null)
			return null
		if (linkToNext.degree >= 0)
			return linkToNext
		if (this.linksStartingHere.length == 1)
			return null
		else
			return this.linksStartingHere[this.linksStartingHere.length - 2]
	}

	get linkToPreviousInStructure() {
		const linkToPrevious = this.linkToPrevious
		if (linkToPrevious == null)
			return null
		if (linkToPrevious.degree >= 0)
			return linkToPrevious
		if (this.linksEndingHere.length == 1)
			return null
		else
			return this.linksEndingHere[this.linksEndingHere.length - 2]
	}

	traverse(distance: number): [node: FlexNode, distanceToGo: number] {
		let distanceToGo = distance
		let current: FlexNode = this
		while (true) {
			const longestLink = current.linksStartingHere.find(link => link.distance <= distanceToGo)
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