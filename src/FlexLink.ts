import {FlexNode} from "./FlexNode";

export class FlexLink {
	previous: FlexNode
	next: FlexNode
	distance: number
	/**
	 * 0 for links that link to the next node inside the same structure as {@link previous.structure} and {@link next.structure},
	 * -1 for links that link to a node of a different structure
	 * and everything above for binary shortcut links
	 */
	degree: number

	constructor(previous: FlexNode, next: FlexNode, distance: number, degree: number) {
		this.previous = previous;
		this.next = next;
		this.distance = distance;
		this.degree = degree;
	}

	static link(a: FlexNode, b: FlexNode, distance: number, degree: number) {
		const link = new FlexLink(a, b, distance, degree)
		if (a.linksStartingHere.length == 0) {
			a.linksStartingHere.push(link)
		} else {
			const last = a.linksStartingHere[a.linksStartingHere.length - 1];
			if (degree < last.degree)
				a.linksStartingHere.push(link)
			else if (degree == last.degree)
				throw new Error("TODO") // TODO
			else if (degree > a.linksStartingHere[0].degree)
				a.linksStartingHere.unshift(link)
			else
				throw new Error("TODO") // TODO
		}
		if (b.linksEndingHere.length == 0) {
			b.linksEndingHere.push(link)
		} else {
			const last = b.linksEndingHere[b.linksEndingHere.length - 1];
			if (degree < last.degree)
				b.linksEndingHere.push(link)
			else if (degree == last.degree)
				throw new Error("TODO") // TODO
			else if (degree > b.linksEndingHere[0].degree)
				b.linksEndingHere.unshift(link)
			else
				throw new Error("TODO") // TODO
		}
		return link
	}

	static unlink(a: FlexNode, b: FlexNode): FlexLink | undefined {
		const link = a.linksStartingHere.find(link => link.previous === a && link.next === b)
		if (!link) return link
		a.linksStartingHere.splice(a.linksStartingHere.indexOf(link), 1)
		b.linksEndingHere.splice(b.linksEndingHere.indexOf(link), 1)
		return link
	}

	toString() {
		return `${this.previous.name}${this.distance}${this.next.name}(${this.degree})`
	}
}