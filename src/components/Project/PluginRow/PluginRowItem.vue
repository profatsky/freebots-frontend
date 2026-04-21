<script setup>
const props = defineProps({
  plugin: {
    type: Object,
    required: true,
  }
});

const emits = defineEmits(['remove-plugin']);
const removePluginEvent = () => {
  emits('remove-plugin', props.plugin)
};
</script>

<template>
  <div class="plugin-row">
    <div class="plugin-row__name">{{ plugin.name }}</div>
    <div class="plugin-row__btns">
      <AppRoundButton 
        buttonType="redirect"
        @click="$router.push(`/plugins/${plugin.plugin_id}`)"
      />
      <AppRoundButton 
        @click="removePluginEvent"
        buttonType="delete"
      />
    </div>
  </div>
</template>

<style scoped>
.plugin-row {
  display: flex;
  gap: 24px;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px;
  background-color: var(--light-gray);
  border-radius: 8px;
  border: 1px solid var(--gray-lines);
}

.plugin-row__name {
  font-size: 16px;
  line-height: 1.4;
  font-weight: 500;
  letter-spacing: 0.75px;
  flex-grow: 1;
  color: var(--main-black);
}

.plugin-row__btns {
  display: flex;
  gap: 12px;
}

@media (min-width: 768px) and (max-width: 1169px) {
  .plugin-row {
    gap: 12px;
    margin-bottom: 12px;
    padding: 14px;
  }

  .plugin-row__name {
    font-size: 15px;
    line-height: 1.4;
  }

  .plugin-row__btns {
    display: flex;
    gap: 8px;
  }
}

@media (max-width: 767px) {
  .plugin-row {
    gap: 6px;
    margin-bottom: 8px;
    padding: 12px;
  }

  .plugin-row__name {
    font-size: 14px;
    line-height: 1.4;
  }

  .plugin-row__btns {
    display: flex;
    gap: 4px;
  }
}
</style>