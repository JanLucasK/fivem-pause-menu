/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = globalThis, Bi = $e.ShadowRoot && ($e.ShadyCSS === void 0 || $e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ni = Symbol(), eo = /* @__PURE__ */ new WeakMap();
let Lo = class {
  constructor(r, h, f) {
    if (this._$cssResult$ = !0, f !== Ni) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = r, this.t = h;
  }
  get styleSheet() {
    let r = this.o;
    const h = this.t;
    if (Bi && r === void 0) {
      const f = h !== void 0 && h.length === 1;
      f && (r = eo.get(h)), r === void 0 && ((this.o = r = new CSSStyleSheet()).replaceSync(this.cssText), f && eo.set(h, r));
    }
    return r;
  }
  toString() {
    return this.cssText;
  }
};
const Zi = (u) => new Lo(typeof u == "string" ? u : u + "", void 0, Ni), Qs = (u, ...r) => {
  const h = u.length === 1 ? u[0] : r.reduce((f, _, o) => f + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(_) + u[o + 1], u[0]);
  return new Lo(h, u, Ni);
}, tr = (u, r) => {
  if (Bi) u.adoptedStyleSheets = r.map((h) => h instanceof CSSStyleSheet ? h : h.styleSheet);
  else for (const h of r) {
    const f = document.createElement("style"), _ = $e.litNonce;
    _ !== void 0 && f.setAttribute("nonce", _), f.textContent = h.cssText, u.appendChild(f);
  }
}, io = Bi ? (u) => u : (u) => u instanceof CSSStyleSheet ? ((r) => {
  let h = "";
  for (const f of r.cssRules) h += f.cssText;
  return Zi(h);
})(u) : u;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: er, defineProperty: ir, getOwnPropertyDescriptor: nr, getOwnPropertyNames: or, getOwnPropertySymbols: sr, getPrototypeOf: rr } = Object, Ot = globalThis, no = Ot.trustedTypes, ar = no ? no.emptyScript : "", Ei = Ot.reactiveElementPolyfillSupport, ve = (u, r) => u, We = { toAttribute(u, r) {
  switch (r) {
    case Boolean:
      u = u ? ar : null;
      break;
    case Object:
    case Array:
      u = u == null ? u : JSON.stringify(u);
  }
  return u;
}, fromAttribute(u, r) {
  let h = u;
  switch (r) {
    case Boolean:
      h = u !== null;
      break;
    case Number:
      h = u === null ? null : Number(u);
      break;
    case Object:
    case Array:
      try {
        h = JSON.parse(u);
      } catch {
        h = null;
      }
  }
  return h;
} }, Ri = (u, r) => !er(u, r), oo = { attribute: !0, type: String, converter: We, reflect: !1, useDefault: !1, hasChanged: Ri };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Ot.litPropertyMetadata ?? (Ot.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Jt = class extends HTMLElement {
  static addInitializer(r) {
    this._$Ei(), (this.l ?? (this.l = [])).push(r);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(r, h = oo) {
    if (h.state && (h.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(r) && ((h = Object.create(h)).wrapped = !0), this.elementProperties.set(r, h), !h.noAccessor) {
      const f = Symbol(), _ = this.getPropertyDescriptor(r, f, h);
      _ !== void 0 && ir(this.prototype, r, _);
    }
  }
  static getPropertyDescriptor(r, h, f) {
    const { get: _, set: o } = nr(this.prototype, r) ?? { get() {
      return this[h];
    }, set(a) {
      this[h] = a;
    } };
    return { get: _, set(a) {
      const c = _ == null ? void 0 : _.call(this);
      o == null || o.call(this, a), this.requestUpdate(r, c, f);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(r) {
    return this.elementProperties.get(r) ?? oo;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ve("elementProperties"))) return;
    const r = rr(this);
    r.finalize(), r.l !== void 0 && (this.l = [...r.l]), this.elementProperties = new Map(r.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ve("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ve("properties"))) {
      const h = this.properties, f = [...or(h), ...sr(h)];
      for (const _ of f) this.createProperty(_, h[_]);
    }
    const r = this[Symbol.metadata];
    if (r !== null) {
      const h = litPropertyMetadata.get(r);
      if (h !== void 0) for (const [f, _] of h) this.elementProperties.set(f, _);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [h, f] of this.elementProperties) {
      const _ = this._$Eu(h, f);
      _ !== void 0 && this._$Eh.set(_, h);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(r) {
    const h = [];
    if (Array.isArray(r)) {
      const f = new Set(r.flat(1 / 0).reverse());
      for (const _ of f) h.unshift(io(_));
    } else r !== void 0 && h.push(io(r));
    return h;
  }
  static _$Eu(r, h) {
    const f = h.attribute;
    return f === !1 ? void 0 : typeof f == "string" ? f : typeof r == "string" ? r.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var r;
    this._$ES = new Promise((h) => this.enableUpdating = h), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (r = this.constructor.l) == null || r.forEach((h) => h(this));
  }
  addController(r) {
    var h;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(r), this.renderRoot !== void 0 && this.isConnected && ((h = r.hostConnected) == null || h.call(r));
  }
  removeController(r) {
    var h;
    (h = this._$EO) == null || h.delete(r);
  }
  _$E_() {
    const r = /* @__PURE__ */ new Map(), h = this.constructor.elementProperties;
    for (const f of h.keys()) this.hasOwnProperty(f) && (r.set(f, this[f]), delete this[f]);
    r.size > 0 && (this._$Ep = r);
  }
  createRenderRoot() {
    const r = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return tr(r, this.constructor.elementStyles), r;
  }
  connectedCallback() {
    var r;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (r = this._$EO) == null || r.forEach((h) => {
      var f;
      return (f = h.hostConnected) == null ? void 0 : f.call(h);
    });
  }
  enableUpdating(r) {
  }
  disconnectedCallback() {
    var r;
    (r = this._$EO) == null || r.forEach((h) => {
      var f;
      return (f = h.hostDisconnected) == null ? void 0 : f.call(h);
    });
  }
  attributeChangedCallback(r, h, f) {
    this._$AK(r, f);
  }
  _$ET(r, h) {
    var o;
    const f = this.constructor.elementProperties.get(r), _ = this.constructor._$Eu(r, f);
    if (_ !== void 0 && f.reflect === !0) {
      const a = (((o = f.converter) == null ? void 0 : o.toAttribute) !== void 0 ? f.converter : We).toAttribute(h, f.type);
      this._$Em = r, a == null ? this.removeAttribute(_) : this.setAttribute(_, a), this._$Em = null;
    }
  }
  _$AK(r, h) {
    var o, a;
    const f = this.constructor, _ = f._$Eh.get(r);
    if (_ !== void 0 && this._$Em !== _) {
      const c = f.getPropertyOptions(_), d = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((o = c.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? c.converter : We;
      this._$Em = _;
      const g = d.fromAttribute(h, c.type);
      this[_] = g ?? ((a = this._$Ej) == null ? void 0 : a.get(_)) ?? g, this._$Em = null;
    }
  }
  requestUpdate(r, h, f, _ = !1, o) {
    var a;
    if (r !== void 0) {
      const c = this.constructor;
      if (_ === !1 && (o = this[r]), f ?? (f = c.getPropertyOptions(r)), !((f.hasChanged ?? Ri)(o, h) || f.useDefault && f.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(r)) && !this.hasAttribute(c._$Eu(r, f)))) return;
      this.C(r, h, f);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(r, h, { useDefault: f, reflect: _, wrapped: o }, a) {
    f && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(r) && (this._$Ej.set(r, a ?? h ?? this[r]), o !== !0 || a !== void 0) || (this._$AL.has(r) || (this.hasUpdated || f || (h = void 0), this._$AL.set(r, h)), _ === !0 && this._$Em !== r && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(r));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (h) {
      Promise.reject(h);
    }
    const r = this.scheduleUpdate();
    return r != null && await r, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var f;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const _ = this.constructor.elementProperties;
      if (_.size > 0) for (const [o, a] of _) {
        const { wrapped: c } = a, d = this[o];
        c !== !0 || this._$AL.has(o) || d === void 0 || this.C(o, void 0, a, d);
      }
    }
    let r = !1;
    const h = this._$AL;
    try {
      r = this.shouldUpdate(h), r ? (this.willUpdate(h), (f = this._$EO) == null || f.forEach((_) => {
        var o;
        return (o = _.hostUpdate) == null ? void 0 : o.call(_);
      }), this.update(h)) : this._$EM();
    } catch (_) {
      throw r = !1, this._$EM(), _;
    }
    r && this._$AE(h);
  }
  willUpdate(r) {
  }
  _$AE(r) {
    var h;
    (h = this._$EO) == null || h.forEach((f) => {
      var _;
      return (_ = f.hostUpdated) == null ? void 0 : _.call(f);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(r)), this.updated(r);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(r) {
    return !0;
  }
  update(r) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((h) => this._$ET(h, this[h]))), this._$EM();
  }
  updated(r) {
  }
  firstUpdated(r) {
  }
};
Jt.elementStyles = [], Jt.shadowRootOptions = { mode: "open" }, Jt[ve("elementProperties")] = /* @__PURE__ */ new Map(), Jt[ve("finalized")] = /* @__PURE__ */ new Map(), Ei == null || Ei({ ReactiveElement: Jt }), (Ot.reactiveElementVersions ?? (Ot.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ye = globalThis, so = (u) => u, Ve = ye.trustedTypes, ro = Ve ? Ve.createPolicy("lit-html", { createHTML: (u) => u }) : void 0, wo = "$lit$", At = `lit$${Math.random().toFixed(9).slice(2)}$`, xo = "?" + At, hr = `<${xo}>`, Ht = document, we = () => Ht.createComment(""), xe = (u) => u === null || typeof u != "object" && typeof u != "function", Di = Array.isArray, lr = (u) => Di(u) || typeof (u == null ? void 0 : u[Symbol.iterator]) == "function", Ai = `[ 	
\f\r]`, ge = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ao = /-->/g, ho = />/g, Rt = RegExp(`>|${Ai}(?:([^\\s"'>=/]+)(${Ai}*=${Ai}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), lo = /'/g, uo = /"/g, Po = /^(?:script|style|textarea|title)$/i, ur = (u) => (r, ...h) => ({ _$litType$: u, strings: r, values: h }), cr = ur(1), Qt = Symbol.for("lit-noChange"), tt = Symbol.for("lit-nothing"), co = /* @__PURE__ */ new WeakMap(), Dt = Ht.createTreeWalker(Ht, 129);
function bo(u, r) {
  if (!Di(u) || !u.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ro !== void 0 ? ro.createHTML(r) : r;
}
const dr = (u, r) => {
  const h = u.length - 1, f = [];
  let _, o = r === 2 ? "<svg>" : r === 3 ? "<math>" : "", a = ge;
  for (let c = 0; c < h; c++) {
    const d = u[c];
    let g, w, m = -1, P = 0;
    for (; P < d.length && (a.lastIndex = P, w = a.exec(d), w !== null); ) P = a.lastIndex, a === ge ? w[1] === "!--" ? a = ao : w[1] !== void 0 ? a = ho : w[2] !== void 0 ? (Po.test(w[2]) && (_ = RegExp("</" + w[2], "g")), a = Rt) : w[3] !== void 0 && (a = Rt) : a === Rt ? w[0] === ">" ? (a = _ ?? ge, m = -1) : w[1] === void 0 ? m = -2 : (m = a.lastIndex - w[2].length, g = w[1], a = w[3] === void 0 ? Rt : w[3] === '"' ? uo : lo) : a === uo || a === lo ? a = Rt : a === ao || a === ho ? a = ge : (a = Rt, _ = void 0);
    const x = a === Rt && u[c + 1].startsWith("/>") ? " " : "";
    o += a === ge ? d + hr : m >= 0 ? (f.push(g), d.slice(0, m) + wo + d.slice(m) + At + x) : d + At + (m === -2 ? c : x);
  }
  return [bo(u, o + (u[h] || "<?>") + (r === 2 ? "</svg>" : r === 3 ? "</math>" : "")), f];
};
class Pe {
  constructor({ strings: r, _$litType$: h }, f) {
    let _;
    this.parts = [];
    let o = 0, a = 0;
    const c = r.length - 1, d = this.parts, [g, w] = dr(r, h);
    if (this.el = Pe.createElement(g, f), Dt.currentNode = this.el.content, h === 2 || h === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (_ = Dt.nextNode()) !== null && d.length < c; ) {
      if (_.nodeType === 1) {
        if (_.hasAttributes()) for (const m of _.getAttributeNames()) if (m.endsWith(wo)) {
          const P = w[a++], x = _.getAttribute(m).split(At), T = /([.?@])?(.*)/.exec(P);
          d.push({ type: 1, index: o, name: T[2], strings: x, ctor: T[1] === "." ? _r : T[1] === "?" ? pr : T[1] === "@" ? mr : je }), _.removeAttribute(m);
        } else m.startsWith(At) && (d.push({ type: 6, index: o }), _.removeAttribute(m));
        if (Po.test(_.tagName)) {
          const m = _.textContent.split(At), P = m.length - 1;
          if (P > 0) {
            _.textContent = Ve ? Ve.emptyScript : "";
            for (let x = 0; x < P; x++) _.append(m[x], we()), Dt.nextNode(), d.push({ type: 2, index: ++o });
            _.append(m[P], we());
          }
        }
      } else if (_.nodeType === 8) if (_.data === xo) d.push({ type: 2, index: o });
      else {
        let m = -1;
        for (; (m = _.data.indexOf(At, m + 1)) !== -1; ) d.push({ type: 7, index: o }), m += At.length - 1;
      }
      o++;
    }
  }
  static createElement(r, h) {
    const f = Ht.createElement("template");
    return f.innerHTML = r, f;
  }
}
function te(u, r, h = u, f) {
  var a, c;
  if (r === Qt) return r;
  let _ = f !== void 0 ? (a = h._$Co) == null ? void 0 : a[f] : h._$Cl;
  const o = xe(r) ? void 0 : r._$litDirective$;
  return (_ == null ? void 0 : _.constructor) !== o && ((c = _ == null ? void 0 : _._$AO) == null || c.call(_, !1), o === void 0 ? _ = void 0 : (_ = new o(u), _._$AT(u, h, f)), f !== void 0 ? (h._$Co ?? (h._$Co = []))[f] = _ : h._$Cl = _), _ !== void 0 && (r = te(u, _._$AS(u, r.values), _, f)), r;
}
class fr {
  constructor(r, h) {
    this._$AV = [], this._$AN = void 0, this._$AD = r, this._$AM = h;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(r) {
    const { el: { content: h }, parts: f } = this._$AD, _ = ((r == null ? void 0 : r.creationScope) ?? Ht).importNode(h, !0);
    Dt.currentNode = _;
    let o = Dt.nextNode(), a = 0, c = 0, d = f[0];
    for (; d !== void 0; ) {
      if (a === d.index) {
        let g;
        d.type === 2 ? g = new be(o, o.nextSibling, this, r) : d.type === 1 ? g = new d.ctor(o, d.name, d.strings, this, r) : d.type === 6 && (g = new gr(o, this, r)), this._$AV.push(g), d = f[++c];
      }
      a !== (d == null ? void 0 : d.index) && (o = Dt.nextNode(), a++);
    }
    return Dt.currentNode = Ht, _;
  }
  p(r) {
    let h = 0;
    for (const f of this._$AV) f !== void 0 && (f.strings !== void 0 ? (f._$AI(r, f, h), h += f.strings.length - 2) : f._$AI(r[h])), h++;
  }
}
class be {
  get _$AU() {
    var r;
    return ((r = this._$AM) == null ? void 0 : r._$AU) ?? this._$Cv;
  }
  constructor(r, h, f, _) {
    this.type = 2, this._$AH = tt, this._$AN = void 0, this._$AA = r, this._$AB = h, this._$AM = f, this.options = _, this._$Cv = (_ == null ? void 0 : _.isConnected) ?? !0;
  }
  get parentNode() {
    let r = this._$AA.parentNode;
    const h = this._$AM;
    return h !== void 0 && (r == null ? void 0 : r.nodeType) === 11 && (r = h.parentNode), r;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(r, h = this) {
    r = te(this, r, h), xe(r) ? r === tt || r == null || r === "" ? (this._$AH !== tt && this._$AR(), this._$AH = tt) : r !== this._$AH && r !== Qt && this._(r) : r._$litType$ !== void 0 ? this.$(r) : r.nodeType !== void 0 ? this.T(r) : lr(r) ? this.k(r) : this._(r);
  }
  O(r) {
    return this._$AA.parentNode.insertBefore(r, this._$AB);
  }
  T(r) {
    this._$AH !== r && (this._$AR(), this._$AH = this.O(r));
  }
  _(r) {
    this._$AH !== tt && xe(this._$AH) ? this._$AA.nextSibling.data = r : this.T(Ht.createTextNode(r)), this._$AH = r;
  }
  $(r) {
    var o;
    const { values: h, _$litType$: f } = r, _ = typeof f == "number" ? this._$AC(r) : (f.el === void 0 && (f.el = Pe.createElement(bo(f.h, f.h[0]), this.options)), f);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === _) this._$AH.p(h);
    else {
      const a = new fr(_, this), c = a.u(this.options);
      a.p(h), this.T(c), this._$AH = a;
    }
  }
  _$AC(r) {
    let h = co.get(r.strings);
    return h === void 0 && co.set(r.strings, h = new Pe(r)), h;
  }
  k(r) {
    Di(this._$AH) || (this._$AH = [], this._$AR());
    const h = this._$AH;
    let f, _ = 0;
    for (const o of r) _ === h.length ? h.push(f = new be(this.O(we()), this.O(we()), this, this.options)) : f = h[_], f._$AI(o), _++;
    _ < h.length && (this._$AR(f && f._$AB.nextSibling, _), h.length = _);
  }
  _$AR(r = this._$AA.nextSibling, h) {
    var f;
    for ((f = this._$AP) == null ? void 0 : f.call(this, !1, !0, h); r !== this._$AB; ) {
      const _ = so(r).nextSibling;
      so(r).remove(), r = _;
    }
  }
  setConnected(r) {
    var h;
    this._$AM === void 0 && (this._$Cv = r, (h = this._$AP) == null || h.call(this, r));
  }
}
class je {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(r, h, f, _, o) {
    this.type = 1, this._$AH = tt, this._$AN = void 0, this.element = r, this.name = h, this._$AM = _, this.options = o, f.length > 2 || f[0] !== "" || f[1] !== "" ? (this._$AH = Array(f.length - 1).fill(new String()), this.strings = f) : this._$AH = tt;
  }
  _$AI(r, h = this, f, _) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) r = te(this, r, h, 0), a = !xe(r) || r !== this._$AH && r !== Qt, a && (this._$AH = r);
    else {
      const c = r;
      let d, g;
      for (r = o[0], d = 0; d < o.length - 1; d++) g = te(this, c[f + d], h, d), g === Qt && (g = this._$AH[d]), a || (a = !xe(g) || g !== this._$AH[d]), g === tt ? r = tt : r !== tt && (r += (g ?? "") + o[d + 1]), this._$AH[d] = g;
    }
    a && !_ && this.j(r);
  }
  j(r) {
    r === tt ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, r ?? "");
  }
}
class _r extends je {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(r) {
    this.element[this.name] = r === tt ? void 0 : r;
  }
}
let pr = class extends je {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(r) {
    this.element.toggleAttribute(this.name, !!r && r !== tt);
  }
};
class mr extends je {
  constructor(r, h, f, _, o) {
    super(r, h, f, _, o), this.type = 5;
  }
  _$AI(r, h = this) {
    if ((r = te(this, r, h, 0) ?? tt) === Qt) return;
    const f = this._$AH, _ = r === tt && f !== tt || r.capture !== f.capture || r.once !== f.once || r.passive !== f.passive, o = r !== tt && (f === tt || _);
    _ && this.element.removeEventListener(this.name, this, f), o && this.element.addEventListener(this.name, this, r), this._$AH = r;
  }
  handleEvent(r) {
    var h;
    typeof this._$AH == "function" ? this._$AH.call(((h = this.options) == null ? void 0 : h.host) ?? this.element, r) : this._$AH.handleEvent(r);
  }
}
class gr {
  constructor(r, h, f) {
    this.element = r, this.type = 6, this._$AN = void 0, this._$AM = h, this.options = f;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(r) {
    te(this, r);
  }
}
const Oi = ye.litHtmlPolyfillSupport;
Oi == null || Oi(Pe, be), (ye.litHtmlVersions ?? (ye.litHtmlVersions = [])).push("3.3.2");
const vr = (u, r, h) => {
  const f = (h == null ? void 0 : h.renderBefore) ?? r;
  let _ = f._$litPart$;
  if (_ === void 0) {
    const o = (h == null ? void 0 : h.renderBefore) ?? null;
    f._$litPart$ = _ = new be(r.insertBefore(we(), o), o, void 0, h ?? {});
  }
  return _._$AI(u), _;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = globalThis;
class Le extends Jt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var h;
    const r = super.createRenderRoot();
    return (h = this.renderOptions).renderBefore ?? (h.renderBefore = r.firstChild), r;
  }
  update(r) {
    const h = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(r), this._$Do = vr(h, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var r;
    super.connectedCallback(), (r = this._$Do) == null || r.setConnected(!0);
  }
  disconnectedCallback() {
    var r;
    super.disconnectedCallback(), (r = this._$Do) == null || r.setConnected(!1);
  }
  render() {
    return Qt;
  }
}
var yo;
Le._$litElement$ = !0, Le.finalized = !0, (yo = Ut.litElementHydrateSupport) == null || yo.call(Ut, { LitElement: Le });
const zi = Ut.litElementPolyfillSupport;
zi == null || zi({ LitElement: Le });
(Ut.litElementVersions ?? (Ut.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yr = (u) => (r, h) => {
  h !== void 0 ? h.addInitializer(() => {
    customElements.define(u, r);
  }) : customElements.define(u, r);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lr = { attribute: !0, type: String, converter: We, reflect: !1, hasChanged: Ri }, wr = (u = Lr, r, h) => {
  const { kind: f, metadata: _ } = h;
  let o = globalThis.litPropertyMetadata.get(_);
  if (o === void 0 && globalThis.litPropertyMetadata.set(_, o = /* @__PURE__ */ new Map()), f === "setter" && ((u = Object.create(u)).wrapped = !0), o.set(h.name, u), f === "accessor") {
    const { name: a } = h;
    return { set(c) {
      const d = r.get.call(this);
      r.set.call(this, c), this.requestUpdate(a, d, u, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, u, c), c;
    } };
  }
  if (f === "setter") {
    const { name: a } = h;
    return function(c) {
      const d = this[a];
      r.call(this, c), this.requestUpdate(a, d, u, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + f);
};
function et(u) {
  return (r, h) => typeof h == "object" ? wr(u, r, h) : ((f, _, o) => {
    const a = _.hasOwnProperty(o);
    return _.constructor.createProperty(o, f), a ? Object.getOwnPropertyDescriptor(_, o) : void 0;
  })(u, r, h);
}
var Co = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function xr(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var Ii = { exports: {} };
/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
(function(u, r) {
  (function(h, f) {
    f(r);
  })(Co, function(h) {
    var f = "1.9.4";
    function _(t) {
      var e, i, n, s;
      for (i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (e in s)
          t[e] = s[e];
      }
      return t;
    }
    var o = Object.create || /* @__PURE__ */ function() {
      function t() {
      }
      return function(e) {
        return t.prototype = e, new t();
      };
    }();
    function a(t, e) {
      var i = Array.prototype.slice;
      if (t.bind)
        return t.bind.apply(t, i.call(arguments, 1));
      var n = i.call(arguments, 2);
      return function() {
        return t.apply(e, n.length ? n.concat(i.call(arguments)) : arguments);
      };
    }
    var c = 0;
    function d(t) {
      return "_leaflet_id" in t || (t._leaflet_id = ++c), t._leaflet_id;
    }
    function g(t, e, i) {
      var n, s, l, p;
      return p = function() {
        n = !1, s && (l.apply(i, s), s = !1);
      }, l = function() {
        n ? s = arguments : (t.apply(i, arguments), setTimeout(p, e), n = !0);
      }, l;
    }
    function w(t, e, i) {
      var n = e[1], s = e[0], l = n - s;
      return t === n && i ? t : ((t - s) % l + l) % l + s;
    }
    function m() {
      return !1;
    }
    function P(t, e) {
      if (e === !1)
        return t;
      var i = Math.pow(10, e === void 0 ? 6 : e);
      return Math.round(t * i) / i;
    }
    function x(t) {
      return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
    }
    function T(t) {
      return x(t).split(/\s+/);
    }
    function C(t, e) {
      Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? o(t.options) : {});
      for (var i in e)
        t.options[i] = e[i];
      return t.options;
    }
    function D(t, e, i) {
      var n = [];
      for (var s in t)
        n.push(encodeURIComponent(i ? s.toUpperCase() : s) + "=" + encodeURIComponent(t[s]));
      return (!e || e.indexOf("?") === -1 ? "?" : "&") + n.join("&");
    }
    var k = /\{ *([\w_ -]+) *\}/g;
    function H(t, e) {
      return t.replace(k, function(i, n) {
        var s = e[n];
        if (s === void 0)
          throw new Error("No value provided for variable " + i);
        return typeof s == "function" && (s = s(e)), s;
      });
    }
    var F = Array.isArray || function(t) {
      return Object.prototype.toString.call(t) === "[object Array]";
    };
    function _t(t, e) {
      for (var i = 0; i < t.length; i++)
        if (t[i] === e)
          return i;
      return -1;
    }
    var nt = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    function ee(t) {
      return window["webkit" + t] || window["moz" + t] || window["ms" + t];
    }
    var Ui = 0;
    function Hi(t) {
      var e = +/* @__PURE__ */ new Date(), i = Math.max(0, 16 - (e - Ui));
      return Ui = e + i, window.setTimeout(t, i);
    }
    var Ke = window.requestAnimationFrame || ee("RequestAnimationFrame") || Hi, Gi = window.cancelAnimationFrame || ee("CancelAnimationFrame") || ee("CancelRequestAnimationFrame") || function(t) {
      window.clearTimeout(t);
    };
    function st(t, e, i) {
      if (i && Ke === Hi)
        t.call(e);
      else
        return Ke.call(window, a(t, e));
    }
    function ut(t) {
      t && Gi.call(window, t);
    }
    var To = {
      __proto__: null,
      extend: _,
      create: o,
      bind: a,
      get lastId() {
        return c;
      },
      stamp: d,
      throttle: g,
      wrapNum: w,
      falseFn: m,
      formatNum: P,
      trim: x,
      splitWords: T,
      setOptions: C,
      getParamString: D,
      template: H,
      isArray: F,
      indexOf: _t,
      emptyImageUrl: nt,
      requestFn: Ke,
      cancelFn: Gi,
      requestAnimFrame: st,
      cancelAnimFrame: ut
    };
    function wt() {
    }
    wt.extend = function(t) {
      var e = function() {
        C(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
      }, i = e.__super__ = this.prototype, n = o(i);
      n.constructor = e, e.prototype = n;
      for (var s in this)
        Object.prototype.hasOwnProperty.call(this, s) && s !== "prototype" && s !== "__super__" && (e[s] = this[s]);
      return t.statics && _(e, t.statics), t.includes && (So(t.includes), _.apply(null, [n].concat(t.includes))), _(n, t), delete n.statics, delete n.includes, n.options && (n.options = i.options ? o(i.options) : {}, _(n.options, t.options)), n._initHooks = [], n.callInitHooks = function() {
        if (!this._initHooksCalled) {
          i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
          for (var l = 0, p = n._initHooks.length; l < p; l++)
            n._initHooks[l].call(this);
        }
      }, e;
    }, wt.include = function(t) {
      var e = this.prototype.options;
      return _(this.prototype, t), t.options && (this.prototype.options = e, this.mergeOptions(t.options)), this;
    }, wt.mergeOptions = function(t) {
      return _(this.prototype.options, t), this;
    }, wt.addInitHook = function(t) {
      var e = Array.prototype.slice.call(arguments, 1), i = typeof t == "function" ? t : function() {
        this[t].apply(this, e);
      };
      return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i), this;
    };
    function So(t) {
      if (!(typeof L > "u" || !L || !L.Mixin)) {
        t = F(t) ? t : [t];
        for (var e = 0; e < t.length; e++)
          t[e] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
      }
    }
    var lt = {
      /* @method on(type: String, fn: Function, context?: Object): this
       * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
       *
       * @alternative
       * @method on(eventMap: Object): this
       * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
       */
      on: function(t, e, i) {
        if (typeof t == "object")
          for (var n in t)
            this._on(n, t[n], e);
        else {
          t = T(t);
          for (var s = 0, l = t.length; s < l; s++)
            this._on(t[s], e, i);
        }
        return this;
      },
      /* @method off(type: String, fn?: Function, context?: Object): this
       * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
       *
       * @alternative
       * @method off(eventMap: Object): this
       * Removes a set of type/listener pairs.
       *
       * @alternative
       * @method off: this
       * Removes all listeners to all events on the object. This includes implicitly attached events.
       */
      off: function(t, e, i) {
        if (!arguments.length)
          delete this._events;
        else if (typeof t == "object")
          for (var n in t)
            this._off(n, t[n], e);
        else {
          t = T(t);
          for (var s = arguments.length === 1, l = 0, p = t.length; l < p; l++)
            s ? this._off(t[l]) : this._off(t[l], e, i);
        }
        return this;
      },
      // attach listener (without syntactic sugar now)
      _on: function(t, e, i, n) {
        if (typeof e != "function") {
          console.warn("wrong listener type: " + typeof e);
          return;
        }
        if (this._listens(t, e, i) === !1) {
          i === this && (i = void 0);
          var s = { fn: e, ctx: i };
          n && (s.once = !0), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(s);
        }
      },
      _off: function(t, e, i) {
        var n, s, l;
        if (this._events && (n = this._events[t], !!n)) {
          if (arguments.length === 1) {
            if (this._firingCount)
              for (s = 0, l = n.length; s < l; s++)
                n[s].fn = m;
            delete this._events[t];
            return;
          }
          if (typeof e != "function") {
            console.warn("wrong listener type: " + typeof e);
            return;
          }
          var p = this._listens(t, e, i);
          if (p !== !1) {
            var v = n[p];
            this._firingCount && (v.fn = m, this._events[t] = n = n.slice()), n.splice(p, 1);
          }
        }
      },
      // @method fire(type: String, data?: Object, propagate?: Boolean): this
      // Fires an event of the specified type. You can optionally provide a data
      // object — the first argument of the listener function will contain its
      // properties. The event can optionally be propagated to event parents.
      fire: function(t, e, i) {
        if (!this.listens(t, i))
          return this;
        var n = _({}, e, {
          type: t,
          target: this,
          sourceTarget: e && e.sourceTarget || this
        });
        if (this._events) {
          var s = this._events[t];
          if (s) {
            this._firingCount = this._firingCount + 1 || 1;
            for (var l = 0, p = s.length; l < p; l++) {
              var v = s[l], y = v.fn;
              v.once && this.off(t, y, v.ctx), y.call(v.ctx || this, n);
            }
            this._firingCount--;
          }
        }
        return i && this._propagateEvent(n), this;
      },
      // @method listens(type: String, propagate?: Boolean): Boolean
      // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
      // Returns `true` if a particular event type has any listeners attached to it.
      // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
      listens: function(t, e, i, n) {
        typeof t != "string" && console.warn('"string" type argument expected');
        var s = e;
        typeof e != "function" && (n = !!e, s = void 0, i = void 0);
        var l = this._events && this._events[t];
        if (l && l.length && this._listens(t, s, i) !== !1)
          return !0;
        if (n) {
          for (var p in this._eventParents)
            if (this._eventParents[p].listens(t, e, i, n))
              return !0;
        }
        return !1;
      },
      // returns the index (number) or false
      _listens: function(t, e, i) {
        if (!this._events)
          return !1;
        var n = this._events[t] || [];
        if (!e)
          return !!n.length;
        i === this && (i = void 0);
        for (var s = 0, l = n.length; s < l; s++)
          if (n[s].fn === e && n[s].ctx === i)
            return s;
        return !1;
      },
      // @method once(…): this
      // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
      once: function(t, e, i) {
        if (typeof t == "object")
          for (var n in t)
            this._on(n, t[n], e, !0);
        else {
          t = T(t);
          for (var s = 0, l = t.length; s < l; s++)
            this._on(t[s], e, i, !0);
        }
        return this;
      },
      // @method addEventParent(obj: Evented): this
      // Adds an event parent - an `Evented` that will receive propagated events
      addEventParent: function(t) {
        return this._eventParents = this._eventParents || {}, this._eventParents[d(t)] = t, this;
      },
      // @method removeEventParent(obj: Evented): this
      // Removes an event parent, so it will stop receiving propagated events
      removeEventParent: function(t) {
        return this._eventParents && delete this._eventParents[d(t)], this;
      },
      _propagateEvent: function(t) {
        for (var e in this._eventParents)
          this._eventParents[e].fire(t.type, _({
            layer: t.target,
            propagatedFrom: t.target
          }, t), !0);
      }
    };
    lt.addEventListener = lt.on, lt.removeEventListener = lt.clearAllEventListeners = lt.off, lt.addOneTimeEventListener = lt.once, lt.fireEvent = lt.fire, lt.hasEventListeners = lt.listens;
    var ie = wt.extend(lt);
    function O(t, e, i) {
      this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e;
    }
    var Fi = Math.trunc || function(t) {
      return t > 0 ? Math.floor(t) : Math.ceil(t);
    };
    O.prototype = {
      // @method clone(): Point
      // Returns a copy of the current point.
      clone: function() {
        return new O(this.x, this.y);
      },
      // @method add(otherPoint: Point): Point
      // Returns the result of addition of the current and the given points.
      add: function(t) {
        return this.clone()._add(A(t));
      },
      _add: function(t) {
        return this.x += t.x, this.y += t.y, this;
      },
      // @method subtract(otherPoint: Point): Point
      // Returns the result of subtraction of the given point from the current.
      subtract: function(t) {
        return this.clone()._subtract(A(t));
      },
      _subtract: function(t) {
        return this.x -= t.x, this.y -= t.y, this;
      },
      // @method divideBy(num: Number): Point
      // Returns the result of division of the current point by the given number.
      divideBy: function(t) {
        return this.clone()._divideBy(t);
      },
      _divideBy: function(t) {
        return this.x /= t, this.y /= t, this;
      },
      // @method multiplyBy(num: Number): Point
      // Returns the result of multiplication of the current point by the given number.
      multiplyBy: function(t) {
        return this.clone()._multiplyBy(t);
      },
      _multiplyBy: function(t) {
        return this.x *= t, this.y *= t, this;
      },
      // @method scaleBy(scale: Point): Point
      // Multiply each coordinate of the current point by each coordinate of
      // `scale`. In linear algebra terms, multiply the point by the
      // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
      // defined by `scale`.
      scaleBy: function(t) {
        return new O(this.x * t.x, this.y * t.y);
      },
      // @method unscaleBy(scale: Point): Point
      // Inverse of `scaleBy`. Divide each coordinate of the current point by
      // each coordinate of `scale`.
      unscaleBy: function(t) {
        return new O(this.x / t.x, this.y / t.y);
      },
      // @method round(): Point
      // Returns a copy of the current point with rounded coordinates.
      round: function() {
        return this.clone()._round();
      },
      _round: function() {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
      },
      // @method floor(): Point
      // Returns a copy of the current point with floored coordinates (rounded down).
      floor: function() {
        return this.clone()._floor();
      },
      _floor: function() {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
      },
      // @method ceil(): Point
      // Returns a copy of the current point with ceiled coordinates (rounded up).
      ceil: function() {
        return this.clone()._ceil();
      },
      _ceil: function() {
        return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
      },
      // @method trunc(): Point
      // Returns a copy of the current point with truncated coordinates (rounded towards zero).
      trunc: function() {
        return this.clone()._trunc();
      },
      _trunc: function() {
        return this.x = Fi(this.x), this.y = Fi(this.y), this;
      },
      // @method distanceTo(otherPoint: Point): Number
      // Returns the cartesian distance between the current and the given points.
      distanceTo: function(t) {
        t = A(t);
        var e = t.x - this.x, i = t.y - this.y;
        return Math.sqrt(e * e + i * i);
      },
      // @method equals(otherPoint: Point): Boolean
      // Returns `true` if the given point has the same coordinates.
      equals: function(t) {
        return t = A(t), t.x === this.x && t.y === this.y;
      },
      // @method contains(otherPoint: Point): Boolean
      // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
      contains: function(t) {
        return t = A(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
      },
      // @method toString(): String
      // Returns a string representation of the point for debugging purposes.
      toString: function() {
        return "Point(" + P(this.x) + ", " + P(this.y) + ")";
      }
    };
    function A(t, e, i) {
      return t instanceof O ? t : F(t) ? new O(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new O(t.x, t.y) : new O(t, e, i);
    }
    function $(t, e) {
      if (t)
        for (var i = e ? [t, e] : t, n = 0, s = i.length; n < s; n++)
          this.extend(i[n]);
    }
    $.prototype = {
      // @method extend(point: Point): this
      // Extends the bounds to contain the given point.
      // @alternative
      // @method extend(otherBounds: Bounds): this
      // Extend the bounds to contain the given bounds
      extend: function(t) {
        var e, i;
        if (!t)
          return this;
        if (t instanceof O || typeof t[0] == "number" || "x" in t)
          e = i = A(t);
        else if (t = rt(t), e = t.min, i = t.max, !e || !i)
          return this;
        return !this.min && !this.max ? (this.min = e.clone(), this.max = i.clone()) : (this.min.x = Math.min(e.x, this.min.x), this.max.x = Math.max(i.x, this.max.x), this.min.y = Math.min(e.y, this.min.y), this.max.y = Math.max(i.y, this.max.y)), this;
      },
      // @method getCenter(round?: Boolean): Point
      // Returns the center point of the bounds.
      getCenter: function(t) {
        return A(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          t
        );
      },
      // @method getBottomLeft(): Point
      // Returns the bottom-left point of the bounds.
      getBottomLeft: function() {
        return A(this.min.x, this.max.y);
      },
      // @method getTopRight(): Point
      // Returns the top-right point of the bounds.
      getTopRight: function() {
        return A(this.max.x, this.min.y);
      },
      // @method getTopLeft(): Point
      // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
      getTopLeft: function() {
        return this.min;
      },
      // @method getBottomRight(): Point
      // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
      getBottomRight: function() {
        return this.max;
      },
      // @method getSize(): Point
      // Returns the size of the given bounds
      getSize: function() {
        return this.max.subtract(this.min);
      },
      // @method contains(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle contains the given one.
      // @alternative
      // @method contains(point: Point): Boolean
      // Returns `true` if the rectangle contains the given point.
      contains: function(t) {
        var e, i;
        return typeof t[0] == "number" || t instanceof O ? t = A(t) : t = rt(t), t instanceof $ ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y;
      },
      // @method intersects(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds
      // intersect if they have at least one point in common.
      intersects: function(t) {
        t = rt(t);
        var e = this.min, i = this.max, n = t.min, s = t.max, l = s.x >= e.x && n.x <= i.x, p = s.y >= e.y && n.y <= i.y;
        return l && p;
      },
      // @method overlaps(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds
      // overlap if their intersection is an area.
      overlaps: function(t) {
        t = rt(t);
        var e = this.min, i = this.max, n = t.min, s = t.max, l = s.x > e.x && n.x < i.x, p = s.y > e.y && n.y < i.y;
        return l && p;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this.min && this.max);
      },
      // @method pad(bufferRatio: Number): Bounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(t) {
        var e = this.min, i = this.max, n = Math.abs(e.x - i.x) * t, s = Math.abs(e.y - i.y) * t;
        return rt(
          A(e.x - n, e.y - s),
          A(i.x + n, i.y + s)
        );
      },
      // @method equals(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle is equivalent to the given bounds.
      equals: function(t) {
        return t ? (t = rt(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight())) : !1;
      }
    };
    function rt(t, e) {
      return !t || t instanceof $ ? t : new $(t, e);
    }
    function at(t, e) {
      if (t)
        for (var i = e ? [t, e] : t, n = 0, s = i.length; n < s; n++)
          this.extend(i[n]);
    }
    at.prototype = {
      // @method extend(latlng: LatLng): this
      // Extend the bounds to contain the given point
      // @alternative
      // @method extend(otherBounds: LatLngBounds): this
      // Extend the bounds to contain the given bounds
      extend: function(t) {
        var e = this._southWest, i = this._northEast, n, s;
        if (t instanceof U)
          n = t, s = t;
        else if (t instanceof at) {
          if (n = t._southWest, s = t._northEast, !n || !s)
            return this;
        } else
          return t ? this.extend(B(t) || q(t)) : this;
        return !e && !i ? (this._southWest = new U(n.lat, n.lng), this._northEast = new U(s.lat, s.lng)) : (e.lat = Math.min(n.lat, e.lat), e.lng = Math.min(n.lng, e.lng), i.lat = Math.max(s.lat, i.lat), i.lng = Math.max(s.lng, i.lng)), this;
      },
      // @method pad(bufferRatio: Number): LatLngBounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(t) {
        var e = this._southWest, i = this._northEast, n = Math.abs(e.lat - i.lat) * t, s = Math.abs(e.lng - i.lng) * t;
        return new at(
          new U(e.lat - n, e.lng - s),
          new U(i.lat + n, i.lng + s)
        );
      },
      // @method getCenter(): LatLng
      // Returns the center point of the bounds.
      getCenter: function() {
        return new U(
          (this._southWest.lat + this._northEast.lat) / 2,
          (this._southWest.lng + this._northEast.lng) / 2
        );
      },
      // @method getSouthWest(): LatLng
      // Returns the south-west point of the bounds.
      getSouthWest: function() {
        return this._southWest;
      },
      // @method getNorthEast(): LatLng
      // Returns the north-east point of the bounds.
      getNorthEast: function() {
        return this._northEast;
      },
      // @method getNorthWest(): LatLng
      // Returns the north-west point of the bounds.
      getNorthWest: function() {
        return new U(this.getNorth(), this.getWest());
      },
      // @method getSouthEast(): LatLng
      // Returns the south-east point of the bounds.
      getSouthEast: function() {
        return new U(this.getSouth(), this.getEast());
      },
      // @method getWest(): Number
      // Returns the west longitude of the bounds
      getWest: function() {
        return this._southWest.lng;
      },
      // @method getSouth(): Number
      // Returns the south latitude of the bounds
      getSouth: function() {
        return this._southWest.lat;
      },
      // @method getEast(): Number
      // Returns the east longitude of the bounds
      getEast: function() {
        return this._northEast.lng;
      },
      // @method getNorth(): Number
      // Returns the north latitude of the bounds
      getNorth: function() {
        return this._northEast.lat;
      },
      // @method contains(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle contains the given one.
      // @alternative
      // @method contains (latlng: LatLng): Boolean
      // Returns `true` if the rectangle contains the given point.
      contains: function(t) {
        typeof t[0] == "number" || t instanceof U || "lat" in t ? t = B(t) : t = q(t);
        var e = this._southWest, i = this._northEast, n, s;
        return t instanceof at ? (n = t.getSouthWest(), s = t.getNorthEast()) : n = s = t, n.lat >= e.lat && s.lat <= i.lat && n.lng >= e.lng && s.lng <= i.lng;
      },
      // @method intersects(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
      intersects: function(t) {
        t = q(t);
        var e = this._southWest, i = this._northEast, n = t.getSouthWest(), s = t.getNorthEast(), l = s.lat >= e.lat && n.lat <= i.lat, p = s.lng >= e.lng && n.lng <= i.lng;
        return l && p;
      },
      // @method overlaps(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
      overlaps: function(t) {
        t = q(t);
        var e = this._southWest, i = this._northEast, n = t.getSouthWest(), s = t.getNorthEast(), l = s.lat > e.lat && n.lat < i.lat, p = s.lng > e.lng && n.lng < i.lng;
        return l && p;
      },
      // @method toBBoxString(): String
      // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
      toBBoxString: function() {
        return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
      },
      // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
      // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(t, e) {
        return t ? (t = q(t), this._southWest.equals(t.getSouthWest(), e) && this._northEast.equals(t.getNorthEast(), e)) : !1;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this._southWest && this._northEast);
      }
    };
    function q(t, e) {
      return t instanceof at ? t : new at(t, e);
    }
    function U(t, e, i) {
      if (isNaN(t) || isNaN(e))
        throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
      this.lat = +t, this.lng = +e, i !== void 0 && (this.alt = +i);
    }
    U.prototype = {
      // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
      // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(t, e) {
        if (!t)
          return !1;
        t = B(t);
        var i = Math.max(
          Math.abs(this.lat - t.lat),
          Math.abs(this.lng - t.lng)
        );
        return i <= (e === void 0 ? 1e-9 : e);
      },
      // @method toString(): String
      // Returns a string representation of the point (for debugging purposes).
      toString: function(t) {
        return "LatLng(" + P(this.lat, t) + ", " + P(this.lng, t) + ")";
      },
      // @method distanceTo(otherLatLng: LatLng): Number
      // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
      distanceTo: function(t) {
        return St.distance(this, B(t));
      },
      // @method wrap(): LatLng
      // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
      wrap: function() {
        return St.wrapLatLng(this);
      },
      // @method toBounds(sizeInMeters: Number): LatLngBounds
      // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
      toBounds: function(t) {
        var e = 180 * t / 40075017, i = e / Math.cos(Math.PI / 180 * this.lat);
        return q(
          [this.lat - e, this.lng - i],
          [this.lat + e, this.lng + i]
        );
      },
      clone: function() {
        return new U(this.lat, this.lng, this.alt);
      }
    };
    function B(t, e, i) {
      return t instanceof U ? t : F(t) && typeof t[0] != "object" ? t.length === 3 ? new U(t[0], t[1], t[2]) : t.length === 2 ? new U(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new U(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : e === void 0 ? null : new U(t, e, i);
    }
    var xt = {
      // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
      // Projects geographical coordinates into pixel coordinates for a given zoom.
      latLngToPoint: function(t, e) {
        var i = this.projection.project(t), n = this.scale(e);
        return this.transformation._transform(i, n);
      },
      // @method pointToLatLng(point: Point, zoom: Number): LatLng
      // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
      // zoom into geographical coordinates.
      pointToLatLng: function(t, e) {
        var i = this.scale(e), n = this.transformation.untransform(t, i);
        return this.projection.unproject(n);
      },
      // @method project(latlng: LatLng): Point
      // Projects geographical coordinates into coordinates in units accepted for
      // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
      project: function(t) {
        return this.projection.project(t);
      },
      // @method unproject(point: Point): LatLng
      // Given a projected coordinate returns the corresponding LatLng.
      // The inverse of `project`.
      unproject: function(t) {
        return this.projection.unproject(t);
      },
      // @method scale(zoom: Number): Number
      // Returns the scale used when transforming projected coordinates into
      // pixel coordinates for a particular zoom. For example, it returns
      // `256 * 2^zoom` for Mercator-based CRS.
      scale: function(t) {
        return 256 * Math.pow(2, t);
      },
      // @method zoom(scale: Number): Number
      // Inverse of `scale()`, returns the zoom level corresponding to a scale
      // factor of `scale`.
      zoom: function(t) {
        return Math.log(t / 256) / Math.LN2;
      },
      // @method getProjectedBounds(zoom: Number): Bounds
      // Returns the projection's bounds scaled and transformed for the provided `zoom`.
      getProjectedBounds: function(t) {
        if (this.infinite)
          return null;
        var e = this.projection.bounds, i = this.scale(t), n = this.transformation.transform(e.min, i), s = this.transformation.transform(e.max, i);
        return new $(n, s);
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates.
      // @property code: String
      // Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
      //
      // @property wrapLng: Number[]
      // An array of two numbers defining whether the longitude (horizontal) coordinate
      // axis wraps around a given range and how. Defaults to `[-180, 180]` in most
      // geographical CRSs. If `undefined`, the longitude axis does not wrap around.
      //
      // @property wrapLat: Number[]
      // Like `wrapLng`, but for the latitude (vertical) axis.
      // wrapLng: [min, max],
      // wrapLat: [min, max],
      // @property infinite: Boolean
      // If true, the coordinate space will be unbounded (infinite in both axes)
      infinite: !1,
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where lat and lng has been wrapped according to the
      // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
      wrapLatLng: function(t) {
        var e = this.wrapLng ? w(t.lng, this.wrapLng, !0) : t.lng, i = this.wrapLat ? w(t.lat, this.wrapLat, !0) : t.lat, n = t.alt;
        return new U(i, e, n);
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring
      // that its center is within the CRS's bounds.
      // Only accepts actual `L.LatLngBounds` instances, not arrays.
      wrapLatLngBounds: function(t) {
        var e = t.getCenter(), i = this.wrapLatLng(e), n = e.lat - i.lat, s = e.lng - i.lng;
        if (n === 0 && s === 0)
          return t;
        var l = t.getSouthWest(), p = t.getNorthEast(), v = new U(l.lat - n, l.lng - s), y = new U(p.lat - n, p.lng - s);
        return new at(v, y);
      }
    }, St = _({}, xt, {
      wrapLng: [-180, 180],
      // Mean Earth Radius, as recommended for use by
      // the International Union of Geodesy and Geophysics,
      // see https://rosettacode.org/wiki/Haversine_formula
      R: 6371e3,
      // distance between two geographical points using spherical law of cosines approximation
      distance: function(t, e) {
        var i = Math.PI / 180, n = t.lat * i, s = e.lat * i, l = Math.sin((e.lat - t.lat) * i / 2), p = Math.sin((e.lng - t.lng) * i / 2), v = l * l + Math.cos(n) * Math.cos(s) * p * p, y = 2 * Math.atan2(Math.sqrt(v), Math.sqrt(1 - v));
        return this.R * y;
      }
    }), $i = 6378137, Ye = {
      R: $i,
      MAX_LATITUDE: 85.0511287798,
      project: function(t) {
        var e = Math.PI / 180, i = this.MAX_LATITUDE, n = Math.max(Math.min(i, t.lat), -i), s = Math.sin(n * e);
        return new O(
          this.R * t.lng * e,
          this.R * Math.log((1 + s) / (1 - s)) / 2
        );
      },
      unproject: function(t) {
        var e = 180 / Math.PI;
        return new U(
          (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e,
          t.x * e / this.R
        );
      },
      bounds: function() {
        var t = $i * Math.PI;
        return new $([-t, -t], [t, t]);
      }()
    };
    function Xe(t, e, i, n) {
      if (F(t)) {
        this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
        return;
      }
      this._a = t, this._b = e, this._c = i, this._d = n;
    }
    Xe.prototype = {
      // @method transform(point: Point, scale?: Number): Point
      // Returns a transformed point, optionally multiplied by the given scale.
      // Only accepts actual `L.Point` instances, not arrays.
      transform: function(t, e) {
        return this._transform(t.clone(), e);
      },
      // destructive transform (faster)
      _transform: function(t, e) {
        return e = e || 1, t.x = e * (this._a * t.x + this._b), t.y = e * (this._c * t.y + this._d), t;
      },
      // @method untransform(point: Point, scale?: Number): Point
      // Returns the reverse transformation of the given point, optionally divided
      // by the given scale. Only accepts actual `L.Point` instances, not arrays.
      untransform: function(t, e) {
        return e = e || 1, new O(
          (t.x / e - this._b) / this._a,
          (t.y / e - this._d) / this._c
        );
      }
    };
    function ne(t, e, i, n) {
      return new Xe(t, e, i, n);
    }
    var Je = _({}, St, {
      code: "EPSG:3857",
      projection: Ye,
      transformation: function() {
        var t = 0.5 / (Math.PI * Ye.R);
        return ne(t, 0.5, -t, 0.5);
      }()
    }), ko = _({}, Je, {
      code: "EPSG:900913"
    });
    function Wi(t) {
      return document.createElementNS("http://www.w3.org/2000/svg", t);
    }
    function Vi(t, e) {
      var i = "", n, s, l, p, v, y;
      for (n = 0, l = t.length; n < l; n++) {
        for (v = t[n], s = 0, p = v.length; s < p; s++)
          y = v[s], i += (s ? "L" : "M") + y.x + " " + y.y;
        i += e ? S.svg ? "z" : "x" : "";
      }
      return i || "M0 0";
    }
    var Qe = document.documentElement.style, Ce = "ActiveXObject" in window, Eo = Ce && !document.addEventListener, ji = "msLaunchUri" in navigator && !("documentMode" in document), ti = gt("webkit"), qi = gt("android"), Ki = gt("android 2") || gt("android 3"), Ao = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), Oo = qi && gt("Google") && Ao < 537 && !("AudioNode" in window), ei = !!window.opera, Yi = !ji && gt("chrome"), Xi = gt("gecko") && !ti && !ei && !Ce, zo = !Yi && gt("safari"), Ji = gt("phantom"), Qi = "OTransition" in Qe, Zo = navigator.platform.indexOf("Win") === 0, tn = Ce && "transition" in Qe, ii = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !Ki, en = "MozPerspective" in Qe, Io = !window.L_DISABLE_3D && (tn || ii || en) && !Qi && !Ji, oe = typeof orientation < "u" || gt("mobile"), Bo = oe && ti, No = oe && ii, nn = !window.PointerEvent && window.MSPointerEvent, on = !!(window.PointerEvent || nn), sn = "ontouchstart" in window || !!window.TouchEvent, Ro = !window.L_NO_TOUCH && (sn || on), Do = oe && ei, Uo = oe && Xi, Ho = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Go = function() {
      var t = !1;
      try {
        var e = Object.defineProperty({}, "passive", {
          get: function() {
            t = !0;
          }
        });
        window.addEventListener("testPassiveEventSupport", m, e), window.removeEventListener("testPassiveEventSupport", m, e);
      } catch {
      }
      return t;
    }(), Fo = function() {
      return !!document.createElement("canvas").getContext;
    }(), ni = !!(document.createElementNS && Wi("svg").createSVGRect), $o = !!ni && function() {
      var t = document.createElement("div");
      return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
    }(), Wo = !ni && function() {
      try {
        var t = document.createElement("div");
        t.innerHTML = '<v:shape adj="1"/>';
        var e = t.firstChild;
        return e.style.behavior = "url(#default#VML)", e && typeof e.adj == "object";
      } catch {
        return !1;
      }
    }(), Vo = navigator.platform.indexOf("Mac") === 0, jo = navigator.platform.indexOf("Linux") === 0;
    function gt(t) {
      return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
    }
    var S = {
      ie: Ce,
      ielt9: Eo,
      edge: ji,
      webkit: ti,
      android: qi,
      android23: Ki,
      androidStock: Oo,
      opera: ei,
      chrome: Yi,
      gecko: Xi,
      safari: zo,
      phantom: Ji,
      opera12: Qi,
      win: Zo,
      ie3d: tn,
      webkit3d: ii,
      gecko3d: en,
      any3d: Io,
      mobile: oe,
      mobileWebkit: Bo,
      mobileWebkit3d: No,
      msPointer: nn,
      pointer: on,
      touch: Ro,
      touchNative: sn,
      mobileOpera: Do,
      mobileGecko: Uo,
      retina: Ho,
      passiveEvents: Go,
      canvas: Fo,
      svg: ni,
      vml: Wo,
      inlineSvg: $o,
      mac: Vo,
      linux: jo
    }, rn = S.msPointer ? "MSPointerDown" : "pointerdown", an = S.msPointer ? "MSPointerMove" : "pointermove", hn = S.msPointer ? "MSPointerUp" : "pointerup", ln = S.msPointer ? "MSPointerCancel" : "pointercancel", oi = {
      touchstart: rn,
      touchmove: an,
      touchend: hn,
      touchcancel: ln
    }, un = {
      touchstart: Qo,
      touchmove: Me,
      touchend: Me,
      touchcancel: Me
    }, Gt = {}, cn = !1;
    function qo(t, e, i) {
      return e === "touchstart" && Jo(), un[e] ? (i = un[e].bind(this, i), t.addEventListener(oi[e], i, !1), i) : (console.warn("wrong event specified:", e), m);
    }
    function Ko(t, e, i) {
      if (!oi[e]) {
        console.warn("wrong event specified:", e);
        return;
      }
      t.removeEventListener(oi[e], i, !1);
    }
    function Yo(t) {
      Gt[t.pointerId] = t;
    }
    function Xo(t) {
      Gt[t.pointerId] && (Gt[t.pointerId] = t);
    }
    function dn(t) {
      delete Gt[t.pointerId];
    }
    function Jo() {
      cn || (document.addEventListener(rn, Yo, !0), document.addEventListener(an, Xo, !0), document.addEventListener(hn, dn, !0), document.addEventListener(ln, dn, !0), cn = !0);
    }
    function Me(t, e) {
      if (e.pointerType !== (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
        e.touches = [];
        for (var i in Gt)
          e.touches.push(Gt[i]);
        e.changedTouches = [e], t(e);
      }
    }
    function Qo(t, e) {
      e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH && it(e), Me(t, e);
    }
    function ts(t) {
      var e = {}, i, n;
      for (n in t)
        i = t[n], e[n] = i && i.bind ? i.bind(t) : i;
      return t = e, e.type = "dblclick", e.detail = 2, e.isTrusted = !1, e._simulated = !0, e;
    }
    var es = 200;
    function is(t, e) {
      t.addEventListener("dblclick", e);
      var i = 0, n;
      function s(l) {
        if (l.detail !== 1) {
          n = l.detail;
          return;
        }
        if (!(l.pointerType === "mouse" || l.sourceCapabilities && !l.sourceCapabilities.firesTouchEvents)) {
          var p = gn(l);
          if (!(p.some(function(y) {
            return y instanceof HTMLLabelElement && y.attributes.for;
          }) && !p.some(function(y) {
            return y instanceof HTMLInputElement || y instanceof HTMLSelectElement;
          }))) {
            var v = Date.now();
            v - i <= es ? (n++, n === 2 && e(ts(l))) : n = 1, i = v;
          }
        }
      }
      return t.addEventListener("click", s), {
        dblclick: e,
        simDblclick: s
      };
    }
    function ns(t, e) {
      t.removeEventListener("dblclick", e.dblclick), t.removeEventListener("click", e.simDblclick);
    }
    var si = ke(
      ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
    ), se = ke(
      ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
    ), fn = se === "webkitTransition" || se === "OTransition" ? se + "End" : "transitionend";
    function _n(t) {
      return typeof t == "string" ? document.getElementById(t) : t;
    }
    function re(t, e) {
      var i = t.style[e] || t.currentStyle && t.currentStyle[e];
      if ((!i || i === "auto") && document.defaultView) {
        var n = document.defaultView.getComputedStyle(t, null);
        i = n ? n[e] : null;
      }
      return i === "auto" ? null : i;
    }
    function R(t, e, i) {
      var n = document.createElement(t);
      return n.className = e || "", i && i.appendChild(n), n;
    }
    function W(t) {
      var e = t.parentNode;
      e && e.removeChild(t);
    }
    function Te(t) {
      for (; t.firstChild; )
        t.removeChild(t.firstChild);
    }
    function Ft(t) {
      var e = t.parentNode;
      e && e.lastChild !== t && e.appendChild(t);
    }
    function $t(t) {
      var e = t.parentNode;
      e && e.firstChild !== t && e.insertBefore(t, e.firstChild);
    }
    function ri(t, e) {
      if (t.classList !== void 0)
        return t.classList.contains(e);
      var i = Se(t);
      return i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i);
    }
    function Z(t, e) {
      if (t.classList !== void 0)
        for (var i = T(e), n = 0, s = i.length; n < s; n++)
          t.classList.add(i[n]);
      else if (!ri(t, e)) {
        var l = Se(t);
        ai(t, (l ? l + " " : "") + e);
      }
    }
    function V(t, e) {
      t.classList !== void 0 ? t.classList.remove(e) : ai(t, x((" " + Se(t) + " ").replace(" " + e + " ", " ")));
    }
    function ai(t, e) {
      t.className.baseVal === void 0 ? t.className = e : t.className.baseVal = e;
    }
    function Se(t) {
      return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
    }
    function ct(t, e) {
      "opacity" in t.style ? t.style.opacity = e : "filter" in t.style && os(t, e);
    }
    function os(t, e) {
      var i = !1, n = "DXImageTransform.Microsoft.Alpha";
      try {
        i = t.filters.item(n);
      } catch {
        if (e === 1)
          return;
      }
      e = Math.round(e * 100), i ? (i.Enabled = e !== 100, i.Opacity = e) : t.style.filter += " progid:" + n + "(opacity=" + e + ")";
    }
    function ke(t) {
      for (var e = document.documentElement.style, i = 0; i < t.length; i++)
        if (t[i] in e)
          return t[i];
      return !1;
    }
    function zt(t, e, i) {
      var n = e || new O(0, 0);
      t.style[si] = (S.ie3d ? "translate(" + n.x + "px," + n.y + "px)" : "translate3d(" + n.x + "px," + n.y + "px,0)") + (i ? " scale(" + i + ")" : "");
    }
    function K(t, e) {
      t._leaflet_pos = e, S.any3d ? zt(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px");
    }
    function Zt(t) {
      return t._leaflet_pos || new O(0, 0);
    }
    var ae, he, hi;
    if ("onselectstart" in document)
      ae = function() {
        z(window, "selectstart", it);
      }, he = function() {
        G(window, "selectstart", it);
      };
    else {
      var le = ke(
        ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
      );
      ae = function() {
        if (le) {
          var t = document.documentElement.style;
          hi = t[le], t[le] = "none";
        }
      }, he = function() {
        le && (document.documentElement.style[le] = hi, hi = void 0);
      };
    }
    function li() {
      z(window, "dragstart", it);
    }
    function ui() {
      G(window, "dragstart", it);
    }
    var Ee, ci;
    function di(t) {
      for (; t.tabIndex === -1; )
        t = t.parentNode;
      t.style && (Ae(), Ee = t, ci = t.style.outlineStyle, t.style.outlineStyle = "none", z(window, "keydown", Ae));
    }
    function Ae() {
      Ee && (Ee.style.outlineStyle = ci, Ee = void 0, ci = void 0, G(window, "keydown", Ae));
    }
    function pn(t) {
      do
        t = t.parentNode;
      while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
      return t;
    }
    function fi(t) {
      var e = t.getBoundingClientRect();
      return {
        x: e.width / t.offsetWidth || 1,
        y: e.height / t.offsetHeight || 1,
        boundingClientRect: e
      };
    }
    var ss = {
      __proto__: null,
      TRANSFORM: si,
      TRANSITION: se,
      TRANSITION_END: fn,
      get: _n,
      getStyle: re,
      create: R,
      remove: W,
      empty: Te,
      toFront: Ft,
      toBack: $t,
      hasClass: ri,
      addClass: Z,
      removeClass: V,
      setClass: ai,
      getClass: Se,
      setOpacity: ct,
      testProp: ke,
      setTransform: zt,
      setPosition: K,
      getPosition: Zt,
      get disableTextSelection() {
        return ae;
      },
      get enableTextSelection() {
        return he;
      },
      disableImageDrag: li,
      enableImageDrag: ui,
      preventOutline: di,
      restoreOutline: Ae,
      getSizedParentNode: pn,
      getScale: fi
    };
    function z(t, e, i, n) {
      if (e && typeof e == "object")
        for (var s in e)
          pi(t, s, e[s], i);
      else {
        e = T(e);
        for (var l = 0, p = e.length; l < p; l++)
          pi(t, e[l], i, n);
      }
      return this;
    }
    var vt = "_leaflet_events";
    function G(t, e, i, n) {
      if (arguments.length === 1)
        mn(t), delete t[vt];
      else if (e && typeof e == "object")
        for (var s in e)
          mi(t, s, e[s], i);
      else if (e = T(e), arguments.length === 2)
        mn(t, function(v) {
          return _t(e, v) !== -1;
        });
      else
        for (var l = 0, p = e.length; l < p; l++)
          mi(t, e[l], i, n);
      return this;
    }
    function mn(t, e) {
      for (var i in t[vt]) {
        var n = i.split(/\d/)[0];
        (!e || e(n)) && mi(t, n, null, null, i);
      }
    }
    var _i = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      wheel: !("onwheel" in window) && "mousewheel"
    };
    function pi(t, e, i, n) {
      var s = e + d(i) + (n ? "_" + d(n) : "");
      if (t[vt] && t[vt][s])
        return this;
      var l = function(v) {
        return i.call(n || t, v || window.event);
      }, p = l;
      !S.touchNative && S.pointer && e.indexOf("touch") === 0 ? l = qo(t, e, l) : S.touch && e === "dblclick" ? l = is(t, l) : "addEventListener" in t ? e === "touchstart" || e === "touchmove" || e === "wheel" || e === "mousewheel" ? t.addEventListener(_i[e] || e, l, S.passiveEvents ? { passive: !1 } : !1) : e === "mouseenter" || e === "mouseleave" ? (l = function(v) {
        v = v || window.event, vi(t, v) && p(v);
      }, t.addEventListener(_i[e], l, !1)) : t.addEventListener(e, p, !1) : t.attachEvent("on" + e, l), t[vt] = t[vt] || {}, t[vt][s] = l;
    }
    function mi(t, e, i, n, s) {
      s = s || e + d(i) + (n ? "_" + d(n) : "");
      var l = t[vt] && t[vt][s];
      if (!l)
        return this;
      !S.touchNative && S.pointer && e.indexOf("touch") === 0 ? Ko(t, e, l) : S.touch && e === "dblclick" ? ns(t, l) : "removeEventListener" in t ? t.removeEventListener(_i[e] || e, l, !1) : t.detachEvent("on" + e, l), t[vt][s] = null;
    }
    function It(t) {
      return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, this;
    }
    function gi(t) {
      return pi(t, "wheel", It), this;
    }
    function ue(t) {
      return z(t, "mousedown touchstart dblclick contextmenu", It), t._leaflet_disable_click = !0, this;
    }
    function it(t) {
      return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
    }
    function Bt(t) {
      return it(t), It(t), this;
    }
    function gn(t) {
      if (t.composedPath)
        return t.composedPath();
      for (var e = [], i = t.target; i; )
        e.push(i), i = i.parentNode;
      return e;
    }
    function vn(t, e) {
      if (!e)
        return new O(t.clientX, t.clientY);
      var i = fi(e), n = i.boundingClientRect;
      return new O(
        // offset.left/top values are in page scale (like clientX/Y),
        // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
        (t.clientX - n.left) / i.x - e.clientLeft,
        (t.clientY - n.top) / i.y - e.clientTop
      );
    }
    var rs = S.linux && S.chrome ? window.devicePixelRatio : S.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
    function yn(t) {
      return S.edge ? t.wheelDeltaY / 2 : (
        // Don't trust window-geometry-based delta
        t.deltaY && t.deltaMode === 0 ? -t.deltaY / rs : (
          // Pixels
          t.deltaY && t.deltaMode === 1 ? -t.deltaY * 20 : (
            // Lines
            t.deltaY && t.deltaMode === 2 ? -t.deltaY * 60 : (
              // Pages
              t.deltaX || t.deltaZ ? 0 : (
                // Skip horizontal/depth wheel events
                t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : (
                  // Legacy IE pixels
                  t.detail && Math.abs(t.detail) < 32765 ? -t.detail * 20 : (
                    // Legacy Moz lines
                    t.detail ? t.detail / -32765 * 60 : (
                      // Legacy Moz pages
                      0
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    function vi(t, e) {
      var i = e.relatedTarget;
      if (!i)
        return !0;
      try {
        for (; i && i !== t; )
          i = i.parentNode;
      } catch {
        return !1;
      }
      return i !== t;
    }
    var as = {
      __proto__: null,
      on: z,
      off: G,
      stopPropagation: It,
      disableScrollPropagation: gi,
      disableClickPropagation: ue,
      preventDefault: it,
      stop: Bt,
      getPropagationPath: gn,
      getMousePosition: vn,
      getWheelDelta: yn,
      isExternalTarget: vi,
      addListener: z,
      removeListener: G
    }, Ln = ie.extend({
      // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
      // Run an animation of a given element to a new position, optionally setting
      // duration in seconds (`0.25` by default) and easing linearity factor (3rd
      // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
      // `0.5` by default).
      run: function(t, e, i, n) {
        this.stop(), this._el = t, this._inProgress = !0, this._duration = i || 0.25, this._easeOutPower = 1 / Math.max(n || 0.5, 0.2), this._startPos = Zt(t), this._offset = e.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
      },
      // @method stop()
      // Stops the animation (if currently running).
      stop: function() {
        this._inProgress && (this._step(!0), this._complete());
      },
      _animate: function() {
        this._animId = st(this._animate, this), this._step();
      },
      _step: function(t) {
        var e = +/* @__PURE__ */ new Date() - this._startTime, i = this._duration * 1e3;
        e < i ? this._runFrame(this._easeOut(e / i), t) : (this._runFrame(1), this._complete());
      },
      _runFrame: function(t, e) {
        var i = this._startPos.add(this._offset.multiplyBy(t));
        e && i._round(), K(this._el, i), this.fire("step");
      },
      _complete: function() {
        ut(this._animId), this._inProgress = !1, this.fire("end");
      },
      _easeOut: function(t) {
        return 1 - Math.pow(1 - t, this._easeOutPower);
      }
    }), N = ie.extend({
      options: {
        // @section Map State Options
        // @option crs: CRS = L.CRS.EPSG3857
        // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
        // sure what it means.
        crs: Je,
        // @option center: LatLng = undefined
        // Initial geographic center of the map
        center: void 0,
        // @option zoom: Number = undefined
        // Initial map zoom level
        zoom: void 0,
        // @option minZoom: Number = *
        // Minimum zoom level of the map.
        // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
        // the lowest of their `minZoom` options will be used instead.
        minZoom: void 0,
        // @option maxZoom: Number = *
        // Maximum zoom level of the map.
        // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
        // the highest of their `maxZoom` options will be used instead.
        maxZoom: void 0,
        // @option layers: Layer[] = []
        // Array of layers that will be added to the map initially
        layers: [],
        // @option maxBounds: LatLngBounds = null
        // When this option is set, the map restricts the view to the given
        // geographical bounds, bouncing the user back if the user tries to pan
        // outside the view. To set the restriction dynamically, use
        // [`setMaxBounds`](#map-setmaxbounds) method.
        maxBounds: void 0,
        // @option renderer: Renderer = *
        // The default method for drawing vector layers on the map. `L.SVG`
        // or `L.Canvas` by default depending on browser support.
        renderer: void 0,
        // @section Animation Options
        // @option zoomAnimation: Boolean = true
        // Whether the map zoom animation is enabled. By default it's enabled
        // in all browsers that support CSS3 Transitions except Android.
        zoomAnimation: !0,
        // @option zoomAnimationThreshold: Number = 4
        // Won't animate zoom if the zoom difference exceeds this value.
        zoomAnimationThreshold: 4,
        // @option fadeAnimation: Boolean = true
        // Whether the tile fade animation is enabled. By default it's enabled
        // in all browsers that support CSS3 Transitions except Android.
        fadeAnimation: !0,
        // @option markerZoomAnimation: Boolean = true
        // Whether markers animate their zoom with the zoom animation, if disabled
        // they will disappear for the length of the animation. By default it's
        // enabled in all browsers that support CSS3 Transitions except Android.
        markerZoomAnimation: !0,
        // @option transform3DLimit: Number = 2^23
        // Defines the maximum size of a CSS translation transform. The default
        // value should not be changed unless a web browser positions layers in
        // the wrong place after doing a large `panBy`.
        transform3DLimit: 8388608,
        // Precision limit of a 32-bit float
        // @section Interaction Options
        // @option zoomSnap: Number = 1
        // Forces the map's zoom level to always be a multiple of this, particularly
        // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
        // By default, the zoom level snaps to the nearest integer; lower values
        // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
        // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
        zoomSnap: 1,
        // @option zoomDelta: Number = 1
        // Controls how much the map's zoom level will change after a
        // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
        // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
        // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
        zoomDelta: 1,
        // @option trackResize: Boolean = true
        // Whether the map automatically handles browser window resize to update itself.
        trackResize: !0
      },
      initialize: function(t, e) {
        e = C(this, e), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = a(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.zoom !== void 0 && (this._zoom = this._limitZoom(e.zoom)), e.center && e.zoom !== void 0 && this.setView(B(e.center), e.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = se && S.any3d && !S.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), z(this._proxy, fn, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
      },
      // @section Methods for modifying map state
      // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) with the given
      // animation options.
      setView: function(t, e, i) {
        if (e = e === void 0 ? this._zoom : this._limitZoom(e), t = this._limitCenter(B(t), e, this.options.maxBounds), i = i || {}, this._stop(), this._loaded && !i.reset && i !== !0) {
          i.animate !== void 0 && (i.zoom = _({ animate: i.animate }, i.zoom), i.pan = _({ animate: i.animate, duration: i.duration }, i.pan));
          var n = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, i.zoom) : this._tryAnimatedPan(t, i.pan);
          if (n)
            return clearTimeout(this._sizeTimer), this;
        }
        return this._resetView(t, e, i.pan && i.pan.noMoveStart), this;
      },
      // @method setZoom(zoom: Number, options?: Zoom/pan options): this
      // Sets the zoom of the map.
      setZoom: function(t, e) {
        return this._loaded ? this.setView(this.getCenter(), t, { zoom: e }) : (this._zoom = t, this);
      },
      // @method zoomIn(delta?: Number, options?: Zoom options): this
      // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomIn: function(t, e) {
        return t = t || (S.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, e);
      },
      // @method zoomOut(delta?: Number, options?: Zoom options): this
      // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomOut: function(t, e) {
        return t = t || (S.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, e);
      },
      // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified geographical point on the map
      // stationary (e.g. used internally for scroll zoom and double-click zoom).
      // @alternative
      // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
      setZoomAround: function(t, e, i) {
        var n = this.getZoomScale(e), s = this.getSize().divideBy(2), l = t instanceof O ? t : this.latLngToContainerPoint(t), p = l.subtract(s).multiplyBy(1 - 1 / n), v = this.containerPointToLatLng(s.add(p));
        return this.setView(v, e, { zoom: i });
      },
      _getBoundsCenterZoom: function(t, e) {
        e = e || {}, t = t.getBounds ? t.getBounds() : q(t);
        var i = A(e.paddingTopLeft || e.padding || [0, 0]), n = A(e.paddingBottomRight || e.padding || [0, 0]), s = this.getBoundsZoom(t, !1, i.add(n));
        if (s = typeof e.maxZoom == "number" ? Math.min(e.maxZoom, s) : s, s === 1 / 0)
          return {
            center: t.getCenter(),
            zoom: s
          };
        var l = n.subtract(i).divideBy(2), p = this.project(t.getSouthWest(), s), v = this.project(t.getNorthEast(), s), y = this.unproject(p.add(v).divideBy(2).add(l), s);
        return {
          center: y,
          zoom: s
        };
      },
      // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets a map view that contains the given geographical bounds with the
      // maximum zoom level possible.
      fitBounds: function(t, e) {
        if (t = q(t), !t.isValid())
          throw new Error("Bounds are not valid.");
        var i = this._getBoundsCenterZoom(t, e);
        return this.setView(i.center, i.zoom, e);
      },
      // @method fitWorld(options?: fitBounds options): this
      // Sets a map view that mostly contains the whole world with the maximum
      // zoom level possible.
      fitWorld: function(t) {
        return this.fitBounds([[-90, -180], [90, 180]], t);
      },
      // @method panTo(latlng: LatLng, options?: Pan options): this
      // Pans the map to a given center.
      panTo: function(t, e) {
        return this.setView(t, this._zoom, { pan: e });
      },
      // @method panBy(offset: Point, options?: Pan options): this
      // Pans the map by a given number of pixels (animated).
      panBy: function(t, e) {
        if (t = A(t).round(), e = e || {}, !t.x && !t.y)
          return this.fire("moveend");
        if (e.animate !== !0 && !this.getSize().contains(t))
          return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
        if (this._panAnim || (this._panAnim = new Ln(), this._panAnim.on({
          step: this._onPanTransitionStep,
          end: this._onPanTransitionEnd
        }, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
          Z(this._mapPane, "leaflet-pan-anim");
          var i = this._getMapPanePos().subtract(t).round();
          this._panAnim.run(this._mapPane, i, e.duration || 0.25, e.easeLinearity);
        } else
          this._rawPanBy(t), this.fire("move").fire("moveend");
        return this;
      },
      // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) performing a smooth
      // pan-zoom animation.
      flyTo: function(t, e, i) {
        if (i = i || {}, i.animate === !1 || !S.any3d)
          return this.setView(t, e, i);
        this._stop();
        var n = this.project(this.getCenter()), s = this.project(t), l = this.getSize(), p = this._zoom;
        t = B(t), e = e === void 0 ? p : e;
        var v = Math.max(l.x, l.y), y = v * this.getZoomScale(p, e), b = s.distanceTo(n) || 1, M = 1.42, E = M * M;
        function I(Y) {
          var Fe = Y ? -1 : 1, Ks = Y ? y : v, Ys = y * y - v * v + Fe * E * E * b * b, Xs = 2 * Ks * E * b, ki = Ys / Xs, to = Math.sqrt(ki * ki + 1) - ki, Js = to < 1e-9 ? -18 : Math.log(to);
          return Js;
        }
        function ot(Y) {
          return (Math.exp(Y) - Math.exp(-Y)) / 2;
        }
        function Q(Y) {
          return (Math.exp(Y) + Math.exp(-Y)) / 2;
        }
        function ft(Y) {
          return ot(Y) / Q(Y);
        }
        var ht = I(0);
        function Yt(Y) {
          return v * (Q(ht) / Q(ht + M * Y));
        }
        function Ws(Y) {
          return v * (Q(ht) * ft(ht + M * Y) - ot(ht)) / E;
        }
        function Vs(Y) {
          return 1 - Math.pow(1 - Y, 1.5);
        }
        var js = Date.now(), Jn = (I(1) - ht) / M, qs = i.duration ? 1e3 * i.duration : 1e3 * Jn * 0.8;
        function Qn() {
          var Y = (Date.now() - js) / qs, Fe = Vs(Y) * Jn;
          Y <= 1 ? (this._flyToFrame = st(Qn, this), this._move(
            this.unproject(n.add(s.subtract(n).multiplyBy(Ws(Fe) / b)), p),
            this.getScaleZoom(v / Yt(Fe), p),
            { flyTo: !0 }
          )) : this._move(t, e)._moveEnd(!0);
        }
        return this._moveStart(!0, i.noMoveStart), Qn.call(this), this;
      },
      // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
      // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
      flyToBounds: function(t, e) {
        var i = this._getBoundsCenterZoom(t, e);
        return this.flyTo(i.center, i.zoom, e);
      },
      // @method setMaxBounds(bounds: LatLngBounds): this
      // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
      setMaxBounds: function(t) {
        return t = q(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
      },
      // @method setMinZoom(zoom: Number): this
      // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
      setMinZoom: function(t) {
        var e = this.options.minZoom;
        return this.options.minZoom = t, this._loaded && e !== t && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(t) : this;
      },
      // @method setMaxZoom(zoom: Number): this
      // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
      setMaxZoom: function(t) {
        var e = this.options.maxZoom;
        return this.options.maxZoom = t, this._loaded && e !== t && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(t) : this;
      },
      // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
      // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
      panInsideBounds: function(t, e) {
        this._enforcingBounds = !0;
        var i = this.getCenter(), n = this._limitCenter(i, this._zoom, q(t));
        return i.equals(n) || this.panTo(n, e), this._enforcingBounds = !1, this;
      },
      // @method panInside(latlng: LatLng, options?: padding options): this
      // Pans the map the minimum amount to make the `latlng` visible. Use
      // padding options to fit the display to more restricted bounds.
      // If `latlng` is already within the (optionally padded) display bounds,
      // the map will not be panned.
      panInside: function(t, e) {
        e = e || {};
        var i = A(e.paddingTopLeft || e.padding || [0, 0]), n = A(e.paddingBottomRight || e.padding || [0, 0]), s = this.project(this.getCenter()), l = this.project(t), p = this.getPixelBounds(), v = rt([p.min.add(i), p.max.subtract(n)]), y = v.getSize();
        if (!v.contains(l)) {
          this._enforcingBounds = !0;
          var b = l.subtract(v.getCenter()), M = v.extend(l).getSize().subtract(y);
          s.x += b.x < 0 ? -M.x : M.x, s.y += b.y < 0 ? -M.y : M.y, this.panTo(this.unproject(s), e), this._enforcingBounds = !1;
        }
        return this;
      },
      // @method invalidateSize(options: Zoom/pan options): this
      // Checks if the map container size changed and updates the map if so —
      // call it after you've changed the map size dynamically, also animating
      // pan by default. If `options.pan` is `false`, panning will not occur.
      // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
      // that it doesn't happen often even if the method is called many
      // times in a row.
      // @alternative
      // @method invalidateSize(animate: Boolean): this
      // Checks if the map container size changed and updates the map if so —
      // call it after you've changed the map size dynamically, also animating
      // pan by default.
      invalidateSize: function(t) {
        if (!this._loaded)
          return this;
        t = _({
          animate: !1,
          pan: !0
        }, t === !0 ? { animate: !0 } : t);
        var e = this.getSize();
        this._sizeChanged = !0, this._lastCenter = null;
        var i = this.getSize(), n = e.divideBy(2).round(), s = i.divideBy(2).round(), l = n.subtract(s);
        return !l.x && !l.y ? this : (t.animate && t.pan ? this.panBy(l) : (t.pan && this._rawPanBy(l), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(a(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
          oldSize: e,
          newSize: i
        }));
      },
      // @section Methods for modifying map state
      // @method stop(): this
      // Stops the currently running `panTo` or `flyTo` animation, if any.
      stop: function() {
        return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
      },
      // @section Geolocation methods
      // @method locate(options?: Locate options): this
      // Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
      // event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
      // and optionally sets the map view to the user's location with respect to
      // detection accuracy (or to the world view if geolocation failed).
      // Note that, if your page doesn't use HTTPS, this method will fail in
      // modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
      // See `Locate options` for more details.
      locate: function(t) {
        if (t = this._locateOptions = _({
          timeout: 1e4,
          watch: !1
          // setView: false
          // maxZoom: <Number>
          // maximumAge: 0
          // enableHighAccuracy: false
        }, t), !("geolocation" in navigator))
          return this._handleGeolocationError({
            code: 0,
            message: "Geolocation not supported."
          }), this;
        var e = a(this._handleGeolocationResponse, this), i = a(this._handleGeolocationError, this);
        return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, i, t) : navigator.geolocation.getCurrentPosition(e, i, t), this;
      },
      // @method stopLocate(): this
      // Stops watching location previously initiated by `map.locate({watch: true})`
      // and aborts resetting the map view if map.locate was called with
      // `{setView: true}`.
      stopLocate: function() {
        return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this;
      },
      _handleGeolocationError: function(t) {
        if (this._container._leaflet_id) {
          var e = t.code, i = t.message || (e === 1 ? "permission denied" : e === 2 ? "position unavailable" : "timeout");
          this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
            code: e,
            message: "Geolocation error: " + i + "."
          });
        }
      },
      _handleGeolocationResponse: function(t) {
        if (this._container._leaflet_id) {
          var e = t.coords.latitude, i = t.coords.longitude, n = new U(e, i), s = n.toBounds(t.coords.accuracy * 2), l = this._locateOptions;
          if (l.setView) {
            var p = this.getBoundsZoom(s);
            this.setView(n, l.maxZoom ? Math.min(p, l.maxZoom) : p);
          }
          var v = {
            latlng: n,
            bounds: s,
            timestamp: t.timestamp
          };
          for (var y in t.coords)
            typeof t.coords[y] == "number" && (v[y] = t.coords[y]);
          this.fire("locationfound", v);
        }
      },
      // TODO Appropriate docs section?
      // @section Other Methods
      // @method addHandler(name: String, HandlerClass: Function): this
      // Adds a new `Handler` to the map, given its name and constructor function.
      addHandler: function(t, e) {
        if (!e)
          return this;
        var i = this[t] = new e(this);
        return this._handlers.push(i), this.options[t] && i.enable(), this;
      },
      // @method remove(): this
      // Destroys the map and clears all related event listeners.
      remove: function() {
        if (this._initEvents(!0), this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id)
          throw new Error("Map container is being reused by another instance");
        try {
          delete this._container._leaflet_id, delete this._containerId;
        } catch {
          this._container._leaflet_id = void 0, this._containerId = void 0;
        }
        this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), W(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (ut(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
        var t;
        for (t in this._layers)
          this._layers[t].remove();
        for (t in this._panes)
          W(this._panes[t]);
        return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
      },
      // @section Other Methods
      // @method createPane(name: String, container?: HTMLElement): HTMLElement
      // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
      // then returns it. The pane is created as a child of `container`, or
      // as a child of the main map pane if not set.
      createPane: function(t, e) {
        var i = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), n = R("div", i, e || this._mapPane);
        return t && (this._panes[t] = n), n;
      },
      // @section Methods for Getting Map State
      // @method getCenter(): LatLng
      // Returns the geographical center of the map view
      getCenter: function() {
        return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint());
      },
      // @method getZoom(): Number
      // Returns the current zoom level of the map view
      getZoom: function() {
        return this._zoom;
      },
      // @method getBounds(): LatLngBounds
      // Returns the geographical bounds visible in the current map view
      getBounds: function() {
        var t = this.getPixelBounds(), e = this.unproject(t.getBottomLeft()), i = this.unproject(t.getTopRight());
        return new at(e, i);
      },
      // @method getMinZoom(): Number
      // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
      getMinZoom: function() {
        return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
      },
      // @method getMaxZoom(): Number
      // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
      getMaxZoom: function() {
        return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom;
      },
      // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
      // Returns the maximum zoom level on which the given bounds fit to the map
      // view in its entirety. If `inside` (optional) is set to `true`, the method
      // instead returns the minimum zoom level on which the map view fits into
      // the given bounds in its entirety.
      getBoundsZoom: function(t, e, i) {
        t = q(t), i = A(i || [0, 0]);
        var n = this.getZoom() || 0, s = this.getMinZoom(), l = this.getMaxZoom(), p = t.getNorthWest(), v = t.getSouthEast(), y = this.getSize().subtract(i), b = rt(this.project(v, n), this.project(p, n)).getSize(), M = S.any3d ? this.options.zoomSnap : 1, E = y.x / b.x, I = y.y / b.y, ot = e ? Math.max(E, I) : Math.min(E, I);
        return n = this.getScaleZoom(ot, n), M && (n = Math.round(n / (M / 100)) * (M / 100), n = e ? Math.ceil(n / M) * M : Math.floor(n / M) * M), Math.max(s, Math.min(l, n));
      },
      // @method getSize(): Point
      // Returns the current size of the map container (in pixels).
      getSize: function() {
        return (!this._size || this._sizeChanged) && (this._size = new O(
          this._container.clientWidth || 0,
          this._container.clientHeight || 0
        ), this._sizeChanged = !1), this._size.clone();
      },
      // @method getPixelBounds(): Bounds
      // Returns the bounds of the current map view in projected pixel
      // coordinates (sometimes useful in layer and overlay implementations).
      getPixelBounds: function(t, e) {
        var i = this._getTopLeftPoint(t, e);
        return new $(i, i.add(this.getSize()));
      },
      // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
      // the map pane? "left point of the map layer" can be confusing, specially
      // since there can be negative offsets.
      // @method getPixelOrigin(): Point
      // Returns the projected pixel coordinates of the top left point of
      // the map layer (useful in custom layer and overlay implementations).
      getPixelOrigin: function() {
        return this._checkIfLoaded(), this._pixelOrigin;
      },
      // @method getPixelWorldBounds(zoom?: Number): Bounds
      // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
      // If `zoom` is omitted, the map's current zoom level is used.
      getPixelWorldBounds: function(t) {
        return this.options.crs.getProjectedBounds(t === void 0 ? this.getZoom() : t);
      },
      // @section Other Methods
      // @method getPane(pane: String|HTMLElement): HTMLElement
      // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
      getPane: function(t) {
        return typeof t == "string" ? this._panes[t] : t;
      },
      // @method getPanes(): Object
      // Returns a plain object containing the names of all [panes](#map-pane) as keys and
      // the panes as values.
      getPanes: function() {
        return this._panes;
      },
      // @method getContainer: HTMLElement
      // Returns the HTML element that contains the map.
      getContainer: function() {
        return this._container;
      },
      // @section Conversion Methods
      // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
      // Returns the scale factor to be applied to a map transition from zoom level
      // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
      getZoomScale: function(t, e) {
        var i = this.options.crs;
        return e = e === void 0 ? this._zoom : e, i.scale(t) / i.scale(e);
      },
      // @method getScaleZoom(scale: Number, fromZoom: Number): Number
      // Returns the zoom level that the map would end up at, if it is at `fromZoom`
      // level and everything is scaled by a factor of `scale`. Inverse of
      // [`getZoomScale`](#map-getZoomScale).
      getScaleZoom: function(t, e) {
        var i = this.options.crs;
        e = e === void 0 ? this._zoom : e;
        var n = i.zoom(t * i.scale(e));
        return isNaN(n) ? 1 / 0 : n;
      },
      // @method project(latlng: LatLng, zoom: Number): Point
      // Projects a geographical coordinate `LatLng` according to the projection
      // of the map's CRS, then scales it according to `zoom` and the CRS's
      // `Transformation`. The result is pixel coordinate relative to
      // the CRS origin.
      project: function(t, e) {
        return e = e === void 0 ? this._zoom : e, this.options.crs.latLngToPoint(B(t), e);
      },
      // @method unproject(point: Point, zoom: Number): LatLng
      // Inverse of [`project`](#map-project).
      unproject: function(t, e) {
        return e = e === void 0 ? this._zoom : e, this.options.crs.pointToLatLng(A(t), e);
      },
      // @method layerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding geographical coordinate (for the current zoom level).
      layerPointToLatLng: function(t) {
        var e = A(t).add(this.getPixelOrigin());
        return this.unproject(e);
      },
      // @method latLngToLayerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the [origin pixel](#map-getpixelorigin).
      latLngToLayerPoint: function(t) {
        var e = this.project(B(t))._round();
        return e._subtract(this.getPixelOrigin());
      },
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
      // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
      // CRS's bounds.
      // By default this means longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees.
      wrapLatLng: function(t) {
        return this.options.crs.wrapLatLng(B(t));
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring that
      // its center is within the CRS's bounds.
      // By default this means the center longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees, and the majority of the bounds
      // overlaps the CRS's bounds.
      wrapLatLngBounds: function(t) {
        return this.options.crs.wrapLatLngBounds(q(t));
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates according to
      // the map's CRS. By default this measures distance in meters.
      distance: function(t, e) {
        return this.options.crs.distance(B(t), B(e));
      },
      // @method containerPointToLayerPoint(point: Point): Point
      // Given a pixel coordinate relative to the map container, returns the corresponding
      // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
      containerPointToLayerPoint: function(t) {
        return A(t).subtract(this._getMapPanePos());
      },
      // @method layerPointToContainerPoint(point: Point): Point
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding pixel coordinate relative to the map container.
      layerPointToContainerPoint: function(t) {
        return A(t).add(this._getMapPanePos());
      },
      // @method containerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the map container, returns
      // the corresponding geographical coordinate (for the current zoom level).
      containerPointToLatLng: function(t) {
        var e = this.containerPointToLayerPoint(A(t));
        return this.layerPointToLatLng(e);
      },
      // @method latLngToContainerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the map container.
      latLngToContainerPoint: function(t) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint(B(t)));
      },
      // @method mouseEventToContainerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to the
      // map container where the event took place.
      mouseEventToContainerPoint: function(t) {
        return vn(t, this._container);
      },
      // @method mouseEventToLayerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to
      // the [origin pixel](#map-getpixelorigin) where the event took place.
      mouseEventToLayerPoint: function(t) {
        return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t));
      },
      // @method mouseEventToLatLng(ev: MouseEvent): LatLng
      // Given a MouseEvent object, returns geographical coordinate where the
      // event took place.
      mouseEventToLatLng: function(t) {
        return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
      },
      // map initialization methods
      _initContainer: function(t) {
        var e = this._container = _n(t);
        if (e) {
          if (e._leaflet_id)
            throw new Error("Map container is already initialized.");
        } else throw new Error("Map container not found.");
        z(e, "scroll", this._onScroll, this), this._containerId = d(e);
      },
      _initLayout: function() {
        var t = this._container;
        this._fadeAnimated = this.options.fadeAnimation && S.any3d, Z(t, "leaflet-container" + (S.touch ? " leaflet-touch" : "") + (S.retina ? " leaflet-retina" : "") + (S.ielt9 ? " leaflet-oldie" : "") + (S.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
        var e = re(t, "position");
        e !== "absolute" && e !== "relative" && e !== "fixed" && e !== "sticky" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
      },
      _initPanes: function() {
        var t = this._panes = {};
        this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), K(this._mapPane, new O(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (Z(t.markerPane, "leaflet-zoom-hide"), Z(t.shadowPane, "leaflet-zoom-hide"));
      },
      // private methods that modify map state
      // @section Map state change events
      _resetView: function(t, e, i) {
        K(this._mapPane, new O(0, 0));
        var n = !this._loaded;
        this._loaded = !0, e = this._limitZoom(e), this.fire("viewprereset");
        var s = this._zoom !== e;
        this._moveStart(s, i)._move(t, e)._moveEnd(s), this.fire("viewreset"), n && this.fire("load");
      },
      _moveStart: function(t, e) {
        return t && this.fire("zoomstart"), e || this.fire("movestart"), this;
      },
      _move: function(t, e, i, n) {
        e === void 0 && (e = this._zoom);
        var s = this._zoom !== e;
        return this._zoom = e, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), n ? i && i.pinch && this.fire("zoom", i) : ((s || i && i.pinch) && this.fire("zoom", i), this.fire("move", i)), this;
      },
      _moveEnd: function(t) {
        return t && this.fire("zoomend"), this.fire("moveend");
      },
      _stop: function() {
        return ut(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
      },
      _rawPanBy: function(t) {
        K(this._mapPane, this._getMapPanePos().subtract(t));
      },
      _getZoomSpan: function() {
        return this.getMaxZoom() - this.getMinZoom();
      },
      _panInsideMaxBounds: function() {
        this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
      },
      _checkIfLoaded: function() {
        if (!this._loaded)
          throw new Error("Set map center and zoom first.");
      },
      // DOM event handling
      // @section Interaction events
      _initEvents: function(t) {
        this._targets = {}, this._targets[d(this._container)] = this;
        var e = t ? G : z;
        e(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && e(window, "resize", this._onResize, this), S.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
      },
      _onResize: function() {
        ut(this._resizeRequest), this._resizeRequest = st(
          function() {
            this.invalidateSize({ debounceMoveend: !0 });
          },
          this
        );
      },
      _onScroll: function() {
        this._container.scrollTop = 0, this._container.scrollLeft = 0;
      },
      _onMoveEnd: function() {
        var t = this._getMapPanePos();
        Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
      },
      _findEventTargets: function(t, e) {
        for (var i = [], n, s = e === "mouseout" || e === "mouseover", l = t.target || t.srcElement, p = !1; l; ) {
          if (n = this._targets[d(l)], n && (e === "click" || e === "preclick") && this._draggableMoved(n)) {
            p = !0;
            break;
          }
          if (n && n.listens(e, !0) && (s && !vi(l, t) || (i.push(n), s)) || l === this._container)
            break;
          l = l.parentNode;
        }
        return !i.length && !p && !s && this.listens(e, !0) && (i = [this]), i;
      },
      _isClickDisabled: function(t) {
        for (; t && t !== this._container; ) {
          if (t._leaflet_disable_click)
            return !0;
          t = t.parentNode;
        }
      },
      _handleDOMEvent: function(t) {
        var e = t.target || t.srcElement;
        if (!(!this._loaded || e._leaflet_disable_events || t.type === "click" && this._isClickDisabled(e))) {
          var i = t.type;
          i === "mousedown" && di(e), this._fireDOMEvent(t, i);
        }
      },
      _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
      _fireDOMEvent: function(t, e, i) {
        if (t.type === "click") {
          var n = _({}, t);
          n.type = "preclick", this._fireDOMEvent(n, n.type, i);
        }
        var s = this._findEventTargets(t, e);
        if (i) {
          for (var l = [], p = 0; p < i.length; p++)
            i[p].listens(e, !0) && l.push(i[p]);
          s = l.concat(s);
        }
        if (s.length) {
          e === "contextmenu" && it(t);
          var v = s[0], y = {
            originalEvent: t
          };
          if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
            var b = v.getLatLng && (!v._radius || v._radius <= 10);
            y.containerPoint = b ? this.latLngToContainerPoint(v.getLatLng()) : this.mouseEventToContainerPoint(t), y.layerPoint = this.containerPointToLayerPoint(y.containerPoint), y.latlng = b ? v.getLatLng() : this.layerPointToLatLng(y.layerPoint);
          }
          for (p = 0; p < s.length; p++)
            if (s[p].fire(e, y, !0), y.originalEvent._stopped || s[p].options.bubblingMouseEvents === !1 && _t(this._mouseEvents, e) !== -1)
              return;
        }
      },
      _draggableMoved: function(t) {
        return t = t.dragging && t.dragging.enabled() ? t : this, t.dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved();
      },
      _clearHandlers: function() {
        for (var t = 0, e = this._handlers.length; t < e; t++)
          this._handlers[t].disable();
      },
      // @section Other Methods
      // @method whenReady(fn: Function, context?: Object): this
      // Runs the given function `fn` when the map gets initialized with
      // a view (center and zoom) and at least one layer, or immediately
      // if it's already initialized, optionally passing a function context.
      whenReady: function(t, e) {
        return this._loaded ? t.call(e || this, { target: this }) : this.on("load", t, e), this;
      },
      // private methods for getting map state
      _getMapPanePos: function() {
        return Zt(this._mapPane) || new O(0, 0);
      },
      _moved: function() {
        var t = this._getMapPanePos();
        return t && !t.equals([0, 0]);
      },
      _getTopLeftPoint: function(t, e) {
        var i = t && e !== void 0 ? this._getNewPixelOrigin(t, e) : this.getPixelOrigin();
        return i.subtract(this._getMapPanePos());
      },
      _getNewPixelOrigin: function(t, e) {
        var i = this.getSize()._divideBy(2);
        return this.project(t, e)._subtract(i)._add(this._getMapPanePos())._round();
      },
      _latLngToNewLayerPoint: function(t, e, i) {
        var n = this._getNewPixelOrigin(i, e);
        return this.project(t, e)._subtract(n);
      },
      _latLngBoundsToNewLayerBounds: function(t, e, i) {
        var n = this._getNewPixelOrigin(i, e);
        return rt([
          this.project(t.getSouthWest(), e)._subtract(n),
          this.project(t.getNorthWest(), e)._subtract(n),
          this.project(t.getSouthEast(), e)._subtract(n),
          this.project(t.getNorthEast(), e)._subtract(n)
        ]);
      },
      // layer point of the current center
      _getCenterLayerPoint: function() {
        return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
      },
      // offset of the specified place to the current center in pixels
      _getCenterOffset: function(t) {
        return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint());
      },
      // adjust center for view to get inside bounds
      _limitCenter: function(t, e, i) {
        if (!i)
          return t;
        var n = this.project(t, e), s = this.getSize().divideBy(2), l = new $(n.subtract(s), n.add(s)), p = this._getBoundsOffset(l, i, e);
        return Math.abs(p.x) <= 1 && Math.abs(p.y) <= 1 ? t : this.unproject(n.add(p), e);
      },
      // adjust offset for view to get inside bounds
      _limitOffset: function(t, e) {
        if (!e)
          return t;
        var i = this.getPixelBounds(), n = new $(i.min.add(t), i.max.add(t));
        return t.add(this._getBoundsOffset(n, e));
      },
      // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
      _getBoundsOffset: function(t, e, i) {
        var n = rt(
          this.project(e.getNorthEast(), i),
          this.project(e.getSouthWest(), i)
        ), s = n.min.subtract(t.min), l = n.max.subtract(t.max), p = this._rebound(s.x, -l.x), v = this._rebound(s.y, -l.y);
        return new O(p, v);
      },
      _rebound: function(t, e) {
        return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
      },
      _limitZoom: function(t) {
        var e = this.getMinZoom(), i = this.getMaxZoom(), n = S.any3d ? this.options.zoomSnap : 1;
        return n && (t = Math.round(t / n) * n), Math.max(e, Math.min(i, t));
      },
      _onPanTransitionStep: function() {
        this.fire("move");
      },
      _onPanTransitionEnd: function() {
        V(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
      },
      _tryAnimatedPan: function(t, e) {
        var i = this._getCenterOffset(t)._trunc();
        return (e && e.animate) !== !0 && !this.getSize().contains(i) ? !1 : (this.panBy(i, e), !0);
      },
      _createAnimProxy: function() {
        var t = this._proxy = R("div", "leaflet-proxy leaflet-zoom-animated");
        this._panes.mapPane.appendChild(t), this.on("zoomanim", function(e) {
          var i = si, n = this._proxy.style[i];
          zt(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), n === this._proxy.style[i] && this._animatingZoom && this._onZoomTransitionEnd();
        }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
      },
      _destroyAnimProxy: function() {
        W(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
      },
      _animMoveEnd: function() {
        var t = this.getCenter(), e = this.getZoom();
        zt(this._proxy, this.project(t, e), this.getZoomScale(e, 1));
      },
      _catchTransitionEnd: function(t) {
        this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
      },
      _nothingToAnimate: function() {
        return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
      },
      _tryAnimatedZoom: function(t, e, i) {
        if (this._animatingZoom)
          return !0;
        if (i = i || {}, !this._zoomAnimated || i.animate === !1 || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold)
          return !1;
        var n = this.getZoomScale(e), s = this._getCenterOffset(t)._divideBy(1 - 1 / n);
        return i.animate !== !0 && !this.getSize().contains(s) ? !1 : (st(function() {
          this._moveStart(!0, i.noMoveStart || !1)._animateZoom(t, e, !0);
        }, this), !0);
      },
      _animateZoom: function(t, e, i, n) {
        this._mapPane && (i && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, Z(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
          center: t,
          zoom: e,
          noUpdate: n
        }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(a(this._onZoomTransitionEnd, this), 250));
      },
      _onZoomTransitionEnd: function() {
        this._animatingZoom && (this._mapPane && V(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
      }
    });
    function hs(t, e) {
      return new N(t, e);
    }
    var pt = wt.extend({
      // @section
      // @aka Control Options
      options: {
        // @option position: String = 'topright'
        // The position of the control (one of the map corners). Possible values are `'topleft'`,
        // `'topright'`, `'bottomleft'` or `'bottomright'`
        position: "topright"
      },
      initialize: function(t) {
        C(this, t);
      },
      /* @section
       * Classes extending L.Control will inherit the following methods:
       *
       * @method getPosition: string
       * Returns the position of the control.
       */
      getPosition: function() {
        return this.options.position;
      },
      // @method setPosition(position: string): this
      // Sets the position of the control.
      setPosition: function(t) {
        var e = this._map;
        return e && e.removeControl(this), this.options.position = t, e && e.addControl(this), this;
      },
      // @method getContainer: HTMLElement
      // Returns the HTMLElement that contains the control.
      getContainer: function() {
        return this._container;
      },
      // @method addTo(map: Map): this
      // Adds the control to the given map.
      addTo: function(t) {
        this.remove(), this._map = t;
        var e = this._container = this.onAdd(t), i = this.getPosition(), n = t._controlCorners[i];
        return Z(e, "leaflet-control"), i.indexOf("bottom") !== -1 ? n.insertBefore(e, n.firstChild) : n.appendChild(e), this._map.on("unload", this.remove, this), this;
      },
      // @method remove: this
      // Removes the control from the map it is currently active on.
      remove: function() {
        return this._map ? (W(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
      },
      _refocusOnMap: function(t) {
        this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus();
      }
    }), ce = function(t) {
      return new pt(t);
    };
    N.include({
      // @method addControl(control: Control): this
      // Adds the given control to the map
      addControl: function(t) {
        return t.addTo(this), this;
      },
      // @method removeControl(control: Control): this
      // Removes the given control from the map
      removeControl: function(t) {
        return t.remove(), this;
      },
      _initControlPos: function() {
        var t = this._controlCorners = {}, e = "leaflet-", i = this._controlContainer = R("div", e + "control-container", this._container);
        function n(s, l) {
          var p = e + s + " " + e + l;
          t[s + l] = R("div", p, i);
        }
        n("top", "left"), n("top", "right"), n("bottom", "left"), n("bottom", "right");
      },
      _clearControlPos: function() {
        for (var t in this._controlCorners)
          W(this._controlCorners[t]);
        W(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
      }
    });
    var wn = pt.extend({
      // @section
      // @aka Control.Layers options
      options: {
        // @option collapsed: Boolean = true
        // If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
        collapsed: !0,
        position: "topright",
        // @option autoZIndex: Boolean = true
        // If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
        autoZIndex: !0,
        // @option hideSingleBase: Boolean = false
        // If `true`, the base layers in the control will be hidden when there is only one.
        hideSingleBase: !1,
        // @option sortLayers: Boolean = false
        // Whether to sort the layers. When `false`, layers will keep the order
        // in which they were added to the control.
        sortLayers: !1,
        // @option sortFunction: Function = *
        // A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
        // that will be used for sorting the layers, when `sortLayers` is `true`.
        // The function receives both the `L.Layer` instances and their names, as in
        // `sortFunction(layerA, layerB, nameA, nameB)`.
        // By default, it sorts layers alphabetically by their name.
        sortFunction: function(t, e, i, n) {
          return i < n ? -1 : n < i ? 1 : 0;
        }
      },
      initialize: function(t, e, i) {
        C(this, i), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
        for (var n in t)
          this._addLayer(t[n], n);
        for (n in e)
          this._addLayer(e[n], n, !0);
      },
      onAdd: function(t) {
        this._initLayout(), this._update(), this._map = t, t.on("zoomend", this._checkDisabledLayers, this);
        for (var e = 0; e < this._layers.length; e++)
          this._layers[e].layer.on("add remove", this._onLayerChange, this);
        return this._container;
      },
      addTo: function(t) {
        return pt.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
      },
      onRemove: function() {
        this._map.off("zoomend", this._checkDisabledLayers, this);
        for (var t = 0; t < this._layers.length; t++)
          this._layers[t].layer.off("add remove", this._onLayerChange, this);
      },
      // @method addBaseLayer(layer: Layer, name: String): this
      // Adds a base layer (radio button entry) with the given name to the control.
      addBaseLayer: function(t, e) {
        return this._addLayer(t, e), this._map ? this._update() : this;
      },
      // @method addOverlay(layer: Layer, name: String): this
      // Adds an overlay (checkbox entry) with the given name to the control.
      addOverlay: function(t, e) {
        return this._addLayer(t, e, !0), this._map ? this._update() : this;
      },
      // @method removeLayer(layer: Layer): this
      // Remove the given layer from the control.
      removeLayer: function(t) {
        t.off("add remove", this._onLayerChange, this);
        var e = this._getLayer(d(t));
        return e && this._layers.splice(this._layers.indexOf(e), 1), this._map ? this._update() : this;
      },
      // @method expand(): this
      // Expand the control container if collapsed.
      expand: function() {
        Z(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
        var t = this._map.getSize().y - (this._container.offsetTop + 50);
        return t < this._section.clientHeight ? (Z(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : V(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
      },
      // @method collapse(): this
      // Collapse the control container if expanded.
      collapse: function() {
        return V(this._container, "leaflet-control-layers-expanded"), this;
      },
      _initLayout: function() {
        var t = "leaflet-control-layers", e = this._container = R("div", t), i = this.options.collapsed;
        e.setAttribute("aria-haspopup", !0), ue(e), gi(e);
        var n = this._section = R("section", t + "-list");
        i && (this._map.on("click", this.collapse, this), z(e, {
          mouseenter: this._expandSafely,
          mouseleave: this.collapse
        }, this));
        var s = this._layersLink = R("a", t + "-toggle", e);
        s.href = "#", s.title = "Layers", s.setAttribute("role", "button"), z(s, {
          keydown: function(l) {
            l.keyCode === 13 && this._expandSafely();
          },
          // Certain screen readers intercept the key event and instead send a click event
          click: function(l) {
            it(l), this._expandSafely();
          }
        }, this), i || this.expand(), this._baseLayersList = R("div", t + "-base", n), this._separator = R("div", t + "-separator", n), this._overlaysList = R("div", t + "-overlays", n), e.appendChild(n);
      },
      _getLayer: function(t) {
        for (var e = 0; e < this._layers.length; e++)
          if (this._layers[e] && d(this._layers[e].layer) === t)
            return this._layers[e];
      },
      _addLayer: function(t, e, i) {
        this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
          layer: t,
          name: e,
          overlay: i
        }), this.options.sortLayers && this._layers.sort(a(function(n, s) {
          return this.options.sortFunction(n.layer, s.layer, n.name, s.name);
        }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
      },
      _update: function() {
        if (!this._container)
          return this;
        Te(this._baseLayersList), Te(this._overlaysList), this._layerControlInputs = [];
        var t, e, i, n, s = 0;
        for (i = 0; i < this._layers.length; i++)
          n = this._layers[i], this._addItem(n), e = e || n.overlay, t = t || !n.overlay, s += n.overlay ? 0 : 1;
        return this.options.hideSingleBase && (t = t && s > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = e && t ? "" : "none", this;
      },
      _onLayerChange: function(t) {
        this._handlingClick || this._update();
        var e = this._getLayer(d(t.target)), i = e.overlay ? t.type === "add" ? "overlayadd" : "overlayremove" : t.type === "add" ? "baselayerchange" : null;
        i && this._map.fire(i, e);
      },
      // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
      _createRadioElement: function(t, e) {
        var i = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (e ? ' checked="checked"' : "") + "/>", n = document.createElement("div");
        return n.innerHTML = i, n.firstChild;
      },
      _addItem: function(t) {
        var e = document.createElement("label"), i = this._map.hasLayer(t.layer), n;
        t.overlay ? (n = document.createElement("input"), n.type = "checkbox", n.className = "leaflet-control-layers-selector", n.defaultChecked = i) : n = this._createRadioElement("leaflet-base-layers_" + d(this), i), this._layerControlInputs.push(n), n.layerId = d(t.layer), z(n, "click", this._onInputClick, this);
        var s = document.createElement("span");
        s.innerHTML = " " + t.name;
        var l = document.createElement("span");
        e.appendChild(l), l.appendChild(n), l.appendChild(s);
        var p = t.overlay ? this._overlaysList : this._baseLayersList;
        return p.appendChild(e), this._checkDisabledLayers(), e;
      },
      _onInputClick: function() {
        if (!this._preventClick) {
          var t = this._layerControlInputs, e, i, n = [], s = [];
          this._handlingClick = !0;
          for (var l = t.length - 1; l >= 0; l--)
            e = t[l], i = this._getLayer(e.layerId).layer, e.checked ? n.push(i) : e.checked || s.push(i);
          for (l = 0; l < s.length; l++)
            this._map.hasLayer(s[l]) && this._map.removeLayer(s[l]);
          for (l = 0; l < n.length; l++)
            this._map.hasLayer(n[l]) || this._map.addLayer(n[l]);
          this._handlingClick = !1, this._refocusOnMap();
        }
      },
      _checkDisabledLayers: function() {
        for (var t = this._layerControlInputs, e, i, n = this._map.getZoom(), s = t.length - 1; s >= 0; s--)
          e = t[s], i = this._getLayer(e.layerId).layer, e.disabled = i.options.minZoom !== void 0 && n < i.options.minZoom || i.options.maxZoom !== void 0 && n > i.options.maxZoom;
      },
      _expandIfNotCollapsed: function() {
        return this._map && !this.options.collapsed && this.expand(), this;
      },
      _expandSafely: function() {
        var t = this._section;
        this._preventClick = !0, z(t, "click", it), this.expand();
        var e = this;
        setTimeout(function() {
          G(t, "click", it), e._preventClick = !1;
        });
      }
    }), ls = function(t, e, i) {
      return new wn(t, e, i);
    }, yi = pt.extend({
      // @section
      // @aka Control.Zoom options
      options: {
        position: "topleft",
        // @option zoomInText: String = '<span aria-hidden="true">+</span>'
        // The text set on the 'zoom in' button.
        zoomInText: '<span aria-hidden="true">+</span>',
        // @option zoomInTitle: String = 'Zoom in'
        // The title set on the 'zoom in' button.
        zoomInTitle: "Zoom in",
        // @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
        // The text set on the 'zoom out' button.
        zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
        // @option zoomOutTitle: String = 'Zoom out'
        // The title set on the 'zoom out' button.
        zoomOutTitle: "Zoom out"
      },
      onAdd: function(t) {
        var e = "leaflet-control-zoom", i = R("div", e + " leaflet-bar"), n = this.options;
        return this._zoomInButton = this._createButton(
          n.zoomInText,
          n.zoomInTitle,
          e + "-in",
          i,
          this._zoomIn
        ), this._zoomOutButton = this._createButton(
          n.zoomOutText,
          n.zoomOutTitle,
          e + "-out",
          i,
          this._zoomOut
        ), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), i;
      },
      onRemove: function(t) {
        t.off("zoomend zoomlevelschange", this._updateDisabled, this);
      },
      disable: function() {
        return this._disabled = !0, this._updateDisabled(), this;
      },
      enable: function() {
        return this._disabled = !1, this._updateDisabled(), this;
      },
      _zoomIn: function(t) {
        !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
      },
      _zoomOut: function(t) {
        !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
      },
      _createButton: function(t, e, i, n, s) {
        var l = R("a", i, n);
        return l.innerHTML = t, l.href = "#", l.title = e, l.setAttribute("role", "button"), l.setAttribute("aria-label", e), ue(l), z(l, "click", Bt), z(l, "click", s, this), z(l, "click", this._refocusOnMap, this), l;
      },
      _updateDisabled: function() {
        var t = this._map, e = "leaflet-disabled";
        V(this._zoomInButton, e), V(this._zoomOutButton, e), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && (Z(this._zoomOutButton, e), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && (Z(this._zoomInButton, e), this._zoomInButton.setAttribute("aria-disabled", "true"));
      }
    });
    N.mergeOptions({
      zoomControl: !0
    }), N.addInitHook(function() {
      this.options.zoomControl && (this.zoomControl = new yi(), this.addControl(this.zoomControl));
    });
    var us = function(t) {
      return new yi(t);
    }, xn = pt.extend({
      // @section
      // @aka Control.Scale options
      options: {
        position: "bottomleft",
        // @option maxWidth: Number = 100
        // Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
        maxWidth: 100,
        // @option metric: Boolean = True
        // Whether to show the metric scale line (m/km).
        metric: !0,
        // @option imperial: Boolean = True
        // Whether to show the imperial scale line (mi/ft).
        imperial: !0
        // @option updateWhenIdle: Boolean = false
        // If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
      },
      onAdd: function(t) {
        var e = "leaflet-control-scale", i = R("div", e), n = this.options;
        return this._addScales(n, e + "-line", i), t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), i;
      },
      onRemove: function(t) {
        t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
      },
      _addScales: function(t, e, i) {
        t.metric && (this._mScale = R("div", e, i)), t.imperial && (this._iScale = R("div", e, i));
      },
      _update: function() {
        var t = this._map, e = t.getSize().y / 2, i = t.distance(
          t.containerPointToLatLng([0, e]),
          t.containerPointToLatLng([this.options.maxWidth, e])
        );
        this._updateScales(i);
      },
      _updateScales: function(t) {
        this.options.metric && t && this._updateMetric(t), this.options.imperial && t && this._updateImperial(t);
      },
      _updateMetric: function(t) {
        var e = this._getRoundNum(t), i = e < 1e3 ? e + " m" : e / 1e3 + " km";
        this._updateScale(this._mScale, i, e / t);
      },
      _updateImperial: function(t) {
        var e = t * 3.2808399, i, n, s;
        e > 5280 ? (i = e / 5280, n = this._getRoundNum(i), this._updateScale(this._iScale, n + " mi", n / i)) : (s = this._getRoundNum(e), this._updateScale(this._iScale, s + " ft", s / e));
      },
      _updateScale: function(t, e, i) {
        t.style.width = Math.round(this.options.maxWidth * i) + "px", t.innerHTML = e;
      },
      _getRoundNum: function(t) {
        var e = Math.pow(10, (Math.floor(t) + "").length - 1), i = t / e;
        return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1, e * i;
      }
    }), cs = function(t) {
      return new xn(t);
    }, ds = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Li = pt.extend({
      // @section
      // @aka Control.Attribution options
      options: {
        position: "bottomright",
        // @option prefix: String|false = 'Leaflet'
        // The HTML text shown before the attributions. Pass `false` to disable.
        prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (S.inlineSvg ? ds + " " : "") + "Leaflet</a>"
      },
      initialize: function(t) {
        C(this, t), this._attributions = {};
      },
      onAdd: function(t) {
        t.attributionControl = this, this._container = R("div", "leaflet-control-attribution"), ue(this._container);
        for (var e in t._layers)
          t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
        return this._update(), t.on("layeradd", this._addAttribution, this), this._container;
      },
      onRemove: function(t) {
        t.off("layeradd", this._addAttribution, this);
      },
      _addAttribution: function(t) {
        t.layer.getAttribution && (this.addAttribution(t.layer.getAttribution()), t.layer.once("remove", function() {
          this.removeAttribution(t.layer.getAttribution());
        }, this));
      },
      // @method setPrefix(prefix: String|false): this
      // The HTML text shown before the attributions. Pass `false` to disable.
      setPrefix: function(t) {
        return this.options.prefix = t, this._update(), this;
      },
      // @method addAttribution(text: String): this
      // Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
      addAttribution: function(t) {
        return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : this;
      },
      // @method removeAttribution(text: String): this
      // Removes an attribution text.
      removeAttribution: function(t) {
        return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : this;
      },
      _update: function() {
        if (this._map) {
          var t = [];
          for (var e in this._attributions)
            this._attributions[e] && t.push(e);
          var i = [];
          this.options.prefix && i.push(this.options.prefix), t.length && i.push(t.join(", ")), this._container.innerHTML = i.join(' <span aria-hidden="true">|</span> ');
        }
      }
    });
    N.mergeOptions({
      attributionControl: !0
    }), N.addInitHook(function() {
      this.options.attributionControl && new Li().addTo(this);
    });
    var fs = function(t) {
      return new Li(t);
    };
    pt.Layers = wn, pt.Zoom = yi, pt.Scale = xn, pt.Attribution = Li, ce.layers = ls, ce.zoom = us, ce.scale = cs, ce.attribution = fs;
    var yt = wt.extend({
      initialize: function(t) {
        this._map = t;
      },
      // @method enable(): this
      // Enables the handler
      enable: function() {
        return this._enabled ? this : (this._enabled = !0, this.addHooks(), this);
      },
      // @method disable(): this
      // Disables the handler
      disable: function() {
        return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this;
      },
      // @method enabled(): Boolean
      // Returns `true` if the handler is enabled
      enabled: function() {
        return !!this._enabled;
      }
      // @section Extension methods
      // Classes inheriting from `Handler` must implement the two following methods:
      // @method addHooks()
      // Called when the handler is enabled, should add event hooks.
      // @method removeHooks()
      // Called when the handler is disabled, should remove the event hooks added previously.
    });
    yt.addTo = function(t, e) {
      return t.addHandler(e, this), this;
    };
    var _s = { Events: lt }, Pn = S.touch ? "touchstart mousedown" : "mousedown", kt = ie.extend({
      options: {
        // @section
        // @aka Draggable options
        // @option clickTolerance: Number = 3
        // The max number of pixels a user can shift the mouse pointer during a click
        // for it to be considered a valid click (as opposed to a mouse drag).
        clickTolerance: 3
      },
      // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
      // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
      initialize: function(t, e, i, n) {
        C(this, n), this._element = t, this._dragStartTarget = e || t, this._preventOutline = i;
      },
      // @method enable()
      // Enables the dragging ability
      enable: function() {
        this._enabled || (z(this._dragStartTarget, Pn, this._onDown, this), this._enabled = !0);
      },
      // @method disable()
      // Disables the dragging ability
      disable: function() {
        this._enabled && (kt._dragging === this && this.finishDrag(!0), G(this._dragStartTarget, Pn, this._onDown, this), this._enabled = !1, this._moved = !1);
      },
      _onDown: function(t) {
        if (this._enabled && (this._moved = !1, !ri(this._element, "leaflet-zoom-anim"))) {
          if (t.touches && t.touches.length !== 1) {
            kt._dragging === this && this.finishDrag();
            return;
          }
          if (!(kt._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (kt._dragging = this, this._preventOutline && di(this._element), li(), ae(), !this._moving)) {
            this.fire("down");
            var e = t.touches ? t.touches[0] : t, i = pn(this._element);
            this._startPoint = new O(e.clientX, e.clientY), this._startPos = Zt(this._element), this._parentScale = fi(i);
            var n = t.type === "mousedown";
            z(document, n ? "mousemove" : "touchmove", this._onMove, this), z(document, n ? "mouseup" : "touchend touchcancel", this._onUp, this);
          }
        }
      },
      _onMove: function(t) {
        if (this._enabled) {
          if (t.touches && t.touches.length > 1) {
            this._moved = !0;
            return;
          }
          var e = t.touches && t.touches.length === 1 ? t.touches[0] : t, i = new O(e.clientX, e.clientY)._subtract(this._startPoint);
          !i.x && !i.y || Math.abs(i.x) + Math.abs(i.y) < this.options.clickTolerance || (i.x /= this._parentScale.x, i.y /= this._parentScale.y, it(t), this._moved || (this.fire("dragstart"), this._moved = !0, Z(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), Z(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(i), this._moving = !0, this._lastEvent = t, this._updatePosition());
        }
      },
      _updatePosition: function() {
        var t = { originalEvent: this._lastEvent };
        this.fire("predrag", t), K(this._element, this._newPos), this.fire("drag", t);
      },
      _onUp: function() {
        this._enabled && this.finishDrag();
      },
      finishDrag: function(t) {
        V(document.body, "leaflet-dragging"), this._lastTarget && (V(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), G(document, "mousemove touchmove", this._onMove, this), G(document, "mouseup touchend touchcancel", this._onUp, this), ui(), he();
        var e = this._moved && this._moving;
        this._moving = !1, kt._dragging = !1, e && this.fire("dragend", {
          noInertia: t,
          distance: this._newPos.distanceTo(this._startPos)
        });
      }
    });
    function bn(t, e, i) {
      var n, s = [1, 4, 2, 8], l, p, v, y, b, M, E, I;
      for (l = 0, M = t.length; l < M; l++)
        t[l]._code = Nt(t[l], e);
      for (v = 0; v < 4; v++) {
        for (E = s[v], n = [], l = 0, M = t.length, p = M - 1; l < M; p = l++)
          y = t[l], b = t[p], y._code & E ? b._code & E || (I = Oe(b, y, E, e, i), I._code = Nt(I, e), n.push(I)) : (b._code & E && (I = Oe(b, y, E, e, i), I._code = Nt(I, e), n.push(I)), n.push(y));
        t = n;
      }
      return t;
    }
    function Cn(t, e) {
      var i, n, s, l, p, v, y, b, M;
      if (!t || t.length === 0)
        throw new Error("latlngs not passed");
      dt(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
      var E = B([0, 0]), I = q(t), ot = I.getNorthWest().distanceTo(I.getSouthWest()) * I.getNorthEast().distanceTo(I.getNorthWest());
      ot < 1700 && (E = wi(t));
      var Q = t.length, ft = [];
      for (i = 0; i < Q; i++) {
        var ht = B(t[i]);
        ft.push(e.project(B([ht.lat - E.lat, ht.lng - E.lng])));
      }
      for (v = y = b = 0, i = 0, n = Q - 1; i < Q; n = i++)
        s = ft[i], l = ft[n], p = s.y * l.x - l.y * s.x, y += (s.x + l.x) * p, b += (s.y + l.y) * p, v += p * 3;
      v === 0 ? M = ft[0] : M = [y / v, b / v];
      var Yt = e.unproject(A(M));
      return B([Yt.lat + E.lat, Yt.lng + E.lng]);
    }
    function wi(t) {
      for (var e = 0, i = 0, n = 0, s = 0; s < t.length; s++) {
        var l = B(t[s]);
        e += l.lat, i += l.lng, n++;
      }
      return B([e / n, i / n]);
    }
    var ps = {
      __proto__: null,
      clipPolygon: bn,
      polygonCenter: Cn,
      centroid: wi
    };
    function Mn(t, e) {
      if (!e || !t.length)
        return t.slice();
      var i = e * e;
      return t = vs(t, i), t = gs(t, i), t;
    }
    function Tn(t, e, i) {
      return Math.sqrt(de(t, e, i, !0));
    }
    function ms(t, e, i) {
      return de(t, e, i);
    }
    function gs(t, e) {
      var i = t.length, n = typeof Uint8Array < "u" ? Uint8Array : Array, s = new n(i);
      s[0] = s[i - 1] = 1, xi(t, s, e, 0, i - 1);
      var l, p = [];
      for (l = 0; l < i; l++)
        s[l] && p.push(t[l]);
      return p;
    }
    function xi(t, e, i, n, s) {
      var l = 0, p, v, y;
      for (v = n + 1; v <= s - 1; v++)
        y = de(t[v], t[n], t[s], !0), y > l && (p = v, l = y);
      l > i && (e[p] = 1, xi(t, e, i, n, p), xi(t, e, i, p, s));
    }
    function vs(t, e) {
      for (var i = [t[0]], n = 1, s = 0, l = t.length; n < l; n++)
        ys(t[n], t[s]) > e && (i.push(t[n]), s = n);
      return s < l - 1 && i.push(t[l - 1]), i;
    }
    var Sn;
    function kn(t, e, i, n, s) {
      var l = n ? Sn : Nt(t, i), p = Nt(e, i), v, y, b;
      for (Sn = p; ; ) {
        if (!(l | p))
          return [t, e];
        if (l & p)
          return !1;
        v = l || p, y = Oe(t, e, v, i, s), b = Nt(y, i), v === l ? (t = y, l = b) : (e = y, p = b);
      }
    }
    function Oe(t, e, i, n, s) {
      var l = e.x - t.x, p = e.y - t.y, v = n.min, y = n.max, b, M;
      return i & 8 ? (b = t.x + l * (y.y - t.y) / p, M = y.y) : i & 4 ? (b = t.x + l * (v.y - t.y) / p, M = v.y) : i & 2 ? (b = y.x, M = t.y + p * (y.x - t.x) / l) : i & 1 && (b = v.x, M = t.y + p * (v.x - t.x) / l), new O(b, M, s);
    }
    function Nt(t, e) {
      var i = 0;
      return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2), t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8), i;
    }
    function ys(t, e) {
      var i = e.x - t.x, n = e.y - t.y;
      return i * i + n * n;
    }
    function de(t, e, i, n) {
      var s = e.x, l = e.y, p = i.x - s, v = i.y - l, y = p * p + v * v, b;
      return y > 0 && (b = ((t.x - s) * p + (t.y - l) * v) / y, b > 1 ? (s = i.x, l = i.y) : b > 0 && (s += p * b, l += v * b)), p = t.x - s, v = t.y - l, n ? p * p + v * v : new O(s, l);
    }
    function dt(t) {
      return !F(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
    }
    function En(t) {
      return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), dt(t);
    }
    function An(t, e) {
      var i, n, s, l, p, v, y, b;
      if (!t || t.length === 0)
        throw new Error("latlngs not passed");
      dt(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
      var M = B([0, 0]), E = q(t), I = E.getNorthWest().distanceTo(E.getSouthWest()) * E.getNorthEast().distanceTo(E.getNorthWest());
      I < 1700 && (M = wi(t));
      var ot = t.length, Q = [];
      for (i = 0; i < ot; i++) {
        var ft = B(t[i]);
        Q.push(e.project(B([ft.lat - M.lat, ft.lng - M.lng])));
      }
      for (i = 0, n = 0; i < ot - 1; i++)
        n += Q[i].distanceTo(Q[i + 1]) / 2;
      if (n === 0)
        b = Q[0];
      else
        for (i = 0, l = 0; i < ot - 1; i++)
          if (p = Q[i], v = Q[i + 1], s = p.distanceTo(v), l += s, l > n) {
            y = (l - n) / s, b = [
              v.x - y * (v.x - p.x),
              v.y - y * (v.y - p.y)
            ];
            break;
          }
      var ht = e.unproject(A(b));
      return B([ht.lat + M.lat, ht.lng + M.lng]);
    }
    var Ls = {
      __proto__: null,
      simplify: Mn,
      pointToSegmentDistance: Tn,
      closestPointOnSegment: ms,
      clipSegment: kn,
      _getEdgeIntersection: Oe,
      _getBitCode: Nt,
      _sqClosestPointOnSegment: de,
      isFlat: dt,
      _flat: En,
      polylineCenter: An
    }, Pi = {
      project: function(t) {
        return new O(t.lng, t.lat);
      },
      unproject: function(t) {
        return new U(t.y, t.x);
      },
      bounds: new $([-180, -90], [180, 90])
    }, bi = {
      R: 6378137,
      R_MINOR: 6356752314245179e-9,
      bounds: new $([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
      project: function(t) {
        var e = Math.PI / 180, i = this.R, n = t.lat * e, s = this.R_MINOR / i, l = Math.sqrt(1 - s * s), p = l * Math.sin(n), v = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - p) / (1 + p), l / 2);
        return n = -i * Math.log(Math.max(v, 1e-10)), new O(t.lng * e * i, n);
      },
      unproject: function(t) {
        for (var e = 180 / Math.PI, i = this.R, n = this.R_MINOR / i, s = Math.sqrt(1 - n * n), l = Math.exp(-t.y / i), p = Math.PI / 2 - 2 * Math.atan(l), v = 0, y = 0.1, b; v < 15 && Math.abs(y) > 1e-7; v++)
          b = s * Math.sin(p), b = Math.pow((1 - b) / (1 + b), s / 2), y = Math.PI / 2 - 2 * Math.atan(l * b) - p, p += y;
        return new U(p * e, t.x * e / i);
      }
    }, ws = {
      __proto__: null,
      LonLat: Pi,
      Mercator: bi,
      SphericalMercator: Ye
    }, xs = _({}, St, {
      code: "EPSG:3395",
      projection: bi,
      transformation: function() {
        var t = 0.5 / (Math.PI * bi.R);
        return ne(t, 0.5, -t, 0.5);
      }()
    }), On = _({}, St, {
      code: "EPSG:4326",
      projection: Pi,
      transformation: ne(1 / 180, 1, -1 / 180, 0.5)
    }), Ps = _({}, xt, {
      projection: Pi,
      transformation: ne(1, 0, -1, 0),
      scale: function(t) {
        return Math.pow(2, t);
      },
      zoom: function(t) {
        return Math.log(t) / Math.LN2;
      },
      distance: function(t, e) {
        var i = e.lng - t.lng, n = e.lat - t.lat;
        return Math.sqrt(i * i + n * n);
      },
      infinite: !0
    });
    xt.Earth = St, xt.EPSG3395 = xs, xt.EPSG3857 = Je, xt.EPSG900913 = ko, xt.EPSG4326 = On, xt.Simple = Ps;
    var mt = ie.extend({
      // Classes extending `L.Layer` will inherit the following options:
      options: {
        // @option pane: String = 'overlayPane'
        // By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
        pane: "overlayPane",
        // @option attribution: String = null
        // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
        attribution: null,
        bubblingMouseEvents: !0
      },
      /* @section
       * Classes extending `L.Layer` will inherit the following methods:
       *
       * @method addTo(map: Map|LayerGroup): this
       * Adds the layer to the given map or layer group.
       */
      addTo: function(t) {
        return t.addLayer(this), this;
      },
      // @method remove: this
      // Removes the layer from the map it is currently active on.
      remove: function() {
        return this.removeFrom(this._map || this._mapToAdd);
      },
      // @method removeFrom(map: Map): this
      // Removes the layer from the given map
      //
      // @alternative
      // @method removeFrom(group: LayerGroup): this
      // Removes the layer from the given `LayerGroup`
      removeFrom: function(t) {
        return t && t.removeLayer(this), this;
      },
      // @method getPane(name? : String): HTMLElement
      // Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
      getPane: function(t) {
        return this._map.getPane(t ? this.options[t] || t : this.options.pane);
      },
      addInteractiveTarget: function(t) {
        return this._map._targets[d(t)] = this, this;
      },
      removeInteractiveTarget: function(t) {
        return delete this._map._targets[d(t)], this;
      },
      // @method getAttribution: String
      // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
      getAttribution: function() {
        return this.options.attribution;
      },
      _layerAdd: function(t) {
        var e = t.target;
        if (e.hasLayer(this)) {
          if (this._map = e, this._zoomAnimated = e._zoomAnimated, this.getEvents) {
            var i = this.getEvents();
            e.on(i, this), this.once("remove", function() {
              e.off(i, this);
            }, this);
          }
          this.onAdd(e), this.fire("add"), e.fire("layeradd", { layer: this });
        }
      }
    });
    N.include({
      // @method addLayer(layer: Layer): this
      // Adds the given layer to the map
      addLayer: function(t) {
        if (!t._layerAdd)
          throw new Error("The provided object is not a Layer.");
        var e = d(t);
        return this._layers[e] ? this : (this._layers[e] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this);
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the map.
      removeLayer: function(t) {
        var e = d(t);
        return this._layers[e] ? (this._loaded && t.onRemove(this), delete this._layers[e], this._loaded && (this.fire("layerremove", { layer: t }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the map
      hasLayer: function(t) {
        return d(t) in this._layers;
      },
      /* @method eachLayer(fn: Function, context?: Object): this
       * Iterates over the layers of the map, optionally specifying context of the iterator function.
       * ```
       * map.eachLayer(function(layer){
       *     layer.bindPopup('Hello');
       * });
       * ```
       */
      eachLayer: function(t, e) {
        for (var i in this._layers)
          t.call(e, this._layers[i]);
        return this;
      },
      _addLayers: function(t) {
        t = t ? F(t) ? t : [t] : [];
        for (var e = 0, i = t.length; e < i; e++)
          this.addLayer(t[e]);
      },
      _addZoomLimit: function(t) {
        (!isNaN(t.options.maxZoom) || !isNaN(t.options.minZoom)) && (this._zoomBoundLayers[d(t)] = t, this._updateZoomLevels());
      },
      _removeZoomLimit: function(t) {
        var e = d(t);
        this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels());
      },
      _updateZoomLevels: function() {
        var t = 1 / 0, e = -1 / 0, i = this._getZoomSpan();
        for (var n in this._zoomBoundLayers) {
          var s = this._zoomBoundLayers[n].options;
          t = s.minZoom === void 0 ? t : Math.min(t, s.minZoom), e = s.maxZoom === void 0 ? e : Math.max(e, s.maxZoom);
        }
        this._layersMaxZoom = e === -1 / 0 ? void 0 : e, this._layersMinZoom = t === 1 / 0 ? void 0 : t, i !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
      }
    });
    var Wt = mt.extend({
      initialize: function(t, e) {
        C(this, e), this._layers = {};
        var i, n;
        if (t)
          for (i = 0, n = t.length; i < n; i++)
            this.addLayer(t[i]);
      },
      // @method addLayer(layer: Layer): this
      // Adds the given layer to the group.
      addLayer: function(t) {
        var e = this.getLayerId(t);
        return this._layers[e] = t, this._map && this._map.addLayer(t), this;
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the group.
      // @alternative
      // @method removeLayer(id: Number): this
      // Removes the layer with the given internal ID from the group.
      removeLayer: function(t) {
        var e = t in this._layers ? t : this.getLayerId(t);
        return this._map && this._layers[e] && this._map.removeLayer(this._layers[e]), delete this._layers[e], this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the group.
      // @alternative
      // @method hasLayer(id: Number): Boolean
      // Returns `true` if the given internal ID is currently added to the group.
      hasLayer: function(t) {
        var e = typeof t == "number" ? t : this.getLayerId(t);
        return e in this._layers;
      },
      // @method clearLayers(): this
      // Removes all the layers from the group.
      clearLayers: function() {
        return this.eachLayer(this.removeLayer, this);
      },
      // @method invoke(methodName: String, …): this
      // Calls `methodName` on every layer contained in this group, passing any
      // additional parameters. Has no effect if the layers contained do not
      // implement `methodName`.
      invoke: function(t) {
        var e = Array.prototype.slice.call(arguments, 1), i, n;
        for (i in this._layers)
          n = this._layers[i], n[t] && n[t].apply(n, e);
        return this;
      },
      onAdd: function(t) {
        this.eachLayer(t.addLayer, t);
      },
      onRemove: function(t) {
        this.eachLayer(t.removeLayer, t);
      },
      // @method eachLayer(fn: Function, context?: Object): this
      // Iterates over the layers of the group, optionally specifying context of the iterator function.
      // ```js
      // group.eachLayer(function (layer) {
      // 	layer.bindPopup('Hello');
      // });
      // ```
      eachLayer: function(t, e) {
        for (var i in this._layers)
          t.call(e, this._layers[i]);
        return this;
      },
      // @method getLayer(id: Number): Layer
      // Returns the layer with the given internal ID.
      getLayer: function(t) {
        return this._layers[t];
      },
      // @method getLayers(): Layer[]
      // Returns an array of all the layers added to the group.
      getLayers: function() {
        var t = [];
        return this.eachLayer(t.push, t), t;
      },
      // @method setZIndex(zIndex: Number): this
      // Calls `setZIndex` on every layer contained in this group, passing the z-index.
      setZIndex: function(t) {
        return this.invoke("setZIndex", t);
      },
      // @method getLayerId(layer: Layer): Number
      // Returns the internal ID for a layer
      getLayerId: function(t) {
        return d(t);
      }
    }), bs = function(t, e) {
      return new Wt(t, e);
    }, Pt = Wt.extend({
      addLayer: function(t) {
        return this.hasLayer(t) ? this : (t.addEventParent(this), Wt.prototype.addLayer.call(this, t), this.fire("layeradd", { layer: t }));
      },
      removeLayer: function(t) {
        return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), Wt.prototype.removeLayer.call(this, t), this.fire("layerremove", { layer: t })) : this;
      },
      // @method setStyle(style: Path options): this
      // Sets the given path options to each layer of the group that has a `setStyle` method.
      setStyle: function(t) {
        return this.invoke("setStyle", t);
      },
      // @method bringToFront(): this
      // Brings the layer group to the top of all other layers
      bringToFront: function() {
        return this.invoke("bringToFront");
      },
      // @method bringToBack(): this
      // Brings the layer group to the back of all other layers
      bringToBack: function() {
        return this.invoke("bringToBack");
      },
      // @method getBounds(): LatLngBounds
      // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
      getBounds: function() {
        var t = new at();
        for (var e in this._layers) {
          var i = this._layers[e];
          t.extend(i.getBounds ? i.getBounds() : i.getLatLng());
        }
        return t;
      }
    }), Cs = function(t, e) {
      return new Pt(t, e);
    }, Vt = wt.extend({
      /* @section
       * @aka Icon options
       *
       * @option iconUrl: String = null
       * **(required)** The URL to the icon image (absolute or relative to your script path).
       *
       * @option iconRetinaUrl: String = null
       * The URL to a retina sized version of the icon image (absolute or relative to your
       * script path). Used for Retina screen devices.
       *
       * @option iconSize: Point = null
       * Size of the icon image in pixels.
       *
       * @option iconAnchor: Point = null
       * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
       * will be aligned so that this point is at the marker's geographical location. Centered
       * by default if size is specified, also can be set in CSS with negative margins.
       *
       * @option popupAnchor: Point = [0, 0]
       * The coordinates of the point from which popups will "open", relative to the icon anchor.
       *
       * @option tooltipAnchor: Point = [0, 0]
       * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
       *
       * @option shadowUrl: String = null
       * The URL to the icon shadow image. If not specified, no shadow image will be created.
       *
       * @option shadowRetinaUrl: String = null
       *
       * @option shadowSize: Point = null
       * Size of the shadow image in pixels.
       *
       * @option shadowAnchor: Point = null
       * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
       * as iconAnchor if not specified).
       *
       * @option className: String = ''
       * A custom class name to assign to both icon and shadow images. Empty by default.
       */
      options: {
        popupAnchor: [0, 0],
        tooltipAnchor: [0, 0],
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: !1
      },
      initialize: function(t) {
        C(this, t);
      },
      // @method createIcon(oldIcon?: HTMLElement): HTMLElement
      // Called internally when the icon has to be shown, returns a `<img>` HTML element
      // styled according to the options.
      createIcon: function(t) {
        return this._createIcon("icon", t);
      },
      // @method createShadow(oldIcon?: HTMLElement): HTMLElement
      // As `createIcon`, but for the shadow beneath it.
      createShadow: function(t) {
        return this._createIcon("shadow", t);
      },
      _createIcon: function(t, e) {
        var i = this._getIconUrl(t);
        if (!i) {
          if (t === "icon")
            throw new Error("iconUrl not set in Icon options (see the docs).");
          return null;
        }
        var n = this._createImg(i, e && e.tagName === "IMG" ? e : null);
        return this._setIconStyles(n, t), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), n;
      },
      _setIconStyles: function(t, e) {
        var i = this.options, n = i[e + "Size"];
        typeof n == "number" && (n = [n, n]);
        var s = A(n), l = A(e === "shadow" && i.shadowAnchor || i.iconAnchor || s && s.divideBy(2, !0));
        t.className = "leaflet-marker-" + e + " " + (i.className || ""), l && (t.style.marginLeft = -l.x + "px", t.style.marginTop = -l.y + "px"), s && (t.style.width = s.x + "px", t.style.height = s.y + "px");
      },
      _createImg: function(t, e) {
        return e = e || document.createElement("img"), e.src = t, e;
      },
      _getIconUrl: function(t) {
        return S.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
      }
    });
    function Ms(t) {
      return new Vt(t);
    }
    var fe = Vt.extend({
      options: {
        iconUrl: "marker-icon.png",
        iconRetinaUrl: "marker-icon-2x.png",
        shadowUrl: "marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      },
      _getIconUrl: function(t) {
        return typeof fe.imagePath != "string" && (fe.imagePath = this._detectIconPath()), (this.options.imagePath || fe.imagePath) + Vt.prototype._getIconUrl.call(this, t);
      },
      _stripUrl: function(t) {
        var e = function(i, n, s) {
          var l = n.exec(i);
          return l && l[s];
        };
        return t = e(t, /^url\((['"])?(.+)\1\)$/, 2), t && e(t, /^(.*)marker-icon\.png$/, 1);
      },
      _detectIconPath: function() {
        var t = R("div", "leaflet-default-icon-path", document.body), e = re(t, "background-image") || re(t, "backgroundImage");
        if (document.body.removeChild(t), e = this._stripUrl(e), e)
          return e;
        var i = document.querySelector('link[href$="leaflet.css"]');
        return i ? i.href.substring(0, i.href.length - 11 - 1) : "";
      }
    }), zn = yt.extend({
      initialize: function(t) {
        this._marker = t;
      },
      addHooks: function() {
        var t = this._marker._icon;
        this._draggable || (this._draggable = new kt(t, t, !0)), this._draggable.on({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).enable(), Z(t, "leaflet-marker-draggable");
      },
      removeHooks: function() {
        this._draggable.off({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).disable(), this._marker._icon && V(this._marker._icon, "leaflet-marker-draggable");
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      _adjustPan: function(t) {
        var e = this._marker, i = e._map, n = this._marker.options.autoPanSpeed, s = this._marker.options.autoPanPadding, l = Zt(e._icon), p = i.getPixelBounds(), v = i.getPixelOrigin(), y = rt(
          p.min._subtract(v).add(s),
          p.max._subtract(v).subtract(s)
        );
        if (!y.contains(l)) {
          var b = A(
            (Math.max(y.max.x, l.x) - y.max.x) / (p.max.x - y.max.x) - (Math.min(y.min.x, l.x) - y.min.x) / (p.min.x - y.min.x),
            (Math.max(y.max.y, l.y) - y.max.y) / (p.max.y - y.max.y) - (Math.min(y.min.y, l.y) - y.min.y) / (p.min.y - y.min.y)
          ).multiplyBy(n);
          i.panBy(b, { animate: !1 }), this._draggable._newPos._add(b), this._draggable._startPos._add(b), K(e._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = st(this._adjustPan.bind(this, t));
        }
      },
      _onDragStart: function() {
        this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
      },
      _onPreDrag: function(t) {
        this._marker.options.autoPan && (ut(this._panRequest), this._panRequest = st(this._adjustPan.bind(this, t)));
      },
      _onDrag: function(t) {
        var e = this._marker, i = e._shadow, n = Zt(e._icon), s = e._map.layerPointToLatLng(n);
        i && K(i, n), e._latlng = s, t.latlng = s, t.oldLatLng = this._oldLatLng, e.fire("move", t).fire("drag", t);
      },
      _onDragEnd: function(t) {
        ut(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
      }
    }), ze = mt.extend({
      // @section
      // @aka Marker options
      options: {
        // @option icon: Icon = *
        // Icon instance to use for rendering the marker.
        // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
        // If not specified, a common instance of `L.Icon.Default` is used.
        icon: new fe(),
        // Option inherited from "Interactive layer" abstract class
        interactive: !0,
        // @option keyboard: Boolean = true
        // Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
        keyboard: !0,
        // @option title: String = ''
        // Text for the browser tooltip that appear on marker hover (no tooltip by default).
        // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
        title: "",
        // @option alt: String = 'Marker'
        // Text for the `alt` attribute of the icon image.
        // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
        alt: "Marker",
        // @option zIndexOffset: Number = 0
        // By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
        zIndexOffset: 0,
        // @option opacity: Number = 1.0
        // The opacity of the marker.
        opacity: 1,
        // @option riseOnHover: Boolean = false
        // If `true`, the marker will get on top of others when you hover the mouse over it.
        riseOnHover: !1,
        // @option riseOffset: Number = 250
        // The z-index offset used for the `riseOnHover` feature.
        riseOffset: 250,
        // @option pane: String = 'markerPane'
        // `Map pane` where the markers icon will be added.
        pane: "markerPane",
        // @option shadowPane: String = 'shadowPane'
        // `Map pane` where the markers shadow will be added.
        shadowPane: "shadowPane",
        // @option bubblingMouseEvents: Boolean = false
        // When `true`, a mouse event on this marker will trigger the same event on the map
        // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
        bubblingMouseEvents: !1,
        // @option autoPanOnFocus: Boolean = true
        // When `true`, the map will pan whenever the marker is focused (via
        // e.g. pressing `tab` on the keyboard) to ensure the marker is
        // visible within the map's bounds
        autoPanOnFocus: !0,
        // @section Draggable marker options
        // @option draggable: Boolean = false
        // Whether the marker is draggable with mouse/touch or not.
        draggable: !1,
        // @option autoPan: Boolean = false
        // Whether to pan the map when dragging this marker near its edge or not.
        autoPan: !1,
        // @option autoPanPadding: Point = Point(50, 50)
        // Distance (in pixels to the left/right and to the top/bottom) of the
        // map edge to start panning the map.
        autoPanPadding: [50, 50],
        // @option autoPanSpeed: Number = 10
        // Number of pixels the map should pan by.
        autoPanSpeed: 10
      },
      /* @section
       *
       * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
       */
      initialize: function(t, e) {
        C(this, e), this._latlng = B(t);
      },
      onAdd: function(t) {
        this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation, this._zoomAnimated && t.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update();
      },
      onRemove: function(t) {
        this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && t.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow();
      },
      getEvents: function() {
        return {
          zoom: this.update,
          viewreset: this.update
        };
      },
      // @method getLatLng: LatLng
      // Returns the current geographical position of the marker.
      getLatLng: function() {
        return this._latlng;
      },
      // @method setLatLng(latlng: LatLng): this
      // Changes the marker position to the given point.
      setLatLng: function(t) {
        var e = this._latlng;
        return this._latlng = B(t), this.update(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
      },
      // @method setZIndexOffset(offset: Number): this
      // Changes the [zIndex offset](#marker-zindexoffset) of the marker.
      setZIndexOffset: function(t) {
        return this.options.zIndexOffset = t, this.update();
      },
      // @method getIcon: Icon
      // Returns the current icon used by the marker
      getIcon: function() {
        return this.options.icon;
      },
      // @method setIcon(icon: Icon): this
      // Changes the marker icon.
      setIcon: function(t) {
        return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this;
      },
      getElement: function() {
        return this._icon;
      },
      update: function() {
        if (this._icon && this._map) {
          var t = this._map.latLngToLayerPoint(this._latlng).round();
          this._setPos(t);
        }
        return this;
      },
      _initIcon: function() {
        var t = this.options, e = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), i = t.icon.createIcon(this._icon), n = !1;
        i !== this._icon && (this._icon && this._removeIcon(), n = !0, t.title && (i.title = t.title), i.tagName === "IMG" && (i.alt = t.alt || "")), Z(i, e), t.keyboard && (i.tabIndex = "0", i.setAttribute("role", "button")), this._icon = i, t.riseOnHover && this.on({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && z(i, "focus", this._panOnFocus, this);
        var s = t.icon.createShadow(this._shadow), l = !1;
        s !== this._shadow && (this._removeShadow(), l = !0), s && (Z(s, e), s.alt = ""), this._shadow = s, t.opacity < 1 && this._updateOpacity(), n && this.getPane().appendChild(this._icon), this._initInteraction(), s && l && this.getPane(t.shadowPane).appendChild(this._shadow);
      },
      _removeIcon: function() {
        this.options.riseOnHover && this.off({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && G(this._icon, "focus", this._panOnFocus, this), W(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
      },
      _removeShadow: function() {
        this._shadow && W(this._shadow), this._shadow = null;
      },
      _setPos: function(t) {
        this._icon && K(this._icon, t), this._shadow && K(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
      },
      _updateZIndex: function(t) {
        this._icon && (this._icon.style.zIndex = this._zIndex + t);
      },
      _animateZoom: function(t) {
        var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
        this._setPos(e);
      },
      _initInteraction: function() {
        if (this.options.interactive && (Z(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), zn)) {
          var t = this.options.draggable;
          this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new zn(this), t && this.dragging.enable();
        }
      },
      // @method setOpacity(opacity: Number): this
      // Changes the opacity of the marker.
      setOpacity: function(t) {
        return this.options.opacity = t, this._map && this._updateOpacity(), this;
      },
      _updateOpacity: function() {
        var t = this.options.opacity;
        this._icon && ct(this._icon, t), this._shadow && ct(this._shadow, t);
      },
      _bringToFront: function() {
        this._updateZIndex(this.options.riseOffset);
      },
      _resetZIndex: function() {
        this._updateZIndex(0);
      },
      _panOnFocus: function() {
        var t = this._map;
        if (t) {
          var e = this.options.icon.options, i = e.iconSize ? A(e.iconSize) : A(0, 0), n = e.iconAnchor ? A(e.iconAnchor) : A(0, 0);
          t.panInside(this._latlng, {
            paddingTopLeft: n,
            paddingBottomRight: i.subtract(n)
          });
        }
      },
      _getPopupAnchor: function() {
        return this.options.icon.options.popupAnchor;
      },
      _getTooltipAnchor: function() {
        return this.options.icon.options.tooltipAnchor;
      }
    });
    function Ts(t, e) {
      return new ze(t, e);
    }
    var Et = mt.extend({
      // @section
      // @aka Path options
      options: {
        // @option stroke: Boolean = true
        // Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
        stroke: !0,
        // @option color: String = '#3388ff'
        // Stroke color
        color: "#3388ff",
        // @option weight: Number = 3
        // Stroke width in pixels
        weight: 3,
        // @option opacity: Number = 1.0
        // Stroke opacity
        opacity: 1,
        // @option lineCap: String= 'round'
        // A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
        lineCap: "round",
        // @option lineJoin: String = 'round'
        // A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
        lineJoin: "round",
        // @option dashArray: String = null
        // A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
        dashArray: null,
        // @option dashOffset: String = null
        // A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
        dashOffset: null,
        // @option fill: Boolean = depends
        // Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
        fill: !1,
        // @option fillColor: String = *
        // Fill color. Defaults to the value of the [`color`](#path-color) option
        fillColor: null,
        // @option fillOpacity: Number = 0.2
        // Fill opacity.
        fillOpacity: 0.2,
        // @option fillRule: String = 'evenodd'
        // A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
        fillRule: "evenodd",
        // className: '',
        // Option inherited from "Interactive layer" abstract class
        interactive: !0,
        // @option bubblingMouseEvents: Boolean = true
        // When `true`, a mouse event on this path will trigger the same event on the map
        // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
        bubblingMouseEvents: !0
      },
      beforeAdd: function(t) {
        this._renderer = t.getRenderer(this);
      },
      onAdd: function() {
        this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
      },
      onRemove: function() {
        this._renderer._removePath(this);
      },
      // @method redraw(): this
      // Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
      redraw: function() {
        return this._map && this._renderer._updatePath(this), this;
      },
      // @method setStyle(style: Path options): this
      // Changes the appearance of a Path based on the options in the `Path options` object.
      setStyle: function(t) {
        return C(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
      },
      // @method bringToFront(): this
      // Brings the layer to the top of all path layers.
      bringToFront: function() {
        return this._renderer && this._renderer._bringToFront(this), this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all path layers.
      bringToBack: function() {
        return this._renderer && this._renderer._bringToBack(this), this;
      },
      getElement: function() {
        return this._path;
      },
      _reset: function() {
        this._project(), this._update();
      },
      _clickTolerance: function() {
        return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
      }
    }), Ze = Et.extend({
      // @section
      // @aka CircleMarker options
      options: {
        fill: !0,
        // @option radius: Number = 10
        // Radius of the circle marker, in pixels
        radius: 10
      },
      initialize: function(t, e) {
        C(this, e), this._latlng = B(t), this._radius = this.options.radius;
      },
      // @method setLatLng(latLng: LatLng): this
      // Sets the position of a circle marker to a new location.
      setLatLng: function(t) {
        var e = this._latlng;
        return this._latlng = B(t), this.redraw(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
      },
      // @method getLatLng(): LatLng
      // Returns the current geographical position of the circle marker
      getLatLng: function() {
        return this._latlng;
      },
      // @method setRadius(radius: Number): this
      // Sets the radius of a circle marker. Units are in pixels.
      setRadius: function(t) {
        return this.options.radius = this._radius = t, this.redraw();
      },
      // @method getRadius(): Number
      // Returns the current radius of the circle
      getRadius: function() {
        return this._radius;
      },
      setStyle: function(t) {
        var e = t && t.radius || this._radius;
        return Et.prototype.setStyle.call(this, t), this.setRadius(e), this;
      },
      _project: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
      },
      _updateBounds: function() {
        var t = this._radius, e = this._radiusY || t, i = this._clickTolerance(), n = [t + i, e + i];
        this._pxBounds = new $(this._point.subtract(n), this._point.add(n));
      },
      _update: function() {
        this._map && this._updatePath();
      },
      _updatePath: function() {
        this._renderer._updateCircle(this);
      },
      _empty: function() {
        return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t) {
        return t.distanceTo(this._point) <= this._radius + this._clickTolerance();
      }
    });
    function Ss(t, e) {
      return new Ze(t, e);
    }
    var Ci = Ze.extend({
      initialize: function(t, e, i) {
        if (typeof e == "number" && (e = _({}, i, { radius: e })), C(this, e), this._latlng = B(t), isNaN(this.options.radius))
          throw new Error("Circle radius cannot be NaN");
        this._mRadius = this.options.radius;
      },
      // @method setRadius(radius: Number): this
      // Sets the radius of a circle. Units are in meters.
      setRadius: function(t) {
        return this._mRadius = t, this.redraw();
      },
      // @method getRadius(): Number
      // Returns the current radius of a circle. Units are in meters.
      getRadius: function() {
        return this._mRadius;
      },
      // @method getBounds(): LatLngBounds
      // Returns the `LatLngBounds` of the path.
      getBounds: function() {
        var t = [this._radius, this._radiusY || this._radius];
        return new at(
          this._map.layerPointToLatLng(this._point.subtract(t)),
          this._map.layerPointToLatLng(this._point.add(t))
        );
      },
      setStyle: Et.prototype.setStyle,
      _project: function() {
        var t = this._latlng.lng, e = this._latlng.lat, i = this._map, n = i.options.crs;
        if (n.distance === St.distance) {
          var s = Math.PI / 180, l = this._mRadius / St.R / s, p = i.project([e + l, t]), v = i.project([e - l, t]), y = p.add(v).divideBy(2), b = i.unproject(y).lat, M = Math.acos((Math.cos(l * s) - Math.sin(e * s) * Math.sin(b * s)) / (Math.cos(e * s) * Math.cos(b * s))) / s;
          (isNaN(M) || M === 0) && (M = l / Math.cos(Math.PI / 180 * e)), this._point = y.subtract(i.getPixelOrigin()), this._radius = isNaN(M) ? 0 : y.x - i.project([b, t - M]).x, this._radiusY = y.y - p.y;
        } else {
          var E = n.unproject(n.project(this._latlng).subtract([this._mRadius, 0]));
          this._point = i.latLngToLayerPoint(this._latlng), this._radius = this._point.x - i.latLngToLayerPoint(E).x;
        }
        this._updateBounds();
      }
    });
    function ks(t, e, i) {
      return new Ci(t, e, i);
    }
    var bt = Et.extend({
      // @section
      // @aka Polyline options
      options: {
        // @option smoothFactor: Number = 1.0
        // How much to simplify the polyline on each zoom level. More means
        // better performance and smoother look, and less means more accurate representation.
        smoothFactor: 1,
        // @option noClip: Boolean = false
        // Disable polyline clipping.
        noClip: !1
      },
      initialize: function(t, e) {
        C(this, e), this._setLatLngs(t);
      },
      // @method getLatLngs(): LatLng[]
      // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
      getLatLngs: function() {
        return this._latlngs;
      },
      // @method setLatLngs(latlngs: LatLng[]): this
      // Replaces all the points in the polyline with the given array of geographical points.
      setLatLngs: function(t) {
        return this._setLatLngs(t), this.redraw();
      },
      // @method isEmpty(): Boolean
      // Returns `true` if the Polyline has no LatLngs.
      isEmpty: function() {
        return !this._latlngs.length;
      },
      // @method closestLayerPoint(p: Point): Point
      // Returns the point closest to `p` on the Polyline.
      closestLayerPoint: function(t) {
        for (var e = 1 / 0, i = null, n = de, s, l, p = 0, v = this._parts.length; p < v; p++)
          for (var y = this._parts[p], b = 1, M = y.length; b < M; b++) {
            s = y[b - 1], l = y[b];
            var E = n(t, s, l, !0);
            E < e && (e = E, i = n(t, s, l));
          }
        return i && (i.distance = Math.sqrt(e)), i;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
      getCenter: function() {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return An(this._defaultShape(), this._map.options.crs);
      },
      // @method getBounds(): LatLngBounds
      // Returns the `LatLngBounds` of the path.
      getBounds: function() {
        return this._bounds;
      },
      // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
      // Adds a given point to the polyline. By default, adds to the first ring of
      // the polyline in case of a multi-polyline, but can be overridden by passing
      // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
      addLatLng: function(t, e) {
        return e = e || this._defaultShape(), t = B(t), e.push(t), this._bounds.extend(t), this.redraw();
      },
      _setLatLngs: function(t) {
        this._bounds = new at(), this._latlngs = this._convertLatLngs(t);
      },
      _defaultShape: function() {
        return dt(this._latlngs) ? this._latlngs : this._latlngs[0];
      },
      // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
      _convertLatLngs: function(t) {
        for (var e = [], i = dt(t), n = 0, s = t.length; n < s; n++)
          i ? (e[n] = B(t[n]), this._bounds.extend(e[n])) : e[n] = this._convertLatLngs(t[n]);
        return e;
      },
      _project: function() {
        var t = new $();
        this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
      },
      _updateBounds: function() {
        var t = this._clickTolerance(), e = new O(t, t);
        this._rawPxBounds && (this._pxBounds = new $([
          this._rawPxBounds.min.subtract(e),
          this._rawPxBounds.max.add(e)
        ]));
      },
      // recursively turns latlngs into a set of rings with projected coordinates
      _projectLatlngs: function(t, e, i) {
        var n = t[0] instanceof U, s = t.length, l, p;
        if (n) {
          for (p = [], l = 0; l < s; l++)
            p[l] = this._map.latLngToLayerPoint(t[l]), i.extend(p[l]);
          e.push(p);
        } else
          for (l = 0; l < s; l++)
            this._projectLatlngs(t[l], e, i);
      },
      // clip polyline by renderer bounds so that we have less to render for performance
      _clipPoints: function() {
        var t = this._renderer._bounds;
        if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          var e = this._parts, i, n, s, l, p, v, y;
          for (i = 0, s = 0, l = this._rings.length; i < l; i++)
            for (y = this._rings[i], n = 0, p = y.length; n < p - 1; n++)
              v = kn(y[n], y[n + 1], t, n, !0), v && (e[s] = e[s] || [], e[s].push(v[0]), (v[1] !== y[n + 1] || n === p - 2) && (e[s].push(v[1]), s++));
        }
      },
      // simplify each clipped part of the polyline for performance
      _simplifyPoints: function() {
        for (var t = this._parts, e = this.options.smoothFactor, i = 0, n = t.length; i < n; i++)
          t[i] = Mn(t[i], e);
      },
      _update: function() {
        this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
      },
      _updatePath: function() {
        this._renderer._updatePoly(this);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t, e) {
        var i, n, s, l, p, v, y = this._clickTolerance();
        if (!this._pxBounds || !this._pxBounds.contains(t))
          return !1;
        for (i = 0, l = this._parts.length; i < l; i++)
          for (v = this._parts[i], n = 0, p = v.length, s = p - 1; n < p; s = n++)
            if (!(!e && n === 0) && Tn(t, v[s], v[n]) <= y)
              return !0;
        return !1;
      }
    });
    function Es(t, e) {
      return new bt(t, e);
    }
    bt._flat = En;
    var jt = bt.extend({
      options: {
        fill: !0
      },
      isEmpty: function() {
        return !this._latlngs.length || !this._latlngs[0].length;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
      getCenter: function() {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return Cn(this._defaultShape(), this._map.options.crs);
      },
      _convertLatLngs: function(t) {
        var e = bt.prototype._convertLatLngs.call(this, t), i = e.length;
        return i >= 2 && e[0] instanceof U && e[0].equals(e[i - 1]) && e.pop(), e;
      },
      _setLatLngs: function(t) {
        bt.prototype._setLatLngs.call(this, t), dt(this._latlngs) && (this._latlngs = [this._latlngs]);
      },
      _defaultShape: function() {
        return dt(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
      },
      _clipPoints: function() {
        var t = this._renderer._bounds, e = this.options.weight, i = new O(e, e);
        if (t = new $(t.min.subtract(i), t.max.add(i)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var n = 0, s = this._rings.length, l; n < s; n++)
            l = bn(this._rings[n], t, !0), l.length && this._parts.push(l);
        }
      },
      _updatePath: function() {
        this._renderer._updatePoly(this, !0);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t) {
        var e = !1, i, n, s, l, p, v, y, b;
        if (!this._pxBounds || !this._pxBounds.contains(t))
          return !1;
        for (l = 0, y = this._parts.length; l < y; l++)
          for (i = this._parts[l], p = 0, b = i.length, v = b - 1; p < b; v = p++)
            n = i[p], s = i[v], n.y > t.y != s.y > t.y && t.x < (s.x - n.x) * (t.y - n.y) / (s.y - n.y) + n.x && (e = !e);
        return e || bt.prototype._containsPoint.call(this, t, !0);
      }
    });
    function As(t, e) {
      return new jt(t, e);
    }
    var Ct = Pt.extend({
      /* @section
       * @aka GeoJSON options
       *
       * @option pointToLayer: Function = *
       * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
       * called when data is added, passing the GeoJSON point feature and its `LatLng`.
       * The default is to spawn a default `Marker`:
       * ```js
       * function(geoJsonPoint, latlng) {
       * 	return L.marker(latlng);
       * }
       * ```
       *
       * @option style: Function = *
       * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
       * called internally when data is added.
       * The default value is to not override any defaults:
       * ```js
       * function (geoJsonFeature) {
       * 	return {}
       * }
       * ```
       *
       * @option onEachFeature: Function = *
       * A `Function` that will be called once for each created `Feature`, after it has
       * been created and styled. Useful for attaching events and popups to features.
       * The default is to do nothing with the newly created layers:
       * ```js
       * function (feature, layer) {}
       * ```
       *
       * @option filter: Function = *
       * A `Function` that will be used to decide whether to include a feature or not.
       * The default is to include all features:
       * ```js
       * function (geoJsonFeature) {
       * 	return true;
       * }
       * ```
       * Note: dynamically changing the `filter` option will have effect only on newly
       * added data. It will _not_ re-evaluate already included features.
       *
       * @option coordsToLatLng: Function = *
       * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
       * The default is the `coordsToLatLng` static method.
       *
       * @option markersInheritOptions: Boolean = false
       * Whether default Markers for "Point" type Features inherit from group options.
       */
      initialize: function(t, e) {
        C(this, e), this._layers = {}, t && this.addData(t);
      },
      // @method addData( <GeoJSON> data ): this
      // Adds a GeoJSON object to the layer.
      addData: function(t) {
        var e = F(t) ? t : t.features, i, n, s;
        if (e) {
          for (i = 0, n = e.length; i < n; i++)
            s = e[i], (s.geometries || s.geometry || s.features || s.coordinates) && this.addData(s);
          return this;
        }
        var l = this.options;
        if (l.filter && !l.filter(t))
          return this;
        var p = Ie(t, l);
        return p ? (p.feature = Re(t), p.defaultOptions = p.options, this.resetStyle(p), l.onEachFeature && l.onEachFeature(t, p), this.addLayer(p)) : this;
      },
      // @method resetStyle( <Path> layer? ): this
      // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
      // If `layer` is omitted, the style of all features in the current layer is reset.
      resetStyle: function(t) {
        return t === void 0 ? this.eachLayer(this.resetStyle, this) : (t.options = _({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this);
      },
      // @method setStyle( <Function> style ): this
      // Changes styles of GeoJSON vector layers with the given style function.
      setStyle: function(t) {
        return this.eachLayer(function(e) {
          this._setLayerStyle(e, t);
        }, this);
      },
      _setLayerStyle: function(t, e) {
        t.setStyle && (typeof e == "function" && (e = e(t.feature)), t.setStyle(e));
      }
    });
    function Ie(t, e) {
      var i = t.type === "Feature" ? t.geometry : t, n = i ? i.coordinates : null, s = [], l = e && e.pointToLayer, p = e && e.coordsToLatLng || Mi, v, y, b, M;
      if (!n && !i)
        return null;
      switch (i.type) {
        case "Point":
          return v = p(n), Zn(l, t, v, e);
        case "MultiPoint":
          for (b = 0, M = n.length; b < M; b++)
            v = p(n[b]), s.push(Zn(l, t, v, e));
          return new Pt(s);
        case "LineString":
        case "MultiLineString":
          return y = Be(n, i.type === "LineString" ? 0 : 1, p), new bt(y, e);
        case "Polygon":
        case "MultiPolygon":
          return y = Be(n, i.type === "Polygon" ? 1 : 2, p), new jt(y, e);
        case "GeometryCollection":
          for (b = 0, M = i.geometries.length; b < M; b++) {
            var E = Ie({
              geometry: i.geometries[b],
              type: "Feature",
              properties: t.properties
            }, e);
            E && s.push(E);
          }
          return new Pt(s);
        case "FeatureCollection":
          for (b = 0, M = i.features.length; b < M; b++) {
            var I = Ie(i.features[b], e);
            I && s.push(I);
          }
          return new Pt(s);
        default:
          throw new Error("Invalid GeoJSON object.");
      }
    }
    function Zn(t, e, i, n) {
      return t ? t(e, i) : new ze(i, n && n.markersInheritOptions && n);
    }
    function Mi(t) {
      return new U(t[1], t[0], t[2]);
    }
    function Be(t, e, i) {
      for (var n = [], s = 0, l = t.length, p; s < l; s++)
        p = e ? Be(t[s], e - 1, i) : (i || Mi)(t[s]), n.push(p);
      return n;
    }
    function Ti(t, e) {
      return t = B(t), t.alt !== void 0 ? [P(t.lng, e), P(t.lat, e), P(t.alt, e)] : [P(t.lng, e), P(t.lat, e)];
    }
    function Ne(t, e, i, n) {
      for (var s = [], l = 0, p = t.length; l < p; l++)
        s.push(e ? Ne(t[l], dt(t[l]) ? 0 : e - 1, i, n) : Ti(t[l], n));
      return !e && i && s.length > 0 && s.push(s[0].slice()), s;
    }
    function qt(t, e) {
      return t.feature ? _({}, t.feature, { geometry: e }) : Re(e);
    }
    function Re(t) {
      return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
        type: "Feature",
        properties: {},
        geometry: t
      };
    }
    var Si = {
      toGeoJSON: function(t) {
        return qt(this, {
          type: "Point",
          coordinates: Ti(this.getLatLng(), t)
        });
      }
    };
    ze.include(Si), Ci.include(Si), Ze.include(Si), bt.include({
      toGeoJSON: function(t) {
        var e = !dt(this._latlngs), i = Ne(this._latlngs, e ? 1 : 0, !1, t);
        return qt(this, {
          type: (e ? "Multi" : "") + "LineString",
          coordinates: i
        });
      }
    }), jt.include({
      toGeoJSON: function(t) {
        var e = !dt(this._latlngs), i = e && !dt(this._latlngs[0]), n = Ne(this._latlngs, i ? 2 : e ? 1 : 0, !0, t);
        return e || (n = [n]), qt(this, {
          type: (i ? "Multi" : "") + "Polygon",
          coordinates: n
        });
      }
    }), Wt.include({
      toMultiPoint: function(t) {
        var e = [];
        return this.eachLayer(function(i) {
          e.push(i.toGeoJSON(t).geometry.coordinates);
        }), qt(this, {
          type: "MultiPoint",
          coordinates: e
        });
      },
      // @method toGeoJSON(precision?: Number|false): Object
      // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
      // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
      toGeoJSON: function(t) {
        var e = this.feature && this.feature.geometry && this.feature.geometry.type;
        if (e === "MultiPoint")
          return this.toMultiPoint(t);
        var i = e === "GeometryCollection", n = [];
        return this.eachLayer(function(s) {
          if (s.toGeoJSON) {
            var l = s.toGeoJSON(t);
            if (i)
              n.push(l.geometry);
            else {
              var p = Re(l);
              p.type === "FeatureCollection" ? n.push.apply(n, p.features) : n.push(p);
            }
          }
        }), i ? qt(this, {
          geometries: n,
          type: "GeometryCollection"
        }) : {
          type: "FeatureCollection",
          features: n
        };
      }
    });
    function In(t, e) {
      return new Ct(t, e);
    }
    var Os = In, De = mt.extend({
      // @section
      // @aka ImageOverlay options
      options: {
        // @option opacity: Number = 1.0
        // The opacity of the image overlay.
        opacity: 1,
        // @option alt: String = ''
        // Text for the `alt` attribute of the image (useful for accessibility).
        alt: "",
        // @option interactive: Boolean = false
        // If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
        interactive: !1,
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the image.
        // If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: !1,
        // @option errorOverlayUrl: String = ''
        // URL to the overlay image to show in place of the overlay that failed to load.
        errorOverlayUrl: "",
        // @option zIndex: Number = 1
        // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
        zIndex: 1,
        // @option className: String = ''
        // A custom class name to assign to the image. Empty by default.
        className: ""
      },
      initialize: function(t, e, i) {
        this._url = t, this._bounds = q(e), C(this, i);
      },
      onAdd: function() {
        this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (Z(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
      },
      onRemove: function() {
        W(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
      },
      // @method setOpacity(opacity: Number): this
      // Sets the opacity of the overlay.
      setOpacity: function(t) {
        return this.options.opacity = t, this._image && this._updateOpacity(), this;
      },
      setStyle: function(t) {
        return t.opacity && this.setOpacity(t.opacity), this;
      },
      // @method bringToFront(): this
      // Brings the layer to the top of all overlays.
      bringToFront: function() {
        return this._map && Ft(this._image), this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all overlays.
      bringToBack: function() {
        return this._map && $t(this._image), this;
      },
      // @method setUrl(url: String): this
      // Changes the URL of the image.
      setUrl: function(t) {
        return this._url = t, this._image && (this._image.src = t), this;
      },
      // @method setBounds(bounds: LatLngBounds): this
      // Update the bounds that this ImageOverlay covers
      setBounds: function(t) {
        return this._bounds = q(t), this._map && this._reset(), this;
      },
      getEvents: function() {
        var t = {
          zoom: this._reset,
          viewreset: this._reset
        };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      // @method setZIndex(value: Number): this
      // Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
      setZIndex: function(t) {
        return this.options.zIndex = t, this._updateZIndex(), this;
      },
      // @method getBounds(): LatLngBounds
      // Get the bounds that this ImageOverlay covers
      getBounds: function() {
        return this._bounds;
      },
      // @method getElement(): HTMLElement
      // Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
      // used by this overlay.
      getElement: function() {
        return this._image;
      },
      _initImage: function() {
        var t = this._url.tagName === "IMG", e = this._image = t ? this._url : R("img");
        if (Z(e, "leaflet-image-layer"), this._zoomAnimated && Z(e, "leaflet-zoom-animated"), this.options.className && Z(e, this.options.className), e.onselectstart = m, e.onmousemove = m, e.onload = a(this.fire, this, "load"), e.onerror = a(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (e.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
          this._url = e.src;
          return;
        }
        e.src = this._url, e.alt = this.options.alt;
      },
      _animateZoom: function(t) {
        var e = this._map.getZoomScale(t.zoom), i = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
        zt(this._image, i, e);
      },
      _reset: function() {
        var t = this._image, e = new $(
          this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
          this._map.latLngToLayerPoint(this._bounds.getSouthEast())
        ), i = e.getSize();
        K(t, e.min), t.style.width = i.x + "px", t.style.height = i.y + "px";
      },
      _updateOpacity: function() {
        ct(this._image, this.options.opacity);
      },
      _updateZIndex: function() {
        this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._image.style.zIndex = this.options.zIndex);
      },
      _overlayOnError: function() {
        this.fire("error");
        var t = this.options.errorOverlayUrl;
        t && this._url !== t && (this._url = t, this._image.src = t);
      },
      // @method getCenter(): LatLng
      // Returns the center of the ImageOverlay.
      getCenter: function() {
        return this._bounds.getCenter();
      }
    }), zs = function(t, e, i) {
      return new De(t, e, i);
    }, Bn = De.extend({
      // @section
      // @aka VideoOverlay options
      options: {
        // @option autoplay: Boolean = true
        // Whether the video starts playing automatically when loaded.
        // On some browsers autoplay will only work with `muted: true`
        autoplay: !0,
        // @option loop: Boolean = true
        // Whether the video will loop back to the beginning when played.
        loop: !0,
        // @option keepAspectRatio: Boolean = true
        // Whether the video will save aspect ratio after the projection.
        // Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
        keepAspectRatio: !0,
        // @option muted: Boolean = false
        // Whether the video starts on mute when loaded.
        muted: !1,
        // @option playsInline: Boolean = true
        // Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
        playsInline: !0
      },
      _initImage: function() {
        var t = this._url.tagName === "VIDEO", e = this._image = t ? this._url : R("video");
        if (Z(e, "leaflet-image-layer"), this._zoomAnimated && Z(e, "leaflet-zoom-animated"), this.options.className && Z(e, this.options.className), e.onselectstart = m, e.onmousemove = m, e.onloadeddata = a(this.fire, this, "load"), t) {
          for (var i = e.getElementsByTagName("source"), n = [], s = 0; s < i.length; s++)
            n.push(i[s].src);
          this._url = i.length > 0 ? n : [e.src];
          return;
        }
        F(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(e.style, "objectFit") && (e.style.objectFit = "fill"), e.autoplay = !!this.options.autoplay, e.loop = !!this.options.loop, e.muted = !!this.options.muted, e.playsInline = !!this.options.playsInline;
        for (var l = 0; l < this._url.length; l++) {
          var p = R("source");
          p.src = this._url[l], e.appendChild(p);
        }
      }
      // @method getElement(): HTMLVideoElement
      // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
      // used by this overlay.
    });
    function Zs(t, e, i) {
      return new Bn(t, e, i);
    }
    var Nn = De.extend({
      _initImage: function() {
        var t = this._image = this._url;
        Z(t, "leaflet-image-layer"), this._zoomAnimated && Z(t, "leaflet-zoom-animated"), this.options.className && Z(t, this.options.className), t.onselectstart = m, t.onmousemove = m;
      }
      // @method getElement(): SVGElement
      // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
      // used by this overlay.
    });
    function Is(t, e, i) {
      return new Nn(t, e, i);
    }
    var Lt = mt.extend({
      // @section
      // @aka DivOverlay options
      options: {
        // @option interactive: Boolean = false
        // If true, the popup/tooltip will listen to the mouse events.
        interactive: !1,
        // @option offset: Point = Point(0, 0)
        // The offset of the overlay position.
        offset: [0, 0],
        // @option className: String = ''
        // A custom CSS class name to assign to the overlay.
        className: "",
        // @option pane: String = undefined
        // `Map pane` where the overlay will be added.
        pane: void 0,
        // @option content: String|HTMLElement|Function = ''
        // Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
        // passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
        content: ""
      },
      initialize: function(t, e) {
        t && (t instanceof U || F(t)) ? (this._latlng = B(t), C(this, e)) : (C(this, t), this._source = e), this.options.content && (this._content = this.options.content);
      },
      // @method openOn(map: Map): this
      // Adds the overlay to the map.
      // Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
      openOn: function(t) {
        return t = arguments.length ? t : this._source._map, t.hasLayer(this) || t.addLayer(this), this;
      },
      // @method close(): this
      // Closes the overlay.
      // Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
      // and `layer.closePopup()`/`.closeTooltip()`.
      close: function() {
        return this._map && this._map.removeLayer(this), this;
      },
      // @method toggle(layer?: Layer): this
      // Opens or closes the overlay bound to layer depending on its current state.
      // Argument may be omitted only for overlay bound to layer.
      // Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
      toggle: function(t) {
        return this._map ? this.close() : (arguments.length ? this._source = t : t = this._source, this._prepareOpen(), this.openOn(t._map)), this;
      },
      onAdd: function(t) {
        this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && ct(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && ct(this._container, 1), this.bringToFront(), this.options.interactive && (Z(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
      },
      onRemove: function(t) {
        t._fadeAnimated ? (ct(this._container, 0), this._removeTimeout = setTimeout(a(W, void 0, this._container), 200)) : W(this._container), this.options.interactive && (V(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
      },
      // @namespace DivOverlay
      // @method getLatLng: LatLng
      // Returns the geographical point of the overlay.
      getLatLng: function() {
        return this._latlng;
      },
      // @method setLatLng(latlng: LatLng): this
      // Sets the geographical point where the overlay will open.
      setLatLng: function(t) {
        return this._latlng = B(t), this._map && (this._updatePosition(), this._adjustPan()), this;
      },
      // @method getContent: String|HTMLElement
      // Returns the content of the overlay.
      getContent: function() {
        return this._content;
      },
      // @method setContent(htmlContent: String|HTMLElement|Function): this
      // Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
      // The function should return a `String` or `HTMLElement` to be used in the overlay.
      setContent: function(t) {
        return this._content = t, this.update(), this;
      },
      // @method getElement: String|HTMLElement
      // Returns the HTML container of the overlay.
      getElement: function() {
        return this._container;
      },
      // @method update: null
      // Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
      update: function() {
        this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan());
      },
      getEvents: function() {
        var t = {
          zoom: this._updatePosition,
          viewreset: this._updatePosition
        };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      // @method isOpen: Boolean
      // Returns `true` when the overlay is visible on the map.
      isOpen: function() {
        return !!this._map && this._map.hasLayer(this);
      },
      // @method bringToFront: this
      // Brings this overlay in front of other overlays (in the same map pane).
      bringToFront: function() {
        return this._map && Ft(this._container), this;
      },
      // @method bringToBack: this
      // Brings this overlay to the back of other overlays (in the same map pane).
      bringToBack: function() {
        return this._map && $t(this._container), this;
      },
      // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
      _prepareOpen: function(t) {
        var e = this._source;
        if (!e._map)
          return !1;
        if (e instanceof Pt) {
          e = null;
          var i = this._source._layers;
          for (var n in i)
            if (i[n]._map) {
              e = i[n];
              break;
            }
          if (!e)
            return !1;
          this._source = e;
        }
        if (!t)
          if (e.getCenter)
            t = e.getCenter();
          else if (e.getLatLng)
            t = e.getLatLng();
          else if (e.getBounds)
            t = e.getBounds().getCenter();
          else
            throw new Error("Unable to get source layer LatLng.");
        return this.setLatLng(t), this._map && this.update(), !0;
      },
      _updateContent: function() {
        if (this._content) {
          var t = this._contentNode, e = typeof this._content == "function" ? this._content(this._source || this) : this._content;
          if (typeof e == "string")
            t.innerHTML = e;
          else {
            for (; t.hasChildNodes(); )
              t.removeChild(t.firstChild);
            t.appendChild(e);
          }
          this.fire("contentupdate");
        }
      },
      _updatePosition: function() {
        if (this._map) {
          var t = this._map.latLngToLayerPoint(this._latlng), e = A(this.options.offset), i = this._getAnchor();
          this._zoomAnimated ? K(this._container, t.add(i)) : e = e.add(t).add(i);
          var n = this._containerBottom = -e.y, s = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
          this._container.style.bottom = n + "px", this._container.style.left = s + "px";
        }
      },
      _getAnchor: function() {
        return [0, 0];
      }
    });
    N.include({
      _initOverlay: function(t, e, i, n) {
        var s = e;
        return s instanceof t || (s = new t(n).setContent(e)), i && s.setLatLng(i), s;
      }
    }), mt.include({
      _initOverlay: function(t, e, i, n) {
        var s = i;
        return s instanceof t ? (C(s, n), s._source = this) : (s = e && !n ? e : new t(n, this), s.setContent(i)), s;
      }
    });
    var Ue = Lt.extend({
      // @section
      // @aka Popup options
      options: {
        // @option pane: String = 'popupPane'
        // `Map pane` where the popup will be added.
        pane: "popupPane",
        // @option offset: Point = Point(0, 7)
        // The offset of the popup position.
        offset: [0, 7],
        // @option maxWidth: Number = 300
        // Max width of the popup, in pixels.
        maxWidth: 300,
        // @option minWidth: Number = 50
        // Min width of the popup, in pixels.
        minWidth: 50,
        // @option maxHeight: Number = null
        // If set, creates a scrollable container of the given height
        // inside a popup if its content exceeds it.
        // The scrollable container can be styled using the
        // `leaflet-popup-scrolled` CSS class selector.
        maxHeight: null,
        // @option autoPan: Boolean = true
        // Set it to `false` if you don't want the map to do panning animation
        // to fit the opened popup.
        autoPan: !0,
        // @option autoPanPaddingTopLeft: Point = null
        // The margin between the popup and the top left corner of the map
        // view after autopanning was performed.
        autoPanPaddingTopLeft: null,
        // @option autoPanPaddingBottomRight: Point = null
        // The margin between the popup and the bottom right corner of the map
        // view after autopanning was performed.
        autoPanPaddingBottomRight: null,
        // @option autoPanPadding: Point = Point(5, 5)
        // Equivalent of setting both top left and bottom right autopan padding to the same value.
        autoPanPadding: [5, 5],
        // @option keepInView: Boolean = false
        // Set it to `true` if you want to prevent users from panning the popup
        // off of the screen while it is open.
        keepInView: !1,
        // @option closeButton: Boolean = true
        // Controls the presence of a close button in the popup.
        closeButton: !0,
        // @option autoClose: Boolean = true
        // Set it to `false` if you want to override the default behavior of
        // the popup closing when another popup is opened.
        autoClose: !0,
        // @option closeOnEscapeKey: Boolean = true
        // Set it to `false` if you want to override the default behavior of
        // the ESC key for closing of the popup.
        closeOnEscapeKey: !0,
        // @option closeOnClick: Boolean = *
        // Set it if you want to override the default behavior of the popup closing when user clicks
        // on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
        // @option className: String = ''
        // A custom CSS class name to assign to the popup.
        className: ""
      },
      // @namespace Popup
      // @method openOn(map: Map): this
      // Alternative to `map.openPopup(popup)`.
      // Adds the popup to the map and closes the previous one.
      openOn: function(t) {
        return t = arguments.length ? t : this._source._map, !t.hasLayer(this) && t._popup && t._popup.options.autoClose && t.removeLayer(t._popup), t._popup = this, Lt.prototype.openOn.call(this, t);
      },
      onAdd: function(t) {
        Lt.prototype.onAdd.call(this, t), t.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof Et || this._source.on("preclick", It));
      },
      onRemove: function(t) {
        Lt.prototype.onRemove.call(this, t), t.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof Et || this._source.off("preclick", It));
      },
      getEvents: function() {
        var t = Lt.prototype.getEvents.call(this);
        return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this.close), this.options.keepInView && (t.moveend = this._adjustPan), t;
      },
      _initLayout: function() {
        var t = "leaflet-popup", e = this._container = R(
          "div",
          t + " " + (this.options.className || "") + " leaflet-zoom-animated"
        ), i = this._wrapper = R("div", t + "-content-wrapper", e);
        if (this._contentNode = R("div", t + "-content", i), ue(e), gi(this._contentNode), z(e, "contextmenu", It), this._tipContainer = R("div", t + "-tip-container", e), this._tip = R("div", t + "-tip", this._tipContainer), this.options.closeButton) {
          var n = this._closeButton = R("a", t + "-close-button", e);
          n.setAttribute("role", "button"), n.setAttribute("aria-label", "Close popup"), n.href = "#close", n.innerHTML = '<span aria-hidden="true">&#215;</span>', z(n, "click", function(s) {
            it(s), this.close();
          }, this);
        }
      },
      _updateLayout: function() {
        var t = this._contentNode, e = t.style;
        e.width = "", e.whiteSpace = "nowrap";
        var i = t.offsetWidth;
        i = Math.min(i, this.options.maxWidth), i = Math.max(i, this.options.minWidth), e.width = i + 1 + "px", e.whiteSpace = "", e.height = "";
        var n = t.offsetHeight, s = this.options.maxHeight, l = "leaflet-popup-scrolled";
        s && n > s ? (e.height = s + "px", Z(t, l)) : V(t, l), this._containerWidth = this._container.offsetWidth;
      },
      _animateZoom: function(t) {
        var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), i = this._getAnchor();
        K(this._container, e.add(i));
      },
      _adjustPan: function() {
        if (this.options.autoPan) {
          if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
            this._autopanning = !1;
            return;
          }
          var t = this._map, e = parseInt(re(this._container, "marginBottom"), 10) || 0, i = this._container.offsetHeight + e, n = this._containerWidth, s = new O(this._containerLeft, -i - this._containerBottom);
          s._add(Zt(this._container));
          var l = t.layerPointToContainerPoint(s), p = A(this.options.autoPanPadding), v = A(this.options.autoPanPaddingTopLeft || p), y = A(this.options.autoPanPaddingBottomRight || p), b = t.getSize(), M = 0, E = 0;
          l.x + n + y.x > b.x && (M = l.x + n - b.x + y.x), l.x - M - v.x < 0 && (M = l.x - v.x), l.y + i + y.y > b.y && (E = l.y + i - b.y + y.y), l.y - E - v.y < 0 && (E = l.y - v.y), (M || E) && (this.options.keepInView && (this._autopanning = !0), t.fire("autopanstart").panBy([M, E]));
        }
      },
      _getAnchor: function() {
        return A(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
      }
    }), Bs = function(t, e) {
      return new Ue(t, e);
    };
    N.mergeOptions({
      closePopupOnClick: !0
    }), N.include({
      // @method openPopup(popup: Popup): this
      // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
      // @alternative
      // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
      // Creates a popup with the specified content and options and opens it in the given point on a map.
      openPopup: function(t, e, i) {
        return this._initOverlay(Ue, t, e, i).openOn(this), this;
      },
      // @method closePopup(popup?: Popup): this
      // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
      closePopup: function(t) {
        return t = arguments.length ? t : this._popup, t && t.close(), this;
      }
    }), mt.include({
      // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
      // Binds a popup to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindPopup: function(t, e) {
        return this._popup = this._initOverlay(Ue, this._popup, t, e), this._popupHandlersAdded || (this.on({
          click: this._openPopup,
          keypress: this._onKeyPress,
          remove: this.closePopup,
          move: this._movePopup
        }), this._popupHandlersAdded = !0), this;
      },
      // @method unbindPopup(): this
      // Removes the popup previously bound with `bindPopup`.
      unbindPopup: function() {
        return this._popup && (this.off({
          click: this._openPopup,
          keypress: this._onKeyPress,
          remove: this.closePopup,
          move: this._movePopup
        }), this._popupHandlersAdded = !1, this._popup = null), this;
      },
      // @method openPopup(latlng?: LatLng): this
      // Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
      openPopup: function(t) {
        return this._popup && (this instanceof Pt || (this._popup._source = this), this._popup._prepareOpen(t || this._latlng) && this._popup.openOn(this._map)), this;
      },
      // @method closePopup(): this
      // Closes the popup bound to this layer if it is open.
      closePopup: function() {
        return this._popup && this._popup.close(), this;
      },
      // @method togglePopup(): this
      // Opens or closes the popup bound to this layer depending on its current state.
      togglePopup: function() {
        return this._popup && this._popup.toggle(this), this;
      },
      // @method isPopupOpen(): boolean
      // Returns `true` if the popup bound to this layer is currently open.
      isPopupOpen: function() {
        return this._popup ? this._popup.isOpen() : !1;
      },
      // @method setPopupContent(content: String|HTMLElement|Popup): this
      // Sets the content of the popup bound to this layer.
      setPopupContent: function(t) {
        return this._popup && this._popup.setContent(t), this;
      },
      // @method getPopup(): Popup
      // Returns the popup bound to this layer.
      getPopup: function() {
        return this._popup;
      },
      _openPopup: function(t) {
        if (!(!this._popup || !this._map)) {
          Bt(t);
          var e = t.layer || t.target;
          if (this._popup._source === e && !(e instanceof Et)) {
            this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(t.latlng);
            return;
          }
          this._popup._source = e, this.openPopup(t.latlng);
        }
      },
      _movePopup: function(t) {
        this._popup.setLatLng(t.latlng);
      },
      _onKeyPress: function(t) {
        t.originalEvent.keyCode === 13 && this._openPopup(t);
      }
    });
    var He = Lt.extend({
      // @section
      // @aka Tooltip options
      options: {
        // @option pane: String = 'tooltipPane'
        // `Map pane` where the tooltip will be added.
        pane: "tooltipPane",
        // @option offset: Point = Point(0, 0)
        // Optional offset of the tooltip position.
        offset: [0, 0],
        // @option direction: String = 'auto'
        // Direction where to open the tooltip. Possible values are: `right`, `left`,
        // `top`, `bottom`, `center`, `auto`.
        // `auto` will dynamically switch between `right` and `left` according to the tooltip
        // position on the map.
        direction: "auto",
        // @option permanent: Boolean = false
        // Whether to open the tooltip permanently or only on mouseover.
        permanent: !1,
        // @option sticky: Boolean = false
        // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
        sticky: !1,
        // @option opacity: Number = 0.9
        // Tooltip container opacity.
        opacity: 0.9
      },
      onAdd: function(t) {
        Lt.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
      },
      onRemove: function(t) {
        Lt.prototype.onRemove.call(this, t), t.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
      },
      getEvents: function() {
        var t = Lt.prototype.getEvents.call(this);
        return this.options.permanent || (t.preclick = this.close), t;
      },
      _initLayout: function() {
        var t = "leaflet-tooltip", e = t + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
        this._contentNode = this._container = R("div", e), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + d(this));
      },
      _updateLayout: function() {
      },
      _adjustPan: function() {
      },
      _setPosition: function(t) {
        var e, i, n = this._map, s = this._container, l = n.latLngToContainerPoint(n.getCenter()), p = n.layerPointToContainerPoint(t), v = this.options.direction, y = s.offsetWidth, b = s.offsetHeight, M = A(this.options.offset), E = this._getAnchor();
        v === "top" ? (e = y / 2, i = b) : v === "bottom" ? (e = y / 2, i = 0) : v === "center" ? (e = y / 2, i = b / 2) : v === "right" ? (e = 0, i = b / 2) : v === "left" ? (e = y, i = b / 2) : p.x < l.x ? (v = "right", e = 0, i = b / 2) : (v = "left", e = y + (M.x + E.x) * 2, i = b / 2), t = t.subtract(A(e, i, !0)).add(M).add(E), V(s, "leaflet-tooltip-right"), V(s, "leaflet-tooltip-left"), V(s, "leaflet-tooltip-top"), V(s, "leaflet-tooltip-bottom"), Z(s, "leaflet-tooltip-" + v), K(s, t);
      },
      _updatePosition: function() {
        var t = this._map.latLngToLayerPoint(this._latlng);
        this._setPosition(t);
      },
      setOpacity: function(t) {
        this.options.opacity = t, this._container && ct(this._container, t);
      },
      _animateZoom: function(t) {
        var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
        this._setPosition(e);
      },
      _getAnchor: function() {
        return A(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
      }
    }), Ns = function(t, e) {
      return new He(t, e);
    };
    N.include({
      // @method openTooltip(tooltip: Tooltip): this
      // Opens the specified tooltip.
      // @alternative
      // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
      // Creates a tooltip with the specified content and options and open it.
      openTooltip: function(t, e, i) {
        return this._initOverlay(He, t, e, i).openOn(this), this;
      },
      // @method closeTooltip(tooltip: Tooltip): this
      // Closes the tooltip given as parameter.
      closeTooltip: function(t) {
        return t.close(), this;
      }
    }), mt.include({
      // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
      // Binds a tooltip to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindTooltip: function(t, e) {
        return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(He, this._tooltip, t, e), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
      },
      // @method unbindTooltip(): this
      // Removes the tooltip previously bound with `bindTooltip`.
      unbindTooltip: function() {
        return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null), this;
      },
      _initTooltipInteractions: function(t) {
        if (!(!t && this._tooltipHandlersAdded)) {
          var e = t ? "off" : "on", i = {
            remove: this.closeTooltip,
            move: this._moveTooltip
          };
          this._tooltip.options.permanent ? i.add = this._openTooltip : (i.mouseover = this._openTooltip, i.mouseout = this.closeTooltip, i.click = this._openTooltip, this._map ? this._addFocusListeners() : i.add = this._addFocusListeners), this._tooltip.options.sticky && (i.mousemove = this._moveTooltip), this[e](i), this._tooltipHandlersAdded = !t;
        }
      },
      // @method openTooltip(latlng?: LatLng): this
      // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
      openTooltip: function(t) {
        return this._tooltip && (this instanceof Pt || (this._tooltip._source = this), this._tooltip._prepareOpen(t) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
      },
      // @method closeTooltip(): this
      // Closes the tooltip bound to this layer if it is open.
      closeTooltip: function() {
        if (this._tooltip)
          return this._tooltip.close();
      },
      // @method toggleTooltip(): this
      // Opens or closes the tooltip bound to this layer depending on its current state.
      toggleTooltip: function() {
        return this._tooltip && this._tooltip.toggle(this), this;
      },
      // @method isTooltipOpen(): boolean
      // Returns `true` if the tooltip bound to this layer is currently open.
      isTooltipOpen: function() {
        return this._tooltip.isOpen();
      },
      // @method setTooltipContent(content: String|HTMLElement|Tooltip): this
      // Sets the content of the tooltip bound to this layer.
      setTooltipContent: function(t) {
        return this._tooltip && this._tooltip.setContent(t), this;
      },
      // @method getTooltip(): Tooltip
      // Returns the tooltip bound to this layer.
      getTooltip: function() {
        return this._tooltip;
      },
      _addFocusListeners: function() {
        this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this);
      },
      _addFocusListenersOnLayer: function(t) {
        var e = typeof t.getElement == "function" && t.getElement();
        e && (z(e, "focus", function() {
          this._tooltip._source = t, this.openTooltip();
        }, this), z(e, "blur", this.closeTooltip, this));
      },
      _setAriaDescribedByOnLayer: function(t) {
        var e = typeof t.getElement == "function" && t.getElement();
        e && e.setAttribute("aria-describedby", this._tooltip._container.id);
      },
      _openTooltip: function(t) {
        if (!(!this._tooltip || !this._map)) {
          if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
            this._openOnceFlag = !0;
            var e = this;
            this._map.once("moveend", function() {
              e._openOnceFlag = !1, e._openTooltip(t);
            });
            return;
          }
          this._tooltip._source = t.layer || t.target, this.openTooltip(this._tooltip.options.sticky ? t.latlng : void 0);
        }
      },
      _moveTooltip: function(t) {
        var e = t.latlng, i, n;
        this._tooltip.options.sticky && t.originalEvent && (i = this._map.mouseEventToContainerPoint(t.originalEvent), n = this._map.containerPointToLayerPoint(i), e = this._map.layerPointToLatLng(n)), this._tooltip.setLatLng(e);
      }
    });
    var Rn = Vt.extend({
      options: {
        // @section
        // @aka DivIcon options
        iconSize: [12, 12],
        // also can be set through CSS
        // iconAnchor: (Point),
        // popupAnchor: (Point),
        // @option html: String|HTMLElement = ''
        // Custom HTML code to put inside the div element, empty by default. Alternatively,
        // an instance of `HTMLElement`.
        html: !1,
        // @option bgPos: Point = [0, 0]
        // Optional relative position of the background, in pixels
        bgPos: null,
        className: "leaflet-div-icon"
      },
      createIcon: function(t) {
        var e = t && t.tagName === "DIV" ? t : document.createElement("div"), i = this.options;
        if (i.html instanceof Element ? (Te(e), e.appendChild(i.html)) : e.innerHTML = i.html !== !1 ? i.html : "", i.bgPos) {
          var n = A(i.bgPos);
          e.style.backgroundPosition = -n.x + "px " + -n.y + "px";
        }
        return this._setIconStyles(e, "icon"), e;
      },
      createShadow: function() {
        return null;
      }
    });
    function Rs(t) {
      return new Rn(t);
    }
    Vt.Default = fe;
    var _e = mt.extend({
      // @section
      // @aka GridLayer options
      options: {
        // @option tileSize: Number|Point = 256
        // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
        tileSize: 256,
        // @option opacity: Number = 1.0
        // Opacity of the tiles. Can be used in the `createTile()` function.
        opacity: 1,
        // @option updateWhenIdle: Boolean = (depends)
        // Load new tiles only when panning ends.
        // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
        // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
        // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
        updateWhenIdle: S.mobile,
        // @option updateWhenZooming: Boolean = true
        // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
        updateWhenZooming: !0,
        // @option updateInterval: Number = 200
        // Tiles will not update more than once every `updateInterval` milliseconds when panning.
        updateInterval: 200,
        // @option zIndex: Number = 1
        // The explicit zIndex of the tile layer.
        zIndex: 1,
        // @option bounds: LatLngBounds = undefined
        // If set, tiles will only be loaded inside the set `LatLngBounds`.
        bounds: null,
        // @option minZoom: Number = 0
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        minZoom: 0,
        // @option maxZoom: Number = undefined
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        maxZoom: void 0,
        // @option maxNativeZoom: Number = undefined
        // Maximum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
        // from `maxNativeZoom` level and auto-scaled.
        maxNativeZoom: void 0,
        // @option minNativeZoom: Number = undefined
        // Minimum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
        // from `minNativeZoom` level and auto-scaled.
        minNativeZoom: void 0,
        // @option noWrap: Boolean = false
        // Whether the layer is wrapped around the antimeridian. If `true`, the
        // GridLayer will only be displayed once at low zoom levels. Has no
        // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
        // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
        // tiles outside the CRS limits.
        noWrap: !1,
        // @option pane: String = 'tilePane'
        // `Map pane` where the grid layer will be added.
        pane: "tilePane",
        // @option className: String = ''
        // A custom class name to assign to the tile layer. Empty by default.
        className: "",
        // @option keepBuffer: Number = 2
        // When panning the map, keep this many rows and columns of tiles before unloading them.
        keepBuffer: 2
      },
      initialize: function(t) {
        C(this, t);
      },
      onAdd: function() {
        this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
      },
      beforeAdd: function(t) {
        t._addZoomLimit(this);
      },
      onRemove: function(t) {
        this._removeAllTiles(), W(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
      },
      // @method bringToFront: this
      // Brings the tile layer to the top of all tile layers.
      bringToFront: function() {
        return this._map && (Ft(this._container), this._setAutoZIndex(Math.max)), this;
      },
      // @method bringToBack: this
      // Brings the tile layer to the bottom of all tile layers.
      bringToBack: function() {
        return this._map && ($t(this._container), this._setAutoZIndex(Math.min)), this;
      },
      // @method getContainer: HTMLElement
      // Returns the HTML element that contains the tiles for this layer.
      getContainer: function() {
        return this._container;
      },
      // @method setOpacity(opacity: Number): this
      // Changes the [opacity](#gridlayer-opacity) of the grid layer.
      setOpacity: function(t) {
        return this.options.opacity = t, this._updateOpacity(), this;
      },
      // @method setZIndex(zIndex: Number): this
      // Changes the [zIndex](#gridlayer-zindex) of the grid layer.
      setZIndex: function(t) {
        return this.options.zIndex = t, this._updateZIndex(), this;
      },
      // @method isLoading: Boolean
      // Returns `true` if any tile in the grid layer has not finished loading.
      isLoading: function() {
        return this._loading;
      },
      // @method redraw: this
      // Causes the layer to clear all the tiles and request them again.
      redraw: function() {
        if (this._map) {
          this._removeAllTiles();
          var t = this._clampZoom(this._map.getZoom());
          t !== this._tileZoom && (this._tileZoom = t, this._updateLevels()), this._update();
        }
        return this;
      },
      getEvents: function() {
        var t = {
          viewprereset: this._invalidateAll,
          viewreset: this._resetView,
          zoom: this._resetView,
          moveend: this._onMoveEnd
        };
        return this.options.updateWhenIdle || (this._onMove || (this._onMove = g(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      // @section Extension methods
      // Layers extending `GridLayer` shall reimplement the following method.
      // @method createTile(coords: Object, done?: Function): HTMLElement
      // Called only internally, must be overridden by classes extending `GridLayer`.
      // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
      // is specified, it must be called when the tile has finished loading and drawing.
      createTile: function() {
        return document.createElement("div");
      },
      // @section
      // @method getTileSize: Point
      // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
      getTileSize: function() {
        var t = this.options.tileSize;
        return t instanceof O ? t : new O(t, t);
      },
      _updateZIndex: function() {
        this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
      },
      _setAutoZIndex: function(t) {
        for (var e = this.getPane().children, i = -t(-1 / 0, 1 / 0), n = 0, s = e.length, l; n < s; n++)
          l = e[n].style.zIndex, e[n] !== this._container && l && (i = t(i, +l));
        isFinite(i) && (this.options.zIndex = i + t(-1, 1), this._updateZIndex());
      },
      _updateOpacity: function() {
        if (this._map && !S.ielt9) {
          ct(this._container, this.options.opacity);
          var t = +/* @__PURE__ */ new Date(), e = !1, i = !1;
          for (var n in this._tiles) {
            var s = this._tiles[n];
            if (!(!s.current || !s.loaded)) {
              var l = Math.min(1, (t - s.loaded) / 200);
              ct(s.el, l), l < 1 ? e = !0 : (s.active ? i = !0 : this._onOpaqueTile(s), s.active = !0);
            }
          }
          i && !this._noPrune && this._pruneTiles(), e && (ut(this._fadeFrame), this._fadeFrame = st(this._updateOpacity, this));
        }
      },
      _onOpaqueTile: m,
      _initContainer: function() {
        this._container || (this._container = R("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
      },
      _updateLevels: function() {
        var t = this._tileZoom, e = this.options.maxZoom;
        if (t !== void 0) {
          for (var i in this._levels)
            i = Number(i), this._levels[i].el.children.length || i === t ? (this._levels[i].el.style.zIndex = e - Math.abs(t - i), this._onUpdateLevel(i)) : (W(this._levels[i].el), this._removeTilesAtZoom(i), this._onRemoveLevel(i), delete this._levels[i]);
          var n = this._levels[t], s = this._map;
          return n || (n = this._levels[t] = {}, n.el = R("div", "leaflet-tile-container leaflet-zoom-animated", this._container), n.el.style.zIndex = e, n.origin = s.project(s.unproject(s.getPixelOrigin()), t).round(), n.zoom = t, this._setZoomTransform(n, s.getCenter(), s.getZoom()), m(n.el.offsetWidth), this._onCreateLevel(n)), this._level = n, n;
        }
      },
      _onUpdateLevel: m,
      _onRemoveLevel: m,
      _onCreateLevel: m,
      _pruneTiles: function() {
        if (this._map) {
          var t, e, i = this._map.getZoom();
          if (i > this.options.maxZoom || i < this.options.minZoom) {
            this._removeAllTiles();
            return;
          }
          for (t in this._tiles)
            e = this._tiles[t], e.retain = e.current;
          for (t in this._tiles)
            if (e = this._tiles[t], e.current && !e.active) {
              var n = e.coords;
              this._retainParent(n.x, n.y, n.z, n.z - 5) || this._retainChildren(n.x, n.y, n.z, n.z + 2);
            }
          for (t in this._tiles)
            this._tiles[t].retain || this._removeTile(t);
        }
      },
      _removeTilesAtZoom: function(t) {
        for (var e in this._tiles)
          this._tiles[e].coords.z === t && this._removeTile(e);
      },
      _removeAllTiles: function() {
        for (var t in this._tiles)
          this._removeTile(t);
      },
      _invalidateAll: function() {
        for (var t in this._levels)
          W(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
        this._removeAllTiles(), this._tileZoom = void 0;
      },
      _retainParent: function(t, e, i, n) {
        var s = Math.floor(t / 2), l = Math.floor(e / 2), p = i - 1, v = new O(+s, +l);
        v.z = +p;
        var y = this._tileCoordsToKey(v), b = this._tiles[y];
        return b && b.active ? (b.retain = !0, !0) : (b && b.loaded && (b.retain = !0), p > n ? this._retainParent(s, l, p, n) : !1);
      },
      _retainChildren: function(t, e, i, n) {
        for (var s = 2 * t; s < 2 * t + 2; s++)
          for (var l = 2 * e; l < 2 * e + 2; l++) {
            var p = new O(s, l);
            p.z = i + 1;
            var v = this._tileCoordsToKey(p), y = this._tiles[v];
            if (y && y.active) {
              y.retain = !0;
              continue;
            } else y && y.loaded && (y.retain = !0);
            i + 1 < n && this._retainChildren(s, l, i + 1, n);
          }
      },
      _resetView: function(t) {
        var e = t && (t.pinch || t.flyTo);
        this._setView(this._map.getCenter(), this._map.getZoom(), e, e);
      },
      _animateZoom: function(t) {
        this._setView(t.center, t.zoom, !0, t.noUpdate);
      },
      _clampZoom: function(t) {
        var e = this.options;
        return e.minNativeZoom !== void 0 && t < e.minNativeZoom ? e.minNativeZoom : e.maxNativeZoom !== void 0 && e.maxNativeZoom < t ? e.maxNativeZoom : t;
      },
      _setView: function(t, e, i, n) {
        var s = Math.round(e);
        this.options.maxZoom !== void 0 && s > this.options.maxZoom || this.options.minZoom !== void 0 && s < this.options.minZoom ? s = void 0 : s = this._clampZoom(s);
        var l = this.options.updateWhenZooming && s !== this._tileZoom;
        (!n || l) && (this._tileZoom = s, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), s !== void 0 && this._update(t), i || this._pruneTiles(), this._noPrune = !!i), this._setZoomTransforms(t, e);
      },
      _setZoomTransforms: function(t, e) {
        for (var i in this._levels)
          this._setZoomTransform(this._levels[i], t, e);
      },
      _setZoomTransform: function(t, e, i) {
        var n = this._map.getZoomScale(i, t.zoom), s = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e, i)).round();
        S.any3d ? zt(t.el, s, n) : K(t.el, s);
      },
      _resetGrid: function() {
        var t = this._map, e = t.options.crs, i = this._tileSize = this.getTileSize(), n = this._tileZoom, s = this._map.getPixelWorldBounds(this._tileZoom);
        s && (this._globalTileRange = this._pxBoundsToTileRange(s)), this._wrapX = e.wrapLng && !this.options.noWrap && [
          Math.floor(t.project([0, e.wrapLng[0]], n).x / i.x),
          Math.ceil(t.project([0, e.wrapLng[1]], n).x / i.y)
        ], this._wrapY = e.wrapLat && !this.options.noWrap && [
          Math.floor(t.project([e.wrapLat[0], 0], n).y / i.x),
          Math.ceil(t.project([e.wrapLat[1], 0], n).y / i.y)
        ];
      },
      _onMoveEnd: function() {
        !this._map || this._map._animatingZoom || this._update();
      },
      _getTiledPixelBounds: function(t) {
        var e = this._map, i = e._animatingZoom ? Math.max(e._animateToZoom, e.getZoom()) : e.getZoom(), n = e.getZoomScale(i, this._tileZoom), s = e.project(t, this._tileZoom).floor(), l = e.getSize().divideBy(n * 2);
        return new $(s.subtract(l), s.add(l));
      },
      // Private method to load tiles in the grid's active zoom level according to map bounds
      _update: function(t) {
        var e = this._map;
        if (e) {
          var i = this._clampZoom(e.getZoom());
          if (t === void 0 && (t = e.getCenter()), this._tileZoom !== void 0) {
            var n = this._getTiledPixelBounds(t), s = this._pxBoundsToTileRange(n), l = s.getCenter(), p = [], v = this.options.keepBuffer, y = new $(
              s.getBottomLeft().subtract([v, -v]),
              s.getTopRight().add([v, -v])
            );
            if (!(isFinite(s.min.x) && isFinite(s.min.y) && isFinite(s.max.x) && isFinite(s.max.y)))
              throw new Error("Attempted to load an infinite number of tiles");
            for (var b in this._tiles) {
              var M = this._tiles[b].coords;
              (M.z !== this._tileZoom || !y.contains(new O(M.x, M.y))) && (this._tiles[b].current = !1);
            }
            if (Math.abs(i - this._tileZoom) > 1) {
              this._setView(t, i);
              return;
            }
            for (var E = s.min.y; E <= s.max.y; E++)
              for (var I = s.min.x; I <= s.max.x; I++) {
                var ot = new O(I, E);
                if (ot.z = this._tileZoom, !!this._isValidTile(ot)) {
                  var Q = this._tiles[this._tileCoordsToKey(ot)];
                  Q ? Q.current = !0 : p.push(ot);
                }
              }
            if (p.sort(function(ht, Yt) {
              return ht.distanceTo(l) - Yt.distanceTo(l);
            }), p.length !== 0) {
              this._loading || (this._loading = !0, this.fire("loading"));
              var ft = document.createDocumentFragment();
              for (I = 0; I < p.length; I++)
                this._addTile(p[I], ft);
              this._level.el.appendChild(ft);
            }
          }
        }
      },
      _isValidTile: function(t) {
        var e = this._map.options.crs;
        if (!e.infinite) {
          var i = this._globalTileRange;
          if (!e.wrapLng && (t.x < i.min.x || t.x > i.max.x) || !e.wrapLat && (t.y < i.min.y || t.y > i.max.y))
            return !1;
        }
        if (!this.options.bounds)
          return !0;
        var n = this._tileCoordsToBounds(t);
        return q(this.options.bounds).overlaps(n);
      },
      _keyToBounds: function(t) {
        return this._tileCoordsToBounds(this._keyToTileCoords(t));
      },
      _tileCoordsToNwSe: function(t) {
        var e = this._map, i = this.getTileSize(), n = t.scaleBy(i), s = n.add(i), l = e.unproject(n, t.z), p = e.unproject(s, t.z);
        return [l, p];
      },
      // converts tile coordinates to its geographical bounds
      _tileCoordsToBounds: function(t) {
        var e = this._tileCoordsToNwSe(t), i = new at(e[0], e[1]);
        return this.options.noWrap || (i = this._map.wrapLatLngBounds(i)), i;
      },
      // converts tile coordinates to key for the tile cache
      _tileCoordsToKey: function(t) {
        return t.x + ":" + t.y + ":" + t.z;
      },
      // converts tile cache key to coordinates
      _keyToTileCoords: function(t) {
        var e = t.split(":"), i = new O(+e[0], +e[1]);
        return i.z = +e[2], i;
      },
      _removeTile: function(t) {
        var e = this._tiles[t];
        e && (W(e.el), delete this._tiles[t], this.fire("tileunload", {
          tile: e.el,
          coords: this._keyToTileCoords(t)
        }));
      },
      _initTile: function(t) {
        Z(t, "leaflet-tile");
        var e = this.getTileSize();
        t.style.width = e.x + "px", t.style.height = e.y + "px", t.onselectstart = m, t.onmousemove = m, S.ielt9 && this.options.opacity < 1 && ct(t, this.options.opacity);
      },
      _addTile: function(t, e) {
        var i = this._getTilePos(t), n = this._tileCoordsToKey(t), s = this.createTile(this._wrapCoords(t), a(this._tileReady, this, t));
        this._initTile(s), this.createTile.length < 2 && st(a(this._tileReady, this, t, null, s)), K(s, i), this._tiles[n] = {
          el: s,
          coords: t,
          current: !0
        }, e.appendChild(s), this.fire("tileloadstart", {
          tile: s,
          coords: t
        });
      },
      _tileReady: function(t, e, i) {
        e && this.fire("tileerror", {
          error: e,
          tile: i,
          coords: t
        });
        var n = this._tileCoordsToKey(t);
        i = this._tiles[n], i && (i.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (ct(i.el, 0), ut(this._fadeFrame), this._fadeFrame = st(this._updateOpacity, this)) : (i.active = !0, this._pruneTiles()), e || (Z(i.el, "leaflet-tile-loaded"), this.fire("tileload", {
          tile: i.el,
          coords: t
        })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), S.ielt9 || !this._map._fadeAnimated ? st(this._pruneTiles, this) : setTimeout(a(this._pruneTiles, this), 250)));
      },
      _getTilePos: function(t) {
        return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
      },
      _wrapCoords: function(t) {
        var e = new O(
          this._wrapX ? w(t.x, this._wrapX) : t.x,
          this._wrapY ? w(t.y, this._wrapY) : t.y
        );
        return e.z = t.z, e;
      },
      _pxBoundsToTileRange: function(t) {
        var e = this.getTileSize();
        return new $(
          t.min.unscaleBy(e).floor(),
          t.max.unscaleBy(e).ceil().subtract([1, 1])
        );
      },
      _noTilesToLoad: function() {
        for (var t in this._tiles)
          if (!this._tiles[t].loaded)
            return !1;
        return !0;
      }
    });
    function Ds(t) {
      return new _e(t);
    }
    var Kt = _e.extend({
      // @section
      // @aka TileLayer options
      options: {
        // @option minZoom: Number = 0
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        minZoom: 0,
        // @option maxZoom: Number = 18
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        maxZoom: 18,
        // @option subdomains: String|String[] = 'abc'
        // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
        subdomains: "abc",
        // @option errorTileUrl: String = ''
        // URL to the tile image to show in place of the tile that failed to load.
        errorTileUrl: "",
        // @option zoomOffset: Number = 0
        // The zoom number used in tile URLs will be offset with this value.
        zoomOffset: 0,
        // @option tms: Boolean = false
        // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
        tms: !1,
        // @option zoomReverse: Boolean = false
        // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
        zoomReverse: !1,
        // @option detectRetina: Boolean = false
        // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
        detectRetina: !1,
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: !1,
        // @option referrerPolicy: Boolean|String = false
        // Whether the referrerPolicy attribute will be added to the tiles.
        // If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
        // This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
        // (e.g. to validate an API token).
        // Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
        referrerPolicy: !1
      },
      initialize: function(t, e) {
        this._url = t, e = C(this, e), e.detectRetina && S.retina && e.maxZoom > 0 ? (e.tileSize = Math.floor(e.tileSize / 2), e.zoomReverse ? (e.zoomOffset--, e.minZoom = Math.min(e.maxZoom, e.minZoom + 1)) : (e.zoomOffset++, e.maxZoom = Math.max(e.minZoom, e.maxZoom - 1)), e.minZoom = Math.max(0, e.minZoom)) : e.zoomReverse ? e.minZoom = Math.min(e.maxZoom, e.minZoom) : e.maxZoom = Math.max(e.minZoom, e.maxZoom), typeof e.subdomains == "string" && (e.subdomains = e.subdomains.split("")), this.on("tileunload", this._onTileRemove);
      },
      // @method setUrl(url: String, noRedraw?: Boolean): this
      // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
      // If the URL does not change, the layer will not be redrawn unless
      // the noRedraw parameter is set to false.
      setUrl: function(t, e) {
        return this._url === t && e === void 0 && (e = !0), this._url = t, e || this.redraw(), this;
      },
      // @method createTile(coords: Object, done?: Function): HTMLElement
      // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
      // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
      // callback is called when the tile has been loaded.
      createTile: function(t, e) {
        var i = document.createElement("img");
        return z(i, "load", a(this._tileOnLoad, this, e, i)), z(i, "error", a(this._tileOnError, this, e, i)), (this.options.crossOrigin || this.options.crossOrigin === "") && (i.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (i.referrerPolicy = this.options.referrerPolicy), i.alt = "", i.src = this.getTileUrl(t), i;
      },
      // @section Extension methods
      // @uninheritable
      // Layers extending `TileLayer` might reimplement the following method.
      // @method getTileUrl(coords: Object): String
      // Called only internally, returns the URL for a tile given its coordinates.
      // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
      getTileUrl: function(t) {
        var e = {
          r: S.retina ? "@2x" : "",
          s: this._getSubdomain(t),
          x: t.x,
          y: t.y,
          z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
          var i = this._globalTileRange.max.y - t.y;
          this.options.tms && (e.y = i), e["-y"] = i;
        }
        return H(this._url, _(e, this.options));
      },
      _tileOnLoad: function(t, e) {
        S.ielt9 ? setTimeout(a(t, this, null, e), 0) : t(null, e);
      },
      _tileOnError: function(t, e, i) {
        var n = this.options.errorTileUrl;
        n && e.getAttribute("src") !== n && (e.src = n), t(i, e);
      },
      _onTileRemove: function(t) {
        t.tile.onload = null;
      },
      _getZoomForUrl: function() {
        var t = this._tileZoom, e = this.options.maxZoom, i = this.options.zoomReverse, n = this.options.zoomOffset;
        return i && (t = e - t), t + n;
      },
      _getSubdomain: function(t) {
        var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
        return this.options.subdomains[e];
      },
      // stops loading all tiles in the background layer
      _abortLoading: function() {
        var t, e;
        for (t in this._tiles)
          if (this._tiles[t].coords.z !== this._tileZoom && (e = this._tiles[t].el, e.onload = m, e.onerror = m, !e.complete)) {
            e.src = nt;
            var i = this._tiles[t].coords;
            W(e), delete this._tiles[t], this.fire("tileabort", {
              tile: e,
              coords: i
            });
          }
      },
      _removeTile: function(t) {
        var e = this._tiles[t];
        if (e)
          return e.el.setAttribute("src", nt), _e.prototype._removeTile.call(this, t);
      },
      _tileReady: function(t, e, i) {
        if (!(!this._map || i && i.getAttribute("src") === nt))
          return _e.prototype._tileReady.call(this, t, e, i);
      }
    });
    function Dn(t, e) {
      return new Kt(t, e);
    }
    var Un = Kt.extend({
      // @section
      // @aka TileLayer.WMS options
      // If any custom options not documented here are used, they will be sent to the
      // WMS server as extra parameters in each request URL. This can be useful for
      // [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
      defaultWmsParams: {
        service: "WMS",
        request: "GetMap",
        // @option layers: String = ''
        // **(required)** Comma-separated list of WMS layers to show.
        layers: "",
        // @option styles: String = ''
        // Comma-separated list of WMS styles.
        styles: "",
        // @option format: String = 'image/jpeg'
        // WMS image format (use `'image/png'` for layers with transparency).
        format: "image/jpeg",
        // @option transparent: Boolean = false
        // If `true`, the WMS service will return images with transparency.
        transparent: !1,
        // @option version: String = '1.1.1'
        // Version of the WMS service to use
        version: "1.1.1"
      },
      options: {
        // @option crs: CRS = null
        // Coordinate Reference System to use for the WMS requests, defaults to
        // map CRS. Don't change this if you're not sure what it means.
        crs: null,
        // @option uppercase: Boolean = false
        // If `true`, WMS request parameter keys will be uppercase.
        uppercase: !1
      },
      initialize: function(t, e) {
        this._url = t;
        var i = _({}, this.defaultWmsParams);
        for (var n in e)
          n in this.options || (i[n] = e[n]);
        e = C(this, e);
        var s = e.detectRetina && S.retina ? 2 : 1, l = this.getTileSize();
        i.width = l.x * s, i.height = l.y * s, this.wmsParams = i;
      },
      onAdd: function(t) {
        this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
        var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
        this.wmsParams[e] = this._crs.code, Kt.prototype.onAdd.call(this, t);
      },
      getTileUrl: function(t) {
        var e = this._tileCoordsToNwSe(t), i = this._crs, n = rt(i.project(e[0]), i.project(e[1])), s = n.min, l = n.max, p = (this._wmsVersion >= 1.3 && this._crs === On ? [s.y, s.x, l.y, l.x] : [s.x, s.y, l.x, l.y]).join(","), v = Kt.prototype.getTileUrl.call(this, t);
        return v + D(this.wmsParams, v, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + p;
      },
      // @method setParams(params: Object, noRedraw?: Boolean): this
      // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
      setParams: function(t, e) {
        return _(this.wmsParams, t), e || this.redraw(), this;
      }
    });
    function Us(t, e) {
      return new Un(t, e);
    }
    Kt.WMS = Un, Dn.wms = Us;
    var Mt = mt.extend({
      // @section
      // @aka Renderer options
      options: {
        // @option padding: Number = 0.1
        // How much to extend the clip area around the map view (relative to its size)
        // e.g. 0.1 would be 10% of map view in each direction
        padding: 0.1
      },
      initialize: function(t) {
        C(this, t), d(this), this._layers = this._layers || {};
      },
      onAdd: function() {
        this._container || (this._initContainer(), Z(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
      },
      onRemove: function() {
        this.off("update", this._updatePaths, this), this._destroyContainer();
      },
      getEvents: function() {
        var t = {
          viewreset: this._reset,
          zoom: this._onZoom,
          moveend: this._update,
          zoomend: this._onZoomEnd
        };
        return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t;
      },
      _onAnimZoom: function(t) {
        this._updateTransform(t.center, t.zoom);
      },
      _onZoom: function() {
        this._updateTransform(this._map.getCenter(), this._map.getZoom());
      },
      _updateTransform: function(t, e) {
        var i = this._map.getZoomScale(e, this._zoom), n = this._map.getSize().multiplyBy(0.5 + this.options.padding), s = this._map.project(this._center, e), l = n.multiplyBy(-i).add(s).subtract(this._map._getNewPixelOrigin(t, e));
        S.any3d ? zt(this._container, l, i) : K(this._container, l);
      },
      _reset: function() {
        this._update(), this._updateTransform(this._center, this._zoom);
        for (var t in this._layers)
          this._layers[t]._reset();
      },
      _onZoomEnd: function() {
        for (var t in this._layers)
          this._layers[t]._project();
      },
      _updatePaths: function() {
        for (var t in this._layers)
          this._layers[t]._update();
      },
      _update: function() {
        var t = this.options.padding, e = this._map.getSize(), i = this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();
        this._bounds = new $(i, i.add(e.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
      }
    }), Hn = Mt.extend({
      // @section
      // @aka Canvas options
      options: {
        // @option tolerance: Number = 0
        // How much to extend the click tolerance around a path/object on the map.
        tolerance: 0
      },
      getEvents: function() {
        var t = Mt.prototype.getEvents.call(this);
        return t.viewprereset = this._onViewPreReset, t;
      },
      _onViewPreReset: function() {
        this._postponeUpdatePaths = !0;
      },
      onAdd: function() {
        Mt.prototype.onAdd.call(this), this._draw();
      },
      _initContainer: function() {
        var t = this._container = document.createElement("canvas");
        z(t, "mousemove", this._onMouseMove, this), z(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), z(t, "mouseout", this._handleMouseOut, this), t._leaflet_disable_events = !0, this._ctx = t.getContext("2d");
      },
      _destroyContainer: function() {
        ut(this._redrawRequest), delete this._ctx, W(this._container), G(this._container), delete this._container;
      },
      _updatePaths: function() {
        if (!this._postponeUpdatePaths) {
          var t;
          this._redrawBounds = null;
          for (var e in this._layers)
            t = this._layers[e], t._update();
          this._redraw();
        }
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          Mt.prototype._update.call(this);
          var t = this._bounds, e = this._container, i = t.getSize(), n = S.retina ? 2 : 1;
          K(e, t.min), e.width = n * i.x, e.height = n * i.y, e.style.width = i.x + "px", e.style.height = i.y + "px", S.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
        }
      },
      _reset: function() {
        Mt.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
      },
      _initPath: function(t) {
        this._updateDashArray(t), this._layers[d(t)] = t;
        var e = t._order = {
          layer: t,
          prev: this._drawLast,
          next: null
        };
        this._drawLast && (this._drawLast.next = e), this._drawLast = e, this._drawFirst = this._drawFirst || this._drawLast;
      },
      _addPath: function(t) {
        this._requestRedraw(t);
      },
      _removePath: function(t) {
        var e = t._order, i = e.next, n = e.prev;
        i ? i.prev = n : this._drawLast = n, n ? n.next = i : this._drawFirst = i, delete t._order, delete this._layers[d(t)], this._requestRedraw(t);
      },
      _updatePath: function(t) {
        this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t);
      },
      _updateStyle: function(t) {
        this._updateDashArray(t), this._requestRedraw(t);
      },
      _updateDashArray: function(t) {
        if (typeof t.options.dashArray == "string") {
          var e = t.options.dashArray.split(/[, ]+/), i = [], n, s;
          for (s = 0; s < e.length; s++) {
            if (n = Number(e[s]), isNaN(n))
              return;
            i.push(n);
          }
          t.options._dashArray = i;
        } else
          t.options._dashArray = t.options.dashArray;
      },
      _requestRedraw: function(t) {
        this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || st(this._redraw, this));
      },
      _extendRedrawBounds: function(t) {
        if (t._pxBounds) {
          var e = (t.options.weight || 0) + 1;
          this._redrawBounds = this._redrawBounds || new $(), this._redrawBounds.extend(t._pxBounds.min.subtract([e, e])), this._redrawBounds.extend(t._pxBounds.max.add([e, e]));
        }
      },
      _redraw: function() {
        this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
      },
      _clear: function() {
        var t = this._redrawBounds;
        if (t) {
          var e = t.getSize();
          this._ctx.clearRect(t.min.x, t.min.y, e.x, e.y);
        } else
          this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
      },
      _draw: function() {
        var t, e = this._redrawBounds;
        if (this._ctx.save(), e) {
          var i = e.getSize();
          this._ctx.beginPath(), this._ctx.rect(e.min.x, e.min.y, i.x, i.y), this._ctx.clip();
        }
        this._drawing = !0;
        for (var n = this._drawFirst; n; n = n.next)
          t = n.layer, (!e || t._pxBounds && t._pxBounds.intersects(e)) && t._updatePath();
        this._drawing = !1, this._ctx.restore();
      },
      _updatePoly: function(t, e) {
        if (this._drawing) {
          var i, n, s, l, p = t._parts, v = p.length, y = this._ctx;
          if (v) {
            for (y.beginPath(), i = 0; i < v; i++) {
              for (n = 0, s = p[i].length; n < s; n++)
                l = p[i][n], y[n ? "lineTo" : "moveTo"](l.x, l.y);
              e && y.closePath();
            }
            this._fillStroke(y, t);
          }
        }
      },
      _updateCircle: function(t) {
        if (!(!this._drawing || t._empty())) {
          var e = t._point, i = this._ctx, n = Math.max(Math.round(t._radius), 1), s = (Math.max(Math.round(t._radiusY), 1) || n) / n;
          s !== 1 && (i.save(), i.scale(1, s)), i.beginPath(), i.arc(e.x, e.y / s, n, 0, Math.PI * 2, !1), s !== 1 && i.restore(), this._fillStroke(i, t);
        }
      },
      _fillStroke: function(t, e) {
        var i = e.options;
        i.fill && (t.globalAlpha = i.fillOpacity, t.fillStyle = i.fillColor || i.color, t.fill(i.fillRule || "evenodd")), i.stroke && i.weight !== 0 && (t.setLineDash && t.setLineDash(e.options && e.options._dashArray || []), t.globalAlpha = i.opacity, t.lineWidth = i.weight, t.strokeStyle = i.color, t.lineCap = i.lineCap, t.lineJoin = i.lineJoin, t.stroke());
      },
      // Canvas obviously doesn't have mouse events for individual drawn objects,
      // so we emulate that by calculating what's under the mouse on mousemove/click manually
      _onClick: function(t) {
        for (var e = this._map.mouseEventToLayerPoint(t), i, n, s = this._drawFirst; s; s = s.next)
          i = s.layer, i.options.interactive && i._containsPoint(e) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(i)) && (n = i);
        this._fireEvent(n ? [n] : !1, t);
      },
      _onMouseMove: function(t) {
        if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
          var e = this._map.mouseEventToLayerPoint(t);
          this._handleMouseHover(t, e);
        }
      },
      _handleMouseOut: function(t) {
        var e = this._hoveredLayer;
        e && (V(this._container, "leaflet-interactive"), this._fireEvent([e], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
      },
      _handleMouseHover: function(t, e) {
        if (!this._mouseHoverThrottled) {
          for (var i, n, s = this._drawFirst; s; s = s.next)
            i = s.layer, i.options.interactive && i._containsPoint(e) && (n = i);
          n !== this._hoveredLayer && (this._handleMouseOut(t), n && (Z(this._container, "leaflet-interactive"), this._fireEvent([n], t, "mouseover"), this._hoveredLayer = n)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, t), this._mouseHoverThrottled = !0, setTimeout(a(function() {
            this._mouseHoverThrottled = !1;
          }, this), 32);
        }
      },
      _fireEvent: function(t, e, i) {
        this._map._fireDOMEvent(e, i || e.type, t);
      },
      _bringToFront: function(t) {
        var e = t._order;
        if (e) {
          var i = e.next, n = e.prev;
          if (i)
            i.prev = n;
          else
            return;
          n ? n.next = i : i && (this._drawFirst = i), e.prev = this._drawLast, this._drawLast.next = e, e.next = null, this._drawLast = e, this._requestRedraw(t);
        }
      },
      _bringToBack: function(t) {
        var e = t._order;
        if (e) {
          var i = e.next, n = e.prev;
          if (n)
            n.next = i;
          else
            return;
          i ? i.prev = n : n && (this._drawLast = n), e.prev = null, e.next = this._drawFirst, this._drawFirst.prev = e, this._drawFirst = e, this._requestRedraw(t);
        }
      }
    });
    function Gn(t) {
      return S.canvas ? new Hn(t) : null;
    }
    var pe = function() {
      try {
        return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
          return document.createElement("<lvml:" + t + ' class="lvml">');
        };
      } catch {
      }
      return function(t) {
        return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
      };
    }(), Hs = {
      _initContainer: function() {
        this._container = R("div", "leaflet-vml-container");
      },
      _update: function() {
        this._map._animatingZoom || (Mt.prototype._update.call(this), this.fire("update"));
      },
      _initPath: function(t) {
        var e = t._container = pe("shape");
        Z(e, "leaflet-vml-shape " + (this.options.className || "")), e.coordsize = "1 1", t._path = pe("path"), e.appendChild(t._path), this._updateStyle(t), this._layers[d(t)] = t;
      },
      _addPath: function(t) {
        var e = t._container;
        this._container.appendChild(e), t.options.interactive && t.addInteractiveTarget(e);
      },
      _removePath: function(t) {
        var e = t._container;
        W(e), t.removeInteractiveTarget(e), delete this._layers[d(t)];
      },
      _updateStyle: function(t) {
        var e = t._stroke, i = t._fill, n = t.options, s = t._container;
        s.stroked = !!n.stroke, s.filled = !!n.fill, n.stroke ? (e || (e = t._stroke = pe("stroke")), s.appendChild(e), e.weight = n.weight + "px", e.color = n.color, e.opacity = n.opacity, n.dashArray ? e.dashStyle = F(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : e.dashStyle = "", e.endcap = n.lineCap.replace("butt", "flat"), e.joinstyle = n.lineJoin) : e && (s.removeChild(e), t._stroke = null), n.fill ? (i || (i = t._fill = pe("fill")), s.appendChild(i), i.color = n.fillColor || n.color, i.opacity = n.fillOpacity) : i && (s.removeChild(i), t._fill = null);
      },
      _updateCircle: function(t) {
        var e = t._point.round(), i = Math.round(t._radius), n = Math.round(t._radiusY || i);
        this._setPath(t, t._empty() ? "M0 0" : "AL " + e.x + "," + e.y + " " + i + "," + n + " 0," + 65535 * 360);
      },
      _setPath: function(t, e) {
        t._path.v = e;
      },
      _bringToFront: function(t) {
        Ft(t._container);
      },
      _bringToBack: function(t) {
        $t(t._container);
      }
    }, Ge = S.vml ? pe : Wi, me = Mt.extend({
      _initContainer: function() {
        this._container = Ge("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Ge("g"), this._container.appendChild(this._rootGroup);
      },
      _destroyContainer: function() {
        W(this._container), G(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          Mt.prototype._update.call(this);
          var t = this._bounds, e = t.getSize(), i = this._container;
          (!this._svgSize || !this._svgSize.equals(e)) && (this._svgSize = e, i.setAttribute("width", e.x), i.setAttribute("height", e.y)), K(i, t.min), i.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" ")), this.fire("update");
        }
      },
      // methods below are called by vector layers implementations
      _initPath: function(t) {
        var e = t._path = Ge("path");
        t.options.className && Z(e, t.options.className), t.options.interactive && Z(e, "leaflet-interactive"), this._updateStyle(t), this._layers[d(t)] = t;
      },
      _addPath: function(t) {
        this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
      },
      _removePath: function(t) {
        W(t._path), t.removeInteractiveTarget(t._path), delete this._layers[d(t)];
      },
      _updatePath: function(t) {
        t._project(), t._update();
      },
      _updateStyle: function(t) {
        var e = t._path, i = t.options;
        e && (i.stroke ? (e.setAttribute("stroke", i.color), e.setAttribute("stroke-opacity", i.opacity), e.setAttribute("stroke-width", i.weight), e.setAttribute("stroke-linecap", i.lineCap), e.setAttribute("stroke-linejoin", i.lineJoin), i.dashArray ? e.setAttribute("stroke-dasharray", i.dashArray) : e.removeAttribute("stroke-dasharray"), i.dashOffset ? e.setAttribute("stroke-dashoffset", i.dashOffset) : e.removeAttribute("stroke-dashoffset")) : e.setAttribute("stroke", "none"), i.fill ? (e.setAttribute("fill", i.fillColor || i.color), e.setAttribute("fill-opacity", i.fillOpacity), e.setAttribute("fill-rule", i.fillRule || "evenodd")) : e.setAttribute("fill", "none"));
      },
      _updatePoly: function(t, e) {
        this._setPath(t, Vi(t._parts, e));
      },
      _updateCircle: function(t) {
        var e = t._point, i = Math.max(Math.round(t._radius), 1), n = Math.max(Math.round(t._radiusY), 1) || i, s = "a" + i + "," + n + " 0 1,0 ", l = t._empty() ? "M0 0" : "M" + (e.x - i) + "," + e.y + s + i * 2 + ",0 " + s + -i * 2 + ",0 ";
        this._setPath(t, l);
      },
      _setPath: function(t, e) {
        t._path.setAttribute("d", e);
      },
      // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
      _bringToFront: function(t) {
        Ft(t._path);
      },
      _bringToBack: function(t) {
        $t(t._path);
      }
    });
    S.vml && me.include(Hs);
    function Fn(t) {
      return S.svg || S.vml ? new me(t) : null;
    }
    N.include({
      // @namespace Map; @method getRenderer(layer: Path): Renderer
      // Returns the instance of `Renderer` that should be used to render the given
      // `Path`. It will ensure that the `renderer` options of the map and paths
      // are respected, and that the renderers do exist on the map.
      getRenderer: function(t) {
        var e = t.options.renderer || this._getPaneRenderer(t.options.pane) || this.options.renderer || this._renderer;
        return e || (e = this._renderer = this._createRenderer()), this.hasLayer(e) || this.addLayer(e), e;
      },
      _getPaneRenderer: function(t) {
        if (t === "overlayPane" || t === void 0)
          return !1;
        var e = this._paneRenderers[t];
        return e === void 0 && (e = this._createRenderer({ pane: t }), this._paneRenderers[t] = e), e;
      },
      _createRenderer: function(t) {
        return this.options.preferCanvas && Gn(t) || Fn(t);
      }
    });
    var $n = jt.extend({
      initialize: function(t, e) {
        jt.prototype.initialize.call(this, this._boundsToLatLngs(t), e);
      },
      // @method setBounds(latLngBounds: LatLngBounds): this
      // Redraws the rectangle with the passed bounds.
      setBounds: function(t) {
        return this.setLatLngs(this._boundsToLatLngs(t));
      },
      _boundsToLatLngs: function(t) {
        return t = q(t), [
          t.getSouthWest(),
          t.getNorthWest(),
          t.getNorthEast(),
          t.getSouthEast()
        ];
      }
    });
    function Gs(t, e) {
      return new $n(t, e);
    }
    me.create = Ge, me.pointsToPath = Vi, Ct.geometryToLayer = Ie, Ct.coordsToLatLng = Mi, Ct.coordsToLatLngs = Be, Ct.latLngToCoords = Ti, Ct.latLngsToCoords = Ne, Ct.getFeature = qt, Ct.asFeature = Re, N.mergeOptions({
      // @option boxZoom: Boolean = true
      // Whether the map can be zoomed to a rectangular area specified by
      // dragging the mouse while pressing the shift key.
      boxZoom: !0
    });
    var Wn = yt.extend({
      initialize: function(t) {
        this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
      },
      addHooks: function() {
        z(this._container, "mousedown", this._onMouseDown, this);
      },
      removeHooks: function() {
        G(this._container, "mousedown", this._onMouseDown, this);
      },
      moved: function() {
        return this._moved;
      },
      _destroy: function() {
        W(this._pane), delete this._pane;
      },
      _resetState: function() {
        this._resetStateTimeout = 0, this._moved = !1;
      },
      _clearDeferredResetState: function() {
        this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
      },
      _onMouseDown: function(t) {
        if (!t.shiftKey || t.which !== 1 && t.button !== 1)
          return !1;
        this._clearDeferredResetState(), this._resetState(), ae(), li(), this._startPoint = this._map.mouseEventToContainerPoint(t), z(document, {
          contextmenu: Bt,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseMove: function(t) {
        this._moved || (this._moved = !0, this._box = R("div", "leaflet-zoom-box", this._container), Z(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
        var e = new $(this._point, this._startPoint), i = e.getSize();
        K(this._box, e.min), this._box.style.width = i.x + "px", this._box.style.height = i.y + "px";
      },
      _finish: function() {
        this._moved && (W(this._box), V(this._container, "leaflet-crosshair")), he(), ui(), G(document, {
          contextmenu: Bt,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseUp: function(t) {
        if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
          this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(a(this._resetState, this), 0);
          var e = new at(
            this._map.containerPointToLatLng(this._startPoint),
            this._map.containerPointToLatLng(this._point)
          );
          this._map.fitBounds(e).fire("boxzoomend", { boxZoomBounds: e });
        }
      },
      _onKeyDown: function(t) {
        t.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
      }
    });
    N.addInitHook("addHandler", "boxZoom", Wn), N.mergeOptions({
      // @option doubleClickZoom: Boolean|String = true
      // Whether the map can be zoomed in by double clicking on it and
      // zoomed out by double clicking while holding shift. If passed
      // `'center'`, double-click zoom will zoom to the center of the
      //  view regardless of where the mouse was.
      doubleClickZoom: !0
    });
    var Vn = yt.extend({
      addHooks: function() {
        this._map.on("dblclick", this._onDoubleClick, this);
      },
      removeHooks: function() {
        this._map.off("dblclick", this._onDoubleClick, this);
      },
      _onDoubleClick: function(t) {
        var e = this._map, i = e.getZoom(), n = e.options.zoomDelta, s = t.originalEvent.shiftKey ? i - n : i + n;
        e.options.doubleClickZoom === "center" ? e.setZoom(s) : e.setZoomAround(t.containerPoint, s);
      }
    });
    N.addInitHook("addHandler", "doubleClickZoom", Vn), N.mergeOptions({
      // @option dragging: Boolean = true
      // Whether the map is draggable with mouse/touch or not.
      dragging: !0,
      // @section Panning Inertia Options
      // @option inertia: Boolean = *
      // If enabled, panning of the map will have an inertia effect where
      // the map builds momentum while dragging and continues moving in
      // the same direction for some time. Feels especially nice on touch
      // devices. Enabled by default.
      inertia: !0,
      // @option inertiaDeceleration: Number = 3000
      // The rate with which the inertial movement slows down, in pixels/second².
      inertiaDeceleration: 3400,
      // px/s^2
      // @option inertiaMaxSpeed: Number = Infinity
      // Max speed of the inertial movement, in pixels/second.
      inertiaMaxSpeed: 1 / 0,
      // px/s
      // @option easeLinearity: Number = 0.2
      easeLinearity: 0.2,
      // TODO refactor, move to CRS
      // @option worldCopyJump: Boolean = false
      // With this option enabled, the map tracks when you pan to another "copy"
      // of the world and seamlessly jumps to the original one so that all overlays
      // like markers and vector layers are still visible.
      worldCopyJump: !1,
      // @option maxBoundsViscosity: Number = 0.0
      // If `maxBounds` is set, this option will control how solid the bounds
      // are when dragging the map around. The default value of `0.0` allows the
      // user to drag outside the bounds at normal speed, higher values will
      // slow down map dragging outside bounds, and `1.0` makes the bounds fully
      // solid, preventing the user from dragging outside the bounds.
      maxBoundsViscosity: 0
    });
    var jn = yt.extend({
      addHooks: function() {
        if (!this._draggable) {
          var t = this._map;
          this._draggable = new kt(t._mapPane, t._container), this._draggable.on({
            dragstart: this._onDragStart,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
        }
        Z(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
      },
      removeHooks: function() {
        V(this._map._container, "leaflet-grab"), V(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      moving: function() {
        return this._draggable && this._draggable._moving;
      },
      _onDragStart: function() {
        var t = this._map;
        if (t._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
          var e = q(this._map.options.maxBounds);
          this._offsetLimit = rt(
            this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),
            this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
          ), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
        } else
          this._offsetLimit = null;
        t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = []);
      },
      _onDrag: function(t) {
        if (this._map.options.inertia) {
          var e = this._lastTime = +/* @__PURE__ */ new Date(), i = this._lastPos = this._draggable._absPos || this._draggable._newPos;
          this._positions.push(i), this._times.push(e), this._prunePositions(e);
        }
        this._map.fire("move", t).fire("drag", t);
      },
      _prunePositions: function(t) {
        for (; this._positions.length > 1 && t - this._times[0] > 50; )
          this._positions.shift(), this._times.shift();
      },
      _onZoomEnd: function() {
        var t = this._map.getSize().divideBy(2), e = this._map.latLngToLayerPoint([0, 0]);
        this._initialWorldOffset = e.subtract(t).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
      },
      _viscousLimit: function(t, e) {
        return t - (t - e) * this._viscosity;
      },
      _onPreDragLimit: function() {
        if (!(!this._viscosity || !this._offsetLimit)) {
          var t = this._draggable._newPos.subtract(this._draggable._startPos), e = this._offsetLimit;
          t.x < e.min.x && (t.x = this._viscousLimit(t.x, e.min.x)), t.y < e.min.y && (t.y = this._viscousLimit(t.y, e.min.y)), t.x > e.max.x && (t.x = this._viscousLimit(t.x, e.max.x)), t.y > e.max.y && (t.y = this._viscousLimit(t.y, e.max.y)), this._draggable._newPos = this._draggable._startPos.add(t);
        }
      },
      _onPreDragWrap: function() {
        var t = this._worldWidth, e = Math.round(t / 2), i = this._initialWorldOffset, n = this._draggable._newPos.x, s = (n - e + i) % t + e - i, l = (n + e + i) % t - e - i, p = Math.abs(s + i) < Math.abs(l + i) ? s : l;
        this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = p;
      },
      _onDragEnd: function(t) {
        var e = this._map, i = e.options, n = !i.inertia || t.noInertia || this._times.length < 2;
        if (e.fire("dragend", t), n)
          e.fire("moveend");
        else {
          this._prunePositions(+/* @__PURE__ */ new Date());
          var s = this._lastPos.subtract(this._positions[0]), l = (this._lastTime - this._times[0]) / 1e3, p = i.easeLinearity, v = s.multiplyBy(p / l), y = v.distanceTo([0, 0]), b = Math.min(i.inertiaMaxSpeed, y), M = v.multiplyBy(b / y), E = b / (i.inertiaDeceleration * p), I = M.multiplyBy(-E / 2).round();
          !I.x && !I.y ? e.fire("moveend") : (I = e._limitOffset(I, e.options.maxBounds), st(function() {
            e.panBy(I, {
              duration: E,
              easeLinearity: p,
              noMoveStart: !0,
              animate: !0
            });
          }));
        }
      }
    });
    N.addInitHook("addHandler", "dragging", jn), N.mergeOptions({
      // @option keyboard: Boolean = true
      // Makes the map focusable and allows users to navigate the map with keyboard
      // arrows and `+`/`-` keys.
      keyboard: !0,
      // @option keyboardPanDelta: Number = 80
      // Amount of pixels to pan when pressing an arrow key.
      keyboardPanDelta: 80
    });
    var qn = yt.extend({
      keyCodes: {
        left: [37],
        right: [39],
        down: [40],
        up: [38],
        zoomIn: [187, 107, 61, 171],
        zoomOut: [189, 109, 54, 173]
      },
      initialize: function(t) {
        this._map = t, this._setPanDelta(t.options.keyboardPanDelta), this._setZoomDelta(t.options.zoomDelta);
      },
      addHooks: function() {
        var t = this._map._container;
        t.tabIndex <= 0 && (t.tabIndex = "0"), z(t, {
          focus: this._onFocus,
          blur: this._onBlur,
          mousedown: this._onMouseDown
        }, this), this._map.on({
          focus: this._addHooks,
          blur: this._removeHooks
        }, this);
      },
      removeHooks: function() {
        this._removeHooks(), G(this._map._container, {
          focus: this._onFocus,
          blur: this._onBlur,
          mousedown: this._onMouseDown
        }, this), this._map.off({
          focus: this._addHooks,
          blur: this._removeHooks
        }, this);
      },
      _onMouseDown: function() {
        if (!this._focused) {
          var t = document.body, e = document.documentElement, i = t.scrollTop || e.scrollTop, n = t.scrollLeft || e.scrollLeft;
          this._map._container.focus(), window.scrollTo(n, i);
        }
      },
      _onFocus: function() {
        this._focused = !0, this._map.fire("focus");
      },
      _onBlur: function() {
        this._focused = !1, this._map.fire("blur");
      },
      _setPanDelta: function(t) {
        var e = this._panKeys = {}, i = this.keyCodes, n, s;
        for (n = 0, s = i.left.length; n < s; n++)
          e[i.left[n]] = [-1 * t, 0];
        for (n = 0, s = i.right.length; n < s; n++)
          e[i.right[n]] = [t, 0];
        for (n = 0, s = i.down.length; n < s; n++)
          e[i.down[n]] = [0, t];
        for (n = 0, s = i.up.length; n < s; n++)
          e[i.up[n]] = [0, -1 * t];
      },
      _setZoomDelta: function(t) {
        var e = this._zoomKeys = {}, i = this.keyCodes, n, s;
        for (n = 0, s = i.zoomIn.length; n < s; n++)
          e[i.zoomIn[n]] = t;
        for (n = 0, s = i.zoomOut.length; n < s; n++)
          e[i.zoomOut[n]] = -t;
      },
      _addHooks: function() {
        z(document, "keydown", this._onKeyDown, this);
      },
      _removeHooks: function() {
        G(document, "keydown", this._onKeyDown, this);
      },
      _onKeyDown: function(t) {
        if (!(t.altKey || t.ctrlKey || t.metaKey)) {
          var e = t.keyCode, i = this._map, n;
          if (e in this._panKeys) {
            if (!i._panAnim || !i._panAnim._inProgress)
              if (n = this._panKeys[e], t.shiftKey && (n = A(n).multiplyBy(3)), i.options.maxBounds && (n = i._limitOffset(A(n), i.options.maxBounds)), i.options.worldCopyJump) {
                var s = i.wrapLatLng(i.unproject(i.project(i.getCenter()).add(n)));
                i.panTo(s);
              } else
                i.panBy(n);
          } else if (e in this._zoomKeys)
            i.setZoom(i.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e]);
          else if (e === 27 && i._popup && i._popup.options.closeOnEscapeKey)
            i.closePopup();
          else
            return;
          Bt(t);
        }
      }
    });
    N.addInitHook("addHandler", "keyboard", qn), N.mergeOptions({
      // @section Mouse wheel options
      // @option scrollWheelZoom: Boolean|String = true
      // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
      // it will zoom to the center of the view regardless of where the mouse was.
      scrollWheelZoom: !0,
      // @option wheelDebounceTime: Number = 40
      // Limits the rate at which a wheel can fire (in milliseconds). By default
      // user can't zoom via wheel more often than once per 40 ms.
      wheelDebounceTime: 40,
      // @option wheelPxPerZoomLevel: Number = 60
      // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
      // mean a change of one full zoom level. Smaller values will make wheel-zooming
      // faster (and vice versa).
      wheelPxPerZoomLevel: 60
    });
    var Kn = yt.extend({
      addHooks: function() {
        z(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
      },
      removeHooks: function() {
        G(this._map._container, "wheel", this._onWheelScroll, this);
      },
      _onWheelScroll: function(t) {
        var e = yn(t), i = this._map.options.wheelDebounceTime;
        this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
        var n = Math.max(i - (+/* @__PURE__ */ new Date() - this._startTime), 0);
        clearTimeout(this._timer), this._timer = setTimeout(a(this._performZoom, this), n), Bt(t);
      },
      _performZoom: function() {
        var t = this._map, e = t.getZoom(), i = this._map.options.zoomSnap || 0;
        t._stop();
        var n = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), s = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(n)))) / Math.LN2, l = i ? Math.ceil(s / i) * i : s, p = t._limitZoom(e + (this._delta > 0 ? l : -l)) - e;
        this._delta = 0, this._startTime = null, p && (t.options.scrollWheelZoom === "center" ? t.setZoom(e + p) : t.setZoomAround(this._lastMousePos, e + p));
      }
    });
    N.addInitHook("addHandler", "scrollWheelZoom", Kn);
    var Fs = 600;
    N.mergeOptions({
      // @section Touch interaction options
      // @option tapHold: Boolean
      // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
      tapHold: S.touchNative && S.safari && S.mobile,
      // @option tapTolerance: Number = 15
      // The max number of pixels a user can shift his finger during touch
      // for it to be considered a valid tap.
      tapTolerance: 15
    });
    var Yn = yt.extend({
      addHooks: function() {
        z(this._map._container, "touchstart", this._onDown, this);
      },
      removeHooks: function() {
        G(this._map._container, "touchstart", this._onDown, this);
      },
      _onDown: function(t) {
        if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
          var e = t.touches[0];
          this._startPos = this._newPos = new O(e.clientX, e.clientY), this._holdTimeout = setTimeout(a(function() {
            this._cancel(), this._isTapValid() && (z(document, "touchend", it), z(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", e));
          }, this), Fs), z(document, "touchend touchcancel contextmenu", this._cancel, this), z(document, "touchmove", this._onMove, this);
        }
      },
      _cancelClickPrevent: function t() {
        G(document, "touchend", it), G(document, "touchend touchcancel", t);
      },
      _cancel: function() {
        clearTimeout(this._holdTimeout), G(document, "touchend touchcancel contextmenu", this._cancel, this), G(document, "touchmove", this._onMove, this);
      },
      _onMove: function(t) {
        var e = t.touches[0];
        this._newPos = new O(e.clientX, e.clientY);
      },
      _isTapValid: function() {
        return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
      },
      _simulateEvent: function(t, e) {
        var i = new MouseEvent(t, {
          bubbles: !0,
          cancelable: !0,
          view: window,
          // detail: 1,
          screenX: e.screenX,
          screenY: e.screenY,
          clientX: e.clientX,
          clientY: e.clientY
          // button: 2,
          // buttons: 2
        });
        i._simulated = !0, e.target.dispatchEvent(i);
      }
    });
    N.addInitHook("addHandler", "tapHold", Yn), N.mergeOptions({
      // @section Touch interaction options
      // @option touchZoom: Boolean|String = *
      // Whether the map can be zoomed by touch-dragging with two fingers. If
      // passed `'center'`, it will zoom to the center of the view regardless of
      // where the touch events (fingers) were. Enabled for touch-capable web
      // browsers.
      touchZoom: S.touch,
      // @option bounceAtZoomLimits: Boolean = true
      // Set it to false if you don't want the map to zoom beyond min/max zoom
      // and then bounce back when pinch-zooming.
      bounceAtZoomLimits: !0
    });
    var Xn = yt.extend({
      addHooks: function() {
        Z(this._map._container, "leaflet-touch-zoom"), z(this._map._container, "touchstart", this._onTouchStart, this);
      },
      removeHooks: function() {
        V(this._map._container, "leaflet-touch-zoom"), G(this._map._container, "touchstart", this._onTouchStart, this);
      },
      _onTouchStart: function(t) {
        var e = this._map;
        if (!(!t.touches || t.touches.length !== 2 || e._animatingZoom || this._zooming)) {
          var i = e.mouseEventToContainerPoint(t.touches[0]), n = e.mouseEventToContainerPoint(t.touches[1]);
          this._centerPoint = e.getSize()._divideBy(2), this._startLatLng = e.containerPointToLatLng(this._centerPoint), e.options.touchZoom !== "center" && (this._pinchStartLatLng = e.containerPointToLatLng(i.add(n)._divideBy(2))), this._startDist = i.distanceTo(n), this._startZoom = e.getZoom(), this._moved = !1, this._zooming = !0, e._stop(), z(document, "touchmove", this._onTouchMove, this), z(document, "touchend touchcancel", this._onTouchEnd, this), it(t);
        }
      },
      _onTouchMove: function(t) {
        if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
          var e = this._map, i = e.mouseEventToContainerPoint(t.touches[0]), n = e.mouseEventToContainerPoint(t.touches[1]), s = i.distanceTo(n) / this._startDist;
          if (this._zoom = e.getScaleZoom(s, this._startZoom), !e.options.bounceAtZoomLimits && (this._zoom < e.getMinZoom() && s < 1 || this._zoom > e.getMaxZoom() && s > 1) && (this._zoom = e._limitZoom(this._zoom)), e.options.touchZoom === "center") {
            if (this._center = this._startLatLng, s === 1)
              return;
          } else {
            var l = i._add(n)._divideBy(2)._subtract(this._centerPoint);
            if (s === 1 && l.x === 0 && l.y === 0)
              return;
            this._center = e.unproject(e.project(this._pinchStartLatLng, this._zoom).subtract(l), this._zoom);
          }
          this._moved || (e._moveStart(!0, !1), this._moved = !0), ut(this._animRequest);
          var p = a(e._move, e, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
          this._animRequest = st(p, this, !0), it(t);
        }
      },
      _onTouchEnd: function() {
        if (!this._moved || !this._zooming) {
          this._zooming = !1;
          return;
        }
        this._zooming = !1, ut(this._animRequest), G(document, "touchmove", this._onTouchMove, this), G(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
      }
    });
    N.addInitHook("addHandler", "touchZoom", Xn), N.BoxZoom = Wn, N.DoubleClickZoom = Vn, N.Drag = jn, N.Keyboard = qn, N.ScrollWheelZoom = Kn, N.TapHold = Yn, N.TouchZoom = Xn, h.Bounds = $, h.Browser = S, h.CRS = xt, h.Canvas = Hn, h.Circle = Ci, h.CircleMarker = Ze, h.Class = wt, h.Control = pt, h.DivIcon = Rn, h.DivOverlay = Lt, h.DomEvent = as, h.DomUtil = ss, h.Draggable = kt, h.Evented = ie, h.FeatureGroup = Pt, h.GeoJSON = Ct, h.GridLayer = _e, h.Handler = yt, h.Icon = Vt, h.ImageOverlay = De, h.LatLng = U, h.LatLngBounds = at, h.Layer = mt, h.LayerGroup = Wt, h.LineUtil = Ls, h.Map = N, h.Marker = ze, h.Mixin = _s, h.Path = Et, h.Point = O, h.PolyUtil = ps, h.Polygon = jt, h.Polyline = bt, h.Popup = Ue, h.PosAnimation = Ln, h.Projection = ws, h.Rectangle = $n, h.Renderer = Mt, h.SVG = me, h.SVGOverlay = Nn, h.TileLayer = Kt, h.Tooltip = He, h.Transformation = Xe, h.Util = To, h.VideoOverlay = Bn, h.bind = a, h.bounds = rt, h.canvas = Gn, h.circle = ks, h.circleMarker = Ss, h.control = ce, h.divIcon = Rs, h.extend = _, h.featureGroup = Cs, h.geoJSON = In, h.geoJson = Os, h.gridLayer = Ds, h.icon = Ms, h.imageOverlay = zs, h.latLng = B, h.latLngBounds = q, h.layerGroup = bs, h.map = hs, h.marker = Ts, h.point = A, h.polygon = As, h.polyline = Es, h.popup = Bs, h.rectangle = Gs, h.setOptions = C, h.stamp = d, h.svg = Fn, h.svgOverlay = Is, h.tileLayer = Dn, h.tooltip = Ns, h.transformation = ne, h.version = f, h.videoOverlay = Zs;
    var $s = window.L;
    h.noConflict = function() {
      return window.L = $s, this;
    }, window.L = h;
  });
})(Ii, Ii.exports);
var Pr = Ii.exports;
const X = /* @__PURE__ */ xr(Pr);
var fo = { exports: {} };
(function(u, r) {
  (function(h, f) {
    f(r);
  })(Co, function(h) {
    var f = L.MarkerClusterGroup = L.FeatureGroup.extend({
      options: {
        maxClusterRadius: 80,
        //A cluster will cover at most this many pixels from its center
        iconCreateFunction: null,
        clusterPane: L.Marker.prototype.options.pane,
        spiderfyOnEveryZoom: !1,
        spiderfyOnMaxZoom: !0,
        showCoverageOnHover: !0,
        zoomToBoundsOnClick: !0,
        singleMarkerMode: !1,
        disableClusteringAtZoom: null,
        // Setting this to false prevents the removal of any clusters outside of the viewpoint, which
        // is the default behaviour for performance reasons.
        removeOutsideVisibleBounds: !0,
        // Set to false to disable all animations (zoom and spiderfy).
        // If false, option animateAddingMarkers below has no effect.
        // If L.DomUtil.TRANSITION is falsy, this option has no effect.
        animate: !0,
        //Whether to animate adding markers after adding the MarkerClusterGroup to the map
        // If you are adding individual markers set to true, if adding bulk markers leave false for massive performance gains.
        animateAddingMarkers: !1,
        // Make it possible to provide custom function to calculate spiderfy shape positions
        spiderfyShapePositions: null,
        //Increase to increase the distance away that spiderfied markers appear from the center
        spiderfyDistanceMultiplier: 1,
        // Make it possible to specify a polyline options on a spider leg
        spiderLegPolylineOptions: { weight: 1.5, color: "#222", opacity: 0.5 },
        // When bulk adding layers, adds markers in chunks. Means addLayers may not add all the layers in the call, others will be loaded during setTimeouts
        chunkedLoading: !1,
        chunkInterval: 200,
        // process markers for a maximum of ~ n milliseconds (then trigger the chunkProgress callback)
        chunkDelay: 50,
        // at the end of each interval, give n milliseconds back to system/browser
        chunkProgress: null,
        // progress callback: function(processed, total, elapsed) (e.g. for a progress indicator)
        //Options to pass to the L.Polygon constructor
        polygonOptions: {}
      },
      initialize: function(o) {
        L.Util.setOptions(this, o), this.options.iconCreateFunction || (this.options.iconCreateFunction = this._defaultIconCreateFunction), this._featureGroup = L.featureGroup(), this._featureGroup.addEventParent(this), this._nonPointGroup = L.featureGroup(), this._nonPointGroup.addEventParent(this), this._inZoomAnimation = 0, this._needsClustering = [], this._needsRemoving = [], this._currentShownBounds = null, this._queue = [], this._childMarkerEventHandlers = {
          dragstart: this._childMarkerDragStart,
          move: this._childMarkerMoved,
          dragend: this._childMarkerDragEnd
        };
        var a = L.DomUtil.TRANSITION && this.options.animate;
        L.extend(this, a ? this._withAnimation : this._noAnimation), this._markerCluster = a ? L.MarkerCluster : L.MarkerClusterNonAnimated;
      },
      addLayer: function(o) {
        if (o instanceof L.LayerGroup)
          return this.addLayers([o]);
        if (!o.getLatLng)
          return this._nonPointGroup.addLayer(o), this.fire("layeradd", { layer: o }), this;
        if (!this._map)
          return this._needsClustering.push(o), this.fire("layeradd", { layer: o }), this;
        if (this.hasLayer(o))
          return this;
        this._unspiderfy && this._unspiderfy(), this._addLayer(o, this._maxZoom), this.fire("layeradd", { layer: o }), this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons();
        var a = o, c = this._zoom;
        if (o.__parent)
          for (; a.__parent._zoom >= c; )
            a = a.__parent;
        return this._currentShownBounds.contains(a.getLatLng()) && (this.options.animateAddingMarkers ? this._animationAddLayer(o, a) : this._animationAddLayerNonAnimated(o, a)), this;
      },
      removeLayer: function(o) {
        return o instanceof L.LayerGroup ? this.removeLayers([o]) : o.getLatLng ? this._map ? o.__parent ? (this._unspiderfy && (this._unspiderfy(), this._unspiderfyLayer(o)), this._removeLayer(o, !0), this.fire("layerremove", { layer: o }), this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), o.off(this._childMarkerEventHandlers, this), this._featureGroup.hasLayer(o) && (this._featureGroup.removeLayer(o), o.clusterShow && o.clusterShow()), this) : this : (!this._arraySplice(this._needsClustering, o) && this.hasLayer(o) && this._needsRemoving.push({ layer: o, latlng: o._latlng }), this.fire("layerremove", { layer: o }), this) : (this._nonPointGroup.removeLayer(o), this.fire("layerremove", { layer: o }), this);
      },
      //Takes an array of markers and adds them in bulk
      addLayers: function(o, a) {
        if (!L.Util.isArray(o))
          return this.addLayer(o);
        var c = this._featureGroup, d = this._nonPointGroup, g = this.options.chunkedLoading, w = this.options.chunkInterval, m = this.options.chunkProgress, P = o.length, x = 0, T = !0, C;
        if (this._map) {
          var D = (/* @__PURE__ */ new Date()).getTime(), k = L.bind(function() {
            var F = (/* @__PURE__ */ new Date()).getTime();
            for (this._map && this._unspiderfy && this._unspiderfy(); x < P; x++) {
              if (g && x % 200 === 0) {
                var _t = (/* @__PURE__ */ new Date()).getTime() - F;
                if (_t > w)
                  break;
              }
              if (C = o[x], C instanceof L.LayerGroup) {
                T && (o = o.slice(), T = !1), this._extractNonGroupLayers(C, o), P = o.length;
                continue;
              }
              if (!C.getLatLng) {
                d.addLayer(C), a || this.fire("layeradd", { layer: C });
                continue;
              }
              if (!this.hasLayer(C) && (this._addLayer(C, this._maxZoom), a || this.fire("layeradd", { layer: C }), C.__parent && C.__parent.getChildCount() === 2)) {
                var nt = C.__parent.getAllChildMarkers(), ee = nt[0] === C ? nt[1] : nt[0];
                c.removeLayer(ee);
              }
            }
            m && m(x, P, (/* @__PURE__ */ new Date()).getTime() - D), x === P ? (this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)) : setTimeout(k, this.options.chunkDelay);
          }, this);
          k();
        } else
          for (var H = this._needsClustering; x < P; x++) {
            if (C = o[x], C instanceof L.LayerGroup) {
              T && (o = o.slice(), T = !1), this._extractNonGroupLayers(C, o), P = o.length;
              continue;
            }
            if (!C.getLatLng) {
              d.addLayer(C);
              continue;
            }
            this.hasLayer(C) || H.push(C);
          }
        return this;
      },
      //Takes an array of markers and removes them in bulk
      removeLayers: function(o) {
        var a, c, d = o.length, g = this._featureGroup, w = this._nonPointGroup, m = !0;
        if (!this._map) {
          for (a = 0; a < d; a++) {
            if (c = o[a], c instanceof L.LayerGroup) {
              m && (o = o.slice(), m = !1), this._extractNonGroupLayers(c, o), d = o.length;
              continue;
            }
            this._arraySplice(this._needsClustering, c), w.removeLayer(c), this.hasLayer(c) && this._needsRemoving.push({ layer: c, latlng: c._latlng }), this.fire("layerremove", { layer: c });
          }
          return this;
        }
        if (this._unspiderfy) {
          this._unspiderfy();
          var P = o.slice(), x = d;
          for (a = 0; a < x; a++) {
            if (c = P[a], c instanceof L.LayerGroup) {
              this._extractNonGroupLayers(c, P), x = P.length;
              continue;
            }
            this._unspiderfyLayer(c);
          }
        }
        for (a = 0; a < d; a++) {
          if (c = o[a], c instanceof L.LayerGroup) {
            m && (o = o.slice(), m = !1), this._extractNonGroupLayers(c, o), d = o.length;
            continue;
          }
          if (!c.__parent) {
            w.removeLayer(c), this.fire("layerremove", { layer: c });
            continue;
          }
          this._removeLayer(c, !0, !0), this.fire("layerremove", { layer: c }), g.hasLayer(c) && (g.removeLayer(c), c.clusterShow && c.clusterShow());
        }
        return this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds), this;
      },
      //Removes all layers from the MarkerClusterGroup
      clearLayers: function() {
        return this._map || (this._needsClustering = [], this._needsRemoving = [], delete this._gridClusters, delete this._gridUnclustered), this._noanimationUnspiderfy && this._noanimationUnspiderfy(), this._featureGroup.clearLayers(), this._nonPointGroup.clearLayers(), this.eachLayer(function(o) {
          o.off(this._childMarkerEventHandlers, this), delete o.__parent;
        }, this), this._map && this._generateInitialClusters(), this;
      },
      //Override FeatureGroup.getBounds as it doesn't work
      getBounds: function() {
        var o = new L.LatLngBounds();
        this._topClusterLevel && o.extend(this._topClusterLevel._bounds);
        for (var a = this._needsClustering.length - 1; a >= 0; a--)
          o.extend(this._needsClustering[a].getLatLng());
        return o.extend(this._nonPointGroup.getBounds()), o;
      },
      //Overrides LayerGroup.eachLayer
      eachLayer: function(o, a) {
        var c = this._needsClustering.slice(), d = this._needsRemoving, g, w, m;
        for (this._topClusterLevel && this._topClusterLevel.getAllChildMarkers(c), w = c.length - 1; w >= 0; w--) {
          for (g = !0, m = d.length - 1; m >= 0; m--)
            if (d[m].layer === c[w]) {
              g = !1;
              break;
            }
          g && o.call(a, c[w]);
        }
        this._nonPointGroup.eachLayer(o, a);
      },
      //Overrides LayerGroup.getLayers
      getLayers: function() {
        var o = [];
        return this.eachLayer(function(a) {
          o.push(a);
        }), o;
      },
      //Overrides LayerGroup.getLayer, WARNING: Really bad performance
      getLayer: function(o) {
        var a = null;
        return o = parseInt(o, 10), this.eachLayer(function(c) {
          L.stamp(c) === o && (a = c);
        }), a;
      },
      //Returns true if the given layer is in this MarkerClusterGroup
      hasLayer: function(o) {
        if (!o)
          return !1;
        var a, c = this._needsClustering;
        for (a = c.length - 1; a >= 0; a--)
          if (c[a] === o)
            return !0;
        for (c = this._needsRemoving, a = c.length - 1; a >= 0; a--)
          if (c[a].layer === o)
            return !1;
        return !!(o.__parent && o.__parent._group === this) || this._nonPointGroup.hasLayer(o);
      },
      //Zoom down to show the given layer (spiderfying if necessary) then calls the callback
      zoomToShowLayer: function(o, a) {
        var c = this._map;
        typeof a != "function" && (a = function() {
        });
        var d = function() {
          (c.hasLayer(o) || c.hasLayer(o.__parent)) && !this._inZoomAnimation && (this._map.off("moveend", d, this), this.off("animationend", d, this), c.hasLayer(o) ? a() : o.__parent._icon && (this.once("spiderfied", a, this), o.__parent.spiderfy()));
        };
        o._icon && this._map.getBounds().contains(o.getLatLng()) ? a() : o.__parent._zoom < Math.round(this._map._zoom) ? (this._map.on("moveend", d, this), this._map.panTo(o.getLatLng())) : (this._map.on("moveend", d, this), this.on("animationend", d, this), o.__parent.zoomToBounds());
      },
      //Overrides FeatureGroup.onAdd
      onAdd: function(o) {
        this._map = o;
        var a, c, d;
        if (!isFinite(this._map.getMaxZoom()))
          throw "Map has no maxZoom specified";
        for (this._featureGroup.addTo(o), this._nonPointGroup.addTo(o), this._gridClusters || this._generateInitialClusters(), this._maxLat = o.options.crs.projection.MAX_LATITUDE, a = 0, c = this._needsRemoving.length; a < c; a++)
          d = this._needsRemoving[a], d.newlatlng = d.layer._latlng, d.layer._latlng = d.latlng;
        for (a = 0, c = this._needsRemoving.length; a < c; a++)
          d = this._needsRemoving[a], this._removeLayer(d.layer, !0), d.layer._latlng = d.newlatlng;
        this._needsRemoving = [], this._zoom = Math.round(this._map._zoom), this._currentShownBounds = this._getExpandedVisibleBounds(), this._map.on("zoomend", this._zoomEnd, this), this._map.on("moveend", this._moveEnd, this), this._spiderfierOnAdd && this._spiderfierOnAdd(), this._bindEvents(), c = this._needsClustering, this._needsClustering = [], this.addLayers(c, !0);
      },
      //Overrides FeatureGroup.onRemove
      onRemove: function(o) {
        o.off("zoomend", this._zoomEnd, this), o.off("moveend", this._moveEnd, this), this._unbindEvents(), this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", ""), this._spiderfierOnRemove && this._spiderfierOnRemove(), delete this._maxLat, this._hideCoverage(), this._featureGroup.remove(), this._nonPointGroup.remove(), this._featureGroup.clearLayers(), this._map = null;
      },
      getVisibleParent: function(o) {
        for (var a = o; a && !a._icon; )
          a = a.__parent;
        return a || null;
      },
      //Remove the given object from the given array
      _arraySplice: function(o, a) {
        for (var c = o.length - 1; c >= 0; c--)
          if (o[c] === a)
            return o.splice(c, 1), !0;
      },
      /**
       * Removes a marker from all _gridUnclustered zoom levels, starting at the supplied zoom.
       * @param marker to be removed from _gridUnclustered.
       * @param z integer bottom start zoom level (included)
       * @private
       */
      _removeFromGridUnclustered: function(o, a) {
        for (var c = this._map, d = this._gridUnclustered, g = Math.floor(this._map.getMinZoom()); a >= g && d[a].removeObject(o, c.project(o.getLatLng(), a)); a--)
          ;
      },
      _childMarkerDragStart: function(o) {
        o.target.__dragStart = o.target._latlng;
      },
      _childMarkerMoved: function(o) {
        if (!this._ignoreMove && !o.target.__dragStart) {
          var a = o.target._popup && o.target._popup.isOpen();
          this._moveChild(o.target, o.oldLatLng, o.latlng), a && o.target.openPopup();
        }
      },
      _moveChild: function(o, a, c) {
        o._latlng = a, this.removeLayer(o), o._latlng = c, this.addLayer(o);
      },
      _childMarkerDragEnd: function(o) {
        var a = o.target.__dragStart;
        delete o.target.__dragStart, a && this._moveChild(o.target, a, o.target._latlng);
      },
      //Internal function for removing a marker from everything.
      //dontUpdateMap: set to true if you will handle updating the map manually (for bulk functions)
      _removeLayer: function(o, a, c) {
        var d = this._gridClusters, g = this._gridUnclustered, w = this._featureGroup, m = this._map, P = Math.floor(this._map.getMinZoom());
        a && this._removeFromGridUnclustered(o, this._maxZoom);
        var x = o.__parent, T = x._markers, C;
        for (this._arraySplice(T, o); x && (x._childCount--, x._boundsNeedUpdate = !0, !(x._zoom < P)); )
          a && x._childCount <= 1 ? (C = x._markers[0] === o ? x._markers[1] : x._markers[0], d[x._zoom].removeObject(x, m.project(x._cLatLng, x._zoom)), g[x._zoom].addObject(C, m.project(C.getLatLng(), x._zoom)), this._arraySplice(x.__parent._childClusters, x), x.__parent._markers.push(C), C.__parent = x.__parent, x._icon && (w.removeLayer(x), c || w.addLayer(C))) : x._iconNeedsUpdate = !0, x = x.__parent;
        delete o.__parent;
      },
      _isOrIsParent: function(o, a) {
        for (; a; ) {
          if (o === a)
            return !0;
          a = a.parentNode;
        }
        return !1;
      },
      //Override L.Evented.fire
      fire: function(o, a, c) {
        if (a && a.layer instanceof L.MarkerCluster) {
          if (a.originalEvent && this._isOrIsParent(a.layer._icon, a.originalEvent.relatedTarget))
            return;
          o = "cluster" + o;
        }
        L.FeatureGroup.prototype.fire.call(this, o, a, c);
      },
      //Override L.Evented.listens
      listens: function(o, a) {
        return L.FeatureGroup.prototype.listens.call(this, o, a) || L.FeatureGroup.prototype.listens.call(this, "cluster" + o, a);
      },
      //Default functionality
      _defaultIconCreateFunction: function(o) {
        var a = o.getChildCount(), c = " marker-cluster-";
        return a < 10 ? c += "small" : a < 100 ? c += "medium" : c += "large", new L.DivIcon({ html: "<div><span>" + a + "</span></div>", className: "marker-cluster" + c, iconSize: new L.Point(40, 40) });
      },
      _bindEvents: function() {
        var o = this._map, a = this.options.spiderfyOnMaxZoom, c = this.options.showCoverageOnHover, d = this.options.zoomToBoundsOnClick, g = this.options.spiderfyOnEveryZoom;
        (a || d || g) && this.on("clusterclick clusterkeypress", this._zoomOrSpiderfy, this), c && (this.on("clustermouseover", this._showCoverage, this), this.on("clustermouseout", this._hideCoverage, this), o.on("zoomend", this._hideCoverage, this));
      },
      _zoomOrSpiderfy: function(o) {
        var a = o.layer, c = a;
        if (!(o.type === "clusterkeypress" && o.originalEvent && o.originalEvent.keyCode !== 13)) {
          for (; c._childClusters.length === 1; )
            c = c._childClusters[0];
          c._zoom === this._maxZoom && c._childCount === a._childCount && this.options.spiderfyOnMaxZoom ? a.spiderfy() : this.options.zoomToBoundsOnClick && a.zoomToBounds(), this.options.spiderfyOnEveryZoom && a.spiderfy(), o.originalEvent && o.originalEvent.keyCode === 13 && this._map._container.focus();
        }
      },
      _showCoverage: function(o) {
        var a = this._map;
        this._inZoomAnimation || (this._shownPolygon && a.removeLayer(this._shownPolygon), o.layer.getChildCount() > 2 && o.layer !== this._spiderfied && (this._shownPolygon = new L.Polygon(o.layer.getConvexHull(), this.options.polygonOptions), a.addLayer(this._shownPolygon)));
      },
      _hideCoverage: function() {
        this._shownPolygon && (this._map.removeLayer(this._shownPolygon), this._shownPolygon = null);
      },
      _unbindEvents: function() {
        var o = this.options.spiderfyOnMaxZoom, a = this.options.showCoverageOnHover, c = this.options.zoomToBoundsOnClick, d = this.options.spiderfyOnEveryZoom, g = this._map;
        (o || c || d) && this.off("clusterclick clusterkeypress", this._zoomOrSpiderfy, this), a && (this.off("clustermouseover", this._showCoverage, this), this.off("clustermouseout", this._hideCoverage, this), g.off("zoomend", this._hideCoverage, this));
      },
      _zoomEnd: function() {
        this._map && (this._mergeSplitClusters(), this._zoom = Math.round(this._map._zoom), this._currentShownBounds = this._getExpandedVisibleBounds());
      },
      _moveEnd: function() {
        if (!this._inZoomAnimation) {
          var o = this._getExpandedVisibleBounds();
          this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, o), this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), o), this._currentShownBounds = o;
        }
      },
      _generateInitialClusters: function() {
        var o = Math.ceil(this._map.getMaxZoom()), a = Math.floor(this._map.getMinZoom()), c = this.options.maxClusterRadius, d = c;
        typeof c != "function" && (d = function() {
          return c;
        }), this.options.disableClusteringAtZoom !== null && (o = this.options.disableClusteringAtZoom - 1), this._maxZoom = o, this._gridClusters = {}, this._gridUnclustered = {};
        for (var g = o; g >= a; g--)
          this._gridClusters[g] = new L.DistanceGrid(d(g)), this._gridUnclustered[g] = new L.DistanceGrid(d(g));
        this._topClusterLevel = new this._markerCluster(this, a - 1);
      },
      //Zoom: Zoom to start adding at (Pass this._maxZoom to start at the bottom)
      _addLayer: function(o, a) {
        var c = this._gridClusters, d = this._gridUnclustered, g = Math.floor(this._map.getMinZoom()), w, m;
        for (this.options.singleMarkerMode && this._overrideMarkerIcon(o), o.on(this._childMarkerEventHandlers, this); a >= g; a--) {
          w = this._map.project(o.getLatLng(), a);
          var P = c[a].getNearObject(w);
          if (P) {
            P._addChild(o), o.__parent = P;
            return;
          }
          if (P = d[a].getNearObject(w), P) {
            var x = P.__parent;
            x && this._removeLayer(P, !1);
            var T = new this._markerCluster(this, a, P, o);
            c[a].addObject(T, this._map.project(T._cLatLng, a)), P.__parent = T, o.__parent = T;
            var C = T;
            for (m = a - 1; m > x._zoom; m--)
              C = new this._markerCluster(this, m, C), c[m].addObject(C, this._map.project(P.getLatLng(), m));
            x._addChild(C), this._removeFromGridUnclustered(P, a);
            return;
          }
          d[a].addObject(o, w);
        }
        this._topClusterLevel._addChild(o), o.__parent = this._topClusterLevel;
      },
      /**
       * Refreshes the icon of all "dirty" visible clusters.
       * Non-visible "dirty" clusters will be updated when they are added to the map.
       * @private
       */
      _refreshClustersIcons: function() {
        this._featureGroup.eachLayer(function(o) {
          o instanceof L.MarkerCluster && o._iconNeedsUpdate && o._updateIcon();
        });
      },
      //Enqueue code to fire after the marker expand/contract has happened
      _enqueue: function(o) {
        this._queue.push(o), this._queueTimeout || (this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300));
      },
      _processQueue: function() {
        for (var o = 0; o < this._queue.length; o++)
          this._queue[o].call(this);
        this._queue.length = 0, clearTimeout(this._queueTimeout), this._queueTimeout = null;
      },
      //Merge and split any existing clusters that are too big or small
      _mergeSplitClusters: function() {
        var o = Math.round(this._map._zoom);
        this._processQueue(), this._zoom < o && this._currentShownBounds.intersects(this._getExpandedVisibleBounds()) ? (this._animationStart(), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, this._getExpandedVisibleBounds()), this._animationZoomIn(this._zoom, o)) : this._zoom > o ? (this._animationStart(), this._animationZoomOut(this._zoom, o)) : this._moveEnd();
      },
      //Gets the maps visible bounds expanded in each direction by the size of the screen (so the user cannot see an area we do not cover in one pan)
      _getExpandedVisibleBounds: function() {
        if (this.options.removeOutsideVisibleBounds) {
          if (L.Browser.mobile)
            return this._checkBoundsMaxLat(this._map.getBounds());
        } else return this._mapBoundsInfinite;
        return this._checkBoundsMaxLat(this._map.getBounds().pad(1));
      },
      /**
       * Expands the latitude to Infinity (or -Infinity) if the input bounds reach the map projection maximum defined latitude
       * (in the case of Web/Spherical Mercator, it is 85.0511287798 / see https://en.wikipedia.org/wiki/Web_Mercator#Formulas).
       * Otherwise, the removeOutsideVisibleBounds option will remove markers beyond that limit, whereas the same markers without
       * this option (or outside MCG) will have their position floored (ceiled) by the projection and rendered at that limit,
       * making the user think that MCG "eats" them and never displays them again.
       * @param bounds L.LatLngBounds
       * @returns {L.LatLngBounds}
       * @private
       */
      _checkBoundsMaxLat: function(o) {
        var a = this._maxLat;
        return a !== void 0 && (o.getNorth() >= a && (o._northEast.lat = 1 / 0), o.getSouth() <= -a && (o._southWest.lat = -1 / 0)), o;
      },
      //Shared animation code
      _animationAddLayerNonAnimated: function(o, a) {
        if (a === o)
          this._featureGroup.addLayer(o);
        else if (a._childCount === 2) {
          a._addToMap();
          var c = a.getAllChildMarkers();
          this._featureGroup.removeLayer(c[0]), this._featureGroup.removeLayer(c[1]);
        } else
          a._updateIcon();
      },
      /**
       * Extracts individual (i.e. non-group) layers from a Layer Group.
       * @param group to extract layers from.
       * @param output {Array} in which to store the extracted layers.
       * @returns {*|Array}
       * @private
       */
      _extractNonGroupLayers: function(o, a) {
        var c = o.getLayers(), d = 0, g;
        for (a = a || []; d < c.length; d++) {
          if (g = c[d], g instanceof L.LayerGroup) {
            this._extractNonGroupLayers(g, a);
            continue;
          }
          a.push(g);
        }
        return a;
      },
      /**
       * Implements the singleMarkerMode option.
       * @param layer Marker to re-style using the Clusters iconCreateFunction.
       * @returns {L.Icon} The newly created icon.
       * @private
       */
      _overrideMarkerIcon: function(o) {
        var a = o.options.icon = this.options.iconCreateFunction({
          getChildCount: function() {
            return 1;
          },
          getAllChildMarkers: function() {
            return [o];
          }
        });
        return a;
      }
    });
    L.MarkerClusterGroup.include({
      _mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-1 / 0, -1 / 0), new L.LatLng(1 / 0, 1 / 0))
    }), L.MarkerClusterGroup.include({
      _noAnimation: {
        //Non Animated versions of everything
        _animationStart: function() {
        },
        _animationZoomIn: function(o, a) {
          this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), o), this._topClusterLevel._recursivelyAddChildrenToMap(null, a, this._getExpandedVisibleBounds()), this.fire("animationend");
        },
        _animationZoomOut: function(o, a) {
          this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), o), this._topClusterLevel._recursivelyAddChildrenToMap(null, a, this._getExpandedVisibleBounds()), this.fire("animationend");
        },
        _animationAddLayer: function(o, a) {
          this._animationAddLayerNonAnimated(o, a);
        }
      },
      _withAnimation: {
        //Animated versions here
        _animationStart: function() {
          this._map._mapPane.className += " leaflet-cluster-anim", this._inZoomAnimation++;
        },
        _animationZoomIn: function(o, a) {
          var c = this._getExpandedVisibleBounds(), d = this._featureGroup, g = Math.floor(this._map.getMinZoom()), w;
          this._ignoreMove = !0, this._topClusterLevel._recursively(c, o, g, function(m) {
            var P = m._latlng, x = m._markers, T;
            for (c.contains(P) || (P = null), m._isSingleParent() && o + 1 === a ? (d.removeLayer(m), m._recursivelyAddChildrenToMap(null, a, c)) : (m.clusterHide(), m._recursivelyAddChildrenToMap(P, a, c)), w = x.length - 1; w >= 0; w--)
              T = x[w], c.contains(T._latlng) || d.removeLayer(T);
          }), this._forceLayout(), this._topClusterLevel._recursivelyBecomeVisible(c, a), d.eachLayer(function(m) {
            !(m instanceof L.MarkerCluster) && m._icon && m.clusterShow();
          }), this._topClusterLevel._recursively(c, o, a, function(m) {
            m._recursivelyRestoreChildPositions(a);
          }), this._ignoreMove = !1, this._enqueue(function() {
            this._topClusterLevel._recursively(c, o, g, function(m) {
              d.removeLayer(m), m.clusterShow();
            }), this._animationEnd();
          });
        },
        _animationZoomOut: function(o, a) {
          this._animationZoomOutSingle(this._topClusterLevel, o - 1, a), this._topClusterLevel._recursivelyAddChildrenToMap(null, a, this._getExpandedVisibleBounds()), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), o, this._getExpandedVisibleBounds());
        },
        _animationAddLayer: function(o, a) {
          var c = this, d = this._featureGroup;
          d.addLayer(o), a !== o && (a._childCount > 2 ? (a._updateIcon(), this._forceLayout(), this._animationStart(), o._setPos(this._map.latLngToLayerPoint(a.getLatLng())), o.clusterHide(), this._enqueue(function() {
            d.removeLayer(o), o.clusterShow(), c._animationEnd();
          })) : (this._forceLayout(), c._animationStart(), c._animationZoomOutSingle(a, this._map.getMaxZoom(), this._zoom)));
        }
      },
      // Private methods for animated versions.
      _animationZoomOutSingle: function(o, a, c) {
        var d = this._getExpandedVisibleBounds(), g = Math.floor(this._map.getMinZoom());
        o._recursivelyAnimateChildrenInAndAddSelfToMap(d, g, a + 1, c);
        var w = this;
        this._forceLayout(), o._recursivelyBecomeVisible(d, c), this._enqueue(function() {
          if (o._childCount === 1) {
            var m = o._markers[0];
            this._ignoreMove = !0, m.setLatLng(m.getLatLng()), this._ignoreMove = !1, m.clusterShow && m.clusterShow();
          } else
            o._recursively(d, c, g, function(P) {
              P._recursivelyRemoveChildrenFromMap(d, g, a + 1);
            });
          w._animationEnd();
        });
      },
      _animationEnd: function() {
        this._map && (this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "")), this._inZoomAnimation--, this.fire("animationend");
      },
      //Force a browser layout of stuff in the map
      // Should apply the current opacity and location to all elements so we can update them again for an animation
      _forceLayout: function() {
        L.Util.falseFn(document.body.offsetWidth);
      }
    }), L.markerClusterGroup = function(o) {
      return new L.MarkerClusterGroup(o);
    };
    var _ = L.MarkerCluster = L.Marker.extend({
      options: L.Icon.prototype.options,
      initialize: function(o, a, c, d) {
        L.Marker.prototype.initialize.call(
          this,
          c ? c._cLatLng || c.getLatLng() : new L.LatLng(0, 0),
          { icon: this, pane: o.options.clusterPane }
        ), this._group = o, this._zoom = a, this._markers = [], this._childClusters = [], this._childCount = 0, this._iconNeedsUpdate = !0, this._boundsNeedUpdate = !0, this._bounds = new L.LatLngBounds(), c && this._addChild(c), d && this._addChild(d);
      },
      //Recursively retrieve all child markers of this cluster
      getAllChildMarkers: function(o, a) {
        o = o || [];
        for (var c = this._childClusters.length - 1; c >= 0; c--)
          this._childClusters[c].getAllChildMarkers(o, a);
        for (var d = this._markers.length - 1; d >= 0; d--)
          a && this._markers[d].__dragStart || o.push(this._markers[d]);
        return o;
      },
      //Returns the count of how many child markers we have
      getChildCount: function() {
        return this._childCount;
      },
      //Zoom to the minimum of showing all of the child markers, or the extents of this cluster
      zoomToBounds: function(o) {
        for (var a = this._childClusters.slice(), c = this._group._map, d = c.getBoundsZoom(this._bounds), g = this._zoom + 1, w = c.getZoom(), m; a.length > 0 && d > g; ) {
          g++;
          var P = [];
          for (m = 0; m < a.length; m++)
            P = P.concat(a[m]._childClusters);
          a = P;
        }
        d > g ? this._group._map.setView(this._latlng, g) : d <= w ? this._group._map.setView(this._latlng, w + 1) : this._group._map.fitBounds(this._bounds, o);
      },
      getBounds: function() {
        var o = new L.LatLngBounds();
        return o.extend(this._bounds), o;
      },
      _updateIcon: function() {
        this._iconNeedsUpdate = !0, this._icon && this.setIcon(this);
      },
      //Cludge for Icon, we pretend to be an icon for performance
      createIcon: function() {
        return this._iconNeedsUpdate && (this._iconObj = this._group.options.iconCreateFunction(this), this._iconNeedsUpdate = !1), this._iconObj.createIcon();
      },
      createShadow: function() {
        return this._iconObj.createShadow();
      },
      _addChild: function(o, a) {
        this._iconNeedsUpdate = !0, this._boundsNeedUpdate = !0, this._setClusterCenter(o), o instanceof L.MarkerCluster ? (a || (this._childClusters.push(o), o.__parent = this), this._childCount += o._childCount) : (a || this._markers.push(o), this._childCount++), this.__parent && this.__parent._addChild(o, !0);
      },
      /**
       * Makes sure the cluster center is set. If not, uses the child center if it is a cluster, or the marker position.
       * @param child L.MarkerCluster|L.Marker that will be used as cluster center if not defined yet.
       * @private
       */
      _setClusterCenter: function(o) {
        this._cLatLng || (this._cLatLng = o._cLatLng || o._latlng);
      },
      /**
       * Assigns impossible bounding values so that the next extend entirely determines the new bounds.
       * This method avoids having to trash the previous L.LatLngBounds object and to create a new one, which is much slower for this class.
       * As long as the bounds are not extended, most other methods would probably fail, as they would with bounds initialized but not extended.
       * @private
       */
      _resetBounds: function() {
        var o = this._bounds;
        o._southWest && (o._southWest.lat = 1 / 0, o._southWest.lng = 1 / 0), o._northEast && (o._northEast.lat = -1 / 0, o._northEast.lng = -1 / 0);
      },
      _recalculateBounds: function() {
        var o = this._markers, a = this._childClusters, c = 0, d = 0, g = this._childCount, w, m, P, x;
        if (g !== 0) {
          for (this._resetBounds(), w = 0; w < o.length; w++)
            P = o[w]._latlng, this._bounds.extend(P), c += P.lat, d += P.lng;
          for (w = 0; w < a.length; w++)
            m = a[w], m._boundsNeedUpdate && m._recalculateBounds(), this._bounds.extend(m._bounds), P = m._wLatLng, x = m._childCount, c += P.lat * x, d += P.lng * x;
          this._latlng = this._wLatLng = new L.LatLng(c / g, d / g), this._boundsNeedUpdate = !1;
        }
      },
      //Set our markers position as given and add it to the map
      _addToMap: function(o) {
        o && (this._backupLatlng = this._latlng, this.setLatLng(o)), this._group._featureGroup.addLayer(this);
      },
      _recursivelyAnimateChildrenIn: function(o, a, c) {
        this._recursively(
          o,
          this._group._map.getMinZoom(),
          c - 1,
          function(d) {
            var g = d._markers, w, m;
            for (w = g.length - 1; w >= 0; w--)
              m = g[w], m._icon && (m._setPos(a), m.clusterHide());
          },
          function(d) {
            var g = d._childClusters, w, m;
            for (w = g.length - 1; w >= 0; w--)
              m = g[w], m._icon && (m._setPos(a), m.clusterHide());
          }
        );
      },
      _recursivelyAnimateChildrenInAndAddSelfToMap: function(o, a, c, d) {
        this._recursively(
          o,
          d,
          a,
          function(g) {
            g._recursivelyAnimateChildrenIn(o, g._group._map.latLngToLayerPoint(g.getLatLng()).round(), c), g._isSingleParent() && c - 1 === d ? (g.clusterShow(), g._recursivelyRemoveChildrenFromMap(o, a, c)) : g.clusterHide(), g._addToMap();
          }
        );
      },
      _recursivelyBecomeVisible: function(o, a) {
        this._recursively(o, this._group._map.getMinZoom(), a, null, function(c) {
          c.clusterShow();
        });
      },
      _recursivelyAddChildrenToMap: function(o, a, c) {
        this._recursively(
          c,
          this._group._map.getMinZoom() - 1,
          a,
          function(d) {
            if (a !== d._zoom)
              for (var g = d._markers.length - 1; g >= 0; g--) {
                var w = d._markers[g];
                c.contains(w._latlng) && (o && (w._backupLatlng = w.getLatLng(), w.setLatLng(o), w.clusterHide && w.clusterHide()), d._group._featureGroup.addLayer(w));
              }
          },
          function(d) {
            d._addToMap(o);
          }
        );
      },
      _recursivelyRestoreChildPositions: function(o) {
        for (var a = this._markers.length - 1; a >= 0; a--) {
          var c = this._markers[a];
          c._backupLatlng && (c.setLatLng(c._backupLatlng), delete c._backupLatlng);
        }
        if (o - 1 === this._zoom)
          for (var d = this._childClusters.length - 1; d >= 0; d--)
            this._childClusters[d]._restorePosition();
        else
          for (var g = this._childClusters.length - 1; g >= 0; g--)
            this._childClusters[g]._recursivelyRestoreChildPositions(o);
      },
      _restorePosition: function() {
        this._backupLatlng && (this.setLatLng(this._backupLatlng), delete this._backupLatlng);
      },
      //exceptBounds: If set, don't remove any markers/clusters in it
      _recursivelyRemoveChildrenFromMap: function(o, a, c, d) {
        var g, w;
        this._recursively(
          o,
          a - 1,
          c - 1,
          function(m) {
            for (w = m._markers.length - 1; w >= 0; w--)
              g = m._markers[w], (!d || !d.contains(g._latlng)) && (m._group._featureGroup.removeLayer(g), g.clusterShow && g.clusterShow());
          },
          function(m) {
            for (w = m._childClusters.length - 1; w >= 0; w--)
              g = m._childClusters[w], (!d || !d.contains(g._latlng)) && (m._group._featureGroup.removeLayer(g), g.clusterShow && g.clusterShow());
          }
        );
      },
      //Run the given functions recursively to this and child clusters
      // boundsToApplyTo: a L.LatLngBounds representing the bounds of what clusters to recurse in to
      // zoomLevelToStart: zoom level to start running functions (inclusive)
      // zoomLevelToStop: zoom level to stop running functions (inclusive)
      // runAtEveryLevel: function that takes an L.MarkerCluster as an argument that should be applied on every level
      // runAtBottomLevel: function that takes an L.MarkerCluster as an argument that should be applied at only the bottom level
      _recursively: function(o, a, c, d, g) {
        var w = this._childClusters, m = this._zoom, P, x;
        if (a <= m && (d && d(this), g && m === c && g(this)), m < a || m < c)
          for (P = w.length - 1; P >= 0; P--)
            x = w[P], x._boundsNeedUpdate && x._recalculateBounds(), o.intersects(x._bounds) && x._recursively(o, a, c, d, g);
      },
      //Returns true if we are the parent of only one cluster and that cluster is the same as us
      _isSingleParent: function() {
        return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount;
      }
    });
    L.Marker.include({
      clusterHide: function() {
        var o = this.options.opacity;
        return this.setOpacity(0), this.options.opacity = o, this;
      },
      clusterShow: function() {
        return this.setOpacity(this.options.opacity);
      }
    }), L.DistanceGrid = function(o) {
      this._cellSize = o, this._sqCellSize = o * o, this._grid = {}, this._objectPoint = {};
    }, L.DistanceGrid.prototype = {
      addObject: function(o, a) {
        var c = this._getCoord(a.x), d = this._getCoord(a.y), g = this._grid, w = g[d] = g[d] || {}, m = w[c] = w[c] || [], P = L.Util.stamp(o);
        this._objectPoint[P] = a, m.push(o);
      },
      updateObject: function(o, a) {
        this.removeObject(o), this.addObject(o, a);
      },
      //Returns true if the object was found
      removeObject: function(o, a) {
        var c = this._getCoord(a.x), d = this._getCoord(a.y), g = this._grid, w = g[d] = g[d] || {}, m = w[c] = w[c] || [], P, x;
        for (delete this._objectPoint[L.Util.stamp(o)], P = 0, x = m.length; P < x; P++)
          if (m[P] === o)
            return m.splice(P, 1), x === 1 && delete w[c], !0;
      },
      eachObject: function(o, a) {
        var c, d, g, w, m, P, x, T = this._grid;
        for (c in T) {
          m = T[c];
          for (d in m)
            for (P = m[d], g = 0, w = P.length; g < w; g++)
              x = o.call(a, P[g]), x && (g--, w--);
        }
      },
      getNearObject: function(o) {
        var a = this._getCoord(o.x), c = this._getCoord(o.y), d, g, w, m, P, x, T, C, D = this._objectPoint, k = this._sqCellSize, H = null;
        for (d = c - 1; d <= c + 1; d++)
          if (m = this._grid[d], m) {
            for (g = a - 1; g <= a + 1; g++)
              if (P = m[g], P)
                for (w = 0, x = P.length; w < x; w++)
                  T = P[w], C = this._sqDist(D[L.Util.stamp(T)], o), (C < k || C <= k && H === null) && (k = C, H = T);
          }
        return H;
      },
      _getCoord: function(o) {
        var a = Math.floor(o / this._cellSize);
        return isFinite(a) ? a : o;
      },
      _sqDist: function(o, a) {
        var c = a.x - o.x, d = a.y - o.y;
        return c * c + d * d;
      }
    }, function() {
      L.QuickHull = {
        /*
         * @param {Object} cpt a point to be measured from the baseline
         * @param {Array} bl the baseline, as represented by a two-element
         *   array of latlng objects.
         * @returns {Number} an approximate distance measure
         */
        getDistant: function(o, a) {
          var c = a[1].lat - a[0].lat, d = a[0].lng - a[1].lng;
          return d * (o.lat - a[0].lat) + c * (o.lng - a[0].lng);
        },
        /*
         * @param {Array} baseLine a two-element array of latlng objects
         *   representing the baseline to project from
         * @param {Array} latLngs an array of latlng objects
         * @returns {Object} the maximum point and all new points to stay
         *   in consideration for the hull.
         */
        findMostDistantPointFromBaseLine: function(o, a) {
          var c = 0, d = null, g = [], w, m, P;
          for (w = a.length - 1; w >= 0; w--) {
            if (m = a[w], P = this.getDistant(m, o), P > 0)
              g.push(m);
            else
              continue;
            P > c && (c = P, d = m);
          }
          return { maxPoint: d, newPoints: g };
        },
        /*
         * Given a baseline, compute the convex hull of latLngs as an array
         * of latLngs.
         *
         * @param {Array} latLngs
         * @returns {Array}
         */
        buildConvexHull: function(o, a) {
          var c = [], d = this.findMostDistantPointFromBaseLine(o, a);
          return d.maxPoint ? (c = c.concat(
            this.buildConvexHull([o[0], d.maxPoint], d.newPoints)
          ), c = c.concat(
            this.buildConvexHull([d.maxPoint, o[1]], d.newPoints)
          ), c) : [o[0]];
        },
        /*
         * Given an array of latlngs, compute a convex hull as an array
         * of latlngs
         *
         * @param {Array} latLngs
         * @returns {Array}
         */
        getConvexHull: function(o) {
          var a = !1, c = !1, d = !1, g = !1, w = null, m = null, P = null, x = null, T = null, C = null, D;
          for (D = o.length - 1; D >= 0; D--) {
            var k = o[D];
            (a === !1 || k.lat > a) && (w = k, a = k.lat), (c === !1 || k.lat < c) && (m = k, c = k.lat), (d === !1 || k.lng > d) && (P = k, d = k.lng), (g === !1 || k.lng < g) && (x = k, g = k.lng);
          }
          c !== a ? (C = m, T = w) : (C = x, T = P);
          var H = [].concat(
            this.buildConvexHull([C, T], o),
            this.buildConvexHull([T, C], o)
          );
          return H;
        }
      };
    }(), L.MarkerCluster.include({
      getConvexHull: function() {
        var o = this.getAllChildMarkers(), a = [], c, d;
        for (d = o.length - 1; d >= 0; d--)
          c = o[d].getLatLng(), a.push(c);
        return L.QuickHull.getConvexHull(a);
      }
    }), L.MarkerCluster.include({
      _2PI: Math.PI * 2,
      _circleFootSeparation: 25,
      //related to circumference of circle
      _circleStartAngle: 0,
      _spiralFootSeparation: 28,
      //related to size of spiral (experiment!)
      _spiralLengthStart: 11,
      _spiralLengthFactor: 5,
      _circleSpiralSwitchover: 9,
      //show spiral instead of circle from this marker count upwards.
      // 0 -> always spiral; Infinity -> always circle
      spiderfy: function() {
        if (!(this._group._spiderfied === this || this._group._inZoomAnimation)) {
          var o = this.getAllChildMarkers(null, !0), a = this._group, c = a._map, d = c.latLngToLayerPoint(this._latlng), g;
          this._group._unspiderfy(), this._group._spiderfied = this, this._group.options.spiderfyShapePositions ? g = this._group.options.spiderfyShapePositions(o.length, d) : o.length >= this._circleSpiralSwitchover ? g = this._generatePointsSpiral(o.length, d) : (d.y += 10, g = this._generatePointsCircle(o.length, d)), this._animationSpiderfy(o, g);
        }
      },
      unspiderfy: function(o) {
        this._group._inZoomAnimation || (this._animationUnspiderfy(o), this._group._spiderfied = null);
      },
      _generatePointsCircle: function(o, a) {
        var c = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + o), d = c / this._2PI, g = this._2PI / o, w = [], m, P;
        for (d = Math.max(d, 35), w.length = o, m = 0; m < o; m++)
          P = this._circleStartAngle + m * g, w[m] = new L.Point(a.x + d * Math.cos(P), a.y + d * Math.sin(P))._round();
        return w;
      },
      _generatePointsSpiral: function(o, a) {
        var c = this._group.options.spiderfyDistanceMultiplier, d = c * this._spiralLengthStart, g = c * this._spiralFootSeparation, w = c * this._spiralLengthFactor * this._2PI, m = 0, P = [], x;
        for (P.length = o, x = o; x >= 0; x--)
          x < o && (P[x] = new L.Point(a.x + d * Math.cos(m), a.y + d * Math.sin(m))._round()), m += g / d + x * 5e-4, d += w / m;
        return P;
      },
      _noanimationUnspiderfy: function() {
        var o = this._group, a = o._map, c = o._featureGroup, d = this.getAllChildMarkers(null, !0), g, w;
        for (o._ignoreMove = !0, this.setOpacity(1), w = d.length - 1; w >= 0; w--)
          g = d[w], c.removeLayer(g), g._preSpiderfyLatlng && (g.setLatLng(g._preSpiderfyLatlng), delete g._preSpiderfyLatlng), g.setZIndexOffset && g.setZIndexOffset(0), g._spiderLeg && (a.removeLayer(g._spiderLeg), delete g._spiderLeg);
        o.fire("unspiderfied", {
          cluster: this,
          markers: d
        }), o._ignoreMove = !1, o._spiderfied = null;
      }
    }), L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
      _animationSpiderfy: function(o, a) {
        var c = this._group, d = c._map, g = c._featureGroup, w = this._group.options.spiderLegPolylineOptions, m, P, x, T;
        for (c._ignoreMove = !0, m = 0; m < o.length; m++)
          T = d.layerPointToLatLng(a[m]), P = o[m], x = new L.Polyline([this._latlng, T], w), d.addLayer(x), P._spiderLeg = x, P._preSpiderfyLatlng = P._latlng, P.setLatLng(T), P.setZIndexOffset && P.setZIndexOffset(1e6), g.addLayer(P);
        this.setOpacity(0.3), c._ignoreMove = !1, c.fire("spiderfied", {
          cluster: this,
          markers: o
        });
      },
      _animationUnspiderfy: function() {
        this._noanimationUnspiderfy();
      }
    }), L.MarkerCluster.include({
      _animationSpiderfy: function(o, a) {
        var c = this, d = this._group, g = d._map, w = d._featureGroup, m = this._latlng, P = g.latLngToLayerPoint(m), x = L.Path.SVG, T = L.extend({}, this._group.options.spiderLegPolylineOptions), C = T.opacity, D, k, H, F, _t, nt;
        for (C === void 0 && (C = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity), x ? (T.opacity = 0, T.className = (T.className || "") + " leaflet-cluster-spider-leg") : T.opacity = C, d._ignoreMove = !0, D = 0; D < o.length; D++)
          k = o[D], nt = g.layerPointToLatLng(a[D]), H = new L.Polyline([m, nt], T), g.addLayer(H), k._spiderLeg = H, x && (F = H._path, _t = F.getTotalLength() + 0.1, F.style.strokeDasharray = _t, F.style.strokeDashoffset = _t), k.setZIndexOffset && k.setZIndexOffset(1e6), k.clusterHide && k.clusterHide(), w.addLayer(k), k._setPos && k._setPos(P);
        for (d._forceLayout(), d._animationStart(), D = o.length - 1; D >= 0; D--)
          nt = g.layerPointToLatLng(a[D]), k = o[D], k._preSpiderfyLatlng = k._latlng, k.setLatLng(nt), k.clusterShow && k.clusterShow(), x && (H = k._spiderLeg, F = H._path, F.style.strokeDashoffset = 0, H.setStyle({ opacity: C }));
        this.setOpacity(0.3), d._ignoreMove = !1, setTimeout(function() {
          d._animationEnd(), d.fire("spiderfied", {
            cluster: c,
            markers: o
          });
        }, 200);
      },
      _animationUnspiderfy: function(o) {
        var a = this, c = this._group, d = c._map, g = c._featureGroup, w = o ? d._latLngToNewLayerPoint(this._latlng, o.zoom, o.center) : d.latLngToLayerPoint(this._latlng), m = this.getAllChildMarkers(null, !0), P = L.Path.SVG, x, T, C, D, k, H;
        for (c._ignoreMove = !0, c._animationStart(), this.setOpacity(1), T = m.length - 1; T >= 0; T--)
          x = m[T], x._preSpiderfyLatlng && (x.closePopup(), x.setLatLng(x._preSpiderfyLatlng), delete x._preSpiderfyLatlng, H = !0, x._setPos && (x._setPos(w), H = !1), x.clusterHide && (x.clusterHide(), H = !1), H && g.removeLayer(x), P && (C = x._spiderLeg, D = C._path, k = D.getTotalLength() + 0.1, D.style.strokeDashoffset = k, C.setStyle({ opacity: 0 })));
        c._ignoreMove = !1, setTimeout(function() {
          var F = 0;
          for (T = m.length - 1; T >= 0; T--)
            x = m[T], x._spiderLeg && F++;
          for (T = m.length - 1; T >= 0; T--)
            x = m[T], x._spiderLeg && (x.clusterShow && x.clusterShow(), x.setZIndexOffset && x.setZIndexOffset(0), F > 1 && g.removeLayer(x), d.removeLayer(x._spiderLeg), delete x._spiderLeg);
          c._animationEnd(), c.fire("unspiderfied", {
            cluster: a,
            markers: m
          });
        }, 200);
      }
    }), L.MarkerClusterGroup.include({
      //The MarkerCluster currently spiderfied (if any)
      _spiderfied: null,
      unspiderfy: function() {
        this._unspiderfy.apply(this, arguments);
      },
      _spiderfierOnAdd: function() {
        this._map.on("click", this._unspiderfyWrapper, this), this._map.options.zoomAnimation && this._map.on("zoomstart", this._unspiderfyZoomStart, this), this._map.on("zoomend", this._noanimationUnspiderfy, this), L.Browser.touch || this._map.getRenderer(this);
      },
      _spiderfierOnRemove: function() {
        this._map.off("click", this._unspiderfyWrapper, this), this._map.off("zoomstart", this._unspiderfyZoomStart, this), this._map.off("zoomanim", this._unspiderfyZoomAnim, this), this._map.off("zoomend", this._noanimationUnspiderfy, this), this._noanimationUnspiderfy();
      },
      //On zoom start we add a zoomanim handler so that we are guaranteed to be last (after markers are animated)
      //This means we can define the animation they do rather than Markers doing an animation to their actual location
      _unspiderfyZoomStart: function() {
        this._map && this._map.on("zoomanim", this._unspiderfyZoomAnim, this);
      },
      _unspiderfyZoomAnim: function(o) {
        L.DomUtil.hasClass(this._map._mapPane, "leaflet-touching") || (this._map.off("zoomanim", this._unspiderfyZoomAnim, this), this._unspiderfy(o));
      },
      _unspiderfyWrapper: function() {
        this._unspiderfy();
      },
      _unspiderfy: function(o) {
        this._spiderfied && this._spiderfied.unspiderfy(o);
      },
      _noanimationUnspiderfy: function() {
        this._spiderfied && this._spiderfied._noanimationUnspiderfy();
      },
      //If the given layer is currently being spiderfied then we unspiderfy it so it isn't on the map anymore etc
      _unspiderfyLayer: function(o) {
        o._spiderLeg && (this._featureGroup.removeLayer(o), o.clusterShow && o.clusterShow(), o.setZIndexOffset && o.setZIndexOffset(0), this._map.removeLayer(o._spiderLeg), delete o._spiderLeg);
      }
    }), L.MarkerClusterGroup.include({
      /**
       * Updates the icon of all clusters which are parents of the given marker(s).
       * In singleMarkerMode, also updates the given marker(s) icon.
       * @param layers L.MarkerClusterGroup|L.LayerGroup|Array(L.Marker)|Map(L.Marker)|
       * L.MarkerCluster|L.Marker (optional) list of markers (or single marker) whose parent
       * clusters need to be updated. If not provided, retrieves all child markers of this.
       * @returns {L.MarkerClusterGroup}
       */
      refreshClusters: function(o) {
        return o ? o instanceof L.MarkerClusterGroup ? o = o._topClusterLevel.getAllChildMarkers() : o instanceof L.LayerGroup ? o = o._layers : o instanceof L.MarkerCluster ? o = o.getAllChildMarkers() : o instanceof L.Marker && (o = [o]) : o = this._topClusterLevel.getAllChildMarkers(), this._flagParentsIconsNeedUpdate(o), this._refreshClustersIcons(), this.options.singleMarkerMode && this._refreshSingleMarkerModeMarkers(o), this;
      },
      /**
       * Simply flags all parent clusters of the given markers as having a "dirty" icon.
       * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
       * @private
       */
      _flagParentsIconsNeedUpdate: function(o) {
        var a, c;
        for (a in o)
          for (c = o[a].__parent; c; )
            c._iconNeedsUpdate = !0, c = c.__parent;
      },
      /**
       * Re-draws the icon of the supplied markers.
       * To be used in singleMarkerMode only.
       * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
       * @private
       */
      _refreshSingleMarkerModeMarkers: function(o) {
        var a, c;
        for (a in o)
          c = o[a], this.hasLayer(c) && c.setIcon(this._overrideMarkerIcon(c));
      }
    }), L.Marker.include({
      /**
       * Updates the given options in the marker's icon and refreshes the marker.
       * @param options map object of icon options.
       * @param directlyRefreshClusters boolean (optional) true to trigger
       * MCG.refreshClustersOf() right away with this single marker.
       * @returns {L.Marker}
       */
      refreshIconOptions: function(o, a) {
        var c = this.options.icon;
        return L.setOptions(c, o), this.setIcon(c), a && this.__parent && this.__parent._group.refreshClusters(this), this;
      }
    }), h.MarkerClusterGroup = f, h.MarkerCluster = _, Object.defineProperty(h, "__esModule", { value: !0 });
  });
})(fo, fo.exports);
(function() {
  function u(r) {
    return this instanceof u ? (this._canvas = r = typeof r == "string" ? document.getElementById(r) : r, this._ctx = r.getContext("2d"), this._width = r.width, this._height = r.height, this._max = 1, void this.clear()) : new u(r);
  }
  u.prototype = { defaultRadius: 25, defaultGradient: { 0.4: "blue", 0.6: "cyan", 0.7: "lime", 0.8: "yellow", 1: "red" }, data: function(r, h) {
    return this._data = r, this;
  }, max: function(r) {
    return this._max = r, this;
  }, add: function(r) {
    return this._data.push(r), this;
  }, clear: function() {
    return this._data = [], this;
  }, radius: function(r, h) {
    h = h || 15;
    var f = this._circle = document.createElement("canvas"), _ = f.getContext("2d"), o = this._r = r + h;
    return f.width = f.height = 2 * o, _.shadowOffsetX = _.shadowOffsetY = 200, _.shadowBlur = h, _.shadowColor = "black", _.beginPath(), _.arc(o - 200, o - 200, r, 0, 2 * Math.PI, !0), _.closePath(), _.fill(), this;
  }, gradient: function(r) {
    var h = document.createElement("canvas"), f = h.getContext("2d"), _ = f.createLinearGradient(0, 0, 0, 256);
    h.width = 1, h.height = 256;
    for (var o in r) _.addColorStop(o, r[o]);
    return f.fillStyle = _, f.fillRect(0, 0, 1, 256), this._grad = f.getImageData(0, 0, 1, 256).data, this;
  }, draw: function(r) {
    this._circle || this.radius(this.defaultRadius), this._grad || this.gradient(this.defaultGradient);
    var h = this._ctx;
    h.clearRect(0, 0, this._width, this._height);
    for (var f, _ = 0, o = this._data.length; o > _; _++) f = this._data[_], h.globalAlpha = Math.max(f[2] / this._max, r || 0.05), h.drawImage(this._circle, f[0] - this._r, f[1] - this._r);
    var a = h.getImageData(0, 0, this._width, this._height);
    return this._colorize(a.data, this._grad), h.putImageData(a, 0, 0), this;
  }, _colorize: function(r, h) {
    for (var f, _ = 3, o = r.length; o > _; _ += 4) f = 4 * r[_], f && (r[_ - 3] = h[f], r[_ - 2] = h[f + 1], r[_ - 1] = h[f + 2]);
  } }, window.simpleheat = u;
})(), /*
 (c) 2014, Vladimir Agafonkin
 Leaflet.heat, a tiny and fast heatmap plugin for Leaflet.
 https://github.com/Leaflet/Leaflet.heat
*/
L.HeatLayer = (L.Layer ? L.Layer : L.Class).extend({ initialize: function(u, r) {
  this._latlngs = u, L.setOptions(this, r);
}, setLatLngs: function(u) {
  return this._latlngs = u, this.redraw();
}, addLatLng: function(u) {
  return this._latlngs.push(u), this.redraw();
}, setOptions: function(u) {
  return L.setOptions(this, u), this._heat && this._updateOptions(), this.redraw();
}, redraw: function() {
  return !this._heat || this._frame || this._map._animating || (this._frame = L.Util.requestAnimFrame(this._redraw, this)), this;
}, onAdd: function(u) {
  this._map = u, this._canvas || this._initCanvas(), u._panes.overlayPane.appendChild(this._canvas), u.on("moveend", this._reset, this), u.options.zoomAnimation && L.Browser.any3d && u.on("zoomanim", this._animateZoom, this), this._reset();
}, onRemove: function(u) {
  u.getPanes().overlayPane.removeChild(this._canvas), u.off("moveend", this._reset, this), u.options.zoomAnimation && u.off("zoomanim", this._animateZoom, this);
}, addTo: function(u) {
  return u.addLayer(this), this;
}, _initCanvas: function() {
  var u = this._canvas = L.DomUtil.create("canvas", "leaflet-heatmap-layer leaflet-layer"), r = L.DomUtil.testProp(["transformOrigin", "WebkitTransformOrigin", "msTransformOrigin"]);
  u.style[r] = "50% 50%";
  var h = this._map.getSize();
  u.width = h.x, u.height = h.y;
  var f = this._map.options.zoomAnimation && L.Browser.any3d;
  L.DomUtil.addClass(u, "leaflet-zoom-" + (f ? "animated" : "hide")), this._heat = simpleheat(u), this._updateOptions();
}, _updateOptions: function() {
  this._heat.radius(this.options.radius || this._heat.defaultRadius, this.options.blur), this.options.gradient && this._heat.gradient(this.options.gradient), this.options.max && this._heat.max(this.options.max);
}, _reset: function() {
  var u = this._map.containerPointToLayerPoint([0, 0]);
  L.DomUtil.setPosition(this._canvas, u);
  var r = this._map.getSize();
  this._heat._width !== r.x && (this._canvas.width = this._heat._width = r.x), this._heat._height !== r.y && (this._canvas.height = this._heat._height = r.y), this._redraw();
}, _redraw: function() {
  var u, r, h, f, _, o, a, c, d, g = [], w = this._heat._r, m = this._map.getSize(), P = new L.Bounds(L.point([-w, -w]), m.add([w, w])), x = this.options.max === void 0 ? 1 : this.options.max, T = this.options.maxZoom === void 0 ? this._map.getMaxZoom() : this.options.maxZoom, C = 1 / Math.pow(2, Math.max(0, Math.min(T - this._map.getZoom(), 12))), D = w / 2, k = [], H = this._map._getMapPanePos(), F = H.x % D, _t = H.y % D;
  for (u = 0, r = this._latlngs.length; r > u; u++) if (h = this._map.latLngToContainerPoint(this._latlngs[u]), P.contains(h)) {
    _ = Math.floor((h.x - F) / D) + 2, o = Math.floor((h.y - _t) / D) + 2;
    var nt = this._latlngs[u].alt !== void 0 ? this._latlngs[u].alt : this._latlngs[u][2] !== void 0 ? +this._latlngs[u][2] : 1;
    d = nt * C, k[o] = k[o] || [], f = k[o][_], f ? (f[0] = (f[0] * f[2] + h.x * d) / (f[2] + d), f[1] = (f[1] * f[2] + h.y * d) / (f[2] + d), f[2] += d) : k[o][_] = [h.x, h.y, d];
  }
  for (u = 0, r = k.length; r > u; u++) if (k[u]) for (a = 0, c = k[u].length; c > a; a++) f = k[u][a], f && g.push([Math.round(f[0]), Math.round(f[1]), Math.min(f[2], x)]);
  this._heat.data(g).draw(this.options.minOpacity), this._frame = null;
}, _animateZoom: function(u) {
  var r = this._map.getZoomScale(u.zoom), h = this._map._getCenterOffset(u.center)._multiplyBy(-r).subtract(this._map._getMapPanePos());
  L.DomUtil.setTransform ? L.DomUtil.setTransform(this._canvas, h, r) : this._canvas.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(h) + " scale(" + r + ")";
} }), L.heatLayer = function(u, r) {
  return new L.HeatLayer(u, r);
};
const br = ".leaflet-cluster-anim .leaflet-marker-icon,.leaflet-cluster-anim .leaflet-marker-shadow{-webkit-transition:-webkit-transform .3s ease-out,opacity .3s ease-in;-moz-transition:-moz-transform .3s ease-out,opacity .3s ease-in;-o-transition:-o-transform .3s ease-out,opacity .3s ease-in;transition:transform .3s ease-out,opacity .3s ease-in}.leaflet-cluster-spider-leg{-webkit-transition:-webkit-stroke-dashoffset .3s ease-out,-webkit-stroke-opacity .3s ease-in;-moz-transition:-moz-stroke-dashoffset .3s ease-out,-moz-stroke-opacity .3s ease-in;-o-transition:-o-stroke-dashoffset .3s ease-out,-o-stroke-opacity .3s ease-in;transition:stroke-dashoffset .3s ease-out,stroke-opacity .3s ease-in}", Cr = ".marker-cluster-small{background-color:#b5e28c99}.marker-cluster-small div{background-color:#6ecc3999}.marker-cluster-medium{background-color:#f1d35799}.marker-cluster-medium div{background-color:#f0c20c99}.marker-cluster-large{background-color:#fd9c7399}.marker-cluster-large div{background-color:#f1801799}.leaflet-oldie .marker-cluster-small{background-color:#b5e28c}.leaflet-oldie .marker-cluster-small div{background-color:#6ecc39}.leaflet-oldie .marker-cluster-medium{background-color:#f1d357}.leaflet-oldie .marker-cluster-medium div{background-color:#f0c20c}.leaflet-oldie .marker-cluster-large{background-color:#fd9c73}.leaflet-oldie .marker-cluster-large div{background-color:#f18017}.marker-cluster{background-clip:padding-box;border-radius:20px}.marker-cluster div{width:30px;height:30px;margin-left:5px;margin-top:5px;text-align:center;border-radius:15px;font:12px Helvetica Neue,Arial,Helvetica,sans-serif}.marker-cluster span{line-height:30px}";
function qe() {
  return crypto.randomUUID();
}
const Mr = "#1a3a4a", _o = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGOQsvICAAEQAJ+lYp46AAAAAElFTkSuQmCC", po = {
  satellite: { minZoom: 0, maxZoom: 8, extension: "jpg", folder: "styleSatelite" },
  atlas: { minZoom: 0, maxZoom: 5, extension: "jpg", folder: "styleAtlas" },
  grid: { minZoom: 0, maxZoom: 5, extension: "png", folder: "styleGrid" }
}, Tr = {
  satellite: "Satellite",
  atlas: "Atlas",
  grid: "Grid"
}, mo = ["satellite", "atlas", "grid"], Sr = {
  centerX: 117.3,
  centerY: 172.8,
  scaleX: 0.02072,
  scaleY: 0.0205,
  ln2: Math.LN2
}, Tt = {
  zoom: 3,
  minZoom: 1,
  maxZoom: 5,
  center: [0, 0],
  maxBounds: [[-4e3, -5500], [8e3, 6e3]],
  maxBoundsViscosity: 1,
  tileBaseUrl: "mapStyles",
  blipsUrl: "blips",
  defaultStyle: "satellite"
};
function kr() {
  const { centerX: u, centerY: r, scaleX: h, scaleY: f, ln2: _ } = Sr;
  return Object.assign({}, X.CRS.Simple, {
    projection: X.Projection.LonLat,
    scale(o) {
      return Math.pow(2, o);
    },
    zoom(o) {
      return Math.log(o) / _;
    },
    distance(o, a) {
      return Math.hypot(a.lng - o.lng, a.lat - o.lat);
    },
    transformation: new X.Transformation(h, u, -f, r),
    infinite: !0
  });
}
const Mo = "Markers";
function Er(u, r) {
  const h = r.id ?? qe(), f = r.group ?? Mo, _ = u.find((a) => a.id === h);
  if (_)
    return _.x = r.x, _.y = r.y, _.icon = r.icon, _.popup = r.popup, _.group = f, { entry: _, isUpdate: !0 };
  const o = {
    id: h,
    x: r.x,
    y: r.y,
    icon: r.icon,
    popup: r.popup,
    group: f
  };
  return u.push(o), { entry: o, isUpdate: !1 };
}
function Ar(u, r) {
  u._leaflet && (u._leaflet.setLatLng([u.y, u.x]), u._leaflet.setIcon(r(u.icon)), u.popup ? (u._leaflet.unbindPopup(), u._leaflet.bindPopup(u.popup)) : u._leaflet.unbindPopup());
}
const Xt = {
  color: "#3388ff",
  weight: 3,
  opacity: 1,
  fillColor: "#3388ff",
  fillOpacity: 0.2,
  group: "Shapes"
};
function go(u) {
  return {
    id: u.id ?? qe(),
    type: u.type,
    points: u.points,
    color: u.color ?? Xt.color,
    weight: u.weight ?? Xt.weight,
    opacity: u.opacity ?? Xt.opacity,
    fillColor: u.fillColor ?? u.color ?? Xt.fillColor,
    fillOpacity: u.fillOpacity ?? Xt.fillOpacity,
    popup: u.popup,
    group: u.group ?? Xt.group,
    label: u.label
  };
}
function vo(u, r) {
  const h = r.id ?? qe(), f = u.findIndex((o) => o.id === h);
  if (f !== -1) {
    const o = go({ ...r, id: h });
    return o._leaflet = u[f]._leaflet, o._labelMarker = u[f]._labelMarker, u[f] = o, { entry: o, isUpdate: !0 };
  }
  const _ = go({ ...r, id: h });
  return u.push(_), { entry: _, isUpdate: !1 };
}
function Or(u) {
  if (u.length === 0) return [0, 0];
  let r = 0, h = 0;
  for (const [f, _] of u)
    r += f, h += _;
  return [r / u.length, h / u.length];
}
function zr(u) {
  const r = u.fontSize ?? 12, h = u.color ?? "#fff", f = u.className ?? "";
  return X.divIcon({
    className: `gta-shape-label ${f}`.trim(),
    html: `<span style="
      font-size: ${r}px;
      color: ${h};
      white-space: nowrap;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
      pointer-events: none;
    ">${u.text}</span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
}
const Zr = Qs`
  :host {
    --gta-water-color: #1a3a4a;

    display: block;
    width: 100%;
    height: 100%;
    background: var(--gta-water-color);
  }
  #map-container {
    width: 100%;
    height: 100%;
    background: var(--gta-water-color);
  }
  .leaflet-container {
    background: var(--gta-water-color) !important;
  }
  .leaflet-tile-pane {
    background: var(--gta-water-color);
  }
`;
var Ir = Object.defineProperty, Br = Object.getOwnPropertyDescriptor, J = (u, r, h, f) => {
  for (var _ = f > 1 ? void 0 : f ? Br(r, h) : r, o = u.length - 1, a; o >= 0; o--)
    (a = u[o]) && (_ = (f ? a(r, h, _) : a(_)) || _);
  return f && _ && Ir(r, h, _), _;
};
let j = class extends Le {
  constructor() {
    super(...arguments), this.leafletCssUrl = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css", this.tileBaseUrl = Tt.tileBaseUrl, this.defaultStyle = Tt.defaultStyle, this.zoom = Tt.zoom, this.minZoom = Tt.minZoom, this.maxZoom = Tt.maxZoom, this.maxBounds = Tt.maxBounds, this.maxBoundsViscosity = Tt.maxBoundsViscosity, this.blipsUrl = Tt.blipsUrl, this.showLayerControl = !1, this.disableClustering = !1, this.placeMode = !1, this.markers = [], this.shapes = [], this.showHeatmap = !1, this._markerEntries = [], this._shapeEntries = [], this._overlayGroups = /* @__PURE__ */ new Map(), this._tileLayers = {};
  }
  /** Custom Leaflet CRS. When unset, the built-in GTA V CRS is used. */
  get crs() {
    return this._crs;
  }
  set crs(u) {
    this._crs = u;
  }
  // --- Imperative API: Markers ---
  /**
   * Adds or updates a marker on the map.
   * @param marker - Marker definition to add or update.
   * @returns The marker's unique id.
   */
  addMarker(u) {
    var _;
    const r = (_ = this._markerEntries.find((o) => o.id === u.id)) == null ? void 0 : _.group, { entry: h, isUpdate: f } = Er(this._markerEntries, u);
    if (this._map) {
      if (f)
        if (r && r !== h.group && h._leaflet) {
          const o = this._overlayGroups.get(r);
          o && o.removeLayer(h._leaflet), h._leaflet = void 0, this._addLeafletMarker(h);
        } else
          Ar(h, (o) => this._createIcon(o));
      else
        this._addLeafletMarker(h);
      this._updateHeatmap();
    }
    return h.id;
  }
  /**
   * Removes a marker by id.
   * @param id - The marker's unique id.
   * @returns `true` if the marker was found and removed.
   */
  removeMarker(u) {
    const r = this._markerEntries.findIndex((f) => f.id === u);
    if (r === -1) return !1;
    const h = this._markerEntries[r];
    if (h._leaflet) {
      const f = this._overlayGroups.get(h.group);
      f && f.removeLayer(h._leaflet);
    }
    return this._markerEntries.splice(r, 1), this._updateHeatmap(), !0;
  }
  /** Returns a snapshot of all marker entries (without internal Leaflet references). */
  getMarkers() {
    return this._markerEntries.map(({ _leaflet: u, ...r }) => r);
  }
  /** Removes all markers from the map. */
  clearMarkers() {
    for (const u of this._markerEntries)
      if (u._leaflet) {
        const r = this._overlayGroups.get(u.group);
        r && r.removeLayer(u._leaflet);
      }
    this._markerEntries.length = 0, this._updateHeatmap();
  }
  // --- Imperative API: Shapes ---
  /**
   * Adds or updates a shape on the map.
   * @param shape - Shape definition to add or update.
   * @returns The shape's unique id.
   */
  addShape(u) {
    const r = u.id ? this._shapeEntries.find((o) => o.id === u.id) : void 0, h = r == null ? void 0 : r.group, { entry: f, isUpdate: _ } = vo(this._shapeEntries, u);
    return this._map && (_ && f._leaflet && (this._removeShapeFromGroup(f, h), f._leaflet = void 0, f._labelMarker = void 0), this._addLeafletShape(f)), f.id;
  }
  _removeShapeFromGroup(u, r) {
    if (!r || !u._leaflet) return;
    const h = this._overlayGroups.get(r);
    h && (h.removeLayer(u._leaflet), u._labelMarker && h.removeLayer(u._labelMarker));
  }
  /**
   * Removes a shape by id.
   * @param id - The shape's unique id.
   * @returns `true` if the shape was found and removed.
   */
  removeShape(u) {
    const r = this._shapeEntries.findIndex((_) => _.id === u);
    if (r === -1) return !1;
    const h = this._shapeEntries[r], f = this._overlayGroups.get(h.group);
    return f && (h._leaflet && f.removeLayer(h._leaflet), h._labelMarker && f.removeLayer(h._labelMarker)), this._shapeEntries.splice(r, 1), !0;
  }
  /** Returns a snapshot of all shape entries (without internal Leaflet references). */
  getShapes() {
    return this._shapeEntries.map(({ _leaflet: u, _labelMarker: r, ...h }) => h);
  }
  /** Removes all shapes from the map. */
  clearShapes() {
    for (const u of this._shapeEntries) {
      const r = this._overlayGroups.get(u.group);
      r && (u._leaflet && r.removeLayer(u._leaflet), u._labelMarker && r.removeLayer(u._labelMarker));
    }
    this._shapeEntries.length = 0;
  }
  // --- Lifecycle ---
  render() {
    return cr`
      <link rel="stylesheet" href="${this.leafletCssUrl}" @load=${this._onCssLoad}>
      <div id="map-container"></div>
    `;
  }
  _onCssLoad() {
    this._map || this._initMap();
  }
  firstUpdated() {
    const u = this.renderRoot.querySelector("link");
    u != null && u.sheet && this._initMap();
  }
  _initMap() {
    if (this._map) return;
    const u = this.renderRoot.querySelector("#map-container");
    if (!u) return;
    const r = this._crs ?? kr();
    this._buildTileLayers();
    const h = this._tileLayers[this.defaultStyle] ?? this._tileLayers.satellite, f = {
      crs: r,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      preferCanvas: !0,
      layers: [h],
      center: Tt.center,
      zoom: this.zoom
    };
    this.maxBounds && (f.maxBounds = X.latLngBounds(
      X.latLng(this.maxBounds[0][0], this.maxBounds[0][1]),
      X.latLng(this.maxBounds[1][0], this.maxBounds[1][1])
    ), f.maxBoundsViscosity = this.maxBoundsViscosity), this._map = X.map(u, f), this._map.getContainer().style.background = Mr, requestAnimationFrame(() => {
      var _;
      (_ = this._map) == null || _.invalidateSize();
    }), this._syncMarkers(), this._syncShapes(), this.showHeatmap && this._enableHeatmap(), this.showLayerControl && this._addLayerControl(), this._bindMapEvents(), this._dispatch("map-ready", { map: this._map });
  }
  updated(u) {
    if (this._map) {
      if (u.has("markers") && (this._syncMarkers(), this._updateHeatmap()), u.has("shapes") && this._syncShapes(), u.has("zoom") && u.get("zoom") !== void 0 && this._map.setZoom(this.zoom), u.has("defaultStyle") && u.get("defaultStyle") !== void 0) {
        const r = u.get("defaultStyle");
        this._switchTileLayer(r, this.defaultStyle);
      }
      u.has("showLayerControl") && this._toggleLayerControl(), u.has("showHeatmap") && (this.showHeatmap ? this._enableHeatmap() : this._disableHeatmap(), this._rebuildLayerControl());
    }
  }
  // --- Private: Map events ---
  _bindMapEvents() {
    this._map && this._map.on("click", (u) => {
      const r = { x: u.latlng.lng, y: u.latlng.lat };
      this._dispatch("map-click", r), this.placeMode && this._dispatch("marker-placed", r);
    });
  }
  // --- Private: Overlay groups ---
  _getOrCreateOverlayGroup(u) {
    const r = this._overlayGroups.get(u);
    if (r) return r;
    const h = this.disableClustering ? X.layerGroup() : X.markerClusterGroup();
    return this._overlayGroups.set(u, h), this._map && (h.addTo(this._map), this._rebuildLayerControl()), h;
  }
  // --- Private: Tile layers ---
  _resolveTileUrl(u) {
    const h = {
      satellite: this.satelliteUrl,
      atlas: this.atlasUrl,
      grid: this.gridUrl
    }[u];
    if (h) return h;
    const f = po[u];
    return `${this.tileBaseUrl}/${f.folder}/{z}/{x}/{y}.${f.extension}`;
  }
  _buildTileLayers() {
    for (const u of mo) {
      const r = this._resolveTileUrl(u), h = po[u], f = X.tileLayer(r, {
        minZoom: h.minZoom,
        maxZoom: h.maxZoom,
        noWrap: !0,
        attribution: "Online map GTA V",
        errorTileUrl: _o
      });
      f.on("tileerror", (_) => {
        const o = _.tile;
        o.src = _o;
      }), this._tileLayers[u] = f;
    }
  }
  _switchTileLayer(u, r) {
    if (!this._map) return;
    const h = this._tileLayers[u], f = this._tileLayers[r];
    h && f && h !== f && (this._map.removeLayer(h), this._map.addLayer(f));
  }
  // --- Private: Layer control ---
  _addLayerControl() {
    if (this._layerControl || !this._map) return;
    const u = {};
    for (const h of mo)
      u[Tr[h]] = this._tileLayers[h];
    const r = {};
    for (const [h, f] of this._overlayGroups)
      r[h] = f;
    this._heatLayer && (r.Heatmap = this._heatLayer), this._layerControl = X.control.layers(u, r).addTo(this._map);
  }
  _rebuildLayerControl() {
    !this._map || !this.showLayerControl || (this._layerControl && (this._map.removeControl(this._layerControl), this._layerControl = void 0), this._addLayerControl());
  }
  _toggleLayerControl() {
    this._map && (this.showLayerControl ? this._addLayerControl() : this._layerControl && (this._map.removeControl(this._layerControl), this._layerControl = void 0));
  }
  // --- Private: Markers ---
  _createIcon(u) {
    return X.icon({
      iconUrl: `${this.blipsUrl}/${u}.png`,
      iconSize: [20, 20],
      iconAnchor: [20, 20],
      popupAnchor: [-10, -27]
    });
  }
  _addLeafletMarker(u) {
    const r = this._getOrCreateOverlayGroup(u.group), h = this._createIcon(u.icon), f = X.marker([u.y, u.x], { icon: h }).addTo(r);
    u.popup && f.bindPopup(u.popup), f.on("click", () => {
      this._dispatch("marker-click", {
        id: u.id,
        x: u.x,
        y: u.y,
        icon: u.icon,
        popup: u.popup
      });
    }), u._leaflet = f;
  }
  _syncMarkers() {
    for (const r of this._markerEntries) {
      if (r._leaflet) {
        const h = this._overlayGroups.get(r.group);
        h && h.removeLayer(r._leaflet);
      }
      r._leaflet = void 0;
    }
    const u = typeof this.markers == "string" ? JSON.parse(this.markers) : this.markers;
    for (const r of u) {
      const h = r.id ?? qe(), f = r.group ?? Mo, _ = { ...r, id: h, group: f };
      this._addLeafletMarker(_);
    }
    for (const r of this._markerEntries)
      this._addLeafletMarker(r);
  }
  // --- Private: Shapes ---
  _addLeafletShape(u) {
    const r = this._getOrCreateOverlayGroup(u.group), h = u.points.map(([_, o]) => X.latLng(o, _)), f = {
      color: u.color,
      weight: u.weight,
      opacity: u.opacity
    };
    if (u.type === "polygon" ? (f.fillColor = u.fillColor, f.fillOpacity = u.fillOpacity, u._leaflet = X.polygon(h, f).addTo(r)) : u._leaflet = X.polyline(h, f).addTo(r), u.popup && u._leaflet.bindPopup(u.popup), u.label) {
      const [_, o] = Or(u.points), a = zr(u.label);
      u._labelMarker = X.marker([o, _], {
        icon: a,
        interactive: !1
      }).addTo(r);
    }
  }
  _syncShapes() {
    for (const r of this._shapeEntries) {
      if (r._leaflet) {
        const h = this._overlayGroups.get(r.group);
        h && (h.removeLayer(r._leaflet), r._labelMarker && h.removeLayer(r._labelMarker));
      }
      r._leaflet = void 0, r._labelMarker = void 0;
    }
    this._shapeEntries.length = 0;
    const u = typeof this.shapes == "string" ? JSON.parse(this.shapes) : this.shapes;
    for (const r of u) {
      const { entry: h } = vo(this._shapeEntries, r);
      this._addLeafletShape(h);
    }
  }
  // --- Private: Heatmap ---
  _getHeatmapData() {
    return [
      ...typeof this.markers == "string" ? JSON.parse(this.markers) : this.markers,
      ...this._markerEntries
    ].map((h) => [h.y, h.x]);
  }
  _enableHeatmap() {
    if (!this._map || this._heatLayer) return;
    const u = this._getHeatmapData();
    this._heatLayer = X.heatLayer(u, {
      radius: 40,
      blur: 20,
      max: 1,
      minOpacity: 0.3,
      maxZoom: this.zoom
    }), this._heatLayer.addTo(this._map), this._rebuildLayerControl();
  }
  _disableHeatmap() {
    !this._map || !this._heatLayer || (this._map.removeLayer(this._heatLayer), this._heatLayer = void 0, this._rebuildLayerControl());
  }
  _updateHeatmap() {
    if (!this._heatLayer) return;
    const u = this._getHeatmapData();
    this._heatLayer.setLatLngs(u);
  }
  // --- Private: Events ---
  _dispatch(u, r) {
    this.dispatchEvent(
      new CustomEvent(u, {
        detail: r,
        bubbles: !0,
        composed: !0
      })
    );
  }
};
j.styles = [
  Zr,
  Zi(br),
  Zi(Cr)
];
J([
  et({ type: String, attribute: "leaflet-css-url" })
], j.prototype, "leafletCssUrl", 2);
J([
  et({ type: String, attribute: "tile-base-url" })
], j.prototype, "tileBaseUrl", 2);
J([
  et({ type: String, attribute: "satellite-url" })
], j.prototype, "satelliteUrl", 2);
J([
  et({ type: String, attribute: "atlas-url" })
], j.prototype, "atlasUrl", 2);
J([
  et({ type: String, attribute: "grid-url" })
], j.prototype, "gridUrl", 2);
J([
  et({ type: String, attribute: "default-style" })
], j.prototype, "defaultStyle", 2);
J([
  et({ type: Number })
], j.prototype, "zoom", 2);
J([
  et({ type: Number, attribute: "min-zoom" })
], j.prototype, "minZoom", 2);
J([
  et({ type: Number, attribute: "max-zoom" })
], j.prototype, "maxZoom", 2);
J([
  et({ type: Array, attribute: "max-bounds" })
], j.prototype, "maxBounds", 2);
J([
  et({ type: Number, attribute: "max-bounds-viscosity" })
], j.prototype, "maxBoundsViscosity", 2);
J([
  et({ type: String, attribute: "blips-url" })
], j.prototype, "blipsUrl", 2);
J([
  et({ type: Boolean, attribute: "show-layer-control" })
], j.prototype, "showLayerControl", 2);
J([
  et({ type: Boolean, attribute: "disable-clustering" })
], j.prototype, "disableClustering", 2);
J([
  et({ type: Boolean, attribute: "place-mode" })
], j.prototype, "placeMode", 2);
J([
  et({ type: Array })
], j.prototype, "markers", 2);
J([
  et({ type: Array })
], j.prototype, "shapes", 2);
J([
  et({ type: Boolean, attribute: "show-heatmap" })
], j.prototype, "showHeatmap", 2);
j = J([
  yr("gta-v-map")
], j);
export {
  Tt as DEFAULT_MAP_CONFIG,
  Mo as DEFAULT_MARKER_GROUP,
  Sr as GTA_CRS_CONFIG,
  j as GtaVMap,
  mo as MAP_STYLES,
  Xt as SHAPE_DEFAULTS,
  Tr as STYLE_LABELS,
  po as TILE_CONFIGS,
  Mr as WATER_COLOR,
  _o as WATER_TILE_DATA_URI,
  Or as computeCentroid,
  kr as createGtaCRS,
  zr as createLabelIcon,
  go as createShapeEntry,
  qe as generateId,
  Ar as updateLeafletMarker,
  Er as upsertMarkerEntry,
  vo as upsertShapeEntry
};
