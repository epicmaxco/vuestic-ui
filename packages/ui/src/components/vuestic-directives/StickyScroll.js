export default {
  bind: (el, binding) => {
    const duration = binding.value.duration || 500
    const isAnimated = binding.value.animate

    const observer = new MutationObserver(scrollToBottom)
    const config = { childList: true }
    observer.observe(el, config)

    function animateScroll (duration) {
      const start = el.scrollTop
      const end = el.scrollHeight
      const change = end - start
      const increment = 20

      function easeInOut (currentTime, start, change, duration) {
        currentTime /= duration / 2
        if (currentTime < 1) {
          return change / 2 * currentTime * currentTime + start
        }
        currentTime -= 1
        return -change / 2 * (currentTime * (currentTime - 2) - 1) + start
      }

      function animate (elapsedTime) {
        elapsedTime += increment
        var position = easeInOut(elapsedTime, start, change, duration)
        el.scrollTop = position

        if (elapsedTime < duration) {
          setTimeout(function () {
            animate(elapsedTime)
          }, increment)
        }
      }

      animate(0)
    }

    function scrollToBottom () {
      if (isAnimated) {
        animateScroll(duration)
      } else {
        el.scrollTop = el.scrollHeight
      }
    }
  },
}
