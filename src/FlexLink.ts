import {FlexNode} from "./FlexNode";

export class FlexLink {
    previous: FlexNode
    next: FlexNode
    distance: number

    constructor(previous: FlexNode, next: FlexNode, distance: number) {
        this.previous = previous;
        this.next = next;
        this.distance = distance;
    }

    toString() {
        return `${this.previous.name}${this.distance}${this.next.name}`
    }
}