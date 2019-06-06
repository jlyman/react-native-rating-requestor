"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var keyPrefix = "@RatingRequestData.";
var eventCountKey = keyPrefix + "positiveEventCount";
var ratedTimestamp = keyPrefix + "ratedTimestamp";
var declinedTimestamp = keyPrefix + "declinedTimestamp";
/**
 * Private class that let's us interact with AsyncStorage on the device
 * @class
 */
var RatingsData = /** @class */ (function () {
    function RatingsData() {
        this.initialize();
    }
    // Get current count of positive events
    RatingsData.prototype.getCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var countString, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, react_native_1.AsyncStorage.getItem(eventCountKey)];
                    case 1:
                        countString = _a.sent();
                        if (countString !== null) {
                            return [2 /*return*/, parseInt(countString, 10)];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        console.warn("Couldn't retrieve positive events count. Error:", ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Increment count of positive events
    RatingsData.prototype.incrementCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentCount, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getCount()];
                    case 1:
                        currentCount = _a.sent();
                        if (typeof currentCount === "undefined") {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, react_native_1.AsyncStorage.setItem(eventCountKey, (currentCount + 1).toString())];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, currentCount + 1];
                    case 3:
                        ex_2 = _a.sent();
                        console.warn("Could not increment count. Error:", ex_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RatingsData.prototype.getActionTimestamps = function () {
        return __awaiter(this, void 0, void 0, function () {
            var timestamps, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, react_native_1.AsyncStorage.multiGet([
                                ratedTimestamp,
                                declinedTimestamp
                            ])];
                    case 1:
                        timestamps = _a.sent();
                        return [2 /*return*/, timestamps];
                    case 2:
                        ex_3 = _a.sent();
                        console.warn("Could not retrieve rated or declined timestamps.", ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RatingsData.prototype.recordDecline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, react_native_1.AsyncStorage.setItem(declinedTimestamp, Date.now().toString())];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        console.warn("Couldn't set declined timestamp.", ex_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RatingsData.prototype.recordRated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, react_native_1.AsyncStorage.setItem(ratedTimestamp, Date.now().toString())];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        console.warn("Couldn't set rated timestamp.", ex_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Initialize keys, if necessary
    RatingsData.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keys, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, react_native_1.AsyncStorage.getAllKeys()];
                    case 1:
                        keys = _a.sent();
                        if (!!keys.some(function (key) { return key === eventCountKey; })) return [3 /*break*/, 3];
                        return [4 /*yield*/, react_native_1.AsyncStorage.setItem(eventCountKey, "0")];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_6 = _a.sent();
                        // report error or maybe just initialize the values?
                        console.warn("Uh oh, something went wrong initializing values!", ex_6);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return RatingsData;
}());
exports.default = new RatingsData();
