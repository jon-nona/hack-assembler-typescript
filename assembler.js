"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assemble = exports.convertInstruction = exports.assembleSymbol = exports.assembleCInstruction = void 0;

var _ramda = _interopRequireDefault(require("ramda"));

var _instructionParser = require("./utils/instruction-parser");

var _lineParser = require("./utils/line-parser");

var _string = require("./utils/string");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var assembleCInstruction = _ramda["default"].pipe(_instructionParser.parseCInstruction, _instructionParser.convertCInstructionToBinary);

exports.assembleCInstruction = assembleCInstruction;

var assembleSymbol = _ramda["default"].curry(function (symbolTable, symbol) {
  return _ramda["default"].pipe(_ramda["default"].prop(_ramda["default"].__, symbolTable), _instructionParser.decimalToBinaryString, (0, _string.leftPad)(16))(symbol);
});

exports.assembleSymbol = assembleSymbol;

var convertInstruction = _ramda["default"].curry(function (symbolTable, instruction) {
  return _ramda["default"].pipe(_ramda["default"].ifElse(_ramda["default"].anyPass([_instructionParser.isAInstruction, _ramda["default"].has(_ramda["default"].__, symbolTable)]), _ramda["default"].ifElse(_instructionParser.isAInstruction, _instructionParser.convertAInstructionToBinary, assembleSymbol(symbolTable)), assembleCInstruction))(instruction);
});

exports.convertInstruction = convertInstruction;

var notLabel = _ramda["default"].complement(_ramda["default"].test(_instructionParser.labelRegex));

var stripLabels = _ramda["default"].filter(notLabel);

var addNewLine = _ramda["default"].concat(_ramda["default"].__, '\n');

var assemble = _ramda["default"].pipe(_lineParser.cleanCommentsAndRemoveBlankLines, _lineParser.linesToArray, _ramda["default"].juxt([stripLabels, _instructionParser.buildSymbolsTable]), _ramda["default"].zipObj(['instructions', 'symbolTable']), function (data) {
  return data.instructions.map(function (instruction) {
    return convertInstruction(data.symbolTable, instruction);
  });
}, _lineParser.arrayToLines, addNewLine);

