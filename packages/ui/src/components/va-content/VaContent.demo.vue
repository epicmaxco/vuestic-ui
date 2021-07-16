<template>
  <VbDemo>
    <VbCard title="va-content headers h1-h6">
      <va-content>
        <h1>h1 title</h1>
        <h2>h2 title</h2>
        <h3>h3 title</h3>
        <h4>h4 title</h4>
        <h5>h5 title</h5>
        <h6>h6 title</h6>
      </va-content>
    </VbCard>
    <VbCard title="default headers h1-h6">
      <div>
        <h1>h1 title</h1>
        <h2>h2 title</h2>
        <h3>h3 title</h3>
        <h4>h4 title</h4>
        <h5>h5 title</h5>
        <h6>h6 title</h6>
      </div>
    </VbCard>
    <VbCard title="va-content pre">
      <va-content>
        <pre>pre text must be here</pre>
        <p>class: code</p>
        <pre class="code">code must be here</pre>
      </va-content>
    </VbCard>
    <VbCard title="default pre">
      <div>
        <pre>pre text must be here</pre>
      </div>
    </VbCard>
    <VbCard title="va-content lists">
      <va-content>
        <ol>
          <li>item 1</li>
          <li>
            item 2
            <ol>
              <li>item 2.1</li>
              <li>item 2.2</li>
            </ol>
          </li>
          <li>item 3</li>
          <li>item 4</li>
        </ol>
        <ul>
          <li>item 1</li>
          <li>
            item 2
            <ul>
              <li>item 2.1</li>
              <li>item 2.2</li>
            </ul>
          </li>
          <li>item 3</li>
          <li>item 4</li>
        </ul>
      </va-content>
    </VbCard>
    <VbCard title="default lists">
      <ol>
        <li>item 1</li>
        <li>
          item 2
          <ol>
            <li>item 2.1</li>
            <li>item 2.2</li>
          </ol>
        </li>
        <li>item 3</li>
        <li>item 4</li>
      </ol>
      <ul>
        <li>item 1</li>
        <li>
          item 2
          <ul>
            <li>item 2.1</li>
            <li>item 2.2</li>
          </ul>
        </li>
        <li>item 3</li>
        <li>item 4</li>
      </ul>
    </VbCard>
    <VbCard title="va-content blockquote">
      <va-content>
        <blockquote>
          <p>this is great blockquote</p>
          <p>author</p>
        </blockquote>
      </va-content>
    </VbCard>
    <VbCard title="default blockquote">
      <blockquote>
        <p>this is great blockquote</p>
        <p>author</p>
      </blockquote>
    </VbCard>
    <VbCard title="va-content figure">
      <va-content>
        <figure>
          <img src="https://i.imgur.com/NLrdqsk.png">
          <figcaption>Name of picture</figcaption>
        </figure>
      </va-content>
    </VbCard>
    <VbCard title="default figure">
      <figure>
        <img src="https://i.imgur.com/NLrdqsk.png">
        <figcaption>Name of picture</figcaption>
      </figure>
    </VbCard>
    <VbCard title="va-content table">
      <va-content>
        <table>
          <thead>
            <tr>
              <th
                v-for="(data, index) in tableDataHead"
                :key="index"
              >
                {{ data }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(data, index) in tableData"
              :key="index"
            >
              <td
                v-for="(i) in data"
                :key="i"
              >
                {{ i }}
              </td>
            </tr>
          </tbody>
        </table>
        <p>striped</p>
        <table class="striped">
          <thead>
            <tr>
              <th
                v-for="(data, index) in tableDataHead"
                :key="index"
              >
                {{ data }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(data, index) in tableData"
              :key="index"
            >
              <td
                v-for="(i) in data"
                :key="i"
              >
                {{ i }}
              </td>
            </tr>
          </tbody>
        </table>
      </va-content>
    </VbCard>
    <VbCard title="default table">
      <table>
        <thead>
          <tr>
            <th
              v-for="(data, index) in tableDataHead"
              :key="index"
            >
              {{ data }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(data, index) in tableData"
            :key="index"
          >
            <td
              v-for="(i) in data"
              :key="i"
            >
              {{ i }}
            </td>
          </tr>
        </tbody>
      </table>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaContent from './VaContent'

export default {
  components: {
    VaContent,
  },
  data () {
    return {
      tableDataHead: ['Id', 'FooBar type', 'Actions'],
      tableData: [
        ['1', 'Zebra', 'Delete'],
        ['2', 'Not Zebra', 'Remove'],
        ['3', 'Very Zebra', 'Eradicate'],
      ],
    }
  },
}
</script>
