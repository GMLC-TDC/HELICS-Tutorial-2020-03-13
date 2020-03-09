# Installation

## Python Installation Instructions

**Install Miniconda**

- [Miniconda](https://docs.conda.io/en/latest/miniconda.html)

**Install HELICS using `conda`**

```bash
conda install -c gmlc-tdc helics
```

```
Collecting package metadata (current_repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: /Users/USER/miniconda3/envs/helics-pip-env

  added / updated specs:
    - helics


The following packages will be downloaded:

    package                    |            build
    ---------------------------|-----------------
    helics-2.4.1               |           py37_0         9.7 MB  gmlc-tdc
    openssl-1.1.1d             |       h1de35cc_4         2.2 MB
    ------------------------------------------------------------
                                           Total:        11.9 MB

The following NEW packages will be INSTALLED:

  helics             gmlc-tdc/osx-64::helics-2.4.1-py37_0

The following packages will be UPDATED:

  openssl                                 1.1.1d-h1de35cc_3 --> 1.1.1d-h1de35cc_4


Proceed ([y]/n)? y


Downloading and Extracting Packages
helics-2.4.1         | 9.7 MB    | ################################################# | 100%
openssl-1.1.1d       | 2.2 MB    | ################################################# | 100%
Preparing transaction: done
Verifying transaction: done
Executing transaction: done
```

_OR_

**Install HELICS using `pip`**

```bash
pip install helics helics-apps
```

```
Collecting helics
  Downloading helics-2.4.1-cp37-cp37m-macosx_10_9_intel.whl (2.1 MB)
     |████████████████████████████████| 2.1 MB 294 kB/s
Collecting helics-apps
  Downloading helics_apps-2.4.1-py2.py3-none-macosx_10_9_intel.whl (9.1 MB)
     |████████████████████████████████| 2.1 MB 294 kB/s
Installing collected packages: helics, helics-apps
Successfully installed helics-2.4.1 helics-apps-2.4.1
```

**Check if it works**

Run the following in Python to make sure everything was installed correctly:

```python
import helics as h
h.helicsGetVersion()
```

This is the output from running it in the command line:

```
$ python
Python 3.7.6 (default, Jan  8 2020, 13:42:34)
[Clang 4.0.1 (tags/RELEASE_401/final)] :: Anaconda, Inc. on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import helics as h
>>> h.helicsGetVersion()
'2.4.1 (2020-03-06)'
>>>
```

## Julia Installation Instructions

**Install Julia**

- [Julia](https://julialang.org/downloads/)

**Install HELICS using `Pkg`**

```bash
julia -e "using Pkg; Pkg.add("HELICS")
```

```
$ julia -e "using Pkg; Pkg.add("HELICS"); Pkg.instantiate()
  Updating registry at `~/.julia/registries/General`
  Updating git-repo `https://github.com/JuliaRegistries/General.git`
 Resolving package versions...
 Installed HELICS_jll ─ v2.4.1+0
 Installed HELICS ───── v0.6.2
  Updating `~/gitrepos/HELICS-Tutorial-2020-03-13/Project.toml`
  [81524022] + HELICS v0.6.2
  Updating `~/gitrepos/HELICS-Tutorial-2020-03-13/Manifest.toml`
  [fa961155] + CEnum v0.2.0
  [ffbed154] + DocStringExtensions v0.8.1
  [81524022] + HELICS v0.6.2
  [ef3b0bb0] + HELICS_jll v2.4.1+0
  [8f1865be] + ZeroMQ_jll v4.3.2+1
  [2a0f44e3] + Base64
  [ade2ca70] + Dates
  [8ba89e20] + Distributed
  [b77e0a4c] + InteractiveUtils
  [76f85450] + LibGit2
  [8f399da3] + Libdl
  [56ddb016] + Logging
  [d6f4376e] + Markdown
  [44cfe95a] + Pkg
  [de0858da] + Printf
  [3fa0cd96] + REPL
  [9a3f8284] + Random
  [ea8e919c] + SHA
  [9e88b42a] + Serialization
  [6462fe0b] + Sockets
  [8dfed614] + Test
  [cf7118a7] + UUIDs
  [4ec0a83e] + Unicode
```

**Check if it works**

Run the following in Julia to make sure everything was installed correctly:

```julia
using HELICS
const h = HELICS
h.helicsGetVersion()
```

This is the output from running it in the command line:

```
$ julia --project
               _
   _       _ _(_)_     |  Documentation: https://docs.julialang.org
  (_)     | (_) (_)    |
   _ _   _| |_  __ _   |  Type "?" for help, "]?" for Pkg help.
  | | | | | | |/ _` |  |
  | | |_| | | | (_| |  |  Version 1.3.1 (2019-12-30)
 _/ |\__'_|_|_|\__'_|  |  Official https://julialang.org/ release
|__/                   |

julia> using HELICS

julia> const h = HELICS
HELICS

julia> h.helicsGetVersion()
"2.4.1 (2020-03-06)"

julia>
```

## Source installation Instructions (_optional_)

[See installation from source instructions.](https://helics.readthedocs.io/en/latest/installation/index.html#os-specific-installation-from-source)
