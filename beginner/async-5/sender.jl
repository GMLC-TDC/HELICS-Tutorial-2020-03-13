using HELICS; const h = HELICS

function main()

    initstring = "-f 2 --loglevel=7"
    broker = h.helicsCreateBroker("zmq", "", initstring)
    @assert h.helicsBrokerIsConnected(broker) == true

    fedinfo = h.helicsCreateFederateInfo()
    h.helicsFederateInfoSetCoreType(fedinfo, h.HELICS_CORE_TYPE_ZMQ)
    h.helicsFederateInfoSetCoreInitString(fedinfo, "--loglevel=7")
    h.helicsFederateInfoSetTimeProperty(fedinfo, h.HELICS_PROPERTY_TIME_DELTA, 1.0)
    fed = h.helicsCreateCombinationFederate("sender", fedinfo,)

    topicA = h.helicsFederateRegisterGlobalPublication(
        fed, "topicA", h.HELICS_DATA_TYPE_DOUBLE, ""
    )

    h.helicsFederateEnterExecutingMode(fed)

    currenttime = 0
    for t in 5:10
        while currenttime < t
            currenttime = h.helicsFederateRequestTime(fed, t)
        end
        sleep(2) # Do some computationally demanding work here
        println("Sending t = $t at time = $currenttime")
        h.helicsPublicationPublishDouble(topicA, Float64(t))
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
