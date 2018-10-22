// @flow
import Columns from './Columns';

test("create colls", () => {
	let columns = new Columns( [3,2,1] );

	let massColumns = columns.getElem();

	expect( massColumns.length ).toBe(3);
});
