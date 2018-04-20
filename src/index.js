const numeral = require("numeral");

function toObject(obj) {
  return typeof obj == "object" && obj !== null ? obj : {};
}

// Clear plugin instances based on plugin objects
exports.clearPlugins = function(Chart, pluginObjects) {
  var allRegisteredPlugins = Chart.pluginService.getAll();
  // Get all pluginInstances from allRegisteredPlugins based on pluginObjects
  var pluginInstances = pluginObjects.map(function(pluginObject) {
    return allRegisteredPlugins.find(function(element) {
      return element.id === pluginObject.id;
    });
  });
  //console.log(pluginInstances);
  pluginInstances.forEach(function(pluginInstance) {
    Chart.pluginService.unregister(pluginInstance);
  });
  //console.log(Chart.pluginService.getAll());
};

// Show NOs on top of each bar if chartInstance.config.options.custConfig.data is not null
exports.showNOOnTopOfBarChartPlugin = function() {
  return {
    id: "chartjs-plugin-show-no-on-bar-chart",
    beforeDraw: function(chartInstance) {
      //console.log(chartInstance);
      //console.log(chartInstance.canvas);
      var custConfig = chartInstance.config.options.custConfig;
      custConfig = toObject(custConfig);
      if (custConfig.data) {
        var noPosition = [];
        // var chartInstance = this.chart;
        var ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(
          Chart.defaults.global.defaultFontSize - 2,
          Chart.defaults.global.defaultFontStyle,
          Chart.defaults.global.defaultFontFamily + ", FontAwesome"
        );
        // ctx.font = '12px FontAwesome';
        // ctx.textAlign = 'center';
        ctx.textBaseline = "bottom";

        // Calculate the position of NO on top of each bar
        chartInstance.data.datasets.forEach(function(dataset, i) {
          // Only calculate position based on activated bar chart
          if (!dataset.type || dataset.type === "bar") {
            var meta = chartInstance.controller.getDatasetMeta(i);
            //console.log(meta);
            noPosition[i] = meta.data.map(function(
              ChartElement,
              ChartElementi
            ) {
              var xPosition = ChartElement._model.x;
              //if (!(i - 1 < 0)) {
              //  console.log(isNaN(noPosition[i - 1][ChartElementi]));
              //  console.log(noPosition[i - 1][ChartElementi]);
              //}
              var preYPosition =
                i - 1 < 0 || isNaN(noPosition[i - 1][ChartElementi].yPosition)
                  ? ChartElement._model.y
                  : noPosition[i - 1][ChartElementi].yPosition;
              //console.log(preYPosition);
              var yPosition = Math.min(
                preYPosition,
                ChartElement._model.y,
                ChartElement._model.base
              );
              return {
                xPosition: xPosition,
                yPosition: yPosition
              };
            });
          }
        });
        //console.log(noPosition);
        // Put NOs on top of each bar
        //console.log(chartInstance);
        custConfig.data.forEach(function(dataset, dataseti) {
          //console.log(dataset);
          dataset.forEach(function(data, i) {
            //console.log(data);
            // Convert the data
            //console.log(data);
            var absData = Math.abs(data);
            var displayedData =
              absData < 10
                ? absData.toFixed(2)
                : absData < 100
                  ? absData.toFixed(1)
                  : absData.toFixed();
            ctx.fillStyle = data > 0 ? "green" : "red";
            ctx.textAlign = "end";
            ctx.fillText(
              data > 0 ? "\uf062 " : "\uf063 ",
              noPosition[dataseti][i].xPosition,
              noPosition[dataseti][i].yPosition - 5
            );
            ctx.fillStyle = "black";
            ctx.textAlign = "start";
            ctx.fillText(
              displayedData + "%",
              noPosition[dataseti][i].xPosition,
              noPosition[dataseti][i].yPosition - 5
            );
          });
        });
      }
    }
  };
};

// Show NOs on bottom of each bar if chartInstance.config.options.custConfig.noOnBottomOfBarChart is not null
exports.showNOOnBottomOfBarChartPlugin = function() {
  return {
    id: "chartjs-plugin-show-no-on-bottom-bar-chart",
    afterDatasetsDraw: function(chartInstance) {
      //console.log(chartInstance);
      //console.log(chartInstance.canvas);
      var custConfig = chartInstance.config.options.custConfig;
      custConfig = toObject(custConfig);
      if (custConfig.noOnBottomOfBarChart) {
        var noPosition = [];
        // var chartInstance = this.chart;
        var ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(
          Chart.defaults.global.defaultFontSize - 2,
          Chart.defaults.global.defaultFontStyle,
          Chart.defaults.global.defaultFontFamily + ", FontAwesome"
        );
        // ctx.font = '12px FontAwesome';
        // ctx.textAlign = 'center';
        ctx.textBaseline = "bottom";

        // Calculate the position of NO on top of each bar
        chartInstance.data.datasets.forEach(function(dataset, i) {
          // Only calculate position based on activated bar chart
          if (!dataset.type || dataset.type === "bar") {
            var meta = chartInstance.controller.getDatasetMeta(i);
            //console.log(meta);
            noPosition[i] = meta.data.map(function(
              ChartElement,
              ChartElementi
            ) {
              //console.log(ChartElement);
              var xPosition = ChartElement._model.x;
              var yPosition = ChartElement._yScale.bottom;
              return {
                xPosition: xPosition,
                yPosition: yPosition
              };
            });
          }
        });
        //console.log(noPosition);
        // Put NOs on bottom of each bar
        //console.log(chartInstance);
        custConfig.noOnBottomOfBarChart.forEach(function(dataset, dataseti) {
          //console.log(dataset);
          dataset.forEach(function(data, i) {
            //console.log(data);
            // Convert the data
            //console.log(data);
            var displayedData = data;
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(
              displayedData,
              noPosition[dataseti][i].xPosition,
              noPosition[dataseti][i].yPosition - 2
            );
          });
        });
      }
    }
  };
};

