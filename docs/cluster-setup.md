---
layout: default
title: "Tworzenie cluster'a"
---
Tworzenie cluster'a
============


## libvirt

## Maszyny Ubuntu 20.04

## Kubernetes

Jeżeli istniał just jakiś już jakiś cluster:
```bash
root $ kubeadm reset
```

Tworzenie clustra
```
root@master $ kubeadm init --pod-network-cidr=10.244.0.0/16
```

Teraz wykonaj następujące komendy, aby dalej nie musieć wpisywać sudo za każdym razem.
```bash
user@master $ mkdir -p $HOME/.kube
user@master $ sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
user@master $ sudo chown $(id -u):$(id -g) $HOME/.kube/config
```
Pod koniec komendy, wyświetli się `kubeadm join ...`, zapisz to.

Zainstaluje dodatek sieciowy, aby pody mogły się komunikować:
```bash
user@master $ kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

Sprawdź czy wszystkie pody są uruchomione
```
user@master $ kubectl get pods --all-namespaces
``

Zainstaluj Kubernetes Dashboard
```bash
user@master $ kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.1/aio/deploy/recommended.yaml
```
Warto jednak zajrzeć na stronę [github.com](https://github.com/kubernetes/dashboard) w celu zmienienia wersji.

```bash
root@worker $ kubeadm join ...
```
kubeadm join 192.168.100.10:6443 --token 5b8kwg.bzxbvs2s4m629z1u \
    --discovery-token-ca-cert-hash sha256:e1acfa8c349ff1729d554f3a4e2565e98aa008c83228c1e714d5e49124b5fe0b
## Docker registry

## Instalacja i aktualizacja