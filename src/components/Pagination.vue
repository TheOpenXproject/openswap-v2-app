<template>
    <div class="flex justify-between items-center ">
      <nav
        class="relative z-0 inline-flex rounded-lg -space-x-px order-2 shadow-md"
        aria-label="Pagination"
        :class="{ 'mb-3': styled === 'centered' }"
      >
        <a
          href="#"
          class="relative inline-flex items-center p-2 rounded-l-lg    text-sm font-medium border-oswapGreen-dark border border-opacity-20"
          @click.prevent="changePage(currentPage - 1)"
          :class="isFirstPage? 'cursor-not-allowed ': '' "
        >
          <span class="sr-only">Previous</span>
          <i 
            :class="isFirstPage? '': ' text-oswapGreen-dark ' "
            class="las la-angle-left"
          ></i>
        </a>
        <a
          href="#"
          aria-current="page"
          class="     relative inline-flex items-center px-4 py-2 text-sm font-medium border-oswapGreen-dark"
          :class="currentPage == 1? `z-10  ${borderTextActiveColor} ${borderActive} border  `:'border-opacity-20'"
          @click.prevent="changePage(1)"
          v-if="hasFirst()"
        >1</a>
        <span
          class="relative inline-flex items-center px-4 py-2    text-sm font-medium text-gray-700  border border-oswapGreen-dark border-opacity-20"
          v-if="hasFirst()"
        >...</span>
        <a
          href="#"
          aria-current="page"
          v-for="(page, index) in calculatedPages"
          :key="index"
          class="   relative inline-flex items-center px-4 py-2 text-sm font-medium  border border-oswapGreen-dark"
          :class="currentPage == page? `z-10  ${borderTextActiveColor} ${borderActive}  `:'border-opacity-20'"
          @click.prevent="changePage(page)"
        >{{ page }}</a>
        <!-- :class="currentPage === page ? `z-10 bg-indigo-50 !${borderActiveColor} !${borderTextActiveColor}` : '' }" -->
        <span
          class="relative inline-flex items-center px-4 py-2   select-none text-sm font-medium text-gray-700 border border-oswapGreen-dark border-opacity-20"
          v-if="hasLast()"
        >...</span>
        <a
          href="#"
          aria-current="page"
          class="     relative inline-flex items-center px-4 py-2 text-sm font-medium "
          v-if="hasLast()"
          @click.prevent="changePage(totalPages)"
        >{{ totalPages }}</a>
        <a
          href="#"
          class="relative inline-flex items-center p-2 rounded-r-lg    text-sm font-medium border-oswapGreen-dark border border-opacity-20"
          @click.prevent="changePage(currentPage + 1)"
          :class="isLastPage? 'cursor-not-allowed': '' "
        >
          <span class="sr-only text-os">Next</span>
          <i 
            :class="isLastPage? ' ': ' text-oswapGreen-dark ' "
            class="las la-angle-right"
          ></i>
        </a>
      </nav>
      <div class="flex flex-none order-1 text-gray-500 dark:text-gray-400">
        <p class="md:text-sm  text-xs  ">
          Showing
          <span class="font-medium">{{ paginationFrom }}</span>
          to
          <span class="font-medium">{{ paginationTo }}</span>
          of
          <span class="font-medium">{{ totalItems }}</span>
          results
        </p>
      </div>
    </div>
</template>


<script>
  export default {
    name: 'ContactsTable',
    mixins: [],
    components: {
    },
    props: {
        currentPage: {
            default() {
                return 1
            }
        },
        totalItems: {
            default() {
                return 0
            }
        },
        perPage: {
            default() {
                return 0
            }
        },
        pageRange: {
            default() {
                return 2
            }
        },
        textBeforeInput: {
            default() {
                return 'Go to page'
            }
        },
        textAfterInput: {
            default() {
                return 'Go'
            }
        },
        borderActive: {
            default() {
                return 'border-opacity-70'
            }
        },
        borderTextActiveColor: {
            default() {
                return 'text-oswapGreen-dark'
            }
        },
        styled: {
            default() {
                return 'simple'
            }
        },
    },
    data() {
      return {
          pageInput: 1,
      }
    },
    mounted: async function(){
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.perPage)
        },
        calculatedPages() {
            let pages = []
            for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
                pages.push(i)
            }
            return pages
        },
        isFirstPage() {
            return this.currentPage === 1
        },
        isLastPage() {
            return this.currentPage >= this.totalPages
        },
        paginationFrom() {
            return (this.currentPage - 1) * this.perPage + 1
        },
        paginationTo() {
            const end = (this.currentPage * this.perPage);
            return this.totalItems < end ? this.totalItems : end;
        },
        rangeEnd() {
            const end = (this.currentPage + this.pageRange)
            return (end < this.totalPages) ? end : this.totalPages
        },
        rangeStart() {
            const start = this.currentPage - this.pageRange
            return (start > 0) ? start : 1
        },
    },
    methods: {
        hasFirst() {
            return this.rangeStart !== 1
        },
        hasLast() {
             return this.rangeEnd < this.totalPages
        },
        changePage(customPage) {
            if (customPage > 0 && customPage <= this.totalPages) {
                this.$emit('page-changed', customPage)
            }
        }
    }
  }
</script>