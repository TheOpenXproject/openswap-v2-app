

<template>
    <div class="flex flex-col flex-1">
        <div class="overflow-x-auto">
            <div class="inline-block min-w-full">
                <div
                    class="overflow-hidden  rounded-lg"
                >
                    <table class="min-w-full md:text-base text-xs
                    ">
                        <thead
                        >
                            <tr
                                class=" font-bold text-oswapGreen-dark text-center bg-oswapGreen-light bg-opacity-10"
                            >
                                <th
                                    scope="col"
                                    class="py-3 md:px-6 px-2"
                                >
                                    <div
                                        class="flex flex-none items-center justify-start select-none "
                                    >
                                        Name
                                    </div>
                                </th>

                                <th scope="col" class="py-3 md:px-6 px-2">
                                    <div
                                        class="flex flex-none items-center justify-center select-none "
                                    >
                                        Address
                                    </div>
                                </th>
                                <th scope="col" class="py-3 md:px-6 px-2">
                                    <div
                                        class="flex flex-none items-center justify-center select-none "
                                    >
                                        Role
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- This is for loading animation might be useful when this is loaded from somewhere -->
                            <!-- <tr
                                v-if="getLoading"
                                class="border-b from-slightGray dark:from-oswapDark-gray dark:to-slightDark bg-gradient-to-r dark:border-gray-700 font-semibold text-center"
                            >
                                <td colspan="100%">
                                    <div class="flex flex-1 justify-center py-4">
                                        <LoadingOpenSwap />
                                    </div>
                                </td>
                            </tr> -->
                            <tr
                                
                                class="text-center"
                                v-for="(contact, index) in getPaginated"
                                :key="contact.address"
                            >
                                <td
                                    class="py-3 md:px-6 px-2"
                                >
                                    <div
                                        class="flex flex-none space-x-4 justify-start items-center"
                                    >
                                        <i class="las la-user text-3xl text-oswapGreen-dark"></i>
                                       <span>{{contact.name}}</span>
                                    </div>
                                </td>
                                <td
                                    class="py-3 md:px-6 px-2 "
                                > {{shortenAddress(contact.address)}}</td>
                                <td
                                    class="py-3 md:px-6 px-2 "
                                > {{contact.role}}</td>
                            </tr>
                            <tr
                                class="border-t border-opacity-40 border-oswapGreen-dark "
                            >
                                <td
                                    colspan="100%"
                                    class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                        <Pagination
                                        :total-items="this.contacts.length"
                                        :current-page="this.page"
                                        :per-page="this.limit"
                                        @page-changed="changePage"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Pagination from "@/components/Pagination";
  export default {
    name: 'ContactsTable',
    mixins: [],
    components: {
        Pagination
    },
    props: {
    },
    data() {
      return {
          limit: 10,
          page: 1,
          // Might wanna get this from the store instead
          contacts: [
              {
                  name: 'Alex',
                  address: '0xc115f959b97d73c6bc05612e669fde9ed4b02021',
                  role: 'Dev'
              },
              {
                  name: 'Lance',
                  address: '0x5100bd31b822371108a0f63dcfb6594b9919eaf4',
                  role: 'PM'
              },
              {
                  name: 'Panda',
                  address: '0xe53bf78f8b99b6d356f93f41afb9951168cca2c6',
                  role: 'Just a Panda'
              },
              {
                  name: 'Lucio',
                  address: '0x5100bd31b822371108a0f63dcfb6594b9919eaf4',
                  role: 'Dev'
              },
              {
                  name: 'Nik',
                  address: '0x24ad62502d1c652cc7684081169d04896ac20f30',
                  role: 'Design'
              },
              {
                  name: 'Gyan',
                  address: '0xdb30643c71ac9e2122ca0341ed77d09d5f99f924',
                  role: 'CM'
              },
              {
                  name: 'Rob',
                  address: '0x0bd434dbda8935feb472294b5cd60e67cc0f3964',
                  role: 'CC'
              },
              {
                  name: 'Lucio',
                  address: '0x5100bd31b822371108a0f63dcfb6594b9919eaf4',
                  role: 'Dev'
              },
              {
                  name: 'Nik',
                  address: '0x24ad62502d1c652cc7684081169d04896ac20f30',
                  role: 'Design'
              },
              {
                  name: 'Panda',
                  address: '0xe53bf78f8b99b6d356f93f41afb9951168cca2c6',
                  role: 'Just a Panda'
              },
              {
                  name: 'Lucio',
                  address: '0x5100bd31b822371108a0f63dcfb6594b9919eaf4',
                  role: 'Dev'
              },
              {
                  name: 'Nik',
                  address: '0x24ad62502d1c652cc7684081169d04896ac20f30',
                  role: 'Design'
              },
              {
                  name: 'Gyan',
                  address: '0xdb30643c71ac9e2122ca0341ed77d09d5f99f924',
                  role: 'CM'
              },
              {
                  name: 'Alex',
                  address: '0xc115f959b97d73c6bc05612e669fde9ed4b02021',
                  role: 'Dev'
              },
              {
                  name: 'Lance',
                  address: '0x5100bd31b822371108a0f63dcfb6594b9919eaf4',
                  role: 'PM'
              },
              
          ]
      }
    },
    mounted: async function(){
    },
    computed: {
        getPaginated() {
            return this.contacts.slice(this.limit * (this.page - 1), this.limit * this.page )
        },
        amountPages() {
            return Math.ceil(this.contacts.length / this.limit) || 1
        }
    },
    methods: {
        shortenAddress(address) {
            return address ? (address = `${address.slice(0, 8)}...${address.slice(address.length - 8, address.length)}`) : address;
        },
        changePage(event) {
            this.page = event
        }
    }
  }
</script>
