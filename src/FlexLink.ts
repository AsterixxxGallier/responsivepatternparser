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

    toString() {
        return `${this.previous.name}${this.distance}${this.next.name}(${this.degree})`
    }
}