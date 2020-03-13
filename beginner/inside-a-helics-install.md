# Inside a HELICS installation

## HELICS as a library

Let's say that I've installed HELICS in `~/local/helics-v2.4.1`. Let's look at what's in that folder:

```bash
$ ls ~/local/helics-v2.4.1/

Permissions Size Date Modified Name
drwxr-xr-x     -  3 Mar 07:41  bin/
drwxr-xr-x     -  3 Mar 07:41  include/
drwxr-xr-x     -  3 Mar 07:41  lib/
drwxr-xr-x     -  3 Mar 07:41  share/
```

We have a `bin` for binary files, a `include` for header files, a `lib` for library files and `share` for documentation, etc.

Let's see what's in the `bin` folder:

```bash
$ ls ~/local/helics-v2.4.1/bin

Permissions Size Date Modified Name
.rwxr-xr-x  121k  3 Mar 07:41  helics-config*
.rwxr-xr-x   29M  3 Mar 07:41  helics_app*
.rwxr-xr-x   22M  3 Mar 07:41  helics_broker*
.rwxr-xr-x   22M  3 Mar 07:41  helics_broker_server*
.rwxr-xr-x   25M  3 Mar 07:41  helics_player*
.rwxr-xr-x   25M  3 Mar 07:41  helics_recorder*
```

My "installation" is a build from source and is a "debug" build. That is why the size of each file is around 25 MB.

Let's look at some files from a pre-packaged installer, such as `conda`.

```bash
$ ls /Users/USER/miniconda3/envs/helics-pip-env/bin/helics_*

Permissions Size Date Modified Name
.rwxrwxr-x   263 12 Mar 11:31  /Users/USER/miniconda3/envs/helics-pip-env/bin/helics_app*
.rwxrwxr-x   269 12 Mar 11:31  /Users/USER/miniconda3/envs/helics-pip-env/bin/helics_broker*
.rwxrwxr-x   283 12 Mar 11:31  /Users/USER/miniconda3/envs/helics-pip-env/bin/helics_broker_server*
.rwxrwxr-x   269 12 Mar 11:31  /Users/USER/miniconda3/envs/helics-pip-env/bin/helics_player*
.rwxrwxr-x   273 12 Mar 11:31  /Users/USER/miniconda3/envs/helics-pip-env/bin/helics_recorder*
```

That is just around 300 bytes.

Let's go ahead and run `man helics_broker`.

```bash
$ man helics_broker

HELICS_BROKER(1)                                          HELICS_BROKER(1)



NAME
       helics_broker - intermediary or root in the HELICS hierarchy

SYNOPSIS
       helics_broker [-v|--version] [-h|-?|--help]
           [--quiet] [--config-file <file>] [-t|--core|--type|--coretype <type>]
           [-f|-m|--federates|--minfederates|--minfed <num>]
           [-n|--name|--identifier <name>] [--maxiter|--maxiterations <num>]
           [--minbroker|--minbrokers|--minbrokercount <num>]
           [--key|--broker_key <key>] [--no_ping|--slow_responding]
           [--conservative_time_policy|--restrictive_time_policy]
           [--local|--ipv4|--ipv6|--all|--external] [--brokeraddress <address>]
           [--reuse_address] [--broker <identifier>] [--brokername <name>]
           [--maxsize <buffer size>] [--maxcount <num msgs>] [--networkretries <num>]
           [--osport|--use_os_port] [--autobroker] [--brokerinit <init str>]
           [--client|--server] [-p|--port <num>] [--brokerport <num>] [--localport <num>]
           [--portstart <num>] [--interface|--localinterface <network interface>] [:
```

`man` gives us a manual for any command line tool if it exists.
We can see that the `helics_broker` command line inteface has quite a few options.
We will go through some of that in this tutorial.

Let's peek inside the library `lib` folder.

```bash
$ ls ~/local/helics-v2.4.1/lib

Permissions Size Date Modified Name
.rwxr-xr-x   25M  3 Mar 07:41  libhelicsSharedLib.2.4.1.dylib*
lrwxr-xr-x    30  3 Mar 07:41  libhelicsSharedLib.2.dylib -> libhelicsSharedLib.2.4.1.dylib
lrwxr-xr-x    26  3 Mar 07:41  libhelicsSharedLib.dylib -> libhelicsSharedLib.2.dylib
```

