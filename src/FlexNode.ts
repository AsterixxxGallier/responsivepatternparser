class FlexNode {
    name: string
    linksStartingHere: FlexLink[] = []
    linksEndingHere: FlexLink[] = []

    constructor(name: string) {
        this.name = name;
    }
}