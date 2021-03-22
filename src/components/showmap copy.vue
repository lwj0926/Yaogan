<template>
  <div class="box">
    <div id="btn">
      <!-- <button id="btnclick" @click="clickHandler()">框选范围</button> -->
    </div>
    <div id="map" class="map" tabindex="0"></div>
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
    layers: {
      type: String,
      required: true
    },
    dates: {
      type: Array,
      required: true
    }
  },

  mounted() {
    var projExtent = getProjection('EPSG:900913').getExtent()
    var startResolution = getWidth(projExtent) / 256
    var resolutions = new Array(22)
    for (var i = 0, ii = resolutions.length; i < ii; ++i) {
      resolutions[i] = startResolution / Math.pow(2, i)
    }

    var tileGrid = new TileGrid({
      extent: [8017694.485805625, 2378954.6317825634, 8295505.486463219, 2416948.306430856],
      resolutions: resolutions,
      tileSize: [512, 256]
    })
    console.log(tileGrid)

    var source = new VectorSource({ wrapX: false })

    var vector = new VectorLayer({
      source: source
    })

    var layers = [
      new TileLayer({
        source: new OSM()
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://47.94.42.208:8089/geoserver/yaogan/wms',
          params: { LAYERS: 'yaogan:MOSAIC_DIR', TILED: true },
          // url: this.url,
          // params: { LAYERS: this.layers, TILED: true },
          serverType: 'geoserver',
          tileGrid: tileGrid
        })
      }),
      vector
    ]

    const map = new Map({
      layers: layers,
      target: 'map',
      view: new View({
        center: [11639294.226467658, 4161101.195144745],
        zoom: 4
      })
    })

    let startDate
    let index = 0
    const dates = this.dates
    function setTime() {
      startDate = dates[index++ % dates.length]
      layers[1].getSource().updateParams({ TIME: startDate })
    }
    setTime()

    var draw // global so we can remove it later
    const addInteraction = () => {
      const _this = this
      const value = 'Circle'
      const geometryFunction = createBox()
      //console.log(geometryFunction)

      draw = new Draw({
        source: source,
        type: value,
        geometryFunction: geometryFunction
      })

      draw.on('drawstart', function () {
        // 清除之前画的图
        source.clear()
      })

      draw.on('drawend', args => {
        var f_lat = args.feature.getGeometry().flatCoordinates[6]
        var f_lon = args.feature.getGeometry().flatCoordinates[7]
        var s_lat = args.feature.getGeometry().flatCoordinates[2]
        var s_lon = args.feature.getGeometry().flatCoordinates[3]
        var f_point = transform([f_lat, f_lon], 'EPSG:900913', 'EPSG:4326')
        var s_point = transform([s_lat, s_lon], 'EPSG:900913', 'EPSG:4326')

        _this.data.f_lon = f_point[0]
        _this.data.s_lon = s_point[0]
        _this.data.f_lat = s_point[1]
        _this.data.s_lat = f_point[1]
        var displayRange = olExtent.boundingExtent([
          [s_lat, s_lon],
          [f_lat, f_lon]
        ])
        map.getView().fit(displayRange, map.getSize())
      })

      map.addInteraction(draw)
    }

    addInteraction()
  },

  methods: {}
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
</style>