// Show annotation on top of each bar if chartInstance.config.options.custConfig.infoOnTopOfBarChart is not null
exports.showInfoOnTopOfBarChartPlugin = function() {
  return {
    id: "chartjs-plugin-show-info-on-bar-chart",
    beforeDraw: function(chartInstance) {
      //console.log(chartInstance);
      //console.log(chartInstance.canvas);
      var custConfig = chartInstance.config.options.custConfig;
      custConfig = toObject(custConfig);
      if (custConfig.infoOnTopOfBarChart) {
        var position = [];
        var boxHeight = 50;
        var boxYOffset = 20;
        var ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(
          Chart.defaults.global.defaultFontSize + 2,
          "bold",
          Chart.defaults.global.defaultFontFamily + ", FontAwesome"
        );
        //console.log(Chart.defaults.global);

        // Calculate the position of rectangle on top of each bar
        chartInstance.data.datasets.forEach(function(dataset, i) {
          // Only calculate position based on activated bar chart
          if (!dataset.type || dataset.type === "bar") {
            //console.log(chartInstance.controller);
            var meta = chartInstance.controller.getDatasetMeta(i);
            //console.log(meta);
            //console.log(meta.data.map(function (item) {
            //  return item._model;
            //}));
            meta.data.forEach(function(ChartElement, j) {
              //console.log(ChartElement);
              var x =
                typeof position[j] != "undefined"
                  ? Math.min(
                      position[j].x,
                      ChartElement._model.x - ChartElement._model.width / 2
                    )
                  : ChartElement._model.x - ChartElement._model.width / 2;
              var xMax =
                typeof position[j] != "undefined"
                  ? Math.max(position[j].x, ChartElement._model.x)
                  : ChartElement._model.x;
              var yMax =
                typeof position[j] != "undefined"
                  ? Math.min(
                      position[j].y + position[j].height + boxYOffset,
                      ChartElement._model.y
                    ) - boxYOffset
                  : ChartElement._model.y - boxYOffset;
              var y = yMax - boxHeight;
              var newPosition = {
                x: x,
                xMax: xMax,
                y: y,
                yMax: yMax
              };
              //console.log(newPosition);
              position[j] = {
                x: newPosition.x,
                y: newPosition.y,
                width:
                  newPosition.xMax -
                  newPosition.x +
                  ChartElement._model.width / 2,
                height: newPosition.yMax - newPosition.y
              };
            });
          }
        });
        //console.log(position);
        //Make the box in one line
        var heightestY = Math.min.apply(
          Math,
          position.map(function(p) {
            return p.y;
          })
        );
        position = position.map(function(p) {
          p.y = heightestY;
          return p;
        });
        // Put NOs on top of each bar
        custConfig.infoOnTopOfBarChart.forEach(function(infoData, infoDatai) {
          //console.log(dataset);
          //console.log('infoData', infoData);

          infoData.forEach(function(data, i) {
            var boxPostion = position[i];
            //console.log(boxPostion);
            // Drown the box
            ctx.fillStyle = "#f9f9f9";
            ctx.fillRect(
              boxPostion.x,
              boxPostion.y,
              boxPostion.width,
              boxPostion.height
            );

            // Drown the text
            var topTextPosition = {
              x: boxPostion.x + boxPostion.width / 2,
              y: boxPostion.y + boxPostion.height / 4
            };

            var bottomTextPosition = {
              x: boxPostion.x + boxPostion.width / 2,
              y: boxPostion.y + boxPostion.height * 3 / 4
            };
            //console.log(data);
            var displayedData = numeral(data).format("$0,0");
            ctx.fillStyle = data > 0 ? "red" : "green";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText(displayedData, topTextPosition.x, topTextPosition.y);
            ctx.fillStyle = "black";
            ctx.fillText("TO GO", bottomTextPosition.x, bottomTextPosition.y);
          });
        });
      }
    }
  };
};
