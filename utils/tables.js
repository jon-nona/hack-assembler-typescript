"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lookupTable = exports.predefinedSymbolsTable = exports.compTable = exports.jumpTable = exports.destTable = void 0;

var _compTable;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var destTable = {
  M: '001',
  D: '010',
  MD: '011',
  A: '100',
  AM: '101',
  AD: '110',
  AMD: '111'
};
exports.destTable = destTable;
var jumpTable = {
  JGT: '001',
  JEQ: '010',
  JGE: '011',
  JLT: '100',
  JNE: '101',
  JLE: '110',
  JMP: '111'
};
exports.jumpTable = jumpTable;
var compTable = (_compTable = {}, _defineProperty(_compTable, '0', '0101010'), _defineProperty(_compTable, '1', '0111111'), _defineProperty(_compTable, '-1', '0111010'), _defineProperty(_compTable, "D", '0001100'), _defineProperty(_compTable, "A", '0110000'), _defineProperty(_compTable, "M", '1110000'), _defineProperty(_compTable, '!D', '0001101'), _defineProperty(_compTable, '!A', '0110001'), _defineProperty(_compTable, '!M', '1110001'), _defineProperty(_compTable, '-D', '0001111'), _defineProperty(_compTable, '-A', '0110011'), _defineProperty(_compTable, '-M', '1110011'), _defineProperty(_compTable, 'D+1', '0011111'), _defineProperty(_compTable, 'A+1', '0110111'), _defineProperty(_compTable, 'M+1', '1110111'), _defineProperty(_compTable, 'D-1', '0001110'), _defineProperty(_compTable, 'A-1', '0110010'), _defineProperty(_compTable, 'M-1', '1110010'), _defineProperty(_compTable, 'D+A', '0000010'), _defineProperty(_compTable, 'A+D', '0000010'), _defineProperty(_compTable, 'D+M', '1000010'), _defineProperty(_compTable, 'M+D', '1000010'), _defineProperty(_compTable, 'D-A', '0010011'), _defineProperty(_compTable, 'A-D', '0000111'), _defineProperty(_compTable, 'D-M', '1010011'), _defineProperty(_compTable, 'M-D', '1000111'), _defineProperty(_compTable, 'D&A', '0000000'), _defineProperty(_compTable, 'A&D', '0000000'), _defineProperty(_compTable, 'D&M', '1000000'), _defineProperty(_compTable, 'M&D', '1000000'), _defineProperty(_compTable, 'D|A', '0010101'), _defineProperty(_compTable, 'A|D', '0010101'), _defineProperty(_compTable, 'D|M', '1010101'), _defineProperty(_compTable, 'M|D', '1010101'), _compTable);
exports.compTable = compTable;
var predefinedSymbolsTable = {
  R0: 0,
  R1: 1,
  R2: 2,
  R3: 3,
  R4: 4,
  R5: 5,
  R6: 6,
  R7: 7,
  R8: 8,
  R9: 9,
  R10: 10,
  R11: 11,
  R12: 12,
  R13: 13,
  R14: 14,
  R15: 15,
  SCREEN: 16384,
  KBD: 24576,
  SP: 0,
  LCL: 1,
  ARG: 2,
  THIS: 3,
  THAT: 4
};
exports.predefinedSymbolsTable = predefinedSymbolsTable;

var lookupTable = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, destTable), jumpTable), compTable), predefinedSymbolsTable);

