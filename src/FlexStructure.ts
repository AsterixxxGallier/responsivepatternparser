import {FlexNode} from "./FlexNode";
import {FlexLink} from "./FlexLink";

export class FlexStructure {
	first: FlexNode
	last: FlexNode
	previous: FlexNode | null
	next: FlexNode | null

	constructor(first: FlexNode, last: FlexNode, previous: FlexNode | null = null, next: FlexNode | null = null) {
		this.first = first;
		this.last = last;
		first.structure = this
		last.structure = this
		this.previous = previous;
		this.next = next;
	}

	/**
	 * Add a node to the end of this structure
	 * @param node
	 * @param distance
	 */
	append(node: FlexNode, distance: number) {
		node.structure = this
		let linkToNext: FlexLink | undefined = undefined
		if (this.next) linkToNext = FlexLink.unlink(this.last, this.next)
		FlexLink.link(this.last, node, distance, 0)
		for (let degree = 1; ; degree++) {
			const firstLinkBack = node.linksEndingHere.find(link => link.degree == degree - 1)
			if (firstLinkBack == undefined) break
			const secondLinkBack = firstLinkBack.previous.linksEndingHere.find(link => link.degree == degree - 1)
			if (secondLinkBack == undefined) break
			const lastSameDegreeLink = secondLinkBack.previous.linksEndingHere.find(link => link.degree == degree)
			if (lastSameDegreeLink == undefined && secondLinkBack.previous != this.first) break
			FlexLink.link(secondLinkBack.previous, node, firstLinkBack.distance + secondLinkBack.distance, degree)
		}
		if (this.next) FlexLink.link(node, this.next, linkToNext!.distance - distance, 0)
		this.last = node
	}

	splice({degree, next, previous, distance}: FlexLink, node: FlexNode, distanceFromPrevious: number) {
		console.assert(degree == 0)
		node.structure = new FlexStructure(node, node, previous, next)
		FlexLink.link(previous, node, distanceFromPrevious, 0)
		FlexLink.link(node, next, distance - distanceFromPrevious, 0)
	}

	add(node: FlexNode, distanceFromFirst: number) {
		const [previous, distanceFromPrevious] = this.first.traverse(distanceFromFirst)
		if (previous.linksStartingHere.length == 0) {
			console.assert(previous === this.last)
			this.append(node, distanceFromPrevious)
		} else {
			const link = previous.linksStartingHere.find(link => link.degree == 0)!
			previous.structure.splice(link, node, distanceFromPrevious)
		}
	}
}