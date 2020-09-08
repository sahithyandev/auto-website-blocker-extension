import intern from 'intern';
import { extractURL } from "./../utils";

const { describe, it } = intern.getPlugin('interface.bdd');
const { expect } = intern.getPlugin('chai');

const extractURLTests = [
    { input: '', output: '' },
    { input: "http://mozilla.org/", output: "*://*.mozilla.org/*" },
    { input: "https://mozilla.org/", output: "*://*.mozilla.org/*" },
    { input: "http://a.mozilla.org/", output: "*://*.mozilla.org/*" },
    { input: "http://a.b.mozilla.org/", output: "*://*.mozilla.org/*" },
    { input: "http://b.mozilla.org/path/", output: "*://*.mozilla.org/*" },
    { input: "ws://ws.mozilla.org/", output: "*://*.mozilla.org/*" },
    { input: "wss://secure.mozilla.org/something", output: "*://*.mozilla.org/*" }
] 

describe("URLExtractor", () => {
    for (let test of extractURLTests) {
        it(`extractURL(${test.input})`, () => {
            let result = extractURL(test.input);
            expect(result).to.equal(test.output);
        })
    }
})