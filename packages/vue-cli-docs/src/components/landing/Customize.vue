<template>
  <section class="customize__bg">
  <div class="customize">
    <div class="customize__wrapper">
      <div class="customize__inner">
        <h2 class="customize__title">{{$t('landing.customize.title')}}</h2>
        <div class="customize__subtitle">{{$t('landing.customize.text')}}</div>
        <div class="customize__content">
          <!-- Tabs -->
          <div  class="tabs-wrapper">
            <va-tabs v-model="tabValue" class="tabs" color="#fff" center grow>
              <template #tabs="scope">
                <div :class="scope.class">
                  <va-tab
                    class="tabs__tab"
                    v-for="tab in [`${$t('landing.customize.tabs[0]')}`, `${$t('landing.customize.tabs[1]')}`, `${$t('landing.customize.tabs[2]')}`]"
                    :key="tab"
                  >
                    {{ tab }}
                  </va-tab>
                </div>
              </template>
            </va-tabs>
          </div>

          <!-- First block -->
          <div class="customize__content--first">
            <div class="block__components" v-if="tabValue === 1">
              <div class="component">
                <va-button color="#6F80E7" @click="btnClick()">
                  Submit
                </va-button>
              </div>

              <div class="component">
                <va-select
                  v-model="selectValue"
                  :options="options"
                  color="#6F80E7"
                  label="Country"
                />
              </div>

              <div class="component">
                <va-slider
                  color="#6F80E7"
                  v-model="sliderValue"
                />
              </div>

              <div class="component">
                <va-checkbox
                  v-model="checkboxValue"
                  label="Checkbox"
                  color="#6F80E7"
                />
              </div>
            </div>

            <div v-else-if="tabValue === 2">
              <table class="va-table va-table--striped va-table--hoverable" style="width: 100%">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.fullName }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.country }}</td>
                  <td>
                    <va-badge
                      :text="user.status"
                      :color="user.status"
                    />
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="block__components" v-else-if="tabValue === 3">
              <div class="component">
                <va-button-toggle v-model="theme" :color="themeColor" :options="themeToggleOptions" />
              </div>

              <div class="component">
                <va-switch v-model="switchValue" :color="themeColor" />
              </div>

              <div class="component">
                <va-alert :color="themeColor">
                  Important alert message
                </va-alert>
              </div>

              <div class="component">
                <va-button :color="themeColor">
                  Submit
                </va-button>
              </div>
            </div>
          </div>
          <!-- /First block -->

          <!-- Second block -->
          <div class="customize__content--second">
            <div class="code-wrapper" @click="copyText">
              <div class="code-subwrapper">
              <prism :key="code"  class="code" language="javascript">{{ code }}</prism>
              <input type="hidden" ref="codeInput" :value="code">
              </div>
            </div>
            <div class="clipboard" ref="message">{{$t('landing.customize.copy')}}</div>
          </div>
          <!-- /Second block -->

          <router-link class="customize__content__link" :to="`/${$root.$i18n.locale}/getting-started/configuration-guide`">
            {{$t('landing.customize.configuration')}}
          </router-link>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import 'prismjs'
import dedent from 'dedent'
// @ts-ignore
import Prism from 'vue-prism-component'

@Options({
  components: { Prism },
})
export default class Customize extends Vue {
  clicksCount = 0
  checkboxValue = true
  sliderValue = 45
  selectValue = 'Spain'
  options = ['Spain', 'Germany', 'France', 'Italy', 'China', 'Japan', 'Poland', 'Belarus', 'USA']
  tabValue = 1

  switchValue = true
  theme = 'light'
  themeToggleOptions = [{
    label: 'Light',
    value: 'light',
  }, {
    label: 'Dark',
    value: 'dark',
  }]

