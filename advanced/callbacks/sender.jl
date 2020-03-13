# -*- coding: utf-8 -*-
using HELICS

const h = HELICS

mutable struct MessageBlock
    x::Int
end

function logger(level::Cint, identifier::Cstring, message::Cstring, udata::Ptr{Cvoid})::Cvoid
    m = unsafe_pointer_to_objref(Ptr{MessageBlock}(udata)) # cast
    m.x += 1
    print("$level, $(unsafe_string(identifier)), $(unsafe_string(message)), $(m)\n")
end

function main()

    initstring = "-f 2 --name=mainbroker"
    fedinitstring = "--broker=mainbroker --federates=1"
    deltat = 0.01

    helicsversion = h.helicsGetVersion()

    println("Helics version = $helicsversion")

    # Create broker #
    println("Creating Broker")
    broker = h.helicsCreateBroker("zmq", "", initstring)
    println("Created Broker")

    println("Checking if Broker is connected")
    isconnected = h.helicsBrokerIsConnected(broker)
    println("Checked if Broker is connected")

    if isconnected == 1
        println("Broker created and connected")
    end

    # Create Federate Info object that describes the federate properties #
    fedinfo = h.helicsCreateFederateInfo()

    h.helicsFederateInfoSetIntegerProperty(fedinfo, h.HELICS_PROPERTY_INT_LOG_LEVEL, 9);

    # Set Federate name #
    h.helicsFederateInfoSetCoreName(fedinfo, "TestA Federate")

    # Set core type from string #
    h.helicsFederateInfoSetCoreTypeFromString(fedinfo, "zmq")

    # Federate init string #
    h.helicsFederateInfoSetCoreInitString(fedinfo, fedinitstring)

    # Set the message interval (timedelta) for federate. Note th#
    # HELICS minimum message time interval is 1 ns and by default
    # it uses a time delta of 1 second. What is provided to the
    # setTimedelta routine is a multiplier for the default timedelta.

    # Set one second message interval #
    h.helicsFederateInfoSetTimeProperty(fedinfo, h.HELICS_PROPERTY_TIME_DELTA, deltat)

    # Create value federate #
    vfed = h.helicsCreateValueFederate("TestA Federate", fedinfo)
    println("Value federate created")

    # Register the publication #
    pub = h.helicsFederateRegisterGlobalTypePublication(vfed, "testA", "double", "")
    println("Publication registered")

    userdata = MessageBlock(5)

    p = Ref(userdata)

    println(p)

    h.helicsFederateSetLoggingCallback(vfed, @cfunction(logger, Cvoid, (Cint, Cstring, Cstring, Ptr{Cvoid})), p)

    #################################################################################


    # Enter execution mode #
    h.helicsFederateEnterExecutingMode(vfed)
    println("Entering execution mode")

    # This federate will be publishing deltat*pi for numsteps steps #
    this_time = 0.0
    value = pi

    for t in 5:10
        val = value

        currenttime = h.helicsFederateRequestTime(vfed, Float64(t))

        h.helicsFederateLogInfoMessage(vfed, "test MEXAGE");

        h.helicsPublicationPublishDouble(pub, Float64(val))
        println(
            "Sending value pi = $val at time $currenttime to PI RECEIVER"
        )

        sleep(1)
    end

    h.helicsFederateFinalize(vfed)
    println("Federate finalized")

    while h.helicsBrokerIsConnected(broker)
        sleep(1)
    end

    h.helicsFederateFree(vfed)
    h.helicsCloseLibrary()

    println("Broker disconnected")

end

main()