exports.assemble = assemble;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hc3NlbWJsZXIudHMiXSwibmFtZXMiOlsiYXNzZW1ibGVDSW5zdHJ1Y3Rpb24iLCJSIiwicGlwZSIsInBhcnNlQ0luc3RydWN0aW9uIiwiY29udmVydENJbnN0cnVjdGlvblRvQmluYXJ5IiwiYXNzZW1ibGVTeW1ib2wiLCJjdXJyeSIsInN5bWJvbFRhYmxlIiwic3ltYm9sIiwicHJvcCIsIl9fIiwiZGVjaW1hbFRvQmluYXJ5U3RyaW5nIiwiY29udmVydEluc3RydWN0aW9uIiwiaW5zdHJ1Y3Rpb24iLCJpZkVsc2UiLCJhbnlQYXNzIiwiaXNBSW5zdHJ1Y3Rpb24iLCJoYXMiLCJjb252ZXJ0QUluc3RydWN0aW9uVG9CaW5hcnkiLCJub3RMYWJlbCIsImNvbXBsZW1lbnQiLCJ0ZXN0IiwibGFiZWxSZWdleCIsInN0cmlwTGFiZWxzIiwiZmlsdGVyIiwiYWRkTmV3TGluZSIsImNvbmNhdCIsImFzc2VtYmxlIiwiY2xlYW5Db21tZW50c0FuZFJlbW92ZUJsYW5rTGluZXMiLCJsaW5lc1RvQXJyYXkiLCJqdXh0IiwiYnVpbGRTeW1ib2xzVGFibGUiLCJ6aXBPYmoiLCJkYXRhIiwiaW5zdHJ1Y3Rpb25zIiwibWFwIiwiYXJyYXlUb0xpbmVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBU0E7O0FBS0E7Ozs7QUFHTyxJQUFNQSxvQkFBK0MsR0FBR0Msa0JBQUVDLElBQUYsQ0FDN0RDLG9DQUQ2RCxFQUU3REMsOENBRjZELENBQXhEOzs7O0FBS0EsSUFBTUMsY0FBYyxHQUFHSixrQkFBRUssS0FBRixDQUM1QixVQUFDQyxXQUFELEVBQTJCQyxNQUEzQjtBQUFBLFNBQ0VQLGtCQUFFQyxJQUFGLENBQ0VELGtCQUFFUSxJQUFGLENBQU9SLGtCQUFFUyxFQUFULEVBQWFILFdBQWIsQ0FERixFQUVFSSx3Q0FGRixFQUdFLHFCQUFRLEVBQVIsQ0FIRixFQUlFSCxNQUpGLENBREY7QUFBQSxDQUQ0QixDQUF2Qjs7OztBQVNBLElBQU1JLGtCQUFrQixHQUFHWCxrQkFBRUssS0FBRixDQUNoQyxVQUFDQyxXQUFELEVBQTJCTSxXQUEzQjtBQUFBLFNBQ0VaLGtCQUFFQyxJQUFGLENBQ0VELGtCQUFFYSxNQUFGLENBQ0ViLGtCQUFFYyxPQUFGLENBQVUsQ0FBQ0MsaUNBQUQsRUFBaUJmLGtCQUFFZ0IsR0FBRixDQUFNaEIsa0JBQUVTLEVBQVIsRUFBWUgsV0FBWixDQUFqQixDQUFWLENBREYsRUFFRU4sa0JBQUVhLE1BQUYsQ0FDRUUsaUNBREYsRUFFRUUsOENBRkYsRUFHRWIsY0FBYyxDQUFDRSxXQUFELENBSGhCLENBRkYsRUFPRVAsb0JBUEYsQ0FERixFQVVFYSxXQVZGLENBREY7QUFBQSxDQURnQyxDQUEzQjs7OztBQWVQLElBQU1NLFFBQVEsR0FBR2xCLGtCQUFFbUIsVUFBRixDQUFhbkIsa0JBQUVvQixJQUFGLENBQU9DLDZCQUFQLENBQWIsQ0FBakI7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHdEIsa0JBQUV1QixNQUFGLENBQVNMLFFBQVQsQ0FBcEI7O0FBQ0EsSUFBTU0sVUFBVSxHQUFHeEIsa0JBQUV5QixNQUFGLENBQVN6QixrQkFBRVMsRUFBWCxFQUFlLElBQWYsQ0FBbkI7O0FBQ08sSUFBTWlCLFFBQW1DLEdBQUcxQixrQkFBRUMsSUFBRixDQUNqRDBCLDRDQURpRCxFQUVqREMsd0JBRmlELEVBR2pENUIsa0JBQUU2QixJQUFGLENBQU8sQ0FBQ1AsV0FBRCxFQUFjUSxvQ0FBZCxDQUFQLENBSGlELEVBSWpEOUIsa0JBQUUrQixNQUFGLENBQVMsQ0FBQyxjQUFELEVBQWlCLGFBQWpCLENBQVQsQ0FKaUQsRUFLakQsVUFBQ0MsSUFBRDtBQUFBLFNBQ0VBLElBQUksQ0FBQ0MsWUFBTCxDQUFrQkMsR0FBbEIsQ0FBc0IsVUFBQ3RCLFdBQUQ7QUFBQSxXQUNwQkQsa0JBQWtCLENBQUNxQixJQUFJLENBQUMxQixXQUFOLEVBQW1CTSxXQUFuQixDQURFO0FBQUEsR0FBdEIsQ0FERjtBQUFBLENBTGlELEVBU2pEdUIsd0JBVGlELEVBVWpEWCxVQVZpRCxDQUE1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHtcbiAgYnVpbGRTeW1ib2xzVGFibGUsXG4gIGNvbnZlcnRBSW5zdHJ1Y3Rpb25Ub0JpbmFyeSxcbiAgY29udmVydENJbnN0cnVjdGlvblRvQmluYXJ5LFxuICBkZWNpbWFsVG9CaW5hcnlTdHJpbmcsXG4gIGlzQUluc3RydWN0aW9uLFxuICBsYWJlbFJlZ2V4LFxuICBwYXJzZUNJbnN0cnVjdGlvbixcbn0gZnJvbSAnLi91dGlscy9pbnN0cnVjdGlvbi1wYXJzZXInXG5pbXBvcnQge1xuICBhcnJheVRvTGluZXMsXG4gIGNsZWFuQ29tbWVudHNBbmRSZW1vdmVCbGFua0xpbmVzLFxuICBsaW5lc1RvQXJyYXksXG59IGZyb20gJy4vdXRpbHMvbGluZS1wYXJzZXInXG5pbXBvcnQgeyBsZWZ0UGFkIH0gZnJvbSAnLi91dGlscy9zdHJpbmcnXG5pbXBvcnQgeyBTeW1ib2xUYWJsZSB9IGZyb20gJy4vdXRpbHMvdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBhc3NlbWJsZUNJbnN0cnVjdGlvbjogKHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZyA9IFIucGlwZShcbiAgcGFyc2VDSW5zdHJ1Y3Rpb24sXG4gIGNvbnZlcnRDSW5zdHJ1Y3Rpb25Ub0JpbmFyeSxcbilcblxuZXhwb3J0IGNvbnN0IGFzc2VtYmxlU3ltYm9sID0gUi5jdXJyeShcbiAgKHN5bWJvbFRhYmxlOiBTeW1ib2xUYWJsZSwgc3ltYm9sOiBzdHJpbmcpID0+XG4gICAgUi5waXBlKFxuICAgICAgUi5wcm9wKFIuX18sIHN5bWJvbFRhYmxlKSxcbiAgICAgIGRlY2ltYWxUb0JpbmFyeVN0cmluZyxcbiAgICAgIGxlZnRQYWQoMTYpLFxuICAgICkoc3ltYm9sKSxcbilcblxuZXhwb3J0IGNvbnN0IGNvbnZlcnRJbnN0cnVjdGlvbiA9IFIuY3VycnkoXG4gIChzeW1ib2xUYWJsZTogU3ltYm9sVGFibGUsIGluc3RydWN0aW9uOiBzdHJpbmcpID0+XG4gICAgUi5waXBlKFxuICAgICAgUi5pZkVsc2UoXG4gICAgICAgIFIuYW55UGFzcyhbaXNBSW5zdHJ1Y3Rpb24sIFIuaGFzKFIuX18sIHN5bWJvbFRhYmxlKV0pLFxuICAgICAgICBSLmlmRWxzZShcbiAgICAgICAgICBpc0FJbnN0cnVjdGlvbixcbiAgICAgICAgICBjb252ZXJ0QUluc3RydWN0aW9uVG9CaW5hcnksXG4gICAgICAgICAgYXNzZW1ibGVTeW1ib2woc3ltYm9sVGFibGUpLFxuICAgICAgICApLFxuICAgICAgICBhc3NlbWJsZUNJbnN0cnVjdGlvbixcbiAgICAgICksXG4gICAgKShpbnN0cnVjdGlvbiksXG4pXG5cbmNvbnN0IG5vdExhYmVsID0gUi5jb21wbGVtZW50KFIudGVzdChsYWJlbFJlZ2V4KSlcbmNvbnN0IHN0cmlwTGFiZWxzID0gUi5maWx0ZXIobm90TGFiZWwpXG5jb25zdCBhZGROZXdMaW5lID0gUi5jb25jYXQoUi5fXywgJ1xcbicpXG5leHBvcnQgY29uc3QgYXNzZW1ibGU6IChpbnB1dDogc3RyaW5nKSA9PiBzdHJpbmcgPSBSLnBpcGUoXG4gIGNsZWFuQ29tbWVudHNBbmRSZW1vdmVCbGFua0xpbmVzLFxuICBsaW5lc1RvQXJyYXksXG4gIFIuanV4dChbc3RyaXBMYWJlbHMsIGJ1aWxkU3ltYm9sc1RhYmxlXSksXG4gIFIuemlwT2JqKFsnaW5zdHJ1Y3Rpb25zJywgJ3N5bWJvbFRhYmxlJ10pLFxuICAoZGF0YTogeyBpbnN0cnVjdGlvbnM6IHN0cmluZ1tdOyBzeW1ib2xUYWJsZTogU3ltYm9sVGFibGUgfSkgPT5cbiAgICBkYXRhLmluc3RydWN0aW9ucy5tYXAoKGluc3RydWN0aW9uOiBzdHJpbmcpID0+XG4gICAgICBjb252ZXJ0SW5zdHJ1Y3Rpb24oZGF0YS5zeW1ib2xUYWJsZSwgaW5zdHJ1Y3Rpb24pLFxuICAgICksXG4gIGFycmF5VG9MaW5lcyxcbiAgYWRkTmV3TGluZSxcbilcbiJdfQ==