using HELICS; const h = HELICS

function main()

    initstring = "-f 2 --loglevel=7"
    broker = h.helicsCreateBroker("zmq", "", initstring)
    @assert h.helicsBrokerIsConnected(broker) == true

    fedinfo = h.helicsCreateFederateInfo()
    h.helicsFederateInfoSetCoreType(fedinfo, h.HELICS_CORE_TYPE_ZMQ)
    h.helicsFederateInfoSetCoreInitString(fedinfo, "--loglevel=7")
    h.helicsFederateInfoSetTimeProperty(fedinfo, h.HELICS_PROPERTY_TIME_DELTA, 1.0)
    fed = h.helicsCreateCombinationFederate("sender", fedinfo)

    h.helicsFederateSetFlagOption(fed, h.HELICS_FLAG_IGNORE_TIME_MISMATCH_WARNINGS, true)
    epid1 = h.helicsFederateRegisterGlobalEndpoint(fed, "ep1", "")

    h.helicsFederateEnterExecutingMode(fed)

    @assert h.HELICS_STATE_EXECUTION == h.helicsFederateGetState(fed)

    fid = h.helicsFederateRegisterFilter(fed, h.HELICS_FILTER_TYPE_DELAY, "filter1")
    h.helicsFilterAddSourceTarget(fid, "ep1")
    h.helicsFilterSet(fid, "delay", 2.5)

    currenttime = 0

    for t in 5:10
        # h.helicsFederateRequestTimeAsync(fed, 1.0)
        # sleep(1)
        # complete_time = h.helicsFederateRequestTimeComplete(fed)
        while currenttime < t
            currenttime = h.helicsFederateRequestTime(fed, t)
        end

        h.helicsEndpointSendEventRaw(epid1, "ep2", "message$t", Float64(t))
    end

    h.helicsFederateFinalize(fed)
    h.helicsFederateFree(fed)

    while h.helicsBrokerIsConnected(broker) == true
        sleep(1)
    end

    h.helicsBrokerDisconnect(broker)

    h.helicsCloseLibrary()
end

main()
