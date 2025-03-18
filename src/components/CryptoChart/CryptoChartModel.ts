import Highcharts from "highcharts/highstock";
import dayjs from "dayjs";

// ✅ Load Highcharts modules dynamically (Fixes Vite ESM issue)
export const loadHighchartsModules = () => {
    import("highcharts/indicators/indicators-all").then((module) => module.default(Highcharts));
    import("highcharts/modules/drag-panes").then((module) => module.default(Highcharts));
    import("highcharts/modules/annotations-advanced").then((module) => module.default(Highcharts));
    import("highcharts/modules/full-screen").then((module) => module.default(Highcharts));
    import("highcharts/modules/stock-tools").then((module) => module.default(Highcharts));
    import("highcharts/modules/hollowcandlestick").then((module) => module.default(Highcharts));
    import("highcharts/modules/heikinashi").then((module) => module.default(Highcharts));
};

// ✅ Generate Fake OHLCV Data
export const generateFakeData = (numPoints = 50) => {
    const data = [];
    let basePrice = 100;

    for (let i = 0; i < numPoints; i++) {
        const timestamp = dayjs().subtract(numPoints - i, "day").valueOf();
        const open = basePrice + Math.random() * 5 - 2.5;
        const high = open + Math.random() * 3;
        const low = open - Math.random() * 3;
        const close = low + Math.random() * (high - low);
        const volume = Math.floor(Math.random() * 100000) + 50000;

        data.push([timestamp, open, high, low, close, volume]);
        basePrice = close;
    }

    return data;
};