  users = [{
    id: 1,
    fullName: 'Ashley Mcdaniel',
    email: 'ashleymcdaniel@nebulean.com',
    country: 'Cayman Islands',
    status: 'warning',
  },
  {
    id: 2,
    fullName: 'Todd Sellers',
    email: 'sellerstodd@nebulean.com',
    country: 'Togo',
    status: 'info',
  },
  {
    id: 3,
    fullName: 'Sherman Knowles',
    email: 'shermanknowles@nebulean.com',
    country: 'Central African Republic',
    status: 'warning',
  },
  {
    id: 4,
    fullName: 'Vasquez Lawson',
    email: 'vasquezlawson@nebulean.com',
    country: 'Bouvet Island',
    status: 'info',
  }]

  get themeColor () {
    return this.theme === 'light' ? '#2C82E0' : '#042F83'
  }

  get code () {
    switch (this.tabValue) {
    case 1:
      return dedent`
          <template>
            <div class="components">
              <div class="component">
                <va-button color="#6F80E7" @click="btnClick">
                  Submit
                </va-button>
              </div>

              <div class="component">
                <va-select
                  v-model="selectValue"
                  :options="options"
                  color="#6F80E7"
                  label="Country"
                />
              </div>

              <div class="component">
                <va-slider
                  color="#6F80E7"
                  v-model="sliderValue"
                />
              </div>

              <div class="component">
                <va-checkbox
                  v-model="checkboxValue"
                  label="Checkbox"
                  color="#6F80E7"
                />
              </div>
            </div>
          </template>

          ${'<' + 'script>'}
          export default {
            data() {
              return {
                clicksCount: ${this.clicksCount},
                checkboxValue: ${this.checkboxValue},
                sliderValue: ${this.sliderValue},
                selectValue: ${this.selectValue},
                options = [
                  'Spain',
                  'Germany',
                  'France',
                  'Italy',
                  'China',
                  'Japan',
                  'Poland',
                  'Belarus',
                  'USA'
                ]
              }
            },

            methods: {
              btnClick() {
                this.clicksCount++
              }
            }
          }
          ${'</' + 'script>'}
        `
    case 2:
      return dedent`
        <template>
          <table class="va-table va-table--striped va-table--hoverable">
            <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.fullName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.country }}</td>
              <td>
                <va-badge
                  :text="user.status"
                  :color="user.status"
                />
              </td>
            </tr>
            </tbody>
          </table>
        </template>

        ${'<' + 'script>'}
        export default {
          data() {
            return {
              users: [{
                id: 1,
                fullName: 'Ashley Mcdaniel',
                email: 'ashleymcdaniel@nebulean.com',
                country: 'Cayman Islands',
                status: 'warning',
              },
              {
                id: 2,
                fullName: 'Todd Sellers',
                email: 'sellerstodd@nebulean.com',
                country: 'Togo',
                status: 'info',
              },
              {
                id: 3,
                fullName: 'Sherman Knowles',
                email: 'shermanknowles@nebulean.com',
                country: 'Central African Republic',
                status: 'warning',
              },
              {
                id: 4,
                fullName: 'Vasquez Lawson',
                email: 'vasquezlawson@nebulean.com',
                country: 'Bouvet Island',
                status: 'info',
              }]
            }
          }
        }
        ${'</' + 'script>'}
      `
    case 3:
      return dedent`
        <template>
          <div class="components">
            <div class="component">
              <va-button-toggle
                v-model="theme"
                color="primary"
                :options="themeToggleOptions"
                @input="updateTheme"
              />
            </div>

            <div class="component">
              <va-switch
                v-model="switchValue"
                color="primary"
              />
            </div>

            <div class="component">
              <va-alert color="primary">
                Important alert message
              </va-alert>
            </div>

            <div class="component">
              <va-button color="primary">
                Submit
              </va-button>
            </div>
          </div>
        </template>

        ${'<' + 'script>'}
        import { useTheme } from 'vuestic-ui'

        export default {
          setup () {
            const { getTheme, setTheme } = useTheme()

            return {
              getTheme,
              setTheme
            }
          },

          data() {
            return {
              theme: ${this.theme},
              themeToggleOptions: [{
                label: 'Light',
                value: 'light',
              }, {
                label: 'Dark',
                value: 'dark',
              }]
            }
          },

          methods: {
            updateTheme (value) {
              this.setTheme({
                primary: value === 'light' ? '#2C82E0' : '#042F83'
              })
            }
          }
        }
        ${'</' + 'script>'}
      `
    default:
      return ''
    }
  }

