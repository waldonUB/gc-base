const res = `
<template>
  <a-config-provider :locale="zhCN">
    <a-spin wrapperClassName="tc-loading" :spinning="isShowGlobalLoading">
      <router-view />
    </a-spin>
    <!-- tpl-ignore-start -->
    <DownloadFixed />
    <!-- tpl-ignore-end -->
  </a-config-provider>
</template>

<script lang="ts">
import { computed, defineComponent, provide, watch } from 'vue';
import { useStore } from 'vuex';
/* tpl-ignore-start */
import DownloadFixed from '@/components/business/download-fixed/index.vue';
/* tpl-ignore-end */
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import useMenuState, { MenuStateSymbol } from '@layouts/use-menu-state';
import { useMultiTabStateProvider } from '@layouts/multi-tab';
import { STORAGE_MENU_TABS } from '@/store/mutation-type';
import { isShowGlobalLoading } from '@/utils/common';
import ls from '@/utils/local-storage';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const cacheList = ls.get(STORAGE_MENU_TABS);
    const multiTabState = cacheList
      ? useMultiTabStateProvider(JSON.parse(cacheList))
      : useMultiTabStateProvider();
    const colSize = useMediaQuery();
    const isMobile = computed(() => colSize.value === 'sm' || colSize.value === 'xs');
    const menuState = useMenuState(
      {
        collapsed: isMobile.value,
        openKeys: [] as string[],
        selectedKeys: [] as string[],
        isMobile,
      },
      multiTabState,
    );
    const theme = computed(() => store.getters['app/navTheme']);
    watch(
      theme,
      () => {
        if (theme.value === 'realDark') {
          document
            .getElementsByTagName('html')[0]
            .setAttribute('data-pro-theme', 'antdv-pro-theme-dark');
        } else {
          document
            .getElementsByTagName('html')[0]
            .setAttribute('data-pro-theme', 'antdv-pro-theme-light');
        }
      },
      { immediate: true },
    );
    provide('isMobile', isMobile);
    provide(
      'isRealDark',
      computed(() => theme.value === 'realDark'),
    );
    provide(MenuStateSymbol, menuState);
    return {
      zhCN,
      isShowGlobalLoading,
      /* tpl-ignore-start */
      DownloadFixed,
      /* tpl-ignore-end */
    };
  },
});
</script>

`
/**
 * 更改注释匹配的文件
 * @author waldon
 * @date 2022-12-19
 */
const translateFile = () => {
  const regStr = ''
  const regStr1 = 'start'
  // const reg = new RegExp(regStr)
  const reg =
    /(\/\* tpl-ignore-start \*\/\n[\s\S]+\n\/\* tpl-ignore-end \*\/)|(\/\* tpl-ignore-start \*\/\n[\s\S]+\/\* tpl-ignore-end \*\/)|(<!-- tpl-ignore-start -->\n[\s\S]+<!-- tpl-ignore-end -->)/g
  const fileStr = res.replace(reg, '')
  console.log(`fileStr`, fileStr)
}
translateFile()
