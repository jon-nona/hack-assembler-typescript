"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertCInstructionToBinary = exports.parseCInstruction = exports.convertAInstructionToBinary = exports.isSymbol = exports.isAInstruction = void 0;

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

var cInstructionRegex = /*#__PURE__*/_wrapRegExp(/(?:(M|D|MD|A|AM|AD|AMD)=)?(0|1|\x2D1|![ADM]|[ADM][\+\x2D][ADM]|[ADM]\x2D[ADM]|D[&\|]A|A[&\|]D|D[&\|]M|M[&\|]D|[ADM][\+\x2D]?1?);?(JGT|JEQ|JGE|JLT|JNEJLE|JMP)?$/, {
  dest: 1,
  comp: 2,
  jump: 3
});

var isSymbolOrAInstruction = _ramda["default"].pipe(_ramda["default"].head, _ramda["default"].equals('@'));

var isAllDigits = _ramda["default"].pipe(_ramda["default"].match(/\d+/), _ramda["default"].length, _ramda["default"].gt(_ramda["default"].__, 0));

var isAllLetters = _ramda["default"].pipe(_ramda["default"].match(/[A-Za-z]+/), _ramda["default"].length, _ramda["default"].gt(_ramda["default"].__, 0));

var isAInstruction = _ramda["default"].allPass([isSymbolOrAInstruction, _ramda["default"].pipe(_ramda["default"].drop(1), isAllDigits)]);

exports.isAInstruction = isAInstruction;

var isSymbol = _ramda["default"].allPass([isSymbolOrAInstruction, _ramda["default"].pipe(_ramda["default"].drop(1), isAllLetters)]);

exports.isSymbol = isSymbol;

var decimalToBinaryString = function decimalToBinaryString(x) {
  return x.toString(2);
};

var convertAInstructionToBinary = _ramda["default"].pipe(_ramda["default"].drop(1), parseInt, decimalToBinaryString, (0, _string.leftPad)(16));

exports.convertAInstructionToBinary = convertAInstructionToBinary;

var parseCInstruction = _ramda["default"].pipe(_ramda["default"].match(cInstructionRegex), _ramda["default"].slice(1, 4), _ramda["default"].zipObj(['dest', 'comp', 'jump']), _ramda["default"].reject(_ramda["default"].isNil));

exports.parseCInstruction = parseCInstruction;
var lookupFunctions = [_ramda["default"].prop(_ramda["default"].__, _tables.compTable), _ramda["default"].propOr('000', _ramda["default"].__, _tables.destTable), _ramda["default"].propOr('000', _ramda["default"].__, _tables.jumpTable)];

var convertCInstructionToBinary = _ramda["default"].pipe(_ramda["default"].props(['comp', 'dest', 'jump']), _ramda["default"].zipWith(_ramda["default"].call, lookupFunctions), _ramda["default"].join(''), _ramda["default"].concat('111'));

