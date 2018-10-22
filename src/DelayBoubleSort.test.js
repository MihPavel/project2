// @flow
import BoubleSort from './DelayBoubleSort';

test("sort massive", () => {
	let sort = new BoubleSort( [3,2,1] );

	sort.nextStepSort();
	let rezult = sort.getStateSort();

	expect( rezult ).toEqual( [2,3,1] );
});

test("sort massive full", () => {
	let sort = new BoubleSort( [3,2,1] );
	
	sort.nextStepSort();
	sort.nextStepSort();
	sort.nextStepSort();
	let rezult = sort.getStateSort();

	expect( rezult ).toEqual( [1,2,3] );
});

test("rollback sort", () => {
	let sort = new BoubleSort( [3,2,1] );

	sort.nextStepSort();
	sort.nextStepSort();
	sort.nextStepSort();

	sort.backStepSort({
		from: 1,
		to: 0,
	});
	sort.backStepSort({
		from: 2,
		to: 1,
	});
	sort.backStepSort({
		from: 1,
		to: 0,
	});

	let rezult = sort.getStateSort();

	expect(rezult).toEqual([3, 2, 1]);
});
// паб саб реквест сортировщик lib сорт менеджер