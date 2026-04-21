<script setup>
import ProjectItem from "@/components/Project/ProjectItem.vue";

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  }
});
</script>

<template>
  <div v-if="projects.length > 0" class="project-list">
    <ProjectItem
      v-for="project in projects"
      :key="project.project_id"
      :projectId="project.project_id"
    />
  </div>
</template>

<style>
</style>