import Highcharts from "highcharts/highstock";

// ✅ Load Highcharts modules dynamically (Fixes Vite ESM issue)
export const loadHighchartsModules = () => {
    import("highcharts/indicators/indicators-all").then(m => m.default(Highcharts));
    import("highcharts/modules/drag-panes").then(m => m.default(Highcharts));
    import("highcharts/modules/annotations-advanced").then(m => m.default(Highcharts));
    import("highcharts/modules/full-screen").then(m => m.default(Highcharts));
    import("highcharts/modules/stock-tools").then(m => m.default(Highcharts));
    import("highcharts/modules/hollowcandlestick").then(m => m.default(Highcharts));
    import("highcharts/modules/heikinashi").then(m => m.default(Highcharts));
};

// ✅ Generate Fake OHLCV Data
export const generateFakeData = (numPoints = 50) => {
    const data = [];
    let basePrice = 100;

    for (let i = 0; i < numPoints; i++) {
        const timestamp = Date.now() - (numPoints - i) * 24 * 60 * 60 * 1000;
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
