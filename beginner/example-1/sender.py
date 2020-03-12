# -*- coding: utf-8 -*-
import os
import helics as h
from math import pi

fed = h.helicsCreateCombinationFederateFromConfig(
    os.path.join(os.path.dirname(__file__), "sender.json")
)

topicA = h.helicsFederateGetPublication(fed, "topicA")

h.helicsFederateEnterExecutingMode(fed)

currenttime = 0

for t in range(5, 10 + 1):
    while currenttime < t:
        currenttime = h.helicsFederateRequestTime(fed, t)
    print(f"Sending value = {pi} at time = {currenttime}")
    h.helicsPublicationPublishDouble(topicA, pi)

h.helicsFederateFinalize(fed)
h.helicsFederateFree(fed)
h.helicsCloseLibrary()
