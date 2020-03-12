# Example 2

## Changing RequestTime calls

```python
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
```

```python
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
```

## Output

**Sender.py**

```
Sending value = 3.141592653589793 at time = 5.0
Sending value = 3.141592653589793 at time = 6.0
Sending value = 3.141592653589793 at time = 7.0
Sending value = 3.141592653589793 at time = 8.0
Sending value = 3.141592653589793 at time = 9.0
Sending value = 3.141592653589793 at time = 10.0
```

**Receiver.py**

```
Received a = 0.0 at time = 5.0
Received a = 3.141592653589793 at time = 5.000000001
Received a = 3.141592653589793 at time = 6.0
Received a = 3.141592653589793 at time = 6.000000001
Received a = 3.141592653589793 at time = 7.0
Received a = 3.141592653589793 at time = 7.000000001
Received a = 3.141592653589793 at time = 8.0
Received a = 3.141592653589793 at time = 8.000000001
Received a = 3.141592653589793 at time = 9.0
Received a = 3.141592653589793 at time = 9.000000001
Received a = 3.141592653589793 at time = 10.0
```
