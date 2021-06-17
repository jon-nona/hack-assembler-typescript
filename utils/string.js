"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leftPad = void 0;

var _ramda = _interopRequireDefault(require("ramda"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAmountOfLeftPad = _ramda["default"].compose(_ramda["default"].max(0), function (wantedLength, value) {
  return _ramda["default"].subtract(wantedLength, _ramda["default"].length(value));
});

var getLeftPad = _ramda["default"].compose(_ramda["default"].join(''), _ramda["default"].repeat('0'), getAmountOfLeftPad);

var leftPad = _ramda["default"].curry(function (wantedLength, value) {
  return _ramda["default"].compose(_ramda["default"].apply(_ramda["default"].concat), _ramda["default"].juxt([getLeftPad, _ramda["default"].nthArg(1)]))(wantedLength, value);
});

exports.leftPad = leftPad;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zdHJpbmcudHMiXSwibmFtZXMiOlsiZ2V0QW1vdW50T2ZMZWZ0UGFkIiwiUiIsImNvbXBvc2UiLCJtYXgiLCJ3YW50ZWRMZW5ndGgiLCJ2YWx1ZSIsInN1YnRyYWN0IiwibGVuZ3RoIiwiZ2V0TGVmdFBhZCIsImpvaW4iLCJyZXBlYXQiLCJsZWZ0UGFkIiwiY3VycnkiLCJhcHBseSIsImNvbmNhdCIsImp1eHQiLCJudGhBcmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUVBLElBQU1BLGtCQUdLLEdBQUdDLGtCQUFFQyxPQUFGLENBQVVELGtCQUFFRSxHQUFGLENBQU0sQ0FBTixDQUFWLEVBQW9CLFVBQUNDLFlBQUQsRUFBdUJDLEtBQXZCO0FBQUEsU0FDaENKLGtCQUFFSyxRQUFGLENBQVdGLFlBQVgsRUFBeUJILGtCQUFFTSxNQUFGLENBQVNGLEtBQVQsQ0FBekIsQ0FEZ0M7QUFBQSxDQUFwQixDQUhkOztBQU9BLElBQU1HLFVBQTJELEdBQUdQLGtCQUFFQyxPQUFGLENBQ2xFRCxrQkFBRVEsSUFBRixDQUFPLEVBQVAsQ0FEa0UsRUFFbEVSLGtCQUFFUyxNQUFGLENBQVMsR0FBVCxDQUZrRSxFQUdsRVYsa0JBSGtFLENBQXBFOztBQU1PLElBQU1XLE9BQU8sR0FBR1Ysa0JBQUVXLEtBQUYsQ0FBUSxVQUFDUixZQUFELEVBQXVCQyxLQUF2QjtBQUFBLFNBQzdCSixrQkFBRUMsT0FBRixDQUFVRCxrQkFBRVksS0FBRixDQUFRWixrQkFBRWEsTUFBVixDQUFWLEVBQTZCYixrQkFBRWMsSUFBRixDQUFPLENBQUNQLFVBQUQsRUFBYVAsa0JBQUVlLE1BQUYsQ0FBUyxDQUFULENBQWIsQ0FBUCxDQUE3QixFQUNFWixZQURGLEVBRUVDLEtBRkYsQ0FENkI7QUFBQSxDQUFSLENBQWhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFIgZnJvbSAncmFtZGEnXG5cbmNvbnN0IGdldEFtb3VudE9mTGVmdFBhZDogKFxuICB3YW50ZWRMZW5ndGg6IG51bWJlcixcbiAgdmFsdWU6IHN0cmluZyxcbikgPT4gc3RyaW5nID0gUi5jb21wb3NlKFIubWF4KDApLCAod2FudGVkTGVuZ3RoOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpID0+XG4gIFIuc3VidHJhY3Qod2FudGVkTGVuZ3RoLCBSLmxlbmd0aCh2YWx1ZSkpLFxuKVxuXG5jb25zdCBnZXRMZWZ0UGFkOiAod2FudGVkTGVuZ3RoOiBudW1iZXIsIHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZyA9IFIuY29tcG9zZShcbiAgUi5qb2luKCcnKSxcbiAgUi5yZXBlYXQoJzAnKSxcbiAgZ2V0QW1vdW50T2ZMZWZ0UGFkLFxuKVxuXG5leHBvcnQgY29uc3QgbGVmdFBhZCA9IFIuY3VycnkoKHdhbnRlZExlbmd0aDogbnVtYmVyLCB2YWx1ZTogc3RyaW5nKSA9PlxuICBSLmNvbXBvc2UoUi5hcHBseShSLmNvbmNhdCksIFIuanV4dChbZ2V0TGVmdFBhZCwgUi5udGhBcmcoMSldKSkoXG4gICAgd2FudGVkTGVuZ3RoLFxuICAgIHZhbHVlLFxuICApLFxuKVxuIl19