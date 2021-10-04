import {FlexNode} from "./FlexNode";
import {FlexLink} from "./FlexLink";

test("8-link clean binary flex list", () => {
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
	const ab1 = FlexLink.link(a1, b1, 1, 0)

	// A->B

	// add C
	const bc1 = FlexLink.link(b1, c1, 1, 0)
	const ac1 = FlexLink.link(a1, c1, 2, 1)

	// /--->\
	// A->B->C

	// add D
	const cd1 = FlexLink.link(c1, d1, 1, 0)

	// /--->\
	// A->B->C->D

	// add E
	const de1 = FlexLink.link(d1, e1, 1, 0)
	const ce1 = FlexLink.link(c1, e1, 2, 1)
	const ae1 = FlexLink.link(a1, e1, 4, 2)

	// /--------->\
	// /--->\/--->\
	// A->B->C->D->E

	// add F
	const ef1 = FlexLink.link(e1, f1, 1, 0)

	// /--------->\
	// /--->\/--->\
	// A->B->C->D->E->F

	// add G
	const fg1 = FlexLink.link(f1, g1, 1, 0)
	const eg1 = FlexLink.link(e1, g1, 2, 1)

	// /--------->\
	// /--->\/--->\/--->\
	// A->B->C->D->E->F->G

	// add H
	const gh1 = FlexLink.link(g1, h1, 1, 0)

	// /--------->\
	// /--->\/--->\/--->\
	// A->B->C->D->E->F->G->H

	// add I
	const hi1 = FlexLink.link(h1, i1, 1, 0)
	const gi1 = FlexLink.link(g1, i1, 2, 1)
	const ei1 = FlexLink.link(e1, i1, 4, 2)
	const ai1 = FlexLink.link(a1, i1, 8, 3)

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

	const root = a2
	a2.add(b2, 1, root)
	b2.add(c2, 1, root)
	c2.add(d2, 1, root)
	d2.add(e2, 1, root)
	e2.add(f2, 1, root)
	f2.add(g2, 1, root)
	g2.add(h2, 1, root)
	h2.add(i2, 1, root)
	// endregion

	expect(a1).toEqual(a2)
	expect(b1).toEqual(b2)
	expect(c1).toEqual(c2)
	expect(d1).toEqual(d2)
	expect(e1).toEqual(e2)
	expect(f1).toEqual(f2)
	expect(g1).toEqual(g2)
	expect(h1).toEqual(h2)
})