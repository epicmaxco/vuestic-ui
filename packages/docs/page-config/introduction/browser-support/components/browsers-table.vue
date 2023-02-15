<template>
  <div class="DocsTable">
    <table class="DocsTable__table">
      <thead>
        <tr>
          <th>{{ $t("browserSupport.table.browser") }}</th>
          <th>{{ $t("browserSupport.table.supported") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="DocsTable__table__row">
          <td>Chrome</td>
          <td>
            <va-icon
              name="check"
              color="primary"
            />
          </td>
        </tr>
        <tr class="DocsTable__table__row">
          <td>Edge</td>
          <td>
            <va-icon
              name="check"
              color="primary"
            />
          </td>
        </tr>
        <tr class="DocsTable__table__row">
          <td>Firefox</td>
          <td>
            <va-icon
              name="check"
              color="primary"
            />
          </td>
        </tr>
        <tr class="DocsTable__table__row">
          <td>Safari 10+</td>
          <td>
            <va-icon
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
            <va-icon
              name="mdi-cancel"
              color="backgroundBorder"
            />
          </td>
        </tr>
        <tr class="DocsTable__table__row">
          <td class="not-supported">
            Safari 9
          </td>
          <td>
            <va-icon
              name="mdi-cancel"
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
