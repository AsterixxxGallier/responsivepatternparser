import {FlexNode} from "./FlexNode";
import {FlexLink} from "./FlexLink";

export class FlexStructure {
	/**
	 * The degree of the largest planned link in this structure
	 */
	height: number = 0
	/**
	 * The number of zero-degree links in this structure
	 */
	length: number = 0
	/**
	 * An array of all the nodes that are planned to be linked with future nodes,
	 * sorted in ascending order by the degree of the future link
	 */
	plannedLinks: [node: FlexNode, distance: number][] = []
	first: FlexNode
	last: FlexNode
	previous: FlexNode | null
	next: FlexNode | null

	constructor(node: FlexNode, previous: FlexNode | null = null, next: FlexNode | null = null) {
		this.first = node;
		this.last = node;
		node.structure = this;
		this.previous = previous;
		this.next = next;
		this.plannedLinks = [[node, 0.0]]
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
		for (let degree = 0; degree <= this.height; degree++) {
			this.plannedLinks[degree][1] += distance
		}
		const changes = this.length ^ ++this.length
		for (let degree = 0; degree <= this.height; degree++) {
			const mask = 1 << degree
			const changed = !!(changes & mask)
			if (!changed) break
			const [toLink, toLinkDistance] = this.plannedLinks[degree]
			FlexLink.link(toLink, node, toLinkDistance, degree)
			this.plannedLinks[degree] = [node, 0.0]
			if (degree == this.height) {
				this.plannedLinks.push([toLink, toLinkDistance])
				this.height++
			}
		}
		if (this.next) FlexLink.link(node, this.next, linkToNext!.distance - distance, -1)
		this.last = node
	}

	splice({degree, next, previous, distance}: FlexLink, node: FlexNode, distanceFromPrevious: number) {
		console.assert(degree == 0)
		node.structure = new FlexStructure(node, previous, next)
		FlexLink.link(previous, node, distanceFromPrevious, -1)
		FlexLink.link(node, next, distance - distanceFromPrevious, -1)
	}

	add(node: FlexNode, distanceFromFirst: number) {
		const [previous, distanceFromPrevious] = this.first.traverse(distanceFromFirst)
		if (!previous.linksStartingHere.some(link => link.next.structure == previous.structure)) {
			console.assert(previous === previous.structure.last)
			previous.structure.append(node, distanceFromPrevious)
		} else {
			const link = previous.linkToNextInStructure
			if (!link) throw new Error("TODO") // TODO
			previous.structure.splice(link, node, distanceFromPrevious)
		}
	}
}