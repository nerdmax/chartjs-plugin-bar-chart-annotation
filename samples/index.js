const barChartAnnotationPlugin = require("../src/index");

const {
  clearPlugins,
  showNOOnTopOfBarChartPlugin,
  showNOOnBottomOfBarChartPlugin,
  showInfoOnTopOfBarChartPlugin
} = barChartAnnotationPlugin;

const Chart = {}; // Should require('chart.js');

clearPlugins(Chart, [
  showNOOnTopOfBarChartPlugin,
  showNOOnBottomOfBarChartPlugin
]);

Chart.pluginService.register(showNOOnTopOfBarChartPlugin);
Chart.pluginService.register(showNOOnBottomOfBarChartPlugin);
Chart.pluginService.register(showInfoOnTopOfBarChartPlugin);
