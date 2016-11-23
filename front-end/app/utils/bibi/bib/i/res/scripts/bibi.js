/*!
 *
 *  # BiB/i
 *
 *  - "EPUB Reader on Your Web Site."
 *  - (c) Satoru MATSUSHIMA - http://bibi.epub.link or https://github.com/satorumurmur/bibi
 *  - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 *
 *  ## Components:
 *  1. Native Promise Only - https://github.com/getify/native-promise-only | Copyright (c) Kyle Simpson - Licensed under the MIT license.
 *  2. Hammer.JS - http://hammerjs.github.io/ | Copyright (c) Jorik Tangelder - Licensed under the MIT license.
 *  3. easing.js - https://github.com/danro/easing-js | Copyright (c) Dan Rogers - Licensed under the MIT license.
 *  4. sML - https://github.com/satorumurmur/sML | Copyright (c) Satoru MATSUSHIMA - Licensed under the MIT license.
 *  5. BiB/i (core)
 *  6. BiB/i Extensions: Share

 */
/*! Native Promise Only
 v0.8.0-a (c) Kyle Simpson
 MIT License: http://getify.mit-license.org
 */
!function (e, t, n) {
    t[e] = t[e] || n(), "undefined" != typeof module && module.exports ? module.exports = t[e] : "function" == typeof define && define.amd && define(function () {
        return t[e]
    })
}("Promise", "undefined" != typeof global ? global : this, function () {
    "use strict";
    function e(e, t) {
        p.add(e, t), u || (u = f(p.drain))
    }

    function t(e) {
        var t, n = typeof e;
        return null == e || "object" != n && "function" != n || (t = e.then), "function" == typeof t ? t : !1
    }

    function n() {
        for (var e = 0; e < this.chain.length; e++)i(this, 1 === this.state ? this.chain[e].success : this.chain[e].failure, this.chain[e]);
        this.chain.length = 0
    }

    function i(e, n, i) {
        var o, r;
        try {
            n === !1 ? i.reject(e.msg) : (o = n === !0 ? e.msg : n.call(void 0, e.msg), o === i.promise ? i.reject(TypeError("Promise-chain cycle")) : (r = t(o)) ? r.call(o, i.resolve, i.reject) : i.resolve(o))
        } catch (a) {
            i.reject(a)
        }
    }

    function o(i) {
        var a, l = this;
        if (!l.triggered) {
            l.triggered = !0, l.def && (l = l.def);
            try {
                (a = t(i)) ? e(function () {
                    var e = new s(l);
                    try {
                        a.call(i, function () {
                            o.apply(e, arguments)
                        }, function () {
                            r.apply(e, arguments)
                        })
                    } catch (t) {
                        r.call(e, t)
                    }
                }) : (l.msg = i, l.state = 1, l.chain.length > 0 && e(n, l))
            } catch (d) {
                r.call(new s(l), d)
            }
        }
    }

    function r(t) {
        var i = this;
        i.triggered || (i.triggered = !0, i.def && (i = i.def), i.msg = t, i.state = 2, i.chain.length > 0 && e(n, i))
    }

    function a(e, t, n, i) {
        for (var o = 0; o < t.length; o++)!function (o) {
            e.resolve(t[o]).then(function (e) {
                n(o, e)
            }, i)
        }(o)
    }

    function s(e) {
        this.def = e, this.triggered = !1
    }

    function l(e) {
        this.promise = e, this.state = 0, this.triggered = !1, this.chain = [], this.msg = void 0
    }

    function d(t) {
        if ("function" != typeof t)throw TypeError("Not a function");
        if (0 !== this.__NPO__)throw TypeError("Not a promise");
        this.__NPO__ = 1;
        var i = new l(this);
        this.then = function (t, o) {
            var r = {success: "function" == typeof t ? t : !0, failure: "function" == typeof o ? o : !1};
            return r.promise = new this.constructor(function (e, t) {
                if ("function" != typeof e || "function" != typeof t)throw TypeError("Not a function");
                r.resolve = e, r.reject = t
            }), i.chain.push(r), 0 !== i.state && e(n, i), r.promise
        }, this["catch"] = function (e) {
            return this.then(void 0, e)
        };
        try {
            t.call(void 0, function (e) {
                o.call(i, e)
            }, function (e) {
                r.call(i, e)
            })
        } catch (a) {
            r.call(i, a)
        }
    }

    var c, u, p, h = Object.prototype.toString, f = "undefined" != typeof setImmediate ? function (e) {
        return setImmediate(e)
    } : setTimeout;
    try {
        Object.defineProperty({}, "x", {}), c = function (e, t, n, i) {
            return Object.defineProperty(e, t, {value: n, writable: !0, configurable: i !== !1})
        }
    } catch (g) {
        c = function (e, t, n) {
            return e[t] = n, e
        }
    }
    p = function () {
        function e(e, t) {
            this.fn = e, this.self = t, this.next = void 0
        }

        var t, n, i;
        return {
            add: function (o, r) {
                i = new e(o, r), n ? n.next = i : t = i, n = i, i = void 0
            }, drain: function () {
                var e = t;
                for (t = n = u = void 0; e;)e.fn.call(e.self), e = e.next
            }
        }
    }();
    var m = c({}, "constructor", d, !1);
    return d.prototype = m, c(m, "__NPO__", 0, !1), c(d, "resolve", function (e) {
        var t = this;
        return e && "object" == typeof e && 1 === e.__NPO__ ? e : new t(function (t, n) {
            if ("function" != typeof t || "function" != typeof n)throw TypeError("Not a function");
            t(e)
        })
    }), c(d, "reject", function (e) {
        return new this(function (t, n) {
            if ("function" != typeof t || "function" != typeof n)throw TypeError("Not a function");
            n(e)
        })
    }), c(d, "all", function (e) {
        var t = this;
        return "[object Array]" != h.call(e) ? t.reject(TypeError("Not an array")) : 0 === e.length ? t.resolve([]) : new t(function (n, i) {
            if ("function" != typeof n || "function" != typeof i)throw TypeError("Not a function");
            var o = e.length, r = Array(o), s = 0;
            a(t, e, function (e, t) {
                r[e] = t, ++s === o && n(r)
            }, i)
        })
    }), c(d, "race", function (e) {
        var t = this;
        return "[object Array]" != h.call(e) ? t.reject(TypeError("Not an array")) : new t(function (n, i) {
            if ("function" != typeof n || "function" != typeof i)throw TypeError("Not a function");
            a(t, e, function (e, t) {
                n(t)
            }, i)
        })
    }), d
}), /*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
    !function (e, t, n, i) {
        "use strict";
        function o(e, t, n) {
            return setTimeout(d(e, n), t)
        }

        function r(e, t, n) {
            return Array.isArray(e) ? (a(e, n[t], n), !0) : !1
        }

        function a(e, t, n) {
            var o;
            if (e)if (e.forEach)e.forEach(t, n); else if (e.length !== i)for (o = 0; o < e.length;)t.call(n, e[o], o, e), o++; else for (o in e)e.hasOwnProperty(o) && t.call(n, e[o], o, e)
        }

        function s(t, n, i) {
            var o = "DEPRECATED METHOD: " + n + "\n" + i + " AT \n";
            return function () {
                var n = new Error("get-stack-trace"), i = n && n.stack ? n.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", r = e.console && (e.console.warn || e.console.log);
                return r && r.call(e.console, o, i), t.apply(this, arguments)
            }
        }

        function l(e, t, n) {
            var i, o = t.prototype;
            i = e.prototype = Object.create(o), i.constructor = e, i._super = o, n && ue(i, n)
        }

        function d(e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        }

        function c(e, t) {
            return typeof e == fe ? e.apply(t ? t[0] || i : i, t) : e
        }

        function u(e, t) {
            return e === i ? t : e
        }

        function p(e, t, n) {
            a(m(t), function (t) {
                e.addEventListener(t, n, !1)
            })
        }

        function h(e, t, n) {
            a(m(t), function (t) {
                e.removeEventListener(t, n, !1)
            })
        }

        function f(e, t) {
            for (; e;) {
                if (e == t)return !0;
                e = e.parentNode
            }
            return !1
        }

        function g(e, t) {
            return e.indexOf(t) > -1
        }

        function m(e) {
            return e.trim().split(/\s+/g)
        }

        function S(e, t, n) {
            if (e.indexOf && !n)return e.indexOf(t);
            for (var i = 0; i < e.length;) {
                if (n && e[i][n] == t || !n && e[i] === t)return i;
                i++
            }
            return -1
        }

        function b(e) {
            return Array.prototype.slice.call(e, 0)
        }

        function v(e, t, n) {
            for (var i = [], o = [], r = 0; r < e.length;) {
                var a = t ? e[r][t] : e[r];
                S(o, a) < 0 && i.push(e[r]), o[r] = a, r++
            }
            return n && (i = t ? i.sort(function (e, n) {
                return e[t] > n[t]
            }) : i.sort()), i
        }

        function I(e, t) {
            for (var n, o, r = t[0].toUpperCase() + t.slice(1), a = 0; a < pe.length;) {
                if (n = pe[a], o = n ? n + r : t, o in e)return o;
                a++
            }
            return i
        }

        function y() {
            return Ie++
        }

        function L(t) {
            var n = t.ownerDocument || t;
            return n.defaultView || n.parentWindow || e
        }

        function E(e, t) {
            var n = this;
            this.manager = e, this.callback = t, this.element = e.element, this.target = e.options.inputTarget, this.domHandler = function (t) {
                c(e.options.enable, [e]) && n.handler(t)
            }, this.init()
        }

        function M(e) {
            var t, n = e.options.inputClass;
            return new (t = n ? n : Ee ? F : Me ? W : Le ? _ : D)(e, P)
        }

        function P(e, t, n) {
            var i = n.pointers.length, o = n.changedPointers.length, r = t & Oe && i - o === 0, a = t & (xe | Ae) && i - o === 0;
            n.isFirst = !!r, n.isFinal = !!a, r && (e.session = {}), n.eventType = t, T(e, n), e.emit("hammer.input", n), e.recognize(n), e.session.prevInput = n
        }

        function T(e, t) {
            var n = e.session, i = t.pointers, o = i.length;
            n.firstInput || (n.firstInput = R(t)), o > 1 && !n.firstMultiple ? n.firstMultiple = R(t) : 1 === o && (n.firstMultiple = !1);
            var r = n.firstInput, a = n.firstMultiple, s = a ? a.center : r.center, l = t.center = O(i);
            t.timeStamp = Se(), t.deltaTime = t.timeStamp - r.timeStamp, t.angle = k(s, l), t.distance = A(s, l), w(n, t), t.offsetDirection = x(t.deltaX, t.deltaY);
            var d = C(t.deltaTime, t.deltaX, t.deltaY);
            t.overallVelocityX = d.x, t.overallVelocityY = d.y, t.overallVelocity = me(d.x) > me(d.y) ? d.x : d.y, t.scale = a ? H(a.pointers, i) : 1, t.rotation = a ? N(a.pointers, i) : 0, t.maxPointers = n.prevInput ? t.pointers.length > n.prevInput.maxPointers ? t.pointers.length : n.prevInput.maxPointers : t.pointers.length, B(n, t);
            var c = e.element;
            f(t.srcEvent.target, c) && (c = t.srcEvent.target), t.target = c
        }

        function w(e, t) {
            var n = t.center, i = e.offsetDelta || {}, o = e.prevDelta || {}, r = e.prevInput || {};
            t.eventType !== Oe && r.eventType !== xe || (o = e.prevDelta = {
                x: r.deltaX || 0,
                y: r.deltaY || 0
            }, i = e.offsetDelta = {x: n.x, y: n.y}), t.deltaX = o.x + (n.x - i.x), t.deltaY = o.y + (n.y - i.y)
        }

        function B(e, t) {
            var n, o, r, a, s = e.lastInterval || t, l = t.timeStamp - s.timeStamp;
            if (t.eventType != Ae && (l > Re || s.velocity === i)) {
                var d = t.deltaX - s.deltaX, c = t.deltaY - s.deltaY, u = C(l, d, c);
                o = u.x, r = u.y, n = me(u.x) > me(u.y) ? u.x : u.y, a = x(d, c), e.lastInterval = t
            } else n = s.velocity, o = s.velocityX, r = s.velocityY, a = s.direction;
            t.velocity = n, t.velocityX = o, t.velocityY = r, t.direction = a
        }

        function R(e) {
            for (var t = [], n = 0; n < e.pointers.length;)t[n] = {
                clientX: ge(e.pointers[n].clientX),
                clientY: ge(e.pointers[n].clientY)
            }, n++;
            return {timeStamp: Se(), pointers: t, center: O(t), deltaX: e.deltaX, deltaY: e.deltaY}
        }

        function O(e) {
            var t = e.length;
            if (1 === t)return {x: ge(e[0].clientX), y: ge(e[0].clientY)};
            for (var n = 0, i = 0, o = 0; t > o;)n += e[o].clientX, i += e[o].clientY, o++;
            return {x: ge(n / t), y: ge(i / t)}
        }

        function C(e, t, n) {
            return {x: t / e || 0, y: n / e || 0}
        }

        function x(e, t) {
            return e === t ? ke : me(e) >= me(t) ? 0 > e ? Ne : He : 0 > t ? De : Fe
        }

        function A(e, t, n) {
            n || (n = Ye);
            var i = t[n[0]] - e[n[0]], o = t[n[1]] - e[n[1]];
            return Math.sqrt(i * i + o * o)
        }

        function k(e, t, n) {
            n || (n = Ye);
            var i = t[n[0]] - e[n[0]], o = t[n[1]] - e[n[1]];
            return 180 * Math.atan2(o, i) / Math.PI
        }

        function N(e, t) {
            return k(t[1], t[0], _e) + k(e[1], e[0], _e)
        }

        function H(e, t) {
            return A(t[0], t[1], _e) / A(e[0], e[1], _e)
        }

        function D() {
            this.evEl = je, this.evWin = Ue, this.pressed = !1, E.apply(this, arguments)
        }

        function F() {
            this.evEl = qe, this.evWin = Ge, E.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
        }

        function X() {
            this.evTarget = Qe, this.evWin = Je, this.started = !1, E.apply(this, arguments)
        }

        function z(e, t) {
            var n = b(e.touches), i = b(e.changedTouches);
            return t & (xe | Ae) && (n = v(n.concat(i), "identifier", !0)), [n, i]
        }

        function W() {
            this.evTarget = tt, this.targetIds = {}, E.apply(this, arguments)
        }

        function Y(e, t) {
            var n = b(e.touches), i = this.targetIds;
            if (t & (Oe | Ce) && 1 === n.length)return i[n[0].identifier] = !0, [n, n];
            var o, r, a = b(e.changedTouches), s = [], l = this.target;
            if (r = n.filter(function (e) {
                    return f(e.target, l)
                }), t === Oe)for (o = 0; o < r.length;)i[r[o].identifier] = !0, o++;
            for (o = 0; o < a.length;)i[a[o].identifier] && s.push(a[o]), t & (xe | Ae) && delete i[a[o].identifier], o++;
            return s.length ? [v(r.concat(s), "identifier", !0), s] : void 0
        }

        function _() {
            E.apply(this, arguments);
            var e = d(this.handler, this);
            this.touch = new W(this.manager, e), this.mouse = new D(this.manager, e), this.primaryTouch = null, this.lastTouches = []
        }

        function Z(e, t) {
            e & Oe ? (this.primaryTouch = t.changedPointers[0].identifier, j.call(this, t)) : e & (xe | Ae) && j.call(this, t)
        }

        function j(e) {
            var t = e.changedPointers[0];
            if (t.identifier === this.primaryTouch) {
                var n = {x: t.clientX, y: t.clientY};
                this.lastTouches.push(n);
                var i = this.lastTouches, o = function () {
                    var e = i.indexOf(n);
                    e > -1 && i.splice(e, 1)
                };
                setTimeout(o, nt)
            }
        }

        function U(e) {
            for (var t = e.srcEvent.clientX, n = e.srcEvent.clientY, i = 0; i < this.lastTouches.length; i++) {
                var o = this.lastTouches[i], r = Math.abs(t - o.x), a = Math.abs(n - o.y);
                if (it >= r && it >= a)return !0
            }
            return !1
        }

        function V(e, t) {
            this.manager = e, this.set(t)
        }

        function $(e) {
            if (g(e, dt))return dt;
            var t = g(e, ct), n = g(e, ut);
            return t && n ? dt : t || n ? t ? ct : ut : g(e, lt) ? lt : st
        }

        function q() {
            if (!rt)return !1;
            var t = {}, n = e.CSS && e.CSS.supports;
            return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (i) {
                t[i] = n ? e.CSS.supports("touch-action", i) : !0
            }), t
        }

        function G(e) {
            this.options = ue({}, this.defaults, e || {}), this.id = y(), this.manager = null, this.options.enable = u(this.options.enable, !0), this.state = ht, this.simultaneous = {}, this.requireFail = []
        }

        function K(e) {
            return e & bt ? "cancel" : e & mt ? "end" : e & gt ? "move" : e & ft ? "start" : ""
        }

        function Q(e) {
            return e == Fe ? "down" : e == De ? "up" : e == Ne ? "left" : e == He ? "right" : ""
        }

        function J(e, t) {
            var n = t.manager;
            return n ? n.get(e) : e
        }

        function ee() {
            G.apply(this, arguments)
        }

        function te() {
            ee.apply(this, arguments), this.pX = null, this.pY = null
        }

        function ne() {
            ee.apply(this, arguments)
        }

        function ie() {
            G.apply(this, arguments), this._timer = null, this._input = null
        }

        function oe() {
            ee.apply(this, arguments)
        }

        function re() {
            ee.apply(this, arguments)
        }

        function ae() {
            G.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
        }

        function se(e, t) {
            return t = t || {}, t.recognizers = u(t.recognizers, se.defaults.preset), new le(e, t)
        }

        function le(e, t) {
            this.options = ue({}, se.defaults, t || {}), this.options.inputTarget = this.options.inputTarget || e, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = e, this.input = M(this), this.touchAction = new V(this, this.options.touchAction), de(this, !0), a(this.options.recognizers, function (e) {
                var t = this.add(new e[0](e[1]));
                e[2] && t.recognizeWith(e[2]), e[3] && t.requireFailure(e[3])
            }, this)
        }

        function de(e, t) {
            var n = e.element;
            if (n.style) {
                var i;
                a(e.options.cssProps, function (o, r) {
                    i = I(n.style, r), t ? (e.oldCssProps[i] = n.style[i], n.style[i] = o) : n.style[i] = e.oldCssProps[i] || ""
                }), t || (e.oldCssProps = {})
            }
        }

        function ce(e, n) {
            var i = t.createEvent("Event");
            i.initEvent(e, !0, !0), i.gesture = n, n.target.dispatchEvent(i)
        }

        var ue, pe = ["", "webkit", "Moz", "MS", "ms", "o"], he = t.createElement("div"), fe = "function", ge = Math.round, me = Math.abs, Se = Date.now;
        ue = "function" != typeof Object.assign ? function (e) {
            if (e === i || null === e)throw new TypeError("Cannot convert undefined or null to object");
            for (var t = Object(e), n = 1; n < arguments.length; n++) {
                var o = arguments[n];
                if (o !== i && null !== o)for (var r in o)o.hasOwnProperty(r) && (t[r] = o[r])
            }
            return t
        } : Object.assign;
        var be = s(function (e, t, n) {
            for (var o = Object.keys(t), r = 0; r < o.length;)(!n || n && e[o[r]] === i) && (e[o[r]] = t[o[r]]), r++;
            return e
        }, "extend", "Use `assign`."), ve = s(function (e, t) {
            return be(e, t, !0)
        }, "merge", "Use `assign`."), Ie = 1, ye = /mobile|tablet|ip(ad|hone|od)|android/i, Le = "ontouchstart" in e, Ee = I(e, "PointerEvent") !== i, Me = Le && ye.test(navigator.userAgent), Pe = "touch", Te = "pen", we = "mouse", Be = "kinect", Re = 25, Oe = 1, Ce = 2, xe = 4, Ae = 8, ke = 1, Ne = 2, He = 4, De = 8, Fe = 16, Xe = Ne | He, ze = De | Fe, We = Xe | ze, Ye = ["x", "y"], _e = ["clientX", "clientY"];
        E.prototype = {
            handler: function () {
            }, init: function () {
                this.evEl && p(this.element, this.evEl, this.domHandler), this.evTarget && p(this.target, this.evTarget, this.domHandler), this.evWin && p(L(this.element), this.evWin, this.domHandler)
            }, destroy: function () {
                this.evEl && h(this.element, this.evEl, this.domHandler), this.evTarget && h(this.target, this.evTarget, this.domHandler), this.evWin && h(L(this.element), this.evWin, this.domHandler)
            }
        };
        var Ze = {mousedown: Oe, mousemove: Ce, mouseup: xe}, je = "mousedown", Ue = "mousemove mouseup";
        l(D, E, {
            handler: function (e) {
                var t = Ze[e.type];
                t & Oe && 0 === e.button && (this.pressed = !0), t & Ce && 1 !== e.which && (t = xe), this.pressed && (t & xe && (this.pressed = !1), this.callback(this.manager, t, {
                    pointers: [e],
                    changedPointers: [e],
                    pointerType: we,
                    srcEvent: e
                }))
            }
        });
        var Ve = {pointerdown: Oe, pointermove: Ce, pointerup: xe, pointercancel: Ae, pointerout: Ae}, $e = {
            2: Pe,
            3: Te,
            4: we,
            5: Be
        }, qe = "pointerdown", Ge = "pointermove pointerup pointercancel";
        e.MSPointerEvent && !e.PointerEvent && (qe = "MSPointerDown", Ge = "MSPointerMove MSPointerUp MSPointerCancel"), l(F, E, {
            handler: function (e) {
                var t = this.store, n = !1, i = e.type.toLowerCase().replace("ms", ""), o = Ve[i], r = $e[e.pointerType] || e.pointerType, a = r == Pe, s = S(t, e.pointerId, "pointerId");
                o & Oe && (0 === e.button || a) ? 0 > s && (t.push(e), s = t.length - 1) : o & (xe | Ae) && (n = !0), 0 > s || (t[s] = e, this.callback(this.manager, o, {
                    pointers: t,
                    changedPointers: [e],
                    pointerType: r,
                    srcEvent: e
                }), n && t.splice(s, 1))
            }
        });
        var Ke = {
            touchstart: Oe,
            touchmove: Ce,
            touchend: xe,
            touchcancel: Ae
        }, Qe = "touchstart", Je = "touchstart touchmove touchend touchcancel";
        l(X, E, {
            handler: function (e) {
                var t = Ke[e.type];
                if (t === Oe && (this.started = !0), this.started) {
                    var n = z.call(this, e, t);
                    t & (xe | Ae) && n[0].length - n[1].length === 0 && (this.started = !1), this.callback(this.manager, t, {
                        pointers: n[0],
                        changedPointers: n[1],
                        pointerType: Pe,
                        srcEvent: e
                    })
                }
            }
        });
        var et = {
            touchstart: Oe,
            touchmove: Ce,
            touchend: xe,
            touchcancel: Ae
        }, tt = "touchstart touchmove touchend touchcancel";
        l(W, E, {
            handler: function (e) {
                var t = et[e.type], n = Y.call(this, e, t);
                n && this.callback(this.manager, t, {
                    pointers: n[0],
                    changedPointers: n[1],
                    pointerType: Pe,
                    srcEvent: e
                })
            }
        });
        var nt = 2500, it = 25;
        l(_, E, {
            handler: function (e, t, n) {
                var i = n.pointerType == Pe, o = n.pointerType == we;
                if (!(o && n.sourceCapabilities && n.sourceCapabilities.firesTouchEvents)) {
                    if (i)Z.call(this, t, n); else if (o && U.call(this, n))return;
                    this.callback(e, t, n)
                }
            }, destroy: function () {
                this.touch.destroy(), this.mouse.destroy()
            }
        });
        var ot = I(he.style, "touchAction"), rt = ot !== i, at = "compute", st = "auto", lt = "manipulation", dt = "none", ct = "pan-x", ut = "pan-y", pt = q();
        V.prototype = {
            set: function (e) {
                e == at && (e = this.compute()), rt && this.manager.element.style && pt[e] && (this.manager.element.style[ot] = e), this.actions = e.toLowerCase().trim()
            }, update: function () {
                this.set(this.manager.options.touchAction)
            }, compute: function () {
                var e = [];
                return a(this.manager.recognizers, function (t) {
                    c(t.options.enable, [t]) && (e = e.concat(t.getTouchAction()))
                }), $(e.join(" "))
            }, preventDefaults: function (e) {
                var t = e.srcEvent, n = e.offsetDirection;
                if (this.manager.session.prevented)return void t.preventDefault();
                var i = this.actions, o = g(i, dt) && !pt[dt], r = g(i, ut) && !pt[ut], a = g(i, ct) && !pt[ct];
                if (o) {
                    var s = 1 === e.pointers.length, l = e.distance < 2, d = e.deltaTime < 250;
                    if (s && l && d)return
                }
                return a && r ? void 0 : o || r && n & Xe || a && n & ze ? this.preventSrc(t) : void 0
            }, preventSrc: function (e) {
                this.manager.session.prevented = !0, e.preventDefault()
            }
        };
        var ht = 1, ft = 2, gt = 4, mt = 8, St = mt, bt = 16, vt = 32;
        G.prototype = {
            defaults: {}, set: function (e) {
                return ue(this.options, e), this.manager && this.manager.touchAction.update(), this
            }, recognizeWith: function (e) {
                if (r(e, "recognizeWith", this))return this;
                var t = this.simultaneous;
                return e = J(e, this), t[e.id] || (t[e.id] = e, e.recognizeWith(this)), this
            }, dropRecognizeWith: function (e) {
                return r(e, "dropRecognizeWith", this) ? this : (e = J(e, this), delete this.simultaneous[e.id], this)
            }, requireFailure: function (e) {
                if (r(e, "requireFailure", this))return this;
                var t = this.requireFail;
                return e = J(e, this), -1 === S(t, e) && (t.push(e), e.requireFailure(this)), this
            }, dropRequireFailure: function (e) {
                if (r(e, "dropRequireFailure", this))return this;
                e = J(e, this);
                var t = S(this.requireFail, e);
                return t > -1 && this.requireFail.splice(t, 1), this
            }, hasRequireFailures: function () {
                return this.requireFail.length > 0
            }, canRecognizeWith: function (e) {
                return !!this.simultaneous[e.id]
            }, emit: function (e) {
                function t(t) {
                    n.manager.emit(t, e)
                }

                var n = this, i = this.state;
                mt > i && t(n.options.event + K(i)), t(n.options.event), e.additionalEvent && t(e.additionalEvent), i >= mt && t(n.options.event + K(i))
            }, tryEmit: function (e) {
                return this.canEmit() ? this.emit(e) : void(this.state = vt)
            }, canEmit: function () {
                for (var e = 0; e < this.requireFail.length;) {
                    if (!(this.requireFail[e].state & (vt | ht)))return !1;
                    e++
                }
                return !0
            }, recognize: function (e) {
                var t = ue({}, e);
                return c(this.options.enable, [this, t]) ? (this.state & (St | bt | vt) && (this.state = ht), this.state = this.process(t), void(this.state & (ft | gt | mt | bt) && this.tryEmit(t))) : (this.reset(), void(this.state = vt))
            }, process: function (e) {
            }, getTouchAction: function () {
            }, reset: function () {
            }
        }, l(ee, G, {
            defaults: {pointers: 1}, attrTest: function (e) {
                var t = this.options.pointers;
                return 0 === t || e.pointers.length === t
            }, process: function (e) {
                var t = this.state, n = e.eventType, i = t & (ft | gt), o = this.attrTest(e);
                return i && (n & Ae || !o) ? t | bt : i || o ? n & xe ? t | mt : t & ft ? t | gt : ft : vt
            }
        }), l(te, ee, {
            defaults: {event: "pan", threshold: 10, pointers: 1, direction: We},
            getTouchAction: function () {
                var e = this.options.direction, t = [];
                return e & Xe && t.push(ut), e & ze && t.push(ct), t
            },
            directionTest: function (e) {
                var t = this.options, n = !0, i = e.distance, o = e.direction, r = e.deltaX, a = e.deltaY;
                return o & t.direction || (t.direction & Xe ? (o = 0 === r ? ke : 0 > r ? Ne : He, n = r != this.pX, i = Math.abs(e.deltaX)) : (o = 0 === a ? ke : 0 > a ? De : Fe, n = a != this.pY, i = Math.abs(e.deltaY))), e.direction = o, n && i > t.threshold && o & t.direction
            },
            attrTest: function (e) {
                return ee.prototype.attrTest.call(this, e) && (this.state & ft || !(this.state & ft) && this.directionTest(e))
            },
            emit: function (e) {
                this.pX = e.deltaX, this.pY = e.deltaY;
                var t = Q(e.direction);
                t && (e.additionalEvent = this.options.event + t), this._super.emit.call(this, e)
            }
        }), l(ne, ee, {
            defaults: {event: "pinch", threshold: 0, pointers: 2}, getTouchAction: function () {
                return [dt]
            }, attrTest: function (e) {
                return this._super.attrTest.call(this, e) && (Math.abs(e.scale - 1) > this.options.threshold || this.state & ft)
            }, emit: function (e) {
                if (1 !== e.scale) {
                    var t = e.scale < 1 ? "in" : "out";
                    e.additionalEvent = this.options.event + t
                }
                this._super.emit.call(this, e)
            }
        }), l(ie, G, {
            defaults: {event: "press", pointers: 1, time: 251, threshold: 9}, getTouchAction: function () {
                return [st]
            }, process: function (e) {
                var t = this.options, n = e.pointers.length === t.pointers, i = e.distance < t.threshold, r = e.deltaTime > t.time;
                if (this._input = e, !i || !n || e.eventType & (xe | Ae) && !r)this.reset(); else if (e.eventType & Oe)this.reset(), this._timer = o(function () {
                    this.state = St, this.tryEmit()
                }, t.time, this); else if (e.eventType & xe)return St;
                return vt
            }, reset: function () {
                clearTimeout(this._timer)
            }, emit: function (e) {
                this.state === St && (e && e.eventType & xe ? this.manager.emit(this.options.event + "up", e) : (this._input.timeStamp = Se(), this.manager.emit(this.options.event, this._input)))
            }
        }), l(oe, ee, {
            defaults: {event: "rotate", threshold: 0, pointers: 2}, getTouchAction: function () {
                return [dt]
            }, attrTest: function (e) {
                return this._super.attrTest.call(this, e) && (Math.abs(e.rotation) > this.options.threshold || this.state & ft)
            }
        }), l(re, ee, {
            defaults: {event: "swipe", threshold: 10, velocity: .3, direction: Xe | ze, pointers: 1},
            getTouchAction: function () {
                return te.prototype.getTouchAction.call(this)
            },
            attrTest: function (e) {
                var t, n = this.options.direction;
                return n & (Xe | ze) ? t = e.overallVelocity : n & Xe ? t = e.overallVelocityX : n & ze && (t = e.overallVelocityY), this._super.attrTest.call(this, e) && n & e.offsetDirection && e.distance > this.options.threshold && e.maxPointers == this.options.pointers && me(t) > this.options.velocity && e.eventType & xe
            },
            emit: function (e) {
                var t = Q(e.offsetDirection);
                t && this.manager.emit(this.options.event + t, e), this.manager.emit(this.options.event, e)
            }
        }), l(ae, G, {
            defaults: {
                event: "tap",
                pointers: 1,
                taps: 1,
                interval: 300,
                time: 250,
                threshold: 9,
                posThreshold: 10
            }, getTouchAction: function () {
                return [lt]
            }, process: function (e) {
                var t = this.options, n = e.pointers.length === t.pointers, i = e.distance < t.threshold, r = e.deltaTime < t.time;
                if (this.reset(), e.eventType & Oe && 0 === this.count)return this.failTimeout();
                if (i && r && n) {
                    if (e.eventType != xe)return this.failTimeout();
                    var a = this.pTime ? e.timeStamp - this.pTime < t.interval : !0, s = !this.pCenter || A(this.pCenter, e.center) < t.posThreshold;
                    this.pTime = e.timeStamp, this.pCenter = e.center, s && a ? this.count += 1 : this.count = 1, this._input = e;
                    var l = this.count % t.taps;
                    if (0 === l)return this.hasRequireFailures() ? (this._timer = o(function () {
                        this.state = St, this.tryEmit()
                    }, t.interval, this), ft) : St
                }
                return vt
            }, failTimeout: function () {
                return this._timer = o(function () {
                    this.state = vt
                }, this.options.interval, this), vt
            }, reset: function () {
                clearTimeout(this._timer)
            }, emit: function () {
                this.state == St && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
            }
        }), se.VERSION = "2.0.7", se.defaults = {
            domEvents: !1,
            touchAction: at,
            enable: !0,
            inputTarget: null,
            inputClass: null,
            preset: [[oe, {enable: !1}], [ne, {enable: !1}, ["rotate"]], [re, {direction: Xe}], [te, {direction: Xe}, ["swipe"]], [ae], [ae, {
                event: "doubletap",
                taps: 2
            }, ["tap"]], [ie]],
            cssProps: {
                userSelect: "none",
                touchSelect: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };
        var It = 1, yt = 2;
        le.prototype = {
            set: function (e) {
                return ue(this.options, e), e.touchAction && this.touchAction.update(), e.inputTarget && (this.input.destroy(), this.input.target = e.inputTarget, this.input.init()), this
            }, stop: function (e) {
                this.session.stopped = e ? yt : It
            }, recognize: function (e) {
                var t = this.session;
                if (!t.stopped) {
                    this.touchAction.preventDefaults(e);
                    var n, i = this.recognizers, o = t.curRecognizer;
                    (!o || o && o.state & St) && (o = t.curRecognizer = null);
                    for (var r = 0; r < i.length;)n = i[r], t.stopped === yt || o && n != o && !n.canRecognizeWith(o) ? n.reset() : n.recognize(e), !o && n.state & (ft | gt | mt) && (o = t.curRecognizer = n), r++
                }
            }, get: function (e) {
                if (e instanceof G)return e;
                for (var t = this.recognizers, n = 0; n < t.length; n++)if (t[n].options.event == e)return t[n];
                return null
            }, add: function (e) {
                if (r(e, "add", this))return this;
                var t = this.get(e.options.event);
                return t && this.remove(t), this.recognizers.push(e), e.manager = this, this.touchAction.update(), e
            }, remove: function (e) {
                if (r(e, "remove", this))return this;
                if (e = this.get(e)) {
                    var t = this.recognizers, n = S(t, e);
                    -1 !== n && (t.splice(n, 1), this.touchAction.update())
                }
                return this
            }, on: function (e, t) {
                if (e !== i && t !== i) {
                    var n = this.handlers;
                    return a(m(e), function (e) {
                        n[e] = n[e] || [], n[e].push(t)
                    }), this
                }
            }, off: function (e, t) {
                if (e !== i) {
                    var n = this.handlers;
                    return a(m(e), function (e) {
                        t ? n[e] && n[e].splice(S(n[e], t), 1) : delete n[e]
                    }), this
                }
            }, emit: function (e, t) {
                this.options.domEvents && ce(e, t);
                var n = this.handlers[e] && this.handlers[e].slice();
                if (n && n.length) {
                    t.type = e, t.preventDefault = function () {
                        t.srcEvent.preventDefault()
                    };
                    for (var i = 0; i < n.length;)n[i](t), i++
                }
            }, destroy: function () {
                this.element && de(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
            }
        }, ue(se, {
            INPUT_START: Oe,
            INPUT_MOVE: Ce,
            INPUT_END: xe,
            INPUT_CANCEL: Ae,
            STATE_POSSIBLE: ht,
            STATE_BEGAN: ft,
            STATE_CHANGED: gt,
            STATE_ENDED: mt,
            STATE_RECOGNIZED: St,
            STATE_CANCELLED: bt,
            STATE_FAILED: vt,
            DIRECTION_NONE: ke,
            DIRECTION_LEFT: Ne,
            DIRECTION_RIGHT: He,
            DIRECTION_UP: De,
            DIRECTION_DOWN: Fe,
            DIRECTION_HORIZONTAL: Xe,
            DIRECTION_VERTICAL: ze,
            DIRECTION_ALL: We,
            Manager: le,
            Input: E,
            TouchAction: V,
            TouchInput: W,
            MouseInput: D,
            PointerEventInput: F,
            TouchMouseInput: _,
            SingleTouchInput: X,
            Recognizer: G,
            AttrRecognizer: ee,
            Tap: ae,
            Pan: te,
            Swipe: re,
            Pinch: ne,
            Rotate: oe,
            Press: ie,
            on: p,
            off: h,
            each: a,
            merge: ve,
            extend: be,
            assign: ue,
            inherit: l,
            bindFn: d,
            prefixed: I
        });
        var Lt = "undefined" != typeof e ? e : "undefined" != typeof self ? self : {};
        Lt.Hammer = se, "function" == typeof define && define.amd ? define(function () {
            return se
        }) : "undefined" != typeof module && module.exports ? module.exports = se : e[n] = se
    }(window, document, "Hammer"), function (e, t) {
    "function" == typeof define ? define(t) : "undefined" != typeof module ? module.exports = t : this[e] = t
}("easing", {
    easeInQuad: function (e) {
        return Math.pow(e, 2)
    }, easeOutQuad: function (e) {
        return -(Math.pow(e - 1, 2) - 1)
    }, easeInOutQuad: function (e) {
        return (e /= .5) < 1 ? .5 * Math.pow(e, 2) : -.5 * ((e -= 2) * e - 2)
    }, easeInCubic: function (e) {
        return Math.pow(e, 3)
    }, easeOutCubic: function (e) {
        return Math.pow(e - 1, 3) + 1
    }, easeInOutCubic: function (e) {
        return (e /= .5) < 1 ? .5 * Math.pow(e, 3) : .5 * (Math.pow(e - 2, 3) + 2)
    }, easeInQuart: function (e) {
        return Math.pow(e, 4)
    }, easeOutQuart: function (e) {
        return -(Math.pow(e - 1, 4) - 1)
    }, easeInOutQuart: function (e) {
        return (e /= .5) < 1 ? .5 * Math.pow(e, 4) : -.5 * ((e -= 2) * Math.pow(e, 3) - 2)
    }, easeInQuint: function (e) {
        return Math.pow(e, 5)
    }, easeOutQuint: function (e) {
        return Math.pow(e - 1, 5) + 1
    }, easeInOutQuint: function (e) {
        return (e /= .5) < 1 ? .5 * Math.pow(e, 5) : .5 * (Math.pow(e - 2, 5) + 2)
    }, easeInSine: function (e) {
        return -Math.cos(e * (Math.PI / 2)) + 1
    }, easeOutSine: function (e) {
        return Math.sin(e * (Math.PI / 2))
    }, easeInOutSine: function (e) {
        return -.5 * (Math.cos(Math.PI * e) - 1)
    }, easeInExpo: function (e) {
        return 0 === e ? 0 : Math.pow(2, 10 * (e - 1))
    }, easeOutExpo: function (e) {
        return 1 === e ? 1 : -Math.pow(2, -10 * e) + 1
    }, easeInOutExpo: function (e) {
        return 0 === e ? 0 : 1 === e ? 1 : (e /= .5) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (-Math.pow(2, -10 * --e) + 2)
    }, easeInCirc: function (e) {
        return -(Math.sqrt(1 - e * e) - 1)
    }, easeOutCirc: function (e) {
        return Math.sqrt(1 - Math.pow(e - 1, 2))
    }, easeInOutCirc: function (e) {
        return (e /= .5) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
    }, easeOutBounce: function (e) {
        return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
    }, easeInBack: function (e) {
        var t = 1.70158;
        return e * e * ((t + 1) * e - t)
    }, easeOutBack: function (e) {
        var t = 1.70158;
        return (e -= 1) * e * ((t + 1) * e + t) + 1
    }, easeInOutBack: function (e) {
        var t = 1.70158;
        return (e /= .5) < 1 ? .5 * e * e * (((t *= 1.525) + 1) * e - t) : .5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2)
    }, elastic: function (e) {
        return -1 * Math.pow(4, -8 * e) * Math.sin(2 * (6 * e - 1) * Math.PI / 2) + 1
    }, swingFromTo: function (e) {
        var t = 1.70158;
        return (e /= .5) < 1 ? .5 * e * e * (((t *= 1.525) + 1) * e - t) : .5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2)
    }, swingFrom: function (e) {
        var t = 1.70158;
        return e * e * ((t + 1) * e - t)
    }, swingTo: function (e) {
        var t = 1.70158;
        return (e -= 1) * e * ((t + 1) * e + t) + 1
    }, bounce: function (e) {
        return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
    }, bouncePast: function (e) {
        return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
    }, easeFromTo: function (e) {
        return (e /= .5) < 1 ? .5 * Math.pow(e, 4) : -.5 * ((e -= 2) * Math.pow(e, 3) - 2)
    }, easeFrom: function (e) {
        return Math.pow(e, 4)
    }, easeTo: function (e) {
        return Math.pow(e, .25)
    }
}), /*!
 *
 * # sML JavaScript Library
 *
 * - "I'm a Simple and Middling Library."
 * - Copyright (c) Satoru MATSUSHIMA - https://github.com/satorumurmur/sML
 * - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 *
 */
    sML = function () {
        var e = "0.999.38", t = 201605261222, n = function (e) {
            var t = "string" == typeof e ? [n.create.apply(this, arguments)] : e.length ? e : [e];
            if (window.__proto__)t.__proto__ = n.SML; else for (var i in n.SML)t[i] = n.SML[i];
            return t
        };
        n.Version = e, n.Build = t;
        var i = navigator.userAgent, o = function (e) {
            var t = parseFloat(i.replace(new RegExp("^.*" + e + "[ :\\/]?(\\d+([\\._]\\d+)?).*$"), "$1").replace(/_/g, "."));
            return isNaN(t) ? void 0 : t
        };
        return n.OperatingSystem = n.OS = function (e) {
            return /iPhone OS \d/.test(i) ? e.iOS = o("iPhone OS") : /OS X 10[\._]\d/.test(i) ? e.OSX = o("OS X 10[\\._]") : /Windows Phone( OS)? \d/.test(i) ? e.WindowsPhone = o("Windows Phone OS") || o("Windows Phone") : /Windows( NT)? \d/.test(i) ? e.Windows = o("Windows NT") || o("Windows") : /Android \d/.test(i) ? e.Android = o("Android") : /CrOS/.test(i) ? e.Chrome = !0 : /X11;/.test(i) ? e.Linux = !0 : /Firefox/.test(i) && (e.Firefox = !0), e
        }({}), n.UserAgent = n.UA = function (e) {
            /Gecko\/\d/.test(i) ? (e.Gecko = o("rv"), /Firefox\/\d/.test(i) && (e.Firefox = o("Firefox"))) : /Edge\/\d/.test(i) ? e.Edge = o("Edge") : /Chrome\/\d/.test(i) ? (e.Blink = o("Chrome") || !0, /OPR\/\d/.test(i) ? e.Opera = o("OPR") : /Silk\/\d/.test(i) ? e.Silk = o("Silk") : e.Chrome = e.Blink) : /AppleWebKit\/\d/.test(i) ? (e.WebKit = o("AppleWebKit"), /CriOS \d/.test(i) ? e.Chrome = o("CriOS") : /FxiOS \d/.test(i) ? e.Firefox = o("FxiOS") : /Version\/\d/.test(i) && (e.Safari = o("Version"))) : /Trident\/\d/.test(i) && (e.Trident = o("Trident"), e.InternetExplorer = o("rv") || o("MSIE"));
            try {
                e.Flash = parseFloat(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin.description.replace(/^.+?([\d\.]+).*$/, "$1"))
            } catch (t) {
            }
            return e
        }({}), n.Environments = n.Env = function (e) {
            return ["OS", "UA"].forEach(function (t) {
                for (var i in n[t])"Flash" != i && n[t][i] && e.push(i)
            }), e
        }([]), n.log = function () {
            try {
                console.log.apply(console, arguments)
            } catch (e) {
            }
        }, n.write = function () {
            document.open();
            for (var e = 0, t = arguments.length; t > e; e++)document.write(arguments[e]);
            document.close()
        }, n.Fill = {
            Prefixes: ["webkit", "moz", "MS", "ms", "o"], carePrefix: function (e, t) {
                if (t in e)return e[t];
                t = t[0].toUpperCase() + t.slice(1);
                for (var n = "", i = 0, o = this.Prefixes.length; o > i; i++)if (n = this.Prefixes[i] + t, n in e)return e[n]
            }
        }, n.UA.InternetExplorer <= 9 && ("undefined" == typeof window.console && (window.console = {}), "function" != typeof window.console.log && (window.console.log = function () {
        })), window.requestAnimationFrame = n.Fill.carePrefix(window, "requestAnimationFrame") || function (e) {
                setTimeout(e, 1e3 / 60)
            }, (!window.CustomEvent || "function" != typeof window.CustomEvent && -1 === window.CustomEvent.toString().indexOf("CustomEventConstructor")) && (window.CustomEvent = function (e, t) {
            t = t || {bubbles: !1, cancelable: !1, detail: void 0};
            var n = document.createEvent("CustomEvent");
            return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
        }, window.CustomEvent.prototype = window.Event.prototype), n.Event = {
            add: function (e, t) {
                for (var n in t)e.addEventListener(n, t[n], !1);
                return e
            },
            remove: function (e, t) {
                for (var n in t)e.removeEventListener(n, t[n]);
                return e
            },
            preventDefault: function (e) {
                e.preventDefault()
            },
            stopPropagation: function (e) {
                e.stopPropagation()
            },
            observeTouch: function (e, t) {/*! sML.Event.observeTouch requires: "Hammer.js" - http://hammerjs.github.io/ - Copyright (c) Jorik Tangelder - Licensed under the MIT license. */
                if (e.TouchEventObserver)return e;
                if (!window.Hammer)return n.edit(e, {
                    addTouchEventListener: function () {
                        return e
                    }, removeTouchEventListener: function () {
                        return e
                    }
                });
                var i = new Hammer.Manager(e);
                return t && !t.Pan || i.add(new Hammer.Pan({
                    threshold: 0,
                    pointers: 0
                })), t && !t.Swipe || i.add(new Hammer.Swipe).recognizeWith(i.get("pan")), t && !t.Rotate || i.add(new Hammer.Rotate({threshold: 0})).recognizeWith(i.get("pan")), t && !t.Pinch || i.add(new Hammer.Pinch({threshold: 0})).recognizeWith([i.get("pan"), i.get("rotate")]), t && !t.DoubleTap || i.add(new Hammer.Tap({
                    event: "doubletap",
                    taps: 2
                })), t && !t.Tap || i.add(new Hammer.Tap), n.edit(e, {
                    TouchEventObserver: i,
                    TouchEventHandlers: [],
                    addTouchEventListener: function (t, n) {
                        var i = function (t) {
                            n.apply(e, [t.srcEvent, t])
                        };
                        return e.TouchEventHandlers.push([n, i]), e.TouchEventObserver.on(t, i), e
                    },
                    removeTouchEventListener: function (t, n) {
                        if (n && "function" == typeof n) {
                            for (var i = [], o = 0, r = e.TouchEventHandlers.length; r > o; o++)e.TouchEventHandlers[o][0] == n ? e.TouchEventObserver.off(t, e.TouchEventHandlers[o][1]) : i.push(e.TouchEventHandlers[o]);
                            e.TouchEventHandlers = i
                        } else e.TouchEventObserver.off(t);
                        return e
                    },
                    removeTouchEventObserver: function () {
                        return e.TouchEventObserver.destroy(), delete e.TouchEventObserver, delete e.TouchEventHandlers, delete e.addTouchEventListener, delete e.removeTouchEventListener, delete e.removeTouchEventObserver, e
                    }
                })
            },
            unobserveTouch: function (e) {
                return e.TouchEventObserver ? e.removeTouchEventObserver() : e
            },
            OnResizeFont: {
                RegularFunctions: [],
                onZoomInFunctions: [],
                onZoomOutFunctions: [],
                addEventListener: function (e, t) {
                    t && t > 0 ? this.onZoomInFunctions.push(e) : t && 0 > t ? this.onZoomOutFunctions.push(e) : this.RegularFunctions.push(e)
                },
                detect: function (e, t) {
                    if (!e)var e = document.body;
                    if (!t)var t = 200;
                    this.checker = e, this.timer = setInterval(function () {
                        var e = n.Coord.getElementSize(n.onResizeFont.checker).h;
                        if (n.onResizeFont.prevHeight && n.onResizeFont.prevHeight != e) {
                            var t = n.onResizeFont.RegularFunctions;
                            n.onResizeFont.prevHeight && n.onResizeFont.prevHeight < e ? t = t.concat(n.onResizeFont.onZoomInFunctions) : n.onResizeFont.prevHeight && n.onResizeFont.prevHeight > e && (t = t.concat(n.onResizeFont.onZoomOutFunctions));
                            for (var i = 0, o = t.length; o > i; i++)t[i]()
                        }
                        n.onResizeFont.prevHeight = e
                    }, t)
                },
                stopDetect: function () {
                    this.timer && clearTimeout(this.timer)
                }
            }
        }, n.addEventListener = n.Event.add, n.removeEventListener = n.Event.remove, n.observeTouch = n.Event.observeTouch, n.unobserveTouch = n.Event.unobserveTouch, n.Timers = {
            setTimeout: function () {
                var e = Array.prototype.shift.call(arguments), t = Array.prototype.shift.call(arguments);
                return Array.prototype.unshift.call(arguments, e), Array.prototype.unshift.call(arguments, t), setTimeout.apply(window, arguments)
            }, setInterval: function () {
                var e = Array.prototype.shift.call(arguments), t = Array.prototype.shift.call(arguments);
                return Array.prototype.unshift.call(arguments, e), Array.prototype.unshift.call(arguments, t), setInterval.apply(window, arguments)
            }
        }, n.setTimeout = n.Timers.setTimeout, n.setInterval = n.Timers.setInterval, n.Drawer = {
            draw: function (e, t) {
                e.ToBeDrawn || (requestAnimationFrame(function () {
                    t.apply(e, arguments), e.ToBeDrawn = !1
                }), e.ToBeDrawn = !0)
            }
        }, n.draw = n.Drawer.draw, n.set = n.edit = function (e, t, i) {
            for (var o in t)"on" != o && "extraHTML" != o && (/^data-/.test(o) ? e.setAttribute(o, t[o]) : e[o] = t[o]);
            return t && (t.extraHTML && (e.innerHTML = e.innerHTML + t.extraHTML), t.on && n.Event.add(e, t.on), i && n.CSS.set(e, i)), e
        }, n.create = function (e, t, i) {
            return n.set(document.createElement(e), t, i)
        }, n.changeClass = n.changeClassName = function (e, t) {
            return t ? e.className = t : e.removeAttribute("class"), e.className
        }, n.addClass = n.addClassName = function (e, t) {
            if ("string" != typeof t)return e.className;
            if (t = t.trim().replace(/ +/g, " "), !t)return e.className;
            if (e.className) {
                if ((" " + e.className + " ").indexOf(" " + t + " ") > -1)return e.className;
                t = e.className + " " + t
            }
            return n.changeClass(e, t)
        }, n.removeClass = n.removeClassName = function (e, t) {
            return e.className ? "string" != typeof t ? e.className : (t = t.trim().replace(/ +/g, " ")) ? (" " + e.className + " ").indexOf(" " + t + " ") < 0 ? e.className : (t = (" " + e.className + " ").replace(" " + t + " ", " ").trim().replace(/ +/g, " "), n.changeClass(e, t)) : e.className : ""
        }, n.replaceClass = n.replaceClassName = function (e, t, i) {
            return n.removeClass(e, t), n.addClass(e, i)
        }, n.appendChildren = function (e, t) {
            t.length || (t = [t]);
            for (var n = 0, i = t.length; i > n; n++)e.appendChild(t[n]);
            return t
        }, n.deleteElement = function (e) {
            e.parentNode && e.parentNode.removeChild(e), e.innerHTML = "", e = null, delete e
        }, n.hatch = function () {
            for (var e = "", t = 0, n = arguments.length; n > t; t++)e += arguments[t];
            var i = document.createElement("div"), o = document.createDocumentFragment();
            i.innerHTML = e;
            for (var t = 0, n = i.childNodes.length; n > t; t++)o.appendChild(i.firstChild);
            return o
        }, n.cloneObject = function (e) {
            var t = function () {
            };
            return t.prototype = e, new t
        }, n.CSS = {
            Prefix: n.UA.WebKit || n.UA.Blink ? "Webkit" : n.UA.Gecko ? "Moz" : n.UA.Trident ? "ms" : "",
            TransitionEnd: n.UA.WebKit || n.UA.Blink ? "webkitTransitionEnd" : n.UA.Gecko ? "transitionend" : n.UA.Trident ? "MSTransitionEnd" : "",
            AnimationEnd: n.UA.WebKit || n.UA.Blink ? "webkitAnimationEnd" : n.UA.Gecko ? "animationend" : n.UA.Trident ? "MSAnimationEnd" : "",
            Catalogue: [],
            getSFO: function (e) {
                for (var t = 0, n = this.Catalogue.length; n > t; t++)if (this.Catalogue[t].Element == e)return this.Catalogue[t];
                return this.Catalogue[this.Catalogue.push({Element: e}) - 1]
            },
            getComputedStyle: function (e, t) {
                var n = e.currentStyle || document.defaultView.getComputedStyle(e, t ? t : "");
                return n
            },
            StyleSheets: [],
            getStyleSheet: function (e) {
                for (var t = 0, n = this.StyleSheets.length; n > t; t++)if (this.StyleSheets[t].StyleFor == e)return this.StyleSheets[t].StyleSheet;
                var i = e.createElement("style");
                return i.appendChild(e.createTextNode("")), e.getElementsByTagName("head")[0].appendChild(i), this.StyleSheets.push({
                    StyleFor: e,
                    StyleSheet: i.sheet
                }), i.sheet
            },
            appendRule: function (e, t, n) {
                if ("function" == typeof t.join)t = t.join(" "); else if ("object" == typeof t) {
                    var i = [];
                    for (var o in t)i.push(o.trim() + ": " + t[o].replace(/;?\s*$/, "").trim() + ";");
                    t = i.join(" ")
                }
                var r = this.getStyleSheet(n ? n : document);
                return r ? r.insertRule(e + "{" + t + "}", r.cssRules.length) : null
            },
            deleteRule: function (e, t) {
                var n = this.getStyleSheet(t ? t : document);
                return n ? n.deleteRule(e) : void 0
            },
            setProperty: function (e, t, n) {
                return e && t ? (/^(animation|background(-s|S)ize|box|break|column|filter|flow|hyphens|region|shape|transform|transition|writing)/.test(t) ? e.style[this.Prefix + t.replace(/(-|^)([a-z])/g, function (e, t, n) {
                    return n ? n.toUpperCase() : ""
                })] = n : "float" == t && (t = "cssFloat"), e.style[t] = n, e) : e
            },
            addTransitionEndListener: function (e, t) {
                "function" == typeof t && (e.sMLTransitionEndListener = t, e.addEventListener(this.TransitionEnd, e.sMLTransitionEndListener))
            },
            removeTransitionEndListener: function (e) {
                "function" == typeof e.sMLTransitionEndListener && (e.removeEventListener(this.TransitionEnd, e.sMLTransitionEndListener), delete e.sMLTransitionEndListener)
            },
            set: function (e, t, n) {
                if (!e || "object" != typeof t)return e;
                if (this.removeTransitionEndListener(e), "function" == typeof n && (this.removeTransitionEndListener(e), this.addTransitionEndListener(e, n)), t instanceof Array)t.forEach(function (t) {
                    t = t.split(":");
                    var n = t.shift().trim(), i = t.join("").replace(/;\s*$/, "").trim();
                    this.setProperty(e, n, i)
                }); else {
                    for (var i in t)/^transition/.test(i) && (this.setProperty(e, i, t[i]), delete t[i]);
                    for (var i in t)this.setProperty(e, i, t[i])
                }
                return e
            },
            getRGB: function (e) {
                for (var t = e.replace(/rgb\(([\d\., ]+)\)/, "$1").replace(/\s/g, "").split(","), n = 0, i = t.length; i > n; n++)t[n] = parseInt(t[n]);
                return t
            },
            getRGBA: function (e) {
                for (var t = e.replace(/rgba?\(([\d\., ]+)\)/, "$1").replace(/\s/g, "").split(","), n = 0, i = t.length; i > n; n++)t[n] = parseInt(t[n]);
                return t[3] || (t[3] = 1), t
            }
        }, n.style = n.css = function (e, t, i) {
            return n.CSS.set(e, t, i)
        }, n.appendStyleRule = n.appendCSSRule = function (e, t, i) {
            return n.CSS.appendRule(e, t, i)
        }, n.deleteStyleRule = n.deleteCSSRule = function (e, t) {
            return n.CSS.deleteRule(e, t)
        }, n.Easing = "object" == typeof window.easing ? window.easing : {}, n.Easing.linear = function (e) {
            return e
        }, n.Easing.getEaser = function (e) {
            return function (t) {
                return t + e / 100 * (1 - t) * t
            }
        }, n.Transition = {
            set: function (e, t) {
                return t || (t = {}), e.sMLTransition && clearTimeout(e.sMLTransition.Timer), e.sMLTransition = {
                    Element: e,
                    CurrentFrame: 0,
                    Frames: t.Frames ? t.Frams : 10,
                    TimePerFrame: t.TimePerFrame ? t.TimePerFrame : 10,
                    Easing: t.Easing ? t.Easing : void 0,
                    EasingX: t.EasingX ? t.EasingX : void 0,
                    before: "function" == typeof t.before ? t.before : void 0,
                    among: "function" == typeof t.among ? t.among : void 0,
                    after: "function" == typeof t.after ? t.after : void 0,
                    callback: "function" == typeof t.callback ? t.callback : void 0,
                    getNext: function (e, t, n, i) {
                        var o = 1, r = this.CurrentFrame / this.Frames;
                        if (!n && this.Easing)var n = this.Easing;
                        if (!i && this.EasingX)var i = this.EasingX;
                        return o = n ? 0 == i ? r + n / (100 * Math.PI) * Math.sin(Math.PI * r) : i ? (100 + i * n) * r / (2 * i * n * r + 100 - i * n) : r + n / 100 * (1 - r) * r : r, e + (t - e) * o
                    },
                    getNextColor: function (e, t, n, i) {
                        3 == e.length && 4 == t.length ? e[3] = 1 : 4 == e.length && 3 == t.length && (t[3] = 1);
                        for (var o = [], r = 0, a = e.length; a > r; r++)o[r] = Math.round(this.getNext(e[r], t[r]));
                        return o
                    },
                    begin: function () {
                        this.before && this.before.call(e, e.sMLTransition), function () {
                            this.CurrentFrame++ != this.Frames ? (this.among && this.among.call(e, e.sMLTransition), this.Timer = setTimeout(arguments.callee, this.TimePerFrame)) : (this.after && this.after.call(e, e.sMLTransition), this.callback && this.callback.call(e, e.sMLTransition))
                        }()
                    }
                }, e.sMLTransition
            }
        }, n.transition = function (e, t) {
            n.Transition.set(e, t).begin()
        }, n.Coord = {
            getXY: function (e, t) {
                return {X: e, x: e, Y: t, y: t}
            }, getWH: function (e, t) {
                return {Width: e, width: e, W: e, w: e, Height: t, height: t, H: t, h: t}
            }, getXYTRBLCMWH: function (e, t, n, i, o, r, a, s, l, d) {
                return {
                    X: e,
                    x: e,
                    Y: t,
                    y: t,
                    Top: n,
                    top: n,
                    T: n,
                    t: n,
                    Right: i,
                    right: i,
                    R: i,
                    r: i,
                    Bottom: o,
                    bottom: o,
                    B: o,
                    b: o,
                    Left: r,
                    left: r,
                    L: r,
                    l: r,
                    Center: a,
                    center: a,
                    C: a,
                    c: a,
                    Middle: s,
                    middle: s,
                    M: s,
                    m: s,
                    Width: l,
                    width: l,
                    W: l,
                    w: l,
                    Height: d,
                    height: d,
                    H: d,
                    h: d
                }
            }, getScreenSize: function () {
                return this.getWH(screen.availWidth, screen.availHeight)
            }, getScrollSize: function (e) {
                return e && e != window && e != document || (e = document.documentElement), this.getWH(e.scrollWidth, e.scrollHeight)
            }, getOffsetSize: function (e) {
                return e && e != window || (e = document.documentElement), e == document ? this.getScrollSize(document.documentElement) : this.getWH(e.offsetWidth, e.offsetHeight)
            }, getClientSize: function (e) {
                return e && e != window || (e = document.documentElement), e == document ? this.getScrollSize(document.documentElement) : this.getWH(e.clientWidth, e.clientHeight)
            }, getDocumentSize: function () {
                return this.getScrollSize(document.documentElement)
            }, getWindowSize: function () {
                return this.getOffsetSize(document.documentElement)
            }, getElementSize: function (e) {
                return this.getOffsetSize(e)
            }, getWindowCoord: function (e) {
                return this.getXY(window.screenLeft || window.screenX, window.screenTop || window.screenY)
            }, getElementCoord: function (e, t) {
                var n = t && t.RtL, i = e.offsetLeft, o = e.offsetTop;
                for (n && (i = i + e.offsetWidth - this.getOffsetSize(document.documentElement).W); e.offsetParent;)e = e.offsetParent, i += e.offsetLeft, o += e.offsetTop;
                return this.getXY(i, o)
            }, getScrollCoord: function (e) {
                return e && e != window ? this.getXY(e.scrollLeft, e.scrollTop) : this.getXY(window.scrollX || window.pageXOffset || document.documentElement.scrollLeft, window.scrollY || window.pageYOffset || document.documentElement.scrollTop)
            }, getScrollLimitCoord: function (e, t) {
                var n = t && t.RtL;
                e && e != window || (e = document.documentElement);
                var i = this.getScrollSize(e), o = this.getClientSize(e);
                return this.getXY((i.W - o.W) * (n ? -1 : 1), i.H - o.H)
            }, getEventCoord: function (e) {
                return e ? this.getXY(e.pageX, e.pageY) : this.getXY(0, 0)
            }, getCoord: function (e, t) {
                if (t && t.RtL)return this.getCoord_RtL(e);
                if (e == screen)var n = this.getScreenSize(), i = {X: 0, Y: 0}, o = {
                    X: n.W,
                    Y: n.H
                }; else if (e == window)var n = this.getOffsetSize(document.documentElement), i = this.getScrollCoord(), o = {
                    X: i.X + n.W,
                    Y: i.Y + n.H
                }; else if (e == document)var n = this.getScrollSize(document.documentElement), i = {
                    X: 0,
                    Y: 0
                }, o = {X: n.W, Y: n.H}; else {
                    if (!e.tagName)return {};
                    var n = this.getOffsetSize(e), i = this.getElementCoord(e), o = {X: i.X + n.W, Y: i.Y + n.H}
                }
                return this.getXYTRBLCMWH(i.X, i.Y, i.Y, o.X, o.Y, i.X, Math.round((i.X + o.X) / 2), Math.round((i.Y + o.Y) / 2), n.W, n.H)
            }, getCoord_RtL: function (e) {
                if (e == screen)var t = this.getScreenSize(), n = {X: t.W, Y: 0}, i = {
                    X: 0,
                    Y: t.H
                }; else if (e == window)var t = this.getOffsetSize(document.documentElement), n = this.getScrollCoord(), i = {
                    X: n.X - t.W,
                    Y: n.Y + t.H
                }; else if (e == document)var t = this.getScrollSize(document.documentElement), n = {
                    X: 0,
                    Y: 0
                }, i = {X: t.W, Y: t.H}; else {
                    if (!e.tagName)return {};
                    var t = this.getElementSize(e), n = this.getElementCoord(e, 1), i = {X: n.X - t.W, Y: n.Y + t.H}
                }
                return this.getXYTRBLCMWH(n.X, n.Y, n.Y, n.X, i.Y, i.X, Math.round((i.X + n.X) / 2), Math.round((n.Y + i.Y) / 2), t.W, t.H)
            }
        }, n.getCoord = function () {
            return n.Coord.getCoord.apply(n.Coord, arguments)
        }, n.Scroller = {
            scrollTo: function (e, t) {
                if ("number" == typeof e)e = {Y: e}; else if (e instanceof HTMLElement)e = n.Coord.getElementCoord(e); else if (!e)return !1;
                e.Frame && e.Frame instanceof HTMLElement || (e.Frame = window);
                var i = n.Coord.getScrollCoord(e.Frame);
                "number" != typeof e.X && (e.X = i.X), "number" != typeof e.Y && (e.Y = i.Y), t || (t = {}), ("number" != typeof t.Duration || t.Duration < 0) && (t.Duration = 100);
                var o = n.Easing.linear;
                if ("function" == typeof t.Easing)var o = t.Easing; else if ("string" == typeof t.Easing)var o = n.Easing[t.Easing] ? n.Easing[t.Easing] : n.Easing.linear; else if ("number" == typeof t.Easing)var o = n.Easing.getEaser(t.Easing);
                n.Scroller.Timer && clearTimeout(n.Scroller.Timer), t.ForceScroll ? n.Scroller.preventUserScrolling() : n.Scroller.addScrollCancelation(), "function" == typeof t.before && t.before();
                var r = e.Frame == window ? window.scrollTo : function (t, n) {
                    e.Frame.scrollLeft = t, e.Frame.scrollTop = n
                };
                !function (e, t, i) {
                    var a = i.Duration ? ((new Date).getTime() - e.Time) / i.Duration : 1;
                    if (1 > a) {
                        var s = o(a);
                        r(Math.round(e.X + (t.X - e.X) * s), Math.round(e.Y + (t.Y - e.Y) * s)), "function" == typeof i.among && i.among();
                        var l = arguments.callee;
                        n.Scroller.Timer = setTimeout(function () {
                            l(e, t, i)
                        }, 10)
                    } else r(t.X, t.Y), "function" == typeof i.after && i.after(), "function" == typeof i.callback && i.callback(), i.ForceScroll ? n.Scroller.allowUserScrolling() : n.Scroller.cancelScrolling()
                }({X: i.X, Y: i.Y, Time: (new Date).getTime()}, e, t)
            }, addScrollCancelation: function () {
                ["keydown", "mousedown", "wheel"].forEach(function (e) {
                    document.addEventListener(e, n.Scroller.cancelScrolling)
                })
            }, cancelScrolling: function () {
                clearTimeout(n.Scroller.Timer), ["keydown", "mousedown", "wheel"].forEach(function (e) {
                    document.removeEventListener(e, n.Scroller.cancelScrolling)
                })
            }, preventUserScrolling: function () {
                ["keydown", "mousedown", "wheel"].forEach(function (e) {
                    document.addEventListener(e, n.Scroller.preventDefault)
                })
            }, allowUserScrolling: function () {
                ["keydown", "mousedown", "wheel"].forEach(function (e) {
                    document.removeEventListener(e, n.Scroller.preventDefault)
                })
            }, preventDefault: function (e) {
                return e.preventDefault()
            }
        }, n.scrollTo = n.Scroller.scrollTo, n.Ajax = {
            open: function (e) {
                if (!e || "string" != typeof e.URI || "function" != typeof e.onsuccess)return !1;
                var t = new XMLHttpRequest;
                e.Query || (e.Query = null), e.Auth || (e.Auth = ["", ""]), e.MimeType || (e.MimeType = null), e.onsuccess || (e.onsuccess = function () {
                }), e.onfailed || (e.onfailed = function () {
                    n.each(arguments, function () {
                        n.log(this + "")
                    })
                }), e.ontimeout || (e.ontimeout = e.onfailed), e.Async !== !1 && (e.Async = !0), e.Method = e.Method && /^POST$/i.test(e.Method) ? "POST" : "GET";
                var i = "";
                if (e.Query)for (var o in e.Query)i += "&" + o + "=" + encodeURIComponent(e.Query[o]);
                return i && ("GET" == e.method ? (e.URI = e.URI + (e.URI.indexOf("?") > 0 ? i : i.replace(/^&/, "?")), i = null) : "POST" == e.Method && (i = i.replace(/^&/, ""))), t.sMLAjaxTimeout = 0, t.sMLAjaxTimeoutTimer = setTimeout(function () {
                    t.sMLAjaxTimeout = 1, e.ontimeout("sML.AJAX.get Timeout: " + e.URI)
                }, 1e4), e.onstate4 = function (n, i) {
                    t.sMLAjaxTimeout || (clearTimeout(t.sMLAjaxTimeoutTimer), 200 == t.status || 0 == t.status ? e.onsuccess(n, i) : e.onfailed("sML.AJAX.get Failed: (" + t.status + ") " + URL), delete t)
                }, t.onreadystatechange = function () {
                    switch (this.readyState) {
                        case 4:
                            return e.onstate4.call(this, this.responseText, this.responseXML)
                    }
                }, e.MimeType && t.overrideMimeType(e.MimeType), t.open(e.Method, e.URI, e.Async, e.Auth[0], e.Auth[1]), "POST" == e.Method && t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), t.send(i), t
            }
        }, n.ajax = n.Ajax.open, n.Location = {
            RE: new RegExp("^((([a-z]+)://([^/\\?#]+))(/[^\\?#]*))(\\?[^\\?#]*)?(#[^#]*)?$"),
            getFile: function (e) {
                return (e ? e : location.href).replace(this.RE, "$1")
            },
            getOrigin: function (e) {
                return (e ? e : location.href).replace(this.RE, "$2")
            },
            getProtocol: function (e) {
                return (e ? e : location.href).replace(this.RE, "$3")
            },
            getHost: function (e) {
                return (e ? e : location.href).replace(this.RE, "$4")
            },
            getPathname: function (e) {
                return (e ? e : location.href).replace(this.RE, "$5")
            },
            getSearch: function (e) {
                return (e ? e : location.href).replace(this.RE, "$6")
            },
            getHash: function (e) {
                return (e ? e : location.href).replace(this.RE, "$7")
            },
            getDirectory: function (e) {
                return this.getFile(e).replace(/\/[^\/]*$/, "")
            },
            getId: function (e) {
                return this.getHash(e).replace("#", "")
            },
            getQueries: function (e) {
                var t = (e ? e : location.href).split("?");
                if (2 != t.length)return {};
                for (var n = {}, i = t[1].replace(/#.*$/, "").split("&"), o = 0, r = i.length; r > o; o++)if (i[o]) {
                    var a = i[o].split("=");
                    a.length < 2 ? a[1] = null : a.length > 2 && (a[1] = i[o].replace(a[0] + "=", "")), n[a[0]] = a[1]
                }
                return n
            },
            isIndexFile: function (e) {
                return /index\.(x?html?|php|cgi|[ja]spx?)$/.test(this.getPathname(e))
            },
            isSameFile: function (e, t) {
                return this.getFile(e) == (t ? this.getOrigin(t) : location.protocol + "//" + location.host + location.pathname)
            },
            isSameOrigin: function (e, t) {
                return this.getOrigin(e) == (t ? this.getOrigin(t) : location.protocol + "//" + location.host)
            },
            isSameProtocol: function (e, t) {
                return this.getProtocol(e) == (t ? this.getProtocol(t) : location.protocol)
            },
            isSameHost: function (e, t) {
                return this.getHost(e) == (t ? this.getHost(t) : location.host)
            },
            isSameHash: function (e, t) {
                return this.getHash(e) == (t ? this.getHash(t) : location.hash)
            },
            isSameDirectory: function (e, t) {
                return this.getDirectory(e) == (t ? this.getDirectory(t) : (location.protocol + "//" + location.host + location.pathname).replace(/\/[^\/]*$/, ""))
            },
            isSameId: function (e, t) {
                return this.getId(e) == (t ? this.getId(t) : location.hash.replace("#", ""))
            }
        }, n.getQueries = n.Location.getQueries, n.Cookies = {
            read: function (e) {
                if ("string" != typeof e || !e)return "";
                e = encodeURIComponent(e);
                for (var t = document.cookie.split("; "), n = "", i = 0, o = t.length; o > i; i++)if (t[i].substr(0, e.length + 1) == e + "=") {
                    n = t[i].substr(e.length + 1, t[i].length);
                    break
                }
                return decodeURIComponent(n)
            }, write: function (e, t, n) {
                if ("string" != typeof e || !e)return !1;
                if ("string" != typeof t)return !1;
                "object" != typeof n && (n = {}), e = encodeURIComponent(e), t = encodeURIComponent(t), n.Path = "string" == typeof n.Path ? n.Path : location.pathname.replace(/[^\/]+$/, ""), n.Expires = "number" == typeof n.Expires ? n.Expires : 864e5;
                var i = new Date;
                return document.cookie = [e + "=" + t, "path=" + n.Path, "expires=" + i.toGMTString(i.setTime(i.getTime() + n.Expires))].join("; "), document.cookie
            }
        }, n.JSON = {
            parse: function (e) {
                try {
                    return JSON.parse(e)
                } catch (t) {
                    return {}
                }
            }, stringify: function (e) {
                try {
                    return JSON.stringify(e)
                } catch (t) {
                    return ""
                }
            }
        }, n.each = function (e, t, n, i) {
            for (var o = n ? n : 0, r = i ? i + 1 : e.length; r > o && t.call(e[o], o, e) !== !1; o++);
            return e
        }, Array.prototype.includes || (Array.prototype.includes = function (e) {
            for (var t = 0, n = this.length; n > t; t++)if (this[t] == e)return !0
        }), n.Math = {
            sum: function () {
                for (var e = 0, t = 0, n = arguments.length; n > t; t++) {
                    var i = 0;
                    "number" == typeof arguments[t] ? i = arguments[t] : "string" == typeof arguments[t] && (i = arguments[t].length), e += i
                }
                return e
            }, random: function (e, t) {
                return isNaN(e) && isNaN(t) ? (e = 0, t = 1) : isNaN(e) ? e = 0 : isNaN(t) && (t = 0), e = Math.min(e, t), t = Math.max(e, t), Math.floor(Math.random() * (t - e + 1)) + e
            }
        }, n.String = {
            pad: function (e, t, n) {
                if (e += "", "number" == typeof e && (e += ""), "number" == typeof t && (t += ""), "string" != typeof e || "string" != typeof t || "number" != typeof n || 1 > n || e.length >= n)return e;
                for (; e.length < n;)e = t + e;
                return e.slice(-n)
            }, insertZeroWidthSpace: function (e) {
                return e.replace(/(?=\w)/g, "&#x200B;")
            }, replace: function (e, t) {
                return t instanceof Array || (t = [t]), t.forEach(function (t) {
                    t instanceof Array && 2 == t.length && ("string" == typeof t[0] || t[0] instanceof RegExp) && "string" == typeof t[1] && e.replace(t[0], t[1])
                }), e
            }
        }, n.getLength = function (e) {
            if ("object" == typeof e) {
                if (e instanceof Array)return e.length;
                var t = 0;
                for (var n in e)t++;
                return t
            }
            return "string" == typeof e ? e.length : "number" == typeof e ? ("" + e).length : null
        }, n.Range = {
            getRange: function (e, t) {
                if (!e)return null;
                t || (t = e.Start.Node.ownerDocument);
                var n = t.createRange();
                return n.setStart(e.Start.Node, "number" == typeof e.Start.Index ? e.Start.Index : e.Start.Node.textContent.indexOf(e.Start.Text)), n.setEnd(e.End.Node, "number" == typeof e.End.Index ? e.End.Index : e.End.Node.textContent.indexOf(e.End.Text) + e.End.Text.length), n
            }, flat: function (e) {
                return e.replace(/[\r\n]/g, "")
            }, escape: function (e) {
                return this.flat(e).replace(/([\(\)\{\}\[\]\,\.\-\+\*\?\!\:\^\$\/\\])/g, "\\$1")
            }, distill: function (e, t, n) {
                for (var i = "", o = t; n >= o; o++)i += e[o];
                return i
            }, find: function (e, t) {
                if (t || (t = document.body), "string" != typeof e || !e || this.flat(t.textContent).indexOf(e) < 0)return null;
                if (3 == t.nodeType)return {Start: {Node: t, Text: e}, End: {Node: t, Text: e}};
                for (var n = [], i = 0, o = t.childNodes.length - 1, r = "", a = {}, s = 0; o >= s; s++) {
                    if (this.flat(t.childNodes[s].textContent).indexOf(e) >= 0)return this.find(e, t.childNodes[s]);
                    n.push(t.childNodes[s].textContent)
                }
                for (r = this.distill(n, i + 1, o); r && this.flat(r).indexOf(e) >= 0;)i++, r = this.distill(n, i + 1, o);
                var l = t.childNodes[i], d = 0, c = l.textContent.length - 1, u = "";
                for (r = this.distill(l.textContent, d, c); this.flat(r) && !new RegExp("^" + this.escape(r)).test(e);)d++, r = this.distill(l.textContent, d, c);
                for (u = this.flat(r); 3 != l.nodeType;)a = this.find(u, l), l = a.Start.Node, u = a.Start.Text;
                for (r = this.distill(n, i, o - 1); r && this.flat(r).indexOf(e) >= 0;)o--, r = this.distill(n, i, o - 1);
                var p = t.childNodes[o], h = 0, f = p.textContent.length - 1, g = "";
                for (r = this.distill(p.textContent, h, f); this.flat(r) && !new RegExp(this.escape(r) + "$").test(e);)f--, r = this.distill(p.textContent, h, f);
                for (g = this.flat(r); 3 != p.nodeType;)a = this.find(g, p), p = a.End.Node, g = a.End.Text;
                return {Start: {Node: l, Text: u}, End: {Node: p, Text: g}}
            }
        }, n.Selection = {
            selectRange: function (e) {
                if (!e)return null;
                var t = window.getSelection();
                return t.removeAllRanges(), t.addRange(e), e
            }, getSelectedText: n.UA.InternetExplorer < 9 ? function () {
                var e = "" + document.selection.createRange().text;
                return e ? e : ""
            } : function () {
                var e = "" + window.getSelection();
                return e ? e : ""
            }
        }, n.getSelection = function () {
            return n.Selection.getSelectedText()
        }, n.select = function (e, t) {
            return n.Selection.selectRange(n.Range.getRange(e, t))
        }, n.find = function (e, t) {
            return n.Selection.selectRange(n.Range.getRange(n.Range.find(e, t)))
        }, n.Fullscreen = {
            Enabled: function (e) {
                return e.fullscreenEnabled || e.webkitFullscreenEnabled || e.mozFullScreenEnabled || e.msFullscreenEnabled
            }(document), request: function (e) {
                var t = function (t) {
                    return function (n) {
                        return n || (n = e), n[t]()
                    }
                };
                return e.requestFullscreen ? t("requestFullscreen") : e.webkitRequestFullscreen ? t("webkitRequestFullscreen") : e.mozRequestFullScreen ? t("mozRequestFullScreen") : e.msRequestFullscreen ? t("msRequestFullscreen") : function () {
                    return !1
                }
            }(document.documentElement), exit: function (e) {
                var t = function (t) {
                    return function (n) {
                        return n || (n = e), n[t]()
                    }
                };
                return e.exitFullscreen ? t("exitFullscreen") : e.webkitExitFullscreen ? t("webkitExitFullscreen") : e.mozCancelFullScreen ? t("mozCancelFullScreen") : e.msExitFullscreen ? t("msExitFullscreen") : function () {
                    return !1
                }
            }(document), getElement: function (e) {
                var t = function (t) {
                    return function (n) {
                        return n || (n = e), n[t]
                    }
                };
                return "undefined" != typeof e.fullscreenElement ? t("fullscreenElement") : "undefined" != typeof e.webkitFullscreenElement ? t("webkitFullscreenElement") : "undefined" != typeof e.mozFullscreenElement ? t("mozFullscreenElement") : "undefined" != typeof e.msFullscreenElement ? t("msFullscreenElement") : function () {
                    return null
                }
            }(document)
        }, n.requestFullscreen = n.Fullscreen.request, n.exitFullscreen = n.Fullscreen.exit, n.getFullscreenElement = n.Fullscreen.getElement, n.SML = {
            each: function (e) {
                return n.each(this, e), this
            }, set: function (e, t) {
                return this.each(function () {
                    var i = this;
                    n.set(i, e, t)
                })
            }, style: function (e) {
                return this.each(function () {
                    var t = this;
                    n.style(t, e)
                })
            }, appendChild: function (e) {
                return this.each(function () {
                    var t = this;
                    n.each(e, function () {
                        t.appendChild(this)
                    })
                })
            }, preppendChild: function (e) {
                return this.each(function () {
                    var e = this;
                    n.each(Es, function () {
                        e.insertBefore(this, S.firstChild)
                    })
                })
            }, insertBefore: function (e, t) {
                return this.each(function () {
                    var e = this;
                    n.each(Es, function () {
                        e.insertBefore(this, t)
                    })
                })
            }, insertAfter: function (e, t) {
                return this.each(function () {
                    var e = this;
                    n.each(Es, function () {
                        e.insertBefore(this, t.nextSibling)
                    })
                })
            }, addClass: function (e) {
                return this.each(function () {
                    var t = this;
                    n.addClass(t, e)
                })
            }, removeClass: function (e) {
                return this.each(function () {
                    var t = this;
                    n.removeClass(t, e)
                })
            }, replaceClass: function (e, t) {
                return this.each(function () {
                    var i = this;
                    n.replaceClass(i, e, t)
                })
            }
        }, window.addEventListener("unload", function () {
            window.sML = null, delete window.sML
        }), n
    }(), /*!
 *
 * # BiB/i (core)
 *
 * - "Heart of BiB/i"
 * - Copyright (c) Satoru MATSUSHIMA - http://bibi.epub.link or https://github.com/satorumurmur/bibi
 * - Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 */
    Bibi = {version: "0.999.5", build: 201610150249}, document.addEventListener("DOMContentLoaded", function () {
    Bibi.welcome()
}), Bibi.welcome = function () {
    if (O.stamp("Welcome!"), O.log("Welcome! - BiB/i v" + Bibi.version + " (" + Bibi.build + ") - [ja] http://bibi.epub.link - [en] https://github.com/satorumurmur/bibi", "-0"), O.RequestedURL = location.href, O.BookURL = location.origin + location.pathname + location.search, O.Language = function () {
            return "string" != typeof navigator.language ? "en" : "ja" == navigator.language.split("-")[0] ? "ja" : "en"
        }(), O.HTML = document.documentElement, O.HTML.className = "welcome " + sML.Environments.join(" "), O.Head = document.head, O.Body = document.body, O.Info = document.getElementById("bibi-info"), O.Title = document.getElementsByTagName("title")[0], sML.OS.iOS || sML.OS.Android ? (O.Mobile = !0, O.HTML.className = O.HTML.className + " Touch", O.setOrientation = function () {
            sML.removeClass(O.HTML, "orientation-" + (0 == window.orientation ? "landscape" : "portrait")), sML.addClass(O.HTML, "orientation-" + (0 == window.orientation ? "portrait" : "landscape"))
        }, O.setOrientation(), window.addEventListener("orientationchange", O.setOrientation), sML.OS.iOS && (O.Head.appendChild(sML.create("meta", {
            name: "apple-mobile-web-app-capable",
            content: "yes"
        })), O.Head.appendChild(sML.create("meta", {
            name: "apple-mobile-web-app-status-bar-style",
            content: "white"
        }))), O.resize = "orientationchange", O.pointerdown = "touchstart", O.pointermove = "touchmove", O.pointerup = "touchend") : (O.resize = "resize", sML.UA.InternetExplorer || sML.UA.Edge ? (O.pointerdown = "pointerdown", O.pointermove = "pointermove", O.pointerup = "pointerup", O.pointerover = "pointerover", O.pointerout = "pointerout") : (O.pointerdown = "mousedown", O.pointermove = "mousemove", O.pointerup = "mouseup", O.pointerover = "mouseover", O.pointerout = "mouseout")), O.Compatible = !0, sML.UA.InternetExplorer < 11 && (O.Compatible = !1), window.parent == window)O.WindowEmbedded = 0, O.WindowEmbeddedDetail = "Direct Opened: " + location.origin + location.pathname + location.search, O.HTML.className = O.HTML.className + " window-not-embedded"; else {
        O.WindowEmbedded = -1, O.HTML.className = O.HTML.className + " window-embedded";
        try {
            (location.host == parent.location.host || parent.location.href) && (O.WindowEmbedded = 1, O.WindowEmbeddedDetail = "Embedded in: " + parent.location.origin + parent.location.pathname + parent.location.search, O.ParentHolder = window.parent.document.getElementById(U["parent-holder-id"]))
        } catch (e) {
        }
        -1 == O.WindowEmbedded && (O.WindowEmbeddedDetail = "Embedded in: Unreachable Parent")
    }
    O.WindowEmbedded && !O.ParentHolder || !(O.Body.requestFullscreen || O.Body.webkitRequestFullscreen || O.Body.mozRequestFullScreen || O.Body.msRequestFullscreen) ? O.HTML.className = O.HTML.className + " fullscreen-not-enabled" : (O.FullscreenEnabled = !0, O.FullscreenElement = O.ParentHolder ? O.ParentHolder.Bibi.Frame : O.HTML, O.FullscreenDocument = O.ParentHolder ? window.parent.document : document, O.HTML.className = O.HTML.className + " fullscreen-enabled"), O.WritingModeProperty = function () {
        var e = getComputedStyle(O.HTML);
        return /^(vertical|horizontal)-/.test(e["-webkit-writing-mode"]) ? "-webkit-writing-mode" : /^(vertical|horizontal)-/.test(e["writing-mode"]) || sML.UA.InternetExplorer ? "writing-mode" : void 0
    }();
    var t = document.body.appendChild(sML.create("div", {id: "checker"}));
    return t.Child = t.appendChild(sML.create("p", {innerHTML: "aAあ亜"})), t.Child.offsetWidth < t.Child.offsetHeight ? (O.HTML.className = O.HTML.className + " vertical-text-enabled", O.VerticalTextEnabled = !0) : (O.HTML.className = O.HTML.className + " vertical-text-not-enabled", O.VerticalTextEnabled = !1), O.DefaultFontSize = Math.min(t.Child.offsetWidth, t.Child.offsetHeight), document.body.removeChild(t), delete t, O.Scrollbars = {
        Width: window.innerWidth - O.HTML.offsetWidth,
        Height: window.innerHeight - O.HTML.offsetHeight
    }, X.initialize(), P.initialize(), U.initialize(), S.initialize(), R.initialize(), I.initialize(), O.Compatible ? (I.note("Welcome!"), sML.removeClass(O.HTML, "welcome"), E.dispatch("bibi:says-welcome"), void P.Initialized.then(Bibi.ready)) : Bibi.byebye()
}, Bibi.byebye = function () {
    var e = {
        en: "<span>I'm so Sorry....</span> <span>Your Browser Is</span> <span>Not Compatible with BiB/i.</span>",
        ja: "<span>ごめんなさい……</span> <span>お使いのブラウザでは、</span><span>ビビは動きません。</span>"
    };
    I.Veil.ByeBye = I.Veil.appendChild(sML.create("p", {
        id: "bibi-veil-byebye",
        innerHTML: ['<span lang="en">', e.en, "</span>", '<span lang="ja">', e.ja, "</span>"].join("").replace(/(BiB\/i|ビビ)/g, '<a href="http://bibi.epub.link/" target="_blank">$1</a>')
    })), O.log(e.en.replace(/<[^>]*>/g, ""), "-*"), E.dispatch("bibi:says-byebye")
}, Bibi.ready = function () {
    sML.addClass(O.HTML, "ready"), O.ReadiedURL = location.href;
    var e = [];
    X.Extensions.forEach(function (t) {
        e.push(t.name)
    }), e.length && O.log("Extension" + (e.length >= 2 ? "s" : "") + ": " + e.join(", "), "-*"), E.add("bibi:commands:move", function (e) {
        R.move(e)
    }), E.add("bibi:commands:focus", function (e) {
        R.focus(e)
    }), E.add("bibi:commands:change-view", function (e) {
        R.changeView(e)
    }), window.addEventListener("message", M.gate, !1), E.add("bibi:readied", function () {
        U.book ? (sML.removeClass(O.HTML, "ready"), L.loadBook(U.book)) : X.Unzipper && window.File && !O.Mobile ? I.Veil.Catcher.dropOrClick() : O.WindowEmbedded ? I.note("Tell me EPUB name via embedding tag.", 99999999999) : I.note("Tell me EPUB name via URI.", 99999999999)
    }), setTimeout(function () {
        E.dispatch("bibi:readied")
    }, O.Mobile ? 999 : 1)
}, B = {}, B.initialize = function (e) {
    return O.log("Initializing Book...", "*:"), delete B.Online, delete B.Unzipped, delete B.name, delete B.Path, delete B.PathDelimiter, delete B.File, delete B.Files, delete B.initialize.resolve, delete B.initialize.reject, O.applyTo(B, {
        Title: "",
        Creator: "",
        Publisher: "",
        Language: "",
        WritingMode: "",
        Mimetype: {Path: "mimetype"},
        Container: {Path: "META-INF/container.xml"},
        Package: {
            Path: "",
            Dir: "",
            Metadata: {identifier: "", title: "", creators: [], publishers: [], languages: []},
            Manifest: {items: {}, nav: {}, "toc-ncx": {}, "cover-image": {}},
            Spine: {itemrefs: []}
        },
        FileDigit: 0
    }), new Promise(function (t, n) {
        if (B.initialize.resolve = t, B.initialize.reject = n, "string" == typeof e) {
            var i = P.bookshelf.replace(/^([\w\d]+:\/\/[^\/]+).*$/, "$1");
            if (!P["trustworthy-origins"].includes(i))return B.initialize.reject('The Origin of Bookshelf "' + i + '" Is Not Allowed.');
            if (/^([\w\d]+:\/)?\//.test(e))return B.initialize.reject("The Path Must Be Relative from Bookshelf.");
            B.Online = !0, B.name = e, B.Path = P.bookshelf + B.name, /\.epub$/i.test(B.name) ? B.initialize.asZipped() : (B.Path = B.Path.replace(/\/+$/, ""), B.checkContainerXML().then(function () {
                B.initialize.resolve()
            })["catch"](function () {
                B.initialize.asZipped()
            }))
        } else"object" == typeof e && e ? e.size && "string" == typeof e.name && /\.epub$/i.test(e.name) ? (B.name = B.Path = "[Local] " + e.name, B.File = e, B.initialize.asZipped()) : B.initialize.reject("EPUB File Is Not Valid.") : B.initialize.reject("Something Trouble.")
    }).then(function () {
        delete B.initialize.resolve, delete B.initialize.reject, B.PathDelimiter = B.Unzipped ? "/" : " > ", O.log("Book Initialized.", "/*")
    })["catch"](function (e) {
        return I.note(e, 99999999999, "IsError"), O.error(e), "ERROR"
    })
}, B.initialize.asZipped = function () {
    return X.Unzipper ? void(S.autostart ? B.loadEPUB() : L.wait().then(B.loadEPUB)) : B.initialize.reject("Zipped EPUB Unavailable.")
}, B.checkContainerXML = function () {
    return O.download(B.Path + "/" + B.Container.Path).then(function (e) {
        e.responseText && (B.Unzipped = !0, O.log("EPUB: " + B.Path + " (Unzipped Online Folder)", "-*"))
    })
}, L = {}, L.wait = function () {
    return new Promise(function (e, t) {
        L.wait.resolve = e, L.wait.reject = t, O.Busy = !1, sML.removeClass(O.HTML, "busy"), sML.addClass(O.HTML, "waiting"), E.dispatch("bibi:waits"), O.log("(waiting)", "-*"), I.note("")
    }).then(function () {
        delete L.wait.resolve, delete L.wait.reject, O.Busy = !0, sML.addClass(O.HTML, "busy"), sML.removeClass(O.HTML, "waiting"), I.note("Loading...")
    })
}, L.play = function () {
    return S["start-in-new-window"] ? window.open(location.href) : (L.Played = !0, L.wait.resolve(), void E.dispatch("bibi:played"))
}, L.loadBook = function (e) {
    O.Busy = !0, sML.addClass(O.HTML, "busy"), sML.addClass(O.HTML, "loading"), I.note("Loading..."), B.initialize(e).then(function (e) {
        e || (R.reset(), L.loadContainer())
    })
}, L.loadContainer = function () {
    O.log("Loading Container XML: " + B.Path + B.PathDelimiter + B.Container.Path + " ...", "*:"), O.openDocument(B.Container.Path).then(L.loadContainer.read).then(function () {
        O.log("Container XML Loaded.", "/*"), L.loadPackageDocument()
    })
}, L.loadContainer.read = function (e) {
    B.Package.Path = e.getElementsByTagName("rootfile")[0].getAttribute("full-path"), B.Package.Dir = B.Package.Path.replace(/\/?[^\/]+$/, "")
}, L.loadPackageDocument = function () {
    O.log("Loading Package Document: " + B.Path + B.PathDelimiter + B.Package.Path + " ...", "*:"), O.openDocument(B.Package.Path).then(L.loadPackageDocument.read).then(function () {
        E.dispatch("bibi:loaded-package-document"), O.log("Package Document Loaded.", "/*"), L.createCover(), L.prepareSpine(), L.loadNavigation().then(function () {
            S.autostart || L.Played ? L.loadItemsInSpreads() : L.wait().then(L.loadItemsInSpreads)
        })
    })
}, L.loadPackageDocument.read = function (e) {
    var t = e.getElementsByTagName("metadata")[0], n = e.getElementsByTagName("manifest")[0], i = e.getElementsByTagName("spine")[0], o = n.getElementsByTagName("item"), r = i.getElementsByTagName("itemref");
    if (o.length <= 0)return O.error('"' + B.Package.Path + '" has no <item> in <manifest>.');
    if (r.length <= 0)return O.error('"' + B.Package.Path + '" has no <itemref> in <spine>.');
    XMLNS = {dc: t.getAttribute("xmlns:dc")}, sML.each(t.getElementsByTagName("meta"), function () {
        if (!this.getAttribute("refines")) {
            if (this.getAttribute("property")) {
                var e = this.getAttribute("property").replace(/^dcterms:/, "");
                /^(identifier|title)$/.test(e) ? B.Package.Metadata[e] = this.textContent : /^(creator|publisher|language)$/.test(e) ? B.Package.Metadata[e + "s"].push(this.textContent) : B.Package.Metadata[e] || (B.Package.Metadata[e] = this.textContent)
            }
            this.getAttribute("name") && this.getAttribute("content") && (B.Package.Metadata[this.getAttribute("name")] = this.getAttribute("content"))
        }
    }), B.Package.Metadata.identifier || sML.each(e.getElementsByTagNameNS(XMLNS.dc, "identifier"), function () {
        return B.Package.Metadata.identifier = this.textContent, !1
    }), B.Package.Metadata.identifier || (B.Package.Metadata.identifier = Date.now()), B.Package.Metadata.title || sML.each(e.getElementsByTagNameNS(XMLNS.dc, "title"), function () {
        return B.Package.Metadata.title = this.textContent, !1
    }), B.Package.Metadata.creators.length || sML.each(e.getElementsByTagNameNS(XMLNS.dc, "creator"), function () {
        B.Package.Metadata.creators.push(this.textContent)
    }), B.Package.Metadata.publishers.length || sML.each(e.getElementsByTagNameNS(XMLNS.dc, "publisher"), function () {
        B.Package.Metadata.publishers.push(this.textContent)
    }), B.Package.Metadata.languages.length || sML.each(e.getElementsByTagNameNS(XMLNS.dc, "language"), function () {
        B.Package.Metadata.languages.push(this.textContent)
    }), B.Package.Metadata.languages.length || (B.Package.Metadata.languages[0] = "en"), B.Package.Metadata.cover || (B.Package.Metadata.cover = ""), B.Package.Metadata["rendition:layout"] || (B.Package.Metadata["rendition:layout"] = "reflowable"), B.Package.Metadata["rendition:orientation"] || (B.Package.Metadata["rendition:orientation"] = "auto"), B.Package.Metadata["rendition:spread"] || (B.Package.Metadata["rendition:spread"] = "auto"), "auto" == B.Package.Metadata["rendition:orientation"] && (B.Package.Metadata["rendition:orientation"] = "portrait"), "auto" == B.Package.Metadata["rendition:spread"] && (B.Package.Metadata["rendition:spread"] = "landscape"), delete e;
    var a = i.getAttribute("toc");
    sML.each(o, function () {
        var e = {
            id: this.getAttribute("id") || "",
            href: this.getAttribute("href") || "",
            "media-type": this.getAttribute("media-type") || "",
            properties: this.getAttribute("properties") || "",
            fallback: this.getAttribute("fallback") || ""
        };
        e.id && e.href && (B.Package.Manifest.items[e.id] = e, function (t) {
            / nav /.test(t) && (B.Package.Manifest.nav.Path = O.getPath(B.Package.Dir, e.href)), / cover-image /.test(t) && (B.Package.Manifest["cover-image"].Path = O.getPath(B.Package.Dir, e.href))
        }(" " + e.properties + " "), a && e.id == a && (B.Package.Manifest["toc-ncx"].Path = O.getPath(B.Package.Dir, e.href)))
    }), B.Package.Spine["page-progression-direction"] = i.getAttribute("page-progression-direction"), B.Package.Spine["page-progression-direction"] && /^(ltr|rtl)$/.test(B.Package.Spine["page-progression-direction"]) || (B.Package.Spine["page-progression-direction"] = "ltr"), B.PPD = B.Package.Spine["page-progression-direction"];
    var s = [/(page-spread)-(.+)/, /(rendition:layout)-(.+)/, /(rendition:orientation)-(.+)/, /(rendition:spread)-(.+)/, /(rendition:page-spread)-(.+)/, /(bibi:[a-z]+)-(.+)/];
    sML.each(r, function (e) {
        var t = {
            idref: this.getAttribute("idref") || "",
            linear: this.getAttribute("linear") || "",
            properties: this.getAttribute("properties") || "",
            "page-spread": "",
            "rendition:layout": B.Package.Metadata["rendition:layout"],
            "rendition:orientation": B.Package.Metadata["rendition:orientation"],
            "rendition:spread": B.Package.Metadata["rendition:spread"]
        };
        "no" != t.linear && (t.linear = "yes"), t.properties = t.properties.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ").split(" "), s.forEach(function (e) {
            t.properties.forEach(function (n) {
                return e.test(n) ? (t[n.replace(e, "$1")] = n.replace(e, "$2").replace("rendition:", ""), !1) : void 0
            })
        }), t["rendition:page-spread"] && (t["page-spread"] = t["rendition:page-spread"]), t["rendition:page-spread"] = t["page-spread"], t.viewport = {
            content: null,
            width: null,
            height: null
        }, t.viewBox = {content: null, width: null, height: null}, B.Package.Spine.itemrefs.push(t)
    }), B.ID = B.Package.Metadata.identifier, B.Title = B.Package.Metadata.title, B.Creator = B.Package.Metadata.creators.join(", "), B.Publisher = B.Package.Metadata.publishers.join(", "), B.Language = B.Package.Metadata.languages[0].split("-")[0], /^(zho?|chi|kor?|ja|jpn)$/.test(B.Language) ? B.WritingMode = "rtl" == B.PPD ? "tb-rl" : "lr-tb" : /^(aze?|ara?|ui?g|urd?|kk|kaz|ka?s|ky|kir|kur?|sn?d|ta?t|pu?s|bal|pan?|fas?|per|ber|msa?|may|yid?|heb?|arc|syr|di?v)$/.test(B.Language) ? B.WritingMode = "rl-tb" : /^(mo?n)$/.test(B.Language) ? B.WritingMode = "tb-lr" : B.WritingMode = "lr-tb";
    var l = [];
    B.Title && l.push(B.Title), B.Creator && l.push(B.Creator), B.Publisher && l.push(B.Publisher), l.length && (O.Title.innerHTML = "", O.Title.appendChild(document.createTextNode(l.join(" - ").replace(/&amp;?/gi, "&").replace(/&lt;?/gi, "<").replace(/&gt;?/gi, "*:") + " | BiB/i")));
    var d = [];
    B.Title && d.push(B.Title), B.Creator && d.push(B.Creator), B.Publisher && d.push(B.Publisher), d.push('Language: "' + B.Language + '"'), O.log(d.join(" / "), "-*");
    var c = [];
    if (c.push('rendition:layout: "' + B.Package.Metadata["rendition:layout"] + '"'), c.push('rendition:orientation: "' + B.Package.Metadata["rendition:orientation"] + '"'), c.push('rendition:spread: "' + B.Package.Metadata["rendition:spread"] + '"'), c.push('page-progression-direction: "' + B.Package.Spine["page-progression-direction"] + '"'), O.log(c.join(" / "), "-*"), S["use-cookie"]) {
        var u = O.Cookie.remember(B.ID);
        u && (!U.to && u.Position && (S.to = u.Position), !U["reader-view-mode"] && u.RVM && (S["reader-view-mode"] = u.RVM))
    }
    S.update()
}, L.createCover = function () {
    O.log("Creating Cover...", "*:"), I.Veil.Cover.innerHTML = I.Panel.BookInfo.Cover.innerHTML = "", B.Package.Manifest["cover-image"].Path && (R.CoverImage.Path = B.Package.Manifest["cover-image"].Path);
    var e = function () {
        var e = [];
        return B.Title && e.push("<strong>" + B.Title + "</strong>"), B.Creator && e.push("<em>" + B.Creator + "</em>"), B.Publisher && e.push("<span>" + B.Publisher + "</span>"), e.join(" ")
    }();
    I.Veil.Cover.Info = I.Veil.Cover.appendChild(sML.create("p", {
        id: "bibi-veil-cover-info",
        innerHTML: e
    })), I.Panel.BookInfo.Cover.Info = I.Panel.BookInfo.Cover.appendChild(sML.create("p", {
        id: "bibi-panel-bookinfo-cover-info",
        innerHTML: e
    })), function (e) {
        R.CoverImage.Path ? (O.log("Cover Image: " + B.Path + B.PathDelimiter + R.CoverImage.Path, "-*"), sML.create("img", {
            load: function () {
                var e = this;
                e.src = B.Unzipped ? B.Path + "/" + R.CoverImage.Path : B.getDataURI(R.CoverImage.Path), e.timeout = setTimeout(function () {
                    e.ontimeout()
                }, 5e3)
            }, onload: function () {
                return this.TimedOut ? !1 : (clearTimeout(this.timeout), sML.style(I.Veil.Cover, {backgroundImage: "url(" + this.src + ")"}), I.Panel.BookInfo.Cover.insertBefore(this, I.Panel.BookInfo.Cover.Info), void e("with-cover-image"))
            }, ontimeout: function () {
                this.TimedOut = !0, e("without-cover-image")
            }
        }).load()) : (O.log("No Cover Image.", "-*"), e("without-cover-image"))
    }(function (e) {
        I.Veil.Cover.className = I.Panel.BookInfo.Cover.className = e
    }), O.log("Cover Created.", "/*"), E.dispatch("bibi:created-cover", R.CoverImage.Path)
}, L.prepareSpine = function () {
    if (O.log("Preparing Spine...", "*:"), "rtl" == B.PPD)var e = "right", t = "left"; else var e = "left", t = "right";
    B.FileDigit = (B.Package.Spine.itemrefs.length + "").length, sML.each(B.Package.Spine.itemrefs, function () {
        var n = this, i = R.Items.length, o = sML.create("iframe", {
            className: "item",
            scrolling: "no",
            allowtransparency: "true"
        });
        if (o.ItemRef = n, o.Path = O.getPath(B.Package.Dir, B.Package.Manifest.items[n.idref].href), o.Dir = o.Path.replace(/\/?[^\/]+$/, ""), R.AllItems.push(o), "yes" != n.linear)return R.NonLinearItems.push(o);
        R.Items.push(o);
        var r, a;
        if ("center" == n["page-spread"])o.IsSpreadCenter = !0; else if (n["page-spread"] == e)o.IsSpreadPairBefore = !0; else if (n["page-spread"] == t && i > 0) {
            o.IsSpreadPairAfter = !0;
            var s = R.Items[i - 1];
            s.IsSpreadPairBefore && (s.SpreadPair = o, o.SpreadPair = s, a = s.Spread, r = a.SpreadBox)
        }
        o.SpreadPair || (r = R.Main.Book.appendChild(sML.create("div", {className: "spread-box"})), a = r.appendChild(sML.create("div", {className: "spread"})), a.SpreadBox = r, a.Items = [], a.Pages = [], a.SpreadIndex = R.Spreads.length, R.Spreads.push(a));
        var l = a.appendChild(sML.create("div", {className: "item-box"}));
        o.Spread = a, o.ItemBox = l, o.Pages = [], o.ItemIndexInSpread = a.Items.length, o.ItemIndex = i, o.id = "item-" + sML.String.pad(o.ItemIndex + 1, 0, B.FileDigit), a.Items.push(o), [r, a, l, o].forEach(function (e) {
            e.RenditionLayout = n["rendition:layout"], e.PrePaginated = "pre-paginated" == e.RenditionLayout, sML.addClass(e, n["rendition:layout"])
        }), [l, o].forEach(function (e) {
            n["page-spread"] && sML.addClass(e, "page-spread-" + n["page-spread"]), n["bibi:layout"] && sML.addClass(e, "layout-" + n["bibi:layout"])
        })
    }), O.log(R.Items.length + " Item" + (R.Items.length > 1 ? "s" : "") + " in " + R.Spreads.length + " Spread" + (R.Spreads.length > 1 ? "s" : ""), "-*"), O.log("Spine Prepared.", "/*")
}, L.loadNavigation = function () {
    return B.Package.Manifest.nav.Path ? (I.Panel.BookInfo.Navigation.Path = B.Package.Manifest.nav.Path, I.Panel.BookInfo.Navigation.Type = "Navigation Document") : B.Package.Manifest["toc-ncx"].Path && (I.Panel.BookInfo.Navigation.Path = B.Package.Manifest["toc-ncx"].Path, I.Panel.BookInfo.Navigation.Type = "TOC-NCX"), new Promise(function (e, t) {
        return I.Panel.BookInfo.Navigation.Type ? (O.log("Loading Navigation: " + B.Path + B.PathDelimiter + I.Panel.BookInfo.Navigation.Path + " ...", "*:"), void O.openDocument(I.Panel.BookInfo.Navigation.Path).then(function (t) {
            I.Panel.BookInfo.Navigation.innerHTML = "";
            var n = document.createDocumentFragment();
            if ("Navigation Document" == I.Panel.BookInfo.Navigation.Type)sML.each(t.querySelectorAll("nav"), function () {
                switch (this.getAttribute("epub:type")) {
                    case"toc":
                        sML.addClass(this, "bibi-nav-toc");
                        break;
                    case"landmarks":
                        sML.addClass(this, "bibi-nav-landmarks");
                        break;
                    case"page-list":
                        sML.addClass(this, "bibi-nav-page-list")
                }
                sML.each(this.querySelectorAll("*"), function () {
                    this.removeAttribute("style")
                }), n.appendChild(this)
            }); else {
                var i = function (e) {
                    for (var t = e.childNodes, n = void 0, i = 0, o = t.length; o > i; i++)if (1 == t[i].nodeType && /^navPoint$/i.test(t[i].tagName)) {
                        var r = t[i], a = (r.getElementsByTagName("navLabel")[0], r.getElementsByTagName("content")[0]), s = r.getElementsByTagName("text")[0];
                        n || (n = document.createElement("ul"));
                        var l = sML.create("li", {id: r.getAttribute("id")});
                        l.setAttribute("playorder", r.getAttribute("playorder"));
                        var d = sML.create("a", {href: a.getAttribute("src"), innerHTML: s.innerHTML.trim()});
                        n.appendChild(l).appendChild(d);
                        var c = arguments.callee(r);
                        c && l.appendChild(c)
                    }
                    return n
                }(t.getElementsByTagName("navMap")[0]);
                i && n.appendChild(document.createElement("nav")).appendChild(i)
            }
            I.Panel.BookInfo.Navigation.appendChild(n), I.Panel.BookInfo.Navigation.Body = I.Panel.BookInfo.Navigation, delete n, delete t, L.postprocessItem.coordinateLinkages(I.Panel.BookInfo.Navigation, "InNav"), R.resetNavigation(), O.log("Navigation Loaded.", "/*"), e()
        })) : (O.log("No Navigation Document or TOC-NCX.", "-*"), e())
    }).then(function () {
        E.dispatch("bibi:loaded-navigation", I.Panel.BookInfo.Navigation.Path)
    })
}, L.loadItemsInSpreads = function () {
    O.stamp("Load Items in Spreads"), O.log("Loading " + R.Items.length + " Item" + (R.Items.length > 1 ? "s" : "") + " in " + R.Spreads.length + " Spread" + (R.Spreads.length > 1 ? "s" : "") + "...", "*:"), R.resetStage(), L.LoadedItems = 0, L.LoadedSpreads = 0, R.ToRelayout = !1, L.listenResizingWhileLoading = function () {
        R.ToRelayout = !0
    }, window.addEventListener("resize", L.listenResizingWhileLoading), R.Spreads.forEach(L.loadSpread)
}, L.loadSpread = function (e) {
    e.Loaded = !1, e.LoadedItems = 0, e.Items.forEach(L.loadItem)
}, L.loadItem = function (e) {
    O.log(sML.String.pad(e.ItemIndex + 1, 0, B.FileDigit) + "/" + sML.String.pad(R.Items.length, 0, B.FileDigit) + " - " + (e.Path ? B.Path + B.PathDelimiter + e.Path : "... Not Found."), "-*"), e.Loaded = !1, e.TimeCard = {}, e.stamp = function (t) {
        O.stamp(t, e.TimeCard)
    };
    var t = e.Path;
    if (/\.(x?html?)$/i.test(t))B.Unzipped ? (e.src = B.Path + "/" + t, e.onload = function () {
        setTimeout(L.postprocessItem, 0, e)
    }, e.ItemBox.appendChild(e)) : (L.loadItem.writeItemHTML(e, B.Files[t]), setTimeout(L.postprocessItem, 0, e)); else if (/\.(svg)$/i.test(t))if (e.IsSVG = !0, B.Unzipped) {
        var n = B.Path + "/" + t;
        O.download(n).then(function (t) {
            L.loadItem.writeItemHTML(e, !1, '<base href="' + n + '" />', t.responseText.replace(/<\?xml-stylesheet (.+?)[ \t]?\?>/g, '<link rel="stylesheet" $1 />'))
        })
    } else L.loadItem.writeItemHTML(e, !1, "", B.Files[t].replace(/<\?xml-stylesheet (.+?)[ \t]?\?>/g, '<link rel="stylesheet" $1 />')); else/\.(gif|jpe?g|png)$/i.test(t) ? (e.IsBitmap = !0, L.loadItem.writeItemHTML(e, !1, "", '<img alt="" src="' + (B.Unzipped ? B.Path + "/" + t : B.getDataURI(t)) + '" />')) : /\.(pdf)$/i.test(t) && (e.IsPDF = !0, L.loadItem.writeItemHTML(e, !1, "", '<iframe     src="' + (B.Unzipped ? B.Path + "/" + t : B.getDataURI(t)) + '" />'))
}, L.loadItem.writeItemHTML = function (e, t, n, i) {
    e.ItemBox.appendChild(e), e.contentDocument.open(), e.contentDocument.write(t ? t : ["<html>", "<head>" + n + "</head>", '<body onload="parent.L.postprocessItem(parent.R.Items[' + e.ItemIndex + "]); document.body.removeAttribute('onload'); return false;\">" + i + "</body>", "</html>"].join("")), e.contentDocument.close()
}, L.postprocessItem = function (e) {
    e.stamp("Postprocess"), e.HTML = sML.edit(e.contentDocument.getElementsByTagName("html")[0], {Item: e}), e.Head = sML.edit(e.contentDocument.getElementsByTagName("head")[0], {Item: e}), e.Body = sML.edit(e.contentDocument.getElementsByTagName("body")[0], {Item: e}), sML.addClass(e.HTML, sML.Environments.join(" ")), sML.each(e.Body.querySelectorAll("link"), function () {
        e.Head.appendChild(this)
    }), S["epub-additional-stylesheet"] && e.Head.appendChild(sML.create("link", {
        rel: "stylesheet",
        href: S["epub-additional-stylesheet"]
    })), S["epub-additional-script"] && e.Head.appendChild(sML.create("script", {src: S["epub-additional-script"]})), e.StyleSheets = [], sML.appendStyleRule("html", "-webkit-text-size-adjust: 100%;", e.contentDocument), sML.each(e.HTML.querySelectorAll("link, style"), function () {
        if (/^link$/i.test(this.tagName)) {
            if (!/^(alternate )?stylesheet$/.test(this.rel))return;
            if ((sML.UA.Safari || sML.OS.iOS) && "alternate stylesheet" == this.rel)return
        }
        e.StyleSheets.push(this)
    }), e.BibiProperties = {};
    var t = e.HTML.getAttribute("data-bibi-properties");
    t && t.replace(/[\s\t\r\n]+/g, " ").split(" ").forEach(function (t) {
        t && (e.BibiProperties[t] = !0)
    });
    var n = e.contentDocument.querySelectorAll("body>*");
    if (n && n.length) {
        for (var i = 0, o = 0, r = n.length; r > o; o++)/^(script|style)$/i.test(n[o].tagName) || i++;
        1 == i && (/^svg$/i.test(e.Body.firstElementChild.tagName) ? (e.Outsourcing = !0, e.ImageItem = !0, e.SingleSVGOnlyItem = !0) : /^img$/i.test(e.Body.firstElementChild.tagName) ? (e.Outsourcing = !0, e.ImageItem = !0, e.SingleIMGOnlyItem = !0) : /^iframe$/i.test(e.Body.firstElementChild.tagName) ? (e.Outsourcing = !0, e.FrameItem = !0, e.SingleFrameOnlyItem = !0) : O.getElementInnerText(e.Body) || (e.Body.querySelectorAll("img, svg, video, audio").length - e.Body.querySelectorAll("svg img, video img, audio img").length == 1 ? (e.Outsourcing = !0, e.ImageItem = !0) : 1 == e.Body.getElementsByTagName("iframe").length && (e.Outsourcing = !0, e.FrameItem = !0)))
    }
    E.dispatch("bibi:is-going-to:postprocess-item-content", e), L.postprocessItem.processImages(e), L.postprocessItem.defineViewport(e), L.postprocessItem.coordinateLinkages(e), setTimeout(function () {
        return e.contentDocument.styleSheets.length < e.StyleSheets.length ? setTimeout(arguments.callee, 100) : (L.postprocessItem.patchStyles(e), E.dispatch("bibi:postprocessed-item-content", e), E.dispatch("bibi:postprocessed-item", e), void L.onLoadItem(e))
    }, 100)
}, L.postprocessItem.processImages = function (e) {
    sML.each(e.Body.getElementsByTagName("img"), function () {
        this.Bibi = {
            DefaultStyle: {
                margin: this.style.margin ? this.style.margin : "",
                width: this.style.width ? this.style.width : "",
                height: this.style.height ? this.style.height : "",
                "vertical-align": this.style.verticalAlign ? this.style.verticalAlign : "",
                "page-break-before": this.style.pageBreakBefore ? this.style.pageBreakBefore : "",
                "page-break-after": this.style.pageBreakAfter ? this.style.pageBreakAfter : ""
            }
        }
    }), sML.UA.InternetExplorer && sML.each(e.Body.getElementsByTagName("svg"), function () {
        var e = this.getElementsByTagName("image");
        if (1 == e.length) {
            var t = e[0];
            t.getAttribute("width") && t.getAttribute("height") && (this.setAttribute("width", t.getAttribute("width")), this.setAttribute("height", t.getAttribute("height")))
        }
    })
}, L.postprocessItem.defineViewport = function (e) {
    var t = e.ItemRef;
    if (sML.each(e.Head.getElementsByTagName("meta"), function () {
            if ("viewport" == this.name && (t.viewport.content = this.getAttribute("content"), t.viewport.content)) {
                var e = 1 * t.viewport.content.replace(/^.*?width=([^\, ]+).*$/, "$1"), n = 1 * t.viewport.content.replace(/^.*?height=([^\, ]+).*$/, "$1");
                isNaN(e) || isNaN(n) || (t.viewport.width = e, t.viewport.height = n)
            }
        }), "pre-paginated" == t["rendition:layout"] && !(t.viewport.width * t.viewport.height)) {
        var n = e.Body.firstElementChild;
        if (e.SingleSVGOnlyItem) {
            if (n.getAttribute("viewBox")) {
                t.viewBox.content = n.getAttribute("viewBox");
                var i = t.viewBox.content.split(" ");
                if (4 == i.length) {
                    var o = 1 * i[2] - 1 * i[0], r = 1 * i[3] - 1 * i[1];
                    o && r && ("100%" != n.getAttribute("width") && n.setAttribute("width", "100%"), "100%" != n.getAttribute("height") && n.setAttribute("height", "100%"), t.viewport.width = t.viewBox.width = o, t.viewport.height = t.viewBox.height = r)
                }
            }
        } else e.SingleIMGOnlyItem && (t.viewport.width = parseInt(getComputedStyle(n).width), t.viewport.height = parseInt(getComputedStyle(n).height))
    }
}, L.postprocessItem.coordinateLinkages = function (e, t) {
    var n = e.Path, i = e.Body;
    sML.each(i.getElementsByTagName("a"), function (e) {
        var i = this;
        t && (i.NavANumber = e + 1, i.addEventListener(O.pointerdown, function (e) {
            e.stopPropagation()
        }), i.addEventListener(O.pointerup, function (e) {
            e.stopPropagation()
        }));
        var o = i.getAttribute("href");
        if (!o)return void(t && (i.addEventListener("click", function (e) {
            return e.preventDefault(), e.stopPropagation(), !1
        }), sML.addClass(i, "bibi-bookinfo-inactive-link")));
        if (/^[a-zA-Z]+:/.test(o)) {
            if (o.split("#")[0] != location.href.split("#")[0])return i.setAttribute("target", i.getAttribute("target") || "_blank");
            var r = o.split("#")[1];
            o = r ? "#" + r : R.Items[0].Path
        }
        var a = O.getPath(n.replace(/\/?([^\/]+)$/, ""), (/^\.*\/+/.test(o) ? "" : "./") + (/^#/.test(o) ? n.replace(/^.+?([^\/]+)$/, "$1") : "") + o), s = a.split("#"), l = s[0] ? s[0] : n, d = s[1] ? s[1] : "";
        R.Items.forEach(function (e) {
            return l == e.Path ? (i.setAttribute("data-bibi-original-href", o), i.setAttribute("href", "bibi://" + B.Path.replace(/^\w+:\/\//, "") + B.PathDelimiter + a), i.InNav = t, i.Destination = {
                Item: e,
                ElementSelector: d ? "#" + d : void 0
            }, void i.addEventListener("click", L.postprocessItem.coordinateLinkages.jump)) : void 0
        }), d && /^epubcfi\(.+\)$/.test(d) && (i.setAttribute("data-bibi-original-href", o), X.EPUBCFI ? (i.setAttribute("href", "bibi://" + B.Path.replace(/^\w+:\/\//, "") + B.PathDelimiter + "#" + d), i.InNav = t, i.Destination = X.EPUBCFI.getDestination(d), i.addEventListener("click", L.postprocessItem.coordinateLinkages.jump)) : (i.removeAttribute("href"), i.addEventListener("click", function () {
            return !1
        }), O.Mobile || (i.addEventListener(O.pointerover, function () {
            return I.Help.show("(This link uses EPUBCFI. BiB/i needs the extension.)"), !1
        }), i.addEventListener(O.pointerout, function () {
            return I.Help.hide(), !1
        })))), t && typeof S.nav == e + 1 && i.Destination && (S.to = i.Destination)
    })
}, L.postprocessItem.coordinateLinkages.jump = function (e) {
    if (e.preventDefault(), e.stopPropagation(), this.Destination) {
        var t = this, n = L.Opened ? function () {
            R.focus(t.Destination, {Duration: 0})
        } : function () {
            return S["start-in-new-window"] ? window.open(location.href + (location.hash ? "," : "#") + "pipi(nav:" + t.NavANumber + ")") : (S.to = t.Destination, void L.play())
        };
        t.InNav ? I.Panel.toggle({callback: n}) : n()
    }
    return !1
}, L.postprocessItem.patchStyles = function (e) {
    sML.each(e.contentDocument.styleSheets, function () {
        var e = this;
        if (e.cssRules)for (var t = e.cssRules.length, n = 0; t > n; n++) {
            var i = this.cssRules[n];
            i.cssRules ? arguments.callee.call(i) : i.styleSheet ? arguments.callee.call(i.styleSheet) : (/(-(webkit|epub)-)?column-count: 1; /.test(i.cssText) && (i.style.columnCount = i.style.webkitColumnCount = i.style.epubColumnCount = "auto"), sML.UA.InternetExplorer && (/ (-(webkit|epub)-)?writing-mode: vertical-rl; /.test(i.cssText) ? i.style.writingMode = / direction: rtl; /.test(i.cssText) ? "bt-rl" : "tb-rl" : / (-(webkit|epub)-)?writing-mode: vertical-lr; /.test(i.cssText) ? i.style.writingMode = / direction: rtl; /.test(i.cssText) ? "bt-lr" : "tb-lr" : / (-(webkit|epub)-)?writing-mode: horizontal-tb; /.test(i.cssText) && (i.style.writingMode = / direction: rtl; /.test(i.cssText) ? "rl-tb" : "lr-tb")))
        }
    });
    var t = getComputedStyle(e.HTML), n = getComputedStyle(e.Body);
    t[O.WritingModeProperty] != n[O.WritingModeProperty] && sML.style(e.HTML, {"writing-mode": n[O.WritingModeProperty]}), e.HTML.WritingMode = O.getWritingMode(e.HTML), sML.addClass(e.HTML, "writing-mode-" + e.HTML.WritingMode), /-rl$/.test(e.HTML.WritingMode) && (n.marginLeft != n.marginRight ? e.Body.style.marginLeft = n.marginRight : /-lr$/.test(e.HTML.WritingMode) && (n.marginRight != n.marginLeft ? e.Body.style.marginRight = n.marginLeft : n.marginBottom != n.marginTop && (e.Body.style.marginBottom = n.marginTop))), e.HTML.style && (sML.style(e.ItemBox, L.postprocessItem.patchStyles.getBackgroundStyle(e.HTML)), e.HTML.style.background = "transparent"), e.Body.style && (sML.style(e, L.postprocessItem.patchStyles.getBackgroundStyle(e.Body)), e.Body.style.background = "transparent")
}, L.postprocessItem.patchStyles.getBackgroundStyle = function (e) {
    var t = getComputedStyle(e);
    return {
        backgroundColor: t.backgroundColor,
        backgroundImage: t.backgroundImage,
        backgroundRepeat: t.backgroundRepeat,
        backgroundPosition: t.backgroundPosition,
        backgroundSize: t.backgroundSize
    }
}, L.onLoadItem = function (e) {
    e.Loaded = !0, L.LoadedItems++, e.ImageItem && (sML.addClass(e.ItemBox, "image-item-box"), sML.addClass(e, "image-item")), E.dispatch("bibi:loaded-item", e), e.stamp("Loaded");
    var t = e.Spread;
    t.LoadedItems++, t.LoadedItems == t.Items.length && L.onLoadSpread(t), I.note("Loading... (" + L.LoadedItems + "/" + R.Items.length + " Items Loaded.)")
}, L.onLoadSpread = function (e) {
    L.LoadedSpreads++, e.ImageSpread = !0, e.Items.forEach(function (t) {
        t.ImageItem || (e.ImageSpread = !1)
    }), e.ImageSpread && (sML.addClass(e.SpreadBox, "image-spread-box"), sML.addClass(e, "image-spread")), E.dispatch("bibi:loaded-spread", e), R.ToRelayout || R.resetSpread(e), L.LoadedSpreads == R.Spreads.length && L.onLoadItemsInSpreads()
}, L.onLoadItemsInSpreads = function () {
    delete B.Files, document.body.style.display = "", R.resetPages(), O.stamp("Items in Spreads Loaded"), O.log(R.Items.length + " Item" + (R.Items.length > 1 ? "s" : "") + " in " + R.Spreads.length + " Spread" + (R.Spreads.length > 1 ? "s" : "") + " Loaded.", "/*"), E.dispatch("bibi:loaded-items"), E.dispatch("bibi:loaded-spreads"), E.dispatch("bibi:loaded-items-in-spreads"), L.onLoadBook()
}, L.onLoadBook = function () {
    L.Loaded = !0, O.Busy = !1, sML.removeClass(O.HTML, "busy"), sML.removeClass(O.HTML, "loading"), O.stamp("Book Loaded"), E.dispatch("bibi:loaded-book"), L.open()
}, L.open = function () {
    window.removeEventListener("resize", L.listenResizingWhileLoading), delete L.listenResizingWhileLoading, R.layout({Destination: S.to ? S.to : "head"}), R.getCurrent(), E.dispatch("bibi:laid-out:for-the-first-time"), setTimeout(function () {
        I.Veil.close(), setTimeout(function () {
            I.Menu.close(), I.Slider && I.Slider.close()
        }, 888), document.body.click(), L.Opened = !0, I.note(""), O.stamp("Enjoy"), O.log("Enjoy Readings!", "-0"), E.dispatch("bibi:opened")
    }, 1)
}, R = {}, R.initialize = function () {
    R.Main = O.Body.insertBefore(sML.create("div", {
        id: "bibi-main"
    }), O.Body.firstElementChild), R.Sub = O.Body.insertBefore(sML.create("div", {id: "bibi-sub"}), R.Main.nextSibling), R.Main.Book = R.Main.appendChild(sML.create("div", {id: "bibi-main-book"})), E.add("bibi:scrolled", function () {
        R.getCurrent(), S["use-cookie"] && O.Cookie.eat(B.ID, {
            Position: {
                SpreadIndex: R.Current.Pages.StartPage.Spread.SpreadIndex,
                PageProgressInSpread: R.Current.Pages.StartPage.PageIndexInSpread / R.Current.Pages.StartPage.Spread.Pages.length
            }
        })
    }), E.add("bibi:resized", function () {
        R.layout({Reset: !0, Setting: Option && Option.Setting ? Option.Setting : void 0})
    }), O.HTML.addEventListener(O.pointermove, R.onpointermove), E.add("bibi:loaded-item", function (e) {
        e.HTML.addEventListener(O.pointermove, R.onpointermove)
    }), I.observeTap(O.HTML).addTapEventListener(R.ontap), E.add("bibi:loaded-item", function (e) {
        I.observeTap(e.HTML).addTapEventListener(R.ontap)
    }), E.dispatch("bibi:initialized-reader")
}, R.reset = function () {
    R.Main.Book.innerHTML = R.Sub.innerHTML = "", L.Loaded = !1, R.Started = !1, R.AllItems = [], R.NonLinearItems = [], R.Spreads = [], R.Items = [], R.Pages = [], R.CoverImage = {Path: ""}, R.Current = {}
}, R.resetStage = function () {
    R.Stage = {}, R.Columned = !1, R.Main.Book.style.padding = R.Main.Book.style.width = R.Main.Book.style.height = "", R.Stage.Width = window.innerWidth, R.Stage.Height = window.innerHeight, "paged" == S.RVM ? (I.Slider && (R.Stage.Height -= O.Scrollbars.Height), R.Stage.PageGap = R.Main.Book.style["padding" + S.BASE.S] = R.Main.Book.style["padding" + S.BASE.E] = 0) : (R.Stage[S.SIZE.B] -= O.Scrollbars[S.SIZE.B] + 2 * S["spread-margin"], R.Stage.PageGap = S["spread-gap"], R.Main.Book.style["padding" + S.BASE.S] = S["spread-margin"] + "px", R.Main.Book.style["padding" + S.BASE.E] = S["spread-margin"] + "px"), R.Stage.Orientation = R.Stage.Width / R.Stage.Height > 1.4 ? "landscape" : "portrait", R.Stage.BunkoLength = Math.floor(R.Stage[S.SIZE.B] * R.DefaultPageRatio[S.AXIS.L] / R.DefaultPageRatio[S.AXIS.B]), S["book-background"] && (O.HTML.style.background = S["book-background"])
}, R.resetSpread = function (e) {
    O.stamp("Reset Spread " + e.SpreadIndex + " Start"), e.Items.forEach(function (e) {
        R.resetItem(e)
    });
    var t = e.SpreadBox;
    if (t.style["margin" + S.BASE.B] = t.style["margin" + S.BASE.A] = "", t.style["margin" + S.BASE.E] = t.style["margin" + S.BASE.S] = "auto", t.style.padding = t.style.width = t.style.height = "", "reflowable" == e.RenditionLayout || "reflowable" == S.BRL && "vertical" == S.SLA)if (2 == e.Items.length)if (R.Stage.Width > e.Items[0].ItemBox.offsetWidth + e.Items[1].ItemBox.offsetWidth)var n = e.Items[0].ItemBox.offsetWidth + e.Items[1].ItemBox.offsetWidth, i = Math.max(e.Items[0].ItemBox.offsetHeight, e.Items[1].ItemBox.style.offsetHeight); else var n = Math.max(e.Items[0].ItemBox.offsetWidth, e.Items[1].ItemBox.offsetWidth), i = e.Items[0].ItemBox.offsetHeight + e.Items[1].ItemBox.offsetHeight; else var n = e.Items[0].ItemBox.offsetWidth, i = e.Items[0].ItemBox.offsetHeight; else if (2 == e.Items.length)var n = e.Items[0].ItemBox.offsetWidth + e.Items[1].ItemBox.offsetWidth, i = Math.max(e.Items[0].ItemBox.offsetHeight, e.Items[1].ItemBox.style.offsetHeight); else var n = e.Items[0].ItemBox.offsetWidth * ("left" == e.Items[0].ItemRef["page-spread"] || "right" == e.Items[0].ItemRef["page-spread"] ? 2 : 1), i = e.Items[0].ItemBox.offsetHeight;
    t.style.width = Math.ceil(n) + "px", t.style.height = Math.ceil(i) + "px", e.style["border-radius"] = S["spread-border-radius"], e.style["box-shadow"] = S["spread-box-shadow"], O.stamp("Reset Spread " + e.SpreadIndex + " End")
}, R.DefaultPageRatio = {X: 103, Y: 148}, R.resetItem = function (e) {
    O.stamp("Reset Item " + e.ItemIndex + " Start"), O.stamp("Reset Start", e.TimeCard), E.dispatch("bibi:is-going-to:reset-item", e), e.Reset = !1, e.Pages = [], e.scrolling = "no", e.Spreaded = !1, e.style.margin = e.style.padding = e.style.width = e.style.height = "", e.HTML.style[S.SIZE.b] = e.HTML.style[S.SIZE.l] = "", sML.style(e.HTML, {
        "transform-origin": "",
        transformOrigin: "",
        transform: "",
        "column-width": "",
        "column-gap": "",
        "column-rule": ""
    }), e.Columned = !1, e.ColumnBreadth = 0, e.ColumnLength = 0, e.ColumnGap = 0, e.PrePaginated ? R.resetItem.asPrePaginatedItem(e) : e.Outsourcing ? R.resetItem.asReflowableOutsourcingItem(e) : R.resetItem.asReflowableItem(e), e.Reset = !0, E.dispatch("bibi:reset-item", e), O.stamp("Reset End", e.TimeCard), O.stamp("Reset Item " + e.ItemIndex + " End")
}, R.resetItem.asReflowableItem = function (e) {
    var t = (e.ItemIndex, e.ItemRef), n = e.ItemBox, i = e.Spread, o = R.Stage[S.SIZE.B], r = R.Stage[S.SIZE.L], a = R.Stage.PageGap;
    /fill/.test(t["bibi:layout"]) || (o -= S["item-padding-" + S.BASE.s] + S["item-padding-" + S.BASE.e], r -= S["item-padding-" + S.BASE.b] + S["item-padding-" + S.BASE.a], a += S["item-padding-" + S.BASE.b] + S["item-padding-" + S.BASE.a], e.style["padding-" + S.BASE.b] = S["item-padding-" + S.BASE.b] + "px", e.style["padding-" + S.BASE.a] = S["item-padding-" + S.BASE.a] + "px", e.style["padding-" + S.BASE.s] = S["item-padding-" + S.BASE.s] + "px", e.style["padding-" + S.BASE.e] = S["item-padding-" + S.BASE.e] + "px");
    var s = o, l = r;
    if (/-tb$/.test(B.WritingMode) && "horizontal" == S.SLA && !/fill-spread/.test(t["bibi:layout"])) {
        var d = Math.floor(s * R.DefaultPageRatio[S.AXIS.L] / R.DefaultPageRatio[S.AXIS.B]), c = Math.floor((r - a) / 2);
        c >= d && (e.Spreaded = !0, l = c)
    }
    e.style[S.SIZE.b] = s + "px", e.style[S.SIZE.l] = l + "px", R.resetItem.asReflowableItem.adjustContent(e, s, l, a);
    var u = sML.UA.InternetExplorer ? e.Body["client" + S.SIZE.L] : e.HTML["scroll" + S.SIZE.L], p = Math.ceil((u + a) / (l + a));
    u = (l + a) * p - a, e.style[S.SIZE.l] = u + "px";
    var h = s, f = u + ("paged" == S.RVM && e.Spreaded && p % 2 ? a + l : 0);
    /fill/.test(t["bibi:layout"]) || (h += S["item-padding-" + S.BASE.s] + S["item-padding-" + S.BASE.e], f += S["item-padding-" + S.BASE.b] + S["item-padding-" + S.BASE.a]), n.style[S.SIZE.b] = h + "px", n.style[S.SIZE.l] = f + "px";
    for (var g = 0; p > g; g++) {
        var m = n.appendChild(sML.create("span", {className: "page"}));
        /fill/.test(t["bibi:layout"]) || (m.style["padding" + S.BASE.B] = S["item-padding-" + S.BASE.b] + "px", m.style["padding" + S.BASE.A] = S["item-padding-" + S.BASE.a] + "px", m.style["padding" + S.BASE.S] = S["item-padding-" + S.BASE.s] + "px", m.style["padding" + S.BASE.E] = S["item-padding-" + S.BASE.e] + "px"), m.style[S.SIZE.b] = s + "px", m.style[S.SIZE.l] = l + "px", m.style[S.BASE.b] = (l + a) * g + "px", m.Item = e, m.Spread = i, m.PageIndexInItem = e.Pages.length, e.Pages.push(m)
    }
    return e
}, R.resetItem.asReflowableItem.adjustContent = function (e, t, n, i) {
    E.dispatch("bibi:is-going-to:adjust-content", e);
    var o = sML.appendStyleRule("*", "word-wrap: break-word;", e.contentDocument);
    R.resetItem.asReflowableItem.adjustContent.fitImages(e, t, n), R.resetItem.asReflowableItem.adjustContent.columify(e, t, n, i), S["page-breaking"] && R.resetItem.asReflowableItem.adjustContent.breakPages(e, t), sML.deleteStyleRule(o, e.contentDocument)
}, R.resetItem.asReflowableItem.adjustContent.fitImages = function (e, t, n) {
    sML.each(e.Body.getElementsByTagName("img"), function () {
        if (this.Bibi && this.Bibi.DefaultStyle) {
            this.style.width = this.Bibi.DefaultStyle.width, this.style.height = this.Bibi.DefaultStyle.height;
            var i = parseFloat(getComputedStyle(this)[S.SIZE.b]), o = parseFloat(getComputedStyle(this)[S.SIZE.l]), r = Math.floor(Math.min(parseFloat(getComputedStyle(e.Body)[S.SIZE.b]), t)), a = Math.floor(Math.min(parseFloat(getComputedStyle(e.Body)[S.SIZE.l]), n));
            (i > r || o > a) && (this.style[S.SIZE.b] = Math.floor(parseFloat(getComputedStyle(this)[S.SIZE.b]) * Math.min(r / i, a / o)) + "px", this.style[S.SIZE.l] = "auto")
        }
    })
}, R.resetItem.asReflowableItem.adjustContent.columify = function (e, t, n, i) {
    ("paged" == S.RVM || e.HTML["offset" + S.SIZE.B] > t) && (R.Columned = e.Columned = !0, e.ColumnBreadth = t, e.ColumnLength = n, e.ColumnGap = i, e.HTML.style[S.SIZE.b] = t + "px", e.HTML.style[S.SIZE.l] = n + "px", sML.style(e.HTML, {
        "column-fill": "auto",
        "column-width": e.ColumnLength + "px",
        "column-gap": e.ColumnGap + "px",
        "column-rule": ""
    }))
}, R.resetItem.asReflowableItem.adjustContent.breakPages = function (e, t) {
    var n;
    n = e.Body["offset" + S.SIZE.B] <= t ? ["vertical" == S.SLA ? "Top" : "Left", window["inner" + S.SIZE.L], S.SIZE.L, S.SIZE.l, S.BASE.a] : ["vertical" == S.SLA ? "Left" : "Top", t, S.SIZE.B, S.SIZE.b, S.BASE.e], sML.each(e.contentDocument.querySelectorAll("html>body *"), function () {
        var e = getComputedStyle(this);
        if ("always" == e.pageBreakBefore || "always" == e.pageBreakAfter) {
            this.BibiPageBreakerBefore && (this.BibiPageBreakerBefore.style[n[3]] = ""), this.BibiPageBreakerAfter && (this.BibiPageBreakerAfter.style[n[3]] = "");
            for (var t = this, i = t["offset" + n[0]], o = 0; t.offsetParent;)t = t.offsetParent, i += t["offset" + n[0]];
            "rtl" == S.SLD && (i = window.innerWidth + -1 * i - this["offset" + n[2]]), "always" == e.pageBreakBefore && (this.BibiPageBreakerBefore || (this.BibiPageBreakerBefore = this.parentNode.insertBefore(sML.create("span", {className: "bibi-page-breaker-before"}, {display: "block"}), this)), o = n[1] - i % n[1], o == n[1] && (o = 0), this.BibiPageBreakerBefore.style[n[3]] = o + "px"), "always" == e.pageBreakAfter && (i += o + this["offset" + n[2]], this.style["margin-" + n[4]] = 0, this.BibiPageBreakerAfter || (this.BibiPageBreakerAfter = this.parentNode.insertBefore(sML.create("span", {className: "bibi-page-breaker-after"}, {display: "block"}), this.nextSibling)), o = n[1] - i % n[1], o == n[1] && (o = 0), this.BibiPageBreakerAfter.style[n[3]] = o + "px")
        }
    })
}, R.resetItem.asReflowableOutsourcingItem = function (e, t) {
    var n = (e.ItemIndex, e.ItemRef), i = e.ItemBox, o = e.Spread;
    e.style.margin = "auto", e.style.padding = 0;
    var r = R.Stage[S.SIZE.B], a = R.Stage[S.SIZE.L], s = r, l = a;
    if ("horizontal" == S.SLA && !/fill-spread/.test(n["bibi:layout"])) {
        var d = Math.floor(s * R.DefaultPageRatio[S.AXIS.L] / R.DefaultPageRatio[S.AXIS.B]), c = Math.floor((a - R.Stage.PageGap) / 2);
        c > d && (e.Spreaded = !0, l = c)
    }
    if (e.style[S.SIZE.b] = i.style[S.SIZE.b] = s + "px", e.style[S.SIZE.l] = i.style[S.SIZE.l] = l + "px", e.ImageItem) {
        if (e.Body["scroll" + S.SIZE.B] <= s && e.Body["scroll" + S.SIZE.L] <= l) {
            var u = getComputedStyle(e.Body);
            e.style.width = e.Body.offsetWidth + parseFloat(u.marginLeft) + parseFloat(u.marginRight) + "px"
        } else {
            if ("ttb" == S.SLD && e.Body["scroll" + S.SIZE.B] > s || "horizontal" == S.SLA && e.Body["scroll" + S.SIZE.L] > l)var p = /rl/.test(e.HTML.WritingMode) ? "100% 0" : "0 0"; else var p = "50% 0";
            var h = Math.floor(100 * Math.min(s / e.Body["scroll" + S.SIZE.B], l / e.Body["scroll" + S.SIZE.L])) / 100;
            sML.style(e.HTML, {"transform-origin": p, transform: "scale(" + h + ")"})
        }
        sML.each(e.Body.getElementsByTagName("img"), function () {
            var e = this;
            e.style.maxWidth = "none", setTimeout(function () {
                e.style.maxWidth = ""
            }, 0)
        })
    } else if (e.FrameItem) {
        var f = e.Body.getElementsByTagName("iframe")[0];
        f.style[S.SIZE.b] = f.style[S.SIZE.l] = "100%"
    }
    var g = i.appendChild(sML.create("span", {className: "page"}));
    return g.style[S.SIZE.b] = s + "px", g.style[S.SIZE.l] = l + "px", g.style[S.BASE.b] = 0, g.Item = e, g.Spread = o, g.PageIndexInItem = e.Pages.length, e.Pages.push(g), e
}, R.resetItem.asPrePaginatedItem = function (e) {
    var t = (e.ItemIndex, e.ItemRef), n = e.ItemBox, i = e.Spread;
    e.HTML.style.margin = e.HTML.style.padding = e.Body.style.margin = e.Body.style.padding = 0;
    var o = R.Stage[S.SIZE.B], r = R.Stage[S.SIZE.L], a = o, s = r;
    if (e.style.padding = 0, e.Scale) {
        var l = e.Scale;
        delete e.Scale
    } else {
        var l = 1;
        if ("pre-paginated" == S.BRL && "vertical" == S.SLA || R.Stage.Orientation == t["rendition:spread"] || "both" == t["rendition:spread"]) {
            var d = {Width: t.viewport.width, Height: t.viewport.height};
            e.SpreadPair ? d.Width += e.SpreadPair.ItemRef.viewport.width : "right" != t["page-spread"] && "left" != t["page-spread"] || (d.Width += d.Width), l = Math.min(a / d[S.SIZE.B], s / d[S.SIZE.L])
        } else l = Math.min(a / t.viewport[S.SIZE.b], s / t.viewport[S.SIZE.l]);
        e.SpreadPair && (e.SpreadPair.Scale = l)
    }
    s = Math.floor(t.viewport[S.SIZE.l] * l), a = Math.floor(t.viewport[S.SIZE.b] * (s / t.viewport[S.SIZE.l])), n.style[S.SIZE.l] = e.style[S.SIZE.l] = s + "px", n.style[S.SIZE.b] = e.style[S.SIZE.b] = a + "px";
    var c = /rl/.test(e.HTML.WritingMode) ? "100% 0" : "0 0";
    sML.style(e.HTML, {
        width: t.viewport.width + "px",
        height: t.viewport.height + "px",
        "transform-origin": c,
        transformOrigin: c,
        transform: "scale(" + l + ")"
    });
    var u = n.appendChild(sML.create("span", {className: "page"}));
    return "right" == t["page-spread"] ? u.style.right = 0 : u.style.left = 0, u.style[S.SIZE.b] = a + "px", u.style[S.SIZE.l] = s + "px", u.Item = e, u.Spread = i, u.PageIndexInItem = e.Pages.length, e.Pages.push(u), e
}, R.resetPages = function () {
    return R.Pages.forEach(function (e) {
        e.parentNode.removeChild(e), delete e
    }), R.Pages = [], R.Spreads.forEach(function (e) {
        e.Pages = [], e.Items.forEach(function (t) {
            t.Pages.forEach(function (t) {
                t.PageIndexInSpread = e.Pages.length, e.Pages.push(t), t.PageIndex = R.Pages.length, R.Pages.push(t), t.id = "page-" + sML.String.pad(t.PageIndex + 1, 0, B.FileDigit)
            })
        })
    }), R.Pages
}, R.resetNavigation = function () {
}, R.layoutSpread = function (e) {
    O.stamp("Layout Spread " + e.SpreadIndex + " Start");
    var t = e.SpreadBox;
    if (t.style.padding = "", t.PaddingBefore = t.PaddingAfter = 0, "horizontal" == S.SLA && t.offsetHeight < R.Stage[S.SIZE.B]) {
        var n = Math.floor((R.Stage[S.SIZE.B] - t.offsetHeight) / 2), i = R.Stage[S.SIZE.B] - (n + t.offsetHeight);
        t.style.paddingTop = n + "px", t.style.paddingBottom = i + "px"
    }
    if ("pre-paginated" == S.BRL) {
        if (R.Stage[S.SIZE.L] >= t["offset" + S.SIZE.L])t.PaddingBefore = t.PaddingAfter = Math.ceil((R.Stage[S.SIZE.L] - t["offset" + S.SIZE.L]) / 2); else {
            var o = e.Items[0];
            R.Stage[S.SIZE.L] >= o["offset" + S.SIZE.L] && (t.PaddingBefore = Math.ceil((R.Stage[S.SIZE.L] - o["offset" + S.SIZE.L]) / 2));
            var r = e.Items[e.Items.length - 1];
            R.Stage[S.SIZE.L] >= r["offset" + S.SIZE.L] && (t.PaddingAfter = Math.ceil((R.Stage[S.SIZE.L] - r["offset" + S.SIZE.L]) / 2))
        }
        if (0 != e.SpreadIndex) {
            var a = R.Spreads[e.SpreadIndex - 1].SpreadBox;
            t.PaddingBefore = t.PaddingBefore - a.PaddingAfter, t.PaddingBefore < I.Menu.offsetHeight && (t.PaddingBefore = I.Menu.offsetHeight)
        }
    } else"paged" == S.RVM ? 0 == e.SpreadIndex || (t.PaddingBefore = R.Stage.PageGap) : (0 == e.SpreadIndex ? t.PaddingBefore = Math.floor((R.Stage[S.SIZE.L] - t["offset" + S.SIZE.L]) / 2) : t.PaddingBefore = R.Stage.PageGap, e.SpreadIndex == R.Spreads.length - 1 && (t.PaddingAfter = Math.ceil((R.Stage[S.SIZE.L] - t["offset" + S.SIZE.L]) / 2)));
    t.PaddingBefore > 0 && (t.style["padding" + S.BASE.B] = t.PaddingBefore + "px"), t.PaddingAfter > 0 && (t.style["padding" + S.BASE.A] = t.PaddingAfter + "px");
    var s = 0;
    R.Spreads.forEach(function (e) {
        s += e.SpreadBox["offset" + S.SIZE.L]
    }), R.Main.Book.style[S.SIZE.b] = "", R.Main.Book.style[S.SIZE.l] = s + "px", O.stamp("Layout Spread " + e.SpreadIndex + " End")
}, R.layout = function (e) {
    if (R.Layouting)return !1;
    if (R.Layouting = !0, O.log("Laying out...", "*:"), O.stamp("Layout Start"), window.removeEventListener(O.resize, R.onresize), R.Main.removeEventListener("scroll", R.onscroll), O.Busy = !0, sML.addClass(O.HTML, "busy"), sML.addClass(O.HTML, "layouting"), I.note("Layouting..."), e || (e = {}), !e.Destination) {
        R.getCurrent();
        var t = R.Current.Pages.StartPage;
        e.Destination = {
            SpreadIndex: t.Spread.SpreadIndex,
            PageProgressInSpread: t.PageIndexInSpread / t.Spread.Pages.length
        }
    }
    e.Setting && S.update(e.Setting), O.log(['reader-view-mode: "' + S.RVM + '"', 'spread-layout-direction: "' + S.SLD + '"', 'apparent-reading-direction: "' + S.ARD + '"'].join(" / "), "-*"), (e.Reset || R.ToRelayout) && (R.ToRelayout = !1, R.resetStage(), R.Spreads.forEach(function (e) {
        R.resetSpread(e)
    }), R.resetPages(), R.resetNavigation()), R.Spreads.forEach(function (e) {
        R.layoutSpread(e)
    }), R.Columned = !1;
    for (var n = 0, i = R.Items.length; i > n; n++) {
        var o = R.Items[n].HTML.style;
        if (o["-webkit-column-width"] || o["-moz-column-width"] || o["-ms-column-width"] || o["column-width"]) {
            R.Columned = !0;
            break
        }
    }
    return R.focus(e.Destination, {Duration: 0}), O.Busy = !1, sML.removeClass(O.HTML, "busy"), sML.removeClass(O.HTML, "layouting"), I.note(""), window.addEventListener(O.resize, R.onresize), R.Main.addEventListener("scroll", R.onscroll), R.Layouting = !1, "function" == typeof e.callback && e.callback(), O.stamp("Layout End"), O.log("Laid out.", "/*"), E.dispatch("bibi:laid-out"), S
}, R.onscroll = function () {
    L.Opened && (R.Scrolling || sML.addClass(O.HTML, "scrolling"), R.Scrolling = !0, E.dispatch("bibi:scroll"), clearTimeout(R.Timer_onscrolled), R.Timer_onscrolled = setTimeout(function () {
        R.Scrolling = !1, sML.removeClass(O.HTML, "scrolling"), E.dispatch("bibi:scrolled")
    }, 123))
}, R.onresize = function () {
    L.Opened && (R.Resizing || sML.addClass(O.HTML, "resizing"), R.Resizing = !0, E.dispatch("bibi:resize"), clearTimeout(R.Timer_onresized), clearTimeout(R.Timer_afterresized), R.Timer_onresized = setTimeout(function () {
        O.Busy = !0, sML.addClass(O.HTML, "busy"), R.Timer_afterresized = setTimeout(function () {
            E.dispatch("bibi:resized"), O.Busy = !1, R.Resizing = !1, sML.removeClass(O.HTML, "busy"), sML.removeClass(O.HTML, "resizing")
        }, 100)
    }, O.Mobile ? 444 : 222))
}, R.ontap = function (e) {
    E.dispatch("bibi:tapped", e)
}, R.onpointermove = function (e) {
    var t = O.getBibiEventCoord(e), n = R.onpointermove.PreviousCoord;
    n.X != t.X || n.Y != t.Y ? E.dispatch("bibi:moved-pointer", e) : E.dispatch("bibi:stopped-pointer", e), R.onpointermove.PreviousCoord = t
}, R.onpointermove.PreviousCoord = {X: 0, Y: 0}, R.onwheel = function (e) {
    if (e.preventDefault(), Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        var t = {}, n = R.onwheel.PreviousWheels, i = n.length;
        t.Dir = (e.deltaX < 0 ? -1 : 1) * ("rtl" == S.ARD ? -1 : 1), t.Delta = Math.abs(e.deltaX), n[i - 1] ? t.Dir != n[i - 1].Dir ? (t.Accel = 1, i >= 3 && n[i - 2].Dir != t.Dir && n[i - 3].Dir != t.Dir && (t.Wheeled = "reverse")) : t.Delta > n[i - 1].Delta ? (t.Accel = 1, i >= 3 && -1 == n[i - 1].Accel && -1 == n[i - 2].Accel && -1 == n[i - 3].Accel && (t.Wheeled = "serial")) : t.Delta < n[i - 1].Delta ? t.Accel = -1 : t.Accel = n[i - 1].Accel : (t.Accel = 1, t.Wheeled = "start"), t.Wheeled && E.dispatch("bibi:wheeled", t), i >= 3 && n.shift(), n.push(t)
    }
    clearTimeout(R.onwheel.Timer_stop), R.onwheel.Timer_stop = setTimeout(function () {
        R.onwheel.PreviousWheels = []
    }, 192)
}, R.onwheel.PreviousWheels = [], R.changeView = function (e) {
    return S["fix-reader-view-mode"] || "string" != typeof e || S.RVM == e || !/^(paged|horizontal|vertical)$/.test(e) ? !1 : (L.Opened ? (I.Panel.close(), I.SubPanels.forEach(function (e) {
        e.close()
    }), I.Menu.close(), I.Slider && I.Slider.close(), O.Busy = !0, sML.addClass(O.HTML, "busy"), setTimeout(function () {
        "paged" != e && R.Spreads.forEach(function (e) {
            e.style.opacity = ""
        }), R.layout({
            Reset: !0, Setting: {"reader-view-mode": e}, callback: function () {
                E.dispatch("bibi:changed-view", e), sML.removeClass(O.HTML, "busy"), O.Busy = !1
            }
        })
    }, 888)) : (S.update({"reader-view-mode": e}), L.play()), void(S["use-cookie"] && O.Cookie.eat(B.ID, {RVM: e})))
}, R.getCurrentPages = function () {
    var e = sML.Coord.getScrollCoord(R.Main), t = sML.Coord.getClientSize(R.Main);
    e = {
        Left: e.X,
        Right: e.X + t.Width,
        Top: e.Y,
        Bottom: e.Y + t.Height
    }, e.Before = e[S.BASE.B] / R.Scale, e.After = e[S.BASE.A] / R.Scale;
    var n = [], i = [], o = [], r = 0, a = !1;
    R.Pages.forEach(function (t) {
        if (!a) {
            var s = sML.getCoord(t);
            s.Before = s[S.BASE.B], s.After = s[S.BASE.A];
            var l = Math.min(e.After * S.AXIS.PM, s.After * S.AXIS.PM) - Math.max(e.Before * S.AXIS.PM, s.Before * S.AXIS.PM), d = 0 >= l || !s[S.SIZE.L] || isNaN(l) ? 0 : Math.round(l / s[S.SIZE.L] * 100);
            0 >= d ? n.length && (a = !0) : d > r ? (n = [t], i = [d], o = [R.getCurrentPages.getStatus(d, s, e)], r = d) : d == r && (n.push(t), i.push(d), o.push(R.getCurrentPages.getStatus(d, s, e)))
        }
    });
    var s = {
        Ratio: i,
        Status: o,
        StartPage: n[0],
        StartPageRatio: i[0],
        StartPageStatus: o[0],
        EndPage: n[n.length - 1],
        EndPageRatio: i[i.length - 1],
        EndPageStatus: o[o.length - 1]
    };
    for (var l in s)n[l] = s[l];
    return n
}, R.getCurrentPages.getStatus = function (e, t, n) {
    if (e >= 100)return "including";
    var i = [];
    window["inner" + S.SIZE.L] < t[S.SIZE.L] && i.push("oversize");
    var o = n.Before, r = n.After;
    return o * S.AXIS.PM < t.Before * S.AXIS.PM && i.push("entering"), o * S.AXIS.PM == t.Before * S.AXIS.PM && i.push("entered"), r * S.AXIS.PM == t.After * S.AXIS.PM && i.push("passsing"), r * S.AXIS.PM > t.After * S.AXIS.PM && i.push("passed"), i.join(" ")
}, R.getCurrent = function () {
    return R.Current.Pages = R.getCurrentPages(), R.Current.Page = R.Current.Pages.EndPage, R.Pages.forEach(function (e) {
        [e, e.Item, e.Item.ItemBox, e.Spread, e.Spread.SpreadBox].forEach(function (e) {
            sML.removeClass(e, "current"), sML.addClass(e, "not-current")
        })
    }), R.Current.Pages.forEach(function (e) {
        [e, e.Item, e.Item.ItemBox, e.Spread, e.Spread.SpreadBox].forEach(function (e) {
            sML.removeClass(e, "not-current"), sML.addClass(e, "current")
        })
    }), R.Current
}, R.focus = function (e, t) {
    if (R.Moving)return !1;
    if (e = R.focus.hatchDestination(e), !e)return !1;
    R.Moving = !0;
    var n = 0;
    "reflowable" == S["book-rendition-layout"] ? "head" == e.Edge ? n = "rtl" != S.SLD ? 0 : R.Main.Book["offset" + [S.SIZE.L]] - sML.Coord.getClientSize(R.Main)[S.SIZE.L] : "foot" == e.Edge ? n = "rtl" == S.SLD ? 0 : R.Main.Book["offset" + [S.SIZE.L]] - sML.Coord.getClientSize(R.Main)[S.SIZE.L] : (n = O.getElementCoord(e.Page)[S.AXIS.L], "after" == e.Side && (n += (e.Page["offset" + S.SIZE.L] - R.Stage[S.SIZE.L]) * S.AXIS.PM), "rtl" == S.SLD && (n += e.Page.offsetWidth - R.Stage.Width)) : R.Stage[S.SIZE.L] > e.Page.Spread["offset" + S.SIZE.L] ? (n = O.getElementCoord(e.Page.Spread)[S.AXIS.L], n -= Math.floor((R.Stage[S.SIZE.L] - e.Page.Spread["offset" + S.SIZE.L]) / 2)) : (n = O.getElementCoord(e.Page)[S.AXIS.L], R.Stage[S.SIZE.L] > e.Page["offset" + S.SIZE.L] && (n -= Math.floor((R.Stage[S.SIZE.L] - e.Page["offset" + S.SIZE.L]) / 2))), "number" == typeof e.TextNodeIndex && R.selectTextLocation(e);
    var i = {Frame: R.Main, X: 0, Y: 0};
    return i[S.AXIS.L] = n * R.Scale, t || (t = {}), sML.scrollTo(i, {
        Duration: "paged" == S.RVM ? 0 : t.Duration,
        callback: function () {
            R.getCurrent(), R.Moving = !1, t.callback && t.callback()
        }
    }), !1
}, R.focus.hatchDestination = function (e) {
    return e ? ("number" == typeof e || "string" == typeof e && /^\d+$/.test(e) ? e = R.getBibiToDestination(e) : "string" == typeof e ? "head" == e || "foot" == e ? e = {Edge: e} : X.EPUBCFI && (e = X.EPUBCFI.getDestination(e)) : e.tagName && (e = "number" == typeof e.PageIndex ? {Page: e} : "number" == typeof e.ItemIndex ? {Item: e} : "number" == typeof e.SpreadIndex ? {Spread: e} : {Element: e}), e.Page && !e.Page.parentElement && delete e.Page, e.Item && !e.Item.parentElement && delete e.Item, e.Spread && !e.Spread.parentElement && delete e.Spread, e.Element && !e.Element.parentElement && delete e.Element, "string" == typeof e.Edge ? "head" == e.Edge ? e.Page = R.Pages[0] : (e.Page = R.Pages[R.Pages.length - 1], e.Edge = "foot") : (e.Element || (e.Item || ("number" == typeof e.ItemIndexInAll ? e.Item = R.AllItems[e.ItemIndexInAll] : "number" == typeof e.ItemIndex ? e.Item = R.Items[e.ItemIndex] : (e.Spread || "number" != typeof e.SpreadIndex || (e.Spread = R.Spreads[e.SpreadIndex]), e.Spread && ("number" == typeof e.PageIndexInSpread ? e.Page = e.Spread.Pages[e.PageIndexInSpread] : "number" == typeof e.ItemIndexInSpread ? e.Item = e.Spread.Items[e.ItemIndexInSpread] : e.Item = e.Spread.Items[0]))), e.Item && "string" == typeof e.ElementSelector && (e.Element = e.Item.contentDocument.querySelector(e.ElementSelector))), e.Element ? e.Page = R.focus.getNearestPageOfElement(e.Element) : e.Page || ("number" == typeof e.PageIndexInSpread ? e.Page = e.Spread.Pages[e.PageIndexInSpread] : "number" == typeof e.PageProgressInSpread ? e.Page = e.Spread.Pages[Math.floor(e.Spread.Pages.length * e.PageProgressInSpread)] : e.Page = e.Item.Pages[0])), e.Page ? (e.Item = e.Page.Item, e.Spread = e.Page.Spread, e) : null) : null
}, R.focus.getNearestPageOfElement = function (e) {
    var t = e.ownerDocument.body.Item;
    if (!t)return R.Pages[0];
    if (t.Columned) {
        sML.style(t.HTML, {"column-width": ""});
        var n = O.getElementCoord(e)[S.AXIS.B];
        "rtl" == S.PPD && "vertical" == S.SLA && (n = t.offsetWidth - (S["item-padding-left"] + S["item-padding-right"]) - n - e.offsetWidth), sML.style(t.HTML, {"column-width": t.ColumnLength + "px"});
        var i = t.Pages[Math.ceil(n / t.ColumnBreadth - 1)]
    } else {
        var n = O.getElementCoord(e)[S.AXIS.L];
        "rtl" == S.SLD && "horizontal" == S.SLA && (n = t.HTML.offsetWidth - n - e.offsetWidth);
        for (var i = t.Pages[0], o = 0, r = t.Pages.length; r > o; o++)if (n -= t.Pages[o]["offset" + S.SIZE.L], 0 >= n) {
            i = t.Pages[o];
            break
        }
    }
    return i
}, R.selectTextLocation = function (e) {
    if ("number" == typeof e.TextNodeIndex) {
        var t = e.Element.childNodes[e.TextNodeIndex];
        if (t && t.textContent) {
            var n = {Start: {Node: t, Index: 0}, End: {Node: t, Index: t.textContent.length}};
            if (e.TermStep)if (e.TermStep.Preceding || e.TermStep.Following) {
                if (n.Start.Index = e.TermStep.Index, n.End.Index = e.TermStep.Index, e.TermStep.Preceding && (n.Start.Index -= e.TermStep.Preceding.length), e.TermStep.Following && (n.End.Index += e.TermStep.Following.length), n.Start.Index < 0 || t.textContent.length < n.End.Index)return;
                if (t.textContent.substr(n.Start.Index, n.End.Index - n.Start.Index) != e.TermStep.Preceding + e.TermStep.Following)return
            } else if (e.TermStep.Side && "a" == e.TermStep.Side) {
                for (n.Start.Node = t.parentNode.firstChild; n.Start.Node.childNodes.length;)n.Start.Node = n.Start.Node.firstChild;
                n.End.Index = e.TermStep.Index - 1
            } else {
                for (n.Start.Index = e.TermStep.Index, n.End.Node = t.parentNode.lastChild; n.End.Node.childNodes.length;)n.End.Node = n.End.Node.lastChild;
                n.End.Index = n.End.Node.textContent.length
            }
            return sML.select(n)
        }
    }
}, R.move = function (e, t) {
    if (R.Moving || !L.Opened || isNaN(e))return !1;
    if (e *= 1, -1 != e && (e = 1), e > 0)var n = "EndPage", i = "before"; else var n = "StartPage", i = "after";
    R.getCurrent();
    var o = R.Current.Pages[n];
    if (R.Columned || "pre-paginated" == S.BRL || o.Item.PrePaginated || o.Item.Outsourcing || 1 == o.Item.Pages.length || 0 > e && 0 == o.PageIndexInItem || e > 0 && o.PageIndexInItem == o.Item.Pages.length - 1) {
        var r = R.Current.Pages[n + "Status"], a = R.Current.Pages[n + "Ratio"];
        /(oversize)/.test(r) ? e > 0 ? a >= 90 ? i = "before" : /entering/.test(r) ? (i = "before", e = 0) : /entered/.test(r) && (i = "after", e = 0) : a >= 90 ? i = "after" : /passing/.test(r) ? (i = "before", e = 0) : /passed/.test(r) && (i = "after", e = 0) : e > 0 ? /enter/.test(r) && (i = "before", e = 0) : /pass/.test(r) && (i = "after", e = 0);
        var s = o.PageIndex + e;
        0 > s ? s = 0 : s > R.Pages.length - 1 && (s = R.Pages.length - 1);
        var l = R.Pages[s];
        "pre-paginated" == S.BRL && l.Item.SpreadPair && "horizontal" == S.SLA && R.Stage[S.SIZE.L] > l.Spread["offset" + S.SIZE.L] && (0 > e && 0 == l.PageIndexInSpread && (l = l.Spread.Pages[1]), e > 0 && 1 == l.PageIndexInSpread && (l = l.Spread.Pages[0])), R.focus({
            Page: l,
            Side: i
        }, t)
    } else {
        R.Moving = !0;
        var d = {Frame: R.Main, X: 0, Y: 0}, c = sML.Coord.getScrollCoord(R.Main);
        switch (S.SLD) {
            case"ttb":
                d.Y = c.Y + (R.Stage.Height + R.Stage.PageGap) * e;
                break;
            case"ltr":
                d.X = c.X + (R.Stage.Width + R.Stage.PageGap) * e;
                break;
            case"rtl":
                d.X = c.X + (R.Stage.Width + R.Stage.PageGap) * e * -1
        }
        sML.scrollTo(d, {
            callback: function () {
                R.getCurrent(), R.Moving = !1
            }
        })
    }
    E.dispatch("bibi:moved", e)
}, R.page = R.scroll = R.move, R.to = function (e) {
    return R.focus(R.getBibiToDestination(e))
}, R.getBibiToDestination = function (e) {
    if ("number" == typeof e && (e = "" + e), "string" != typeof e || !/^[1-9][0-9]*(-[1-9][0-9]*(\.[1-9][0-9]*)*)?$/.test(e))return null;
    var t = "", n = e.split("-"), i = parseInt(n[0]) - 1, o = n[1] ? n[1] : null;
    return o && o.split(".").forEach(function (e) {
        t += ">*:nth-child(" + e + ")"
    }), {BibitoString: e, ItemIndexInAll: i, ElementSelector: t ? "body" + t : void 0}
}, R.Scale = 1, R.zoom = function (e) {
    ("number" != typeof e || 0 >= e) && (e = 1), R.getCurrent();
    var t = R.Current.Pages.StartPage;
    sML.style(R.Main.Book, {"transform-origin": "rtl" == S.SLD ? "100% 0" : "0 0"}), 1 == e ? (O.HTML.style.overflow = "", sML.style(R.Main.Book, {transform: ""})) : (sML.style(R.Main.Book, {transform: "scale(" + e + ")"}), O.HTML.style.overflow = "auto"), setTimeout(function () {
        R.focus({Page: t}, {Duration: 0})
    }, 0), R.Scale = e
}, I = {}, I.initialize = function () {
    I.createNotifier(), I.createVeil(), I.createPanel(), I.createMenu(), I.createHelp(), I.createPoweredBy(), I.createNombre(), I.createSlider(), I.createArrows(), I.createKeyListener(), I.createSwiper(), I.createSpinner()
}, I.createNotifier = function () {
    I.Notifier = O.Body.appendChild(sML.create("div", {id: "bibi-notifier"})), I.Notifier.Board = I.Notifier.appendChild(sML.create("div", {id: "bibi-notifier-board"})), I.note = function (e, t, n) {
        clearTimeout(I.note.Timer), e ? I.note.Time = "number" == typeof t ? t : O.Busy ? 9999 : 2222 : I.note.Time = 0, I.Notifier.Board.innerHTML = "<p" + (n ? ' class="error"' : "") + ">" + e + "</p>", sML.addClass(O.HTML, "notifier-shown"), I.note.Timer = setTimeout(function () {
            sML.removeClass(O.HTML, "notifier-shown")
        }, I.note.Time), O.Mobile || (O.statusClearer && clearTimeout(O.statusClearer), window.status = "BiB/i: " + e, O.statusClearer = setTimeout(function () {
            window.status = ""
        }, I.note.Time))
    }
}, I.createVeil = function () {
    I.Veil = I.setToggleAction(O.Body.appendChild(sML.create("div", {id: "bibi-veil"})), {
        onopened: function () {
            sML.addClass(O.HTML, "veil-opened"), sML.removeClass(this, "closed")
        }, onclosed: function () {
            sML.addClass(this, "closed"), sML.removeClass(O.HTML, "veil-opened")
        }
    }), I.Veil.open(), I.Veil.Cover = I.Veil.appendChild(sML.create("div", {id: "bibi-veil-cover"}));
    var e = (O.Mobile ? "Tap" : "Click") + " to Open";
    I.Veil.PlayButton = I.Veil.appendChild(sML.create("p", {
        id: "bibi-veil-play",
        title: e,
        innerHTML: '<span class="non-visual">' + e + "</span>",
        play: function (e) {
            e.stopPropagation(), L.play(), E.dispatch("bibi:played:by-button")
        },
        hide: function () {
            this.removeEventListener("click", I.Veil.PlayButton.play), sML.style(this, {opacity: 0, cursor: "default"})
        }
    })), I.Veil.PlayButton.addEventListener("click", I.Veil.PlayButton.play), E.add("bibi:played", function () {
        I.Veil.PlayButton.hide()
    }), E.dispatch("bibi:created-veil")
}, I.createPanel = function () {
    I.Panel = O.Body.appendChild(sML.create("div", {id: "bibi-panel"})), I.setToggleAction(I.Panel, {
        onopened: function (e) {
            sML.addClass(O.HTML, "panel-opened"), E.dispatch("bibi:opened-panel")
        }, onclosed: function (e) {
            sML.removeClass(O.HTML, "panel-opened"), E.dispatch("bibi:closed-panel")
        }
    }), E.add("bibi:commands:open-panel", function (e) {
        I.Panel.open(e)
    }), E.add("bibi:commands:close-panel", function (e) {
        I.Panel.close(e)
    }), E.add("bibi:commands:toggle-panel", function (e) {
        I.Panel.toggle(e)
    }), I.observeTap(I.Panel, {StopPropagation: !0}).addTapEventListener(function () {
        E.dispatch("bibi:commands:toggle-panel")
    }), sML.appendStyleRule("html.page-rtl div#bibi-panel:after", "bottom: " + O.Scrollbars.Height + "px;"), I.Panel.BookInfo = I.Panel.appendChild(sML.create("div", {id: "bibi-panel-bookinfo"})), I.Panel.BookInfo.Box = I.Panel.BookInfo.appendChild(sML.create("div", {id: "bibi-panel-bookinfo-box"})), I.Panel.BookInfo.Navigation = I.Panel.BookInfo.Box.appendChild(sML.create("div", {id: "bibi-panel-bookinfo-navigation"})), I.Panel.BookInfo.Cover = I.Panel.BookInfo.Box.appendChild(sML.create("div", {id: "bibi-panel-bookinfo-cover"})), E.dispatch("bibi:created-panel")
}, I.createMenu = function () {
    I.Menu = O.Body.appendChild(sML.create("div", {
        id: "bibi-menu", on: {
            click: function (e) {
                e.stopPropagation()
            }
        }
    })), I.setHoverActions(I.Menu), I.setToggleAction(I.Menu, {
        onopened: function () {
            sML.addClass(O.HTML, "menu-opened"), E.dispatch("bibi:opened-menu")
        }, onclosed: function () {
            sML.removeClass(O.HTML, "menu-opened"), E.dispatch("bibi:closed-menu")
        }
    }), E.add("bibi:closed-slider", function () {
        I.Menu.close()
    }), E.add("bibi:commands:open-menu", function (e) {
        I.Menu.open(e)
    }), E.add("bibi:commands:close-menu", function (e) {
        I.Menu.close(e)
    }), E.add("bibi:commands:toggle-menu", function (e) {
        I.Menu.toggle(e)
    }), E.add("bibi:scroll", function () {
        clearTimeout(I.Menu.Timer_cool), I.Menu.Hot || sML.addClass(I.Menu, "hot"), I.Menu.Hot = !0, I.Menu.Timer_cool = setTimeout(function () {
            I.Menu.Hot = !1, sML.removeClass(I.Menu, "hot")
        }, 1234)
    }), O.Mobile || E.add("bibi:moved-pointer", function (e) {
        var t = O.getBibiEvent(e);
        clearTimeout(I.Menu.Timer_close), t.Coord.Y < 1.5 * I.Menu.offsetHeight ? I.Menu.onhover() : I.Menu.Hover && (I.Menu.Timer_close = setTimeout(function () {
            I.Menu.onunhover()
        }, 123))
    }), E.add("bibi:tapped", function (e) {
        var t = O.getBibiEvent(e);
        if ("horizontal" == S.RVM) {
            if (t.Coord.Y > window.innerHeight - O.Scrollbars.Height)return !1
        } else if ("vertical" == S.RVM && t.Coord.X > window.innerWidth - O.Scrollbars.Width)return !1;
        if (t.Target.tagName) {
            if (/bibi-slider/.test(t.Target.className + t.Target.id))return !1;
            if (/^a$/i.test(t.Target.tagName))return !1
        }
        switch (S.ARD) {
            case"ttb":
                return "middle" == t.Division.Y ? E.dispatch("bibi:commands:toggle-menu") : !1;
            default:
                return "center" == t.Division.X ? E.dispatch("bibi:commands:toggle-menu") : !1
        }
    }), I.Menu.L = I.Menu.appendChild(sML.create("div", {id: "bibi-menu-l"})), I.Menu.R = I.Menu.appendChild(sML.create("div", {id: "bibi-menu-r"})), I.Menu.open(), sML.appendStyleRule(["html.view-vertical div#bibi-menu"].join(", "), "width: calc(100% - " + O.Scrollbars.Width + "px);"), sML.appendStyleRule(["html.view-vertical.panel-opened div#bibi-menu", "html.view-vertical.subpanel-opened div#bibi-menu"].join(", "), "width: 100%; padding-right: " + O.Scrollbars.Width + "px;"), I.PanelSwitch = I.createButtonGroup({
        Area: I.Menu.L,
        Sticky: !0
    }).addButton({
        Type: "toggle",
        Labels: {
            "default": {"default": "Open Menu", ja: "目次パネルを開く"},
            active: {"default": "Close Menu", ja: "目次パネルを閉じる"}
        },
        Help: !0,
        Icon: '<span class="bibi-icon bibi-icon-toggle-panel"><span class="bar-1"></span><span class="bar-2"></span><span class="bar-3"></span></span>',
        execute: function () {
            I.Panel.toggle()
        }
    }), E.add("bibi:opened-panel", function () {
        I.setButtonState(I.PanelSwitch, "active")
    }), E.add("bibi:closed-panel", function () {
        I.setButtonState(I.PanelSwitch, "")
    }), E.add("bibi:started", function () {
        sML.style(I.PanelSwitch, {display: "block"})
    }), E.dispatch("bibi:created-menu"), I.createMenu.prepareSubPanels(), I.createMenu.createSettingMenu()
}, I.createMenu.prepareSubPanels = function () {
    I.SubPanels = [], I.Shade = O.Body.appendChild(sML.create("div", {id: "bibi-shade"})), I.observeTap(I.Shade, {StopPropagation: !0}).addTapEventListener(function () {
        I.SubPanels.forEach(function (e) {
            e.close()
        }), I.Panel.close()
    })
}, I.createMenu.createSettingMenu = function () {
    I.Menu.Config = {}, I.Menu.Config.Button = I.createButtonGroup({
        Area: I.Menu.R,
        Sticky: !0
    }).addButton({
        Type: "toggle",
        Labels: {
            "default": {"default": "Setting", ja: "設定を変更"},
            active: {"default": "Close Setting-Menu", ja: "設定メニューを閉じる"}
        },
        Help: !0,
        Icon: '<span class="bibi-icon bibi-icon-setting"></span>'
    }), I.Menu.Config.SubPanel = I.createSubPanel({
        Opener: I.Menu.Config.Button,
        id: "bibi-subpanel_change-view"
    }), I.createMenu.createSettingMenu.createViewModeMenu(),
        I.createMenu.createSettingMenu.createWindowMenu()
}, I.createMenu.createSettingMenu.createViewModeMenu = function () {
    if (!S["fix-reader-view-mode"]) {
        var e = {};
        e.Item = '<span class="bibi-shape bibi-shape-item"></span>', e.Spread = '<span class="bibi-shape bibi-shape-spread">' + e.Item + e.Item + "</span>";
        var t = {};
        t.paged = '<span class="bibi-icon bibi-icon-view-paged"><span class="bibi-shape bibi-shape-spreads bibi-shape-spreads-paged">' + e.Spread + e.Spread + e.Spread + "</span></span>", t.horizontal = '<span class="bibi-icon bibi-icon-view-horizontal"><span class="bibi-shape bibi-shape-spreads bibi-shape-spreads-horizontal">' + e.Spread + e.Spread + e.Spread + "</span></span>", t.vertical = '<span class="bibi-icon bibi-icon-view-vertical"><span class="bibi-shape bibi-shape-spreads bibi-shape-spreads-vertical">' + e.Spread + e.Spread + e.Spread + "</span></span>";
        var n = function () {
            R.changeView(this.Value)
        };
        I.Menu.Config.SubPanel.ViewModeSection = I.Menu.Config.SubPanel.addSection({
            Labels: {
                "default": {
                    "default": "Choose Layout",
                    ja: "レイアウトを選択"
                }
            },
            Buttons: [{
                Type: "radio",
                Labels: {
                    "default": {
                        "default": "Each Page <small>(Flip with " + (O.Mobile ? "Tap/Swipe" : "Click/Wheel") + ")</small>",
                        ja: "ページ単位表示<small>（" + (O.Mobile ? "タップ／スワイプ" : "クリック／ホイール") + "で移動）</small>"
                    }
                },
                Notes: !0,
                Icon: t.paged,
                Value: "paged",
                execute: n
            }, {
                Type: "radio",
                Labels: {
                    "default": {
                        "default": "All Pages <small>(Horizontal Scroll)</small>",
                        ja: "全ページ表示<small>（横スクロール移動）</small>"
                    }
                },
                Notes: !0,
                Icon: t.horizontal,
                Value: "horizontal",
                execute: n
            }, {
                Type: "radio",
                Labels: {
                    "default": {
                        "default": "All Pages <small>(Vertical Scroll)</small>",
                        ja: "全ページ表示<small>（縦スクロール移動）</small>"
                    }
                },
                Notes: !0,
                Icon: t.vertical,
                Value: "vertical",
                execute: n
            }]
        }), E.add("bibi:updated-settings", function () {
            I.Menu.Config.SubPanel.ViewModeSection.ButtonGroup.Buttons.forEach(function (e) {
                I.setButtonState(e, e.Value == S.RVM ? "active" : "default")
            })
        }), E.dispatch("bibi:created-view-mode-menu")
    }
}, I.createMenu.createSettingMenu.createWindowMenu = function () {
    if (!O.Mobile && O.FullscreenEnabled || O.WindowEmbedded) {
        I.Menu.Config.SubPanel.WindowSection = I.Menu.Config.SubPanel.addSection({
            Labels: {
                "default": {
                    "default": "Window Operation",
                    ja: "ウィンドウ操作"
                }
            }
        });
        var e = I.Menu.Config.SubPanel.WindowSection.ButtonGroup;
        !O.Mobile && O.FullscreenEnabled && e.addButton({
            Type: "toggle",
            Labels: {"default": {"default": "Fullscreen View", ja: "フルスクリーンモード"}},
            Icon: '<span class="bibi-icon bibi-icon-toggle-fullscreen"></span>',
            execute: function () {
                O.FullscreenElement.Fullscreen ? sML.exitFullscreen(O.FullscreenDocument) : sML.requestFullscreen(O.FullscreenElement), O.FullscreenElement.Fullscreen ? (O.FullscreenElement.Fullscreen = !1, E.dispatch("bibi:exited-fullscreen"), sML.removeClass(O.HTML, "fullscreen")) : (O.FullscreenElement.Fullscreen = !0, E.dispatch("bibi:requested-fullscreen"), sML.addClass(O.HTML, "fullscreen"))
            }
        }), O.WindowEmbedded && e.addButton({
            Type: "link",
            Labels: {"default": {"default": "Open in New Window", ja: "あたらしいウィンドウで開く"}},
            Icon: '<span class="bibi-icon bibi-icon-open-newwindow"></span>',
            href: O.RequestedURL,
            target: "_blank"
        }), E.dispatch("bibi:created-window-menu")
    }
}, I.createButtonGroup = function (e) {
    return e && "object" == typeof e && e.Area && e.Area.tagName ? ("string" == typeof e.className && e.className || delete e.className, "string" == typeof e.id && e.id || delete e.id, e.className = "bibi-buttongroup" + (e.className ? " " + e.className : "") + (e.Sticky ? " sticky" : ""), e.Buttons = [], e.addButton = I.createButtonGroup.addButton, e.Area.appendChild(sML.create("ul", e))) : null
}, I.createButtonGroup.addButton = function (e) {
    if (!e || "object" != typeof e)return null;
    "string" == typeof e.className && e.className || delete e.className, "string" == typeof e.id && e.id || delete e.id, e.ButtonGroup = this, e.Type = "string" == typeof e.Type && /^(normal|toggle|radio|link)$/.test(e.Type) ? e.Type : "normal", e.BibiButton = !0, e.className = "bibi-button bibi-button-" + e.Type + (e.className ? " " + e.className : ""), e.Labels = I.distillPhrases(e.Labels), "undefined" == typeof e.Icon || e.Icon.tagName || ("string" == typeof e.Icon && e.Icon ? e.Icon = sML.hatch(e.Icon) : delete e.Icon);
    var t = e.ButtonGroup.appendChild(sML.create("li", {className: "bibi-buttonbox bibi-buttonbox-" + e.Type})).appendChild(sML.create("string" == typeof e.href ? "a" : "span", e));
    return t.Icon && (t.IconBox = t.appendChild(sML.create("span", {className: "bibi-button-iconbox"})), t.IconBox.appendChild(t.Icon)), t.Label = t.appendChild(sML.create("span", {className: "bibi-button-label"})), I.setFeedback(t, {
        Help: e.Help,
        StopPropagation: !0,
        PreventDefault: !t.href
    }), "function" == typeof t.execute && t.addTapEventListener(function () {
        setTimeout(function () {
            t.execute.apply(t, arguments)
        }, 0)
    }), t.ButtonGroup.Buttons.push(t), t
}, I.createSubPanel = function (e) {
    e || (e = {}), "string" == typeof e.className && e.className || delete e.className, "string" == typeof e.id && e.id || delete e.id, e.className = "bibi-subpanel" + (e.className ? " " + e.className : ""), e.Sections = [], e.addSection = I.createSubPanel.addSection;
    var t = O.Body.appendChild(sML.create("div", e));
    return t.addEventListener(O.pointerdown, function (e) {
        e.stopPropagation()
    }), t.addEventListener(O.pointerup, function (e) {
        e.stopPropagation()
    }), I.setToggleAction(t, {
        onopened: function (n) {
            I.SubPanels.forEach(function (e) {
                e != t && e.close({ForAnotherSubPanel: !0})
            }), sML.addClass(this, "opened"), sML.addClass(O.HTML, "subpanel-opened"), sML.addClass(O.HTML, "shade-opened"), clearTimeout(I.Timer_openShade), clearTimeout(I.Timer_closeShade), I.Timer_openShade = setTimeout(function () {
                sML.addClass(O.HTML, "shade-visible")
            }, 0), t.Opener && (t.Bit.adjust(t.Opener), I.setButtonState(t.Opener, "active")), e.onopened && e.onopened.apply(t, arguments)
        }, onclosed: function (n) {
            sML.removeClass(this, "opened"), n && n.ForAnotherSubPanel || (sML.removeClass(O.HTML, "subpanel-opened"), sML.removeClass(O.HTML, "shade-visible"), clearTimeout(I.Timer_openShade), clearTimeout(I.Timer_closeShade), I.Timer_closeShade = setTimeout(function () {
                sML.removeClass(O.HTML, "shade-opened")
            }, 200)), t.Opener && I.setButtonState(t.Opener, "default"), e.onclosed && e.onclosed.apply(t, arguments)
        }
    }), t.Opener && t.Opener.addTapEventListener(function () {
        t.toggle()
    }), E.add("bibi:opened-panel", function () {
        t.close()
    }), E.add("bibi:closed-panel", function () {
        t.close()
    }), t.Bit = t.appendChild(sML.create("span", {
        className: "bibi-subpanel-bit", SubPanel: t, adjust: function (e) {
            if (e) {
                var t = O.getElementCoord(e).X + e.offsetWidth / 2 - O.getElementCoord(this.SubPanel).X;
                sML.style(this.SubPanel, {transformOrigin: t + "px 0"}), sML.style(this.SubPanel.Bit, {left: t + "px"})
            }
        }
    })), I.SubPanels.push(t), t
}, I.createSubPanel.addSection = function (e) {
    var t = this, n = sML.create("div", {className: "bibi-subpanel-section"});
    return e.Labels && (n.Label = n.appendChild(sML.create("div", {className: "bibi-hgroup"})).appendChild(sML.create("p", {className: "bibi-h"})).appendChild(sML.create("span", {
        className: "bibi-h-label",
        innerHTML: I.distillPhrases(e.Labels)["default"]
    }))), n.ButtonGroup = I.createButtonGroup({Area: n}), e.Buttons && e.Buttons.length && (e.Tiled && (n.ButtonGroup.className += " bibi-tiledbuttongroup"), e.Buttons.forEach(function (e) {
        n.ButtonGroup.addButton(e)
    })), t.appendChild(n), t.Sections.push(n), n
}, I.createHelp = function () {
    I.Help = O.Body.appendChild(sML.create("div", {id: "bibi-help"})), I.Help.Message = I.Help.appendChild(sML.create("p", {
        className: "hidden",
        id: "bibi-help-message"
    })), I.Help.show = function (e) {
        clearTimeout(I.Help.Timer_deactivate1), clearTimeout(I.Help.Timer_deactivate2), sML.addClass(I.Help, "active"), I.Help.Message.innerHTML = e, setTimeout(function () {
            sML.addClass(I.Help, "shown")
        }, 0)
    }, I.Help.hide = function () {
        I.Help.Timer_deactivate1 = setTimeout(function () {
            sML.removeClass(I.Help, "shown"), I.Help.Timer_deactivate2 = setTimeout(function () {
                sML.removeClass(I.Help, "active")
            }, 200)
        }, 100)
    }, sML.appendStyleRule(["html.view-horizontal div#bibi-help", "html.page-rtl.panel-opened div#bibi-help"].join(", "), "bottom: " + O.Scrollbars.Height + "px;")
}, I.createPoweredBy = function () {
    I.PoweredBy = O.Body.appendChild(sML.create("div", {
        id: "bibi-poweredby",
        innerHTML: ["<p>", '<a href="http://bibi.epub.link" target="_blank" title="BiB/i | Web Site">', "<span>BiB/i</span>", '<img class="bibi-logo-white" alt="" src="../../bib/i/res/images/bibi-logo_white.png" />', '<img class="bibi-logo-black" alt="" src="../../bib/i/res/images/bibi-logo_black.png" />', "</a>", "</p>"].join("")
    })), sML.appendStyleRule(["html.page-rtl.panel-opened div#bibi-poweredby"].join(", "), "bottom: " + O.Scrollbars.Height + "px;")
}, I.createNombre = function () {
    I.Nombre = O.Body.appendChild(sML.create("div", {
        id: "bibi-nombre", show: function () {
            clearTimeout(I.Nombre.Timer_hot), clearTimeout(I.Nombre.Timer_vanish), sML.addClass(I.Nombre, "active"), I.Nombre.Timer_hot = setTimeout(function () {
                sML.addClass(I.Nombre, "hot")
            }, 10)
        }, hide: function () {
            clearTimeout(I.Nombre.Timer_hot), clearTimeout(I.Nombre.Timer_vanish), sML.removeClass(I.Nombre, "hot"), I.Nombre.Timer_vanish = setTimeout(function () {
                sML.removeClass(I.Nombre, "active")
            }, 255)
        }, progress: function (e) {
            clearTimeout(I.Nombre.Timer_hide), e || (e = R.getCurrent()), I.Nombre.Current.innerHTML = function () {
                var t = e.Pages.StartPage.PageIndex + 1;
                return e.Pages.StartPage != e.Pages.EndPage && (t += '<span class="delimiter">-</span>' + (e.Pages.EndPage.PageIndex + 1)), t
            }(), I.Nombre.Delimiter.innerHTML = "/", I.Nombre.Total.innerHTML = R.Pages.length, I.Nombre.Percent.innerHTML = "(" + Math.floor((e.Pages.EndPage.PageIndex + 1) / R.Pages.length * 100) + '<span class="unit">%</span>)', I.Nombre.show(), I.Nombre.Timer_hide = setTimeout(I.Nombre.hide, 1234)
        }
    })), I.Nombre.Current = I.Nombre.appendChild(sML.create("span", {id: "bibi-nombre-current"})), I.Nombre.Delimiter = I.Nombre.appendChild(sML.create("span", {id: "bibi-nombre-delimiter"})), I.Nombre.Total = I.Nombre.appendChild(sML.create("span", {id: "bibi-nombre-total"})), I.Nombre.Percent = I.Nombre.appendChild(sML.create("span", {id: "bibi-nombre-percent"})), E.add("bibi:scroll", I.Nombre.progress), E.add("bibi:resized", I.Nombre.progress), E.add("bibi:opened", function () {
        setTimeout(I.Nombre.progress, 321)
    }), S["use-slider"] && sML.appendStyleRule("html.view-paged div#bibi-nombre", "bottom: " + (O.Scrollbars.Height + 2) + "px;"), sML.appendStyleRule("html.view-horizontal div#bibi-nombre", "bottom: " + (O.Scrollbars.Height + 2) + "px;"), sML.appendStyleRule("html.view-vertical div#bibi-nombre", "right: " + (O.Scrollbars.Height + 2) + "px;")
}, I.createSlider = function () {
    S["use-slider"] && (I.Slider = O.Body.appendChild(sML.create("div", {
        id: "bibi-slider", reset: function () {
            I.Slider.Spreads.innerHTML = "", I.Slider.Pages.innerHTML = "", R.Spreads.forEach(function (e, t) {
                var n = I.Slider.Spreads.appendChild(sML.create("div", {id: "bibi-slider-spreadbit-" + (t + 1)}, {width: 1 / R.Pages.length * e.Pages.length * 100 + "%"}));
                n.style["ltr" == S.ARD ? "left" : "right"] = 100 / R.Pages.length * e.Pages[0].PageIndex + "%"
            }), R.Pages.forEach(function (e, t) {
                var n = I.Slider.Pages.appendChild(sML.create("div", {id: "bibi-slider-pagebit-" + (t + 1)}, {width: 1 / R.Pages.length * 100 + "%"}));
                n.style["ltr" == S.ARD ? "left" : "right"] = 100 / R.Pages.length * t + "%", n.addEventListener(O.pointerover, function () {
                    I.Slider.Sliding || (clearTimeout(I.Slider.Timer_PageBitPointerOut), I.Nombre.progress({
                        Pages: {
                            StartPage: R.Pages[t],
                            EndPage: R.Pages[t]
                        }
                    }))
                }), n.addEventListener(O.pointerout, function () {
                    I.Slider.Sliding || (I.Slider.Timer_PageBitPointerOut = setTimeout(function () {
                        clearTimeout(I.Nombre.Timer_hide), I.Nombre.hide()
                    }, 200))
                }), I.setFeedback(n)
            })
        }, progress: function () {
            I.Slider.Current.className = R.Current.Pages.length > 1 ? "two-pages" : "", I.Slider.Current.style.width = 100 / R.Pages.length * R.Current.Pages.length + "%", I.Slider.Current.style["ltr" == S.PPD ? "left" : "right"] = R.Current.Pages.StartPage.PageIndex / R.Pages.length * 100 + "%"
        }, slide: function (e) {
            var t = O.getBibiEvent(e);
            I.Slider.slide.SlidedX = t.Coord.X - I.Slider.slide.StartX, sML.style(I.Slider.Current, {transform: "translateX(" + I.Slider.slide.SlidedX + "px)"})
        }, startSliding: function (e) {
            e.target && e.target.id && /^bibi-slider-/.test(e.target.id) && (e.preventDefault(), I.Slider.Sliding = !0, e.target == I.Slider.Current ? (I.Slider.slide.StartX = e.pageX, I.Slider.slide.SlidedX = 0) : (I.Slider.slide.StartX = I.Slider.Current.offsetLeft + I.Slider.Current.offsetWidth / 2, I.Slider.slide.SlidedX = e.pageX - I.Slider.slide.StartX), clearTimeout(I.Slider.Timer_endSliding), sML.addClass(O.HTML, "slider-sliding"), I.Slider.addEventListener(O.pointermove, I.Slider.onpointermove), E.add("bibi:moved-pointer", I.Slider.slide))
        }, endSliding: function () {
            if (I.Slider.Sliding) {
                I.Slider.Sliding = !1, E.remove("bibi:moved-pointer", I.Slider.slide), I.Slider.removeEventListener(O.pointermove, I.Slider.onpointermove);
                var e = Math.round(R.Pages.length * I.Slider.slide.SlidedX / I.Slider.offsetWidth) * ("rtl" == S.ARD ? -1 : 1), t = R.Pages[R.Current.Pages.StartPage.PageIndex + e], n = function () {
                    sML.style(I.Slider.Current, {transform: ""}), I.Slider.Timer_endSliding = setTimeout(function () {
                        sML.removeClass(O.HTML, "slider-sliding")
                    }, 125)
                };
                t != R.Current.Pages.StartPage && t != R.Current.Pages.EndPage ? R.focus(t, {
                    Duration: 0,
                    callback: n
                }) : n()
            }
        }, activate: function () {
            I.Slider.Current.addEventListener(O.pointerover, I.Nombre.show), I.Slider.Current.addEventListener(O.pointerout, I.Nombre.hide), O.HTML.addEventListener(O.pointerdown, I.Slider.startSliding), R.Items.concat(O).forEach(function (e) {
                e.HTML.addEventListener(O.pointerup, I.Slider.endSliding)
            }), E.add("bibi:scroll", I.Slider.progress), I.Slider.progress()
        }, deactivate: function () {
            I.Slider.Current.removeEventListener(O.pointerover, I.Nombre.show), I.Slider.Current.removeEventListener(O.pointerout, I.Nombre.hide), O.HTML.removeEventListener(O.pointerdown, I.Slider.startSliding), R.Items.concat(O).forEach(function (e) {
                e.HTML.removeEventListener(O.pointerup, I.Slider.endSliding)
            }), E.remove("bibi:scroll", I.Slider.progress)
        }, getTargetPage: function (e) {
            var t = O.getBibiEvent(e).Coord.X / I.Slider.offsetWidth;
            return "rtl" == S.PPD && (t = 1 - t), R.Pages[Math.ceil(R.Pages.length * t) - 1]
        }, ontap: function (e) {
            var t = I.Slider.getTargetPage(e);
            t != R.Current.Pages.StartPage && t != R.Current.Pages.EndPage && R.focus(t, {Duration: 0})
        }, onpointermove: function (e) {
            clearTimeout(I.Nombre.Timer_hide);
            var t = I.Slider.getTargetPage(e);
            I.Nombre.progress({Pages: {StartPage: t, EndPage: t}})
        }
    })), I.Slider.Spreads = I.Slider.appendChild(sML.create("div", {id: "bibi-slider-spreads"})), I.Slider.Pages = I.Slider.appendChild(sML.create("div", {id: "bibi-slider-pages"})), I.Slider.CurrentPages = I.Slider.appendChild(sML.create("div", {id: "bibi-slider-currentpages"})), I.Slider.Current = I.Slider.CurrentPages.appendChild(sML.create("div", {id: "bibi-slider-currentpagebits"})), I.setFeedback(I.Slider.Current), I.setToggleAction(I.Slider, {
        onopened: function () {
            sML.addClass(O.HTML, "slider-opened"), E.dispatch("bibi:opened-slider")
        }, onclosed: function () {
            sML.removeClass(O.HTML, "slider-opened"), E.dispatch("bibi:closed-slider")
        }
    }), E.add("bibi:commands:open-slider", function (e) {
        I.Slider.open(e)
    }), E.add("bibi:commands:close-slider", function (e) {
        I.Slider.close(e)
    }), E.add("bibi:commands:toggle-slider", function (e) {
        I.Slider.toggle(e)
    }), E.add("bibi:tapped", function (e) {
        if (L.Opened) {
            var t = O.getBibiEvent(e);
            if (t.Target.tagName) {
                if (/bibi-slider/.test(t.Target.id))return !1;
                if (/^a$/i.test(t.Target.tagName))return !1
            }
            switch (S.ARD) {
                case"ttb":
                    return "middle" == t.Division.Y ? E.dispatch("bibi:commands:toggle-slider") : !1;
                default:
                    return "center" == t.Division.X ? E.dispatch("bibi:commands:toggle-slider") : !1
            }
        }
    }), E.add("bibi:opened", I.Slider.activate), E.add("bibi:laid-out", I.Slider.reset), E.add("bibi:closed-panel", I.Slider.close), sML.appendStyleRule("html.view-paged div#bibi-slider", "height: " + O.Scrollbars.Height + "px;"))
}, I.createArrows = function () {
    S["use-arrows"] && (I.Arrows = {
        createArrows: function () {
            I.Arrows.Back || I.Arrows.Forward || (sML.addClass(O.HTML, "arrows-active"), I.Arrows.Back = I.Arrows.back = R.Main.appendChild(sML.create("div", {
                id: "bibi-arrow-back",
                Distance: -1,
                Labels: {"default": {"default": "Back", ja: "戻る"}},
                isAvailable: function () {
                    return R.Current.Pages.StartPage != R.Pages[0] || 100 != R.Current.Pages.StartPageRatio
                }
            })), I.Arrows.Forward = I.Arrows.forward = R.Main.appendChild(sML.create("div", {
                id: "bibi-arrow-forward",
                Distance: 1,
                Labels: {"default": {"default": "Forward", ja: "進む"}},
                isAvailable: function () {
                    return R.Current.Pages.EndPage != R.Pages[R.Pages.length - 1] || 100 != R.Current.Pages.EndPageRatio
                }
            })), I.Arrows.Back.Pair = I.Arrows.Forward, I.Arrows.Forward.Pair = I.Arrows.Back, [I.Arrows.Back, I.Arrows.Forward].forEach(function (e) {
                e.Labels = I.distillPhrases(e.Labels), I.setHoverActions(e), I.setTapAction(e), I.observeTap(e, {StopPropagation: !0}).addTapEventListener(function (t) {
                    E.dispatch("bibi:commands:move", e.Distance)
                }), e.showHelp = e.hideHelp = function () {
                }
            }), O.Mobile || (E.add("bibi:moved-pointer", I.Arrows.onhover), R.Items.concat(O).forEach(function (e) {
                sML.each(e.Body.querySelectorAll("img"), function () {
                    this.addEventListener(O.pointerdown, O.preventDefault)
                })
            })), E.add("bibi:tapped", I.Arrows.go))
        }, update: function () {
            "vertical" == S.RVM ? (I.Arrows.top = I.Arrows.Back, I.Arrows.bottom = I.Arrows.Forward, I.Arrows.left = I.Arrows.right = void 0) : ("ltr" == S.PPD ? (I.Arrows.left = I.Arrows.Back, I.Arrows.right = I.Arrows.Forward) : (I.Arrows.right = I.Arrows.Back, I.Arrows.left = I.Arrows.Forward), I.Arrows.top = I.Arrows.bottom = void 0)
        }, navigate: function () {
            setTimeout(function () {
                R.getCurrent(), [I.Arrows.Back, I.Arrows.Forward].forEach(function (e) {
                    e.isAvailable() && sML.addClass(e, "glowing")
                }), setTimeout(function () {
                    [I.Arrows.Back, I.Arrows.Forward].forEach(function (e) {
                        sML.removeClass(e, "glowing")
                    })
                }, 1234)
            }, 400)
        }, check: function () {
            [I.Arrows.Back, I.Arrows.Forward].forEach(function (e) {
                e.isAvailable() ? sML.replaceClass(e, "unavailable", "available") : sML.replaceClass(e, "available", "unavailable")
            })
        }, ontap: function (e) {
            var t = "";
            switch (e) {
                case-1:
                    t = "back";
                    break;
                case 1:
                    t = "forward"
            }
            return t && I.Arrows[t] ? I.Arrows[t].ontap() : void 0
        }, isAvailable: function (e) {
            var t = e.Target;
            if ("active" == I.Panel.ToggleState)return !1;
            if ("vertical" == S.RVM) {
                if (e.Coord.X > window.innerWidth - O.Scrollbars.Width)return !1
            } else if ("horizontal" == S.RVM) {
                if (e.Coord.Y > window.innerHeight - O.Scrollbars.Height)return !1
            } else if (I.Slider && e.Coord.Y > window.innerHeight - I.Slider.offsetHeight)return !1;
            if (e.Coord.Y < 1.5 * I.Menu.offsetHeight)return !1;
            if (t.ownerDocument.documentElement == O.HTML) {
                if (t == O.HTML || t == O.Body)return !0;
                if (/^(bibi-main|bibi-arrow|bibi-help|bibi-poweredby)/.test(t.id))return !0;
                if (/^(spread|item)/.test(t.className))return !0
            } else if (!/^a$/i.test(t.tagName))return !0;
            return !1
        }, go: function (e) {
            var t = O.getBibiEvent(e);
            if (/^bibi-arrow-/.test(t.Target.id))return !1;
            if (!I.Arrows.isAvailable(t))return !1;
            var n = "vertical" == S.RVM ? t.Division.Y : t.Division.X;
            I.Arrows[n] && I.Arrows[n].isAvailable() && E.dispatch("bibi:commands:move", I.Arrows[n].Distance)
        }, onhover: function (e) {
            if (!O.Mobile) {
                var t = O.getBibiEvent(e);
                if (!I.Arrows.isAvailable(t))return I.Arrows.onunhover();
                var n = "vertical" == S.RVM ? t.Division.Y : t.Division.X;
                I.Arrows[n] && I.Arrows[n].isAvailable() ? (I.Arrows[n].onhover(), I.Arrows[n].Pair.onunhover(), t.Target.ownerDocument.documentElement.setAttribute("data-bibi-cursor", n)) : I.Arrows.onunhover()
            }
        }, onunhover: function () {
            I.Arrows.Back.onunhover(), I.Arrows.Forward.onunhover(), R.Items.concat(O).forEach(function (e) {
                e.HTML.removeAttribute("data-bibi-cursor")
            })
        }
    }, E.add("bibi:loaded-item", function (e) {
        sML.appendStyleRule("html[data-bibi-cursor]", "cursor: pointer;", e.contentDocument)
    }), E.add("bibi:opened", function () {
        I.Arrows.createArrows(), I.Arrows.update(), I.Arrows.check(), I.Arrows.navigate()
    }), E.add("bibi:updated-settings", function () {
        I.Arrows.update()
    }), E.add("bibi:laid-out", function () {
        I.Arrows.navigate()
    }), E.add("bibi:scrolled", function () {
        I.Arrows.check()
    }), E.add("bibi:commands:move", function (e) {
        I.Arrows.ontap(e)
    }))
}, I.createKeyListener = function () {
    S["use-keys"] && (I.KeyListener = {
        observe: function (e) {
            if (L.Opened) {
                var t = "";
                switch (e.keyCode) {
                    case 37:
                        t = "left";
                        break;
                    case 38:
                        t = "top";
                        break;
                    case 39:
                        t = "right";
                        break;
                    case 40:
                        t = "bottom";
                        break;
                    default:
                        return
                }
                e.preventDefault(), I.KeyListener.Directions[t] && E.dispatch("bibi:commands:move", I.KeyListener.Directions[t])
            }
        }, update: function () {
            switch (S.ARD) {
                case"ttb":
                    I.KeyListener.Directions = {top: -1, bottom: 1};
                    break;
                case"ltr":
                    I.KeyListener.Directions = {left: -1, right: 1};
                    break;
                case"rtl":
                    I.KeyListener.Directions = {right: -1, left: 1}
            }
        }, listen: function () {
            R.Items.forEach(function (e) {
                e.contentWindow.addEventListener("keydown", I.KeyListener.observe, !1)
            }), window.addEventListener("keydown", I.KeyListener.observe, !1)
        }
    }, E.add("bibi:updated-settings", function () {
        I.KeyListener.update()
    }), E.add("bibi:opened", function () {
        I.KeyListener.listen()
    }))
}, I.createSwiper = function () {
    S["use-swipe"] && (I.Swiper = {
        update: function () {
            return "paged" == S.RVM ? this.open() : this.close(), this.State
        }, activateElement: function (e) {
            sML.observeTouch(e).addTouchEventListener("swipe", I.Swiper.onswiped), O.Mobile || (e.addEventListener("wheel", R.onwheel), sML.each(e.querySelectorAll("img"), function () {
                this.addEventListener(O.pointerdown, O.preventDefault)
            }))
        }, deactivateElement: function (e) {
            sML.unobserveTouch(e), O.Mobile || (e.removeEventListener("wheel", R.onwheel), sML.each(e.querySelectorAll("img"), function () {
                this.removeEventListener(O.pointerdown, O.preventDefault)
            }))
        }, onswiped: function (e, t) {
            var n = "", i = "", o = t.angle + 90;
            0 > o && (o += 360), o >= 330 || 30 >= o ? (n = "bottom", i = "top") : o >= 60 && 120 >= o ? (n = "left", i = "right") : o >= 150 && 210 >= o ? (n = "top", i = "bottom") : o >= 240 && 300 >= o && (n = "right", i = "left"), I.Arrows[n] && I.Arrows[n].isAvailable() && E.dispatch("bibi:commands:move", I.Arrows[n].Distance)
        }, onwheeled: function (e) {
            clearTimeout(I.Swiper.onwheeled.Timer_cooldown), I.Swiper.onwheeled.Timer_cooldown = setTimeout(function () {
                I.Swiper.onwheeled.hot = !1
            }, 248), I.Swiper.onwheeled.hot || (I.Swiper.onwheeled.hot = !0, E.dispatch("bibi:commands:move", e.Dir))
        }
    }, I.setToggleAction(I.Swiper, {
        onopened: function () {
            sML.addClass(O.HTML, "swipe-active"), O.Mobile || E.add("bibi:wheeled", I.Swiper.onwheeled), this.activateElement(R.Main), R.Items.forEach(function (e) {
                I.Swiper.activateElement(e.HTML)
            })
        }, onclosed: function () {
            sML.removeClass(O.HTML, "swipe-active"), O.Mobile || E.remove("bibi:wheeled", I.Swiper.onwheeled), this.deactivateElement(R.Main), R.Items.forEach(function (e) {
                I.Swiper.deactivateElement(e.HTML)
            })
        }
    }), E.add("bibi:laid-out:for-the-first-time", function () {
        I.Swiper.update(), E.add("bibi:updated-settings", function () {
            I.Swiper.update()
        })
    }), E.add("bibi:commands:activate-swipe", function () {
        I.Swiper.open()
    }), E.add("bibi:commands:deactivate-swipe", function () {
        I.Swiper.close()
    }), E.add("bibi:commands:toggle-swipe", function () {
        I.Swiper.toggle()
    }))
}, I.createSpinner = function () {
    I.Spinner = O.Body.appendChild(sML.create("div", {id: "bibi-spinner"}));
    for (var e = 1; 12 >= e; e++)I.Spinner.appendChild(document.createElement("span"));
    E.dispatch("bibi:created-spinner")
},I.setToggleAction = function (e, t) {
    return t || (t = {}), sML.edit(e, {
        ToggleState: "default", open: function (n) {
            return n || (n = {}), "default" == e.ToggleState ? (e.ToggleState = "active", e.Opened = !0, t.onopened && t.onopened.apply(e, arguments)) : n.CallbackTime = 0, e.callback(n), e.ToggleState
        }, close: function (n) {
            return n || (n = {}), "active" == e.ToggleState ? (e.ToggleState = "default", e.Opened = !1, t.onclosed && t.onclosed.apply(e, arguments)) : n.CallbackTime = 0, e.callback(n), e.ToggleState
        }, toggle: function (t) {
            return "default" == e.ToggleState ? e.open(t) : e.close(t)
        }, callback: function (t) {
            t && "function" == typeof t.callback && setTimeout(function () {
                t.callback.call(e)
            }, "number" == typeof t.CallbackTime ? t.CallbackTime : 250)
        }
    })
},I.distillPhrase = function (e) {
    return e ? "string" == typeof e ? e : e[O.Language] ? e[O.Language] : e["default"] ? e["default"] : e.en ? e.en : "" : ""
},I.distillPhrases = function (e) {
    if (!e)return {};
    var t = {};
    for (var n in e)t[n] = I.distillPhrase(e[n]);
    return t["default"] && !t.active && (t.active = t["default"]), t
},I.observeTap = function (e, t) {
    return t || (t = {}), e.addEventListener(O.pointerdown, function (n) {
        t.PreventDefault && n.preventDefault(), t.StopPropagation && n.stopPropagation(), clearTimeout(e.Timer_tap), e.TouchStart = {
            Time: new Date,
            Event: n
        }, e.Timer_tap = setTimeout(function () {
            e.TouchStart = void 0
        }, 300)
    }), e.addEventListener(O.pointerup, function (n) {
        if (t.PreventDefault && n.preventDefault(), t.StopPropagation && n.stopPropagation(), e.TouchStart) {
            var i = new Date;
            i - e.TouchStart.Time < 300 && Math.abs(n.pageX - e.TouchStart.Event.pageX) < 5 && Math.abs(n.pageY - e.TouchStart.Event.pageY) < 5 && E.dispatch("bibi:tapped", e.TouchStart.Event, e)
        }
    }), e.addTapEventListener = function (t) {
        return E.add("bibi:tapped", function (n) {
            return t.call(e, n)
        }, e), e
    }, t.ontap && e.addTapEventListener(t.ontap), e
},I.setHoverActions = function (e) {
    return e.onhover = function (t) {
        return e.Hover ? e : e.isAvailable && !e.isAvailable(t) ? e : (e.Hover = !0, sML.addClass(e, "hover"), e.showHelp && e.showHelp(), e)
    }, e.onunhover = function (t) {
        return e.Hover ? (e.Hover = !1, sML.removeClass(e, "hover"), e.hideHelp && e.hideHelp(), e) : e
    }, e
},I.setTapAction = function (e) {
    var t = function () {
        switch (e.Type) {
            case"toggle":
                return function (e) {
                    var t = this;
                    I.setButtonState(t, "default" == t.ButtonState ? "active" : "default")
                };
            case"radio":
                return function (e) {
                    var t = this;
                    I.setButtonState(t, "active"), t.ButtonGroup.Buttons.forEach(function (e) {
                        e != t && I.setButtonState(e, "")
                    })
                };
            default:
                return function (t) {
                    var n = this;
                    I.setButtonState(n, "active"), clearTimeout(n.Timer_deactivate), e.Timer_deactivate = setTimeout(function () {
                        I.setButtonState(n, "")
                    }, 200)
                }
        }
    }();
    return e.ontap = function (n) {
        return e.isAvailable && !e.isAvailable(n) ? e : "radio" == e.Type && "active" == e.ButtonState ? e : (t.call(e, n), e.hideHelp && e.hideHelp(), e.note && e.note(), e)
    }, e
},I.setFeedback = function (e, t) {
    return t || (t = {}), t.Help && (e.showHelp = function () {
        return e.Labels && e.Labels[e.ButtonState] && I.Help.show(e.Labels[e.ButtonState]), e
    }, e.hideHelp = function () {
        return I.Help.hide(), e
    }), e.note = function () {
        return e.Notes && e.Labels && e.Labels[e.ButtonState] && setTimeout(function () {
            I.note(e.Labels[e.ButtonState])
        }, 0), e
    }, I.setHoverActions(e, t), O.Mobile || (e.addEventListener(O.pointerover, e.onhover), e.addEventListener(O.pointerout, e.onunhover)), "undefined" == typeof t.ontap && (e.ontap || I.setTapAction(e), t.ontap = e.ontap), I.observeTap(e, t), I.setButtonState(e, "default"), e
},I.setButtonState = function (e, t) {
    return t || (t = "default"), e.PreviousButtonState = e.ButtonState, t != e.ButtonState ? (e.ButtonState = t, e.Labels && e.Labels[e.ButtonState] && (e.title = e.Labels[e.ButtonState], e.Label && (e.Label.innerHTML = e.Labels[e.ButtonState])), sML.replaceClass(e, e.PreviousButtonState, e.ButtonState), e.ButtonState) : void 0
},P = {},P.initialize = function () {
    O.applyTo(P, Bibi.Preset), O.SettingTypes.Boolean.forEach(function (e) {
        P[e] !== !0 && (P[e] = !1)
    }), O.SettingTypes.YesNo.forEach(function (e) {
        "string" == typeof P[e] ? P[e] = /^(yes|no|mobile|desktop)$/.test(P[e]) ? P[e] : "no" : P[e] = P[e] ? "yes" : "no"
    }), O.SettingTypes.Integer.forEach(function (e) {
        P[e] = "number" != typeof P[e] || P[e] < 0 ? 0 : Math.round(P[e])
    }), O.SettingTypes.Number.forEach(function (e) {
        "number" != typeof P[e] && (P[e] = 0)
    }), /^(horizontal|vertical|paged)$/.test(P["reader-view-mode"]) || (P["reader-view-mode"] = "paged"), /^([\w\d]+:)?\/\//.test(P.bookshelf) || (/^\//.test(P.bookshelf) ? P.bookshelf = location.origin + P.bookshelf : P.bookshelf = O.getPath(location.href.split("?")[0].replace(/[^\/]*$/, "") + P.bookshelf)), P["trustworthy-origins"] instanceof Array || (P["trustworthy-origins"] = []), P["trustworthy-origins"].includes(location.origin) || P["trustworthy-origins"].unshift(location.origin), P.extensions.forEach(function (e) {
        "string" == typeof e.src && e.src && X.ExtensionsInPreset.push(e)
    }), P.Initialized = new Promise(function (e, t) {
        return X.ExtensionsInPreset.length ? X.loadExtensionsInPreset().then(e) : e()
    })
},U = {},U.initialize = function () {
    var e = U.parseQuery(location.search), t = U.parseHash(location.hash);
    U.book = function () {
        var t = e.book ? e.book : O.Body.getAttribute("data-bibi-book");
        if ("string" == typeof t)return t = decodeURIComponent(t), /^([\w\d]+:)?\/\//.test(t) && /^\/\//.test(t) && (t = location.protocol + t), t
    }();
    var n = function (e) {
        return "string" != typeof e ? {} : void e.replace(" ", "").split(",").forEach(function (e) {
            if (e = e.split(":"), e[0]) {
                if (e[1])switch (e[0]) {
                    case"parent-title":
                    case"parent-uri":
                    case"parent-origin":
                    case"parent-pipi-path":
                    case"parent-bibi-label":
                        e[1] = U.decode(e[1]);
                        break;
                    case"reader-view-mode":
                        /^(horizontal|vertical|paged)$/.test(e[1]) || (e[1] = void 0);
                        break;
                    case"to":
                        e[1] = R.getBibiToDestination(e[1]);
                        break;
                    case"nav":
                        e[1] = /^[1-9]\d*$/.test(e[1]) ? 1 * e[1] : void 0;
                        break;
                    case"preset":
                    case"parent-holder-id":
                        break;
                    default:
                        O.SettingTypes.YesNo.includes(e[0]) ? "true" == e[1] ? e[1] = "yes" : "false" == e[1] ? e[1] = "no" : /^(yes|no|mobile|desktop)$/.test(e[1]) || (e[1] = void 0) : e[0] = void 0
                } else switch (e[0]) {
                    case"horizontal":
                    case"vertical":
                    case"paged":
                        e[1] = e[0], e[0] = "reader-view-mode";
                        break;
                    default:
                        O.SettingTypes.YesNo.includes(e[0]) ? e[1] = "yes" : e[0] = void 0
                }
                e[0] && (e[1] || "string" == typeof e[1] || "number" == typeof e[1]) && (U[e[0]] = e[1])
            }
        })
    };
    t.bibi && n(t.bibi), t.pipi && (n(t.pipi), U["parent-origin"] && U["parent-origin"] != location.origin && P["trustworthy-origins"].push(U["parent-origin"]), history.replaceState && history.replaceState(null, null, location.href.replace(/[\,#]pipi\([^\)]*\)$/g, ""))), t.epubcfi && (U.epubcfi = t.epubcfi, E.add("bibi:readied", function () {
        X.EPUBCFI && (S.to = U.to = X.EPUBCFI.getDestination(t.epubcfi))
    }))
},U.decode = function (e) {
    return decodeURIComponent(e.replace("_BibiKakkoClose_", ")").replace("_BibiKakkoOpen_", "("))
},U.parseQuery = function (e) {
    if ("string" != typeof e)return {};
    e = e.replace(/^\?/, "");
    var t = {};
    return e.split("&").forEach(function (e) {
        e = e.split("="), /^[a-z]+$/.test(e[0]) && (t[e[0]] = e[1])
    }), t
},U.parseHash = function (e) {
    if ("string" != typeof e)return {};
    e = e.replace(/^#/, "");
    var t = {}, n = 0, i = function () {
        for (var i = n, o = ""; /[a-z_]/.test(e.charAt(n));)n++;
        if ("(" != e.charAt(n))return {};
        for (o = e.substr(i, n - 1 - i + 1), n++; ")" != e.charAt(n);)n++;
        o && (t[o] = e.substr(i, n - i + 1).replace(/^[a-z_]+\(/, "").replace(/\)$/, "")), n++
    };
    for (i(); "," == e.charAt(n);)n++, i();
    return t
},S = {},S.initialize = function () {
    for (var e in S)"function" != typeof S[e] && delete S[e];
    O.applyTo(S, P), O.applyTo(S, U), delete S.book, delete S.bookshelf, O.SettingTypes.YesNo.forEach(function (e) {
        S[e] = S.decideYesNo(e)
    }), S.autostart = !S.wait && (!O.WindowEmbedded || S.autostart), S["start-in-new-window"] = S["start-in-new-window"] && O.WindowEmbedded
},S.decideYesNo = function (e) {
    return S[e] === !0 || "yes" == S[e] || "mobile" == S[e] && O.Mobile || "desktop" == S[e] && !O.Mobile
},S.update = function (e) {
    var t = S.BRL, n = S.RVM, i = S.PPD, o = S.SLA, r = S.SLD, a = S.ARD;
    if ("object" == typeof e)for (var s in e)"function" != typeof S[s] && (S[s] = e[s]);
    S.BRL = S["book-rendition-layout"] = B.Package.Metadata["rendition:layout"], S.BWM = S["book-writing-mode"] = /^tb/.test(B.WritingMode) && !O.VerticalTextEnabled ? "lr-tb" : B.WritingMode, S.FontFamilyStyleIndex && sML.deleteStyleRule(S.FontFamilyStyleIndex), S["ui-font-family"] && (S.FontFamilyStyleIndex = sML.appendStyleRule("html", "font-family: " + S["ui-font-family"] + " !important;")), S.RVM = S["reader-view-mode"], "reflowable" == S.BRL ? "tb-rl" == S.BWM ? (S.PPD = S["page-progression-direction"] = "rtl", S.SLA = S["spread-layout-axis"] = "paged" == S.RVM ? "vertical" : S.RVM) : "tb-lr" == S.BWM ? (S.PPD = S["page-progression-direction"] = "ltr", S.SLA = S["spread-layout-axis"] = "paged" == S.RVM ? "vertical" : S.RVM) : "rl-tb" == S.BWM ? (S.PPD = S["page-progression-direction"] = "rtl", S.SLA = S["spread-layout-axis"] = "paged" == S.RVM ? "horizontal" : S.RVM) : (S.PPD = S["page-progression-direction"] = "ltr", S.SLA = S["spread-layout-axis"] = "paged" == S.RVM ? "horizontal" : S.RVM) : (S.PPD = S["page-progression-direction"] = "rtl" == B.PPD ? "rtl" : "ltr", S.SLA = S["spread-layout-axis"] = "paged" == S.RVM ? "horizontal" : S.RVM), S.SLD = S["spread-layout-direction"] = "vertical" == S.SLA ? "ttb" : S.PPD, S.ARD = S["apparent-reading-direction"] = "vertical" == S.RVM ? "ttb" : S.PPD, "horizontal" == S.SLA ? (S.SIZE = {
        b: "height",
        B: "Height",
        l: "width",
        L: "Width",
        w: "length",
        W: "Length",
        h: "breadth",
        H: "Breadth"
    }, "ltr" == S.PPD ? (S.AXIS = {B: "Y", L: "X", PM: 1}, S.BASE = {
        b: "left",
        B: "Left",
        a: "right",
        A: "Right",
        s: "top",
        S: "Top",
        e: "bottom",
        E: "Bottom",
        c: "middle",
        m: "center"
    }) : (S.AXIS = {B: "Y", L: "X", PM: -1}, S.BASE = {
        b: "right",
        B: "Right",
        a: "left",
        A: "Left",
        s: "top",
        S: "Top",
        e: "bottom",
        E: "Bottom",
        c: "middle",
        m: "center"
    })) : (S.SIZE = {
        b: "width",
        B: "Width",
        l: "height",
        L: "Height",
        w: "breadth",
        W: "Breadth",
        h: "length",
        H: "Length"
    }, S.AXIS = {B: "X", L: "Y", PM: 1}, "ltr" == S.PPD ? S.BASE = {
        b: "top",
        B: "Top",
        a: "bottom",
        A: "Bottom",
        s: "left",
        S: "Left",
        e: "right",
        E: "Right",
        c: "center",
        m: "middle"
    } : S.BASE = {
        b: "top",
        B: "Top",
        a: "bottom",
        A: "Bottom",
        s: "right",
        S: "Right",
        e: "left",
        E: "Left",
        c: "center",
        m: "middle"
    }), t != S.BRL && sML.replaceClass(O.HTML, "book-" + t, "book-" + S.BRL), n != S.RVM && sML.replaceClass(O.HTML, "view-" + n, "view-" + S.RVM), i != S.PPD && sML.replaceClass(O.HTML, "page-" + i, "page-" + S.PPD), o != S.SLA && sML.replaceClass(O.HTML, "spread-" + o, "spread-" + S.SLA), r != S.SLD && sML.replaceClass(O.HTML, "spread-" + r, "spread-" + S.SLD), a != S.ARD && sML.replaceClass(O.HTML, "appearance-" + a, "appearance-" + S.ARD), E.dispatch("bibi:updated-settings", S)
},O = {},O.log = function (e, t) {
    sML.UA.Gecko && "string" == typeof e && (e = e.replace(/(https?:\/\/)/g, ""));
    var n = "BiB/i: ";
    switch (t) {
        case"-*":
            t = "-" + O.log.Depth;
            break;
        case"*:":
            t = O.log.Depth + ":";
            break;
        case"/*":
            t = "/" + (O.log.Depth - 1)
    }
    switch (t) {
        case"-x":
            return n += "[ERROR] ", void console.info(n + e);
        case"-0":
            return n += "━━━━━━━━━━━━ ", void console.info(n + e);
        case"-1":
            n += " - ", O.log.Depth = 1;
            break;
        case"1:":
            n += "┌ ", O.log.Depth = 2;
            break;
        case"-2":
            n += "│ - ", O.log.Depth = 2;
            break;
        case"2:":
            n += "│┌ ", O.log.Depth = 3;
            break;
        case"-3":
            n += "││ - ", O.log.Depth = 3;
            break;
        case"3:":
            n += "││┌ ", O.log.Depth = 4;
            break;
        case"-4":
            n += "│││ - ", O.log.Depth = 4;
            break;
        case"4:":
            n += "│││┌ ", O.log.Depth = 5;
            break;
        case"-5":
            n += "││││ - ", O.log.Depth = 5;
            break;
        case"5:":
            n += "││││┌ ", O.log.Depth = 6;
            break;
        case"-6":
            n += "│││││ - ", O.log.Depth = 6;
            break;
        case"/5":
            n += "││││└ ", O.log.Depth = 5;
            break;
        case"/4":
            n += "│││└ ", O.log.Depth = 4;
            break;
        case"/3":
            n += "││└ ", O.log.Depth = 3;
            break;
        case"/2":
            n += "│└ ", O.log.Depth = 2;
            break;
        case"/1":
            n += "└ ", O.log.Depth = 1
    }
    console.log(n + e)
},O.log.Depth = 1,parent && parent != window && (O.log = function () {
    return !1
}),O.error = function (e) {
    O.Busy = !1, sML.removeClass(O.HTML, "busy"), sML.removeClass(O.HTML, "loading"), sML.removeClass(O.HTML, "waiting"), E.dispatch("bibi:x_x", e), O.log(e, "-x")
},O.applyTo = function (e, t) {
    for (var n in t)"function" != typeof e[n] && "function" != typeof t[n] && (e[n] = t[n])
},O.download = function (e, t) {
    return new Promise(function (n, i) {
        var o = new XMLHttpRequest;
        t && o.overrideMimeType(t), o.open("GET", e, !0), o.onloadend = function () {
            return 200 !== o.status ? i(o) : n(o)
        }, o.send(null)
    })
},O.parseDocument = function (e, t) {
    return (new DOMParser).parseFromString(t, /\.(xml|opf|ncx)$/i.test(e) ? "text/xml" : "text/html")
},O.openDocument = function (e) {
    return B.Unzipped ? O.download(B.Path + "/" + e).then(function (t) {
        return O.parseDocument(e, t.responseText)
    })["catch"](function (e) {
        O.error("XHR HTTP status: " + e.status + ' "' + e.responseURL + '"')
    }) : Promise.resolve().then(function () {
        return O.parseDocument(e, B.Files[e])
    })
},O.getWritingMode = function (e) {
    var t = getComputedStyle(e);
    return O.WritingModeProperty ? /^vertical-/.test(t[O.WritingModeProperty]) ? ("rtl" == t.direction ? "bt" : "tb") + "-" + (/-lr$/.test(t[O.WritingModeProperty]) ? "lr" : "rl") : /^horizontal-/.test(t[O.WritingModeProperty]) ? ("rtl" == t.direction ? "rl" : "lr") + "-" + (/-bt$/.test(t[O.WritingModeProperty]) ? "bt" : "tb") : /^(lr|rl|tb|bt)-/.test(t[O.WritingModeProperty]) ? t[O.WritingModeProperty] : void 0 : "rtl" == t.direction ? "rl-tb" : "lr-tb"
},O.getElementInnerText = function (e) {
    var t = "InnerText", n = document.createElement("div");
    return n.innerHTML = e.innerHTML.replace(/ (src(set)?|source|(xlink:)?href)=/g, " data-$1="), sML.each(n.querySelectorAll("svg"), function () {
        this.parentNode.removeChild(this)
    }), sML.each(n.querySelectorAll("video"), function () {
        this.parentNode.removeChild(this)
    }), sML.each(n.querySelectorAll("audio"), function () {
        this.parentNode.removeChild(this)
    }), sML.each(n.querySelectorAll("img"), function () {
        this.parentNode.removeChild(this)
    }), sML.each(n.querySelectorAll("script"), function () {
        this.parentNode.removeChild(this)
    }), sML.each(n.querySelectorAll("style"), function () {
        this.parentNode.removeChild(this)
    }), "undefined" != typeof n.textContent ? t = n.textContent : "undefined" != typeof n.innerText && (t = n.innerText), t.replace(/[\r\n\s\t ]/g, "")
},O.getElementCoord = function (e) {
    for (var t = {
        X: e.offsetLeft,
        Y: e.offsetTop
    }; e.offsetParent;)e = e.offsetParent, t.X += e.offsetLeft, t.Y += e.offsetTop;
    return t
},O.getPath = function () {
    var e = "", t = arguments[0];
    if (2 == arguments.length && /^[\w\d]+:\/\//.test(arguments[1]))t = arguments[1]; else for (var n = 1; n < arguments.length; n++)t += "/" + arguments[n];
    for (t.replace(/^([a-zA-Z]+:\/\/[^\/]+)?\/*(.*)$/, function () {
        e = arguments[1], t = arguments[2]
    }); /([^:\/])\/{2,}/.test(t);)t = t.replace(/([^:\/])\/{2,}/g, "$1/");
    for (; /\/\.\//.test(t);)t = t.replace(/\/\.\//g, "/");
    for (; /[^\/]+\/\.\.\//.test(t);)t = t.replace(/[^\/]+\/\.\.\//g, "");
    return t = t.replace(/^(\.\/)+/g, ""), e && (t = e + "/" + t), t
},O.stamp = function (e, t) {
    t || (t = O.TimeCard);
    var n = Date.now() - O.TimeCard.Origin;
    t[n] && (e = t[n] + " -&- " + e), t[n] = e
},O.stopPropagation = function (e) {
    return e.stopPropagation(), !1
},O.preventDefault = function (e) {
    return e.preventDefault(), !1
},O.getBibiEventCoord = function (e) {
    var t = {X: 0, Y: 0};
    if (/^touch/.test(e.type) ? (t.X = e.targetTouches[0].pageX, t.Y = e.targetTouches[0].pageY) : (t.X = e.pageX, t.Y = e.pageY), e.target.ownerDocument.documentElement != O.HTML) {
        var n = e.target.ownerDocument.documentElement.Item;
        ItemCoord = O.getElementCoord(n), n.PrePaginated || n.Outsourcing || (ItemCoord.X += S["item-padding-left"], ItemCoord.Y += S["item-padding-top"]), t.X += ItemCoord.X - R.Main.scrollLeft, t.Y += ItemCoord.Y - R.Main.scrollTop
    }
    return t
},O.getBibiEvent = function (e) {
    if (!e)return {};
    var t = O.getBibiEventCoord(e), n = S["flipper-width"], i = {
        X: t.X / window.innerWidth,
        Y: t.Y / window.innerHeight
    };
    if (1 > n)var o = a = n, r = s = 1 - n; else var o = n / window.innerWidth, a = n / window.innerHeight, r = 1 - o, s = 1 - a;
    var l = {X: "", Y: ""};
    return i.X < o ? l.X = "left" : r < i.X ? l.X = "right" : l.X = "center", i.Y < a ? l.Y = "top" : s < i.Y ? l.Y = "bottom" : l.Y = "middle", {
        Target: e.target,
        Coord: t,
        Ratio: i,
        Division: l
    }
},O.TimeCard = {
    Origin: Date.now(), getNow: function () {
        return (Date.now() - O.TimeCard.Origin) / 1e3 + "sec"
    }
},O.Path = function () {
    if (document.currentScript)return document.currentScript.src;
    var e = document.getElementsByTagName("script");
    return e[e.length - 1].src
}(),O.Cookie = {
    remember: function (e) {
        var t = JSON.parse(sML.Cookies.read("bibi") || "{}");
        return "string" == typeof e && e ? t[e] : t
    }, eat: function (e, t, n) {
        if ("string" != typeof e || !e)return !1;
        if ("object" != typeof t)return !1;
        var i = this.remember();
        "object" != typeof i[e] && (i[e] = {});
        for (var o in t) {
            var r = t[o];
            "string" == typeof o && o && "function" != typeof r && r && (i[e][o] = r)
        }
        n || (n = {}), n.Path = location.pathname.replace(/[^\/]+$/, ""), n.Expires || (n.Expires = 1e3 * S["cookie-expires"]), sML.Cookies.write("bibi", JSON.stringify(i), n)
    }
},O.SettingTypes = {
    YesNo: ["fix-reader-view-mode", "wait", "autostart", "start-in-new-window", "use-slider", "use-arrows", "use-keys", "use-swipe", "use-cookie"],
    Integer: ["spread-gap", "spread-margin", "item-padding-left", "item-padding-right", "item-padding-top", "item-padding-bottom"],
    Number: ["cookie-expires", "flipper-width"],
    Boolean: ["page-breaking"]
},E = {},E.Binded = {},E.add = function (e, t, n) {
    return "string" == typeof e && /^bibi:/.test(e) && "function" == typeof t ? (t.bibiEventListener || (t.bibiEventListener = function (e) {
        return t.call(document, e.detail)
    }), (n ? n : document).addEventListener(e, t.bibiEventListener, !1), t) : !1
},E.remove = function (e, t, n) {
    return "string" == typeof e && /^bibi:/.test(e) && "function" == typeof t && "function" == typeof t.bibiEventListener ? ((n ? n : document).removeEventListener(e, t.bibiEventListener), t) : !1
},E.bind = function (e, t) {
    return "string" != typeof e || "function" != typeof t ? !1 : (E.Binded[e] instanceof Array || (E.Binded[e] = []), E.Binded[e].push(t), {
        Name: e,
        Index: E.Binded[e].length - 1,
        Function: t
    })
},E.unbind = function (e) {
    if (!e)return !1;
    if ("string" == typeof arguments[0] && "function" == typeof arguments[1] && (e = {
            Name: arguments[0],
            Function: arguments[1]
        }), "object" != typeof e || "string" != typeof e.Name || !(E.Binded[e.Name] instanceof Array))return !1;
    if ("number" == typeof e.Index)return "function" != typeof E.Binded[e.Name][e.Index] ? !1 : (E.Binded[e.Name][e.Index] = void 0, !0);
    if ("function" == typeof e.Function) {
        for (var t = !1, n = 0, i = E.Binded[e.Name].length; i > n; n++)E.Binded[e.Name][n] == e.Function && (E.Binded[e.Name][n] = void 0, t = !0);
        return t
    }
    return delete E.Binded[e.Name]
},E.dispatch = function (e, t, n) {
    if (E.Binded[e] instanceof Array)for (var i = 0, o = E.Binded[e].length; o > i; i++)"function" == typeof E.Binded[e][i] && E.Binded[e][i].call(Bibi, t);
    return (n ? n : document).dispatchEvent(new CustomEvent(e, {detail: t}))
},M = {},M.post = function (e, t) {
    return O.WindowEmbedded && "string" == typeof e && e ? ("string" == typeof t && t || (t = "*"), window.parent.postMessage(e, t)) : !1
},M.receive = function (e) {
    try {
        if (e = JSON.parse(e), "object" != typeof e || !e)return !1;
        for (var t in e)/^bibi:commands:/.test(t) && E.dispatch(t, e[t]);
        return !0
    } catch (n) {
    }
    return !1
},M.gate = function (e) {
    if (e && e.data)for (var t = 0, n = S["trustworthy-origins"].length; n > t; t++)if (S["trustworthy-origins"][t] == e.origin)return M.receive(e.data)
},X = {},X.initialize = function () {
    X.ExtensionsInPreset = [], X.LoadedExtensionsInPreset = 0
},X.loadExtensionsInPreset = function () {
    return new Promise(function (e, t) {
        return X.ExtensionsInPreset.length ? void X.ExtensionsInPreset.forEach(function (t) {
            document.head.appendChild(sML.create("script", {
                className: "bibi-extension-script",
                id: "bibi-extension-script_" + t.name,
                name: t.name,
                src: t.src,
                onload: function () {
                    X.LoadedExtensionsInPreset++, X.LoadedExtensionsInPreset == X.ExtensionsInPreset.length && e()
                },
                Options: t
            }))
        }) : e()
    })
},X.add = function (e) {
    return e && "object" == typeof e ? "string" != typeof e.name ? function () {
        E.bind("bibi:readied", function () {
            O.log("Extension name is invalid.", "-*")
        })
    } : X[e.name] ? function () {
        E.bind("bibi:readied", function () {
            O.log('Extension name "' + e.name + '" is reserved or already taken.', "-*")
        })
    } : ("string" != typeof e.description && (e.decription = void 0), "string" != typeof e.author && (e.author = void 0), "string" != typeof e.version && (e.version = void 0), "number" != typeof e.build && (e.build = void 0), X.Extensions instanceof Array || (X.Extensions = []), X.Extensions.push(e), X[e.name] = e, X[e.name].Options = {}, document.getElementById("bibi-extension-script_" + e.name) && (X[e.name].Options = document.getElementById("bibi-extension-script_" + e.name).Options), function (t) {
        E.bind("bibi:readied", function () {
            t.call(e)
        })
    }) : function () {
        return !1
    }
},Bibi.x = X.add;
