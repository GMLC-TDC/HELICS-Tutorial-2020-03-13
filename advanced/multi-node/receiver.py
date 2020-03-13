# -*- coding: utf-8 -*-
import os
import helics as h

broker_address = "127.0.0.1:12345"
interface_address = "127.0.0.1:32432"

fedinfo = h.helicsCreateFederateInfo()
h.helicsFederateInfoSetCoreType(fedinfo, h.helics_core_type_zmq)
h.helicsFederateInfoSetCoreInitString(
    fedinfo,
    f"--federates=1 --broker_address=tcp://{broker_address} --interface=tcp://{interface_address} --loglevel=7",
)
h.helicsFederateInfoSetTimeProperty(fedinfo, h.helics_property_time_delta, 0.5)
fed = h.helicsCreateCombinationFederate("receiver", fedinfo,)
topicA = h.helicsFederateRegisterSubscription(fed, "topicA", "",)


h.helicsFederateEnterExecutingMode(fed)
currenttime = 0
for t in range(5, 10 + 1):
    while currenttime < t:
        currenttime = h.helicsFederateRequestTime(fed, t)
        a = h.helicsInputGetDouble(topicA)
        print(f"Received a = {a} at time = {currenttime}")

h.helicsFederateFinalize(fed)
h.helicsFederateFree(fed)
h.helicsCloseLibrary()
