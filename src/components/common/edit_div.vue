<template>
  <div
    class="edit-div"
    v-html="innerText"
    :contenteditable="canEdit"
    @focus="isLocked = true"
    @blur="isLocked = false"
    @input="changeText"
  ></div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'editDiv',
  props: {
    value: {
      type: String,
      default: ''
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      innerText: this.value,
      isLocked: false
    }
  },
  watch: {
    'value'() {
      if (!this.isLocked || !this.innerText) {
        this.innerText = this.value;
      }
    }
  },
  methods: {
    changeText() {
      this.$emit('input', this.$el.innerHTML);
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.edit-div {
  display: inline-block;
  background: #fff;
  border: 1px #ddd solid;
  padding: 0 5px;

  height: 30px;
  overflow: auto;
  word-break: break-all;
  outline: none;
  user-select: text;
  white-space: pre-wrap;
  text-align: left;
  &[contenteditable="true"] {
    user-modify: read-write-plaintext-only;
    &:empty:before {
      content: attr(placeholder);
      display: block;
      color: #ccc;
    }
  }
}
</style>
