function getChartColorsArray(e) {
  if (null !== document.getElementById(e)) {
    var t = document.getElementById(e).getAttribute("data-colors");
    return (t = JSON.parse(t)).map(function (e) {
      var t = e.replace(" ", "");
      if (-1 == t.indexOf("--")) return t;
      var a = getComputedStyle(document.documentElement).getPropertyValue(t);
      return a || void 0;
    });
  }
}
var options = {
    chart: {
      height: 380,
      type: "line",
      zoom: { enabled: !1 },
      toolbar: { show: !1 },
    },
    colors: (barchartColors = getChartColorsArray("line_chart_datalabel")),
    dataLabels: { enabled: !1 },
    stroke: { width: [3, 3], curve: "straight" },
    series: [
      { name: "High - 2018", data: [26, 24, 32, 36, 33, 31, 33] },
      { name: "Low - 2018", data: [14, 11, 16, 12, 17, 13, 12] },
    ],
    title: {
      text: "Average High & Low Temperature",
      align: "left",
      style: { fontWeight: 500 },
    },
    grid: {
      row: { colors: ["transparent", "transparent"], opacity: 0.2 },
      borderColor: "#f1f1f1",
    },
    markers: { style: "inverted", size: 6 },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      title: { text: "Month" },
    },
    yaxis: { title: { text: "Temperature" }, min: 5, max: 40 },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: !0,
      offsetY: -25,
      offsetX: -5,
    },
    responsive: [
      {
        breakpoint: 600,
        options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
      },
    ],
  },
  chart = new ApexCharts(
    document.querySelector("#line_chart_datalabel"),
    options
  );
chart.render();
options = {
  chart: {
    height: 380,
    type: "line",
    zoom: { enabled: !1 },
    toolbar: { show: !1 },
  },
  colors: (barchartColors = getChartColorsArray("line_chart_dashed")),
  dataLabels: { enabled: !1 },
  stroke: { width: [3, 4, 3], curve: "straight", dashArray: [0, 8, 5] },
  series: [
    {
      name: "Session Duration",
      data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
    },
    {
      name: "Page Views",
      data: [36, 42, 60, 42, 13, 18, 29, 37, 36, 51, 32, 35],
    },
    {
      name: "Total Visits",
      data: [89, 56, 74, 98, 72, 38, 64, 46, 84, 58, 46, 49],
    },
  ],
  title: { text: "Page Statistics", align: "left", style: { fontWeight: 500 } },
  markers: { size: 0, hover: { sizeOffset: 6 } },
  xaxis: {
    categories: [
      "01 Jan",
      "02 Jan",
      "03 Jan",
      "04 Jan",
      "05 Jan",
      "06 Jan",
      "07 Jan",
      "08 Jan",
      "09 Jan",
      "10 Jan",
      "11 Jan",
      "12 Jan",
    ],
  },
  tooltip: {
    y: [
      {
        title: {
          formatter: function (e) {
            return e + " (mins)";
          },
        },
      },
      {
        title: {
          formatter: function (e) {
            return e + " per session";
          },
        },
      },
      {
        title: {
          formatter: function (e) {
            return e;
          },
        },
      },
    ],
  },
  grid: { borderColor: "#f1f1f1" },
};
(chart = new ApexCharts(
  document.querySelector("#line_chart_dashed"),
  options
)).render();
var barchartColors = getChartColorsArray("area_chart_basic"),
  options = {
    series: [{ name: "STOCK ABC", data: series.monthDataSeries1.prices }],
    chart: { type: "area", height: 350, zoom: { enabled: !1 } },
    dataLabels: { enabled: !1 },
    stroke: { curve: "straight" },
    title: {
      text: "Fundamental Analysis of Stocks",
      align: "left",
      style: { fontWeight: 500 },
    },
    subtitle: { text: "Price Movements", align: "left" },
    labels: series.monthDataSeries1.dates,
    xaxis: { type: "datetime" },
    yaxis: { opposite: !0 },
    legend: { horizontalAlign: "left" },
    colors: ["#038edc"],
  };
