"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessFile$ = exports.writeFile$ = exports.readFile$ = void 0;

var fs = _interopRequireWildcard(require("fs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _yargs = _interopRequireDefault(require("yargs"));

var _arguments = require("./utils/arguments");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    return writeFile$(parsedArguments.outputFile, buffer).pipe((0, _operators.map)(function () {
      return "Success ... Output written to ".concat(parsedArguments.outputFile);
    }));
  }));
})).subscribe(function (output) {
  return console.log(boldStatusMessage("\n".concat(output)));
}, function (error) {
  return console.error(errorMessage(error));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJyZWFkRmlsZSQiLCJmcyIsInJlYWRGaWxlIiwid3JpdGVGaWxlJCIsIndyaXRlRmlsZSIsImFjY2Vzc0ZpbGUkIiwiYWNjZXNzIiwiYm9sZFN0YXR1c01lc3NhZ2UiLCJjaGFsayIsImJvbGQiLCJ3aGl0ZSIsImVycm9yTWVzc2FnZSIsInJlZCIsImluZm9NZXNzYWdlIiwiYXJncyIsInlhcmdzIiwib3B0aW9ucyIsImlucHV0IiwidHlwZSIsImRlbWFuZE9wdGlvbiIsImFsaWFzIiwib3V0cHV0IiwiYXJndiIsImFyZ3VtZW50c0FzQXJyYXkiLCJwaXBlIiwiY29uc29sZSIsImxvZyIsInBhcnNlSW5wdXRBcmd1bWVudHMiLCJwYXJzZWRBcmd1bWVudHMiLCJpbnB1dEZpbGUiLCJvdXRwdXRGaWxlIiwiYnVmZmVyIiwic3Vic2NyaWJlIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLFNBQVMsR0FBRyw0QkFBaUJDLEVBQUUsQ0FBQ0MsUUFBcEIsQ0FBbEI7O0FBQ0EsSUFBTUMsVUFBVSxHQUFHLDRCQUFpQkYsRUFBRSxDQUFDRyxTQUFwQixDQUFuQjs7QUFDQSxJQUFNQyxXQUFXLEdBQUcsNEJBQWlCSixFQUFFLENBQUNLLE1BQXBCLENBQXBCOztBQUVQLElBQU1DLGlCQUFpQixHQUFHQyxrQkFBTUMsSUFBTixDQUFXQyxLQUFyQztBQUNBLElBQU1DLFlBQVksR0FBR0gsa0JBQU1DLElBQU4sQ0FBV0csR0FBaEM7QUFDQSxJQUFNQyxXQUFXLEdBQUdMLGtCQUFNRSxLQUExQjs7QUFFQSxJQUFNSSxJQUFJLEdBQUdDLGtCQUFNQyxPQUFOLENBQWM7QUFDekJDLEVBQUFBLEtBQUssRUFBRTtBQUFFQyxJQUFBQSxJQUFJLEVBQUUsUUFBUjtBQUFrQkMsSUFBQUEsWUFBWSxFQUFFLElBQWhDO0FBQXNDQyxJQUFBQSxLQUFLLEVBQUU7QUFBN0MsR0FEa0I7QUFFekJDLEVBQUFBLE1BQU0sRUFBRTtBQUFFSCxJQUFBQSxJQUFJLEVBQUUsUUFBUjtBQUFrQkMsSUFBQUEsWUFBWSxFQUFFLEtBQWhDO0FBQXVDQyxJQUFBQSxLQUFLLEVBQUU7QUFBOUM7QUFGaUIsQ0FBZCxFQUdWRSxJQUhIOztBQUtBLElBQUlDLGdCQUFnQixHQUFHLENBQUNULElBQUksQ0FBQ0csS0FBTixDQUF2Qjs7QUFDQSxJQUFJSCxJQUFJLENBQUNPLE1BQVQsRUFBaUI7QUFDZkUsRUFBQUEsZ0JBQWdCLGdDQUFPQSxnQkFBUCxJQUF5QlQsSUFBSSxDQUFDTyxNQUE5QixFQUFoQjtBQUNEOztBQUVELGNBQUdFLGdCQUFILEVBQ0dDLElBREgsQ0FFSSxvQkFBSTtBQUFBLFNBQ0ZDLE9BQU8sQ0FBQ0MsR0FBUixDQUNFbkIsaUJBQWlCLENBQ2YsZ0VBRGUsQ0FEbkIsQ0FERTtBQUFBLENBQUosQ0FGSixFQVNJLG9CQUFJb0IsOEJBQUosQ0FUSixFQVVJLG9CQUFJLFVBQUNDLGVBQUQ7QUFBQSxTQUNGSCxPQUFPLENBQUNDLEdBQVIsQ0FDRWIsV0FBVyxvQ0FBNkJlLGVBQWUsQ0FBQ0MsU0FBN0MsRUFEYixDQURFO0FBQUEsQ0FBSixDQVZKLEVBZUksd0JBQ0UsVUFBQ0QsZUFBRDtBQUFBLFNBQ0V2QixXQUFXLENBQUN1QixlQUFlLENBQUNDLFNBQWpCLENBQVgsQ0FBdUNMLElBQXZDLENBQ0Usb0JBQUksWUFBTTtBQUNSQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWWIsV0FBVyxlQUF2QjtBQUNBWSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FDRWIsV0FBVyw2QkFBc0JlLGVBQWUsQ0FBQ0MsU0FBdEMsRUFEYjtBQUdELEdBTEQsQ0FERixFQU9FLHdCQUFRO0FBQUEsV0FBTTdCLFNBQVMsQ0FBQzRCLGVBQWUsQ0FBQ0MsU0FBakIsQ0FBZjtBQUFBLEdBQVIsQ0FQRixFQVFFLG9CQUFJO0FBQUEsV0FDRkosT0FBTyxDQUFDQyxHQUFSLENBQ0ViLFdBQVcsMkJBQW9CZSxlQUFlLENBQUNFLFVBQXBDLEVBRGIsQ0FERTtBQUFBLEdBQUosQ0FSRixFQWFFLHdCQUNFLFVBQUNDLE1BQUQ7QUFBQSxXQUNFNUIsVUFBVSxDQUFDeUIsZUFBZSxDQUFDRSxVQUFqQixFQUE2QkMsTUFBN0IsQ0FBVixDQUErQ1AsSUFBL0MsQ0FDRSxvQkFDRTtBQUFBLHFEQUNtQ0ksZUFBZSxDQUFDRSxVQURuRDtBQUFBLEtBREYsQ0FERixDQURGO0FBQUEsR0FERixDQWJGLENBREY7QUFBQSxDQURGLENBZkosRUEwQ0dFLFNBMUNILENBMkNJLFVBQUNYLE1BQUQ7QUFBQSxTQUFZSSxPQUFPLENBQUNDLEdBQVIsQ0FBWW5CLGlCQUFpQixhQUFNYyxNQUFOLEVBQTdCLENBQVo7QUFBQSxDQTNDSixFQTRDSSxVQUFDWSxLQUFEO0FBQUEsU0FBV1IsT0FBTyxDQUFDUSxLQUFSLENBQWN0QixZQUFZLENBQUNzQixLQUFELENBQTFCLENBQVg7QUFBQSxDQTVDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IHsgYmluZE5vZGVDYWxsYmFjaywgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJ1xuaW1wb3J0IHsgZmxhdE1hcCwgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcbmltcG9ydCB5YXJncyBmcm9tICd5YXJncydcbmltcG9ydCB7IHBhcnNlSW5wdXRBcmd1bWVudHMgfSBmcm9tICcuL3V0aWxzL2FyZ3VtZW50cydcblxuZXhwb3J0IGNvbnN0IHJlYWRGaWxlJCA9IGJpbmROb2RlQ2FsbGJhY2soZnMucmVhZEZpbGUpXG5leHBvcnQgY29uc3Qgd3JpdGVGaWxlJCA9IGJpbmROb2RlQ2FsbGJhY2soZnMud3JpdGVGaWxlKVxuZXhwb3J0IGNvbnN0IGFjY2Vzc0ZpbGUkID0gYmluZE5vZGVDYWxsYmFjayhmcy5hY2Nlc3MpXG5cbmNvbnN0IGJvbGRTdGF0dXNNZXNzYWdlID0gY2hhbGsuYm9sZC53aGl0ZVxuY29uc3QgZXJyb3JNZXNzYWdlID0gY2hhbGsuYm9sZC5yZWRcbmNvbnN0IGluZm9NZXNzYWdlID0gY2hhbGsud2hpdGVcblxuY29uc3QgYXJncyA9IHlhcmdzLm9wdGlvbnMoe1xuICBpbnB1dDogeyB0eXBlOiAnc3RyaW5nJywgZGVtYW5kT3B0aW9uOiB0cnVlLCBhbGlhczogJ2knIH0sXG4gIG91dHB1dDogeyB0eXBlOiAnc3RyaW5nJywgZGVtYW5kT3B0aW9uOiBmYWxzZSwgYWxpYXM6ICdvJyB9LFxufSkuYXJndlxuXG5sZXQgYXJndW1lbnRzQXNBcnJheSA9IFthcmdzLmlucHV0XVxuaWYgKGFyZ3Mub3V0cHV0KSB7XG4gIGFyZ3VtZW50c0FzQXJyYXkgPSBbLi4uYXJndW1lbnRzQXNBcnJheSwgYXJncy5vdXRwdXRdXG59XG5cbm9mKGFyZ3VtZW50c0FzQXJyYXkpXG4gIC5waXBlKFxuICAgIHRhcCgoKSA9PlxuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGJvbGRTdGF0dXNNZXNzYWdlKFxuICAgICAgICAgICdXZWxjb21lIHRvIHRoZSBUeXBlc2NyaXB0IEhhY2sgQXNzZW1ibGVyIC4uLiBzdGFydGluZyB1cCAuLi5cXG4nLFxuICAgICAgICApLFxuICAgICAgKSxcbiAgICApLFxuICAgIG1hcChwYXJzZUlucHV0QXJndW1lbnRzKSxcbiAgICB0YXAoKHBhcnNlZEFyZ3VtZW50cykgPT5cbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBpbmZvTWVzc2FnZShgQ2hlY2tpbmcgZmlsZSBleGlzdHMgLi4uICR7cGFyc2VkQXJndW1lbnRzLmlucHV0RmlsZX1gKSxcbiAgICAgICksXG4gICAgKSxcbiAgICBmbGF0TWFwKFxuICAgICAgKHBhcnNlZEFyZ3VtZW50cyk6IE9ic2VydmFibGU8c3RyaW5nPiA9PlxuICAgICAgICBhY2Nlc3NGaWxlJChwYXJzZWRBcmd1bWVudHMuaW5wdXRGaWxlKS5waXBlKFxuICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbmZvTWVzc2FnZShgRmlsZSBFeGlzdHNgKSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICBpbmZvTWVzc2FnZShgUmVhZGluZyBmaWxlIGZyb20gJHtwYXJzZWRBcmd1bWVudHMuaW5wdXRGaWxlfWApLFxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGZsYXRNYXAoKCkgPT4gcmVhZEZpbGUkKHBhcnNlZEFyZ3VtZW50cy5pbnB1dEZpbGUpKSxcbiAgICAgICAgICB0YXAoKCkgPT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICBpbmZvTWVzc2FnZShgV3JpdGluZyBmaWxlIHRvICR7cGFyc2VkQXJndW1lbnRzLm91dHB1dEZpbGV9YCksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICksXG4gICAgICAgICAgZmxhdE1hcChcbiAgICAgICAgICAgIChidWZmZXI6IEJ1ZmZlcik6IE9ic2VydmFibGU8c3RyaW5nPiA9PlxuICAgICAgICAgICAgICB3cml0ZUZpbGUkKHBhcnNlZEFyZ3VtZW50cy5vdXRwdXRGaWxlLCBidWZmZXIpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgKCkgPT5cbiAgICAgICAgICAgICAgICAgICAgYFN1Y2Nlc3MgLi4uIE91dHB1dCB3cml0dGVuIHRvICR7cGFyc2VkQXJndW1lbnRzLm91dHB1dEZpbGV9YCxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICksXG4gICAgICAgICksXG4gICAgKSxcbiAgKVxuICAuc3Vic2NyaWJlKFxuICAgIChvdXRwdXQpID0+IGNvbnNvbGUubG9nKGJvbGRTdGF0dXNNZXNzYWdlKGBcXG4ke291dHB1dH1gKSksXG4gICAgKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKGVycm9yTWVzc2FnZShlcnJvcikpLFxuICApXG4iXX0=