exports.convertCInstructionToBinary = convertCInstructionToBinary;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9pbnN0cnVjdGlvbi1wYXJzZXIudHMiXSwibmFtZXMiOlsiY0luc3RydWN0aW9uUmVnZXgiLCJpc1N5bWJvbE9yQUluc3RydWN0aW9uIiwiUiIsInBpcGUiLCJoZWFkIiwiZXF1YWxzIiwiaXNBbGxEaWdpdHMiLCJtYXRjaCIsImxlbmd0aCIsImd0IiwiX18iLCJpc0FsbExldHRlcnMiLCJpc0FJbnN0cnVjdGlvbiIsImFsbFBhc3MiLCJkcm9wIiwiaXNTeW1ib2wiLCJkZWNpbWFsVG9CaW5hcnlTdHJpbmciLCJ4IiwidG9TdHJpbmciLCJjb252ZXJ0QUluc3RydWN0aW9uVG9CaW5hcnkiLCJwYXJzZUludCIsInBhcnNlQ0luc3RydWN0aW9uIiwic2xpY2UiLCJ6aXBPYmoiLCJyZWplY3QiLCJpc05pbCIsImxvb2t1cEZ1bmN0aW9ucyIsInByb3AiLCJjb21wVGFibGUiLCJwcm9wT3IiLCJkZXN0VGFibGUiLCJqdW1wVGFibGUiLCJjb252ZXJ0Q0luc3RydWN0aW9uVG9CaW5hcnkiLCJwcm9wcyIsInppcFdpdGgiLCJjYWxsIiwiam9pbiIsImNvbmNhdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGlCQUFpQiw0QkFBRyxpS0FBSDtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBQXZCOztBQUVBLElBQU1DLHNCQUFzQixHQUFHQyxrQkFBRUMsSUFBRixDQUFPRCxrQkFBRUUsSUFBVCxFQUFlRixrQkFBRUcsTUFBRixDQUFTLEdBQVQsQ0FBZixDQUEvQjs7QUFDQSxJQUFNQyxXQUFXLEdBQUdKLGtCQUFFQyxJQUFGLENBQU9ELGtCQUFFSyxLQUFGLENBQVEsS0FBUixDQUFQLEVBQXVCTCxrQkFBRU0sTUFBekIsRUFBaUNOLGtCQUFFTyxFQUFGLENBQUtQLGtCQUFFUSxFQUFQLEVBQVcsQ0FBWCxDQUFqQyxDQUFwQjs7QUFDQSxJQUFNQyxZQUFZLEdBQUdULGtCQUFFQyxJQUFGLENBQU9ELGtCQUFFSyxLQUFGLENBQVEsV0FBUixDQUFQLEVBQTZCTCxrQkFBRU0sTUFBL0IsRUFBdUNOLGtCQUFFTyxFQUFGLENBQUtQLGtCQUFFUSxFQUFQLEVBQVcsQ0FBWCxDQUF2QyxDQUFyQjs7QUFFTyxJQUFNRSxjQUFjLEdBQUdWLGtCQUFFVyxPQUFGLENBQVUsQ0FDdENaLHNCQURzQyxFQUV0Q0Msa0JBQUVDLElBQUYsQ0FBT0Qsa0JBQUVZLElBQUYsQ0FBTyxDQUFQLENBQVAsRUFBa0JSLFdBQWxCLENBRnNDLENBQVYsQ0FBdkI7Ozs7QUFLQSxJQUFNUyxRQUFpQixHQUFHYixrQkFBRVcsT0FBRixDQUFVLENBQ3pDWixzQkFEeUMsRUFFekNDLGtCQUFFQyxJQUFGLENBQU9ELGtCQUFFWSxJQUFGLENBQU8sQ0FBUCxDQUFQLEVBQWtCSCxZQUFsQixDQUZ5QyxDQUFWLENBQTFCOzs7O0FBS1AsSUFBTUsscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QixDQUFDQyxDQUFEO0FBQUEsU0FBdUJBLENBQUMsQ0FBQ0MsUUFBRixDQUFXLENBQVgsQ0FBdkI7QUFBQSxDQUE5Qjs7QUFFTyxJQUFNQywyQkFFRixHQUFHakIsa0JBQUVDLElBQUYsQ0FBT0Qsa0JBQUVZLElBQUYsQ0FBTyxDQUFQLENBQVAsRUFBa0JNLFFBQWxCLEVBQTRCSixxQkFBNUIsRUFBbUQscUJBQVEsRUFBUixDQUFuRCxDQUZQOzs7O0FBSUEsSUFBTUssaUJBQXVELEdBQUduQixrQkFBRUMsSUFBRixDQUNyRUQsa0JBQUVLLEtBQUYsQ0FBUVAsaUJBQVIsQ0FEcUUsRUFFckVFLGtCQUFFb0IsS0FBRixDQUFRLENBQVIsRUFBVyxDQUFYLENBRnFFLEVBR3JFcEIsa0JBQUVxQixNQUFGLENBQVMsQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixNQUFqQixDQUFULENBSHFFLEVBSXJFckIsa0JBQUVzQixNQUFGLENBQVN0QixrQkFBRXVCLEtBQVgsQ0FKcUUsQ0FBaEU7OztBQU9QLElBQU1DLGVBQWUsR0FBRyxDQUN0QnhCLGtCQUFFeUIsSUFBRixDQUFPekIsa0JBQUVRLEVBQVQsRUFBYWtCLGlCQUFiLENBRHNCLEVBRXRCMUIsa0JBQUUyQixNQUFGLENBQVMsS0FBVCxFQUFnQjNCLGtCQUFFUSxFQUFsQixFQUFzQm9CLGlCQUF0QixDQUZzQixFQUd0QjVCLGtCQUFFMkIsTUFBRixDQUFTLEtBQVQsRUFBZ0IzQixrQkFBRVEsRUFBbEIsRUFBc0JxQixpQkFBdEIsQ0FIc0IsQ0FBeEI7O0FBTU8sSUFBTUMsMkJBRUYsR0FBRzlCLGtCQUFFQyxJQUFGLENBQ1pELGtCQUFFK0IsS0FBRixDQUFRLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsTUFBakIsQ0FBUixDQURZLEVBRVovQixrQkFBRWdDLE9BQUYsQ0FBVWhDLGtCQUFFaUMsSUFBWixFQUFrQlQsZUFBbEIsQ0FGWSxFQUdaeEIsa0JBQUVrQyxJQUFGLENBQU8sRUFBUCxDQUhZLEVBSVpsQyxrQkFBRW1DLE1BQUYsQ0FBUyxLQUFULENBSlksQ0FGUCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHsgbGVmdFBhZCB9IGZyb20gJy4vc3RyaW5nJ1xuaW1wb3J0IHsgQ0luc3RydWN0aW9uVmFsdWUgfSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHsgbG9va3VwVGFibGUsIGNvbXBUYWJsZSwgZGVzdFRhYmxlLCBqdW1wVGFibGUgfSBmcm9tICcuL3RhYmxlcydcblxuY29uc3QgY0luc3RydWN0aW9uUmVnZXggPSAvKD86KD88ZGVzdD5NfER8TUR8QXxBTXxBRHxBTUQpPSk/KD88Y29tcD4wfDF8LTF8IVtBRE1dfFtBTURdWystXVtBTURdfFtBTURdLVtBTURdfERbJnxdQXxBWyZ8XUR8RFsmfF1NfE1bJnxdRHxbQURNXVsrLV0/MT8pOz8oPzxqdW1wPkpHVHxKRVF8SkdFfEpMVHxKTkVKTEV8Sk1QKT8kL1xuXG5jb25zdCBpc1N5bWJvbE9yQUluc3RydWN0aW9uID0gUi5waXBlKFIuaGVhZCwgUi5lcXVhbHMoJ0AnKSlcbmNvbnN0IGlzQWxsRGlnaXRzID0gUi5waXBlKFIubWF0Y2goL1xcZCsvKSwgUi5sZW5ndGgsIFIuZ3QoUi5fXywgMCkpXG5jb25zdCBpc0FsbExldHRlcnMgPSBSLnBpcGUoUi5tYXRjaCgvW0EtWmEtel0rLyksIFIubGVuZ3RoLCBSLmd0KFIuX18sIDApKVxuXG5leHBvcnQgY29uc3QgaXNBSW5zdHJ1Y3Rpb24gPSBSLmFsbFBhc3MoW1xuICBpc1N5bWJvbE9yQUluc3RydWN0aW9uLFxuICBSLnBpcGUoUi5kcm9wKDEpLCBpc0FsbERpZ2l0cyksXG5dKVxuXG5leHBvcnQgY29uc3QgaXNTeW1ib2w6IGJvb2xlYW4gPSBSLmFsbFBhc3MoW1xuICBpc1N5bWJvbE9yQUluc3RydWN0aW9uLFxuICBSLnBpcGUoUi5kcm9wKDEpLCBpc0FsbExldHRlcnMpLFxuXSlcblxuY29uc3QgZGVjaW1hbFRvQmluYXJ5U3RyaW5nID0gKHg6IG51bWJlcik6IHN0cmluZyA9PiB4LnRvU3RyaW5nKDIpXG5cbmV4cG9ydCBjb25zdCBjb252ZXJ0QUluc3RydWN0aW9uVG9CaW5hcnk6IChcbiAgYUluc3RydWN0aW9uOiBzdHJpbmcsXG4pID0+IHN0cmluZyA9IFIucGlwZShSLmRyb3AoMSksIHBhcnNlSW50LCBkZWNpbWFsVG9CaW5hcnlTdHJpbmcsIGxlZnRQYWQoMTYpKVxuXG5leHBvcnQgY29uc3QgcGFyc2VDSW5zdHJ1Y3Rpb246ICh2YWx1ZTogc3RyaW5nKSA9PiBDSW5zdHJ1Y3Rpb25WYWx1ZSA9IFIucGlwZShcbiAgUi5tYXRjaChjSW5zdHJ1Y3Rpb25SZWdleCksXG4gIFIuc2xpY2UoMSwgNCksXG4gIFIuemlwT2JqKFsnZGVzdCcsICdjb21wJywgJ2p1bXAnXSksXG4gIFIucmVqZWN0KFIuaXNOaWwpLFxuKVxuXG5jb25zdCBsb29rdXBGdW5jdGlvbnMgPSBbXG4gIFIucHJvcChSLl9fLCBjb21wVGFibGUpLFxuICBSLnByb3BPcignMDAwJywgUi5fXywgZGVzdFRhYmxlKSxcbiAgUi5wcm9wT3IoJzAwMCcsIFIuX18sIGp1bXBUYWJsZSksXG5dXG5cbmV4cG9ydCBjb25zdCBjb252ZXJ0Q0luc3RydWN0aW9uVG9CaW5hcnk6IChcbiAgdmFsdWU6IENJbnN0cnVjdGlvblZhbHVlLFxuKSA9PiBzdHJpbmcgPSBSLnBpcGUoXG4gIFIucHJvcHMoWydjb21wJywgJ2Rlc3QnLCAnanVtcCddKSxcbiAgUi56aXBXaXRoKFIuY2FsbCwgbG9va3VwRnVuY3Rpb25zKSxcbiAgUi5qb2luKCcnKSxcbiAgUi5jb25jYXQoJzExMScpLFxuKVxuIl19