exports.lookupTable = lookupTable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy90YWJsZXMudHMiXSwibmFtZXMiOlsiZGVzdFRhYmxlIiwiTSIsIkQiLCJNRCIsIkEiLCJBTSIsIkFEIiwiQU1EIiwianVtcFRhYmxlIiwiSkdUIiwiSkVRIiwiSkdFIiwiSkxUIiwiSk5FIiwiSkxFIiwiSk1QIiwiY29tcFRhYmxlIiwicHJlZGVmaW5lZFN5bWJvbHNUYWJsZSIsIlIwIiwiUjEiLCJSMiIsIlIzIiwiUjQiLCJSNSIsIlI2IiwiUjciLCJSOCIsIlI5IiwiUjEwIiwiUjExIiwiUjEyIiwiUjEzIiwiUjE0IiwiUjE1IiwiU0NSRUVOIiwiS0JEIiwiU1AiLCJMQ0wiLCJBUkciLCJUSElTIiwiVEhBVCIsImxvb2t1cFRhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTyxJQUFNQSxTQUFTLEdBQUc7QUFDdkJDLEVBQUFBLENBQUMsRUFBRSxLQURvQjtBQUV2QkMsRUFBQUEsQ0FBQyxFQUFFLEtBRm9CO0FBR3ZCQyxFQUFBQSxFQUFFLEVBQUUsS0FIbUI7QUFJdkJDLEVBQUFBLENBQUMsRUFBRSxLQUpvQjtBQUt2QkMsRUFBQUEsRUFBRSxFQUFFLEtBTG1CO0FBTXZCQyxFQUFBQSxFQUFFLEVBQUUsS0FObUI7QUFPdkJDLEVBQUFBLEdBQUcsRUFBRTtBQVBrQixDQUFsQjs7QUFVQSxJQUFNQyxTQUFTLEdBQUc7QUFDdkJDLEVBQUFBLEdBQUcsRUFBRSxLQURrQjtBQUV2QkMsRUFBQUEsR0FBRyxFQUFFLEtBRmtCO0FBR3ZCQyxFQUFBQSxHQUFHLEVBQUUsS0FIa0I7QUFJdkJDLEVBQUFBLEdBQUcsRUFBRSxLQUprQjtBQUt2QkMsRUFBQUEsR0FBRyxFQUFFLEtBTGtCO0FBTXZCQyxFQUFBQSxHQUFHLEVBQUUsS0FOa0I7QUFPdkJDLEVBQUFBLEdBQUcsRUFBRTtBQVBrQixDQUFsQjs7QUFVQSxJQUFNQyxTQUFTLGlEQUNuQixHQURtQixFQUNiLFNBRGEsK0JBRW5CLEdBRm1CLEVBRWIsU0FGYSwrQkFHbkIsSUFIbUIsRUFHWixTQUhZLG9DQUlqQixTQUppQixvQ0FLakIsU0FMaUIsb0NBTWpCLFNBTmlCLCtCQU9uQixJQVBtQixFQU9aLFNBUFksK0JBUW5CLElBUm1CLEVBUVosU0FSWSwrQkFTbkIsSUFUbUIsRUFTWixTQVRZLCtCQVVuQixJQVZtQixFQVVaLFNBVlksK0JBV25CLElBWG1CLEVBV1osU0FYWSwrQkFZbkIsSUFabUIsRUFZWixTQVpZLCtCQWFuQixLQWJtQixFQWFYLFNBYlcsK0JBY25CLEtBZG1CLEVBY1gsU0FkVywrQkFlbkIsS0FmbUIsRUFlWCxTQWZXLCtCQWdCbkIsS0FoQm1CLEVBZ0JYLFNBaEJXLCtCQWlCbkIsS0FqQm1CLEVBaUJYLFNBakJXLCtCQWtCbkIsS0FsQm1CLEVBa0JYLFNBbEJXLCtCQW1CbkIsS0FuQm1CLEVBbUJYLFNBbkJXLCtCQW9CbkIsS0FwQm1CLEVBb0JYLFNBcEJXLCtCQXFCbkIsS0FyQm1CLEVBcUJYLFNBckJXLCtCQXNCbkIsS0F0Qm1CLEVBc0JYLFNBdEJXLCtCQXVCbkIsS0F2Qm1CLEVBdUJYLFNBdkJXLCtCQXdCbkIsS0F4Qm1CLEVBd0JYLFNBeEJXLCtCQXlCbkIsS0F6Qm1CLEVBeUJYLFNBekJXLCtCQTBCbkIsS0ExQm1CLEVBMEJYLFNBMUJXLCtCQTJCbkIsS0EzQm1CLEVBMkJYLFNBM0JXLCtCQTRCbkIsS0E1Qm1CLEVBNEJYLFNBNUJXLCtCQTZCbkIsS0E3Qm1CLEVBNkJYLFNBN0JXLCtCQThCbkIsS0E5Qm1CLEVBOEJYLFNBOUJXLCtCQStCbkIsS0EvQm1CLEVBK0JYLFNBL0JXLCtCQWdDbkIsS0FoQ21CLEVBZ0NYLFNBaENXLCtCQWlDbkIsS0FqQ21CLEVBaUNYLFNBakNXLCtCQWtDbkIsS0FsQ21CLEVBa0NYLFNBbENXLGNBQWY7O0FBcUNBLElBQU1DLHNCQUFzQixHQUFHO0FBQ3BDQyxFQUFBQSxFQUFFLEVBQUUsQ0FEZ0M7QUFFcENDLEVBQUFBLEVBQUUsRUFBRSxDQUZnQztBQUdwQ0MsRUFBQUEsRUFBRSxFQUFFLENBSGdDO0FBSXBDQyxFQUFBQSxFQUFFLEVBQUUsQ0FKZ0M7QUFLcENDLEVBQUFBLEVBQUUsRUFBRSxDQUxnQztBQU1wQ0MsRUFBQUEsRUFBRSxFQUFFLENBTmdDO0FBT3BDQyxFQUFBQSxFQUFFLEVBQUUsQ0FQZ0M7QUFRcENDLEVBQUFBLEVBQUUsRUFBRSxDQVJnQztBQVNwQ0MsRUFBQUEsRUFBRSxFQUFFLENBVGdDO0FBVXBDQyxFQUFBQSxFQUFFLEVBQUUsQ0FWZ0M7QUFXcENDLEVBQUFBLEdBQUcsRUFBRSxFQVgrQjtBQVlwQ0MsRUFBQUEsR0FBRyxFQUFFLEVBWitCO0FBYXBDQyxFQUFBQSxHQUFHLEVBQUUsRUFiK0I7QUFjcENDLEVBQUFBLEdBQUcsRUFBRSxFQWQrQjtBQWVwQ0MsRUFBQUEsR0FBRyxFQUFFLEVBZitCO0FBZ0JwQ0MsRUFBQUEsR0FBRyxFQUFFLEVBaEIrQjtBQWlCcENDLEVBQUFBLE1BQU0sRUFBRSxLQWpCNEI7QUFrQnBDQyxFQUFBQSxHQUFHLEVBQUUsS0FsQitCO0FBbUJwQ0MsRUFBQUEsRUFBRSxFQUFFLENBbkJnQztBQW9CcENDLEVBQUFBLEdBQUcsRUFBRSxDQXBCK0I7QUFxQnBDQyxFQUFBQSxHQUFHLEVBQUUsQ0FyQitCO0FBc0JwQ0MsRUFBQUEsSUFBSSxFQUFFLENBdEI4QjtBQXVCcENDLEVBQUFBLElBQUksRUFBRTtBQXZCOEIsQ0FBL0I7OztBQTBCQSxJQUFNQyxXQUFXLCtEQUNuQnpDLFNBRG1CLEdBRW5CUSxTQUZtQixHQUduQlEsU0FIbUIsR0FJbkJDLHNCQUptQixDQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBkZXN0VGFibGUgPSB7XG4gIE06ICcwMDEnLFxuICBEOiAnMDEwJyxcbiAgTUQ6ICcwMTEnLFxuICBBOiAnMTAwJyxcbiAgQU06ICcxMDEnLFxuICBBRDogJzExMCcsXG4gIEFNRDogJzExMScsXG59XG5cbmV4cG9ydCBjb25zdCBqdW1wVGFibGUgPSB7XG4gIEpHVDogJzAwMScsXG4gIEpFUTogJzAxMCcsXG4gIEpHRTogJzAxMScsXG4gIEpMVDogJzEwMCcsXG4gIEpORTogJzEwMScsXG4gIEpMRTogJzExMCcsXG4gIEpNUDogJzExMScsXG59XG5cbmV4cG9ydCBjb25zdCBjb21wVGFibGUgPSB7XG4gIFsnMCddOiAnMDEwMTAxMCcsXG4gIFsnMSddOiAnMDExMTExMScsXG4gIFsnLTEnXTogJzAxMTEwMTAnLFxuICBEOiAnMDAwMTEwMCcsXG4gIEE6ICcwMTEwMDAwJyxcbiAgTTogJzExMTAwMDAnLFxuICBbJyFEJ106ICcwMDAxMTAxJyxcbiAgWychQSddOiAnMDExMDAwMScsXG4gIFsnIU0nXTogJzExMTAwMDEnLFxuICBbJy1EJ106ICcwMDAxMTExJyxcbiAgWyctQSddOiAnMDExMDAxMScsXG4gIFsnLU0nXTogJzExMTAwMTEnLFxuICBbJ0QrMSddOiAnMDAxMTExMScsXG4gIFsnQSsxJ106ICcwMTEwMTExJyxcbiAgWydNKzEnXTogJzExMTAxMTEnLFxuICBbJ0QtMSddOiAnMDAwMTExMCcsXG4gIFsnQS0xJ106ICcwMTEwMDEwJyxcbiAgWydNLTEnXTogJzExMTAwMTAnLFxuICBbJ0QrQSddOiAnMDAwMDAxMCcsXG4gIFsnQStEJ106ICcwMDAwMDEwJyxcbiAgWydEK00nXTogJzEwMDAwMTAnLFxuICBbJ00rRCddOiAnMTAwMDAxMCcsXG4gIFsnRC1BJ106ICcwMDEwMDExJyxcbiAgWydBLUQnXTogJzAwMDAxMTEnLFxuICBbJ0QtTSddOiAnMTAxMDAxMScsXG4gIFsnTS1EJ106ICcxMDAwMTExJyxcbiAgWydEJkEnXTogJzAwMDAwMDAnLFxuICBbJ0EmRCddOiAnMDAwMDAwMCcsXG4gIFsnRCZNJ106ICcxMDAwMDAwJyxcbiAgWydNJkQnXTogJzEwMDAwMDAnLFxuICBbJ0R8QSddOiAnMDAxMDEwMScsXG4gIFsnQXxEJ106ICcwMDEwMTAxJyxcbiAgWydEfE0nXTogJzEwMTAxMDEnLFxuICBbJ018RCddOiAnMTAxMDEwMScsXG59XG5cbmV4cG9ydCBjb25zdCBwcmVkZWZpbmVkU3ltYm9sc1RhYmxlID0ge1xuICBSMDogMCxcbiAgUjE6IDEsXG4gIFIyOiAyLFxuICBSMzogMyxcbiAgUjQ6IDQsXG4gIFI1OiA1LFxuICBSNjogNixcbiAgUjc6IDcsXG4gIFI4OiA4LFxuICBSOTogOSxcbiAgUjEwOiAxMCxcbiAgUjExOiAxMSxcbiAgUjEyOiAxMixcbiAgUjEzOiAxMyxcbiAgUjE0OiAxNCxcbiAgUjE1OiAxNSxcbiAgU0NSRUVOOiAxNjM4NCxcbiAgS0JEOiAyNDU3NixcbiAgU1A6IDAsXG4gIExDTDogMSxcbiAgQVJHOiAyLFxuICBUSElTOiAzLFxuICBUSEFUOiA0LFxufVxuXG5leHBvcnQgY29uc3QgbG9va3VwVGFibGUgPSB7XG4gIC4uLmRlc3RUYWJsZSxcbiAgLi4uanVtcFRhYmxlLFxuICAuLi5jb21wVGFibGUsXG4gIC4uLnByZWRlZmluZWRTeW1ib2xzVGFibGUsXG59XG4iXX0=