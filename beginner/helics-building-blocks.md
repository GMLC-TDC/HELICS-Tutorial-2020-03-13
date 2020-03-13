# Building Blocks of HELICS

## HELICS library functions

Let's look at what is in the HELICS library.

```python
$ ipython
Python 3.7.6 (default, Jan  8 2020, 13:42:34)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.12.0 -- An enhanced Interactive Python. Type '?' for help.

In [1]: import helics as h

In [2]: import types

In [5]: len([o for o in dir(h) if o.startswith("helics")])
Out[5]: 394

In [3]: functions = [f for f in dir(h) if isinstance(getattr(h, f), types.FunctionType)]

In [4]: len(functions)
Out[4]: 272
```

That's a lot of functions.
Let's see if we can categorize them somehow to understand what all these functions are.

```python
In [6]: from re import finditer
   ...: def camel_case_split(identifier):
   ...:     matches = finditer('.+?(?:(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|$)', identifier)
   ...:     return [m.group(0) for m in matches]
   ...:

In [7]: set("".join(camel_case_split(f)[:2]) for f in functions)
Out[7]:
{'helicsBroker',
 'helicsCleanup',
 'helicsClose',
 'helicsCore',
 'helicsCreate',
 'helicsEndpoint',
 'helicsFederate',
 'helicsFilter',
 'helicsGet',
 'helicsInput',
 'helicsIs',
 'helicsMessage',
 'helicsPublication',
 'helicsQuery',
 'helicsSubscription'}

In [8]: len(_)
Out[8]: 15
```

Even though there's a large number of functions, there seems to be just 15 fundamental "kinds" of functions.

For example, there's a single function called `helicsCleanupLibrary` and another function called `helicsCloseLibrary`

Let's see what all the `helicsCreate...` functions are:

```python
In [12]: [f for f in functions if f.startswith("helicsCreate")]
Out[12]:
['helicsCreateBroker',
 'helicsCreateBrokerFromArgs',
 'helicsCreateCombinationFederate',
 'helicsCreateCombinationFederateFromConfig',
 'helicsCreateCore',
 'helicsCreateCoreFromArgs',
 'helicsCreateFederateInfo',
 'helicsCreateMessageFederate',
 'helicsCreateMessageFederateFromConfig',
 'helicsCreateQuery',
 'helicsCreateValueFederate',
 'helicsCreateValueFederateFromConfig']

In [24]: len([f for f in functions if any([
    ...:     f.startswith("helicsFederate"),
    ...:     f.startswith("helicsFederateInfo"),
    ...:     f.startswith("helicsBroker"),
    ...:     f.startswith("helicsEndpoint"),
    ...:     f.startswith("helicsFilter"),
    ...:     f.startswith("helicsInput"),
    ...:     f.startswith("helicsMessage"),
    ...:     f.startswith("helicsPublication"),
    ...:     f.startswith("helicsQuery")])
    ...:    ])
Out[24]: 233
```

85% of all HELICS functions fall under one of these "kinds" of functions:

1. `Broker`
1. `Core`
1. `Endpoint`
1. `Federate`
1. `FederateInfo`
1. `Filter`
1. `Input`
1. `Message`
1. `Publication`
1. `Query`

Let's look at some of these in more detail.

