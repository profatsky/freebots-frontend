<script setup>
import ProjectRowList from '@/components/Project/ProjectRow/ProjectRowList.vue';

const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
});

const emits = defineEmits(['choose-project']);
const chooseProjectEvent = (project) => {
  emits('choose-project', project)
};
</script>

<template>
  <div class="choose-project">
    <h2 class="choose-project__title"><slot></slot></h2>
    <ProjectRowList 
      :projects="projects"
      @choose-project="chooseProjectEvent"
    />
  </div>
</template>

<style scoped>
.choose-project {
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.choose-project__title {
  font-size: 24px;
  font-weight: 600px;
  line-height: 1.2;
  margin-bottom: 8px;
  text-align: center;
}

@media (min-width: 768px) and (max-width: 1169px) {
  .choose-project {
    width: 100%;
    max-width: 350px;
    gap: 16px;
  }

  .choose-project__title {
    font-size: 22px;
    line-height: 1.2;
    margin-bottom: 8px;
  }
}

@media (max-width: 767px) { 
  .choose-project {
    width: 100%;
    max-width: 320px;
    gap: 16px;
  }

  .choose-project__title {
    font-size: 20px;
    line-height: 1.2;
    margin-bottom: 8px;
  }
}
</style>