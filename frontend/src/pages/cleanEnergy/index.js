import React, {PureComponent, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

/*import {//dashboard组件
    DashboardWrapper,
    DashboardNavigator,
    DashboardLogo,
    DashboardBox1,
    DashboardBox2,
    Boxcircle,
    Boxcircle2,
    ContentWrapper,
    WelcomeWrapper,
    WelcomeThreeLines,
    SelectWrapper,
    BoxWrapper,
    Context1,
    SelectBox,
    SelectButton,
    WelcomeText,
    SelectText,
    RecommmendWrapper, PlanTextWrapper, PlanText,
    ChangePlanButton, GraphGraph,
    EnergySourcesWrapper, Context2, EnergySourceGraph, UsageText,
    LayoutWrapper,ContentLeft,ContentRight

} from './style';*/

function Dashboard2(){
  
//   //state variables
//   const [usageList, setUsageList] = useState([]);
//   const [costList, setCostList] = useState([]);
//   const [option1, setOption1] = useState({});
//   const [option2, setOption2] = useState({});
//   const [option3, setOption3] = useState({});
//   const [option4, setOption4] = useState({});
//   const handleChangePlanClick = () => {
//       window.open("https://www.ioenergy.com.au/OurPlans/", "_self");
//   };
//   setOption1(
//     {
//       title: {
//         text: 'Average Percent of Renewable Energy'
//       },
//       tooltip : {
//           trigger : 'axis',
//           axisPointer: {
//               type: 'cross'
//           }
//       },
//       grid: {
//           left: '5%',
//           right: '5%',
//           bottom: '5%',
//           top:'30%',
//           width: 'auto',
//           containLabel: true
//       },
//       toolbox: {
//           feature: {
//               dataView: { show: true, readOnly: true },
//               restore: { show: true },
//               saveAsImage: { show: true }
//           }
//       },
//       legend: {
//           data: ['curtShare(curtailment)', 'wshrShare(renewables)']
//       },
//       xAxis: [
//       {
//           type: 'category',
//           axisTick: {
//           alignWithLabel: true
//           },
          
//         // prettier-ignore
//           data: ['0am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '13pm',
//           '14pm','15pm','16pm','17pm','18pm','19pm','20pm','21pm','22pm','23pm']
//       }
//       ],
//       yAxis: [
//       {
//           type: 'value',
//           // name: 'Hourly electricity usage',
//           min: 0,
//           max: 100,
//           position: 'right',
//           axisLine: {
//               show: true,
//               lineStyle: {
//               // color: '#81F1C5'
//               }
//           },
//           axisLabel: {
//               formatter: ''
//           }
//       },
//       {
//           type: 'value',
//           name: 'Share(%)',
//           min: 0,
//           max: 100,
//           position: 'left',
//           axisLine: {
//               show: true,
//               lineStyle: {
//               color: '#FF127F'
//               }
//           },
//           axisLabel: {
//               formatter: '{value} %'
//           }
//       }
//       ],
//       series: [
//       {
//           name: 'curtShare(curtailment)',
//           type: 'bar',
//           data: usageList,
//           itemStyle: {
//               normal: {
//                   color: '#FFF3F8',
//                   borderRadius: '20px',
//               }
//           },
//       },
//       {
//           name: 'wshrShare(renewables)',
//           type: 'line',
//           yAxisIndex: 1,
//           data: costList,
//           itemStyle: {
//               normal: {
//                   color: '#FF127F',
//               }
//           },
//       }
//       ],
//   });
//   setOption2(
//     {
//       color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
//             title: {
//               text: 'Average Level of Energy Generation'
//             },
//             tooltip: {
//               trigger: 'axis',
//               axisPointer: {
//                 type: 'cross',
//                 label: {
//                   backgroundColor: '#6a7985'
//                 }
//               }
//             },
//             legend: {
//               data: ['Wind', 'Solar', 'Gas', 'Import', 'Rooftop']
//             },
//             toolbox: {
//               feature: {
//                 dataView: { show: true, readOnly: true },
//                 restore: { show: true },
//                 saveAsImage: {show: true}
//               }
//             },
//             grid: {
//               left: '3%',
//               right: '4%',
//               bottom: '3%',
//               top:'30%',
//               containLabel: true
//             },
//             xAxis: [
//               {
//                 type: 'category',
//                 boundaryGap: false,
//                 data: ['0am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '13pm',
//                 '14pm','15pm','16pm','17pm','18pm','19pm','20pm','21pm','22pm','23pm']
//               }
//             ],
//             yAxis: [
//               {
//                 type: 'value',
//                 name: 'Generation(MW)',
//                 min: 0,
//                 // max: 1200,
//                 position: 'left',
//                 axisLine: {
//                     show: true,
//                 },
//                 axisLabel: {
//                     formatter: '{value} MW'
//                 }
//             }
//             ],
//             series: [
//               {
//                 name: 'Wind',
//                 type: 'line',
//                 stack: 'Total',
//                 smooth: true,
//                 lineStyle: {
//                   width: 0
//                 },
//                 showSymbol: false,
//                 areaStyle: {
//                   opacity: 0.8,
//                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                     {
//                       offset: 0,
//                       color: 'rgb(128, 255, 165)'
//                     },
//                     {
//                       offset: 1,
//                       color: 'rgb(1, 191, 236)'
//                     }
//                   ])
//                 },
//                 emphasis: {
//                   focus: 'series'
//                 },
//                 data: [736.0782914972928, 740.1176104065697, 743.0086691436759, 736.7428044962776, 729.560216499606, 722.5530306123085, 715.0533132898346, 707.6526790795211, 693.4992680061514, 665.0358835375991, 624.964171853112, 586.7617799980683, 554.8746685470057, 539.1951446868369, 536.6596499377366, 543.4322347490288, 552.9035045148921, 571.1119423452129, 595.9702534560332, 621.0752307085899, 653.1014413743486, 678.6237074160015, 706.5572057405334, 725.7638199287379]
//               },
//               {
//                 name: 'Solar',
//                 type: 'line',
//                 stack: 'Total',
//                 smooth: true,
//                 lineStyle: {
//                   width: 0
//                 },
//                 showSymbol: false,
//                 areaStyle: {
//                   opacity: 0.8,
//                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                     {
//                       offset: 0,
//                       color: 'rgb(0, 221, 255)'
//                     },
//                     {
//                       offset: 1,
//                       color: 'rgb(77, 119, 255)'
//                     }
//                   ])
//                 },
//                 emphasis: {
//                   focus: 'series'
//                 },
//                 data: [-0.13775904819848822, -0.1368019893473765, -0.13622767479092993, -0.13841041297820453, -0.13936430821073284, -0.1396349030821928, 0.34233125321433844, 4.976735609383578, 19.483277522416486, 51.50748984634542, 94.92304031442482, 132.3115305939306, 151.68188517004018, 157.66046532573623, 158.94778805211166, 154.68309802529328, 148.85520900669965, 136.9790032578467, 111.20188358730802, 70.40389133157971, 28.110652122030306, 4.08838252590527, -0.0901968772557248, -0.13594511934292572]
//               },
            
//               {
//                 name: 'Gas',
//                 type: 'line',
//                 stack: 'Total',
//                 smooth: true,
//                 lineStyle: {
//                   width: 0
//                 },
//                 showSymbol: false,
//                 areaStyle: {
//                   opacity: 0.8,
//                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                     {
//                       offset: 0,
//                       color: 'rgb(255, 0, 135)'
//                     },
//                     {
//                       offset: 1,
//                       color: 'rgb(135, 0, 157)'
//                     }
//                   ])
//                 },
//                 emphasis: {
//                   focus: 'series'
//                 },
//                 data: [756.2011906001608, 701.8810144844737, 630.1440086256547, 559.1797611580761, 516.1619881853886, 509.4513832265045, 542.8400062601461, 604.5268806662646, 670.8638286127119, 703.7704460300913, 685.3337491024205, 625.2390564829816, 570.343940692701, 538.7473798826703, 538.2699117243001, 554.5665849283846, 592.5665409486344, 666.3694714910829, 793.9344991271796, 951.1313274604797, 1041.9144626862844, 1011.6785226299496, 907.7636254996586, 813.819173458812]
//               },
//               {
//                 name: 'Import',
//                 type: 'line',
//                 stack: 'Total',
//                 smooth: true,
//                 lineStyle: {
//                   width: 0
//                 },
//                 showSymbol: false,
//                 label: {
//                   show: true,
//                   position: 'top'
//                 },
//                 areaStyle: {
//                   opacity: 0.8,
//                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                     {
//                       offset: 0,
//                       color: 'rgb(255, 191, 0)'
//                     },
//                     {
//                       offset: 1,
//                       color: 'rgb(224, 62, 76)'
//                     }
//                   ])
//                 },
//                 emphasis: {
//                   focus: 'series'
//                 },
//                 data: [147.21315540471758, 155.59088525846752, 176.72700776897832, 174.44012936254146, 165.7981313181374, 158.20824172312376, 144.0597341763753, 132.15515915322428, 119.91765966560791, 107.81734319664088, 96.58611458780821, 88.15904333399094, 73.1059711583436, 63.421641957124386, 57.90183754158463, 58.668522893604, 65.35235975608107, 72.38893105308402, 80.75651114894315, 92.37618475121694, 107.46444863383083, 135.1951010165018, 149.4481844123618, 145.33519987847063]
//               },

//               {
//                 name: 'Rooftop',
//                 type: 'line',
//                 stack: 'Total',
//                 smooth: true,
//                 lineStyle: {
//                   width: 0
//                 },
//                 showSymbol: false,
//                 areaStyle: {
//                   opacity: 0.8,
//                   // Need to change colour
//                   // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                   //   {
//                   //     offset: 0,
//                   //     color: 'rgb(0, 189, 255)'
//                   //   },
//                   //   {
//                   //     offset: 1,
//                   //     color: 'rgb(77, 119, 255)'
//                   //   }
//                   // ])
//                 },
//                 emphasis: {
//                   focus: 'series'
//                 },
//                 data: [-0.13775904819848822, -0.1368019893473765, -0.13622767479092993, -0.13841041297820453, -0.13936430821073284, -0.1396349030821928, 0.34233125321433844, 6.976735609383578, 32.483277522416486, 84.50748984634542, 123.92304031442482, 164.3115305939306, 181.68188517004018, 187.66046532573623, 189.94778805211166, 184.68309802529328, 178.85520900669965, 166.9790032578467, 141.20188358730802, 110.40389133157971, 52.110652122030306, 32.08838252590527, -0.0901968772557248, -0.13594511934292572]
//               },
//             ]
//     });
//     setOption3(
//       {
//         title: {
//           text: 'Carbon intensity CO\u2082'//'Stacked Area Chart'
//         },
//         tooltip: {
//           trigger: 'axis',
//           axisPointer: {
//             type: 'cross',
//             label: {
//               backgroundColor: '#6a7985'
//             }
//           }
//         },
//         legend: {
//           data: []
//         },
//         toolbox: {
//           feature: {
//             dataView: { show: true, readOnly: true },
//             restore: { show: true },
//             saveAsImage: {show: true}
//           }
//         },
//         grid: {
//           left: '3%',
//           right: '4%',
//           bottom: '3%',
//           top:'30%',
//           containLabel: true
//         },
//         xAxis: [
//           {
//             type: 'category',
//             boundaryGap: false,
//             data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//           }
//         ],
//         yAxis: [
//           {
//             type: 'value'
//           }
//         ],
//         series: [
//           {
//             name: 'Email',
//             type: 'line',
//             stack: 'Total',
//             areaStyle: {},
//             emphasis: {
//               focus: 'series'
//             },
//             data: [120, 132, 101, 134, 90, 230, 210]
//           }]
//       });
//       setOption4(
//         {
//           tooltip: {
//             trigger: 'item',
//         },
//         grid: {
//             // top: '5%',
//             // height: "450px", //width: '100%',
//             top:"top",
//             left:'center',
//             containLabel: true,
//         },
//         color:['#81F1C5', '#facfeb', '#FF127F','#ffffff'], // green, light pink, dark pink and white

//         legend: [// Define legend positions
//             {
//                 data: ['Solar'],
//                 top: '95%',
//                 left:'22%',
//                 icon: "circle",
//             },
//             {
//         data: ['Import'],
//             top: '85%',
//             left:'22%', icon: "circle",
//     },  {
//             data: ['Natural Gas'],
//             top: '85%',
//             left: '60%', icon: "circle",
//         }, {
//             data: ['Wind'],
//             top: '95%',
//             left: '60%', icon: "circle",
//         }],

//         series: [
//             {
//                 name: 'Energy Sources',
//                 type: 'pie',
//                 radius: ['55%', '70%'],
//                 avoidLabelOverlap: true,
//                 label: {
//                     show:false ,
//                     position: 'center'
//                 },
//                 emphasis: {
//                     label: {
//                         show: false,
//                         fontSize: '20',
//                         fontWeight: 'bold'
//                     }
//                 },
//                 data: [
//                     { value: 1048, name: 'Solar' },
//                     { value: 735, name: 'Import' },
//                     { value: 580, name: 'Natural Gas' },
//                     { value: 484, name: 'Wind' },
//                 ]
//             }
//         ],
//         graphic: [{　　　　　　　　　　　　　　　　
//             type: 'text',　　　　　　　　　　　　
//             left: 'center',
//             top: '43%',
//             style: {
//                 text: "72%",
//                 textAlign: 'center',
//                 fill: '#000',　　　　　　　　
//                 width: 30,
//                 height: 30,
//                 fontSize: 40,
//                 color: "#4d4f5c",
//                 fontWeight: "bold",
//                 fontFamily: "Montserrat",
//             }
//         }, {
//             type: 'text',
//             left: 'center',
//             top: '53%',
//             style: {
//             text: 'Green Energy',
//                 textAlign: 'center',
//                 fill: '#000',
//                 width: 30,
//                 height: 30,
//                 fontSize: 20,
//                 fontFamily: "Montserrat",
//         }
//     }],

//         });

// // class Dashboard2 extends PureComponent {
// //     constructor() {
        
// //         super();
// //         let usageList =  [47.82901301151435, 49.02348502084633, 50.71845976604542, 53.399781749472126, 55.55641246880008, 56.256606767764076, 55.56567836904665, 53.95105776555712, 53.11673959120253, 54.96132363523169, 60.289434332501095, 67.28708979645766, 73.015544173353, 76.65797710778571, 78.1096399903971, 77.40195675367536, 74.2525077433982, 68.31934077869705, 59.262727079595656, 49.3339260024151, 42.628145153787365, 40.758346795638026, 43.180125028785895, 46.31278736411795];
// //         let costList = [1.786814292665316, 1.900627696382164, 2.2214786121092405, 2.728173091391926, 3.0850191795426944, 3.2175926910843886, 3.2463236502957846, 3.1222659085944606, 2.865244513532308, 2.7864102826620463, 3.2341332463612162, 3.958966816911489, 4.760276883127588, 5.463001628538885, 5.952555359934344, 6.021125580286696, 5.959939884307696, 5.3135425862799055, 3.839148583267632, 2.418874307654254, 1.4779692301854213, 1.2662720137167705, 1.377911232039077, 1.5574578985059595];

// //         let option1 = {
// //           title: {
// //             text: 'Average Percent of Renewable Energy'
// //           },
// //           tooltip : {
// //               trigger : 'axis',
// //               axisPointer: {
// //                   type: 'cross'
// //               }
// //           },
// //           grid: {
// //               left: '5%',
// //               right: '5%',
// //               bottom: '5%',
// //               top:'30%',
// //               width: 'auto',
// //               containLabel: true
// //           },
// //           toolbox: {
// //               feature: {
// //                   dataView: { show: true, readOnly: true },
// //                   restore: { show: true },
// //                   saveAsImage: { show: true }
// //               }
// //           },
// //           legend: {
// //               data: ['curtShare(curtailment)', 'wshrShare(renewables)']
// //           },
// //           xAxis: [
// //           {
// //               type: 'category',
// //               axisTick: {
// //               alignWithLabel: true
// //               },
              
// //             // prettier-ignore
// //               data: ['0am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '13pm',
// //               '14pm','15pm','16pm','17pm','18pm','19pm','20pm','21pm','22pm','23pm']
// //           }
// //           ],
// //           yAxis: [
// //           {
// //               type: 'value',
// //               // name: 'Hourly electricity usage',
// //               min: 0,
// //               max: 100,
// //               position: 'right',
// //               axisLine: {
// //                   show: true,
// //                   lineStyle: {
// //                   // color: '#81F1C5'
// //                   }
// //               },
// //               axisLabel: {
// //                   formatter: ''
// //               }
// //           },
// //           {
// //               type: 'value',
// //               name: 'Share(%)',
// //               min: 0,
// //               max: 100,
// //               position: 'left',
// //               axisLine: {
// //                   show: true,
// //                   lineStyle: {
// //                   color: '#FF127F'
// //                   }
// //               },
// //               axisLabel: {
// //                   formatter: '{value} %'
// //               }
// //           }
// //           ],
// //           series: [
// //           {
// //               name: 'curtShare(curtailment)',
// //               type: 'bar',
// //               data: usageList,
// //               itemStyle: {
// //                   normal: {
// //                       color: '#FFF3F8',
// //                       borderRadius: '20px',
// //                   }
// //               },
// //           },
// //           {
// //               name: 'wshrShare(renewables)',
// //               type: 'line',
// //               yAxisIndex: 1,
// //               data: costList,
// //               itemStyle: {
// //                   normal: {
// //                       color: '#FF127F',
// //                   }
// //               },
// //           }
// //           ],
// //       }
// //         let option2 = {
// //             color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
// //             title: {
// //               text: 'Average Level of Energy Generation'
// //             },
// //             tooltip: {
// //               trigger: 'axis',
// //               axisPointer: {
// //                 type: 'cross',
// //                 label: {
// //                   backgroundColor: '#6a7985'
// //                 }
// //               }
// //             },
// //             legend: {
// //               data: ['Wind', 'Solar', 'Gas', 'Import', 'Rooftop']
// //             },
// //             toolbox: {
// //               feature: {
// //                 dataView: { show: true, readOnly: true },
// //                 restore: { show: true },
// //                 saveAsImage: {show: true}
// //               }
// //             },
// //             grid: {
// //               left: '3%',
// //               right: '4%',
// //               bottom: '3%',
// //               top:'30%',
// //               containLabel: true
// //             },
// //             xAxis: [
// //               {
// //                 type: 'category',
// //                 boundaryGap: false,
// //                 data: ['0am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '13pm',
// //                 '14pm','15pm','16pm','17pm','18pm','19pm','20pm','21pm','22pm','23pm']
// //               }
// //             ],
// //             yAxis: [
// //               {
// //                 type: 'value',
// //                 name: 'Generation(MW)',
// //                 min: 0,
// //                 // max: 1200,
// //                 position: 'left',
// //                 axisLine: {
// //                     show: true,
// //                 },
// //                 axisLabel: {
// //                     formatter: '{value} MW'
// //                 }
// //             }
// //             ],
// //             series: [
// //               {
// //                 name: 'Wind',
// //                 type: 'line',
// //                 stack: 'Total',
// //                 smooth: true,
// //                 lineStyle: {
// //                   width: 0
// //                 },
// //                 showSymbol: false,
// //                 areaStyle: {
// //                   opacity: 0.8,
// //                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
// //                     {
// //                       offset: 0,
// //                       color: 'rgb(128, 255, 165)'
// //                     },
// //                     {
// //                       offset: 1,
// //                       color: 'rgb(1, 191, 236)'
// //                     }
// //                   ])
// //                 },
// //                 emphasis: {
// //                   focus: 'series'
// //                 },
// //                 data: [736.0782914972928, 740.1176104065697, 743.0086691436759, 736.7428044962776, 729.560216499606, 722.5530306123085, 715.0533132898346, 707.6526790795211, 693.4992680061514, 665.0358835375991, 624.964171853112, 586.7617799980683, 554.8746685470057, 539.1951446868369, 536.6596499377366, 543.4322347490288, 552.9035045148921, 571.1119423452129, 595.9702534560332, 621.0752307085899, 653.1014413743486, 678.6237074160015, 706.5572057405334, 725.7638199287379]
// //               },
// //               {
// //                 name: 'Solar',
// //                 type: 'line',
// //                 stack: 'Total',
// //                 smooth: true,
// //                 lineStyle: {
// //                   width: 0
// //                 },
// //                 showSymbol: false,
// //                 areaStyle: {
// //                   opacity: 0.8,
// //                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
// //                     {
// //                       offset: 0,
// //                       color: 'rgb(0, 221, 255)'
// //                     },
// //                     {
// //                       offset: 1,
// //                       color: 'rgb(77, 119, 255)'
// //                     }
// //                   ])
// //                 },
// //                 emphasis: {
// //                   focus: 'series'
// //                 },
// //                 data: [-0.13775904819848822, -0.1368019893473765, -0.13622767479092993, -0.13841041297820453, -0.13936430821073284, -0.1396349030821928, 0.34233125321433844, 4.976735609383578, 19.483277522416486, 51.50748984634542, 94.92304031442482, 132.3115305939306, 151.68188517004018, 157.66046532573623, 158.94778805211166, 154.68309802529328, 148.85520900669965, 136.9790032578467, 111.20188358730802, 70.40389133157971, 28.110652122030306, 4.08838252590527, -0.0901968772557248, -0.13594511934292572]
// //               },
            
// //               {
// //                 name: 'Gas',
// //                 type: 'line',
// //                 stack: 'Total',
// //                 smooth: true,
// //                 lineStyle: {
// //                   width: 0
// //                 },
// //                 showSymbol: false,
// //                 areaStyle: {
// //                   opacity: 0.8,
// //                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
// //                     {
// //                       offset: 0,
// //                       color: 'rgb(255, 0, 135)'
// //                     },
// //                     {
// //                       offset: 1,
// //                       color: 'rgb(135, 0, 157)'
// //                     }
// //                   ])
// //                 },
// //                 emphasis: {
// //                   focus: 'series'
// //                 },
// //                 data: [756.2011906001608, 701.8810144844737, 630.1440086256547, 559.1797611580761, 516.1619881853886, 509.4513832265045, 542.8400062601461, 604.5268806662646, 670.8638286127119, 703.7704460300913, 685.3337491024205, 625.2390564829816, 570.343940692701, 538.7473798826703, 538.2699117243001, 554.5665849283846, 592.5665409486344, 666.3694714910829, 793.9344991271796, 951.1313274604797, 1041.9144626862844, 1011.6785226299496, 907.7636254996586, 813.819173458812]
// //               },
// //               {
// //                 name: 'Import',
// //                 type: 'line',
// //                 stack: 'Total',
// //                 smooth: true,
// //                 lineStyle: {
// //                   width: 0
// //                 },
// //                 showSymbol: false,
// //                 label: {
// //                   show: true,
// //                   position: 'top'
// //                 },
// //                 areaStyle: {
// //                   opacity: 0.8,
// //                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
// //                     {
// //                       offset: 0,
// //                       color: 'rgb(255, 191, 0)'
// //                     },
// //                     {
// //                       offset: 1,
// //                       color: 'rgb(224, 62, 76)'
// //                     }
// //                   ])
// //                 },
// //                 emphasis: {
// //                   focus: 'series'
// //                 },
// //                 data: [147.21315540471758, 155.59088525846752, 176.72700776897832, 174.44012936254146, 165.7981313181374, 158.20824172312376, 144.0597341763753, 132.15515915322428, 119.91765966560791, 107.81734319664088, 96.58611458780821, 88.15904333399094, 73.1059711583436, 63.421641957124386, 57.90183754158463, 58.668522893604, 65.35235975608107, 72.38893105308402, 80.75651114894315, 92.37618475121694, 107.46444863383083, 135.1951010165018, 149.4481844123618, 145.33519987847063]
// //               },

// //               {
// //                 name: 'Rooftop',
// //                 type: 'line',
// //                 stack: 'Total',
// //                 smooth: true,
// //                 lineStyle: {
// //                   width: 0
// //                 },
// //                 showSymbol: false,
// //                 areaStyle: {
// //                   opacity: 0.8,
// //                   // Need to change colour
// //                   // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
// //                   //   {
// //                   //     offset: 0,
// //                   //     color: 'rgb(0, 189, 255)'
// //                   //   },
// //                   //   {
// //                   //     offset: 1,
// //                   //     color: 'rgb(77, 119, 255)'
// //                   //   }
// //                   // ])
// //                 },
// //                 emphasis: {
// //                   focus: 'series'
// //                 },
// //                 data: [-0.13775904819848822, -0.1368019893473765, -0.13622767479092993, -0.13841041297820453, -0.13936430821073284, -0.1396349030821928, 0.34233125321433844, 6.976735609383578, 32.483277522416486, 84.50748984634542, 123.92304031442482, 164.3115305939306, 181.68188517004018, 187.66046532573623, 189.94778805211166, 184.68309802529328, 178.85520900669965, 166.9790032578467, 141.20188358730802, 110.40389133157971, 52.110652122030306, 32.08838252590527, -0.0901968772557248, -0.13594511934292572]
// //               },
// //             ]
// //         };
// //         let option3 = {
// //           title: {
// //             text: 'Carbon intensity CO\u2082'//'Stacked Area Chart'
// //           },
// //           tooltip: {
// //             trigger: 'axis',
// //             axisPointer: {
// //               type: 'cross',
// //               label: {
// //                 backgroundColor: '#6a7985'
// //               }
// //             }
// //           },
// //           legend: {
// //             data: []
// //           },
// //           toolbox: {
// //             feature: {
// //               dataView: { show: true, readOnly: true },
// //               restore: { show: true },
// //               saveAsImage: {show: true}
// //             }
// //           },
// //           grid: {
// //             left: '3%',
// //             right: '4%',
// //             bottom: '3%',
// //             top:'30%',
// //             containLabel: true
// //           },
// //           xAxis: [
// //             {
// //               type: 'category',
// //               boundaryGap: false,
// //               data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
// //             }
// //           ],
// //           yAxis: [
// //             {
// //               type: 'value'
// //             }
// //           ],
// //           series: [
// //             {
// //               name: 'Email',
// //               type: 'line',
// //               stack: 'Total',
// //               areaStyle: {},
// //               emphasis: {
// //                 focus: 'series'
// //               },
// //               data: [120, 132, 101, 134, 90, 230, 210]
// //             },
// //             // {
// //             //   name: 'Union Ads',
// //             //   type: 'line',
// //             //   stack: 'Total',
// //             //   areaStyle: {},
// //             //   emphasis: {
// //             //     focus: 'series'
// //             //   },
// //             //   data: [220, 182, 191, 234, 290, 330, 310]
// //             // },
// //             // {
// //             //   name: 'Video Ads',
// //             //   type: 'line',
// //             //   stack: 'Total',
// //             //   areaStyle: {},
// //             //   emphasis: {
// //             //     focus: 'series'
// //             //   },
// //             //   data: [150, 232, 201, 154, 190, 330, 410]
// //             // },
// //             // {
// //             //   name: 'Direct',
// //             //   type: 'line',
// //             //   stack: 'Total',
// //             //   areaStyle: {},
// //             //   emphasis: {
// //             //     focus: 'series'
// //             //   },
// //             //   data: [320, 332, 301, 334, 390, 330, 320]
// //             // },
// //             // {
// //             //   name: 'Search Engine',
// //             //   type: 'line',
// //             //   stack: 'Total',
// //             //   label: {
// //             //     show: true,
// //             //     position: 'top'
// //             //   },
// //             //   areaStyle: {},
// //             //   emphasis: {
// //             //     focus: 'series'
// //             //   },
// //             //   data: [820, 932, 901, 934, 1290, 1330, 1320]
// //             // }
// //           ]
// //         };

// //         // let option4 = echarts.init(document.getElementById('canvas'));

// //         let option4 = {
// //             tooltip: {
// //                 trigger: 'item',
// //             },
// //             grid: {
// //                 // top: '5%',
// //                 // height: "450px", //width: '100%',
// //                 top:"top",
// //                 left:'center',
// //                 containLabel: true,
// //             },
// //             color:['#81F1C5', '#facfeb', '#FF127F','#ffffff'], // green, light pink, dark pink and white

// //             legend: [// Define legend positions
// //                 {
// //                     data: ['Solar'],
// //                     top: '95%',
// //                     left:'22%',
// //                     icon: "circle",
// //                 },
// //                 {
// //             data: ['Import'],
// //                 top: '85%',
// //                 left:'22%', icon: "circle",
// //         },  {
// //                 data: ['Natural Gas'],
// //                 top: '85%',
// //                 left: '60%', icon: "circle",
// //             }, {
// //                 data: ['Wind'],
// //                 top: '95%',
// //                 left: '60%', icon: "circle",
// //             }],

// //             series: [
// //                 {
// //                     name: 'Energy Sources',
// //                     type: 'pie',
// //                     radius: ['55%', '70%'],
// //                     avoidLabelOverlap: true,
// //                     label: {
// //                         show:false ,
// //                         position: 'center'
// //                     },
// //                     emphasis: {
// //                         label: {
// //                             show: false,
// //                             fontSize: '20',
// //                             fontWeight: 'bold'
// //                         }
// //                     },
// //                     data: [
// //                         { value: 1048, name: 'Solar' },
// //                         { value: 735, name: 'Import' },
// //                         { value: 580, name: 'Natural Gas' },
// //                         { value: 484, name: 'Wind' },
// //                     ]
// //                 }
// //             ],
// //             graphic: [{　　　　　　　　　　　　　　　　
// //                 type: 'text',　　　　　　　　　　　　
// //                 left: 'center',
// //                 top: '43%',
// //                 style: {
// //                     text: "72%",
// //                     textAlign: 'center',
// //                     fill: '#000',　　　　　　　　
// //                     width: 30,
// //                     height: 30,
// //                     fontSize: 40,
// //                     color: "#4d4f5c",
// //                     fontWeight: "bold",
// //                     fontFamily: "Montserrat",
// //                 }
// //             }, {
// //                 type: 'text',
// //                 left: 'center',
// //                 top: '53%',
// //                 style: {
// //                 text: 'Green Energy',
// //                     textAlign: 'center',
// //                     fill: '#000',
// //                     width: 30,
// //                     height: 30,
// //                     fontSize: 20,
// //                     fontFamily: "Montserrat",
// //             }
// //         }],
// //         }


// //         this.state = {
// //             option1,
// //             option2,
// //             option3,
// //             option4,
// //         }
// //         this.handleChangePlanClick = this.handleChangePlanClick.bind(this);

// //     }

//     // Change Plan Button - Open Our Plans in iO Energy Website in the same tab
//     handleChangePlanClick = () => {
//         window.open("https://www.ioenergy.com.au/OurPlans/", "_self");
//     };

// 	//render() {
//         // const { data } = this.props.location
// 		return(
// 			<DashboardWrapper>
// 				<DashboardNavigator>
//                         <DashboardLogo>
//                         </DashboardLogo>
//                         <Link to='/dashboard'>
//                         <DashboardBox2>
//                             <Boxcircle2>
//                             </Boxcircle2>
//                         </DashboardBox2>
//                         </Link>
//                         <DashboardBox1>
//                             <Boxcircle>
//                             </Boxcircle>
//                         </DashboardBox1>
//                 </DashboardNavigator>
//                     <ContentWrapper>
//                         <WelcomeWrapper>
//                             <WelcomeThreeLines>
//                             </WelcomeThreeLines>
//                             <WelcomeText style={{fontWeight: '600'}}>Welcome, Yuexin </WelcomeText>
//                         </WelcomeWrapper>
//                         <LayoutWrapper>
//                         	<ContentLeft>
//                             <SelectText>
//                              Environment details 
//                             </SelectText>
//                                 <GraphGraph>
//                                   <ReactEcharts option = {option1} />
//                                 </GraphGraph>
//                                 <GraphGraph>
//                                   <ReactEcharts option = {option2} />
//                                 </GraphGraph>
//                                 <GraphGraph>
//                                   <ReactEcharts option = {option3} />
//                                 </GraphGraph>
//                             </ContentLeft>
//                         	<ContentRight>
//                             <Context1 style={{color:'#FF127F'}}>Recommended plan</Context1>
//                             <RecommmendWrapper>
//                               <PlanTextWrapper>
//                                 <PlanText style={{fontWeight:'bold', fontSize:'40px'}}> Lightning
//                                 </PlanText>
//                                 <PlanText style={{marginTop:'30px', fontSize:'18px'}}>
//                                 Changing plan can reduce your cost and carbon by <font style={{fontWeight:'bold'}}>17%</font>
//                                 </PlanText>
//                                 </PlanTextWrapper>
//                                 <Link to={{ pathname: "https://www.ioenergy.com.au/OurPlans/" }} target="_blank">
//                                 <ChangePlanButton onClick={handleChangePlanClick}>
//                                     Change Plan
//                                 </ChangePlanButton>
//                               </Link>
//                             </RecommmendWrapper>
//                                 <EnergySourcesWrapper>
//                                     <Context2>Energy Sources</Context2>
//                                     {/*<UsageText>*/}
//                                     {/*    Usage from <font*/}
//                                     {/*    style={{color: '#FF127F', textDecoration: 'underline'}}>{data.startDate}</font> to&nbsp;*/}
//                                     {/*    <font style={{color: '#FF127F', textDecoration: 'underline'}}>{data.endDate}</font>*/}
//                                     {/*</UsageText>*/}
//                                     <EnergySourceGraph>
//                                         <ReactEcharts option = {option4} style={{height: "450px", }} />
//                                     </EnergySourceGraph>
//                                 </EnergySourcesWrapper>
//                           </ContentRight>
//                         </LayoutWrapper>
//                     </ContentWrapper>

//                 </DashboardWrapper>
// 			);
}

export default Dashboard2;
