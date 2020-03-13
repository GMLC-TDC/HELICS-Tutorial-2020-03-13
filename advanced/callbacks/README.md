# Callbacks

## receiver.jl

```bash
$ julia --project=../../beginner/installation receiver.jl
```

```
PI SENDER: Helics version = 2.4.1 (2020-03-06)
Creating Broker
Created Broker
Checking if Broker is connected
Checked if Broker is connected
Broker created and connected
PI SENDER: Value federate created
PI SENDER: Publication registered
Base.RefValue{MessageBlock}(MessageBlock(5))
mainbroker (1)::Duplicate publication names (testA)
PI SENDER: Entering execution mode
PI SENDER: Sending value pi = π at time 5.0 to PI RECEIVER
2, TestA Federate (131072), test MEXAGE, MessageBlock(6)
PI SENDER: Sending value pi = π at time 6.0 to PI RECEIVER
2, TestA Federate (131072), test MEXAGE, MessageBlock(7)
PI SENDER: Sending value pi = π at time 7.0 to PI RECEIVER
2, TestA Federate (131072), test MEXAGE, MessageBlock(8)
PI SENDER: Sending value pi = π at time 8.0 to PI RECEIVER
2, TestA Federate (131072), test MEXAGE, MessageBlock(9)
PI SENDER: Sending value pi = π at time 9.0 to PI RECEIVER
2, TestA Federate (131072), test MEXAGE, MessageBlock(10)
PI SENDER: Sending value pi = π at time 10.0 to PI RECEIVER
2, TestA Federate (131072), test MEXAGE, MessageBlock(11)
PI SENDER: Federate finalized
PI SENDER: Broker disconnected
```

## sender.c

```bash
$ cc sender.c -Wall -I$HOME/local/helics-v2.4.0/include -L$HOME/local/helics-v2.4.0/lib -lhelicsSharedLib -Wl,-rpath,$HOME/local/helics-v2.4.0/lib -o sender
$ ./sender
```