And finally, let's look at what is in the `include` folder:

```bash
$ tree ~/local/helics-v2.4.1/include

/Users/USER/local/helics-v2.4.1/include
└── helics
   ├── chelics.h
   ├── cpp98
   │  ├── Broker.hpp
   │  ├── CombinationFederate.hpp
   │  ├── config.hpp
   │  ├── Core.hpp
   │  ├── Endpoint.hpp
   │  ├── Federate.hpp
   │  ├── Filter.hpp
   │  ├── helics.hpp
   │  ├── helicsExceptions.hpp
   │  ├── Input.hpp
   │  ├── MessageFederate.hpp
   │  ├── Publication.hpp
   │  └── ValueFederate.hpp
   ├── helics98.hpp
   ├── helics_enums.h
   └── shared_api_library
      ├── api-data.h
      ├── helics.h
      ├── helics_export.h
      ├── helicsCallbacks.h
      ├── MessageFederate.h
      ├── MessageFilters.h
      └── ValueFederate.h
```

## Using the HELICS library

You'll notice that this installation does not have any Python files in them.
However, we can use HELICS in Python by loading the shared library in the lib folder, and calling functions using the C API.

```python
ipython
Python 3.7.6 (default, Jan  8 2020, 13:42:34)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.12.0 -- An enhanced Interactive Python. Type '?' for help.

In [1]: import ctypes

In [2]: lib = ctypes.CDLL("~/local/helics-v2.4.1/lib/libhelicsSharedL
   ...: ib.2.4.1.dylib")
```

Let's call the `helicsGetVersion` function.

```python
In [3]: lib.helicsGetVersion()
Out[3]: 182664400
```

This returns a number unfortunately.
However, we know that this number is a pointer to a string.

We can tell Python that the return type is a `char *` type, i.e. a pointer to a char.

```python
In [5]: lib.helicsGetVersion.restype = ctypes.c_char_p
```

If we call the function again, we can get the version number.

```python
In [6]: lib.helicsGetVersion()
Out[6]: b'2.4.0 (2020-02-04)'
```

This is an example of how to call a C function from Python.
Finding the types of every function can be tedious.
Fortunately, we have a Python library mimics the C API function in Python function.

There are a lot of other functions in HELICS available through the C API, and all these functions are exposed in the Python library as well.

