class FlexLink {
    previous: FlexNode
    next: FlexNode
    distance: number

    constructor(previous: FlexNode, next: FlexNode, distance: number) {
        this.previous = previous;
        this.next = next;
        this.distance = distance;
    }
}