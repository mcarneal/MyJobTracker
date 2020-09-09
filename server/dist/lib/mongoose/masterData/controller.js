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
                return yield model_1.default.find();
            }
            catch (e) {
                winston_1.W.error(`Error occurred while fetching all navigation bar items`);
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
            }
        });
    }
}
exports.default = MasterDataDataBaseController;