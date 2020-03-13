# -*- coding: utf-8 -*-
import os
import helics as h

fed = h.helicsCreateCombinationFederateFromConfig(
    os.path.join(os.path.dirname(__file__), "receiver.json")
)

topicA = h.helicsFederateGetSubscription(fed, "topicA")

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
