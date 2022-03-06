<template>
  <div id="assets" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-start oswap-layout xl:px-0 px-3 text-gray-500 py-16" >
      <div class="flex flex-none w-full ">
        <div class="flex flex-1 w-full flex-col md:order-1 order-2">
            <div class="flex flex-none justify-between items-center">
                <span class="md:text-3xl text-xl">{{proposal.title}}</span>
                <StateTag :state="proposal.state" />
            </div>
        </div>
      </div>
      <div class="flex flex-1 justify-between space-x-4 mt-8 lg:flex-row flex-col">
        <div class="flex flex-1 flex-col space-y-4 lg:order-1 order-2">
          <div class="flex flex-none p-4 bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent rounded-lg relative">
            <div v-html="proposal.description">
            </div>
            <div class="bg-gray-300 dark:bg-slightDark dark:text-slightGray rounded-2xl py-1 px-2 flex flex-none space-x-2 items-center text-sm absolute right-2">
                <i :class="proposal.type === 'EXTERNAL'? 'las la-users':'las la-user-alt'"></i>
                <span>{{proposal.type}}</span>
            </div>
          </div>
          <div class="flex flex-none flex-col bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent rounded-lg">
            <div class="px-4 py-2 flex flex-1 bg-oswapGreen-light bg-opacity-10 rounded-t-lg">
              <span class="text-oswapGreen-dark text-lg">Cast your vote</span>
            </div>
            <div class="flex flex-none px-4 py-6 lg:flex-row flex-col">
              <div class="flex flex-col flex-1 space-y-4">
                <div 
                  v-for="option in options"
                  :class="option===vote ? 'border-oswapGreen': 'border-gray-400'"
                  class="flex md:w-8/12 flex-col py-2 border-l-2 cursor-pointer px-10 st5 st5-all group bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray  rounded-3xl">
                    <label class="inline-flex items-center p-2 cursor-pointer">
                      <input 
                        :id="option" type="radio" v-model="vote" 
                        :value="option" 
                        class="hidden" 
                        >
                        <label :for="option" 
                          :class="vote === option? 'text-oswapBlue-light dark:text-oswapGreen':''"
                          class="flex items-center cursor-pointer"
                          >
                          <span 
                            :class="vote === option? 'border-oswapBlue-light dark:border-oswapGreen-light bg-oswapBlue-light dark:bg-oswapGreen ring-2 ring-slightGray':''"
                            class="w-6 h-6 inline-block mr-2 rounded-full border border-grey p-1 flex-no-shrink">
                          </span>
                          {{option}}
                        </label>
                    </label> 
                </div>
              </div>
              <div class="flex flex-1 justify-end items-end">
                <div class="flex flex-col flex-none ">
                  <DarkButton class="px-14 py-2 ">
                    Vote now
                  </DarkButton>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-none flex-col bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent rounded-lg">
            <div class="px-4 py-2 flex flex-1 bg-oswapGreen-light bg-opacity-10 rounded-t-lg">
              <span class="text-oswapGreen-dark text-lg">Comments</span>
            </div>
            <div class="flex flex-none px-4 py-6">
              <div class="flex flex-1 flex-col space-y-8">
                <input 
                  v-model="comment" 
                  placeholder="Add your comment..." 
                  class="flex ring-1 placeholder-opacity-60 w-full focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
                <div class="flex flex-none justify-end">
                  <DarkButton class="px-8 py-2 ">
                    Vote to comment
                  </DarkButton>
                </div>
                <div v-for="comment in proposal.comments">
                  <CommentCard 
                    :value="comment.value" 
                    :vote="comment.vote" 
                    :time="comment.time" 
                    :address="comment.address" 
                  />
                </div>
              </div>
                </div>
          </div>
        </div>
        <div class="flex flex-none space-y-8 flex-col lg:order-2 order-1">
            <Summary 
              :identifier='proposal.identifier'
              :start="returnNormalDate(proposal.startDate)"
              :end="returnNormalDate(proposal.endDate)"
              :timings="proposal.timings"
              :creator="proposal.creator"
            />
            <Results
              :agree="proposal.votes[0]"
              :disagree="proposal.votes[1]"
            />
        </div>
        
      </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import DarkButton from "@/components/dao/DarkButton";
import Summary from "@/components/dao/Summary";
import Results from "@/components/dao/Results";
import CommentCard from "@/components/dao/CommentCard";
import StateTag from "@/components/dao/StateTag";
  export default {
    name: 'ProposalDetails',
    components: {
      StateTag,
      DarkButton,
      CommentCard,
      Summary,
      Results
    },
    methods: { 
      returnNormalDate(blocktimestamp) {
        const date = dayjs(blocktimestamp * 1000)
        return date.format('YYYY-MM-DD')
      }
    },
    mounted: function () {
    },
    computed: {
    },
    data() {
        return {
            // Vote options, Type of proposal and state might have diff formats idk using string for now
            options: ['Agree', 'Disagree'],
            vote: 'Agree',
            comment: '',
            proposal: {
                title:"Deduct pool emissions to zero lead to Deflation, we need cake to be deflation",
                description: '<p>Allow open discourse & the fee  exchange of ideas to any proposal</p><br><p> add a fee to do so, make the fee small but in CAKE that is then burned. this will prevent meatpuppets spamming the proposal & if they do CAKE will be burned</p><br><p> will be burned. this will also raise the quality of the conversation as the fee will prevent</p>',
                state: 'ACTIVE',
                limitDate: 'Sep 10th, 2030 20:30',
                address: '0x87e9c993d819e9654aea50607f319e72d2815fc2',
                type: 'INTERNAL',
                identifier: '2175.001',
                startDate: '1635446405',
                endDate: '1637446405',
                // Not sure about timings, idk what it means just copy pasting what was in figma
                timings: '19:30 - 20:30 IST',
                creator: '0x87e9c993d819e9654aea50607f319e72d2815fc2',  // not sure if address and creator are the same
                // Maybe you can get this one counting the amount of votes inside the comments array idk
                votes: [200,129],
                comments: [
                  {
                    address: "0x7e858f2931e08f047f1509fd749409bd40af0681",
                    value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. ",
                    time: "1646591854",
                    vote: 'Agree'
                  },
                  {
                    address: "0x7e858f2931e08f047f1509fd749409bd40af0681",
                    value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. ",
                    time: "1646591854",
                    vote: 'Disagree'
                  },
                  {
                    address: "0x7e858f2931e08f047f1509fd749409bd40af0681",
                    value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. ",
                    time: "1646590914",
                    vote: 'Agree'
                  }
                ]
            }
        };
    },
  }
</script>