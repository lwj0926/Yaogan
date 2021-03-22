<template>
  <div id="map" class="map" tabindex="0"></div>
</template>
 <script >
import 'ol/ol.css'
import Map from 'ol/Map'
import GeoJSON from 'ol/format/GeoJSON'
import View from 'ol/View'
import Pixel from 'ol/pixel'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import event from 'ol/events/Event'
import { transform } from 'ol/proj'
import OpenLayers from 'ol/'
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style'
import { Draw, Modify, Snap, Select, defaults as defaultInteractions } from 'ol/interaction'
import { OSM, Vector as VectorSource } from 'ol/source'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { createStringXY } from 'ol/coordinate.js'
import MousePosition from 'ol/control/MousePosition.js'
import { format } from 'ol/coordinate'

export default {
  name: 'OpenMap',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      jingdu: '',
      weidu: ''
    }
  },
  mounted() {
    const raster = new TileLayer({
      source: new OSM()
    })
    const source = new VectorSource()
    const vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        image: new Icon({
          // anchor: [0, 0],
          //标注样式的起点位置
          anchorOrigin: 'bottom-left',
          //X方向单位：分数
          anchorXUnits: 'fraction',
          //Y方向单位：像素
          anchorYUnits: 'pixels',
          //偏移起点位置的方向
          // offsetOrigin: 'top-right',
          //透明度
          opacity: 0.75,
          src: require('@/assets/img/position.png')
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2
        })

        // fill: new Fill({
        //   color: '#ffc433'
        // })
      })
    })

    const map = new Map({
      layers: [raster, vector],
      target: 'map',
      view: new View({
        center: [11639294.226467658, 4161101.195144745],
        zoom: 4
      })
    })
    const modify = new Modify({ source: source })
    map.addInteraction(modify)
    var draw, snap // global so we can remove them later
    const typeSelect = document.getElementById('type')

    function addInteractions() {
      draw = new Draw({
        source: source,
        type: 'Point'
      })
      draw.on('drawstart', function () {
        source.clear()
      })
      map.addInteraction(draw)
      snap = new Snap({ source: source })
      map.addInteraction(snap)
    }

    /**
     * Handle change event.
     */
    // typeSelect.onchange = function () {
    //   map.removeInteraction(draw)
    //   map.removeInteraction(snap)
    //   addInteractions()
    // }

    addInteractions()

    // console.log(proj)
    // var coordinate1
    // coordinate1 = transform(coordinate1, 'EPSG:4326', 'EPSG:900913')
    // console.log(transform([135.605233, 53.718104], 'EPSG:4326', 'EPSG:900913'))
    map.on('click', evt => {
      let coordinate = evt.coordinate
      coordinate = transform(coordinate, 'EPSG:900913', 'EPSG:4326')
      console.log(coordinate)
      this.data.lon = coordinate[0]
      this.data.lat = coordinate[1]

      map.removeInteraction(draw)
      map.removeInteraction(snap)
      addInteractions()
    })

    // map.events.register('click', map, function (e) {
    //   var pixel = new OpenLayers.Pixel(e.xy.x, e.xy.y)
    //   var lonlat = map.getLonLatFromPixel(pixel)
    //   lonlat.transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326')) //由900913坐标系转为4326
    //   alert(lonlat.lon + ', ' + lonlat.lat)
    // })
    // map.on('click', function (evt) {
    //   var coordinate = evt.coordinate //鼠标单击点的坐标
    //   //新建一个要素ol.Feature
    //   var newFeature = new Feature({
    //     geometry: new Point(coordinate), //几何信息
    //     name: '标注点'
    //   })
    //   newFeature.setStyle(createLabelStyle(newFeature)) //设置要素样式
    //   vectorSource.addFeature(newFeature)
    // })

    //   const mousePositionControl = new MousePosition({
    //     coordinateFormat: function (coordinate) {
    //       var t = format(coordinate, '经度:{x} 纬度:{y}', 2)
    //       console.log(t)
    //       return t
    //     },
    //     projection: 'EPSG:4326',
    //     className: 'custom-mouse-position',
    //     target: document.getElementById('mouse-position'),
    //     undefinedHTML: '&nbsp;'
    //   })

    //   map.addControl(mousePositionControl)
  },
  methods: {}
}
</script>
 <style lang="scss" scoped>
.map {
  width: 100%;
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