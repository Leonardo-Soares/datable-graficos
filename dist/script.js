let draw = false;

init();

/**
 * FUNCTIONS
 */

function init() {
  // initialize DataTables
  const table = $("#dt-table").DataTable();
  // get table data
  const tableData = getTableData(table);
  // create Highcharts
  createHighcharts(tableData);
  // table events
  setTableEvents(table);
}

function getTableData(table) {
  const dataArray = [],
  countryArray = [],
  populationArray = [],
  densityArray = [];

  // loop table rows
  table.rows({ search: "applied" }).every(function () {
    const data = this.data();
    countryArray.push(data[0]);
    populationArray.push(parseInt(data[1].replace(/\,/g, "")));
    densityArray.push(parseInt(data[2].replace(/\,/g, "")));
  });

  // store all data in dataArray
  dataArray.push(countryArray, populationArray, densityArray);

  return dataArray;
}

function createHighcharts(data) {
  Highcharts.setOptions({
    lang: {
      thousandsSep: "," } });



  Highcharts.chart("chart", {
    title: {
      text: "Relatório de Atividades em 2021" },

    subtitle: {
      text: "Matriculados, cursos e média por bairro" },

    xAxis: [
    {
      categories: data[0],
      labels: {
        rotation: -45 } }],



    yAxis: [
    {
      // first yaxis
      title: {
        text: "2021" } },


    {
      // secondary yaxis
      title: {
        text: "Density (P/Km²)" },

      min: 0,
      opposite: true }],


    series: [
    {
      name: "Population (2017)",
      color: "#0071A7",
      type: "column",
      data: data[1],
      tooltip: {
        valueSuffix: " M" } },


    {
      name: "Density (P/Km²)",
      color: "#FF404E",
      type: "spline",
      data: data[2],
      yAxis: 1 }],


    tooltip: {
      shared: true },

    legend: {
      backgroundColor: "#ececec",
      shadow: true },

    credits: {
      enabled: false },

    noData: {
      style: {
        fontSize: "16px" } } });



}

function setTableEvents(table) {
  // listen for page clicks
  table.on("page", () => {
    draw = true;
  });

  // listen for updates and adjust the chart accordingly
  table.on("draw", () => {
    if (draw) {
      draw = false;
    } else {
      const tableData = getTableData(table);
      createHighcharts(tableData);
    }
  });
}