  btnClick () {
    this.clicksCount++
  }

  copyText () {
    const testingCodeToCopy: any = this.$refs.codeInput
    testingCodeToCopy.setAttribute('type', 'text')
    testingCodeToCopy.select()
    try {
      // @ts-ignore
      document.execCommand('copy')
      ;(this as any).$refs.message.style.opacity = 1
      setTimeout(() => {
        (this as any).$refs.message.style.opacity = 0
      }, 2000)
    } catch (err) {
      // @ts-ignore
      alert('Oops, unable to copy')
    }
    testingCodeToCopy.setAttribute('type', 'hidden')
    // @ts-ignore
    ;(window as any).getSelection().removeAllRanges()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/main.scss";

.customize {
  width: 100%;
  position: relative;
  padding-top: 8.5rem;
  padding-bottom: 12rem;
  background-image: url("../../assets/landing/images/vector-bg.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  // sm
  @include sm(padding-top, 5rem);
  @include sm(padding-bottom, 6rem);

  &__bg {
    background: linear-gradient(180.81deg, #182879 0.7%, #5b3c9b 99.3%);
  }

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    align-items: center;
  }

  &__title {
    @include col();
    @include size(12);
    @include title-font();

    color: #ffffff;
    text-align: center;
  }

  &__subtitle {
    @include col();
    @include size(12);
    @include text-font();

    color: #ffffff;
    padding-top: 3rem;
    text-align: center;

    // sm
    @include sm(padding-top, 2rem);
  }

  &__content {
    @include row-flex();
    @include col();
    @include size(8);
    @include shift-left(2);

    margin-top: 3rem;
    justify-content: center;

    // sm
    @include size-sm(12);
    @include shift-sm-left(0);
    @include sm(margin-top, 2rem);

    &--first {
      background: #ffffff;
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 3rem;
      width: 100%;
      border-radius: 1rem;

      // xs
      @include xs(padding, 2rem);
    }

    &--second {
      background: #ffffff1a;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 1rem;
      padding-bottom: 1rem;
      width: 80%;
      border-radius: 0 0 0.7rem 0.7rem;
    }

    &__link {
      @include link-font();

      color: #ffffff;
      padding-top: 1rem;
      line-height: 1.5rem;
    }
  }
}

.block {
  &__components {
    text-align: center;
    align-items: center;
    @include row-flex();

    .component {
      @include col();
      @include size(3);

      // lg
      @include size-lg(6);
      @include lg(padding-bottom, 1rem);
      // sm
      @include size-sm(12);
    }
  }
}

.clipboard {
  @include text-font();

  width: fit-content;
  background-color: #b0e2a7;
  color: #11380a;
  padding: 0.5rem 1rem;
  margin: 0.1rem 0;
  opacity: 0;
  transition: opacity 0.5s ease-in;
  border-radius: 0.2rem;
}

.code-wrapper {
  width: 100%;
  height: 12rem;
  padding: 0 4rem;
  overflow: auto;
  overflow-x: hidden;
  cursor: pointer;

  // sm
  @include sm(padding, 0 0.5rem);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: none;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #1a287a;
    opacity: 0.3;
    border-radius: 2px;
  }

  -ms-overflow-style: none; // hide for IE & Edge
  scrollbar-width: none; // hide for Firefox
}

.code {
  @include code-font();

  color: #ffffff;
  line-height: 1.4;
}

.tabs-wrapper {
  width: 100%;
}

.tabs {
  &__tab {
    @include button-font();

    margin-bottom: 1rem;
    margin-left: 0.51rem;
    margin-right: 0.51rem;
    color: #ffffff;
  }

  padding-bottom: 1rem;
}
</style>