(chart = new ApexCharts(
  document.querySelector("#area_chart_basic"),
  options
)).render();
options = {
  series: [
    { name: "series1", data: [31, 40, 28, 51, 42, 109, 100] },
    { name: "series2", data: [11, 32, 45, 32, 34, 52, 41] },
  ],
  chart: { height: 350, type: "area" },
  dataLabels: { enabled: !1 },
  stroke: { curve: "smooth" },
  colors: (barchartColors = getChartColorsArray("area_chart_spline")),
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
  },
  tooltip: { x: { format: "dd/MM/yy HH:mm" } },
};
(chart = new ApexCharts(
  document.querySelector("#area_chart_spline"),
  options
)).render();
options = {
  chart: { height: 350, type: "bar", toolbar: { show: !1 } },
  plotOptions: {
    bar: { horizontal: !1, columnWidth: "45%", endingShape: "rounded" },
  },
  dataLabels: { enabled: !1 },
  stroke: { show: !0, width: 2, colors: ["transparent"] },
  series: [
    { name: "Net Profit", data: [46, 57, 59, 54, 62, 58, 64, 60, 66] },
    { name: "Revenue", data: [74, 83, 102, 97, 86, 106, 93, 114, 94] },
    { name: "Free Cash Flow", data: [37, 42, 38, 26, 47, 50, 54, 55, 43] },
  ],
  colors: (barchartColors = getChartColorsArray("column_chart")),
  xaxis: {
    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  },
  yaxis: { title: { text: "$ (thousands)" } },
  grid: { borderColor: "#f1f1f1" },
  fill: { opacity: 1 },
  tooltip: {
    y: {
      formatter: function (e) {
        return "$ " + e + " thousands";
      },
    },
  },
};
(chart = new ApexCharts(
  document.querySelector("#column_chart"),
  options
)).render();
options = {
  chart: { height: 350, type: "bar", toolbar: { show: !1 } },
  plotOptions: { bar: { dataLabels: { position: "top" } } },
  dataLabels: {
    enabled: !0,
    formatter: function (e) {
      return e + "%";
    },
    offsetY: -20,
    style: { fontSize: "12px", colors: ["#adb5bd"] },
  },
  series: [
    {
      name: "Inflation",
      data: [2.5, 3.2, 5, 10.1, 4.2, 3.8, 3, 2.4, 4, 1.2, 3.5, 0.8],
    },
  ],
  colors: (barchartColors = getChartColorsArray("column_chart_datalabel")),
  grid: { borderColor: "#f1f1f1" },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    position: "top",
    labels: { offsetY: -18 },
    axisBorder: { show: !1 },
    axisTicks: { show: !1 },
    crosshairs: {
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "#D8E3F0",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: { enabled: !0, offsetY: -35 },
  },
  fill: {
    gradient: {
      shade: "light",
      type: "horizontal",
      shadeIntensity: 0.25,
      gradientToColors: void 0,
      inverseColors: !0,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [50, 0, 100, 100],
    },
  },
  yaxis: {
    axisBorder: { show: !1 },
    axisTicks: { show: !1 },
    labels: {
      show: !1,
      formatter: function (e) {
        return e + "%";
      },
    },
  },
  title: {
    text: "Monthly Inflation in Argentina, 2002",
    floating: !0,
    offsetY: 320,
    align: "center",
    style: { fontWeight: 500 },
  },
};
(chart = new ApexCharts(
  document.querySelector("#column_chart_datalabel"),
  options
)).render();
options = {
  chart: { height: 350, type: "bar", toolbar: { show: !1 } },
  plotOptions: { bar: { horizontal: !0 } },
  dataLabels: { enabled: !1 },
  series: [{ data: [380, 430, 450, 475, 550, 584, 780, 1100, 1220, 1365] }],
  colors: (barchartColors = getChartColorsArray("bar_chart")),
  grid: { borderColor: "#f1f1f1" },
  xaxis: {
    categories: [
      "South Korea",
      "Canada",
      "United Kingdom",
      "Netherlands",
      "Italy",
      "France",
      "Japan",
      "United States",
      "China",
      "Germany",
    ],
  },
};
(chart = new ApexCharts(
  document.querySelector("#bar_chart"),
  options
)).render();
(barchartColors = getChartColorsArray("custom_datalabels_bar")),
  (options = {
    series: [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }],
    chart: { type: "bar", height: 350, toolbar: { show: !1 } },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: !0,
        horizontal: !0,
        dataLabels: { position: "bottom" },
      },
    },
    colors: [
      "#5fd0f3",
      "#495057",
      "#e83e8c",
      "#13d8aa",
      "#f34e4e",
      "#2b908f",
      "#f9a3a4",
      "#564ab1",
      "#f1734f",
      "#038edc",
    ],
    dataLabels: {
      enabled: !0,
      textAnchor: "start",
      style: { colors: ["#fff"] },
      formatter: function (e, t) {
        return t.w.globals.labels[t.dataPointIndex] + ":  " + e;
      },
      offsetX: 0,
      dropShadow: { enabled: !1 },
    },
    stroke: { width: 1, colors: ["#fff"] },
    xaxis: {
      categories: [
        "South Korea",
        "Canada",
        "United Kingdom",
        "Netherlands",
        "Italy",
        "France",
        "Japan",
        "United States",
        "China",
        "India",
      ],
    },
    yaxis: { labels: { show: !1 } },
    title: {
      text: "Custom DataLabels",
      align: "center",
      floating: !0,
      style: { fontWeight: 600 },
    },
    subtitle: {
      text: "Category Names as DataLabels inside bars",
      align: "center",
    },
    tooltip: {
      theme: "dark",
      x: { show: !1 },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
  });
