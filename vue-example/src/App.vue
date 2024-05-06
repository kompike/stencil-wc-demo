<script setup>

const data = [
  {
    "x": 3.69,
    "y": 57.83,
    "size": 4,
    "label": "Saint Kitts and Nevis"
  },
  {
    "x": 9.59,
    "y": 69.7,
    "size": 4,
    "label": "China"
  },
  {
    "x": 12.67,
    "y": 15.8,
    "size": 7,
    "label": "Bhutan"
  },
  {
    "x": 77.39,
    "y": 85.34,
    "size": 3,
    "label": "Virgin Islands (British)"
  },
  {
    "x": 92.23,
    "y": 51.81,
    "size": 4,
    "label": "Barbados"
  },
  {
    "x": 31.73,
    "y": 43.91,
    "size": 4,
    "label": "Burundi"
  },
  {
    "x": 70.33,
    "y": 92.36,
    "size": 1,
    "label": "Comoros"
  },
  {
    "x": 65.08,
    "y": 59.81,
    "size": 1,
    "label": "Uruguay"
  },
  {
    "x": 38.35,
    "y": 66.98,
    "size": 4,
    "label": "French Guiana"
  },
  {
    "x": 17.67,
    "y": 63.6,
    "size": 6,
    "label": "Grenada"
  }
];
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125"/>
  </header>

  <stencil-bubble-chart .data="data"></stencil-bubble-chart>
</template>

<style scoped>
header {
  height: 120px;
  margin: 8px 0;
  box-sizing: border-box;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

stencil-bubble-chart {
  position: relative;
  display: block;
  height: 600px;
  width: 600px;
}
</style>
