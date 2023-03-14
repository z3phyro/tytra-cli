import { clearEntries } from "./utils";

test('Checks that it clears the JSON Object', () => {
	const val = { someEntry: "With a value"};

	clearEntries(val);


	expect(val['someEntry']).toBe("-");
})
