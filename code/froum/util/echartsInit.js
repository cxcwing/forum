const option = {
    MyPostChart: (postData) => {
        return {
            title: {
                text: '贴子类型'
            },
            color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },

            legend: {
                bottom: "0%",
                // 修改小图标的大小
                itemWidth: 10,
                itemHeight: 10,
                // 修改图例组件的文字为 12px
                textStyle: {
                    color: "black",
                    fontSize: "12"
                }
            },
            series: [
                {
                    name: "贴子类型分布",
                    type: "pie",
                    // 这个radius可以修改饼形图的大小
                    // radius 第一个值是内圆的半径 第二个值是外圆的半径
                    radius: ["40%", "60%"],
                    center: ["50%", "45%"],
                    avoidLabelOverlap: false,
                    // 图形上的文字
                    label: {
                        show: false,
                        position: "center"
                    },
                    // 链接文字和图形的线是否显示
                    labelLine: {
                        show: false
                    },
                    data: postData

                }
            ]
        }
    },
    MyTaleChart2: (TaleLookNumberpost,TaleGoodNumber,TaleCollectionNumber) => {
        return {
            title: {
                text: '故事数据'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['收藏数', '点赞数', '浏览数']
            },
            series: [
                {
                
                    type: 'bar',
                    data: [`${TaleCollectionNumber}`,`${TaleGoodNumber}`,`${TaleLookNumberpost}`],
                    label: {
                        show: true,
                        position: "inside",
                        // {c} 会自动的解析为 数据  data里面的数据
                        formatter: "{c}"
                      },
                      itemStyle:{
                        color:"#31dbcb"
                      }
                },

            ]
        }
    },
    MyTaleChart: (postData) => {
        return {
            title: {
                text: '故事类型'
            },
            color: ["#1adf94", "#59d101","#01d11c","#01d158", "#1a8bdf", "#55cc64", "#ac0b0b"],
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },

            legend: {
                bottom: "0%",
                // 修改小图标的大小
                itemWidth: 10,
                itemHeight: 10,
                // 修改图例组件的文字为 12px
                textStyle: {
                    color: "black",
                    fontSize: "12"
                }
            },
            series: [
                {
                    name: "故事类型分布",
                    type: "pie",
                    // 这个radius可以修改饼形图的大小
                    // radius 第一个值是内圆的半径 第二个值是外圆的半径
                    radius: ["40%", "60%"],
                    center: ["50%", "45%"],
                    avoidLabelOverlap: false,
                    // 图形上的文字
                    label: {
                        show: false,
                        position: "center"
                    },
                    // 链接文字和图形的线是否显示
                    labelLine: {
                        show: false
                    },
                    data: postData

                }
            ]
        }
    },
    MyPostChart2: (postLookNumberpost,postGoodNumber,postCollectionNumber) => {
        return {
            title: {
                text: '贴子数据'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['收藏数', '点赞数', '浏览数']
            },
            series: [
                {
                
                    type: 'bar',
                    data: [`${postCollectionNumber}`,`${postGoodNumber}`,`${postLookNumberpost}`],
                    label: {
                        show: true,
                        position: "inside",
                        // {c} 会自动的解析为 数据  data里面的数据
                        formatter: "{c}"
                      }
                },

            ]
        }
    },
}




  
export default option