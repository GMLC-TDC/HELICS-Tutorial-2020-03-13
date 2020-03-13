(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{218:function(e,t,r){"use strict";r.r(t);var o=r(28),i=Object(o.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"tips-for-debugging"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#tips-for-debugging"}},[e._v("#")]),e._v(" Tips for debugging")]),e._v(" "),r("p",[e._v("Co-simulations can be tricky to debug.\nHere are some tips to debugging a co-simulation.")]),e._v(" "),r("ul",[r("li",[e._v("Always print current time granted.")]),e._v(" "),r("li",[e._v("Use "),r("a",{attrs:{href:"https://gmlc-tdc.github.io/HELICS.jl/latest/api/#HELICS.HELICS_FEDERATE_FLAGS",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("h.HELICS_FLAG_TERMINATE_ON_ERROR")]),r("OutboundLink")],1),e._v(" flag for all federates.")]),e._v(" "),r("li",[e._v("Check "),r("a",{attrs:{href:"https://gmlc-tdc.github.io/HELICS.jl/latest/api/#HELICS.HELICS_FEDERATE_STATE",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("HELICS_FEDERATE_STATE")]),r("OutboundLink")],1),e._v(" to ensure that the federate is doing what you expect it to.")]),e._v(" "),r("li",[e._v("Set "),r("a",{attrs:{href:"https://gmlc-tdc.github.io/HELICS.jl/latest/api/#HELICS.HELICS_LOG_LEVELS",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("HELICS_LOG_LEVELS")]),r("OutboundLink")],1),e._v(" to show all messages.")]),e._v(" "),r("li",[e._v("Sometimes force quiting a co-simulation is necessary. You may need to use "),r("code",[e._v("killall python")]),e._v(", "),r("code",[e._v("kill -9 $pid")]),e._v(", "),r("code",[e._v("kill %1")]),e._v(".")])])])}),[],!1,null,null,null);t.default=i.exports}}]);