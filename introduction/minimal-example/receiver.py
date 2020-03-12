# -*- coding: utf-8 -*-
import os
import time
import helics as h
from math import pi

fed = h.helicsCreateCombinationFederateFromConfig(
    os.path.join(os.path.dirname(__file__), "receiver.json")
)

topicA = h.helicsFederateGetSubscription(fed, "topicA")

h.helicsFederateEnterExecutingMode(fed)

for t in range(5, 10):
    currenttime = h.helicsFederateRequestTime(fed, t)
    a = h.helicsInputGetComplex(topicA)
    print(f"a: {a}")

h.helicsFederateFinalize(fed)
h.helicsFederateFree(fed)
h.helicsCloseLibrary()
