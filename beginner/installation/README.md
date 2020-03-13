# Installation

## Editor / Environment set up

- [Visual Studio Code](https://code.visualstudio.com/)

## Python Installation Instructions

**Install Miniconda**

- [Miniconda](https://docs.conda.io/en/latest/miniconda.html)

If you have anaconda, you can continue to use that.

**Install HELICS in a environment (recommended)**

```bash
$ conda create -n helics-env python=3.7

Collecting package metadata (current_repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: /Users/USER/miniconda3/envs/helics-env

  added / updated specs:
    - python=3.7


The following NEW packages will be INSTALLED:

  ca-certificates    pkgs/main/osx-64::ca-certificates-2020.1.1-0
  certifi            pkgs/main/osx-64::certifi-2019.11.28-py37_0
  libcxx             pkgs/main/osx-64::libcxx-4.0.1-hcfea43d_1
  libcxxabi          pkgs/main/osx-64::libcxxabi-4.0.1-hcfea43d_1
  libedit            pkgs/main/osx-64::libedit-3.1.20181209-hb402a30_0
  libffi             pkgs/main/osx-64::libffi-3.2.1-h475c297_4
  ncurses            pkgs/main/osx-64::ncurses-6.2-h0a44026_0
  openssl            pkgs/main/osx-64::openssl-1.1.1d-h1de35cc_4
  pip                pkgs/main/osx-64::pip-20.0.2-py37_1
  python             pkgs/main/osx-64::python-3.7.6-h359304d_2
  readline           pkgs/main/osx-64::readline-7.0-h1de35cc_5
  setuptools         pkgs/main/osx-64::setuptools-46.0.0-py37_0
  sqlite             pkgs/main/osx-64::sqlite-3.31.1-ha441bb4_0
  tk                 pkgs/main/osx-64::tk-8.6.8-ha441bb4_0
  wheel              pkgs/main/osx-64::wheel-0.34.2-py37_0
  xz                 pkgs/main/osx-64::xz-5.2.4-h1de35cc_4
  zlib               pkgs/main/osx-64::zlib-1.2.11-h1de35cc_3


Proceed ([y]/n)? y

Preparing transaction: done
Verifying transaction: done
Executing transaction: done
#
# To activate this environment, use
#
#     $ conda activate helics-env
#
# To deactivate an active environment, use
#
#     $ conda deactivate

```

**Install HELICS using `conda`**

```bash
$ conda activate helics-env
$ conda install -c gmlc-tdc helics

Collecting package metadata (current_repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: /Users/USER/miniconda3/envs/helics-env

  added / updated specs:
    - helics


The following NEW packages will be INSTALLED:

  helics             gmlc-tdc/osx-64::helics-2.4.1-py37_0


Proceed ([y]/n)? y

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

**Install IPython**

```
$ conda install ipython

Collecting package metadata (current_repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: /Users/USER/miniconda3/envs/helics-env

  added / updated specs:
    - ipython


The following packages will be downloaded:

    package                    |            build
    ---------------------------|-----------------
    decorator-4.4.2            |             py_0          14 KB
    ipython-7.13.0             |   py37h5ca1d4c_0         990 KB
    ------------------------------------------------------------
                                           Total:        1004 KB

The following NEW packages will be INSTALLED:

  appnope            pkgs/main/osx-64::appnope-0.1.0-py37_0
  backcall           pkgs/main/osx-64::backcall-0.1.0-py37_0
  decorator          pkgs/main/noarch::decorator-4.4.2-py_0
  ipython            pkgs/main/osx-64::ipython-7.13.0-py37h5ca1d4c_0
  ipython_genutils   pkgs/main/osx-64::ipython_genutils-0.2.0-py37_0
  jedi               pkgs/main/osx-64::jedi-0.16.0-py37_0
  parso              pkgs/main/noarch::parso-0.6.1-py_0
  pexpect            pkgs/main/osx-64::pexpect-4.8.0-py37_0
  pickleshare        pkgs/main/osx-64::pickleshare-0.7.5-py37_0
  prompt_toolkit     pkgs/main/noarch::prompt_toolkit-3.0.3-py_0
  ptyprocess         pkgs/main/osx-64::ptyprocess-0.6.0-py37_0
  pygments           pkgs/main/noarch::pygments-2.5.2-py_0
  six                pkgs/main/osx-64::six-1.14.0-py37_0
  traitlets          pkgs/main/osx-64::traitlets-4.3.3-py37_0
  wcwidth            pkgs/main/noarch::wcwidth-0.1.8-py_0


Proceed ([y]/n)? y


Downloading and Extracting Packages
ipython-7.13.0       | 990 KB    | ######################################## | 100%
decorator-4.4.2      | 14 KB     | ######################################## | 100%
Preparing transaction: done
Verifying transaction: done
Executing transaction: done
```

**Check if it works**

Run the following in Python to make sure everything was installed correctly:

```bash
conda activate helics-env
```

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

This is the same output from IPython.

```
$ ipython

Python 3.7.6 (default, Jan  8 2020, 13:42:34)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.

In [1]: import helics as h

In [2]: h.helicsGetVersion()
Out[2]: '2.4.1 (2020-03-06)'

In [3]:
```

## Julia Installation Instructions

**Install Julia**

- [Julia](https://julialang.org/downloads/)

**Install HELICS using `Pkg`**

```bash
julia -e "using Pkg; Pkg.add("HELICS")
```

```
$ julia --project -e "using Pkg; Pkg.add("HELICS"); Pkg.instantiate()
  Updating registry at `~/.julia/registries/General`
  Updating git-repo `https://github.com/JuliaRegistries/General.git`
 Resolving package versions...
 Installed HELICS ─ v0.7.0
  Updating `~/gitrepos/HELICS-Tutorial-2020-03-13/installation/Project.toml`
  [81524022] + HELICS v0.7.0
  Updating `~/gitrepos/HELICS-Tutorial-2020-03-13/installation/Manifest.toml`
  [fa961155] + CEnum v0.2.0
  [ffbed154] + DocStringExtensions v0.8.1
  [81524022] + HELICS v0.7.0
  [ef3b0bb0] + HELICS_jll v2.4.1+1
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
