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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var RatingsData_1 = __importDefault(require("./RatingsData"));
var ButtonTypes;
(function (ButtonTypes) {
    ButtonTypes["NEUTRAL_DELAY"] = "NEUTRAL_DELAY";
    ButtonTypes["NEGATIVE_DECLINE"] = "NEGATIVE_DECLINE";
    ButtonTypes["POSITIVE_ACCEPT"] = "POSITIVE_ACCEPT";
})(ButtonTypes = exports.ButtonTypes || (exports.ButtonTypes = {}));
var _config = {
    title: "Rate Me",
    message: "We hope you're loving our app. If you are, would you mind taking a quick moment to leave us a positive review?",
    appStoreId: null,
    actionLabels: {
        decline: "Don't ask again",
        delay: "Maybe later...",
        accept: "Sure!"
    },
    timingFunction: function (currentCount) {
        return (currentCount > 1 &&
            parseInt((Math.log(currentCount) / Math.log(3)).toFixed(4)) % 1 == 0);
    },
    buttonOrder: {
        ios: [
            ButtonTypes.NEGATIVE_DECLINE,
            ButtonTypes.NEUTRAL_DELAY,
            ButtonTypes.POSITIVE_ACCEPT
        ],
        android: [
            ButtonTypes.NEGATIVE_DECLINE,
            ButtonTypes.NEUTRAL_DELAY,
            ButtonTypes.POSITIVE_ACCEPT
        ]
    },
    shouldBoldLastButton: true,
    storeAppName: "appName",
    storeCountry: "us"
};
function _isAwaitingRating() {
    return __awaiter(this, void 0, void 0, function () {
        var timestamps;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RatingsData_1.default.getActionTimestamps()];
                case 1:
                    timestamps = _a.sent();
                    // If no timestamps have been set yet we are still awaiting the user, return true
                    return [2 /*return*/, (timestamps &&
                            timestamps.every(function (timestamp) {
                                return timestamp[1] === null;
                            }))];
            }
        });
    });
}
/**
 * Creates the RatingRequestor object you interact with
 * @class
 */
var RatingRequestor = /** @class */ (function () {
    /**
     * @param  {string} appStoreId - Required. The ID used in the app's respective app store
     * @param  {object} options - Optional. Override the defaults. Takes the following shape, with all elements being optional:
     * 								{
     * 									title: {string},
     * 									message: {string},
     * 									actionLabels: {
     * 										decline: {string},
     * 										delay: {string},
     * 										accept: {string}
     * 									},
     * 									buttonOrder: {
     * 										ios: [buttonTypes],
     * 										android: [buttonTypes],
     * 									}
     * 									shouldBoldLastButton: {boolean},
     *                  storeAppName: {string},
     *                  storeCountry: {string},
     * 									timingFunction: {func}
     * 								}
     */
    function RatingRequestor(appStoreId, options) {
        // Check for required options
        if (!appStoreId) {
            throw "You must specify your app's store ID on construction to use the Rating Requestor.";
        }
        // Merge defaults with user-supplied config
        Object.assign(_config, options);
        _config.appStoreId = appStoreId;
        this.storeUrl = react_native_1.Platform.select({
            ios: "https://itunes.apple.com/" + _config.storeCountry + "/app/" + _config.storeAppName + "/id" + _config.appStoreId,
            android: "market://details?id=" + _config.appStoreId
        });
    }
    /**
     * Shows the rating dialog when called. Normally called by `handlePositiveEvent()`, but
     * can be called on its own as well. Use caution when doing so--you don't want to ask
     * the user for a rating too frequently or you might annoy them. (This is handy, however,
     * if the user proactively seeks out something in your app to leave a rating, for example.)
     *
     * @param {function(didAppear: boolean, result: string)} callback Optional. Callback that reports whether the dialog appeared and what the result was.
     */
    RatingRequestor.prototype.showRatingDialog = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        var buttonDefaults = {
            NEGATIVE_DECLINE: {
                text: _config.actionLabels.decline,
                onPress: function () {
                    RatingsData_1.default.recordDecline();
                    callback(true, "decline");
                }
            },
            NEUTRAL_DELAY: {
                text: _config.actionLabels.delay,
                onPress: function () {
                    callback(true, "delay");
                }
            },
            POSITIVE_ACCEPT: {
                text: _config.actionLabels.accept,
                onPress: function () {
                    RatingsData_1.default.recordRated();
                    callback(true, "accept");
                    react_native_1.Linking.openURL(_this.storeUrl);
                },
                style: "default"
            }
        };
        var buttons = react_native_1.Platform.select(_config.buttonOrder).map(function (bo) { return buttonDefaults[bo]; });
        if (_config.shouldBoldLastButton) {
            buttons[2].style = "cancel";
        }
        react_native_1.Alert.alert(_config.title, _config.message, buttons);
    };
    /**
     * Call when a positive interaction has occurred within your application. Depending on the number
     * of times this has occurred and your timing function, this may display a rating request dialog.
     *
     * @param {function(didAppear: boolean, result: string)} callback Optional. Callback that reports whether the dialog appeared and what the result was.
     */
    RatingRequestor.prototype.handlePositiveEvent = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        return __awaiter(this, void 0, void 0, function () {
            var currentCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _isAwaitingRating()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, RatingsData_1.default.incrementCount()];
                    case 2:
                        currentCount = _a.sent();
                        if (currentCount && _config.timingFunction(currentCount)) {
                            this.showRatingDialog(callback);
                        }
                        else
                            callback(false);
                        return [3 /*break*/, 4];
                    case 3:
                        callback(false);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return RatingRequestor;
}());
exports.default = RatingRequestor;
