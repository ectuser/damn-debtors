"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.DebtInstance = void 0;
var DebtInstance = /** @class */ (function () {
    function DebtInstance(source) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.source = source;
        this.id = (_a = this.source) === null || _a === void 0 ? void 0 : _a.id;
        this.name = (_b = this.source) === null || _b === void 0 ? void 0 : _b.name;
        this.debt = (_c = this.source) === null || _c === void 0 ? void 0 : _c.debt;
        this.loanDate = ((_d = this.source) === null || _d === void 0 ? void 0 : _d.loanDate) ? new Date((_e = this.source) === null || _e === void 0 ? void 0 : _e.loanDate)
            : null;
        this.paymentDate = ((_f = this.source) === null || _f === void 0 ? void 0 : _f.paymentDate) ? new Date((_g = this.source) === null || _g === void 0 ? void 0 : _g.paymentDate)
            : null;
    }
    DebtInstance.prototype.toJSON = function () {
        var obj = __assign(__assign({}, this), { loanDate: this.loanDate ? this.loanDate.toDateString() : null, paymentDate: this.paymentDate ? this.paymentDate.toDateString() : null });
        console.log(obj);
        return obj;
    };
    return DebtInstance;
}());
exports.DebtInstance = DebtInstance;
