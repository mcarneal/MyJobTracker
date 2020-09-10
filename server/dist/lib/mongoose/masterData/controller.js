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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./model"));
const winston_1 = require("../../winston");
class MasterDataDataBaseController {
    static fetchAllNavigationBarItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.find().sort({
                    index: `ascending`
                });
            }
            catch (e) {
                winston_1.W.error(`Error occurred while fetching all navigation bar items`);
                throw e;
            }
        });
    }
    static createNavigationBarItem({ name, index, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itemComponent = new model_1.default({
                    name,
                    index,
                });
                yield itemComponent.save();
                winston_1.W.info(`New Items component created: ${itemComponent}`);
                return itemComponent;
            }
            catch (e) {
                winston_1.W.error(`There was an error creating a Item Component: ${e}`);
                throw e;
            }
        });
    }
    static updateNavigationBarItem({ name, index, id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itemComponent = yield model_1.default.findById(id);
                if (itemComponent) {
                    winston_1.W.info(`Successfully updated item component ${itemComponent}`);
                    yield itemComponent.update({
                        name,
                        index,
                    });
                    return yield model_1.default.findById(id);
                }
            }
            catch (e) {
                winston_1.W.error(`Error occurred while updating navigation bar item: ${e} `);
                throw e;
            }
        });
    }
    static deleteNavigationBarItem({ id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itemComponent = yield model_1.default.findById(id);
                if (itemComponent)
                    itemComponent.deleteOne();
                winston_1.W.info(`Successfully deleted ${itemComponent}`);
                return itemComponent;
            }
            catch (e) {
                winston_1.W.error(`Error occurred while deleteing naviation bar item: ${e}`);
                throw e;
            }
        });
    }
}
exports.default = MasterDataDataBaseController;
