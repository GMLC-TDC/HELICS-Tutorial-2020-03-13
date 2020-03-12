# -*- coding: utf-8 -*-
import os
import time
import helics as h
from math import pi

fed = h.helicsCreateCombinationFederateFromConfig(
    os.path.join(os.path.dirname(__file__), "sender.json")
)

topicA = h.helicsFederateGetPublication(fed, "topicA")

h.helicsFederateEnterExecutingMode(fed)

for t in range(5, 10):
    currenttime = h.helicsFederateRequestTime(fed, t)
    h.helicsPublicationPublishDouble(topicA, pi)

h.helicsFederateFinalize(fed)
h.helicsFederateFree(fed)
h.helicsCloseLibrary()
