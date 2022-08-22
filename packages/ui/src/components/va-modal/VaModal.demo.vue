<template>
  <VbDemo>
    <VbCard title="modal size">
      <p class="my-3">
        <button @click="showModalSizeSmall = !showModalSizeSmall">
          show modal size small
        </button>
        <va-modal
          v-model="showModalSizeSmall"
          title="Simple Popup, Full Width"
          :message="message"
          size="small"
          @ok="() => logger('ok')"
          @cancel="logger('cancel')"
          @before-open="logger('before-open')"
          @open="logger('open')"
          @before-close="logger('before-close')"
          @close="logger('close')"
          @click-outside="logger('click-outside')"
        />
      </p>
      <p class="my-3">
        <button @click="showModalSizeMedium = !showModalSizeMedium">
          show modal size medium (default)
        </button>
        <va-modal
          v-model="showModalSizeMedium"
          title="Simple Popup, Full Width"
          :message="message"
        />
      </p>
      <p class="my-3">
        <button @click="showModalSizeLarge = !showModalSizeLarge">
          show modal size large
        </button>
        <va-modal
          v-model="showModalSizeLarge"
          title="Simple Popup, Full Width"
          :message="message"
          size="large"
        />
      </p>
    </VbCard>
    <VbCard title="custom content">
      <button @click="showCustomContent = !showCustomContent">
        Show custom content modal
      </button>
      <va-modal
        v-model="showCustomContent"
      >
        <template #content>
          <h1>Custom content modal</h1>
        </template>
      </va-modal>
    </VbCard>
    <VbCard title="fullscreen, slots use, custom action">
      <button @click="showFullScreenModal = !showFullScreenModal">
        Show modal
      </button>
      <va-modal
        v-model="showFullScreenModal"
        :fullscreen="true"
      >
        <template #header>
          <h2>Step 2. Centered Layout</h2>
        </template>
        <div>{{ message }}</div>
        <template #footer>
          <va-button @click="customActionClick()">
            Custom action
          </va-button>
        </template>
      </va-modal>
    </VbCard>
    <VbCard title="Anchor">
      <va-modal v-model="showAnchorModal">
        <template #anchor="{ show }">
          <button @click="show()">Anchor-button</button>
        </template>
        <div>{{ message }}</div>
      </va-modal>
    </VbCard>
    <VbCard title="No padding">
      <button @click="showNoPaddingModal = !showNoPaddingModal">
        Show no padding modal
      </button>
      <va-modal no-padding v-model="showNoPaddingModal">
        {{ message }}
      </va-modal>
    </VbCard>
    <VbCard title="stateful">
      <button @click="$refs.statefulModal.show()">
        Show modal
      </button>
      <va-modal ref="statefulModal" stateful>
        <template #header>
          <h2>Step 2. Centered Layout</h2>
        </template>
        <div>{{ message }}</div>
      </va-modal>
    </VbCard>
    <VbCard title="stateful with anchor">
      <va-modal stateful class="example-modal" anchor-class="example-modal-anchor">
        <template #anchor="{ show }">
          <button @click="show()">Anchor-button</button>
        </template>
        <div>{{ message }}</div>
      </va-modal>
    </VbCard>
    <VbCard title="mobile-fullscreen: false">
      <button @click="showModalNotMobileFullScreen = !showModalNotMobileFullScreen">
        Show modal
      </button>
      <va-modal
        v-model="showModalNotMobileFullScreen"
        :mobile-fullscreen="false"
        title="Step 2. Centered Layout"
        :message="message"
      />
    </VbCard>
    <VbCard title="no-outside-dismiss">
      <button @click="showModalNoOutsideDismiss = !showModalNoOutsideDismiss">
        Show modal
      </button>
      <va-modal
        v-model="showModalNoOutsideDismiss"
        :no-outside-dismiss="true"
        title="Step 2. Centered Layout"
        :message="message"
      />
    </VbCard>
    <VbCard title="no-esc-dismiss">
      <button @click="showModalNoEscDismiss = !showModalNoEscDismiss">
        Show modal
      </button>
      <va-modal
        v-model="showModalNoEscDismiss"
        :no-esc-dismiss="true"
        title="Step 2. Centered Layout"
        :message="message"
      />
    </VbCard>
    <VbCard title="no-dismiss">
      <button @click="showModalNoDismiss = !showModalNoDismiss">
        Show modal
      </button>
      <va-modal
        v-model="showModalNoDismiss"
        :no-dismiss="true"
        title="Step 2. Centered Layout"
        :message="message"
      />
    </VbCard>
    <VbCard title="overlay: false">
      <button @click="showModalOverlay = !showModalOverlay">
        Show modal
      </button>
      <va-modal
        v-model="showModalOverlay"
        :overlay="false"
        title="Step 2. Centered Layout"
        :message="message"
      />
    </VbCard>
    <VbCard title="blur: true">
      <button @click="showModalBlur = !showModalBlur">
        Show modal
      </button>
      <va-modal
        v-model="showModalBlur"
        blur
        title="Step 2. Centered Layout"
        :message="message"
      />
    </VbCard>
    <VbCard title="several lays">
      <button @click="showModalFirstLay = !showModalFirstLay">
        Show modal
      </button>
      <va-modal
        v-model="showModalFirstLay"
        title="Several lays"
        :message="message"
      >
        <button @click="showModalSecondLay = !showModalSecondLay">
          Show modal
        </button>
        <va-modal
          v-model="showModalSecondLay"
          title="Several layers"
          :message="message"
        />
      </va-modal>
    </VbCard>
    <VbCard title="fixed layout">
      <button @click="showFixedLayoutModal = !showFixedLayoutModal">
        Show modal
      </button>
      <va-modal
        v-model="showFixedLayoutModal"
        :fixed-layout="true"
        :message="longMessage"
      >
        <template #header>
          <p>Step 2. Centered Layout</p>
        </template>
      </va-modal>
    </VbCard>
    <VbCard title="hide default actions">
      <button @click="showWithoutDefaultActions = !showWithoutDefaultActions">
        Show modal
      </button>
      <va-modal
        v-model="showWithoutDefaultActions"
        hide-default-actions
        :message="longMessage"
      >
        <template #header>
          <p>Step 2. Centered Layout</p>
        </template>
      </va-modal>
    </VbCard>
    <VbCard title="onOk, onCancel functions">
      <button @click="showSpecialActionsModal = !showSpecialActionsModal">
        Show modal
      </button>
      <va-modal
        v-model="showSpecialActionsModal"
        @ok="onOk"
        @cancel="onCancel"
        :message="longMessage"
      >
        <template #header>
          <p>Step 2. Centered Layout</p>
        </template>
      </va-modal>
    </VbCard>
    <VbCard title="long message">
      <button @click="showModalLongMessage = !showModalLongMessage">
        Show modal
      </button>
      <va-modal
        v-model="showModalLongMessage"
        title="Several lays"
        :message="longMessage"
      />
    </VbCard>
    <VbCard title="without title">
      <button @click="showModalWithoutTitle = !showModalWithoutTitle">
        Show modal
      </button>
      <va-modal
        v-model="showModalWithoutTitle"
        :message="longMessage"
      />
    </VbCard>
    <VbCard title="without transitions">
      <button @click="showModalWithoutTransitions = !showModalWithoutTransitions">
        Show modal
      </button>
      <va-modal
        without-transitions
        v-model="showModalWithoutTransitions"
        :message="message"
      />
    </VbCard>
    <VbCard title="overlay-opacity">
      <button @click="showModalOverlayOpacity = !showModalOverlayOpacity">
        Show modal
      </button>
      <va-modal
        v-model="showModalOverlayOpacity"
        overlay-opacity="0.2"
        :message="longMessage"
      />
    </VbCard>
    <VbCard title="z-index">
      <button @click="showModalZIndex = !showModalZIndex">
        Show modal
      </button>
      <va-modal
        v-model="showModalZIndex"
        :z-index="10"
        :message="longMessage"
      />
    </VbCard>
    <VbCard title="custom footer">
      <button @click="showModalCustomFooter = !showModalCustomFooter">
        Show modal
      </button>
      <va-modal
        v-model="showModalCustomFooter"
        :message="longMessage"
      >
        <template #footer>
          <div style="margin-top: 30px; width: 100%;" />
          <p style="background-color: lightblue; width: 100%; text-align: center;">Custom footer</p>
        </template>
      </va-modal>
    </VbCard>
    <VbCard title="custom background">
      <button @click="showModalCustomBackground = !showModalCustomBackground">
        Show modal
      </button>
      <va-modal
        v-model="showModalCustomBackground"
        :message="longMessage"
        backgroundColor="#222"
      >
      </va-modal>
    </VbCard>
    <VbCard title="nested modals">
      <button @click="showModalNested1 = !showModalNested1">
        Show first modal
      </button>

      <va-modal v-model="showModalNested1" :message="message" hide-default-actions>
        <button class="mt-5" @click="showModalNested2 = !showModalNested2" color="secondary">
          Show second modal
        </button>

        <va-modal v-model="showModalNested2" :message="message">
          Second Modal
        </va-modal>
      </va-modal>
    </VbCard>
    <VbCard title="vaModal return by click">
      <button @click="buttonClick">init vaModal</button>
    </VbCard>
    <VbCard title="Test focus trap">
      <button @click="showModalFocusTrap1 = !showModalFocusTrap1">
        Show first modal
      </button>

      <va-modal v-model="showModalFocusTrap1" :message="message" hide-default-actions>
        <va-collapse
          v-model="collapseValue"
          style="width: 400px;"
          :header="'collapseHeader'"
          solid
        >
          <div class="collapse-content">
            content
          </div>
        </va-collapse>
        <a tabindex="0" target="_blank" href="https://google.com">
          Google
        </a>
        <va-button class="mt-5" @click="showModalFocusTrap2 = !showModalFocusTrap2" color="secondary">
          Show second modal
        </va-button>
        <input type="text" />
        <va-modal v-model="showModalFocusTrap2" :message="message">
          Second Modal
          <va-input placeholder="lalala" />
          <va-date-picker />
        </va-modal>
      </va-modal>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaModal } from './'
