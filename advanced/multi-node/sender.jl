using HELICS; const h = HELICS

function main()

    broker_address = "127.0.0.1:12345"
    interface_address = "127.0.0.1:32865"

    fedinfo = h.helicsCreateFederateInfo()
    h.helicsFederateInfoSetCoreType(fedinfo, h.HELICS_CORE_TYPE_ZMQ)
    h.helicsFederateInfoSetCoreInitString(fedinfo, "--federates=1 --broker_address=tcp://$broker_address --interface=tcp://$interface_address --loglevel=7")
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
        println("Sending t = $t at time = $currenttime")
        h.helicsPublicationPublishDouble(topicA, Float64(t))
    end

    h.helicsFederateFinalize(fed)
    h.helicsFederateFree(fed)

    h.helicsCloseLibrary()

end

main()
