# Tips for debugging

Co-simulations can be tricky to debug.
Here are some tips to debugging a co-simulation.

- Always print current time granted.
- Use [`h.HELICS_FLAG_TERMINATE_ON_ERROR`](https://gmlc-tdc.github.io/HELICS.jl/latest/api/#HELICS.HELICS_FEDERATE_FLAGS) flag for all federates.
- Check [`HELICS_FEDERATE_STATE`](https://gmlc-tdc.github.io/HELICS.jl/latest/api/#HELICS.HELICS_FEDERATE_STATE) to ensure that the federate is doing what you expect it to.
- Set [`HELICS_LOG_LEVELS`](https://gmlc-tdc.github.io/HELICS.jl/latest/api/#HELICS.HELICS_LOG_LEVELS) to show all messages.
- Sometimes force quiting a co-simulation is necessary. You may need to use `killall python`, `kill -9 $pid`, `kill %1`.
