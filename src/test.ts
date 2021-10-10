import {FlexNode} from "./FlexNode";
import {FlexLink} from "./FlexLink";
import {FlexStructure} from "./FlexStructure";

// TODO FlexNode.traverse tests

test("FlexStructure.append", () => {
	// region manual
	const a1 = new FlexNode("A")
	const b1 = new FlexNode("B")
	const c1 = new FlexNode("C")
	const d1 = new FlexNode("D")
	const e1 = new FlexNode("E")
	const f1 = new FlexNode("F")
	const g1 = new FlexNode("G")
	const h1 = new FlexNode("H")
	const i1 = new FlexNode("I")

	// A

	// add B
	FlexLink.link(a1, b1, 1, 0)

	// A->B

	// add C
	FlexLink.link(b1, c1, 1, 0)
	FlexLink.link(a1, c1, 2, 1)

	// /--->\
	// A->B->C

	// add D
	FlexLink.link(c1, d1, 1, 0)

	// /--->\
	// A->B->C->D

	// add E
	FlexLink.link(d1, e1, 1, 0)
	FlexLink.link(c1, e1, 2, 1)
	FlexLink.link(a1, e1, 4, 2)

	// /--------->\
	// /--->\/--->\
	// A->B->C->D->E

	// add F
	FlexLink.link(e1, f1, 1, 0)

	// /--------->\
	// /--->\/--->\
	// A->B->C->D->E->F

	// add G
	FlexLink.link(f1, g1, 1, 0)
	FlexLink.link(e1, g1, 2, 1)

	// /--------->\
	// /--->\/--->\/--->\
	// A->B->C->D->E->F->G

	// add H
	FlexLink.link(g1, h1, 1, 0)

	// /--------->\
	// /--->\/--->\/--->\
	// A->B->C->D->E->F->G->H

	// add I
	FlexLink.link(h1, i1, 1, 0)
	FlexLink.link(g1, i1, 2, 1)
	FlexLink.link(e1, i1, 4, 2)
	FlexLink.link(a1, i1, 8, 3)

	// /--------------------->\
	// /--------->\/--------->\
	// /--->\/--->\/--->\/--->\
	// A->B->C->D->E->F->G->H->I
	//endregion

	// region procedural
	const a2 = new FlexNode("A")
	const b2 = new FlexNode("B")
	const c2 = new FlexNode("C")
	const d2 = new FlexNode("D")
	const e2 = new FlexNode("E")
	const f2 = new FlexNode("F")
	const g2 = new FlexNode("G")
	const h2 = new FlexNode("H")
	const i2 = new FlexNode("I")

	const structure2 = new FlexStructure(a2)

	structure2.append(b2, 1)
	structure2.append(c2, 1)
	structure2.append(d2, 1)
	structure2.append(e2, 1)
	structure2.append(f2, 1)
	structure2.append(g2, 1)
	structure2.append(h2, 1)
	structure2.append(i2, 1)
	// endregion

	expect(a2.linksStartingHere.map(link => link.toString())).toEqual(a1.linksStartingHere.map(link => link.toString()))
	expect(b2.linksStartingHere.map(link => link.toString())).toEqual(b1.linksStartingHere.map(link => link.toString()))
	expect(c2.linksStartingHere.map(link => link.toString())).toEqual(c1.linksStartingHere.map(link => link.toString()))
	expect(d2.linksStartingHere.map(link => link.toString())).toEqual(d1.linksStartingHere.map(link => link.toString()))
	expect(e2.linksStartingHere.map(link => link.toString())).toEqual(e1.linksStartingHere.map(link => link.toString()))
	expect(f2.linksStartingHere.map(link => link.toString())).toEqual(f1.linksStartingHere.map(link => link.toString()))
	expect(g2.linksStartingHere.map(link => link.toString())).toEqual(g1.linksStartingHere.map(link => link.toString()))
	expect(h2.linksStartingHere.map(link => link.toString())).toEqual(h1.linksStartingHere.map(link => link.toString()))
})

