(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{224:function(s,t,a){"use strict";a.r(t);var n=a(28),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"revisiting-the-cosimulation-example"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#revisiting-the-cosimulation-example"}},[s._v("#")]),s._v(" Revisiting the Cosimulation Example")]),s._v(" "),a("p",[s._v("Let's take a closer look at the simple co-simulation from earlier.")]),s._v(" "),a("h2",{attrs:{id:"building-a-federate-programmatically"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#building-a-federate-programmatically"}},[s._v("#")]),s._v(" Building a federate programmatically")]),s._v(" "),a("p",[s._v("In "),a("code",[s._v("sender.py")]),s._v(", we had "),a("code",[s._v("h.helicsCreateCombinationFederateFromConfig")]),s._v(".")]),s._v(" "),a("p",[s._v("This read the following "),a("code",[s._v("sender.json")]),s._v(":")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"coreType"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"zmq"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"loglevel"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sender"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"publications"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"global"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"key"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"topicA"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"required"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"double"')]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"timeDelta"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.0")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br")])]),a("p",[s._v("We can replace the single call to create a federate using these lines:")]),s._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[s._v("fedinfo "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" h"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helicsCreateFederateInfo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nh"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helicsFederateInfoSetCoreType"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("fedinfo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" h"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helics_core_type_zmq"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nh"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helicsFederateInfoSetCoreInitString"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("fedinfo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"--loglevel=7"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nh"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helicsFederateInfoSetTimeProperty"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("fedinfo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" h"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helics_property_time_delta"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\ntopicA "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" h"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helicsFederateRegisterGlobalPublication"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("fed"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"topicA"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" h"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helics_data_type_double"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[s._v("Additionally, we can create a "),a("code",[s._v("Broker")]),s._v(" in the same process as one of the federates.")]),s._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[s._v("initstring "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"-f 2 --loglevel=7"')]),s._v("\nbroker "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" h"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helicsCreateBroker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"zmq"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" initstring"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("assert")]),s._v(" h"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helicsBrokerIsConnected"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("broker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("True")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("We can use the same "),a("code",[s._v("receiver.py")]),s._v(" and "),a("code",[s._v("receiver.json")]),s._v(" from earlier.")]),s._v(" "),a("p",[s._v("Running it will give us the same output as earlier.")]),s._v(" "),a("p",[s._v("We should not forget to clean up after ourselves.\nWe need to disconnect the broker before calling "),a("code",[s._v("helicsCloseLibrary")])]),s._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("while")]),s._v(" h"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helicsBrokerIsConnected"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("broker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    time"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("sleep"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nh"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helicsBrokerDisconnect"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("broker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[s._v("You may want to consider using "),a("code",[s._v("atexit")]),s._v(":")]),s._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" atexit\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("f_at_exit")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n\n    h"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helicsFederateFinalize"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("fed"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    h"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helicsFederateFree"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("fed"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("while")]),s._v(" h"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helicsBrokerIsConnected"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("broker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("is")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("True")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        time"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("sleep"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n    h"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helicsBrokerDisconnect"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("broker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n    h"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("helicsCloseLibrary"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\natexit"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("register"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("f_at_exit"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);