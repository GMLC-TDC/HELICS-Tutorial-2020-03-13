# -*- coding: utf-8 -*-
using HELICS; const h = HELICS

function main()

    fedinfo = h.helicsCreateFederateInfo()
    h.helicsFederateInfoSetCoreType(fedinfo, h.HELICS_CORE_TYPE_ZMQ)
    h.helicsFederateInfoSetCoreInitString(fedinfo, "--loglevel=7")
    h.helicsFederateInfoSetTimeProperty(fedinfo, h.HELICS_PROPERTY_TIME_DELTA, 0.5)
    fed = h.helicsCreateCombinationFederate("receiver", fedinfo)
    endpoint = h.helicsFederateRegisterGlobalEndpoint(fed, "ep2", "")

    h.helicsFederateEnterExecutingMode(fed)
    currenttime = 0
    for t in 5:10
        while currenttime < t
            print("Requesting time")
            currenttime = h.helicsFederateRequestTime(fed, t)
            print("Finished requesting time")
        end
        while h.helicsEndpointHasMessage(endpoint)
            m = h.helicsEndpointGetMessageObject(endpoint)
            @show currenttime, h.helicsMessageGetString(m)
        end
    end

    h.helicsFederateFinalize(fed)
    h.helicsFederateFree(fed)
    h.helicsCloseLibrary()

end

main()
