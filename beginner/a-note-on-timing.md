# A Note on Timing

Understanding timing in HELICS is crucial to build a correct co-simulation.

Let's consider a `sender.jl` federate like below:

```julia
using HELICS; const h = HELICS

function main()

    initstring = "-f 2 --loglevel=7"
    broker = h.helicsCreateBroker("zmq", "", initstring)
    @assert h.helicsBrokerIsConnected(broker) is true

    fed = h.helicsCreateCombinationFederateFromConfig(
        joinpath(@__DIR__, "sender.json")
    )

    topicA = h.helicsFederateGetPublication(fed, "topicA")

    h.helicsFederateEnterExecutingMode(fed)

    currenttime = 0

    for t in 5:10
        while currenttime < t
            currenttime = h.helicsFederateRequestTime(fed, t)
        end
        println("Sending t = $t at time = $currenttime")
        h.helicsPublicationPublishDouble(topicA, Float64(t))
    end

    h.helicsFederateFinalize(fed)
    h.helicsFederateFree(fed)
    h.helicsCloseLibrary()

end

main()
```

and a `receiver.py` federate like below:

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
        _t = h.helicsInputGetDouble(topicA)
        print(f"Received t = {_t} at time = {currenttime}")

h.helicsFederateFinalize(fed)
h.helicsFederateFree(fed)
h.helicsCloseLibrary()
```

What do you think will be printed out by `receiver.py`?

Here is the output for `sender.jl`:

```
$ julia --project=../installation/ sender.jl

Sending t = 5 at time = 5.0
Sending t = 6 at time = 6.0
Sending t = 7 at time = 7.0
Sending t = 8 at time = 8.0
Sending t = 9 at time = 9.0
Sending t = 10 at time = 10.0
```

And here is the output for `receiver.py`:

```
$ python receiver.py

Received t = 0.0 at time = 5.0
Received t = 5.0 at time = 5.000000001
Received t = 5.0 at time = 6.0
Received t = 6.0 at time = 6.000000001
Received t = 6.0 at time = 7.0
Received t = 7.0 at time = 7.000000001
Received t = 7.0 at time = 8.0
Received t = 8.0 at time = 8.000000001
Received t = 8.0 at time = 9.0
Received t = 9.0 at time = 9.000000001
Received t = 9.0 at time = 10.0
```

Note that `receiver.py` gets the value `5.0`, `6.0`, `7.0`, ... at times `5.000000001`, `6.000000001`, `7.000000001`, ..., because this co-simulation is not iterative.
This means there's a minimum `timeDelta` after which the `receiver.py` will receive data.

You can change the `timeDelta` for a federate:

```python
# -*- coding: utf-8 -*-
import os
import helics as h

fedinfo = h.helicsCreateFederateInfo()
h.helicsFederateInfoSetCoreType(fedinfo, h.helics_core_type_zmq)
h.helicsFederateInfoSetCoreInitString(fedinfo, "--loglevel=7")
h.helicsFederateInfoSetTimeProperty(fedinfo, h.helics_property_time_delta, 0.5)
fed = h.helicsCreateCombinationFederate("receiver", fedinfo,)
topicA = h.helicsFederateRegisterSubscription(
    fed, "topicA", "",
)


h.helicsFederateEnterExecutingMode(fed)
currenttime = 0
for t in range(5, 10 + 1):
    while currenttime < t:
        currenttime = h.helicsFederateRequestTime(fed, t)
        a = h.helicsInputGetDouble(topicA)
        print(f"Received t = {a} at time = {currenttime}")

h.helicsFederateFinalize(fed)
h.helicsFederateFree(fed)
h.helicsCloseLibrary()
```

And the output will now be like so:

```
$ python receiver.py

Received t = 0.0 at time = 5.0
Received t = 5.0 at time = 5.5
Received t = 6.0 at time = 6.0
Received t = 6.0 at time = 7.0
Received t = 7.0 at time = 7.5
Received t = 7.0 at time = 8.0
Received t = 8.0 at time = 8.5
Received t = 8.0 at time = 9.0
Received t = 9.0 at time = 9.5
Received t = 9.0 at time = 10.0
```
