# -*- coding: utf-8 -*-
import os
import helics as h
from math import pi
import time

initstring = "-f 2 --loglevel=7"
broker = h.helicsCreateBroker("zmq", "", initstring)
assert h.helicsBrokerIsConnected(broker) is True

fedinfo = h.helicsCreateFederateInfo()
h.helicsFederateInfoSetCoreType(fedinfo, h.helics_core_type_zmq)
h.helicsFederateInfoSetCoreInitString(fedinfo, "--loglevel=7")
h.helicsFederateInfoSetTimeProperty(fedinfo, h.helics_property_time_delta, 1.0)
fed = h.helicsCreateCombinationFederate("sender", fedinfo,)
topicA = h.helicsFederateRegisterGlobalPublication(
    fed, "topicA", h.helics_data_type_double, ""
)

h.helicsFederateEnterExecutingMode(fed)

currenttime = 0

for t in range(5, 10 + 1):
    while currenttime < t:
        currenttime = h.helicsFederateRequestTime(fed, t)
    print(f"Sending value = {pi} at time = {currenttime}")
    h.helicsPublicationPublishDouble(topicA, pi)

h.helicsFederateFinalize(fed)
h.helicsFederateFree(fed)

while h.helicsBrokerIsConnected(broker) is True:
    time.sleep(1)

h.helicsBrokerDisconnect(broker)

h.helicsCloseLibrary()
