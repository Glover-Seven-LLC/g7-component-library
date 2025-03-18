import Highcharts from "highcharts/highstock";
import IndicatorsAll from "highcharts/indicators/indicators-all";
import DragPanes from "highcharts/modules/drag-panes";
import AnnotationsAdvanced from "highcharts/modules/annotations-advanced";
import FullScreen from "highcharts/modules/full-screen";
import StockTools from "highcharts/modules/stock-tools";
import HollowCandlestick from "highcharts/modules/hollowcandlestick";
import HeikinAshi from "highcharts/modules/heikinashi";

/**
 * ✅ Load Highcharts modules dynamically (Fixes Vite ESM issues)
 */
export const loadHighchartsModules = () => {
    // ✅ Check if the candlestick module is loaded using getOptions().plotOptions
    if (!Highcharts.getOptions().plotOptions?.candlestick) {
        IndicatorsAll(Highcharts);
        DragPanes(Highcharts);
        AnnotationsAdvanced(Highcharts);
        FullScreen(Highcharts);
        StockTools(Highcharts);
        HollowCandlestick(Highcharts);
        HeikinAshi(Highcharts);
    }
};

/**
 * ✅ Generate Fake OHLCV Data (For Default Mode)
 */
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