(chart = new ApexCharts(
  document.querySelector("#custom_datalabels_bar"),
  options
)).render();
options = {
  series: [
    {
      name: "Website Blog",
      type: "column",
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
    },
    {
      name: "Social Media",
      type: "line",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
    },
  ],
  chart: { height: 350, type: "line", toolbar: { show: !1 } },
  stroke: { width: [0, 4] },
  title: { text: "Traffic Sources", style: { fontWeight: 600 } },
  dataLabels: { enabled: !0, enabledOnSeries: [1] },
  labels: [
    "01 Jan 2001",
    "02 Jan 2001",
    "03 Jan 2001",
    "04 Jan 2001",
    "05 Jan 2001",
    "06 Jan 2001",
    "07 Jan 2001",
    "08 Jan 2001",
    "09 Jan 2001",
    "10 Jan 2001",
    "11 Jan 2001",
    "12 Jan 2001",
  ],
  xaxis: { type: "datetime" },
  yaxis: [
    { title: { text: "Website Blog", style: { fontWeight: 600 } } },
    {
      opposite: !0,
      title: { text: "Social Media", style: { fontWeight: 600 } },
    },
  ],
  colors: (barchartColors = getChartColorsArray("line_column_chart")),
};
(chart = new ApexCharts(
  document.querySelector("#line_column_chart"),
  options
)).render();
options = {
  series: [
    {
      name: "Income",
      type: "column",
      data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
    },
    {
      name: "Cashflow",
      type: "column",
      data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
    },
    { name: "Revenue", type: "line", data: [20, 29, 37, 36, 44, 45, 50, 58] },
  ],
  chart: { height: 350, type: "line", stacked: !1, toolbar: { show: !1 } },
  dataLabels: { enabled: !1 },
  stroke: { width: [1, 1, 4] },
  title: {
    text: "XYZ - Stock Analysis (2009 - 2016)",
    align: "left",
    offsetX: 110,
    style: { fontWeight: 600 },
  },
  xaxis: { categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016] },
  yaxis: [
    {
      axisTicks: { show: !0 },
      axisBorder: { show: !0, color: "#038edc" },
      labels: { style: { colors: "#038edc" } },
      title: {
        text: "Income (thousand crores)",
        style: { color: "#038edc", fontWeight: 600 },
      },
      tooltip: { enabled: !0 },
    },
    {
      seriesName: "Income",
      opposite: !0,
      axisTicks: { show: !0 },
      axisBorder: { show: !0, color: "#038edc" },
      labels: { style: { colors: "#038edc" } },
      title: {
        text: "Operating Cashflow (thousand crores)",
        style: { color: "#038edc", fontWeight: 600 },
      },
    },
    {
      seriesName: "Revenue",
      opposite: !0,
      axisTicks: { show: !0 },
      axisBorder: { show: !0, color: "#51d28c" },
      labels: { style: { colors: "#51d28c" } },
      title: {
        text: "Revenue (thousand crores)",
        style: { color: "#51d28c", fontWeight: 600 },
      },
    },
  ],
  tooltip: {
    fixed: { enabled: !0, position: "topLeft", offsetY: 30, offsetX: 60 },
  },
  legend: { horizontalAlign: "left", offsetX: 40 },
  colors: (barchartColors = getChartColorsArray("multi_chart")),
};
(chart = new ApexCharts(
  document.querySelector("#multi_chart"),
  options
)).render();
(barchartColors = getChartColorsArray("basic_timeline")),
  (options = {
    series: [
      {
        data: [
          {
            x: "Code",
            y: [
              new Date("2019-03-02").getTime(),
              new Date("2019-03-04").getTime(),
            ],
          },
          {
            x: "Test",
            y: [
              new Date("2019-03-04").getTime(),
              new Date("2019-03-08").getTime(),
            ],
          },
          {
            x: "Validation",
            y: [
              new Date("2019-03-08").getTime(),
              new Date("2019-03-12").getTime(),
            ],
          },
          {
            x: "Deployment",
            y: [
              new Date("2019-03-12").getTime(),
              new Date("2019-03-18").getTime(),
            ],
          },
        ],
      },
    ],
    chart: { height: 350, type: "rangeBar", toolbar: { show: !1 } },
    plotOptions: { bar: { horizontal: !0 } },
    xaxis: { type: "datetime" },
    colors: barchartColors,
  });
