import {FlexNode} from "./FlexNode";

export class FlexLink {
	previous: FlexNode
	next: FlexNode
	distance: number
	degree: number

	constructor(previous: FlexNode, next: FlexNode, distance: number, degree: number) {
		this.previous = previous;
		this.next = next;
		this.distance = distance;
		this.degree = degree;
	}

	static link(a: FlexNode, b: FlexNode, distance: number, degree: number) {
		const link = new FlexLink(a, b, distance, degree)
		a.linksStartingHere.push(link)
		b.linksEndingHere.push(link)
		return link
	}

	toString() {
		return `${this.previous.name}${this.distance}${this.next.name}(${this.degree})`
	}
}