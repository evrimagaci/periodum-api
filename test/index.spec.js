"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
describe('Testing root files', () => {
    it('should return 4 when 2 times 2 multiplied', () => {
        const result = 2 * 2;
        // This is here on purpose to ensure to test working
        (0, chai_1.expect)(result).equals(4);
    });
});
