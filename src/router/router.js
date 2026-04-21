import {createRouter, createWebHistory} from 'vue-router';
import Main from '@/pages/Main.vue';
import Projects from '@/pages/Projects.vue';
import Profile from '@/pages/Profile.vue';
import Dialogue from '@/pages/Dialogue.vue';
import DialogueTemplates from '@/pages/DialogueTemplates.vue';
import DialogueTemplateDetail from '@/pages/DialogueTemplateDetail.vue';
import Plugins from '@/pages/Plugins.vue';
import PluginDetail from '@/pages/PluginDetail.vue';
import UserManual from '@/pages/UserManual.vue';
import AdminDashboard from '@/pages/AdminDashboard.vue';
import PublicOffer from '@/pages/PublicOffer.vue';
import PrivacyPolicy from '@/pages/PrivacyPolicy.vue';
import NotFound from '@/pages/NotFound.vue';

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/projects',
    component: Projects
  },
  {
    path: '/templates',
    component: DialogueTemplates
  },
  {
    path: '/templates/:templateId',
    component: DialogueTemplateDetail
  },
  {
    path: '/plugins',
    component: Plugins
  },
  {
    path: '/plugins/:pluginId',
    component: PluginDetail
  },
  {
    path: '/manual',
    component: UserManual
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/projects/:projectId/dialogues/:dialogueId',
    component: Dialogue
  },
  {
    path: '/admin-dashboard',
    component: AdminDashboard
  },
  {
    path: '/offer',
    component: PublicOffer
  },
  {
    path: '/privacy',
    component: PrivacyPolicy
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router;