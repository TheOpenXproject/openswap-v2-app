<template>
  <div id="contacts" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-start oswap-layout xl:px-0 px-3 text-gray-500 py-16" >
    <div class="flex flex-1 w-full flex-col">
        <div class="flex flex-1 flex-col">
            <TabGroup >
              <div class="flex flex-1 space-x-8">
                <TabList class="flex flex-none flex-col space-y-4" >
                  <Tab v-slot="{ selected }" as="template">
                    <div 
                      :class="selected? 'border-l-2 select-none' : 'cursor-pointer'"
                      class="flex flex-col py-3 px-10 st5 st5-all group bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray  border-oswapGreen rounded-3xl">
                        Create DAO
                    </div>
                  </Tab>
                  <Tab v-slot="{ selected }" as="template">
                    <div 
                      :class="selected? 'border-l-2 select-none' : 'cursor-pointer'"
                      class="flex flex-col py-3 px-10 st5 st5-all group bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray  border-oswapGreen rounded-3xl">
                        Create Proposal
                    </div>
                  </Tab>
                  <Tab v-slot="{ selected }" as="template">
                    <div 
                      :class="selected? 'border-l-2 select-none' : 'cursor-pointer'"
                      class="flex flex-col py-3 px-10 st5 st5-all group bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray  border-oswapGreen rounded-3xl">
                        Create Tx
                    </div>
                      
                  </Tab>
                </TabList>
                <TabPanels class="flex flex-1 ">
                    <TabPanel class="flex flex-1 w-full">
                        <DaoForm page-title='Create DAO'/>
                    </TabPanel>
                    <TabPanel class="flex flex-1 w-full">
                      <ProposalForm page-title='Create a Proposal'/>
                    </TabPanel>
                    <TabPanel class="flex flex-1 w-full">
                      <TxForm page-title="Create Transaction"/>
                    </TabPanel>
                </TabPanels>
              </div>

            </TabGroup>
        </div>
    </div>
  </div>
</template>

<script>
import ProposalForm from "@/components/dao/ProposalForm";
import TxForm from "@/components/dao/TxForm";
import DaoForm from "@/components/dao/DaoForm";
import { 
    TabGroup, 
    TabList, 
    Tab, 
    TabPanels, 
    TabPanel, 
} from '@headlessui/vue'
import Coming from "@/components/Coming";
export default {
  name: 'DAO',
  components: {
    Coming,
    ProposalForm,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    TxForm,
    DaoForm
  },
  data () {
      return {
        content: ''
      }
    },
}
</script>