```
$ ./sender

hello_world_sender (131073) (0)::processing cmd fed_ack:hello_world_sender--131073
7, hello_world_sender (131073), processing cmd init_grant:From 1, 5
5, hello_world_sender (131073), Granting Initialization, 5
7, hello_world_sender (131073), processing cmd exec_check:From 0, 5
7, hello_world_sender (131073), processing cmd exec_request:From 131073, 5
7, hello_world_sender (131073), processing cmd exec_check:From 131073, 5
5, hello_world_sender (131073), Granting Execution, 5
7, hello_world_sender (131073), exec=9223372036.854776 allow=-9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=0.0 minminDe=0.0, 5
7, hello_world_sender (131073), exec=9223372036.854776 allow=-9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=0.0 minminDe=0.0, 5
7, hello_world_sender (131073), processing cmd time_request:From (131073) Time(0.0, 0.0, 0.0) to (0), 5
7, hello_world_sender (131073), processing cmd time_check:From 131073, 5
5, hello_world_sender (131073), Granted Time=1.0, 5
HELICS granted time:1.000000
7, hello_world_sender (131073), exec=1.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), exec=1.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), processing cmd log:From 131073, 5
2, hello_world_sender (131073), test MEXAGE, 5
7, hello_world_sender (131073), processing cmd time_request:From (131073) Time(1.0, 0.0, 0.0) to (0), 5
7, hello_world_sender (131073), processing cmd time_check:From 131073, 5
5, hello_world_sender (131073), Granted Time=2.0, 5
HELICS granted time:2.000000
7, hello_world_sender (131073), exec=2.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), exec=2.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), processing cmd time_request:From (131073) Time(2.0, 0.0, 0.0) to (0), 5
7, hello_world_sender (131073), processing cmd time_check:From 131073, 5
5, hello_world_sender (131073), Granted Time=3.0, 5
HELICS granted time:3.000000
7, hello_world_sender (131073), exec=3.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), exec=3.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), processing cmd log:From 131073, 5
2, hello_world_sender (131073), test MEXAGE, 5
7, hello_world_sender (131073), processing cmd log:From 131073, 5
2, hello_world_sender (131073), test MEXAGE, 5
7, hello_world_sender (131073), processing cmd time_request:From (131073) Time(3.0, 0.0, 0.0) to (0), 5
7, hello_world_sender (131073), processing cmd time_check:From 131073, 5
5, hello_world_sender (131073), Granted Time=4.0, 5
HELICS granted time:4.000000
7, hello_world_sender (131073), exec=4.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), exec=4.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), processing cmd log:From 131073, 5
2, hello_world_sender (131073), test MEXAGE, 5
7, hello_world_sender (131073), processing cmd time_request:From (131073) Time(4.0, 0.0, 0.0) to (0), 5
7, hello_world_sender (131073), processing cmd time_check:From 131073, 5
5, hello_world_sender (131073), Granted Time=5.0, 5
HELICS granted time:5.000000
7, hello_world_sender (131073), exec=5.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), exec=5.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), processing cmd log:From 131073, 5
2, hello_world_sender (131073), test MEXAGE, 5
7, hello_world_sender (131073), processing cmd time_request:From (131073) Time(5.0, 0.0, 0.0) to (0), 5
7, hello_world_sender (131073), processing cmd time_check:From 131073, 5
5, hello_world_sender (131073), Granted Time=6.0, 5
HELICS granted time:6.000000
7, hello_world_sender (131073), exec=6.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), exec=6.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), processing cmd log:From 131073, 5
2, hello_world_sender (131073), test MEXAGE, 5
7, hello_world_sender (131073), processing cmd time_request:From (131073) Time(6.0, 0.0, 0.0) to (0), 5
7, hello_world_sender (131073), processing cmd time_check:From 131073, 5
5, hello_world_sender (131073), Granted Time=7.0, 5
HELICS granted time:7.000000
7, hello_world_sender (131073), exec=7.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), exec=7.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), processing cmd log:From 131073, 5
2, hello_world_sender (131073), test MEXAGE, 5
7, hello_world_sender (131073), processing cmd time_request:From (131073) Time(7.0, 0.0, 0.0) to (0), 5
7, hello_world_sender (131073), processing cmd time_check:From 131073, 5
5, hello_world_sender (131073), Granted Time=8.0, 5
HELICS granted time:8.000000
7, hello_world_sender (131073), exec=8.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), exec=8.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), processing cmd time_request:From (131073) Time(8.0, 0.0, 0.0) to (0), 5
7, hello_world_sender (131073), processing cmd time_check:From 131073, 5
5, hello_world_sender (131073), Granted Time=9.0, 5
HELICS granted time:9.000000
7, hello_world_sender (131073), exec=9.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), exec=9.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), processing cmd time_request:From (131073) Time(9.0, 0.0, 0.0) to (0), 5
7, hello_world_sender (131073), processing cmd time_check:From 131073, 5
5, hello_world_sender (131073), Granted Time=10.0, 5
HELICS granted time:10.000000
7, hello_world_sender (131073), exec=10.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), exec=10.0 allow=9223372036.854776, value=9223372036.854776, message=9223372036.854776, minDe=9223372036.854776 minminDe=9223372036.854776, 5
7, hello_world_sender (131073), processing cmd time_request:From (131073) Time(10.0, 0.0, 0.0) to (0), 5
7, hello_world_sender (131073), processing cmd time_check:From 131073, 5
5, hello_world_sender (131073), Granted Time=11.0, 5
HELICS granted time:11.000000
7, hello_world_sender (131073), processing cmd log:From 131073, 5
2, hello_world_sender (131073), test MEXAGE, 5
7, hello_world_sender (131073), processing cmd log:From 131073, 5
2, hello_world_sender (131073), test MEXAGE, 5
7, hello_world_sender (131073), processing cmd log:From 131073, 5
2, hello_world_sender (131073), test MEXAGE, 5
7, hello_world_sender (131073), processing cmd log:From 131073, 5
2, hello_world_sender (131073), test MEXAGE, 5
7, hello_world_sender (131073), processing cmd disconnect:From 131073, 5
7, hello_world_sender (131073), processing cmd disconnect fed acknowledge:From 0, 5


```
