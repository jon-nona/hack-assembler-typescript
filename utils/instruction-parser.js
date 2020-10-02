"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSymbolsTable = exports.buildVariableSymbolsTable = exports.buildLabelSymbolTable = exports.convertCInstructionToBinary = exports.parseCInstruction = exports.convertAInstructionToBinary = exports.decimalToBinaryString = exports.isVariableOrLabelSymbolOrAInstruction = exports.isLabelSymbol = exports.labelRegex = exports.isVariableOrLabelSymbol = exports.isAInstruction = void 0;

var _ramda = _interopRequireDefault(require("ramda"));

var _string = require("./string");

var _tables = require("./tables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _wrapRegExp(re, groups) { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _RegExp = _wrapNativeSuper(RegExp); var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = _RegExp.call(this, re, flags); _groups.set(_this, groups || _groups.get(re)); return _this; } _inherits(BabelRegExp, _RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = []; args.push.apply(args, arguments); if (_typeof(args[args.length - 1]) !== "object") { args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/*
Regex for parsing a c-instruction and capturing the various instructions out of it. Assumes the instruction has already been
trimmed of spaces.
- Optional non capturing group surrounding a capturing group of dest should it exist.
- dest - named dest capturing group. captures the dest command
- comp - named comp capturing group. matches on all the possible values of comp and captures them
- jump - named jump capturing group. matches on all the possible values of jump and captures them
*/
var cInstructionRegex = /*#__PURE__*/_wrapRegExp(/(?:(M|D|MD|A|AM|AD|AMD)=)?(0|1|\x2D1|[AD]|![ADM]|[ADM][\+\x2D][ADM]|[ADM]\x2D[ADM]|D[&\|]A|A[&\|]D|D[&\|]M|M[&\|]D|[ADM][\+\x2D]?1?);?(JGT|JEQ|JGE|JLT|JNE|JLE|JMP)?$/, {
  dest: 1,
  comp: 2,
  jump: 3
});

var variableNameRegex = /^@[A-Za-z_.$0-9]+$/g;

var isSymbolOrAInstruction = _ramda["default"].pipe(_ramda["default"].head, _ramda["default"].equals('@'));

var isAllDigits = _ramda["default"].pipe(_ramda["default"].match(/^\d+$/), _ramda["default"].length, _ramda["default"].gt(_ramda["default"].__, 0));

var isValidVariableName = _ramda["default"].test(variableNameRegex);

var isAInstruction = _ramda["default"].allPass([isSymbolOrAInstruction, _ramda["default"].pipe(_ramda["default"].drop(1), isAllDigits)]);

exports.isAInstruction = isAInstruction;

var notInPredefinedSymbolsTable = _ramda["default"].complement(_ramda["default"].has(_ramda["default"].__, _tables.predefinedSymbolsTable));

var isVariableOrLabelSymbol = _ramda["default"].allPass([isSymbolOrAInstruction, _ramda["default"].allPass([_ramda["default"].complement(isAInstruction), isValidVariableName, notInPredefinedSymbolsTable])]);

exports.isVariableOrLabelSymbol = isVariableOrLabelSymbol;
var labelRegex = /^\([A-Za-z_.$0-9]+\)$/g;
exports.labelRegex = labelRegex;

var isLabelSymbol = _ramda["default"].test(labelRegex);

exports.isLabelSymbol = isLabelSymbol;

var isVariableOrLabelSymbolOrAInstruction = _ramda["default"].anyPass([isAInstruction, isVariableOrLabelSymbol]);

exports.isVariableOrLabelSymbolOrAInstruction = isVariableOrLabelSymbolOrAInstruction;

var decimalToBinaryString = function decimalToBinaryString(x) {
  return x.toString(2);
};

exports.decimalToBinaryString = decimalToBinaryString;

var convertAInstructionToBinary = _ramda["default"].pipe(_ramda["default"].drop(1), parseInt, decimalToBinaryString, (0, _string.leftPad)(16));

exports.convertAInstructionToBinary = convertAInstructionToBinary;

var parseCInstruction = _ramda["default"].pipe(_ramda["default"].match(cInstructionRegex), _ramda["default"].slice(1, 4), _ramda["default"].zipObj(['dest', 'comp', 'jump']), _ramda["default"].reject(_ramda["default"].isNil));

exports.parseCInstruction = parseCInstruction;
var lookupFunctions = [_ramda["default"].prop(_ramda["default"].__, _tables.compTable), _ramda["default"].propOr('000', _ramda["default"].__, _tables.destTable), _ramda["default"].propOr('000', _ramda["default"].__, _tables.jumpTable)];

var convertCInstructionToBinary = _ramda["default"].pipe(_ramda["default"].props(['comp', 'dest', 'jump']), _ramda["default"].zipWith(_ramda["default"].call, lookupFunctions), _ramda["default"].join(''), _ramda["default"].concat('111'));

exports.convertCInstructionToBinary = convertCInstructionToBinary;

var reduceIndexed = _ramda["default"].addIndex(_ramda["default"].reduce);

var parenthesesRegex = /[()]/g;

var stripParentheses = _ramda["default"].replace(parenthesesRegex, '');

var currentLabelCount = _ramda["default"].pipe(_ramda["default"].keys, _ramda["default"].length);

var calculateLabelAddress = function calculateLabelAddress(currentAddress, table) {
  return _ramda["default"].subtract(currentAddress, currentLabelCount(table));
};

var addLabelToTable = _ramda["default"].curry(function (label, currentAddress, table) {
  return _ramda["default"].pipe(stripParentheses, _ramda["default"].concat('@'), _ramda["default"].assoc(_ramda["default"].__, calculateLabelAddress(currentAddress, table), table))(label);
});

var buildLabelSymbolTable = reduceIndexed(function (table, line, index) {
  return _ramda["default"].ifElse(isLabelSymbol, addLabelToTable(_ramda["default"].__, index, table), _ramda["default"].always(table))(line);
}, {});
exports.buildLabelSymbolTable = buildLabelSymbolTable;

var addVariableToTable = _ramda["default"].curry(function (variable, table) {
  return _ramda["default"].pipe(_ramda["default"].assoc(_ramda["default"].__, _ramda["default"].add(16, _ramda["default"].length(_ramda["default"].keys(table))), table))(variable);
});

var doesNotHaveProperty = _ramda["default"].complement(_ramda["default"].has);

var buildVariableSymbolsTable = _ramda["default"].curry(function (labelSymbols, instructions) {
  return _ramda["default"].reduce(function (table, line) {
    return _ramda["default"].ifElse(_ramda["default"].allPass([isVariableOrLabelSymbol, doesNotHaveProperty(_ramda["default"].__, labelSymbols), doesNotHaveProperty(_ramda["default"].__, table)]), addVariableToTable(_ramda["default"].__, table), _ramda["default"].always(table))(line);
  }, {})(instructions);
});

exports.buildVariableSymbolsTable = buildVariableSymbolsTable;

var buildLabelSymbolsTableAndMergePredefinedSymbols = _ramda["default"].pipe(buildLabelSymbolTable, _ramda["default"].mergeRight(_tables.predefinedSymbolsTable));

var buildSymbolsTable = _ramda["default"].pipe(_ramda["default"].juxt([buildLabelSymbolsTableAndMergePredefinedSymbols, _ramda["default"].identity]), _ramda["default"].juxt([_ramda["default"].head, _ramda["default"].apply(buildVariableSymbolsTable)]), _ramda["default"].mergeAll);

exports.buildSymbolsTable = buildSymbolsTable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9pbnN0cnVjdGlvbi1wYXJzZXIudHMiXSwibmFtZXMiOlsiY0luc3RydWN0aW9uUmVnZXgiLCJ2YXJpYWJsZU5hbWVSZWdleCIsImlzU3ltYm9sT3JBSW5zdHJ1Y3Rpb24iLCJSIiwicGlwZSIsImhlYWQiLCJlcXVhbHMiLCJpc0FsbERpZ2l0cyIsIm1hdGNoIiwibGVuZ3RoIiwiZ3QiLCJfXyIsImlzVmFsaWRWYXJpYWJsZU5hbWUiLCJ0ZXN0IiwiaXNBSW5zdHJ1Y3Rpb24iLCJhbGxQYXNzIiwiZHJvcCIsIm5vdEluUHJlZGVmaW5lZFN5bWJvbHNUYWJsZSIsImNvbXBsZW1lbnQiLCJoYXMiLCJwcmVkZWZpbmVkU3ltYm9sc1RhYmxlIiwiaXNWYXJpYWJsZU9yTGFiZWxTeW1ib2wiLCJsYWJlbFJlZ2V4IiwiaXNMYWJlbFN5bWJvbCIsImlzVmFyaWFibGVPckxhYmVsU3ltYm9sT3JBSW5zdHJ1Y3Rpb24iLCJhbnlQYXNzIiwiZGVjaW1hbFRvQmluYXJ5U3RyaW5nIiwieCIsInRvU3RyaW5nIiwiY29udmVydEFJbnN0cnVjdGlvblRvQmluYXJ5IiwicGFyc2VJbnQiLCJwYXJzZUNJbnN0cnVjdGlvbiIsInNsaWNlIiwiemlwT2JqIiwicmVqZWN0IiwiaXNOaWwiLCJsb29rdXBGdW5jdGlvbnMiLCJwcm9wIiwiY29tcFRhYmxlIiwicHJvcE9yIiwiZGVzdFRhYmxlIiwianVtcFRhYmxlIiwiY29udmVydENJbnN0cnVjdGlvblRvQmluYXJ5IiwicHJvcHMiLCJ6aXBXaXRoIiwiY2FsbCIsImpvaW4iLCJjb25jYXQiLCJyZWR1Y2VJbmRleGVkIiwiYWRkSW5kZXgiLCJyZWR1Y2UiLCJwYXJlbnRoZXNlc1JlZ2V4Iiwic3RyaXBQYXJlbnRoZXNlcyIsInJlcGxhY2UiLCJjdXJyZW50TGFiZWxDb3VudCIsImtleXMiLCJjYWxjdWxhdGVMYWJlbEFkZHJlc3MiLCJjdXJyZW50QWRkcmVzcyIsInRhYmxlIiwic3VidHJhY3QiLCJhZGRMYWJlbFRvVGFibGUiLCJjdXJyeSIsImxhYmVsIiwiYXNzb2MiLCJidWlsZExhYmVsU3ltYm9sVGFibGUiLCJsaW5lIiwiaW5kZXgiLCJpZkVsc2UiLCJhbHdheXMiLCJhZGRWYXJpYWJsZVRvVGFibGUiLCJ2YXJpYWJsZSIsImFkZCIsImRvZXNOb3RIYXZlUHJvcGVydHkiLCJidWlsZFZhcmlhYmxlU3ltYm9sc1RhYmxlIiwibGFiZWxTeW1ib2xzIiwiaW5zdHJ1Y3Rpb25zIiwiYnVpbGRMYWJlbFN5bWJvbHNUYWJsZUFuZE1lcmdlUHJlZGVmaW5lZFN5bWJvbHMiLCJtZXJnZVJpZ2h0IiwiYnVpbGRTeW1ib2xzVGFibGUiLCJqdXh0IiwiaWRlbnRpdHkiLCJhcHBseSIsIm1lcmdlQWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUE7Ozs7Ozs7O0FBUUEsSUFBTUEsaUJBQWlCLDRCQUFHLHVLQUFIO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFBdkI7O0FBRUEsSUFBTUMsaUJBQWlCLEdBQUcscUJBQTFCOztBQUNBLElBQU1DLHNCQUFzQixHQUFHQyxrQkFBRUMsSUFBRixDQUFPRCxrQkFBRUUsSUFBVCxFQUFlRixrQkFBRUcsTUFBRixDQUFTLEdBQVQsQ0FBZixDQUEvQjs7QUFDQSxJQUFNQyxXQUFXLEdBQUdKLGtCQUFFQyxJQUFGLENBQU9ELGtCQUFFSyxLQUFGLENBQVEsT0FBUixDQUFQLEVBQXlCTCxrQkFBRU0sTUFBM0IsRUFBbUNOLGtCQUFFTyxFQUFGLENBQUtQLGtCQUFFUSxFQUFQLEVBQVcsQ0FBWCxDQUFuQyxDQUFwQjs7QUFDQSxJQUFNQyxtQkFBbUIsR0FBR1Qsa0JBQUVVLElBQUYsQ0FBT1osaUJBQVAsQ0FBNUI7O0FBRU8sSUFBTWEsY0FBYyxHQUFHWCxrQkFBRVksT0FBRixDQUFVLENBQ3RDYixzQkFEc0MsRUFFdENDLGtCQUFFQyxJQUFGLENBQU9ELGtCQUFFYSxJQUFGLENBQU8sQ0FBUCxDQUFQLEVBQWtC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QUd0RSxrQkFBRTBELEtBQUYsQ0FDdkMsVUFBQ2EsWUFBRCxFQUE0QkMsWUFBNUI7QUFBQSxTQUNFeEUsa0JBQUUrQyxNQUFGLENBQ0UsVUFBQ1EsS0FBRCxFQUFtQ08sSUFBbkM7QUFBQSxXQUNFOUQsa0JBQUVnRSxNQUFGLENBQ0VoRSxrQkFBRVksT0FBRixDQUFVLENBQ1JNLHVCQURRLEVBRVJtRCxtQkFBbUIsQ0FBQ3JFLGtCQUFFUSxFQUFILEVBQU8rRCxZQUFQLENBRlgsRUFHUkYsbUJBQW1CLENBQUNyRSxrQkFBRVEsRUFBSCxFQUFPK0MsS0FBUCxDQUhYLENBQVYsQ0FERixFQU1FVyxrQkFBa0IsQ0FBQ2xFLGtCQUFFUSxFQUFILEVBQU8rQyxLQUFQLENBTnBCLEVBT0V2RCxrQkFBRWlFLE1BQUYsQ0FBU1YsS0FBVCxDQVBGLEVBUUVPLElBUkYsQ0FERjtBQUFBLEdBREYsRUFXRSxFQVhGLEVBWUVVLFlBWkYsQ0FERjtBQUFBLENBRHVDLENBQWxDOzs7O0FBaUJQLElBQU1DLCtDQUErQyxHQUFHekUsa0JBQUVDLElBQUYsQ0FDdEQ0RCxxQkFEc0QsRUFFdEQ3RCxrQkFBRTBFLFVBQUYsQ0FBYXpELDhCQUFiLENBRnNELENBQXhEOztBQUtPLElBQU0wRCxpQkFFRyxHQUFHM0Usa0JBQUVDLElBQUYsQ0FDakJELGtCQUFFNEUsSUFBRixDQUFPLENBQUNILCtDQUFELEVBQWtEekUsa0JBQUU2RSxRQUFwRCxDQUFQLENBRGlCLEVBRWpCN0Usa0JBQUU0RSxJQUFGLENBQU8sQ0FBQzVFLGtCQUFFRSxJQUFILEVBQVNGLGtCQUFFOEUsS0FBRixDQUFRUix5QkFBUixDQUFULENBQVAsQ0FGaUIsRUFHakJ0RSxrQkFBRStFLFFBSGUsQ0FGWiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHsgbGVmdFBhZCB9IGZyb20gJy4vc3RyaW5nJ1xuaW1wb3J0IHtcbiAgY29tcFRhYmxlLFxuICBkZXN0VGFibGUsXG4gIGp1bXBUYWJsZSxcbiAgcHJlZGVmaW5lZFN5bWJvbHNUYWJsZSxcbn0gZnJvbSAnLi90YWJsZXMnXG5pbXBvcnQgeyBDSW5zdHJ1Y3Rpb25WYWx1ZSwgU3ltYm9sVGFibGUgfSBmcm9tICcuL3R5cGVzJ1xuXG4vKlxuUmVnZXggZm9yIHBhcnNpbmcgYSBjLWluc3RydWN0aW9uIGFuZCBjYXB0dXJpbmcgdGhlIHZhcmlvdXMgaW5zdHJ1Y3Rpb25zIG91dCBvZiBpdC4gQXNzdW1lcyB0aGUgaW5zdHJ1Y3Rpb24gaGFzIGFscmVhZHkgYmVlblxudHJpbW1lZCBvZiBzcGFjZXMuXG4tIE9wdGlvbmFsIG5vbiBjYXB0dXJpbmcgZ3JvdXAgc3Vycm91bmRpbmcgYSBjYXB0dXJpbmcgZ3JvdXAgb2YgZGVzdCBzaG91bGQgaXQgZXhpc3QuXG4tIGRlc3QgLSBuYW1lZCBkZXN0IGNhcHR1cmluZyBncm91cC4gY2FwdHVyZXMgdGhlIGRlc3QgY29tbWFuZFxuLSBjb21wIC0gbmFtZWQgY29tcCBjYXB0dXJpbmcgZ3JvdXAuIG1hdGNoZXMgb24gYWxsIHRoZSBwb3NzaWJsZSB2YWx1ZXMgb2YgY29tcCBhbmQgY2FwdHVyZXMgdGhlbVxuLSBqdW1wIC0gbmFtZWQganVtcCBjYXB0dXJpbmcgZ3JvdXAuIG1hdGNoZXMgb24gYWxsIHRoZSBwb3NzaWJsZSB2YWx1ZXMgb2YganVtcCBhbmQgY2FwdHVyZXMgdGhlbVxuKi9cbmNvbnN0IGNJbnN0cnVjdGlvblJlZ2V4ID0gLyg/Oig/PGRlc3Q+TXxEfE1EfEF8QU18QUR8QU1EKT0pPyg/PGNvbXA+MHwxfC0xfFtBRF18IVtBRE1dfFtBTURdWystXVtBTURdfFtBTURdLVtBTURdfERbJnxdQXxBWyZ8XUR8RFsmfF1NfE1bJnxdRHxbQURNXVsrLV0/MT8pOz8oPzxqdW1wPkpHVHxKRVF8SkdFfEpMVHxKTkV8SkxFfEpNUCk/JC9cblxuY29uc3QgdmFyaWFibGVOYW1lUmVnZXggPSAvXkBbQS1aYS16Xy4kMC05XSskL2dcbmNvbnN0IGlzU3ltYm9sT3JBSW5zdHJ1Y3Rpb24gPSBSLnBpcGUoUi5oZWFkLCBSLmVxdWFscygnQCcpKVxuY29uc3QgaXNBbGxEaWdpdHMgPSBSLnBpcGUoUi5tYXRjaCgvXlxcZCskLyksIFIubGVuZ3RoLCBSLmd0KFIuX18sIDApKVxuY29uc3QgaXNWYWxpZFZhcmlhYmxlTmFtZSA9IFIudGVzdCh2YXJpYWJsZU5hbWVSZWdleClcblxuZXhwb3J0IGNvbnN0IGlzQUluc3RydWN0aW9uID0gUi5hbGxQYXNzKFtcbiAgaXNTeW1ib2xPckFJbnN0cnVjdGlvbixcbiAgUi5waXBlKFIuZHJvcCgxKSwgaXNBbGxEaWdpdHMpLFxuXSlcblxuY29uc3Qgbm90SW5QcmVkZWZpbmVkU3ltYm9sc1RhYmxlID0gUi5jb21wbGVtZW50KFxuICBSLmhhcyhSLl9fLCBwcmVkZWZpbmVkU3ltYm9sc1RhYmxlKSxcbilcblxuZXhwb3J0IGNvbnN0IGlzVmFyaWFibGVPckxhYmVsU3ltYm9sOiAodmFsdWU6IHN0cmluZykgPT4gYm9vbGVhbiA9IFIuYWxsUGFzcyhbXG4gIGlzU3ltYm9sT3JBSW5zdHJ1Y3Rpb24sXG4gIFIuYWxsUGFzcyhbXG4gICAgUi5jb21wbGVtZW50KGlzQUluc3RydWN0aW9uKSxcbiAgICBpc1ZhbGlkVmFyaWFibGVOYW1lLFxuICAgIG5vdEluUHJlZGVmaW5lZFN5bWJvbHNUYWJsZSxcbiAgXSksXG5dKVxuXG5leHBvcnQgY29uc3QgbGFiZWxSZWdleCA9IC9eXFwoW0EtWmEtel8uJDAtOV0rXFwpJC9nXG5leHBvcnQgY29uc3QgaXNMYWJlbFN5bWJvbDogKHZhbHVlOiBzdHJpbmcpID0+IGJvb2xlYW4gPSBSLnRlc3QobGFiZWxSZWdleClcblxuZXhwb3J0IGNvbnN0IGlzVmFyaWFibGVPckxhYmVsU3ltYm9sT3JBSW5zdHJ1Y3Rpb24gPSBSLmFueVBhc3MoW1xuICBpc0FJbnN0cnVjdGlvbixcbiAgaXNWYXJpYWJsZU9yTGFiZWxTeW1ib2wsXG5dKVxuXG5leHBvcnQgY29uc3QgZGVjaW1hbFRvQmluYXJ5U3RyaW5nID0gKHg6IG51bWJlcik6IHN0cmluZyA9PiB4LnRvU3RyaW5nKDIpXG5cbmV4cG9ydCBjb25zdCBjb252ZXJ0QUluc3RydWN0aW9uVG9CaW5hcnk6IChcbiAgYUluc3RydWN0aW9uOiBzdHJpbmcsXG4pID0+IHN0cmluZyA9IFIucGlwZShSLmRyb3AoMSksIHBhcnNlSW50LCBkZWNpbWFsVG9CaW5hcnlTdHJpbmcsIGxlZnRQYWQoMTYpKVxuXG5leHBvcnQgY29uc3QgcGFyc2VDSW5zdHJ1Y3Rpb246ICh2YWx1ZTogc3RyaW5nKSA9PiBDSW5zdHJ1Y3Rpb25WYWx1ZSA9IFIucGlwZShcbiAgUi5tYXRjaChjSW5zdHJ1Y3Rpb25SZWdleCksXG4gIFIuc2xpY2UoMSwgNCksXG4gIFIuemlwT2JqKFsnZGVzdCcsICdjb21wJywgJ2p1bXAnXSksXG4gIFIucmVqZWN0KFIuaXNOaWwpLFxuKVxuXG5jb25zdCBsb29rdXBGdW5jdGlvbnMgPSBbXG4gIFIucHJvcChSLl9fLCBjb21wVGFibGUpLFxuICBSLnByb3BPcignMDAwJywgUi5fXywgZGVzdFRhYmxlKSxcbiAgUi5wcm9wT3IoJzAwMCcsIFIuX18sIGp1bXBUYWJsZSksXG5dXG5cbmV4cG9ydCBjb25zdCBjb252ZXJ0Q0luc3RydWN0aW9uVG9CaW5hcnk6IChcbiAgdmFsdWU6IENJbnN0cnVjdGlvblZhbHVlLFxuKSA9PiBzdHJpbmcgPSBSLnBpcGUoXG4gIFIucHJvcHMoWydjb21wJywgJ2Rlc3QnLCAnanVtcCddKSxcbiAgUi56aXBXaXRoKFIuY2FsbCwgbG9va3VwRnVuY3Rpb25zKSxcbiAgUi5qb2luKCcnKSxcbiAgUi5jb25jYXQoJzExMScpLFxuKVxuXG5jb25zdCByZWR1Y2VJbmRleGVkID0gUi5hZGRJbmRleChSLnJlZHVjZSlcbmNvbnN0IHBhcmVudGhlc2VzUmVnZXggPSAvWygpXS9nXG5jb25zdCBzdHJpcFBhcmVudGhlc2VzID0gUi5yZXBsYWNlKHBhcmVudGhlc2VzUmVnZXgsICcnKVxuY29uc3QgY3VycmVudExhYmVsQ291bnQgPSBSLnBpcGUoUi5rZXlzLCBSLmxlbmd0aClcbmNvbnN0IGNhbGN1bGF0ZUxhYmVsQWRkcmVzcyA9IChjdXJyZW50QWRkcmVzczogbnVtYmVyLCB0YWJsZTogU3ltYm9sVGFibGUpID0+XG4gIFIuc3VidHJhY3QoY3VycmVudEFkZHJlc3MsIGN1cnJlbnRMYWJlbENvdW50KHRhYmxlKSlcbmNvbnN0IGFkZExhYmVsVG9UYWJsZSA9IFIuY3VycnkoXG4gIChsYWJlbDogc3RyaW5nLCBjdXJyZW50QWRkcmVzczogbnVtYmVyLCB0YWJsZTogU3ltYm9sVGFibGUpID0+XG4gICAgUi5waXBlKFxuICAgICAgc3RyaXBQYXJlbnRoZXNlcyxcbiAgICAgIFIuY29uY2F0KCdAJyksXG4gICAgICBSLmFzc29jKFIuX18sIGNhbGN1bGF0ZUxhYmVsQWRkcmVzcyhjdXJyZW50QWRkcmVzcywgdGFibGUpLCB0YWJsZSksXG4gICAgKShsYWJlbCksXG4pXG5leHBvcnQgY29uc3QgYnVpbGRMYWJlbFN5bWJvbFRhYmxlOiAoXG4gIGluc3RydWN0aW9uczogc3RyaW5nW10sXG4pID0+IFN5bWJvbFRhYmxlID0gcmVkdWNlSW5kZXhlZChcbiAgKHRhYmxlOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9LCBsaW5lOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+XG4gICAgUi5pZkVsc2UoXG4gICAgICBpc0xhYmVsU3ltYm9sLFxuICAgICAgYWRkTGFiZWxUb1RhYmxlKFIuX18sIGluZGV4LCB0YWJsZSksXG4gICAgICBSLmFsd2F5cyh0YWJsZSksXG4gICAgKShsaW5lKSxcbiAge30sXG4pXG5cbmNvbnN0IGFkZFZhcmlhYmxlVG9UYWJsZSA9IFIuY3VycnkoKHZhcmlhYmxlOiBzdHJpbmcsIHRhYmxlOiBTeW1ib2xUYWJsZSkgPT5cbiAgUi5waXBlKFIuYXNzb2MoUi5fXywgUi5hZGQoMTYsIFIubGVuZ3RoKFIua2V5cyh0YWJsZSkpKSwgdGFibGUpKSh2YXJpYWJsZSksXG4pXG5cbmNvbnN0IGRvZXNOb3RIYXZlUHJvcGVydHkgPSBSLmNvbXBsZW1lbnQoUi5oYXMpXG5leHBvcnQgY29uc3QgYnVpbGRWYXJpYWJsZVN5bWJvbHNUYWJsZSA9IFIuY3VycnkoXG4gIChsYWJlbFN5bWJvbHM6IFN5bWJvbFRhYmxlLCBpbnN0cnVjdGlvbnM6IHN0cmluZ1tdKTogU3ltYm9sVGFibGUgPT5cbiAgICBSLnJlZHVjZShcbiAgICAgICh0YWJsZTogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSwgbGluZTogc3RyaW5nKSA9PlxuICAgICAgICBSLmlmRWxzZShcbiAgICAgICAgICBSLmFsbFBhc3MoW1xuICAgICAgICAgICAgaXNWYXJpYWJsZU9yTGFiZWxTeW1ib2wsXG4gICAgICAgICAgICBkb2VzTm90SGF2ZVByb3BlcnR5KFIuX18sIGxhYmVsU3ltYm9scyksXG4gICAgICAgICAgICBkb2VzTm90SGF2ZVByb3BlcnR5KFIuX18sIHRhYmxlKSxcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBhZGRWYXJpYWJsZVRvVGFibGUoUi5fXywgdGFibGUpLFxuICAgICAgICAgIFIuYWx3YXlzKHRhYmxlKSxcbiAgICAgICAgKShsaW5lKSxcbiAgICAgIHt9LFxuICAgICkoaW5zdHJ1Y3Rpb25zKSxcbilcblxuY29uc3QgYnVpbGRMYWJlbFN5bWJvbHNUYWJsZUFuZE1lcmdlUHJlZGVmaW5lZFN5bWJvbHMgPSBSLnBpcGUoXG4gIGJ1aWxkTGFiZWxTeW1ib2xUYWJsZSxcbiAgUi5tZXJnZVJpZ2h0KHByZWRlZmluZWRTeW1ib2xzVGFibGUpLFxuKVxuXG5leHBvcnQgY29uc3QgYnVpbGRTeW1ib2xzVGFibGU6IChcbiAgaW5zdHJ1Y3Rpb25zOiBzdHJpbmdbXSxcbikgPT4gU3ltYm9sVGFibGUgPSBSLnBpcGUoXG4gIFIuanV4dChbYnVpbGRMYWJlbFN5bWJvbHNUYWJsZUFuZE1lcmdlUHJlZGVmaW5lZFN5bWJvbHMsIFIuaWRlbnRpdHldKSxcbiAgUi5qdXh0KFtSLmhlYWQsIFIuYXBwbHkoYnVpbGRWYXJpYWJsZVN5bWJvbHNUYWJsZSldKSxcbiAgUi5tZXJnZUFsbCxcbilcbiJdfQ==