(chart = new ApexCharts(
  document.querySelector("#basic_timeline"),
  options
)).render();
(barchartColors = getChartColorsArray("color_timeline")),
  (options = {
    series: [
      {
        data: [
          {
            x: "Analysis",
            y: [
              new Date("2019-02-27").getTime(),
              new Date("2019-03-04").getTime(),
            ],
            fillColor: barchartColors[0],
          },
          {
            x: "Design",
            y: [
              new Date("2019-03-04").getTime(),
              new Date("2019-03-08").getTime(),
            ],
            fillColor: barchartColors[1],
          },
          {
            x: "Coding",
            y: [
              new Date("2019-03-07").getTime(),
              new Date("2019-03-10").getTime(),
            ],
            fillColor: barchartColors[2],
          },
          {
            x: "Testing",
            y: [
              new Date("2019-03-08").getTime(),
              new Date("2019-03-12").getTime(),
            ],
            fillColor: barchartColors[3],
          },
          {
            x: "Deployment",
            y: [
              new Date("2019-03-12").getTime(),
              new Date("2019-03-17").getTime(),
            ],
            fillColor: barchartColors[4],
          },
        ],
      },
    ],
    chart: { height: 330, type: "rangeBar", toolbar: { show: !1 } },
    plotOptions: {
      bar: {
        horizontal: !0,
        distributed: !0,
        dataLabels: { hideOverflowingLabels: !1 },
      },
    },
    dataLabels: {
      enabled: !0,
      formatter: function (e, t) {
        var a = t.w.globals.labels[t.dataPointIndex],
          r = moment(e[0]),
          o = moment(e[1]).diff(r, "days");
        return a + ": " + o + (1 < o ? " days" : " day");
      },
    },
    xaxis: { type: "datetime" },
    yaxis: { show: !0 },
  });
