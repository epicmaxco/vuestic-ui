import { expect, describe, test } from 'vitest'
import { createVirtualComponent } from '../lib/create-virtual-component'
import { transformVue } from '../lib'

describe('Virtual Components', () => {
  describe('Syntax', () => {
    test('props defined with generic', async () => {
      const button = await createVirtualComponent('VcButton', `
        <script setup lang="ts">
          defineProps<{
            text: string
          }>()
        </script>

        <template>
          <button>{{ $props.text }}</button>
        </template>
      `.trim())

      const source = `
        <template>
          <div>
            <VcButton text="Test" />
          </div>
        </template>
      `.trim()

      const transformed = transformVue(source, [button])

      expect(transformed.toString()).toBe(`
        <template>
          <div>
            <button>
              Test
            </button>
          </div>
        </template>
      `.trim())
    })

    // describe('props', () => {
    //   describe('rendering', () => {
    //     describe('Interpolation', () => {
    //       const button = await createVirtualComponent('VcButton', `
    //         <script setup>
    //           defineProps({
    //             text: String
    //           })
    //         </script>

    //         <template>
    //           <button>{{ $props.text }}</button>
    //         </template>
    //       `.trim())


    //       test('static prop', () => {
    //         const source = `
    //           <template>
    //             <div>
    //               <VcButton text="Test" />
    //             </div>
    //           </template>
    //         `.trim()

    //         const transformed = transformVue(source, [button])

    //         expect(transformed.toString()).toBe(`
    //           <template>
    //             <div>
    //               <button>
    //                 Test
    //               </button>
    //             </div>
    //           </template>
    //         `.trim())
    //       })

    //       test('dynamic prop', () => {
    //         const source = `
    //           <script setup>
    //             const userName = ref('Test')
    //           </script>

    //           <template>
    //             <div>
    //               <VcButton :text="userName" />
    //             </div>
    //           </template>
    //         `.trim()

    //         const transformed = transformVue(source, [button])

    //         expect(transformed.toString()).toBe(`
    //           <script setup>
    //             const userName = ref('Test')
    //           </script>

    //           <template>
    //             <div>
    //               <button>
    //                 {{ userName }}
    //               </button>
    //             </div>
    //           </template>
    //         `.trim())
    //       })
    //     })

    //     describe('Bind', () => {
    //       const button = await createVirtualComponent('VcButton', `
    //         <script setup>
    //           defineProps({
    //             color: String
    //           })
    //         </script>

    //         <template>
    //           <button :color="$props.color">Sign In</button>
    //         </template>
    //       `.trim())

    //       test('static prop', () => {
    //         const source = `
    //           <template>
    //             <div>
    //               <VcButton color="blue" />
    //             </div>
    //           </template>
    //         `.trim()

    //         const transformed = transformVue(source, [button])

    //         expect(transformed.toString()).toBe(`
    //           <template>
    //             <div>
    //               <button color="blue">
    //                 Sign In
    //               </button>
    //             </div>
    //           </template>
    //         `.trim())
    //       })

    //       test('dynamic prop', () => {
    //         const source = `
    //           <script setup>
    //             const color = ref('blue')
    //           </script>

    //           <template>
    //             <div>
    //               <VcButton :color="color" />
    //             </div>
    //           </template>
    //         `.trim()

    //         const transformed = transformVue(source, [button])

    //         expect(transformed.toString()).toBe(`
    //           <script setup>
    //             const color = ref('blue')
    //           </script>

    //           <template>
    //             <div>
    //               <button :color="color">
    //                 Sign In
    //               </button>
    //             </div>
    //           </template>
    //         `.trim())
    //       })
    //     })
    //   })

    //   describe('props calculation (string)', () => {
    //     const button = await createVirtualComponent('VcButton', `
    //       <script setup>
    //         defineProps({
    //           firstName: String,
    //           lastName: String
    //         })
    //       </script>

    //       <template>
    //         <button>{{ $props.firstName + ' ' + $props.lastName }}</button>
    //       </template>
    //     `.trim())

    //     test('static prop', () => {
    //       const source = `
    //         <template>
    //           <div>
    //             <VcButton firstName="John" lastName="Doe" />
    //           </div>
    //         </template>
    //       `.trim()

    //       const transformed = transformVue(source, [button])

    //       expect(transformed.toString()).toBe(`
    //         <template>
    //           <div>
    //             <button>
    //               John Doe
    //             </button>
    //           </div>
    //         </template>
    //       `.trim())
    //     })

    //     test('dynamic prop', () => {
    //       const source = `
    //         <script setup>
    //           const firstName = ref('John')
    //           const lastName = ref('Doe')
    //         </script>

    //         <template>
    //           <div>
    //             <VcButton :firstName="firstName" :lastName="lastName" />
    //           </div>
    //         </template>
    //       `.trim()

    //       const transformed = transformVue(source, [button])

    //       expect(transformed.toString()).toBe(`
    //         <script setup>
    //           const firstName = ref('John')
    //           const lastName = ref('Doe')
    //         </script>

    //         <template>
    //           <div>
    //             <button>
    //               {{ firstName + ' ' + lastName }}
    //             </button>
    //           </div>
    //         </template>
    //       `.trim())
    //     })

    //     test('dynamic and static prop', () => {
    //       const source = `
    //         <script setup>
    //           const name = ref('John')
    //         </script>

    //         <template>
    //           <div>
    //             <VcButton :firstName="name" lastName="Doe" />
    //           </div>
    //         </template>
    //       `.trim()

    //       const transformed = transformVue(source, [button])

    //       expect(transformed.toString()).toBe(`
    //         <script setup>
    //           const name = ref('John')
    //         </script>

    //         <template>
    //           <div>
    //             <button>
    //               {{ name + ' ' + "Doe" }}
    //             </button>
    //           </div>
    //         </template>
    //       `.trim())
    //     })
    //   })

    //   describe('props calculation (number)', () => {
    //     const button = await createVirtualComponent('VcButton', `
    //       <script setup>
    //         defineProps({
    //           price: Number,
    //           discount: Number
    //         })
    //       </script>

    //       <template>
    //         <button>{{ $props.price * $props.discount }}</button>
    //       </template>
    //     `.trim())

    //     test('static prop', () => {
    //       const source = `
    //         <template>
    //           <div>
    //             <VcButton price="100" discount="0.1" />
    //           </div>
    //         </template>
    //       `.trim()

    //       const transformed = transformVue(source, [button])

    //       expect(transformed.toString()).toBe(`
    //         <template>
    //           <div>
    //             <button>
    //               10
    //             </button>
    //           </div>
    //         </template>
    //       `.trim())
    //     })

    //     test('dynamic prop', () => {
    //       const source = `
    //         <script setup>
    //           const price = ref(100)
    //           const discount = ref(0.1)
    //         </script>

    //         <template>
    //           <div>
    //             <VcButton :price="price" :discount="discount" />
    //           </div>
    //         </template>
    //       `.trim()

    //       const transformed = transformVue(source, [button])

    //       expect(transformed.toString()).toBe(`
    //         <script setup>
    //           const price = ref(100)
    //           const discount = ref(0.1)
    //         </script>

    //         <template>
    //           <div>
    //             <button>
    //               {{ price * discount }}
    //             </button>
    //           </div>
    //         </template>
    //       `.trim())
    //     })

    //     test('dynamic and static prop', () => {
    //       const source = `
    //         <script setup>
    //           const price = ref(100)
    //         </script>

    //         <template>
    //           <div>
    //             <VcButton :price="price" :discount="0.1" />
    //           </div>
    //         </template>
    //       `.trim()

    //       const transformed = transformVue(source, [button])

    //       expect(transformed.toString()).toBe(`
    //         <script setup>
    //           const price = ref(100)
    //         </script>

    //         <template>
    //           <div>
    //             <button>
    //               {{ price * 0.1 }}
    //             </button>
    //           </div>
    //         </template>
    //       `.trim())
    //     })

    //     test('dynamic number (e.g. static)', () => {
    //       const source = `
    //         <script setup>
    //           const price = ref(100)
    //         </script>

    //         <template>
    //           <div>
    //             <VcButton :price="price" :discount="0.1" />
    //           </div>
    //         </template>
    //       `.trim()

    //       const transformed = transformVue(source, [button])

    //       expect(transformed.toString()).toBe(`
    //         <script setup>
    //           const price = ref(100)
    //         </script>

    //         <template>
    //           <div>
    //             <button>
    //               {{ price * 0.1 }}
    //             </button>
    //           </div>
    //         </template>
    //       `.trim())
    //     })
    //   })

    //   describe('props multiple calculation', () => {
    //     const button = await createVirtualComponent('VcButton', `
    //       <script setup>
    //         defineProps({
    //           price: Number,
    //           discount: Number,
    //           currency: String
    //         })
    //       </script>

    //       <template>
    //         <button>{{ $props.price * $props.discount + ' ' + $props.currency }}</button>
    //       </template>
    //     `.trim())

    //     test('static prop', () => {
    //       const source = `
    //         <template>
    //           <div>
    //             <VcButton price="100" discount="0.1" currency="USD" />
    //           </div>
    //         </template>
    //       `.trim()

    //       const transformed = transformVue(source, [button])

    //       expect(transformed.toString()).toBe(`
    //         <template>
    //           <div>
    //             <button>
    //               10 USD
    //             </button>
    //           </div>
    //         </template>
    //       `.trim())
    //     })

    //     test('dynamic prop', () => {
    //       const source = `
    //         <script setup>
    //           const price = ref(100)
    //           const discount = ref(0.1)
    //           const currency = ref('USD')
    //         </script>

    //         <template>
    //           <div>
    //             <VcButton :price="price" :discount="discount" :currency="currency" />
    //           </div>
    //         </template>
    //       `.trim()

    //       const transformed = transformVue(source, [button])

    //       expect(transformed.toString()).toBe(`
    //         <script setup>
    //           const price = ref(100)
    //           const discount = ref(0.1)
    //           const currency = ref('USD')
    //         </script>

    //         <template>
    //           <div>
    //             <button>
    //               {{ price * discount + ' ' + currency }}
    //             </button>
    //           </div>
    //         </template>
    //       `.trim())
    //     })

    //     test('dynamic and static prop', () => {
    //       const source = `
    //         <script setup>
    //           const price = ref(100)
    //         </script>

    //         <template>
    //           <div>
    //             <VcButton :price="price" :discount="0.1" currency="USD" />
    //           </div>
    //         </template>
    //       `.trim()

    //       const transformed = transformVue(source, [button])

    //       expect(transformed.toString()).toBe(`
    //         <script setup>
    //           const price = ref(100)
    //         </script>

    //         <template>
    //           <div>
    //             <button>
    //               {{ price * 0.1 + ' ' + "USD" }}
    //             </button>
    //           </div>
    //         </template>
    //       `.trim())
    //     })
    //   })

    //   test('props calculation static+dynamic (bind)', () => {
    //     const icon = await createVirtualComponent('VcIcon', `
    //       <script setup>
    //         defineProps({
    //           font: String,
    //           name: String
    //         })
    //       </script>

    //       <template>
    //         <i :class="\`\${font} \${font}-\${name}\`" />
    //       </template>
    //     `.trim())

    //     const source = `
    //       <script setup>
    //         const user = { icon: 'person' }
    //       </script>

    //       <template>
    //         <VcIcon font="fa" :name="user.icon" />
    //       </template>
    //     `.trim()

    //     const transformed = transformVue(source, [icon])

    //     expect(transformed.toString()).toBe(`
    //       <script setup>
    //         const user = { icon: 'person' }
    //       </script>

    //       <template>
    //         <i :class="\`fa fa-\${user.icon}\`" />
    //       </template>
    //     `.trim())
    //   })

    //   test('props defined with generic', () => {
    //     const button = await createVirtualComponent('VcButton', `
    //       <script setup>
    //         defineProps<{
    //           text: string
    //         }>()
    //       </script>

    //       <template>
    //         <button>{{ $props.text }}</button>
    //       </template>
    //     `.trim())

    //     const source = `
    //       <template>
    //         <div>
    //           <VcButton text="Test" />
    //         </div>
    //       </template>
    //     `.trim()

    //     const transformed = transformVue(source, [button])

    //     expect(transformed.toString()).toBe(`
    //       <template>
    //         <div>
    //           <button>
    //             Test
    //           </button>
    //         </div>
    //       </template>
    //     `.trim())
    //   })

    //   describe('props with default value', () => {
    //     test('props destruction', () => {
    //       const button = await createVirtualComponent('VcButton', `
    //         <script setup>
    //           const { text = 'Sign In' } = defineProps<{ text: string }>()
    //         </script>

    //         <template>
    //           <button>{{ $props.text }}</button>
    //         </template>
    //       `.trim())

    //       const source = `
    //         <template>
    //           <VcButton />
    //         </template>
    //       `.trim()

    //       const transformed = transformVue(source, [button])

    //       expect(transformed.toString()).toBe(`
    //         <template>
    //           <button>
    //             Sign In
    //           </button>
    //         </template>
    //       `.trim())
    //     })

    //     test('props default value', () => {
    //       const button = await createVirtualComponent('VcButton', `
    //         <script setup>
    //           defineProps({
    //             text: { default: 'Sign In' }
    //           })
    //         </script>

    //         <template>
    //           <button>{{ $props.text }}</button>
    //         </template>
    //       `.trim())

    //       const source = `
    //         <template>
    //           <VcButton />
    //         </template>
    //       `.trim()

    //       const transformed = transformVue(source, [button])

    //       expect(transformed.toString()).toBe(`
    //         <template>
    //           <button>
    //             Sign In
    //           </button>
    //         </template>
    //       `.trim())
    //     })
    //   })
    // })
  })
})
