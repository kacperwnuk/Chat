---
layout: default
title: "Instalacja na Kubernetesie"
---

Do instalacji i aktualizacji wykorzystaliśmy [Helm](https://helm.sh/), jest to menadżer pakietów dla Kubernetesa.

Uruchom skrypt:
```bash
./publish.sh
```

Skopiuj `rso-chat-X.Y.Z.tgz` do maszyny `master` w clustrze.
I wykonaj komendę:
```bash
helm install rso-chat rso-chat-X.Y.Z.tgz
# lub
helm upgrade rso-chat rso-chat-X.Y.Z.tgz
```
