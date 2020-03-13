# Building Blocks of HELICS

## HELICS library

Let's look at what is in the HELICS library.

```python
Python 3.7.6 (default, Jan  8 2020, 13:42:34)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.12.0 -- An enhanced Interactive Python. Type '?' for help.

In [1]: import helics as h

In [2]: import types

In [3]: len([f for f in dir(h) if isinstance(getattr(h, f), types.FunctionType)])
Out[3]: 272
```

That's a lot of functions.

```python
In [4]: len([f for f in dir(h) if isinstance(getattr(h, f), types.FunctionType)])

In [5]: len([f for f in functions if f.startswith("helicsFederate")])
Out[5]: 100
```

There are over a 100 functions that begin with helicsFederate

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

Even though there's a large number of functions, there's just 15 fundamental "kinds" of functions.

There's a function for `helicsCleanupLibrary` and `helicsCloseLibrary`, and some of the following functions that we can talk about later.

```python
In [9]: [f for f in functions if f.startswith("helicsGet")]
Out[9]:
['helicsGetFederateByName',
 'helicsGetOptionIndex',
 'helicsGetPropertyIndex',
 'helicsGetVersion']

In [10]: [f for f in functions if f.startswith("helicsIs")]
Out[10]: ['helicsIsCoreTypeAvailable']

In [11]: [f for f in functions if f.startswith("helicsSubscription")]
Out[11]: ['helicsSubscriptionGetKey']
```

This is a list of all the `helicsCreate...` functions:

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
```
So, almost all the remaining HELICS functions fall under one of these "kinds" of functions:

1. `Broker`
1. `Core`
1. `Endpoint`
1. `Federate`
1. `Filter`
1. `Input`
1. `Message`
1. `Publication`
1. `Query`

We will talk about `Broker`, `Federate`, `Publication`, `Input` and `Message` in this section.
We will talk about the remaining in the advanced section of this tutorial.

## Broker

A `Broker` is like the heart of a co-simulation.
It keeps track of every `Federate`, what simulation times they are requesting, what data is being published or subscribed from them, etc.

At the minimum, you need two things to create a `Broker`. A `core_type` and a `configureString`.

The following are valid `core_type`s.

- `inproc`
- `ipc`
- `mpi`
- `tcp`
- `test`
- `udp`
- `zmq`

Cores are essentially abstractions on top of protocols for communicating data over a wire or over memory.
They are usually implementation details that the average user does not need to worry about.

We will be using the `zmq` `core_type` for this tutorial.

The `configureString` allows passing in various options that you might pass to the command line version of the `helics_broker`.



## Federate

## Publication

## Input

## Message
