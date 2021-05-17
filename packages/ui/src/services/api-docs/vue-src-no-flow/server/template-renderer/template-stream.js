/*       */

const Transform = require('stream').Transform

export default class TemplateStream extends Transform {
  constructor (
    renderer,
    template,
    context,
  ) {
    super()
    this.started = false
    this.renderer = renderer
    this.template = template
    this.context = context || {}
    this.inject = renderer.inject
  }

  _transform (data, encoding, done) {
    if (!this.started) {
      this.emit('beforeStart')
      this.start()
    }
    this.push(data)
    done()
  }

  start () {
    this.started = true
    this.push(this.template.head(this.context))

    if (this.inject) {
      // inline server-rendered head meta information
      if (this.context.head) {
        this.push(this.context.head)
      }

      // inline preload/prefetch directives for initial/async chunks
      const links = this.renderer.renderResourceHints(this.context)
      if (links) {
        this.push(links)
      }

      // CSS files and inline server-rendered CSS collected by vue-style-loader
      const styles = this.renderer.renderStyles(this.context)
      if (styles) {
        this.push(styles)
      }
    }

    this.push(this.template.neck(this.context))
  }

  _flush (done) {
    this.emit('beforeEnd')

    if (this.inject) {
      // inline initial store state
      const state = this.renderer.renderState(this.context)
      if (state) {
        this.push(state)
      }

      // embed scripts needed
      const scripts = this.renderer.renderScripts(this.context)
      if (scripts) {
        this.push(scripts)
      }
    }

    this.push(this.template.tail(this.context))
    done()
  }
}
