<template>
  <div class="relative">
    <div @click="toggleCustomRate" :class="checkCustom ? 'border-l-2 border-oswapGreen' : 'hover:bg-gray-50 dark:hover:bg-slightDark'" class="flex items-center justify-center cursor-pointer w-8 h-6 relative hover:bg-gray-50 dark:hover:bg-slightDark dark:bg-oswapDark-gray bg-gray-100 rounded-lg focus:outline-none">
      <i class="las la-sliders-h text-lg absolute dark:text-gray-300"></i>
    </div>
    
    <div @click="toggleCustomRate" v-if="isOpen" class="fixed inset-0 z-50"></div>

    <transition
      enter-active-class="transform transition duration-200 ease-out"
      enter-from-class="-translate-y-3 opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transform transition duration-150 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="-translate-y-3 opacity-0"
    >
      <div class="absolute z-50 w-48 mt-2 right-0" v-if="isOpen">
        <div class="relative flex flex-col space-y-2 py-2 border-l-2 border-oswapGreen shadow-lg rounded-lg p-1 px-2 bg-gray-100 dark:bg-slightDark">
          <div class="flex items-center space-x-2">
            <p class="dark:text-gray-300">Custom Rate</p>
            <tooltip-me>
              <i class="las la-exclamation-circle text-sm transform rotate-180 dark:text-gray-300 dark:hover:text-oswapGreen hover:text-oswapGreen cursor-pointer"></i>
              <tooltip-me-content :options="tooltip"
                class="flex flex-col ss:w-80 xs:w-88 items-start space-x-2 rounded-lg shadow-xl p-0.5"
              >
                <div class="flex flex-col space-y-1 bg-gray-100 dark:bg-slightDark text-gray-500 dark:text-gray-300 rounded-md p-3">
                  <p class="text-lg">Too High:</p>
                  <p>
                    When the slippage rate is set really high, it allows the transaction to still complete despite large price swings. This can open the door to front-running and sandwich attacks. A sandwich attack is a variation of front-running, where an attacker sees a pending transaction, then places a significantly larger transaction (with the same tokens) directly before and after the victim’s transaction. This drives the price of the victim’s transaction up, effectively allowing the front runner to extract the difference in value. Since the victim's slippage rate is so high, the attacker can extract that much value from the attack. This could easily be prevented by setting a lower slippage.
                  </p>
                  <p class="text-lg">Too Low:</p>
                  <p>
                    If the slippage rate is set too low, then the transaction can fail (revert) if the price moves beyond the % that was set. While a low rate can prevent front running, it can also cause a user to lose gas fees to the failed transaction.
                  </p>
                </div>
              </tooltip-me-content>
            </tooltip-me>
          </div>
          <InputWithValidation @keyup.enter="toggleCustomRate" :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-lg'" :placeholder="'%'" :errorTop="'pt-8'">
            <p class="flex items-center justify-center text-xs z-30 right-0 absolute bg-gray-100 dark:bg-oswapDark-gray rounded-xl px-3 h-8">%</p>
          </InputWithValidation>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import InputWithValidation from '@/components/InputWithValidation'

  export default {
    name: 'SwapperRateCustom',
    components: {
      InputWithValidation,
    },
    props: {
      picked: String
    },
    data() {
      return {
        amount: "",
        errors: {},
        isOpen: false,
        tooltip: {
          name: new Date().getTime(),
          position: 'top',
          color: 'rgba(24, 213, 187, 1)',
          offset: 16,
          speed: 300,
          shift: 50
        },
      }
    },
    created() {
      window.addEventListener('keyup', this.doCommand);
    },
    unmounted() {
      window.removeEventListener('keyup', this.doCommand);
    },
    mounted() {
      this.$nextTick(function() {
        // Format the tooltip the first time
        this.adjustTooltip();
        // Format the tooltip when the user resizes the browser
        window.addEventListener('resize', () => {
          this.adjustTooltip();
        })
      })
    },
    computed: {
      checkCustom() {
        if (this.picked != '' && this.picked != '0.1' && this.picked != '0.3' && this.picked != '0.5') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      doCommand(e) {
        if (e.code == 'Escape' && this.isOpen) {
          this.isOpen = !this.isOpen
        }
      },
      toggleCustomRate() {
        this.isOpen = !this.isOpen
        this.errors = {}
      },
      inputAmount(value){
        if (value == "") {
          this.errors['empty'] = 'Cannot be empty.';
        } else {
          delete this.errors['empty'];
          this.$emit('selectRate', value)
        }
        if (parseFloat(value) < 0.1) {
          this.errors['low'] = 'Too low!';
        } else {
          delete this.errors['low'];
          this.$emit('selectRate', value)
        }
        // Checking if the input is in the right format.
        // parseFloat seems to behave like this regex rule.
        if (!value.match(/^\d*\.?\d*$/)) {
          this.errors['format'] = 'Invalid format! e.g: 0.75';
        } else {
          delete this.errors['format'];
          this.$emit('selectRate', value)
        }
        if (parseFloat(value) > 5) {
          this.errors['high'] = 'Be carefull with high values!';
        } else {
          delete this.errors['high'];
          this.$emit('selectRate', value)
        }
      },
      getWindowSize() {
        return {
          height: window.innerHeight,
          width: window.innerWidth
        }
      },
      adjustTooltip() {
        let width = this.getWindowSize().width;
        if (width > 0 && width < 540) {
           this.tooltip.shift = 65
        } else if (width >= 540) {
          this.tooltip.shift = 50
        }
      }
    }
  }
</script>