const _b = {true: true, false: false}

const _bool = e => _b[e] ?? null

const _digit = e => {
  if (e === 'null') {
    return null
  }
  e = +e
  return isNaN(e) ? null : e
}

const type = {
  d: _digit,
  b: _bool
}

const fdo = fd => {
  let ty

  if (typeof fd === 'string') {
    fd = JSON.parse(fd)
    ty = JSON.parse(fd['_ty'] ?? null)
    delete fd['_ty']
  } else {
    ty = JSON.parse(fd.get('_ty'))
    fd.delete('_ty')
  }

  const o = {}

  for (const a of fd) {
    if (a[1] !== '') {
      const k = a[0]
      const t = ty?.[a[0]]
      const v =
        t === undefined ? (a[1] === 'null' ? null : a[1]) : type[t](a[1])

      if (Object.hasOwn(o, k)) {
        if (!Array.isArray(o[k])) {
          o[k] = [o[k], v]
        } else {
          o[k].push(v)
        }
      } else {
        o[k] = v
      }
    }
  }

  return o
}

const delay = (o, s) => new Promise(r => setTimeout(r, s, o))

export {
  fdo,
  delay
}
