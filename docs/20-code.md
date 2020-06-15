---
layout: default
title: "Podział kodu"
---
Podział kodu
============

Podzielimy kod na następująco:

 - `src` - kod źródłowy
   - `backend` - kod należący tylko do backend'u
     - `auth` - kod wykonywalny serwera autoryzacji
     - `cdn` - kod wykonywalny serwera cdn
     - `data` - funkcje manipulacji danych
     - `lib` - różne
     - `session` - kod wykonywalny serwera sesji
   - `frondend` - kod należący tylko do frontend'u
     - `components` - komponenty UI
     - `hooks` - haki pomiędzy UI i resztą systemu
     - `i18n` - tłumaczenia
     - `lib` - różne
     - `redux` - sklep redux, czyli zarządzanie danymi w aplikacji
   - `share` - kod który można użyć w backend'zie i frontend'zie
     - `data-cheker` - funkcje sprawdzające poprawność danych
     
     Proponuje kod opisany w tym [dokumencie](https://github.com/airbnb/javascript).
     Ale za odstępem 4.
     
## .gitignore

Nie dodajemy rzeczy niebędących bezpośrednio związanych z kodem aplikacji:
- pliki IDE, takie jak foldery `.idea` i `.vscode`
- pliki bibliotek `node_modules` itp. 
        
     
     
