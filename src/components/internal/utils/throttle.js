function throttle(func, delay, {trailing = true} = {}) {
  let pending = null
  let lastInvokeTime = null
  let timerId = null
  const pendingFunc = () => {
    if (pending === null || lastInvokeTime === null) {
      return
    }
    const invokeTime = Date.now()
    const shouldInvoke = invokeTime - lastInvokeTime >= delay
    if (shouldInvoke) {
      func.apply(pending.this, pending.args)
      lastInvokeTime = invokeTime
      pending = null
      timerId = null
    } else if (trailing) {
      startTimer()
    }
  }
  const startTimer = () => {
    if (timerId) {
      cancelAnimationFrame(timerId)
    }
    timerId = requestAnimationFrame(pendingFunc)
  }
  function throttled(...args) {
    if (lastInvokeTime === null) {
      lastInvokeTime = Date.now()
      func.apply(this, args)
    } else {
      pending = {this: this, args}
      startTimer()
    }
  }
  throttled.cancel = () => {
    if (timerId) {
      cancelAnimationFrame(timerId)
    }
    pending = null
    lastInvokeTime = null
    timerId = null
  }
  return throttled
}

export {
  throttle
}
