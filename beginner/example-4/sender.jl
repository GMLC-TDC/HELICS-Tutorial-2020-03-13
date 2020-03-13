using HELICS; const h = HELICS

function main()

    initstring = "-f 2 --loglevel=7"
    broker = h.helicsCreateBroker("zmq", "", initstring)
    @assert h.helicsBrokerIsConnected(broker) is true

    fed = h.helicsCreateCombinationFederateFromConfig(
        joinpath(@__DIR__, "sender.json")
    )

    topicA = h.helicsFederateGetPublication(fed, "topicA")

    h.helicsFederateEnterExecutingMode(fed)

    currenttime = 0

    for t in 5:10
        while currenttime < t
            currenttime = h.helicsFederateRequestTime(fed, t)
        end
        println("Sending time = $t at time = $currenttime")
        h.helicsPublicationPublishDouble(topicA, Float64(t))
    end

    h.helicsFederateFinalize(fed)
    h.helicsFederateFree(fed)
    h.helicsCloseLibrary()

end

main()
