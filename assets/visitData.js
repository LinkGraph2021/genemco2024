!(function (e, n) {
    "object" == typeof exports && "object" == typeof module ? (module.exports = n()) : "function" == typeof define && define.amd ? define([], n) : "object" == typeof exports ? (exports.visitData = n()) : (e.visitData = n());
})(self, function () {
    return (() => {
        "use strict";
        var e = {
                d: (n, o) => {
                    for (var r in o) e.o(o, r) && !e.o(n, r) && Object.defineProperty(n, r, { enumerable: !0, get: o[r] });
                },
                o: (e, n) => Object.prototype.hasOwnProperty.call(e, n),
                r: (e) => {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
                },
            },
            n = {};
        e.r(n), e.d(n, { get: () => t, rawData: () => a });
        const o = JSON.parse(
                '{"gclid":{"source":"google","medium":"cpc"},"dclid":{"source":"google","medium":"cpm"},"fbclid":{"source":"facebook","medium":"cpc"},"msclkid":{"source":"bing","medium":"cpc"},"gclsrc":{"source":"google","medium":"cpc"},"wbraid":{"source":"google","medium":"cpc"},"gbraid":{"source":"google","medium":"cpc"}}'
            ),
            r = JSON.parse(
                '{"google":{"p":"q","n":"google","regex":true},"genemco.com":{"p":"p","n":"genemco"},"yahoo.com":{"p":"p","n":"yahoo"},"msn.com":{"p":"q","n":"msn"},"bing.com":{"p":"q","n":"bing"},"duckduckgo.com":{"n":"duckduckgo"},"daum.net":{"p":"q","n":"daum"},"eniro.se":{"p":"search_word","n":"eniro "},"naver.com":{"p":"query","n":"naver "},"aol.com":{"p":"q","n":"aol"},"lycos.com":{"p":"q","n":"lycos"},"ask.com":{"p":"q","n":"ask"},"altavista.com":{"p":"q","n":"altavista"},"search.netscape.com":{"p":"query","n":"netscape"},"cnn.com":{"p":"query","n":"cnn"},"about.com":{"p":"terms","n":"about"},"mamma.com":{"p":"query","n":"mama"},"alltheweb.com":{"p":"q","n":"alltheweb"},"voila.fr":{"p":"rdata","n":"voila"},"search.virgilio.it":{"p":"qs","n":"virgilio"},"baidu.com":{"p":"wd","n":"baidu"},"alice.com":{"p":"qs","n":"alice"},"yandex.com":{"p":"text","n":"yandex"},"najdi.org.mk":{"p":"q","n":"najdi"},"seznam.cz":{"p":"q","n":"seznam"},"search.com":{"p":"q","n":"search"},"wp.pl":{"p":"szukaj ","n":"wirtulana polska"},"online.onetcenter.org":{"p":"qt","n":"o*net"},"szukacz.pl":{"p":"q","n":"szukacz"},"yam.com":{"p":"k","n":"yam"},"pchome.com":{"p":"q","n":"pchome"},"kvasir.no":{"p":"q","n":"kvasir"},"sesam.no":{"p":"q","n":"sesam"},"ozu.es":{"p":"q","n":"ozu "},"terra.com":{"p":"query","n":"terra"},"mynet.com":{"p":"q","n":"mynet"},"ekolay.net":{"p":"q","n":"ekolay"},"rambler.ru":{"p":"words","n":"rambler"}}'
            );
        function a() {
            if(document.referrer==null || document.referrer==''){
              var e = window.location.host;
            }else{
              var e = document.referrer;
            }
            
            var n = c(e),
                a = new URLSearchParams(window.location.search),
                t = Object.fromEntries(a),
                i = (function (e) {
                    var n = { utm_source: "source", utm_medium: "medium", utm_campaign: "campaign", utm_content: "content", utm_term: "term" },
                        o = {};
                    for (var r in e) n.hasOwnProperty(r) && (o[n[r]] = e[r]);
                    return Object.keys(o).length > 0 ? o : null;
                })(t),
                u = (function (e, n) {
                    for (var o in e) if (n.hasOwnProperty(o)) return n[o];
                    return null;
                })(t, o),
                m = (function (e, n, o) {
                    if (null == e) return null;
                    if (o.hasOwnProperty(e)) {
                        var r = { source: o[e].n, medium: "organic" },
                            a = o[e].p;
                        return n.hasOwnProperty(a) && (r.term = n[a]), r;
                    }
                    var t = Object.keys(o).reduce(function (e, n) {
                        return o[n].regex && (e[n] = o[n]), e;
                    }, {});
                    for (var c in t) if (null != e.match(c)) return { source: o[c].n, medium: "organic" };
                    return null;
                })(n, t, r),
                s = null == n ? null : { medium: "referral", source: n };
            return {
                this_hostname: document.location.origin || "https://genemco.com",
                this_domain: c(document.location.origin) || "genemco.com",
                referring_hostname: e || null,
                referring_domain: n,
                query_string: window.location.search,
                utm_tags: i,
                url_params: Object.keys(t).length > 0 ? t : null,
                paid_url_data: u,
                organic_search_data: m,
                referral_data: s,
            };
        }
        function t() {
            var e = a();
            return e.utm_tags || e.paid_url_data || e.organic_search_data || e.referral_data || { source: "(direct)", medium: "(none)", campaign: "(not set)" };
        }
        function c(e) {
            e = "http" == e.substring(0, 4) ? e : "https://" + e;
            var n = new URL(e).hostname.split("."),
                o = n.slice(-2);
            return ["com", "co"].includes(o[0]) && o.join("").length <= 5 ? n.slice(-3).join(".") : n.slice(-2).join(".");
        }
        return n;
    })();
});

