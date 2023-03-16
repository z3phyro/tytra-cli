import { clearEntries, generateInterface } from "./utils";

test('Checks that it clears the JSON Object', () => {
	const val = { someEntry: "With a value" };

	clearEntries(val);


	expect(val['someEntry']).toBe("-");
})

test('Checks that it generates the interface from the JSON Object', () => {
	console.log(generateInterface({ uno: "uno", dos: "", general: { hello: "Ho la", "bye": "Bye!" } }));
});

