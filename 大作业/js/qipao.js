

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/flare.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new CirclePacking('bing3', {
      autoFit: true,
      padding: 0,
      data,
      sizeField: 'r',
      // 自定义颜色
      colorField: 'r',
      color: '#eb8146-#853447-#d95850',
      // 自定义样式
      pointStyle: {
        stroke: 'rgb(183, 55, 121)',
        lineWidth: 0.5,
      },
      label: false,
      legend: false,
      drilldown: {
        enabled: true,
        breadCrumb: {
          position: 'top-left',
        },
      },
    });

    plot.render();
  });