function generateData(e, t, a) {
  for (var r = 0, o = []; r < t; ) {
    var s = Math.floor(750 * Math.random()) + 1,
      i = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min,
      n = Math.floor(61 * Math.random()) + 15;
    o.push([s, i, n]), r++;
  }
  return o;
}
(chart = new ApexCharts(
  document.querySelector("#color_timeline"),
  options
)).render();
(barchartColors = getChartColorsArray("simple_bubble")),
  (options = {
    series: [
      {
        name: "Bubble1",
        data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: "Bubble2",
        data: generateData(new Date("12 Feb 2017 GMT").getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: "Bubble3",
        data: generateData(new Date("13 Feb 2017 GMT").getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: "Bubble4",
        data: generateData(new Date("14 Feb 2017 GMT").getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
    ],
    chart: { height: 350, type: "bubble", toolbar: { show: !1 } },
    dataLabels: { enabled: !1 },
    fill: { opacity: 0.8 },
    title: { text: "Simple Bubble Chart", style: { fontWeight: 500 } },
    xaxis: { tickAmount: 12, type: "category" },
    yaxis: { max: 70 },
    colors: barchartColors,
  });
(chart = new ApexCharts(
  document.querySelector("#simple_bubble"),
  options
)).render();
(barchartColors = getChartColorsArray("bubble_chart")),
  (options = {
    series: [
      {
        name: "Product1",
        data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: "Product2",
        data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: "Product3",
        data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: "Product4",
        data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
    ],
    chart: { height: 350, type: "bubble", toolbar: { show: !1 } },
    dataLabels: { enabled: !1 },
    fill: { type: "gradient" },
    title: { text: "3D Bubble Chart", style: { fontWeight: 500 } },
    xaxis: { tickAmount: 12, type: "datetime", labels: { rotate: 0 } },
    yaxis: { max: 70 },
    theme: { palette: "palette2" },
    colors: barchartColors,
  });
(chart = new ApexCharts(
  document.querySelector("#bubble_chart"),
  options
)).render();
options = {
  series: [44, 55, 13, 43, 22],
  chart: { height: 350, type: "pie" },
  labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
  legend: { position: "bottom" },
  dataLabels: { dropShadow: { enabled: !1 } },
  colors: (barchartColors = getChartColorsArray("simple_pie_chart")),
};
(chart = new ApexCharts(
  document.querySelector("#simple_pie_chart"),
  options
)).render();
options = {
  series: [44, 55, 41, 17, 15],
  chart: { height: 350, type: "donut" },
  legend: { position: "bottom" },
  dataLabels: { dropShadow: { enabled: !1 } },
  colors: (barchartColors = getChartColorsArray("simple_dount_chart")),
};
(chart = new ApexCharts(
  document.querySelector("#simple_dount_chart"),
  options
)).render();
options = {
  series: [70],
  chart: { height: 350, type: "radialBar" },
  plotOptions: { radialBar: { hollow: { size: "70%" } } },
  labels: ["Cricket"],
  colors: (barchartColors = getChartColorsArray("basic_radialbar")),
};
(chart = new ApexCharts(
  document.querySelector("#basic_radialbar"),
  options
)).render();
options = {
  series: [44, 55, 67, 83],
  chart: { height: 350, type: "radialBar" },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: { fontSize: "22px" },
        value: { fontSize: "16px" },
        total: {
          show: !0,
          label: "Total",
          formatter: function (e) {
            return 249;
          },
        },
      },
    },
  },
  labels: ["Apples", "Oranges", "Bananas", "Berries"],
  colors: (barchartColors = getChartColorsArray("multiple_radialbar")),
};
(chart = new ApexCharts(
  document.querySelector("#multiple_radialbar"),
  options
)).render();
options = {
  series: [{ name: "Series 1", data: [80, 50, 30, 40, 100, 20] }],
  chart: { height: 350, type: "radar", toolbar: { show: !1 } },
  stroke: { colors: (barchartColors = getChartColorsArray("basic_radar")) },
  xaxis: {
    categories: ["January", "February", "March", "April", "May", "June"],
  },
};
(chart = new ApexCharts(
  document.querySelector("#basic_radar"),
  options
)).render();
options = {
  series: [
    { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
    { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
    { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
  ],
  chart: {
    height: 350,
    type: "radar",
    dropShadow: { enabled: !0, blur: 1, left: 1, top: 1 },
    toolbar: { show: !1 },
  },
  stroke: { width: 2 },
  fill: { opacity: 0.2 },
  markers: { size: 0 },
  colors: (barchartColors = getChartColorsArray("multi_radar")),
  xaxis: { categories: ["2014", "2015", "2016", "2017", "2018", "2019"] },
};
(chart = new ApexCharts(
  document.querySelector("#multi_radar"),
  options
)).render();
options = {
  series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
  chart: { type: "polarArea", width: 400 },
  labels: [
    "Series A",
    "Series B",
    "Series C",
    "Series D",
    "Series E",
    "Series F",
    "Series G",
    "Series H",
    "Series I",
  ],
  stroke: { colors: ["#fff"] },
  fill: { opacity: 0.8 },
  legend: { position: "bottom" },
  colors: (barchartColors = getChartColorsArray("basic_polar_area")),
};
(chart = new ApexCharts(
  document.querySelector("#basic_polar_area"),
  options
)).render();
options = {
  series: [42, 47, 52, 58, 65],
  chart: { width: 400, type: "polarArea" },
  labels: ["Rose A", "Rose B", "Rose C", "Rose D", "Rose E"],
  fill: { opacity: 1 },
  stroke: { width: 1, colors: void 0 },
  yaxis: { show: !1 },
  legend: { position: "bottom" },
  plotOptions: {
    polarArea: { rings: { strokeWidth: 0 }, spokes: { strokeWidth: 0 } },
  },
  theme: {
    mode: "light",
    palette: "palette1",
    monochrome: {
      enabled: !0,
      shadeTo: "light",
      color: "#038edc",
      shadeIntensity: 0.6,
    },
  },
};
(chart = new ApexCharts(
  document.querySelector("#monochrome_polar_area"),
  options
)).render();