```bash
$ nm ~/local/helics-v2.4.1/lib/libhelicsSharedLib.2.4.1.dylib | rg '_helics'

155810:0000000000005ea0 T _helicsBrokerAddDestinationFilterToEndpoint
155811:0000000000005d90 T _helicsBrokerAddSourceFilterToEndpoint
155812:00000000000056f0 T _helicsBrokerClone
155813:0000000000005990 T _helicsBrokerDataLink
155814:0000000000006bf0 T _helicsBrokerDestroy
155815:0000000000006aa0 T _helicsBrokerDisconnect
155816:0000000000006c20 T _helicsBrokerFree
155817:0000000000006700 T _helicsBrokerGetAddress
155818:0000000000006600 T _helicsBrokerGetIdentifier
155819:0000000000005930 T _helicsBrokerIsConnected
155820:00000000000058a0 T _helicsBrokerIsValid
155821:0000000000005fb0 T _helicsBrokerMakeConnections
155822:0000000000005bb0 T _helicsBrokerSetGlobal
155823:0000000000005ce0 T _helicsBrokerSetLogFile
155824:000000000004dd60 T _helicsBrokerSetLoggingCallback
155825:0000000000006950 T _helicsBrokerWaitForDisconnect
155826:00000000000084c0 T _helicsCleanupLibrary
155827:00000000000076c0 T _helicsCloseLibrary
155828:00000000000061b0 T _helicsCoreAddDestinationFilterToEndpoint
155829:00000000000060a0 T _helicsCoreAddSourceFilterToEndpoint
155830:00000000000042e0 T _helicsCoreClone
155831:0000000000006830 T _helicsCoreConnect
155832:0000000000005aa0 T _helicsCoreDataLink
155833:0000000000006cc0 T _helicsCoreDestroy
155834:00000000000068d0 T _helicsCoreDisconnect
155835:0000000000006cf0 T _helicsCoreFree
155836:0000000000006770 T _helicsCoreGetAddress
155837:0000000000006690 T _helicsCoreGetIdentifier
155838:00000000000063b0 T _helicsCoreIsConnected
155839:0000000000004490 T _helicsCoreIsValid
155840:00000000000062c0 T _helicsCoreMakeConnections
155841:000000000004a2b0 T _helicsCoreRegisterCloningFilter
155842:00000000000498b0 T _helicsCoreRegisterFilter
155843:0000000000006410 T _helicsCoreSetGlobal
155844:0000000000006540 T _helicsCoreSetLogFile
155845:000000000004df90 T _helicsCoreSetLoggingCallback
155846:00000000000067e0 T _helicsCoreSetReadyToInit
155847:0000000000006a10 T _helicsCoreWaitForDisconnect
155848:0000000000004a00 T _helicsCreateBroker
155849:0000000000005150 T _helicsCreateBrokerFromArgs
155850:00000000000221c0 T _helicsCreateCombinationFederate
155851:0000000000022750 T _helicsCreateCombinationFederateFromConfig
155852:00000000000033a0 T _helicsCreateCore
155853:0000000000003c10 T _helicsCreateCoreFromArgs
155854:0000000000020140 T _helicsCreateFederateInfo
155855:00000000000219b0 T _helicsCreateMessageFederate
155856:0000000000021f20 T _helicsCreateMessageFederateFromConfig
155857:0000000000007960 T _helicsCreateQuery
155858:00000000000210a0 T _helicsCreateValueFederate
155859:0000000000021710 T _helicsCreateValueFederateFromConfig
155860:0000000000044190 T _helicsEndpointClearMessages
155861:0000000000042220 T _helicsEndpointGetDefaultDestination
155862:0000000000044370 T _helicsEndpointGetInfo
155863:0000000000043750 T _helicsEndpointGetMessage
155864:0000000000043b70 T _helicsEndpointGetMessageObject
155865:00000000000442c0 T _helicsEndpointGetName
155866:0000000000044580 T _helicsEndpointGetOption
155867:00000000000441e0 T _helicsEndpointGetType
155868:00000000000435f0 T _helicsEndpointHasMessage
155869:00000000000436d0 T _helicsEndpointPendingMessages
155870:00000000000427d0 T _helicsEndpointSendEventRaw
155871:0000000000042db0 T _helicsEndpointSendMessage
155872:00000000000433a0 T _helicsEndpointSendMessageObject
155873:00000000000422a0 T _helicsEndpointSendMessageRaw
155874:0000000000042080 T _helicsEndpointSetDefaultDestination
155875:0000000000044460 T _helicsEndpointSetInfo
155876:0000000000044660 T _helicsEndpointSetOption
155877:0000000000043460 T _helicsEndpointSubscribe
155878:0000000000002350 T _helicsErrorClear
155879:0000000000002330 T _helicsErrorInitialize
155880:00000000000440e0 T _helicsFederateClearMessages
155881:0000000000035cd0 T _helicsFederateClearUpdates
155882:00000000000229f0 T _helicsFederateClone
155883:0000000000043fb0 T _helicsFederateCreateMessageObject
155884:0000000000006b20 T _helicsFederateDestroy
155885:00000000000232d0 T _helicsFederateEnterExecutingMode
155886:0000000000023520 T _helicsFederateEnterExecutingModeAsync
155887:0000000000023630 T _helicsFederateEnterExecutingModeComplete
155888:0000000000023350 T _helicsFederateEnterExecutingModeIterative
155889:0000000000023590 T _helicsFederateEnterExecutingModeIterativeAsync
155890:00000000000236b0 T _helicsFederateEnterExecutingModeIterativeComplete
155891:0000000000023120 T _helicsFederateEnterInitializingMode
155892:0000000000023190 T _helicsFederateEnterInitializingModeAsync
155893:0000000000023260 T _helicsFederateEnterInitializingModeComplete
155894:0000000000022fd0 T _helicsFederateFinalize
155895:0000000000023040 T _helicsFederateFinalizeAsync
155896:00000000000230b0 T _helicsFederateFinalizeComplete
155897:0000000000006b50 T _helicsFederateFree
155898:0000000000022c10 T _helicsFederateGetCoreObject
155899:00000000000246e0 T _helicsFederateGetCurrentTime
155900:0000000000041ae0 T _helicsFederateGetEndpoint
155901:0000000000041e10 T _helicsFederateGetEndpointByIndex
155902:0000000000044320 T _helicsFederateGetEndpointCount
155903:000000000004a650 T _helicsFederateGetFilter
155904:000000000004aa40 T _helicsFederateGetFilterByIndex
155905:000000000004a9f0 T _helicsFederateGetFilterCount
155906:0000000000024530 T _helicsFederateGetFlagOption
155907:0000000000035430 T _helicsFederateGetInput
155908:0000000000035760 T _helicsFederateGetInputByIndex
155909:0000000000039320 T _helicsFederateGetInputCount
155910:00000000000245e0 T _helicsFederateGetIntegerProperty
155911:0000000000043c90 T _helicsFederateGetMessage
155912:0000000000043ea0 T _helicsFederateGetMessageObject
155913:0000000000024210 T _helicsFederateGetName
155914:0000000000034f00 T _helicsFederateGetPublication
155915:00000000000351c0 T _helicsFederateGetPublicationByIndex
155916:00000000000392d0 T _helicsFederateGetPublicationCount
155917:00000000000240d0 T _helicsFederateGetState
155918:00000000000359d0 T _helicsFederateGetSubscription
155919:0000000000024430 T _helicsFederateGetTimeProperty
155920:0000000000043590 T _helicsFederateHasMessage
155921:00000000000201a0 T _helicsFederateInfoClone
155922:0000000000020350 T _helicsFederateInfoFree
155923:00000000000203e0 T _helicsFederateInfoLoadFromArgs
155924:0000000000020b30 T _helicsFederateInfoSetBroker
155925:00000000000207d0 T _helicsFederateInfoSetBrokerInitString
155926:0000000000020c10 T _helicsFederateInfoSetBrokerKey
155927:0000000000020cf0 T _helicsFederateInfoSetBrokerPort
155928:00000000000206f0 T _helicsFederateInfoSetCoreInitString
155929:00000000000205e0 T _helicsFederateInfoSetCoreName
155930:00000000000208b0 T _helicsFederateInfoSetCoreType
155931:0000000000020900 T _helicsFederateInfoSetCoreTypeFromString
155932:0000000000020f10 T _helicsFederateInfoSetFlagOption
155933:0000000000021050 T _helicsFederateInfoSetIntegerProperty
155934:0000000000020d40 T _helicsFederateInfoSetLocalPort
155935:0000000000021000 T _helicsFederateInfoSetSeparator
155936:0000000000020f70 T _helicsFederateInfoSetTimeProperty
155937:0000000000023200 T _helicsFederateIsAsyncOperationCompleted
155938:0000000000022bd0 T _helicsFederateIsValid
155939:0000000000024bf0 T _helicsFederateLogDebugMessage
155940:0000000000024aa0 T _helicsFederateLogErrorMessage
155941:0000000000024bc0 T _helicsFederateLogInfoMessage
155942:0000000000024ad0 T _helicsFederateLogLevelMessage
155943:0000000000024b90 T _helicsFederateLogWarningMessage
155944:0000000000043680 T _helicsFederatePendingMessages
155945:0000000000034de0 T _helicsFederatePublishJSON
155946:0000000000049d30 T _helicsFederateRegisterCloningFilter
155947:0000000000041310 T _helicsFederateRegisterEndpoint
155948:0000000000049180 T _helicsFederateRegisterFilter
155949:0000000000034cc0 T _helicsFederateRegisterFromPublicationJSON
155950:000000000004a000 T _helicsFederateRegisterGlobalCloningFilter
155951:00000000000417f0 T _helicsFederateRegisterGlobalEndpoint
155952:0000000000049630 T _helicsFederateRegisterGlobalFilter
155953:0000000000034860 T _helicsFederateRegisterGlobalInput
155954:0000000000033900 T _helicsFederateRegisterGlobalPublication
155955:0000000000034500 T _helicsFederateRegisterGlobalTypeInput
155956:00000000000335a0 T _helicsFederateRegisterGlobalTypePublication
155957:00000000000340a0 T _helicsFederateRegisterInput
155958:0000000000022ee0 T _helicsFederateRegisterInterfaces
155959:0000000000033140 T _helicsFederateRegisterPublication
155960:0000000000032770 T _helicsFederateRegisterSubscription
155961:0000000000033d40 T _helicsFederateRegisterTypeInput
155962:0000000000032c90 T _helicsFederateRegisterTypePublication
155963:00000000000239f0 T _helicsFederateRequestNextStep
155964:0000000000023750 T _helicsFederateRequestTime
155965:0000000000023890 T _helicsFederateRequestTimeAdvance
155966:0000000000023ce0 T _helicsFederateRequestTimeAsync
155967:0000000000023d70 T _helicsFederateRequestTimeComplete
155968:0000000000023b20 T _helicsFederateRequestTimeIterative
155969:0000000000023e60 T _helicsFederateRequestTimeIterativeAsync
155970:0000000000023f10 T _helicsFederateRequestTimeIterativeComplete
155971:0000000000024310 T _helicsFederateSetFlagOption
155972:0000000000024790 T _helicsFederateSetGlobal
155973:00000000000243b0 T _helicsFederateSetIntegerProperty
155974:00000000000248c0 T _helicsFederateSetLogFile
155975:000000000004e1c0 T _helicsFederateSetLoggingCallback
155976:0000000000024670 T _helicsFederateSetSeparator
155977:0000000000024290 T _helicsFederateSetTimeProperty
155978:000000000004b210 T _helicsFilterAddDeliveryEndpoint
155979:000000000004b010 T _helicsFilterAddDestinationTarget
155980:000000000004b110 T _helicsFilterAddSourceTarget
155981:000000000004b5f0 T _helicsFilterGetInfo
155982:000000000004ace0 T _helicsFilterGetName
155983:000000000004b8e0 T _helicsFilterGetOption
155984:000000000004b4f0 T _helicsFilterRemoveDeliveryEndpoint
155985:000000000004b3f0 T _helicsFilterRemoveTarget
155986:000000000004adc0 T _helicsFilterSet
155987:000000000004b770 T _helicsFilterSetInfo
155988:000000000004b850 T _helicsFilterSetOption
155989:000000000004aed0 T _helicsFilterSetString
155990:0000000000004520 T _helicsGetFederateByName
155991:0000000000020e80 T _helicsGetOptionIndex
155992:0000000000020df0 T _helicsGetPropertyIndex
155993:0000000000002300 T _helicsGetVersion
155994:0000000000036750 T _helicsInputAddTarget
155995:0000000000039260 T _helicsInputClearUpdate
155996:0000000000036ce0 T _helicsInputGetBoolean
155997:0000000000036ee0 T _helicsInputGetChar
155998:0000000000036f90 T _helicsInputGetComplex
155999:00000000000370d0 T _helicsInputGetComplexObject
156000:0000000000036d90 T _helicsInputGetDouble
156001:00000000000387d0 T _helicsInputGetExtractionUnits
156002:0000000000038970 T _helicsInputGetInfo
156003:00000000000386e0 T _helicsInputGetInjectionUnits
156004:0000000000036c40 T _helicsInputGetInteger
156005:0000000000038440 T _helicsInputGetKey
156006:0000000000037400 T _helicsInputGetNamedPoint
156007:0000000000038d90 T _helicsInputGetOption
156008:0000000000038220 T _helicsInputGetPublicationType
156009:00000000000369b0 T _helicsInputGetRawValue
156010:0000000000036900 T _helicsInputGetRawValueSize
156011:0000000000036b60 T _helicsInputGetString
156012:0000000000037280 T _helicsInputGetStringSize
156013:0000000000036e30 T _helicsInputGetTime
156014:0000000000038130 T _helicsInputGetType
156015:00000000000388c0 T _helicsInputGetUnits
156016:0000000000037310 T _helicsInputGetVector
156017:00000000000371f0 T _helicsInputGetVectorSize
156018:0000000000039110 T _helicsInputIsUpdated
156019:0000000000039180 T _helicsInputLastUpdateTime
156020:0000000000037ae0 T _helicsInputSetDefaultBoolean
156021:0000000000037cb0 T _helicsInputSetDefaultChar
156022:0000000000037d40 T _helicsInputSetDefaultComplex
156023:0000000000037b80 T _helicsInputSetDefaultDouble
156024:0000000000037a50 T _helicsInputSetDefaultInteger
156025:0000000000037fa0 T _helicsInputSetDefaultNamedPoint
156026:0000000000037680 T _helicsInputSetDefaultRaw
156027:0000000000037930 T _helicsInputSetDefaultString
156028:0000000000037c10 T _helicsInputSetDefaultTime
156029:0000000000037df0 T _helicsInputSetDefaultVector
156030:0000000000038a60 T _helicsInputSetInfo
156031:00000000000390c0 T _helicsInputSetMinimumChange
156032:0000000000038e70 T _helicsInputSetOption
156033:0000000000002380 T _helicsIsCoreTypeAvailable
156034:00000000000455d0 T _helicsMessageAppendData
156035:00000000000449c0 T _helicsMessageCheckFlag
156036:00000000000452b0 T _helicsMessageClearFlags
156037:00000000000447f0 T _helicsMessageGetDestination
156038:0000000000044970 T _helicsMessageGetMessageID
156039:00000000000448b0 T _helicsMessageGetOriginalDestination
156040:0000000000044850 T _helicsMessageGetOriginalSource
156041:0000000000044b40 T _helicsMessageGetRawData
156042:0000000000044cb0 T _helicsMessageGetRawDataPointer
156043:0000000000044ae0 T _helicsMessageGetRawDataSize
156044:0000000000044790 T _helicsMessageGetSource
156045:0000000000044a80 T _helicsMessageGetString
156046:0000000000044910 T _helicsMessageGetTime
156047:0000000000044d10 T _helicsMessageIsValid
156048:00000000000451b0 T _helicsMessageReserve
156049:0000000000045100 T _helicsMessageResize
156050:0000000000045570 T _helicsMessageSetData
156051:0000000000044ea0 T _helicsMessageSetDestination
156052:00000000000452f0 T _helicsMessageSetFlagOption
156053:0000000000045260 T _helicsMessageSetMessageID
156054:0000000000045000 T _helicsMessageSetOriginalDestination
156055:0000000000044f50 T _helicsMessageSetOriginalSource
156056:0000000000044df0 T _helicsMessageSetSource
156057:00000000000454c0 T _helicsMessageSetString
156058:00000000000450b0 T _helicsMessageSetTime
156059:0000000000036670 T _helicsPublicationAddTarget
156060:0000000000038b80 T _helicsPublicationGetInfo
156061:00000000000385f0 T _helicsPublicationGetKey
156062:0000000000038f00 T _helicsPublicationGetOption
156063:0000000000038350 T _helicsPublicationGetType
156064:00000000000388e0 T _helicsPublicationGetUnits
156065:0000000000036130 T _helicsPublicationPublishBoolean
156066:00000000000362d0 T _helicsPublicationPublishChar
156067:0000000000036350 T _helicsPublicationPublishComplex
156068:00000000000361b0 T _helicsPublicationPublishDouble
156069:0000000000036080 T _helicsPublicationPublishInteger
156070:0000000000036560 T _helicsPublicationPublishNamedPoint
156071:0000000000035da0 T _helicsPublicationPublishRaw
156072:0000000000035fa0 T _helicsPublicationPublishString
156073:0000000000036230 T _helicsPublicationPublishTime
156074:0000000000036430 T _helicsPublicationPublishVector
156075:0000000000038c70 T _helicsPublicationSetInfo
156076:0000000000039070 T _helicsPublicationSetMinimumChange
156077:0000000000038fe0 T _helicsPublicationSetOption
156078:0000000000007df0 T _helicsQueryBrokerExecute
156079:0000000000007cd0 T _helicsQueryCoreExecute
156080:0000000000007aa0 T _helicsQueryExecute
156081:0000000000007f10 T _helicsQueryExecuteAsync
156082:00000000000081c0 T _helicsQueryExecuteComplete
156083:0000000000008430 T _helicsQueryFree
156084:0000000000008370 T _helicsQueryIsCompleted
156085:0000000000038530 T _helicsSubscriptionGetKey
```

Let's look at what some of them do.
