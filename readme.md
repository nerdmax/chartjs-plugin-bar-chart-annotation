# chartjs-plugin-bar-chart-annotation
> Bar chart annotation for Chart.js

[![NPM Version][npm-image]][npm-url]
<!-- [![Build Status][travis-image]][travis-url] -->
[![Downloads Stats][npm-downloads]][npm-url]

![](header.png)

## Installation

```sh
npm install chartjs-plugin-bar-chart-annotation --save
```

## Usage example

```sh
const barChartAnnotationPlugin = require("../src/index");

const {
  clearPlugins,
  showNOOnTopOfBarChartPlugin,
  showNOOnBottomOfBarChartPlugin,
  showInfoOnTopOfBarChartPlugin
} = barChartAnnotationPlugin;

const Chart = {}; // Should require('chart.js');
```

```sh
// Just in case one plguin gets registered twice
clearPlugins(Chart, [
  showNOOnTopOfBarChartPlugin
]);

Chart.pluginService.register(showNOOnTopOfBarChartPlugin);
```
![](header.png)

```sh
// Just in case one plguin gets registered twice
clearPlugins(Chart, [
  showNOOnBottomOfBarChartPlugin
]);

Chart.pluginService.register(showNOOnBottomOfBarChartPlugin);
```
![](header.png)

```sh
// Just in case one plguin gets registered twice
clearPlugins(Chart, [
  showInfoOnTopOfBarChartPlugin
]);

Chart.pluginService.register(showInfoOnTopOfBarChartPlugin);
```
![](header.png)

_For more examples and usage, please refer to the [Wiki][wiki]._

## Development setup

```sh
git clone git@github.com:nerdmax/chartjs-plugin-bar-chart-annotation.git
cd chartjs-plugin-bar-chart-annotation
npm install
```

## Release History

<!-- * 0.2.1
    * CHANGE: Update docs (module code remains unchanged)
* 0.2.0
    * CHANGE: Remove `setDefaultXYZ()`
    * ADD: Add `init()`
* 0.1.1
    * FIX: Crash when calling `baz()` (Thanks @GenerousContributorName!)
* 0.1.0
    * The first proper release
    * CHANGE: Rename `foo()` to `bar()` -->
* 0.0.1
    * Put all source code here, work in progress

## Meta

Max LIU – [My personal website](#) – mrliucan@foxmail.com

Distributed under the ISC license. See ``LICENSE`` for more information.

[https://github.com/nerdmax/chartjs-plugin-bar-chart-annotation](https://github.com/nerdmax/chartjs-plugin-bar-chart-annotation)

## Contributing

1. Fork it (<https://github.com/nerdmax/chartjs-plugin-bar-chart-annotation/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]:https://www.npmjs.com/package/chartjs-plugin-bar-chart-annotation
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/nerdmax/chartjs-plugin-bar-chart-annotation/wiki
