<template>
  <div class="map" id="mapEchart" style="width:100%;height:100%"></div>
</template>

<script setup lang="ts">
// 引入工具
// import geoJson from "@/assets/json/zhejiang.json"; //该文件路径改成自己项目中的文件路径即可
import geoJson from "@/assets/json/hangzhou.json"; //该文件路径改成自己项目中的文件路径即可
import * as echarts from "echarts";
import "echarts-gl"; //3D地图插件
import { onMounted, ref, watch, toRaw } from "vue";

// type
type CityType = {
  name: string,
  value: number[]
}
type DataBaseResult = {
  id: number, name: string, longitude: number, Latitude: number, sum: number
}

// 响应式变量
let cityData = ref<CityType[]>([])


// SSE
// const source = new EventSource('http://127.0.0.1:8000/sse/echarts');

// source.onmessage = function (e) {
//   let arr = JSON.parse(e.data)
//   let newArr: CityType[] = []
//   arr.forEach((item: DataBaseResult) => {
//     newArr.push({ name: item.name, value: [item.longitude, item.Latitude, item.sum] })
//   });
//   cityData.value = newArr
//   // console.log(toRaw(cityData.value));
// };

// 监听器
watch(cityData, (newval, oldval) => {
  chartMap(newval)
})

let cityName = ref<string>('')
let cityValue = ref<any>()

// 定义echarts方法
const chartMap = (data: CityType[] = []) => {
  var myChart = echarts.init((document.getElementById("mapEchart") as HTMLDivElement));
  echarts.registerMap("zhejiang", geoJson as any);
  // 图表配置项
  let option = {
    tooltip: {
      show: true,
    },
    //热力图配置项
    visualMap: [
      {
        type: "continuous",
        text: ["xxx"],
        calculable: true,
        max: 999,
        inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ]
      },
      },
    ],
    //3D地图配置项
    geo3D: {
      map: "zhejiang",
      roam: true,
      shading: 'lambert',
      itemStyle: {
        color: "#ccc",
        opacity: 0.8,
        borderWidth: 0.4,
        borderColor: "#ccc",
        areaColor: '#fff'
      },
      viewControl: {
        autoRotate: false,
        autoRotateAfterStill: 1,
        panMouseButton: 'left',
        // rotateMouseButton: 'right',
        distance: 120,
        minAlpha: 5, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
        maxAlpha: 90, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
        minBeta: -360, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
        maxBeta: 360, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]
        animation: true, // 是否开启动画。[ default: true ]
        animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
        animationEasingUpdate: "cubicInOut", // 过渡动画的缓动效果。[ default: cubicInOut ]
      },

      emphasis: {
        disabled: true, //是否可以被选中
        label: {
          //移入时的高亮文本
          show: true,
          color: "#333", //显示字体颜色变淡
          fontSize: 18, //显示字体变大
          fontWeight:'bold',
          formatter: function (e: any) {
            // console.log(e)
            cityName.value = e.name
            return e.name
          }
        },
        itemStyle: {
          color: "#ccc", //显示移入的区块变粉色
        },
      },
      label: {
        show: true,
        position: "top",
        color: "black", //地图初始化区域字体颜色
        fontSize: 14,
        lineHeight: 16,
      },
      light: {
        //光照阴影
        main: {
          // color: "#fff", //光照颜色
          intensity: 1.5, //光照强度
          //shadowQuality: 'high', //阴影亮度
          shadow: true, //是否显示阴影
          shadowQuality: "high", //阴影质量 ultra //阴影亮度
          alpha: 55,
          beta: 10,
        },
        ambient: {
          intensity: 0.8,
        },
      },
      // groundPlane: {
      //   show: true,
      //   color: '#999'
      // },
      postEffect: {
        enable: true,
        bloom: {
          enable: false
        },
        SSAO: {
          radius: 1,
          intensity: 1,
          enable: true
        },
        depthOfField: {
          enable: false,
          focalRange: 10,
          blurRadius: 10,
          fstop: 1
        }
      },
      temporalSuperSampling: {
        enable: true
      },
      regionHeight: 2
    },
    series: [
      //3D柱状图配置项
      {
        name: "xxx",
        type: "bar3D",
        coordinateSystem: "geo3D",
        barSize: 0.2,
        shading: "lambert",
        opacity: 0.5,
        bevelSize: 0.2,
        label: {
          show: false,
          formatter: function (e: any) {
            // console.log(e.data)
            // cityValue.value = e.data
            return e
          },
        },
        grid3D: {
          height: 100,
        },
        //自定义的data数组 value中数组的含义:[杭州的经度or纬度，要展示的3d柱状图数值大小]
        data: a(),
      },
    ],
  };
  myChart.setOption(option)
  // 获取点击事件
  myChart.getZr().on('click', function (e) {
    // console.log(e);
  });
};

const a = () => {
  let newArr = []
  let arr = { name: "浙江省", value: [119.024027, 29.594455, 999] }
  for (let i = 0; i < 1; i +=0.02) {
   
    for (let j = 0; j < 0.7; j +=0.02) {
      // console.log(parseFloat(j.toFixed(2)));
      newArr.push({ name: "浙江省", value: [parseFloat((arr.value[0] + i).toFixed(6)), parseFloat((arr.value[1] + j).toFixed(6)), Math.floor(Math.random() * 1000)] })
  // }
    }
  }
  return newArr
}

onMounted(() => {
  // 挂载echart
  chartMap()

});
</script>

<style lang="less" scoped>

</style>

