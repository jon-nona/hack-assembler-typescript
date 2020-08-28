"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessFile$ = exports.writeFile$ = exports.readFile$ = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var fs = _interopRequireWildcard(require("fs"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _yargs = _interopRequireDefault(require("yargs"));

var _arguments = require("./utils/arguments");

var _lineParser = require("./utils/line-parser");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var readFile$ = (0, _rxjs.bindNodeCallback)(fs.readFile);
exports.readFile$ = readFile$;
var writeFile$ = (0, _rxjs.bindNodeCallback)(fs.writeFile);
exports.writeFile$ = writeFile$;
var accessFile$ = (0, _rxjs.bindNodeCallback)(fs.access);
exports.accessFile$ = accessFile$;
var boldStatusMessage = _chalk["default"].bold.white;
var errorMessage = _chalk["default"].bold.red;
var infoMessage = _chalk["default"].white;

var args = _yargs["default"].options({
  input: {
    type: 'string',
    demandOption: true,
    alias: 'i'
  },
  output: {
    type: 'string',
    demandOption: false,
    alias: 'o'
  }
}).argv;

var argumentsAsArray = [args.input];

if (args.output) {
  argumentsAsArray = [].concat(_toConsumableArray(argumentsAsArray), [args.output]);
}

(0, _rxjs.of)(argumentsAsArray).pipe((0, _operators.tap)(function () {
  return console.log(boldStatusMessage('Welcome to the Typescript Hack Assembler ... starting up ...\n'));
}), (0, _operators.map)(_arguments.parseInputArguments), (0, _operators.tap)(function (parsedArguments) {
  return console.log(infoMessage("Checking file exists ... ".concat(parsedArguments.inputFile)));
}), (0, _operators.flatMap)(function (parsedArguments) {
  return accessFile$(parsedArguments.inputFile).pipe((0, _operators.tap)(function () {
    console.log(infoMessage("File Exists"));
    console.log(infoMessage("Reading file from ".concat(parsedArguments.inputFile)));
  }), (0, _operators.flatMap)(function () {
    return readFile$(parsedArguments.inputFile);
  }), (0, _operators.tap)(function () {
    return console.log(infoMessage("Writing file to ".concat(parsedArguments.outputFile)));
  }), (0, _operators.flatMap)(function (buffer) {
    return (0, _rxjs.of)((0, _lineParser.cleanCommentsAndRemoveBlankLines)(buffer.toString()));
  }), (0, _operators.flatMap)(function (output) {
    return writeFile$(parsedArguments.outputFile, output).pipe((0, _operators.map)(function () {
      return "Success ... Output written to ".concat(parsedArguments.outputFile);
    }));
  }));
})).subscribe(function (output) {
  return console.log(boldStatusMessage("\n".concat(output)));
}, function (error) {
  return console.error(errorMessage(error));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJyZWFkRmlsZSQiLCJmcyIsInJlYWRGaWxlIiwid3JpdGVGaWxlJCIsIndyaXRlRmlsZSIsImFjY2Vzc0ZpbGUkIiwiYWNjZXNzIiwiYm9sZFN0YXR1c01lc3NhZ2UiLCJjaGFsayIsImJvbGQiLCJ3aGl0ZSIsImVycm9yTWVzc2FnZSIsInJlZCIsImluZm9NZXNzYWdlIiwiYXJncyIsInlhcmdzIiwib3B0aW9ucyIsImlucHV0IiwidHlwZSIsImRlbWFuZE9wdGlvbiIsImFsaWFzIiwib3V0cHV0IiwiYXJndiIsImFyZ3VtZW50c0FzQXJyYXkiLCJwaXBlIiwiY29uc29sZSIsImxvZyIsInBhcnNlSW5wdXRBcmd1bWVudHMiLCJwYXJzZWRBcmd1bWVudHMiLCJpbnB1dEZpbGUiLCJvdXRwdXRGaWxlIiwiYnVmZmVyIiwidG9TdHJpbmciLCJzdWJzY3JpYmUiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU8sSUFBTUEsU0FBUyxHQUFHLDRCQUFpQkMsRUFBRSxDQUFDQyxRQUFwQixDQUFsQjs7QUFDQSxJQUFNQyxVQUFVLEdBQUcsNEJBQWlCRixFQUFFLENBQUNHLFNBQXBCLENBQW5COztBQUNBLElBQU1DLFdBQVcsR0FBRyw0QkFBaUJKLEVBQUUsQ0FBQ0ssTUFBcEIsQ0FBcEI7O0FBRVAsSUFBTUMsaUJBQWlCLEdBQUdDLGtCQUFNQyxJQUFOLENBQVdDLEtBQXJDO0FBQ0EsSUFBTUMsWUFBWSxHQUFHSCxrQkFBTUMsSUFBTixDQUFXRyxHQUFoQztBQUNBLElBQU1DLFdBQVcsR0FBR0wsa0JBQU1FLEtBQTFCOztBQUVBLElBQU1JLElBQUksR0FBR0Msa0JBQU1DLE9BQU4sQ0FBYztBQUN6QkMsRUFBQUEsS0FBSyxFQUFFO0FBQUVDLElBQUFBLElBQUksRUFBRSxRQUFSO0FBQWtCQyxJQUFBQSxZQUFZLEVBQUUsSUFBaEM7QUFBc0NDLElBQUFBLEtBQUssRUFBRTtBQUE3QyxHQURrQjtBQUV6QkMsRUFBQUEsTUFBTSxFQUFFO0FBQUVILElBQUFBLElBQUksRUFBRSxRQUFSO0FBQWtCQyxJQUFBQSxZQUFZLEVBQUUsS0FBaEM7QUFBdUNDLElBQUFBLEtBQUssRUFBRTtBQUE5QztBQUZpQixDQUFkLEVBR1ZFLElBSEg7O0FBS0EsSUFBSUMsZ0JBQWdCLEdBQUcsQ0FBQ1QsSUFBSSxDQUFDRyxLQUFOLENBQXZCOztBQUNBLElBQUlILElBQUksQ0FBQ08sTUFBVCxFQUFpQjtBQUNmRSxFQUFBQSxnQkFBZ0IsZ0NBQU9BLGdCQUFQLElBQXlCVCxJQUFJLENBQUNPLE1BQTlCLEVBQWhCO0FBQ0Q7O0FBRUQsY0FBR0UsZ0JBQUgsRUFDR0MsSUFESCxDQUVJLG9CQUFJO0FBQUEsU0FDRkMsT0FBTyxDQUFDQyxHQUFSLENBQ0VuQixpQkFBaUIsQ0FDZixnRUFEZSxDQURuQixDQURFO0FBQUEsQ0FBSixDQUZKLEVBU0ksb0JBQUlvQiw4QkFBSixDQVRKLEVBVUksb0JBQUksVUFBQ0MsZUFBRDtBQUFBLFNBQ0ZILE9BQU8sQ0FBQ0MsR0FBUixDQUNFYixXQUFXLG9DQUE2QmUsZUFBZSxDQUFDQyxTQUE3QyxFQURiLENBREU7QUFBQSxDQUFKLENBVkosRUFlSSx3QkFDRSxVQUFDRCxlQUFEO0FBQUEsU0FDRXZCLFdBQVcsQ0FBQ3VCLGVBQWUsQ0FBQ0MsU0FBakIsQ0FBWCxDQUF1Q0wsSUFBdkMsQ0FDRSxvQkFBSSxZQUFNO0FBQ1JDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZYixXQUFXLGVBQXZCO0FBQ0FZLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUNFYixXQUFXLDZCQUFzQmUsZUFBZSxDQUFDQyxTQUF0QyxFQURiO0FBR0QsR0FMRCxDQURGLEVBT0Usd0JBQVE7QUFBQSxXQUFNN0IsU0FBUyxDQUFDNEIsZUFBZSxDQUFDQyxTQUFqQixDQUFmO0FBQUEsR0FBUixDQVBGLEVBUUUsb0JBQUk7QUFBQSxXQUNGSixPQUFPLENBQUNDLEdBQVIsQ0FDRWIsV0FBVywyQkFBb0JlLGVBQWUsQ0FBQ0UsVUFBcEMsRUFEYixDQURFO0FBQUEsR0FBSixDQVJGLEVBYUUsd0JBQ0UsVUFBQ0MsTUFBRDtBQUFBLFdBQ0UsY0FBRyxrREFBaUNBLE1BQU0sQ0FBQ0MsUUFBUCxFQUFqQyxDQUFILENBREY7QUFBQSxHQURGLENBYkYsRUFpQkUsd0JBQVEsVUFBQ1gsTUFBRDtBQUFBLFdBQ05sQixVQUFVLENBQUN5QixlQUFlLENBQUNFLFVBQWpCLEVBQTZCVCxNQUE3QixDQUFWLENBQStDRyxJQUEvQyxDQUNFLG9CQUNFO0FBQUEscURBQ21DSSxlQUFlLENBQUNFLFVBRG5EO0FBQUEsS0FERixDQURGLENBRE07QUFBQSxHQUFSLENBakJGLENBREY7QUFBQSxDQURGLENBZkosRUE2Q0dHLFNBN0NILENBOENJLFVBQUNaLE1BQUQ7QUFBQSxTQUFZSSxPQUFPLENBQUNDLEdBQVIsQ0FBWW5CLGlCQUFpQixhQUFNYyxNQUFOLEVBQTdCLENBQVo7QUFBQSxDQTlDSixFQStDSSxVQUFDYSxLQUFEO0FBQUEsU0FBV1QsT0FBTyxDQUFDUyxLQUFSLENBQWN2QixZQUFZLENBQUN1QixLQUFELENBQTFCLENBQVg7QUFBQSxDQS9DSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHsgYmluZE5vZGVDYWxsYmFjaywgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJ1xuaW1wb3J0IHsgZmxhdE1hcCwgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcbmltcG9ydCB5YXJncyBmcm9tICd5YXJncydcbmltcG9ydCB7IHBhcnNlSW5wdXRBcmd1bWVudHMgfSBmcm9tICcuL3V0aWxzL2FyZ3VtZW50cydcbmltcG9ydCB7IGNsZWFuQ29tbWVudHNBbmRSZW1vdmVCbGFua0xpbmVzIH0gZnJvbSAnLi91dGlscy9saW5lLXBhcnNlcidcblxuZXhwb3J0IGNvbnN0IHJlYWRGaWxlJCA9IGJpbmROb2RlQ2FsbGJhY2soZnMucmVhZEZpbGUpXG5leHBvcnQgY29uc3Qgd3JpdGVGaWxlJCA9IGJpbmROb2RlQ2FsbGJhY2soZnMud3JpdGVGaWxlKVxuZXhwb3J0IGNvbnN0IGFjY2Vzc0ZpbGUkID0gYmluZE5vZGVDYWxsYmFjayhmcy5hY2Nlc3MpXG5cbmNvbnN0IGJvbGRTdGF0dXNNZXNzYWdlID0gY2hhbGsuYm9sZC53aGl0ZVxuY29uc3QgZXJyb3JNZXNzYWdlID0gY2hhbGsuYm9sZC5yZWRcbmNvbnN0IGluZm9NZXNzYWdlID0gY2hhbGsud2hpdGVcblxuY29uc3QgYXJncyA9IHlhcmdzLm9wdGlvbnMoe1xuICBpbnB1dDogeyB0eXBlOiAnc3RyaW5nJywgZGVtYW5kT3B0aW9uOiB0cnVlLCBhbGlhczogJ2knIH0sXG4gIG91dHB1dDogeyB0eXBlOiAnc3RyaW5nJywgZGVtYW5kT3B0aW9uOiBmYWxzZSwgYWxpYXM6ICdvJyB9LFxufSkuYXJndlxuXG5sZXQgYXJndW1lbnRzQXNBcnJheSA9IFthcmdzLmlucHV0XVxuaWYgKGFyZ3Mub3V0cHV0KSB7XG4gIGFyZ3VtZW50c0FzQXJyYXkgPSBbLi4uYXJndW1lbnRzQXNBcnJheSwgYXJncy5vdXRwdXRdXG59XG5cbm9mKGFyZ3VtZW50c0FzQXJyYXkpXG4gIC5waXBlKFxuICAgIHRhcCgoKSA9PlxuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGJvbGRTdGF0dXNNZXNzYWdlKFxuICAgICAgICAgICdXZWxjb21lIHRvIHRoZSBUeXBlc2NyaXB0IEhhY2sgQXNzZW1ibGVyIC4uLiBzdGFydGluZyB1cCAuLi5cXG4nLFxuICAgICAgICApLFxuICAgICAgKSxcbiAgICApLFxuICAgIG1hcChwYXJzZUlucHV0QXJndW1lbnRzKSxcbiAgICB0YXAoKHBhcnNlZEFyZ3VtZW50cykgPT5cbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBpbmZvTWVzc2FnZShgQ2hlY2tpbmcgZmlsZSBleGlzdHMgLi4uICR7cGFyc2VkQXJndW1lbnRzLmlucHV0RmlsZX1gKSxcbiAgICAgICksXG4gICAgKSxcbiAgICBmbGF0TWFwKFxuICAgICAgKHBhcnNlZEFyZ3VtZW50cyk6IE9ic2VydmFibGU8c3RyaW5nPiA9PlxuICAgICAgICBhY2Nlc3NGaWxlJChwYXJzZWRBcmd1bWVudHMuaW5wdXRGaWxlKS5waXBlKFxuICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbmZvTWVzc2FnZShgRmlsZSBFeGlzdHNgKSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICBpbmZvTWVzc2FnZShgUmVhZGluZyBmaWxlIGZyb20gJHtwYXJzZWRBcmd1bWVudHMuaW5wdXRGaWxlfWApLFxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGZsYXRNYXAoKCkgPT4gcmVhZEZpbGUkKHBhcnNlZEFyZ3VtZW50cy5pbnB1dEZpbGUpKSxcbiAgICAgICAgICB0YXAoKCkgPT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICBpbmZvTWVzc2FnZShgV3JpdGluZyBmaWxlIHRvICR7cGFyc2VkQXJndW1lbnRzLm91dHB1dEZpbGV9YCksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICksXG4gICAgICAgICAgZmxhdE1hcChcbiAgICAgICAgICAgIChidWZmZXI6IEJ1ZmZlcik6IE9ic2VydmFibGU8c3RyaW5nPiA9PlxuICAgICAgICAgICAgICBvZihjbGVhbkNvbW1lbnRzQW5kUmVtb3ZlQmxhbmtMaW5lcyhidWZmZXIudG9TdHJpbmcoKSkpLFxuICAgICAgICAgICksXG4gICAgICAgICAgZmxhdE1hcCgob3V0cHV0OiBzdHJpbmcpID0+XG4gICAgICAgICAgICB3cml0ZUZpbGUkKHBhcnNlZEFyZ3VtZW50cy5vdXRwdXRGaWxlLCBvdXRwdXQpLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAoKSA9PlxuICAgICAgICAgICAgICAgICAgYFN1Y2Nlc3MgLi4uIE91dHB1dCB3cml0dGVuIHRvICR7cGFyc2VkQXJndW1lbnRzLm91dHB1dEZpbGV9YCxcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKSxcbiAgICAgICAgKSxcbiAgICApLFxuICApXG4gIC5zdWJzY3JpYmUoXG4gICAgKG91dHB1dCkgPT4gY29uc29sZS5sb2coYm9sZFN0YXR1c01lc3NhZ2UoYFxcbiR7b3V0cHV0fWApKSxcbiAgICAoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoZXJyb3JNZXNzYWdlKGVycm9yKSksXG4gIClcbiJdfQ==