<template>
  <div class="flex w-full flex-wrap lg:pl-8" v-if="validator">
    <div class="w-full">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px lg:mr-2 last:mr-0 ss:w-full ss:mb-2 lg:flex-auto lg:w-max text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{ 'bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 ': openTab !== 1, 'text-white bg-oswapGreen': openTab === 1 }"> Staking </a>
        </li>
        <li class="-mb-px lg:mr-2 last:mr-0 ss:w-full ss:mb-2 lg:flex-auto lg:w-max text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{ 'bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 ': openTab !== 2, 'text-white bg-oswapGreen': openTab === 2 }"> Unstaking </a>
        </li>
        <li class="-mb-px lg:mr-2 last:mr-0 ss:w-full ss:mb-2 lg:flex-auto lg:w-max text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{ 'bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 ': openTab !== 3, 'text-white bg-oswapGreen': openTab === 3 }"> Ratio Panel </a>
        </li>
      </ul>
      <div class="relative flex flex-col min-w-0 break-words bg-gray-200 dark:bg-oswapDark-gray w-full rounded mb-6">
        <div class="px-4 py-5 flex-auto">
          <div class="tab-content tab-space">
            <div v-bind:class="{ 'hidden h-full': openTab !== 1, 'h-full flex flex-wrap': openTab === 1 }">
              <h5>Stake Content</h5>
              <input type="text" class="ring-black ring-opacity-10 mt-2 focus:ring-oswapGreen ring-1 focus:outline-none rounded-xl flex w-full z-20 bg-gray-100 py-2 items-center pl-3 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-300" placeholder="Staked..." />
              <button class="flex w-full mt-4 lg:w-3/12 items-center justify-center rounded-xl border border-oswapGreen st5 text-oswapGreen hover:bg-oswapGreen hover:text-gray-200 dark:hover:text-slightDark">
                <p class="text-sm p-1 px-3">Stake</p>
              </button>
            </div>
            <div v-bind:class="{ 'hidden h-full': openTab !== 2, 'h-full flex flex-wrap': openTab === 2 }">
              <h5>Unstake Content</h5>
              <input type="text" class="ring-black ring-opacity-10 mt-2 focus:ring-oswapGreen ring-1 focus:outline-none rounded-xl flex w-full z-20 bg-gray-100 py-2 items-center pl-3 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-300" placeholder="Unstaking..." />
              <button class="flex w-full mt-4 lg:w-3/12 items-center justify-center rounded-xl border border-oswapGreen st5 text-oswapGreen hover:bg-oswapGreen hover:text-gray-200 dark:hover:text-slightDark">
                <p class="text-sm p-1 px-3">Unstake</p>
              </button>
            </div>
            <div v-bind:class="{ 'hidden h-full': openTab !== 3, 'h-full flex flex-wrap': openTab === 3 }">
              <h5>Ratio Content</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StakingInfoTabs",
  props: {
    validator: Object,
  },
  data() {
    return {
      openTab: 1,
    };
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber;
    },
  },
};
</script>
