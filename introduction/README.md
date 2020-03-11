# Introduction

Simulation and modeling techniques are used to approximate the real world systems, in order to understand, learn and predict complex behaviour. There are various modeling and simulation techniques used both in industry and science across various domains.

In order to simulate real world systems, we may need to either

1) simplify models
2) use a bigger computer
3) co-simulate subsystems

Simplifying models can result in loss of accuracy, which may be unacceptable in some scenarios.
Some problems may not be decomposable or parallelizable.
Some tools may exist that solve a subsystem well, but using a bigger computer may not be feasible if the tool does not scale well.
Various domains, and sometimes problems in various time scales of the _same_ domain, may utilize different models, different kinds of simulation techniques, or just different tools in general.
For example, you may 1) formulate and solve a Mixed Integer Linear Programming (MILP) optimization problem, 2) setup an iterative algorithm that approximates the solution to a non linear problem, 3) solve a set of linear analytical equations, 4) solve a set of dynamic differential equations, etc
Each of the above methods aims to solve a mathematical problem, and each of them require a different modeling and simulation technique.

Since parts of larger systems are modeled and simulated by different techniques, tools, and algorithms, it can be useful to couple these techniques, tools and algorithms to study the larger system itself.

Co-simulation is a technique where the simulation of a coupled system can be achieved by composing the simulations of its parts.

In co-simulation, the different subsystems which form a coupled problem are modeled and simulated in a distributed manner.
Hence, the modeling is done on the subsystem level without having the coupled problem in mind.
Furthermore, the coupled simulation is carried out by running the subsystems in a black-box manner.
During the simulation the subsystems will exchange data at various points in simulation time.


Co-simulation allows execution of multiple distinct simulation objects together in coherent fashion.
Co-simulation is used whenever a single simulator is insufficient to answer the relevant questions.

## Why Co-Simulation?

There has been a lots of effort that has gone into domain-specific tools for various subsystems.
These tools are trusted by stakeholders and continue to improve.

Co-simulation allows focus of new work to be on the “glue-ware”.
This allows faster prototyping for research
And this also encourages modularity of each subsystem.
One can swap models as needed

## What is HELICS?

[HELICS](https://helics.readthedocs.io/en/latest/) is an open-source cyber-physical-energy co-simulation framework for energy systems.

### Software Capabilities

- Scalable: 2-100,000+ Federates
- Cross-platform: HPC (Linux), Cloud, Workstations, Laptops (Windows/OSX)
- Modular: mix and match tools
- Minimally invasive: easy to use lab/commercial/open tools
- Open Source: BSD-style.
- Many Simulation Types:
    - Discrete Event
    - QSTS
    - Dynamics
- Co-iteration enabled: “tight coupling”

### Technical details

HELICS is largely a C++ codebase.

```
-------------------------------------------------------------------------------
 Language            Files        Lines         Code     Comments       Blanks
-------------------------------------------------------------------------------
 C                       8        28869        25671          544         2654
 C Header              132        78186        50764        18180         9242
 C++                   694       229038       185268        17099        26671
 C++ Header            814       235551       150768        54143        30640
 Java                   22         5298         2538         2264          496
 Markdown              112        12062        12062            0            0
 Plain Text            102        34860        34860            0            0
 Python                 40         9545         7336          760         1449
 SWIG                   13         1555          941          406          208
```

### HELICS philosophy

Illustration of a simple **federation** consisting of two **federates**.

```bash
    +--------------------+               +--------------------+
    |                    |               |                    |
    |                    |               |                    |
    |                    |               |                    |
    |                    |               |                    |
    |                    |               |                    |
    |                    |               |                    |
    |                    |               |                    |
    |    Federate - 1    |               |    Federate - 2    |
    |                    |               |                    |
    |                    |               |                    |
    |                    |               |                    |
    |       +-----------------+     +-----------------+       |
    |       |                 |     |                 |       |
    |       |                 |     |                 |       |
    |       | helicsSharedLib |     | helicsSharedLib |       |
    |       |                 |     |                 |       |
    |       |                 |     |                 |       |
    |       +---------------x-+     +-x---------------+       |
    |                    |  ^         ^  |                    |
    +--------------------+  |         |  +--------------------+
                            |         |
                            v         v
                         +--x---------x--+
                         |               |
                         |               |
                         |    Broker     |
                         |               |
                         |               |
                         +---------------+
```

A **federation** is called a co-simulation consists of multiple **federates**, or components, agents or actors.
These federates exchange data at given points in time.
HELICS manages time in a distributed fashion based on how the federation is configured during initialization.
If you have a program and you wish to exchange data with another HELICS federate, you can create a `Federate` by calling a function.
This federate must be provided with some information in order to set it up correctly.
All `Federate`s must connect to a `Broker`.
A `Broker` is a separate process that can run on the same machine or a remote machine.
You can start a `Broker` by calling another function.
Both creating a `Federate` and `Broker` object can take some initialization options in the form of a `initstring`.
See the [`examples`](https://github.com/GMLC-TDC/HELICS-Examples) folder for more information.

After creating a `Federate`, you will want to create `Publication`s and `Subscription`s.
The strings you choose for these publications and subscriptions must be unique, and they act like topics in a federation.
You can send data in the form of values from a `Publication` to a `Subscription`.
Additionally, you can register `Endpoint`s as well, which allow you to send `Message`s.
`Message`s can be filtered on by any `Federate` and can be used to model complex communication interactions.

You can use some functions to send values at the "current time" (i.e. current simulation time), and other functions to receive values at the "current time".

And you can request to move forward to a time by using the [`HELICS.helicsFederateRequestTime`](@ref) function.
This function returns a time back that you can safely move to.
The time granted by the broker that a federate is allowed to move to will always be less than or equal to the requested time.
If you wish to move to the requested time, you may use a while loop until that the granted time is equal to the requested time.

```python hl_lines="4 5 6"
for t in range(0, 100):

    requested_time = t
    while granted_time < requested_time:
        granted_time = h.helicsFederateRequestTime(requested_time)

    # granted_time here will be equal to requested time
    # Send or Receive data here
```

`helicsSharedLib` is a shared library that must be included in each federate and is the library that contains all these functions.
This C/C++ shared library interfaces with the broker in other to communicate with other federates.
