# Filters

```julia
function createBroker(number=1)
    initstring = "-f $number --name=mainbroker --loglevel=0"
    @test_throws h.HELICSErrorInvalidArgument broker = h.helicsCreateBroker("mq", "", initstring)
    broker = h.helicsCreateBroker("zmq", "", initstring)
    @test broker isa h.Broker
    @test h.helicsBrokerIsConnected(broker) == true
    return broker
end

function setupFederateInfo(name="A Core", number=1, deltat=0.01)
    fedinitstring = "--broker=mainbroker --federates=$number"

    fedinfo = h.helicsCreateFederateInfo()

    h.helicsFederateInfoSetCoreName(fedinfo, "Test$name")

    h.helicsFederateInfoSetCoreTypeFromString(fedinfo, "zmq")

    h.helicsFederateInfoSetCoreInitString(fedinfo, fedinitstring)

    h.helicsFederateInfoSetTimeProperty(fedinfo, h.HELICS_PROPERTY_TIME_DELTA, deltat)
    h.helicsFederateInfoSetIntegerProperty(fedinfo, h.HELICS_PROPERTY_INT_LOG_LEVEL, -1)
    return fedinfo
end

function createValueFederate(federates=1, name="A Federate", deltat=0.01)
    fedinfo= setupFederateInfo(name, federates, deltat)
    vFed = h.helicsCreateValueFederate("Test$name", fedinfo)
    @test vFed isa h.ValueFederate
    return vFed, fedinfo
end

function destroyBroker(broker)
    h.helicsBrokerDisconnect(broker)
    h.helicsCloseLibrary()
end

function destroyFederate(fed, fedinfo, broker=nothing)
    h.helicsFederateFinalize(fed)
    state = h.helicsFederateGetState(fed)
    if broker !== nothing
        while (h.helicsBrokerIsConnected(broker))
            sleep(1)
        end
    end
    h.helicsFederateInfoFree(fedinfo)
    h.helicsFederateFree(fed)
    if broker !== nothing
        destroyBroker(broker)
    end
end

destroyValueFederate(args...) = destroyFederate(args...)
destroyMessageFederate(args...) = destroyFederate(args...)


function main()
    broker = createBroker(2)

    fFed, ffedinfo = createMessageFederate(1, "filter")
    mFed, mfedinfo = createMessageFederate(1, "message")

    p1 = h.helicsFederateRegisterGlobalEndpoint(mFed, "port1", "")
    p2 = h.helicsFederateRegisterGlobalEndpoint(mFed, "port2", "random")

    f1 = h.helicsFederateRegisterGlobalFilter(fFed, h.HELICS_FILTER_TYPE_CUSTOM, "filter1")
    h.helicsFilterAddSourceTarget(f1, "port1")
    f2 = h.helicsFederateRegisterGlobalFilter(fFed, h.HELICS_FILTER_TYPE_DELAY, "filter2")
    h.helicsFilterAddSourceTarget(f2, "port1")
    h.helicsFederateRegisterEndpoint(fFed,"fout","")
    f3 = h.helicsFederateRegisterFilter(fFed, h.HELICS_FILTER_TYPE_RANDOM_DELAY, "filter3")
    h.helicsFilterAddSourceTarget(f3,"filter/fout")

    h.helicsFilterSet(f2, "delay", 2.5)
    h.helicsFederateEnterExecutingModeAsync(fFed)
    h.helicsFederateEnterExecutingMode(mFed)
    h.helicsFederateEnterExecutingModeComplete(fFed)
    state = h.helicsFederateGetState(fFed)
    @assert state == 2
    data = "hello world"

    filt_key = h.helicsFilterGetName(f1)
    @assert filt_key == "filter1"

    filt_key = h.helicsFilterGetName(f2)
    @assert filt_key == "filter2"

    h.helicsEndpointSendMessageRaw(p1, "port2", data)
    h.helicsFederateRequestTimeAsync(mFed, 1.0)
    grantedtime = h.helicsFederateRequestTime(fFed, 1.0)
    @assert grantedtime == 1.0
    grantedtime = h.helicsFederateRequestTimeComplete(mFed)
    @assert grantedtime == 1.0
    res = h.helicsFederateHasMessage(mFed)
    @assert res == 0
    res = h.helicsEndpointHasMessage(p2)
    @assert res == 0

    h.helicsFederateFinalize(mFed)
    h.helicsFederateFinalize(fFed)

    destroyFederate(fFed, ffedinfo)
    destroyFederate(mFed, mfedinfo)
    sleep(1.0)
    destroyBroker(broker)
end
```
