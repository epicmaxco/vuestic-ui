<template>
  <div class="DocsTable va-table">
    <table class="DocsTable__table">
      <thead>
        <tr>
          <th>Browser</th>
          <th>Supported</th>
        </tr>
      </thead>
      <tbody>
        <tr class="DocsTable__table__row">
          <td>Chrome</td>
          <td>
            <VaIcon
              name="check"
              color="primary"
            />
          </td>
        </tr>
        <tr class="DocsTable__table__row">
          <td>Edge</td>
          <td>
            <VaIcon
              name="check"
              color="primary"
            />
          </td>
        </tr>
        <tr class="DocsTable__table__row">
          <td>Firefox</td>
          <td>
            <VaIcon
              name="check"
              color="primary"
            />
          </td>
        </tr>
        <tr class="DocsTable__table__row">
          <td>Safari 10+</td>
          <td>
            <VaIcon
              name="check"
              color="primary"
            />
          </td>
        </tr>
        <tr class="DocsTable__table__row">
          <td class="not-supported">
            IE11
          </td>
          <td>
            <VaIcon
              name="block"
              color="backgroundBorder"
            />
          </td>
        </tr>
        <tr class="DocsTable__table__row">
          <td class="not-supported">
            Safari 9
          </td>
          <td>
            <VaIcon
              name="block"
              color="backgroundBorder"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.not-supported {
  color: var(--va-secondary);
}
</style>
