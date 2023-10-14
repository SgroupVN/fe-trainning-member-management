<template>
  <router-view :key="$route.fullPath" />
  <notifications position="bottom center" />
</template>