test("FlexStructure.add at end", () => {
	// region manual
	const a1 = new FlexNode("A")
	const b1 = new FlexNode("B")
	const c1 = new FlexNode("C")
	const d1 = new FlexNode("D")
	const e1 = new FlexNode("E")
	const f1 = new FlexNode("F")
	const g1 = new FlexNode("G")
	const h1 = new FlexNode("H")
	const i1 = new FlexNode("I")

	// A

	// add B
	FlexLink.link(a1, b1, 1, 0)

	// A->B

	// add C
	FlexLink.link(b1, c1, 1, 0)
	FlexLink.link(a1, c1, 2, 1)

	// /--->\
	// A->B->C

	// add D
	FlexLink.link(c1, d1, 1, 0)

	// /--->\
	// A->B->C->D

	// add E
	FlexLink.link(d1, e1, 1, 0)
	FlexLink.link(c1, e1, 2, 1)
	FlexLink.link(a1, e1, 4, 2)

	// /--------->\
	// /--->\/--->\
	// A->B->C->D->E

	// add F
	FlexLink.link(e1, f1, 1, 0)

	// /--------->\
	// /--->\/--->\
	// A->B->C->D->E->F

	// add G
	FlexLink.link(f1, g1, 1, 0)
	FlexLink.link(e1, g1, 2, 1)

	// /--------->\
	// /--->\/--->\/--->\
	// A->B->C->D->E->F->G

	// add H
	FlexLink.link(g1, h1, 1, 0)

	// /--------->\
	// /--->\/--->\/--->\
	// A->B->C->D->E->F->G->H

	// add I
	FlexLink.link(h1, i1, 1, 0)
	FlexLink.link(g1, i1, 2, 1)
	FlexLink.link(e1, i1, 4, 2)
	FlexLink.link(a1, i1, 8, 3)

	// /--------------------->\
	// /--------->\/--------->\
	// /--->\/--->\/--->\/--->\
	// A->B->C->D->E->F->G->H->I
	//endregion

	// region procedural
	const a2 = new FlexNode("A")
	const b2 = new FlexNode("B")
	const c2 = new FlexNode("C")
	const d2 = new FlexNode("D")
	const e2 = new FlexNode("E")
	const f2 = new FlexNode("F")
	const g2 = new FlexNode("G")
	const h2 = new FlexNode("H")
	const i2 = new FlexNode("I")

	const structure2 = new FlexStructure(a2)

	structure2.add(b2, 1)
	structure2.add(c2, 2)
	structure2.add(d2, 3)
	structure2.add(e2, 4)
	structure2.add(f2, 5)
	structure2.add(g2, 6)
	structure2.add(h2, 7)
	structure2.add(i2, 8)
	// endregion

	expect(a2.linksStartingHere.map(link => link.toString())).toEqual(a1.linksStartingHere.map(link => link.toString()))
	expect(b2.linksStartingHere.map(link => link.toString())).toEqual(b1.linksStartingHere.map(link => link.toString()))
	expect(c2.linksStartingHere.map(link => link.toString())).toEqual(c1.linksStartingHere.map(link => link.toString()))
	expect(d2.linksStartingHere.map(link => link.toString())).toEqual(d1.linksStartingHere.map(link => link.toString()))
	expect(e2.linksStartingHere.map(link => link.toString())).toEqual(e1.linksStartingHere.map(link => link.toString()))
	expect(f2.linksStartingHere.map(link => link.toString())).toEqual(f1.linksStartingHere.map(link => link.toString()))
	expect(g2.linksStartingHere.map(link => link.toString())).toEqual(g1.linksStartingHere.map(link => link.toString()))
	expect(h2.linksStartingHere.map(link => link.toString())).toEqual(h1.linksStartingHere.map(link => link.toString()))
})