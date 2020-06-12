---
layout: default
title: "Tworzenie cluster'a"
---
Tworzenie cluster'a
============


## libvirt

Zainstaluj `libvirt` wraz z klientem graficznym `virt-manager`:

|System|Komenda|
|---|---|
|Ubuntu|`apt-get install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager`|
|ArchLinux|`pacman -S qemu libvirt virt-manager`|


Utwórz sieć o nazwie `rso`, przykładowy XML sieci:
```xml
<network connections="4">
  <name>rso</name>
  <uuid>47c10b95-6fff-49b1-a045-c1cd3186edfb</uuid>
  <forward mode="nat">
    <nat>
      <port start="1024" end="65535"/>
    </nat>
  </forward>
  <bridge name="virbr1" stp="on" delay="0"/>
  <mac address="52:54:00:d9:d8:7c"/>
  <domain name="rso"/>
  <ip address="192.168.100.1" netmask="255.255.255.0">
    <dhcp>
      <range start="192.168.100.128" end="192.168.100.254"/>
      <host mac="52:54:00:75:bc:3b" name="master" ip="192.168.100.10"/>
      <host mac="52:54:00:a8:aa:95" name="worker01" ip="192.168.100.11"/>
      <host mac="52:54:00:ca:b5:fa" name="worker02" ip="192.168.100.12"/>
      <host mac="52:54:00:d0:f3:8a" name="worker03" ip="192.168.100.13"/>
    </dhcp>
  </ip>
</network>
```

Utwórz cztery maszyny `Ubuntu 20.04`.


## Maszyny Ubuntu 20.04

## Kubernetes

echo "source <(kubectl completion bash)" >> /etc/bash.bashrc

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

Warto jednak zajrzeć na stronę [github.com](https://github.com/kubernetes/dashboard) w celu zmienienia wersji.

```bash
root@worker $ kubeadm join ...
```
kubeadm join 192.168.100.10:6443 --token dz2b9w.o0g45d9n3xe9nwlf \
    --discovery-token-ca-cert-hash sha256:18478553679300e33bb6e153b3747f4578e73ef850c60a972e7efea4348849d0

# Instalacja Kubernetes DashBoard

```bash
user@master $ kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.1/aio/deploy/recommended.yaml
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
EOF
```
kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')

## Docker registry

Plik `~/.docker/config.json`:
```json
{
	"auths": {
		"master.rso:5000": {
			"auth": "d29ya2VyOmthcHVzdGE="
		}
	},
	"HttpHeaders": {
		"User-Agent": "Docker-Client/19.03.8 (linux)"
	}
}
```

```
kubectl create secret generic rso-docker-registry-login \
    --from-file=.dockerconfigjson=<path/to/.docker/config.json> \
    --type=kubernetes.io/dockerconfigjson
```

## Instalacja i aktualizacja

## Rest klustra
```bash
kubeadm reset

rm -r /etc/cni/net.d
ip6tables --policy INPUT   ACCEPT;
ip6tables --policy OUTPUT  ACCEPT;
ip6tables --policy FORWARD ACCEPT;
ip6tables -Z; # zero counters
ip6tables -F; # flush (delete) rules
ip6tables -X; # delete all extra chains
iptables --policy INPUT   ACCEPT;
iptables --policy OUTPUT  ACCEPT;
iptables --policy FORWARD ACCEPT;
iptables -Z; # zero counters
iptables -F; # flush (delete) rules
iptables -X; # delete all extra chains
```