# Cosimulation Example

This is an example of a simple sender and receiver Python HELICS federation.

## Simple cosimulation between sender and receiver

Send any floating point value from simulation time 5 to simulation time 10 from one process to another.

If you'd like to try to build this yourself, you can.

## Implementation

We need two processes. We need the a `sender.py`:

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

with `sender.json`:

```json
{
  "coreType": "zmq",
  "loglevel": 7,
  "name": "sender",
  "publications": [
    {
      "global": true,
      "key": "topicA",
      "required": true,
      "type": "double"
    }
  ],
  "timeDelta": 1.0
}
```

and we need a `receiver.py`:

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

and `receiver.json`:

```json
{
  "coreType": "zmq",
  "loglevel": 7,
  "name": "receiver",
  "subscriptions": [
    {
      "global": true,
      "key": "topicA",
      "required": true,
      "type": "double"
    }
  ],
  "timeDelta": 1.0
}
```

## Output

This is the output of sender.py and receiver.py.

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
Received a = 3.141592653589793 at time = 6.0
Received a = 3.141592653589793 at time = 7.0
Received a = 3.141592653589793 at time = 8.0
Received a = 3.141592653589793 at time = 9.0
Received a = 3.141592653589793 at time = 10.0
```

You'll notice receiver.py received value `0.0` at time `5.0`.

This is because `receiver.py` made a request to move to time `5.0` and was granted that time.
