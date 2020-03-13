# Revisiting the Cosimulation Example

Let's take a closer look at the simple co-simulation from earlier.

## Building a federate programmatically

In `sender.py`, we had `h.helicsCreateCombinationFederateFromConfig`.

This read the following `sender.json`:

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

We can replace the single call to create a federate using these lines:

```python
fedinfo = h.helicsCreateFederateInfo()
h.helicsFederateInfoSetCoreType(fedinfo, h.helics_core_type_zmq)
h.helicsFederateInfoSetCoreInitString(fedinfo, "--loglevel=7")
h.helicsFederateInfoSetTimeProperty(fedinfo, h.helics_property_time_delta, 1.0)

topicA = h.helicsFederateRegisterGlobalPublication(fed, "topicA", h.helics_data_type_double, "")
```

Additionally, we can create a `Broker` in the same process as one of the federates.

```python
initstring = "-f 2 --loglevel=7"
broker = h.helicsCreateBroker("zmq", "", initstring)
assert h.helicsBrokerIsConnected(broker) == True
```

We can use the same `receiver.py` and `receiver.json` from earlier.

Running it will give us the same output as earlier.

We should not forget to clean up after ourselves.
We need to disconnect the broker before calling `helicsCloseLibrary`

```
while h.helicsBrokerIsConnected(broker):
    time.sleep(1)

h.helicsBrokerDisconnect(broker)
```

You may want to consider using `atexit`:

```
import atexit

def f_at_exit():

    h.helicsFederateFinalize(fed)
    h.helicsFederateFree(fed)

    while h.helicsBrokerIsConnected(broker) is True:
        time.sleep(1)

    h.helicsBrokerDisconnect(broker)

    h.helicsCloseLibrary()

atexit.register(f_at_exit)
```
