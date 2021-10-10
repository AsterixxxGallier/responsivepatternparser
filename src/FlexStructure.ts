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
	 * An array of all the nodes that should be linked with future nodes,
	 * sorted in ascending order by the degree of the future link
	 */
	nodesToLink: [node: FlexNode, distance: number][] = []
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
		this.nodesToLink = [[node, 0.0]]
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
		/*
		A 0000
		nodesToLink = [[A, 0.0]]
		height = 0


		B 0001 0.8
		changedDegrees = 0..0
		nodesToLink = [[A, 0.8]]

		degree = 0
		link(A, B, degree, 0.8)
		nodesToLink = [[B, 0.0], [A, 0.8]]

		height = 1


		C 0010 0.2
		changedDegrees = 0..1
		nodesToLink = [[B, 0.2], [A, 1.0]]

		degree = 0
		link(B, C, degree, 0.2)
		nodesToLink = [[C, 0.0], [A, 1.0]]

		degree = 1
		link(A, C, degree, 1.0)
		nodesToLink = [[C, 0.0], [C, 0.0], [A, 1.0]]

		height = 2


		D 0011 4.0
		changedDegrees = 0..0
		nodesToLink = [[C, 4.0], [C, 4.0], [A, 5.0]]

		degree = 0
		link(C, D, degree, 4.0)
		nodesToLink = [[D, 0.0], [C, 4.0], [A, 5.0]]

		height = 2


		E 0100 1.0
		changedDegrees = 0..2
		nodesToLink = [[D, 1.0], [C, 5.0], [A, 6.0]]

		degree = 0
		link(D, E, degree, 1.0)
		nodesToLink = [[E, 0.0], [C, 5.0], [A, 6.0]]

		degree = 1
		link(C, E, degree, 6.0)
		nodesToLink = [[E, 0.0], [E, 0.0], [A, 6.0]]

		degree = 2
		link(A, E, degree, 6.0)
		nodesToLink = [[E, 0.0], [E, 0.0], [E, 0.0], [A, 6.0]]

		height = 3

		F 0101 3.7
		changedDegrees = 0..0

		G 0110 0.3
		changedDegrees = 0..1

		H 0111 8.9
		changedDegrees = 0..2

		I 1000 1.1
		changedDegrees = 0..3
		 */
		for (let degree = 0; degree <= this.height; degree++) {
			this.nodesToLink[degree][1] += distance
		}
		const changes = this.length ^ ++this.length
		for (let degree = 0; degree <= this.height; degree++) {
			const mask = 1 << degree
			const changed = !!(changes & mask)
			if (!changed) break
			const [toLink, toLinkDistance] = this.nodesToLink[degree]
			FlexLink.link(toLink, node, toLinkDistance, degree)
			this.nodesToLink[degree] = [node, 0.0]
			if (degree == this.height) {
				this.nodesToLink.push([toLink, toLinkDistance])
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