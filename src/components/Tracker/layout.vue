<template>
  <div class="flex flex-col h-screen max-h-screen bg-gray-200">
    <!-- Search / Results -->
    <div class="z-20 flex justify-center relative bg-tracker px-4 pt-16 pb-32">
      <!-- Search Input -->
      <div class="w-full max-w-screen-sm">
        <h1 class="text-white text-center text-3xl pb-4 font-baloo-tamma2">IP Address Tracker</h1>
        <div class="flex">
          <input 
            v-model="queryIp"
            class="flex-1 py-3 px-2 rounded-tl-md rounded-bl-md focus:outline-none" 
            type="text"
            placeholder="Search for any IP address or leave empty to get your ip info"
          />
          <i 
            @click="getIpInfo"
            class="fa fa-chevron-right
            cursor-pointer 
            bg-indigo-200
            px-4
            rounded-tr-md rounded-br-md 
            flex items-center">
          </i>
        </div>
      </div>
      <!-- IP info -->
      <IPInfo v-if="ipInfo" :ipInfo="ipInfo"/>
    </div>
    <!-- Map -->
    <div id="map" class="z-10 h-full"></div>
  </div>
</template>

<script setup>
import IPInfo from './IPInfo.vue' // ../ vs ./
import L from 'leaflet'
import { onMounted, ref } from 'vue'
import axios from 'axios'
// var map = L.map('map').setView([51.505, -0.09], 13) // 'map'(id) container not found

const queryIp = ref("")
const ipInfo = ref(null)

// initialize map
let mymap
onMounted(() => {
  mymap = L.map('map').setView([51.505, -0.09], 13)
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWlra2llMTk5NSIsImEiOiJjbDNpbzB1Nmwwejh6M2RxZTU5bzZob3dsIn0.hnAEBxmtvPaOWtDUwen72w', 
    {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibWlra2llMTk5NSIsImEiOiJjbDNpbzB1Nmwwejh6M2RxZTU5bzZob3dsIn0.hnAEBxmtvPaOWtDUwen72w'
    }
  ).addTo(mymap)
})

const getIpInfo = async () => {
    try {
      const data = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_7xeeCsiRU90u84HuIYhJqJxJFEhdA&ipAddress=${queryIp.value}`)
      const result = data.data
      ipInfo.value = {
        address: result.ip,
        region: `${result.location.city}, ${result.location.country}`,
        timezone: result.location.timezone,
        isp: result.isp,
        lat: result.location.lat,
        lng: result.location.lng,
      }
      L.marker([ipInfo.value.lat, ipInfo.value.lng]).addTo(mymap)
      mymap.setView([ipInfo.value.lat, ipInfo.value.lng], 13)
    } catch (error) {
      alert('err.message')
    }
  }
</script>
