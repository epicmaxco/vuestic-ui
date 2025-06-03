import { describe, expect, test } from "vitest";
import { createVirtualComponent } from "../lib/create-virtual-component";
import { transformVue } from "../lib";

describe("Test Suite", async () => {
   const button = await createVirtualComponent('VcButton', `
          <script setup lang="ts">
            defineProps({
              firstName: String,
              lastName: String
            })
          </script>

          <template>
            <button>{{ $props.firstName + ' ' + $props.lastName }}</button>
          </template>
        `.trim())

        test('static prop', () => {
          const source = `
            <template>
              <div>
                <VcButton firstName="John" lastName="Doe" />
              </div>
            </template>
          `.trim()

          const transformed = transformVue(source, [button])

          expect(transformed.toString()).toBe(`
            <template>
              <div>
                <button>
                  John Doe
                </button>
              </div>
            </template>
          `.trim())
        })
})
