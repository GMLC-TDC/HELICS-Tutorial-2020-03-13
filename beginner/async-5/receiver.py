# -*- coding: utf-8 -*-
import os
import helics as h
import time

fedinfo = h.helicsCreateFederateInfo()
h.helicsFederateInfoSetCoreType(fedinfo, h.helics_core_type_zmq)
h.helicsFederateInfoSetCoreInitString(fedinfo, "--loglevel=7")
h.helicsFederateInfoSetTimeProperty(fedinfo, h.helics_property_time_delta, 0.5)
fed = h.helicsCreateCombinationFederate("receiver", fedinfo,)
topicA = h.helicsFederateRegisterSubscription(fed, "topicA", "",)


h.helicsFederateEnterExecutingMode(fed)
currenttime = 0
for t in range(5, 10 + 1):
    while currenttime < t:

        print("Requesting time")
        h.helicsFederateRequestTimeAsync(fed, t)

        while not h.helicsFederateIsAsyncOperationCompleted(fed):
            time.sleep(1)

        print("Finished requesting time")

        currenttime = h.helicsFederateRequestTimeComplete(fed)

        a = h.helicsInputGetDouble(topicA)
        print(f"Received a = {a} at time = {currenttime}")

h.helicsFederateFinalize(fed)
h.helicsFederateFree(fed)
h.helicsCloseLibrary()