![HELICS Architecture](https://helics.readthedocs.io/en/latest/_images/helics_architecture_1.png)

## `Broker`

The `Broker` is like the heart of a co-simulation.
It is responsible for performing the two key tasks of a co-simulation: maintaining synchronization in the federation and facilitating message exchange.
It keeps track of every `Federate`, what simulation times they are requesting, what data is being published or subscribed from them, etc.

Brokers receive and distribute messages from any federates that are connected to it, routing them to the appropriate location.
HELICS also supports a hierarchy of brokers, allowing brokers to pass messages between each other to connect federates associated with different brokers and thus maintain the integrity of the federation.
The broker at the top of the hierarchy is called the “root broker” and it is the message router of last resort.

At the minimum, you need two things to create a `Broker`. A `core_type` and a `configureString`.

The following are examples of valid `core_type`s.

- `inproc`
- `tcp`
- `udp`
- `zmq`

`core_type`s are essentially abstractions on top of protocols for communicating data over a wire or over memory.
They are usually implementation details that the average user does not need to worry about.

See [CoreTypes](https://helics.readthedocs.io/en/latest/configuration/CoreTypes.html) for more information.

We will be using the `zmq` `core_type` for this tutorial.

The `configureString` allows passing in various options that you might pass to the command line version of the `helics_broker`.
The most important argument is `-f $N` where `$N` is the minimum number of federates that will be connecting to this broker.

So the following string:

```python
configureString = "-f 2"
```

implies that you expect 2 federates at minimum to connect to this broker.

```python
In [13]: [f for f in functions if f.startswith("helicsBroker")]
Out[13]:
['helicsBrokerAddDestinationFilterToEndpoint',
 'helicsBrokerAddSourceFilterToEndpoint',
 'helicsBrokerClone',
 'helicsBrokerDataLink',
 'helicsBrokerDestroy',
 'helicsBrokerDisconnect',
 'helicsBrokerFree',
 'helicsBrokerGetAddress',
 'helicsBrokerGetIdentifier',
 'helicsBrokerIsConnected',
 'helicsBrokerIsValid',
 'helicsBrokerMakeConnections',
 'helicsBrokerSetGlobal',
 'helicsBrokerSetLogFile',
 'helicsBrokerWaitForDisconnect']
```

## `Core`

As mentioned earlier, the core is the software that has been embedded inside a simulator to allow it to join a HELICS federation.
Generally, each federate has a single core but there are special cases where a single executable is used to represent multiple federates and all of those federates use a single core.
Cores are built around specific message buses with HELICS supporting a number of different bus types.
Selection of the message bus is part of the configuration process required to form the federation.
See Core Types for details on the available Types of cores.

```python
In [14]: [f for f in functions if f.startswith("helicsCore")]
Out[14]:
['helicsCoreAddDestinationFilterToEndpoint',
 'helicsCoreAddSourceFilterToEndpoint',
 'helicsCoreClone',
 'helicsCoreConnect',
 'helicsCoreDataLink',
 'helicsCoreDestroy',
 'helicsCoreDisconnect',
 'helicsCoreFree',
 'helicsCoreGetAddress',
 'helicsCoreGetIdentifier',
 'helicsCoreIsConnected',
 'helicsCoreIsValid',
 'helicsCoreMakeConnections',
 'helicsCoreRegisterCloningFilter',
 'helicsCoreRegisterFilter',
 'helicsCoreSetGlobal',
 'helicsCoreSetLogFile',
 'helicsCoreSetReadyToInit',
 'helicsCoreWaitForDisconnect']
```

## `Federate`

`Federate`s are the running instances of simulators that have been assigned specific models and/or have specific values they are providing to and receiving from other federates.

To first create a `Federate`, you need two things. The name of the `Federate` and an instance of a `FederateInfo` object.
The name of a `Federate` must be unique across a co-simulation.
The `FederateInfo` object contains information about the `Core`, the various timing related properties and various behaviour related properties of a `Federate`.

There are a two "kinds" of `Federate`:

- `ValueFederate`
- `MessageFederate`

There's a third `Federate` called the `CombinationFederate` which has features of both the `ValueFederate` and `MessageFederate`.
We will go into what these are in a later section.

```julia
name = "FederateA"

federate_info = h.helicsCreateFederateInfo()
h.helicsFederateInfoSetCoreTypeFromString(federate_info, "zmq")
h.helicsFederateInfoSetCoreInitString(federate_info, "--federates=1")
h.helicsFederateInfoSetTimeProperty(federate_info, h.HELICS_PROPERTY_TIME_DELTA, 1)

fed = h.helicsCreateCombinationFederate(name, federate_info)
```

The `helicsFederateInfoSetCoreInitString` function is useful for configuring the `Federate` `Core`.

There's a few kinds of `helicsFederate...` functions as well.

### `helicsFederateEnterInitializingMode` and `helicsFederateEnterExecutingMode`

This will create the federates as entities recognized by the broker, set-up the communication channels for their messages to be passed, pass some initial messages and execute some preliminary code as preparation for the beginning of the co-simulation proper.
The later is particularly important if the various federates need to reach a self-consistent state as an initial condition of the system.

### `helicsFederateFinalize` and `helicsFederateFree`

At this point, if all has gone well, the federates gracefully signal their core that they are leaving the federation.
Eventually, once all the federates have left, the rest of the infrastructure disassembles itself and also terminates.

### `helicsFederateRegister...`

- `helicsFederateRegisterCloningFilter`
- `helicsFederateRegisterEndpoint`
- `helicsFederateRegisterFilter`
- `helicsFederateRegisterFromPublicationJSON`
- `helicsFederateRegisterGlobalCloningFilter`
- `helicsFederateRegisterGlobalEndpoint`
- `helicsFederateRegisterGlobalFilter`
- `helicsFederateRegisterGlobalInput`
- `helicsFederateRegisterGlobalPublication`
- `helicsFederateRegisterGlobalTypeInput`
- `helicsFederateRegisterGlobalTypePublication`
- `helicsFederateRegisterInput`
- `helicsFederateRegisterInterfaces`
- `helicsFederateRegisterPublication`
- `helicsFederateRegisterTypeInput`
- `helicsFederateRegisterTypePublication`

### `helicsFederateRequest...`

- `helicsFederateRequestNextStep`
- `helicsFederateRequestTime`

![Multi Node HELICS Architecture](https://helics.readthedocs.io/en/latest/_images/helics_architecture_3.png)

## Data

Messages are the the information passed between federates during the execution of the co-simulation. Fundamentally, co-simulation is about message-passing.
In HELICS, there are various techniques and implementations of the message-passing infrastructure that have been implemented in the core.
There are also a variety of mechanisms within a co-simulation to define the nature of the data being exchanged (data type, for example) and how the data is distributed around the federation.
