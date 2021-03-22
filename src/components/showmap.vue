<template>
  <div class="box">
    <div id="map" class="map" tabindex="0"></div>
    <div v-show="isShow" class="timeline">
      <i v-show="!isPlay" class="el-icon-video-play" @click="handlePlay"></i>
      <i v-show="isPlay" class="el-icon-video-pause" @click="handlePause"></i>
      <i class="el-icon-arrow-left" @click="turnPrev"></i>
      <el-slider v-model="value" :format-tooltip="formatTooltip" :marks="marks"></el-slider>
      <i class="el-icon-arrow-right" @click="turnNext"></i>
    </div>
  </div>
</template>
 <script >
import 'ol/ol.css'
import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
import TileGrid from 'ol/tilegrid/TileGrid'
import TileLayer from 'ol/layer/Tile'
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style'
import TileWMS from 'ol/source/TileWMS'
import { Vector as VectorSource } from 'ol/source'
import View from 'ol/View'
import event from 'ol/events/Event'
import { transform } from 'ol/proj'
import { Vector as VectorLayer } from 'ol/layer'
import { get as getProjection } from 'ol/proj'
import Draw, { createBox } from 'ol/interaction/Draw'
import { getWidth } from 'ol/extent'

import * as olExtent from 'ol/extent'

export default {
  name: 'OpenMap',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    url: {
      type: String,
      required: true
    },
    layerName: {
      type: String,
      required: true
    },
    dates: {
      type: Array,
      required: true
    },
    interval: {
      type: Number,
      default: 2000
    }
  },
  watch: {
    url(val) {
      this.clearTimer()
      if (this.dates.length && val && this.layerName) {
        this.updateMap()
      }
    },
    dates(val) {
      this.clearTimer()
      if (val && this.url && this.layerName) {
        this.updateMap()
      }
    }
  },
  data() {
    return {
      map: null,
      source: null,
      layers: null,
      yaoganLayer: null,
      displayRange: null,
      timer: null,
      index: 0,
      value: 0,
      marks: {},
      currentIndex: 0,
      step: 1,
      isPlay: false,
      isShow: false
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart()
      // this.addLayer()
      this.addInteraction()
    })
  },
  beforeDestroy() {
    if (!this.map) {
      return
    }
    this.map.dispose()
    this.map = null
    this.clearTimer()
  },

  methods: {
    updateMap() {
      this.setShowRange()
      this.addLayer()
      this.setTime()
    },
    initChart() {
      this.source = new VectorSource({ wrapX: false })

      this.layers = [
        new TileLayer({
          source: new OSM()
        }),

        new VectorLayer({
          source: this.source
        })
      ]

      this.map = new Map({
        layers: this.layers,
        target: 'map',
        view: new View({
          center: [11639294.226467658, 4161101.195144745],
          zoom: 4
        })
      })
    },
    addLayer() {
      const projExtent = getProjection('EPSG:900913').getExtent()
      const startResolution = getWidth(projExtent) / 256
      const resolutions = new Array(22)
      for (let i = 0, len = resolutions.length; i < len; ++i) {
        resolutions[i] = startResolution / Math.pow(2, i)
      }

      console.log(this.data)
      const displayRange = this.displayRange
      const tileGrid = new TileGrid({
        // extent: [8017694.485805625, 2378954.6317825634, 15095505.486463219, 7116948.306430856],
        extent: displayRange,
        resolutions: resolutions,
        tileSize: [512, 256]
      })

      this.yaoganLayer = new TileLayer({
        source: new TileWMS({
          // url: 'http://47.94.42.208:8089/geoserver/yaogan/wms',
          // params: { LAYERS: 'yaogan:MOSAIC_DIR', TILED: true },
          url: this.url,
          params: { LAYERS: this.layerName, TILED: true },
          serverType: 'geoserver',
          tileGrid: tileGrid
        })
      })
      this.layers[2] = this.yaoganLayer
      this.map.removeLayer(this.yaoganLayer)
      this.map.addLayer(this.yaoganLayer)
    },
    addInteraction() {
      const value = 'Circle'
      const geometryFunction = createBox()
      //console.log(geometryFunction)
      const source = this.source
      const draw = new Draw({
        source,
        type: value,
        geometryFunction: geometryFunction
      })
      draw.on('drawstart', function () {
        // 清除之前画的图
        source.clear()
      })
      draw.on('drawend', args => {
        this.data.f_lon = args.feature.getGeometry().flatCoordinates[0]
        this.data.f_lat = args.feature.getGeometry().flatCoordinates[1]
        this.data.s_lon = args.feature.getGeometry().flatCoordinates[2]
        this.data.s_lat = args.feature.getGeometry().flatCoordinates[5]
      })
      this.map.addInteraction(draw)
    },
    setTime() {
      this.step = 100 / (this.dates.length - 1)
      this.isShow = true
      this.isPlay = true
      this.timer = window.setInterval(() => {
        const dates = this.dates
        this.turnNext()
        const startDate = dates[this.currentIndex]
        this.layers[2].getSource().updateParams({ TIME: startDate })
      }, this.interval)
    },
    setShowRange() {
      const { f_lon, f_lat, s_lon, s_lat } = this.data
      this.displayRange = olExtent.boundingExtent([
        [f_lon, f_lat],
        [s_lon, s_lat]
      ])
      // console.log(this.displayRange)
      this.map.getView().fit(this.displayRange, this.map.getSize())
    },
    setTimeLine() {
      this.step = 100 / (this.dates.length - 1)
      this.isShow = true
    },
    turnPrev() {
      console.log('turnPrev')
      const val = this.value - this.step
      if (val < -this.step) {
        this.value = 100
      } else if (val < 0) {
        this.value = 0
      } else {
        this.value = val
      }
    },
    turnNext() {
      const val = this.value + this.step
      if (val > 100 + this.step) {
        this.value = 0
      } else if (val > 100) {
        this.value = 100
      } else {
        this.value = val
      }
      console.log()
    },
    handlePlay() {
      this.isPlay = true
      this.setTime()
    },
    handlePause() {
      this.isPlay = false
      this.clearTimer()
    },
    formatTooltip(val) {
      const i = Math.ceil(val / this.step)
      this.currentIndex = i
      this.marks = {}
      this.marks[val] = this.dates[i]
      return this.dates[i]
    },
    clearTimer() {
      if (this.timer) window.clearInterval(this.timer)
    }
  }
}
</script>
 <style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;
  display: flex;
}
.map {
  width: 100%;
  height: 100vh;
}
a.skiplink {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
}
a.skiplink:focus {
  clip: auto;
  height: auto;
  width: auto;
  background-color: #fff;
  padding: 0.3em;
}
#map:focus {
  outline: #4a74a8 solid 0.15em;
}

.timeline {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 5px 20px 12px;
  border-radius: 4px;
  width: 1000px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  i {
    display: inline-block;
    font-size: 24px;
    line-height: 38px;
    width: 40px;
    text-align: center;
    cursor: pointer;
    &:el-icon-arrow-right {
      width: 50px;
    }
  }
  .el-slider {
    flex-grow: 1;
  }
}
</style>