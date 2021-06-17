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

var _assembler = require("./assembler");

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
}), (0, _operators.mergeMap)(function (parsedArguments) {
  return accessFile$(parsedArguments.inputFile).pipe((0, _operators.tap)(function () {
    console.log(infoMessage("File Exists"));
    console.log(infoMessage("Reading file from ".concat(parsedArguments.inputFile)));
  }), (0, _operators.mergeMap)(function () {
    return readFile$(parsedArguments.inputFile);
  }), (0, _operators.tap)(function () {
    return console.log(infoMessage("Writing file to ".concat(parsedArguments.outputFile)));
  }), (0, _operators.mergeMap)(function (buffer) {
    return (0, _rxjs.of)((0, _assembler.assemble)(buffer.toString()));
  }), (0, _operators.mergeMap)(function (output) {
    return writeFile$(parsedArguments.outputFile, output).pipe((0, _operators.map)(function () {
      return "Success ... Output written to ".concat(parsedArguments.outputFile);
    }));
  }));
})).subscribe(function (output) {
  return console.log(boldStatusMessage("\n".concat(output)));
}, function (error) {
  return console.error(errorMessage(error));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJyZWFkRmlsZSQiLCJmcyIsInJlYWRGaWxlIiwid3JpdGVGaWxlJCIsIndyaXRlRmlsZSIsImFjY2Vzc0ZpbGUkIiwiYWNjZXNzIiwiYm9sZFN0YXR1c01lc3NhZ2UiLCJjaGFsayIsImJvbGQiLCJ3aGl0ZSIsImVycm9yTWVzc2FnZSIsInJlZCIsImluZm9NZXNzYWdlIiwiYXJncyIsInlhcmdzIiwib3B0aW9ucyIsImlucHV0IiwidHlwZSIsImRlbWFuZE9wdGlvbiIsImFsaWFzIiwib3V0cHV0IiwiYXJndiIsImFyZ3VtZW50c0FzQXJyYXkiLCJwaXBlIiwiY29uc29sZSIsImxvZyIsInBhcnNlSW5wdXRBcmd1bWVudHMiLCJwYXJzZWRBcmd1bWVudHMiLCJpbnB1dEZpbGUiLCJvdXRwdXRGaWxlIiwiYnVmZmVyIiwidG9TdHJpbmciLCJzdWJzY3JpYmUiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU8sSUFBTUEsU0FBUyxHQUFHLDRCQUFpQkMsRUFBRSxDQUFDQyxRQUFwQixDQUFsQjs7QUFDQSxJQUFNQyxVQUFVLEdBQUcsNEJBQWlCRixFQUFFLENBQUNHLFNBQXBCLENBQW5COztBQUNBLElBQU1DLFdBQVcsR0FBRyw0QkFBaUJKLEVBQUUsQ0FBQ0ssTUFBcEIsQ0FBcEI7O0FBRVAsSUFBTUMsaUJBQWlCLEdBQUdDLGtCQUFNQyxJQUFOLENBQVdDLEtBQXJDO0FBQ0EsSUFBTUMsWUFBWSxHQUFHSCxrQkFBTUMsSUFBTixDQUFXRyxHQUFoQztBQUNBLElBQU1DLFdBQVcsR0FBR0wsa0JBQU1FLEtBQTFCOztBQUVBLElBQU1JLElBQUksR0FBR0Msa0JBQU1DLE9BQU4sQ0FBYztBQUN6QkMsRUFBQUEsS0FBSyxFQUFFO0FBQUVDLElBQUFBLElBQUksRUFBRSxRQUFSO0FBQWtCQyxJQUFBQSxZQUFZLEVBQUUsSUFBaEM7QUFBc0NDLElBQUFBLEtBQUssRUFBRTtBQUE3QyxHQURrQjtBQUV6QkMsRUFBQUEsTUFBTSxFQUFFO0FBQUVILElBQUFBLElBQUksRUFBRSxRQUFSO0FBQWtCQyxJQUFBQSxZQUFZLEVBQUUsS0FBaEM7QUFBdUNDLElBQUFBLEtBQUssRUFBRTtBQUE5QztBQUZpQixDQUFkLEVBR1ZFLElBSEg7O0FBS0EsSUFBSUMsZ0JBQWdCLEdBQUcsQ0FBQ1QsSUFBSSxDQUFDRyxLQUFOLENBQXZCOztBQUNBLElBQUlILElBQUksQ0FBQ08sTUFBVCxFQUFpQjtBQUNmRSxFQUFBQSxnQkFBZ0IsZ0NBQU9BLGdCQUFQLElBQXlCVCxJQUFJLENBQUNPLE1BQTlCLEVBQWhCO0FBQ0Q7O0FBRUQsY0FBR0UsZ0JBQUgsRUFDR0MsSUFESCxDQUVJLG9CQUFJO0FBQUEsU0FDRkMsT0FBTyxDQUFDQyxHQUFSLENBQ0VuQixpQkFBaUIsQ0FDZixnRUFEZSxDQURuQixDQURFO0FBQUEsQ0FBSixDQUZKLEVBU0ksb0JBQUlvQiw4QkFBSixDQVRKLEVBVUksb0JBQUksVUFBQ0MsZUFBRDtBQUFBLFNBQ0ZILE9BQU8sQ0FBQ0MsR0FBUixDQUNFYixXQUFXLG9DQUE2QmUsZUFBZSxDQUFDQyxTQUE3QyxFQURiLENBREU7QUFBQSxDQUFKLENBVkosRUFlSSx5QkFDRSxVQUFDRCxlQUFEO0FBQUEsU0FDRXZCLFdBQVcsQ0FBQ3VCLGVBQWUsQ0FBQ0MsU0FBakIsQ0FBWCxDQUF1Q0wsSUFBdkMsQ0FDRSxvQkFBSSxZQUFNO0FBQ1JDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZYixXQUFXLGVBQXZCO0FBQ0FZLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUNFYixXQUFXLDZCQUFzQmUsZUFBZSxDQUFDQyxTQUF0QyxFQURiO0FBR0QsR0FMRCxDQURGLEVBT0UseUJBQVM7QUFBQSxXQUFNN0IsU0FBUyxDQUFDNEIsZUFBZSxDQUFDQyxTQUFqQixDQUFmO0FBQUEsR0FBVCxDQVBGLEVBUUUsb0JBQUk7QUFBQSxXQUNGSixPQUFPLENBQUNDLEdBQVIsQ0FDRWIsV0FBVywyQkFBb0JlLGVBQWUsQ0FBQ0UsVUFBcEMsRUFEYixDQURFO0FBQUEsR0FBSixDQVJGLEVBYUUseUJBQ0UsVUFBQ0MsTUFBRDtBQUFBLFdBQ0UsY0FBRyx5QkFBU0EsTUFBTSxDQUFDQyxRQUFQLEVBQVQsQ0FBSCxDQURGO0FBQUEsR0FERixDQWJGLEVBaUJFLHlCQUFTLFVBQUNYLE1BQUQ7QUFBQSxXQUNQbEIsVUFBVSxDQUFDeUIsZUFBZSxDQUFDRSxVQUFqQixFQUE2QlQsTUFBN0IsQ0FBVixDQUErQ0csSUFBL0MsQ0FDRSxvQkFDRTtBQUFBLHFEQUNtQ0ksZUFBZSxDQUFDRSxVQURuRDtBQUFBLEtBREYsQ0FERixDQURPO0FBQUEsR0FBVCxDQWpCRixDQURGO0FBQUEsQ0FERixDQWZKLEVBNkNHRyxTQTdDSCxDQThDSSxVQUFDWixNQUFEO0FBQUEsU0FBWUksT0FBTyxDQUFDQyxHQUFSLENBQVluQixpQkFBaUIsYUFBTWMsTUFBTixFQUE3QixDQUFaO0FBQUEsQ0E5Q0osRUErQ0ksVUFBQ2EsS0FBRDtBQUFBLFNBQVdULE9BQU8sQ0FBQ1MsS0FBUixDQUFjdkIsWUFBWSxDQUFDdUIsS0FBRCxDQUExQixDQUFYO0FBQUEsQ0EvQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcydcbmltcG9ydCB7IGJpbmROb2RlQ2FsbGJhY2ssIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcydcbmltcG9ydCB7IG1lcmdlTWFwLCBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJ1xuaW1wb3J0IHlhcmdzIGZyb20gJ3lhcmdzJ1xuaW1wb3J0IHsgcGFyc2VJbnB1dEFyZ3VtZW50cyB9IGZyb20gJy4vdXRpbHMvYXJndW1lbnRzJ1xuaW1wb3J0IHsgYXNzZW1ibGUgfSBmcm9tICcuL2Fzc2VtYmxlcidcblxuZXhwb3J0IGNvbnN0IHJlYWRGaWxlJCA9IGJpbmROb2RlQ2FsbGJhY2soZnMucmVhZEZpbGUpXG5leHBvcnQgY29uc3Qgd3JpdGVGaWxlJCA9IGJpbmROb2RlQ2FsbGJhY2soZnMud3JpdGVGaWxlKVxuZXhwb3J0IGNvbnN0IGFjY2Vzc0ZpbGUkID0gYmluZE5vZGVDYWxsYmFjayhmcy5hY2Nlc3MpXG5cbmNvbnN0IGJvbGRTdGF0dXNNZXNzYWdlID0gY2hhbGsuYm9sZC53aGl0ZVxuY29uc3QgZXJyb3JNZXNzYWdlID0gY2hhbGsuYm9sZC5yZWRcbmNvbnN0IGluZm9NZXNzYWdlID0gY2hhbGsud2hpdGVcblxuY29uc3QgYXJncyA9IHlhcmdzLm9wdGlvbnMoe1xuICBpbnB1dDogeyB0eXBlOiAnc3RyaW5nJywgZGVtYW5kT3B0aW9uOiB0cnVlLCBhbGlhczogJ2knIH0sXG4gIG91dHB1dDogeyB0eXBlOiAnc3RyaW5nJywgZGVtYW5kT3B0aW9uOiBmYWxzZSwgYWxpYXM6ICdvJyB9LFxufSkuYXJndlxuXG5sZXQgYXJndW1lbnRzQXNBcnJheSA9IFthcmdzLmlucHV0XVxuaWYgKGFyZ3Mub3V0cHV0KSB7XG4gIGFyZ3VtZW50c0FzQXJyYXkgPSBbLi4uYXJndW1lbnRzQXNBcnJheSwgYXJncy5vdXRwdXRdXG59XG5cbm9mKGFyZ3VtZW50c0FzQXJyYXkpXG4gIC5waXBlKFxuICAgIHRhcCgoKSA9PlxuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGJvbGRTdGF0dXNNZXNzYWdlKFxuICAgICAgICAgICdXZWxjb21lIHRvIHRoZSBUeXBlc2NyaXB0IEhhY2sgQXNzZW1ibGVyIC4uLiBzdGFydGluZyB1cCAuLi5cXG4nLFxuICAgICAgICApLFxuICAgICAgKSxcbiAgICApLFxuICAgIG1hcChwYXJzZUlucHV0QXJndW1lbnRzKSxcbiAgICB0YXAoKHBhcnNlZEFyZ3VtZW50cykgPT5cbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBpbmZvTWVzc2FnZShgQ2hlY2tpbmcgZmlsZSBleGlzdHMgLi4uICR7cGFyc2VkQXJndW1lbnRzLmlucHV0RmlsZX1gKSxcbiAgICAgICksXG4gICAgKSxcbiAgICBtZXJnZU1hcChcbiAgICAgIChwYXJzZWRBcmd1bWVudHMpOiBPYnNlcnZhYmxlPHN0cmluZz4gPT5cbiAgICAgICAgYWNjZXNzRmlsZSQocGFyc2VkQXJndW1lbnRzLmlucHV0RmlsZSkucGlwZShcbiAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coaW5mb01lc3NhZ2UoYEZpbGUgRXhpc3RzYCkpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgaW5mb01lc3NhZ2UoYFJlYWRpbmcgZmlsZSBmcm9tICR7cGFyc2VkQXJndW1lbnRzLmlucHV0RmlsZX1gKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBtZXJnZU1hcCgoKSA9PiByZWFkRmlsZSQocGFyc2VkQXJndW1lbnRzLmlucHV0RmlsZSkpLFxuICAgICAgICAgIHRhcCgoKSA9PlxuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgIGluZm9NZXNzYWdlKGBXcml0aW5nIGZpbGUgdG8gJHtwYXJzZWRBcmd1bWVudHMub3V0cHV0RmlsZX1gKSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKSxcbiAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgIChidWZmZXI6IEJ1ZmZlcik6IE9ic2VydmFibGU8c3RyaW5nPiA9PlxuICAgICAgICAgICAgICBvZihhc3NlbWJsZShidWZmZXIudG9TdHJpbmcoKSkpLFxuICAgICAgICAgICksXG4gICAgICAgICAgbWVyZ2VNYXAoKG91dHB1dDogc3RyaW5nKSA9PlxuICAgICAgICAgICAgd3JpdGVGaWxlJChwYXJzZWRBcmd1bWVudHMub3V0cHV0RmlsZSwgb3V0cHV0KS5waXBlKFxuICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgKCkgPT5cbiAgICAgICAgICAgICAgICAgIGBTdWNjZXNzIC4uLiBPdXRwdXQgd3JpdHRlbiB0byAke3BhcnNlZEFyZ3VtZW50cy5vdXRwdXRGaWxlfWAsXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICksXG4gICAgICAgICksXG4gICAgKSxcbiAgKVxuICAuc3Vic2NyaWJlKFxuICAgIChvdXRwdXQpID0+IGNvbnNvbGUubG9nKGJvbGRTdGF0dXNNZXNzYWdlKGBcXG4ke291dHB1dH1gKSksXG4gICAgKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKGVycm9yTWVzc2FnZShlcnJvcikpLFxuICApXG4iXX0=