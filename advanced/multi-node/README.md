# Multi-node HELICS Co-simulation

```bash
$ helics_broker -f 2 --ipv4 --loglevel=7
```

```bash
$ python pisender.py 10.148.4.80 10.148.4.80
```

```bash
$ python pireceiver.py 10.148.4.80 10.148.5.252
```