import { VaButton } from '../va-button'
import { VaCollapse, VaInput, VaDatePicker } from '@/components'

export default {
  components: { VaModal, VaButton, VaCollapse, VaInput, VaDatePicker },
  data () {
    return {
      showModalSizeSmall: false,
      showModalSizeMedium: false,
      showModalSizeLarge: false,
      showCustomContent: false,
      showFullScreenModal: false,
      showAnchorModal: false,
      showActionsModal: false,
      showFixedLayoutModal: false,
      showWithoutDefaultActions: false,
      showSpecialActionsModal: false,
      showModalWithCloseButton: false,
      showModalWithoutCloseButton: false,
      showModalNotMobileFullScreen: false,
      showModalNoOutsideDismiss: false,
      showModalNoEscDismiss: false,
      showModalFirstLay: false,
      showModalSecondLay: false,
      showModalLongMessage: false,
      showModalWithoutTitle: false,
      showModalWithoutTransitions: false,
      showModalNoDismiss: false,
      showModalOverlay: false,
      showModalOverlayOpacity: false,
      showModalBlur: false,
      showModalZIndex: false,
      showModalCustomFooter: false,
      showModalCustomBackground: false,
      showModalNested1: false,
      showModalNested2: false,
      showNoPaddingModal: false,
      showModalFocusTrap1: false,
      showModalFocusTrap2: false,
      message: this.$vb.lorem(),
      longMessage: this.$vb.lorem(5000),
      collapseValue: false,
    }
  },
  methods: {
    onOk () {
      this.$vb.log('OK')
    },
    onCancel () {
      this.$vb.log('Cancel')
    },
    customActionClick () {
      this.$vb.log('custom action click')
    },
    logger (message) {
      console.log(message !== 'undefined' ? message : '-- log --')
    },
    buttonClick () {
      this.$vaModal.init({
        title: 'Click Event',
        message: 'First Modal',
        withoutTransitions: true,
        'onUpdate:modelValue': this.logger,
        onOk: () => this.logger('clicked OK button'),
      })

      setTimeout(() => {
        this.$vaModal.init('Second Modal')
      }, 3000)
    },
  },
}
</script>

<style lang="scss">
  .example-modal-anchor {
    button {
      color: red;
    }
  }

  .example-modal {
    .va-modal__container {
      background-color: blue;
    }
  }
</style>
