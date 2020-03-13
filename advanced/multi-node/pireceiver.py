# -*- coding: utf-8 -*-
import socket
import sys

import helics as h

# Get broker address from command args.
broker = sys.argv[1]
#
# Get broker address from command args.
ipaddr = sys.argv[2]

# Since we're running this in a different container than the sender, and
# thus will have a different IP, the local port can be set to the same
# port the sender uses. We can also just not specify it at all, in which
# case it will request an open port number from the broker to use before
# setting up the ZMQ PULL socket.
fedinitstring = "--federates=1 --broker_address=tcp://{} --interface=tcp://{}".format(
    broker, ipaddr
)

print(f"fedinitstring: {fedinitstring}")

deltat = 0.01

helicsversion = h.helicsGetVersion()

print("PI RECEIVER: Helics version = {}".format(helicsversion))

# Create Federate Info object that describes the federate properties */
print("PI RECEIVER: Creating Federate Info")
fedinfo = h.helicsCreateFederateInfo()

# Set Federate name
print("PI RECEIVER: Setting Federate Info Name")
h.helicsFederateInfoSetCoreName(fedinfo, "TestB Federate")

# Set core type from string
print("PI RECEIVER: Setting Federate Info Core Type")
h.helicsFederateInfoSetCoreTypeFromString(fedinfo, "zmq")

# Federate init string
print("PI RECEIVER: Setting Federate Info Init String")
h.helicsFederateInfoSetCoreInitString(fedinfo, fedinitstring)

# Set the message interval (timedelta) for federate. Note that
# HELICS minimum message time interval is 1 ns and by default
# it uses a time delta of 1 second. What is provided to the
# setTimedelta routine is a multiplier for the default timedelta.

# Set one second message interval
print("PI RECEIVER: Setting Federate Info Time Delta")
h.helicsFederateInfoSetTimeProperty(fedinfo, h.helics_property_time_delta, deltat)

# Create value federate
print("PI RECEIVER: Creating Value Federate")
vfed = h.helicsCreateValueFederate("TestB Federate", fedinfo)
print("PI RECEIVER: Value federate created")

# Subscribe to PI SENDER's publication
sub = h.helicsFederateRegisterSubscription(vfed, "testA", "")
print("PI RECEIVER: Subscription registered")

h.helicsFederateEnterExecutingMode(vfed)
print("PI RECEIVER: Entering execution mode")

value = 0.0
prevtime = 0

currenttime = -1

while currenttime <= 100:

    currenttime = h.helicsFederateRequestTime(vfed, 100)

    value = h.helicsInputGetDouble(sub)
    print(
        "PI RECEIVER: Received value = {} at time {} from PI SENDER".format(
            value, currenttime
        )
    )

h.helicsFederateFinalize(vfed)

h.helicsFederateFree(vfed)
h.helicsCloseLibrary()
print("PI RECEIVER: Federate finalized")
