class ResponsiveFlexList {
    root: FlexNode | null = null

    get isEmpty() {
        return this.root === null
    }
}