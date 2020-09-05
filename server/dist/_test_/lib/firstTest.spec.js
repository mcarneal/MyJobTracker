"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { describe, test, beforeAll, afterEach } = require("@jest/globals");
const User = require(`../../lib/mongoose/users/model`);
const mongoose = require(`mongoose`);
const { MONGO_URL: url } = process.env;
describe(`This is the first test`, () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose.connection.close();
    }));
    test(`this is the first test`, () => __awaiter(void 0, void 0, void 0, function* () {
        const input = 0;
        const output = 0;
        const user = new User({
            userName: `test database user`,
        });
        yield user.save();
        expect(input).toEqual(output);
    }));
});
