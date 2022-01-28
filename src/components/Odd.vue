<template>
<!-- 完全沒odd -->
    <div
      v-if="
        (computedData['HA'] == undefined || computedData['HA'].spread == undefined) &&
        (computedData['1X2'] == undefined || computedData['1X2'].spread == undefined) &&
        (computedData['OU'] == undefined || computedData['OU'].spread == undefined)
      "
      class="odd"
    >
      <div></div>
      <div>N/A</div>
      <div></div>
    </div>
<!-- HA為負 -->
    <div v-else-if="(computedData['HA'] != undefined && computedData['HA'].spread != undefined) && computedData['HA'].spread.indexOf('-') == 0" class="odd">
      <div v-if="computedData['OU'] == undefined || computedData['OU'].spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ computedData["OU"].spread }}</div>
        <div>
          {{ computedData["OU"].o }} /
          {{ computedData["OU"].u }}
        </div>
      </div>
      <div v-if="computedData['1X2'] == undefined || computedData['1X2'].spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ computedData["1X2"].spread }}</div>
        <div>
          {{ computedData["1X2"].h }} /
          {{ computedData["1X2"].a }}
        </div>
      </div>
      <div>
        <div>{{ computedData["HA"].spread.substring(1) }}</div>
        <div>
          {{ computedData["HA"].h }} /
          {{ computedData["HA"].a }}
        </div>
      </div>
    </div>
<!-- HA為正 -->
    <div v-else class="odd">
      <div v-if="computedData['HA'] == undefined || computedData['HA'].spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ computedData["HA"].spread }}</div>
        <div>
          {{ computedData["HA"].h }} /
          {{ computedData["HA"].a }}
        </div>
      </div>
      <div v-if="computedData['1X2'] == undefined || computedData['1X2'].spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ computedData["1X2"].spread }}</div>
        <div>
          {{ computedData["1X2"].h }} /
          {{ computedData["1X2"].a }}
        </div>
      </div>
      <div v-if="computedData['OU'] == undefined || computedData['OU'].spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ computedData["OU"].spread }}</div>
        <div>
          {{ computedData["OU"].o }} /
          {{ computedData["OU"].u }}
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/style/_live.scss";
</style>

<script>
export default {
  props: ["data"],

  computed: {
    computedData() {
      return this.data
    }
  },
};
</script>