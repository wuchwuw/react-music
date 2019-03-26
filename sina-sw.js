importScripts("//h5.sinaimg.cn/m/weibo-lite/manifest.edcf465204895c86e946f981480b9aa1.js", "//h5.sinaimg.cn/m/weibo-lite/workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({
    modulePathPrefix: "//h5.sinaimg.cn/m/weibo-lite/workbox-v3.6.3"
});
workbox.googleAnalytics.initialize();
workbox.skipWaiting();
workbox.clientsClaim();
workbox.core.setCacheNameDetails({
    prefix: "mweibo-lite",
    precache: "install-time",
    runtime: "run-time",
    googleAnalytics: "ga"
});
var checkUpdateCaches = ["localhost", "chunks-v2"];
function urlHashFilter(url) {
    var requestUrl = new URL(url);
    var name = requestUrl.pathname.split(".");
    if (name.length > 2) {
        var hash = name.splice( - 2, 1)[0];
        return [requestUrl.origin + name.join("."), hash]
    }
    return [requestUrl.origin + name.join("."), ""]
}
function traverseCaches(callbackfunc) {
    caches.keys().then(function(cacheNames) {
        cacheNames.filter(function(cacheName) {
            return checkUpdateCaches.includes(cacheName)
        }).map(function(cacheName) {
            return caches.open(cacheName).then(function(cache) {
                cache.keys().then(function(cachedRequests) {
                    cachedRequests.map(function(cachedRequest) {
                        callbackfunc(cachedRequest, cache)
                    })
                })
            })
        })
    })
}
var handlerUpdateChunks = function handlerUpdateChunks(_ref) {
    var url = _ref.url,
    event = _ref.event,
    params = _ref.params;
    var request = event.request;
    return caches.match(request).then(function(cachedRespond) {
        if (url.host === "js.intra.weibo.cn") {
            var newReq = new Request(url);
            if (cachedRespond) {
                fetch(newReq).then(function(resp) {
                    var cacheLast = cachedRespond.headers.get("last-modified");
                    var resLast = resp.headers.get("last-modified");
                    console.log(request.url, "last-modified:", cacheLast, resLast);
                    if (cacheLast !== resLast) {
                        traverseCaches(function(cachedRequest, cache) {
                            console.log("[SW:]Chunk has updated");
                            cache.delete(cachedRequest)
                        })
                    }
                })
            }
            return workbox.strategies.cacheFirst({
                cacheName: "chunks-v2",
                plugins: [new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }), {
                    requestWillFetch: function requestWillFetch(_ref2) {
                        var request = _ref2.request;
                        request = new Request(request.url);
                        return request
                    }
                }]
            }).handle({
                event: event
            }).
            catch(function(e) {
                console.error(e)
            })
        } else if (!cachedRespond) {
            traverseCaches(function(cachedRequest, cache) {
                var cacheReqUrlHash = urlHashFilter(cachedRequest.url);
                var resUrlHash = urlHashFilter(request.url);
                if (resUrlHash[0] === cacheReqUrlHash[0] && resUrlHash[1] !== cacheReqUrlHash[1]) {
                    cache.delete(cachedRequest)
                }
            })
        }
        return workbox.strategies.cacheFirst({
            cacheName: "chunks-v2",
            plugins: [new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })]
        }).handle({
            event: event
        }).
        catch(function(e) {
            console.error(e)
        })
    })
};
workbox.routing.registerRoute(new RegExp(/^https?:\/\/((h5\.sinaimg)|(js\.intra\.weibo))\.cn\/m\/(.*)\.(js|css)$/), handlerUpdateChunks);
workbox.routing.registerRoute(new RegExp(/^https?:\/\/h5\.sinaimg\.cn\/(.*)\.(png|gif|jpg)$/), workbox.strategies.cacheFirst({
    cacheName: "images",
    plugins: [new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60
    }), new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
    })]
}));
workbox.routing.registerRoute(new RegExp(/^https?:\/\/((h5\.sinaimg)|(css\.intra\.weibo))\.cn\/marvel\/(.*)\.(js|css)$/), workbox.strategies.cacheFirst({
    cacheName: "statics",
    plugins: [new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
    })]
}));
var bgSyncPlugin = new workbox.backgroundSync.Plugin("weibo", {
    maxRetentionTime: 24 * 60
});
var handlerUpdateAPI = function handlerUpdateAPI(_ref3) {
    var url = _ref3.url,
    event = _ref3.event,
    params = _ref3.params;
    var urlObj = new URL(url);
    var urlParams = urlObj.searchParams;
    var hasNoQuery = !urlParams.toString();
    var hasQueryKey = false;
    if (!hasNoQuery) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;
        try {
            for (var _iterator = urlParams.keys()[Symbol.iterator](), _step; ! (_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;
                if (/id$/.test(key) || key === "page") {
                    hasQueryKey = true;
                    break
                }
            }
        } catch(err) {
            _didIteratorError = true;
            _iteratorError = err
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.
                return) {
                    _iterator.
                    return ()
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError
                }
            }
        }
    }
    if (event.request.headers.get("accept").indexOf("application/json") > -1 && (hasQueryKey || hasNoQuery)) {
        return workbox.strategies.networkFirst({
            cacheName: "api",
            plugins: [new workbox.expiration.Plugin({
                maxEntries: 20,
                maxAgeSeconds: 24 * 60 * 60
            }), bgSyncPlugin]
        }).handle({
            event: event
        }).
        catch(function(e) {
            console.error(e)
        })
    } else if (event.request.headers.get("accept").indexOf("text/html") > -1) {
        return workbox.strategies.staleWhileRevalidate({
            cacheName: "page",
            plugins: [new workbox.expiration.Plugin({
                maxEntries: 20,
                maxAgeSeconds: 24 * 60 * 60
            })]
        }).handle({
            event: event
        }).
        catch(function() {
            caches.match(location.origin)
        })
    }
    return workbox.strategies.networkOnly({
        plugins: [{
            requestWillFetch: function requestWillFetch(_ref4) {
                var request = _ref4.request;
                request = new Request(request, {
                    mode: "same-origin"
                });
                return request
            }
        }]
    }).handle({
        event: event
    }).
    catch(function(e) {
        console.error(e)
    })
};
workbox.routing.registerRoute(new RegExp("^https://m.weibo.cn/.*"), handlerUpdateAPI);
function sendMessageToAllClients(msg) {
    self.clients.matchAll().then(function(clients) {
        clients.forEach(function(client) {
            client.postMessage(msg)
        })
    })
}
function sendMessageToClientsAsync(msg) {
    setTimeout(function() {
        sendMessageToAllClients(msg)
    },
    1e3)
}
self.addEventListener("sync",
function(event) {
    event.waitUntil(self.clients.matchAll().then(function(all) {
        return all.map(function(client) {
            console.info("send a message");
            return client.postMessage(event.tag)
        })
    }).
    catch(function(e) {
        console.error(e)
    }))
});
self.addEventListener("activate",
function(event) {
    event.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.filter(function(cacheName) {
            if (cacheName === "page") {
                return true
            }
            return false
        }).map(function(cacheName) {
            return caches.delete(cacheName)
        }))
    }));
    sendMessageToClientsAsync({
        command: "UPDATE_FOUND"
    })
});
self.addEventListener("error",
function(event) {
    console.error("出错");
    console.dir(event)
});
self.addEventListener("unhandledrejection",
function(event) {
    console.error("Promise出错");
    console.dir(event)
});
self.addEventListener("message",
function(e) {
    console.error(e.data)
});译