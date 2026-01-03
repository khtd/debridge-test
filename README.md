### IDL usage

DLN IDLs are included as a git submodule pointing to
https://github.com/debridge-finance/abis-and-idls

The submodule is pinned to a specific commit to ensure
deterministic parsing behavior.

####
How to update IDL
``` bash
git submodule update --init --recursive
```

## Run locally

You can run the whole system

``` bash
docker-compose build
docker-compose up 
```
// TODO - env variables
Or you can test some services separatelly

One-time 
``` bash
npm run build --workspace @debridge-test/common
npm run build --workspace @debridge-test/db
npm run migrate --workspace @debridge-test/db
npm run build --workspace @debridge-test/dln-idl
```

```bash
npm run start --workspace @debridge-test/<service_name>
```

services
* indexer
* api
* aggregator