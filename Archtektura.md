RSO Projekt Architektura
========================

## Opis ogólny

Chat składający się z dwóch serwerów: logowania i sesji.
Użytkownik będzie mógł się zalogować na swój profil za pomocą kilku metod logowania.

Na początku łączy się z serwerem logowania, przesyła mu poświadczenia, a ten zwraca mu adres serwera sesji z którym ma się połączyć.
Dzięki temu będzie możliwość wielokrotnego łączenia się na to samo konto, np. z różnych urządzeń.
Crash jednego serwera nie wpłynie na działanie pozostałych, już uruchomionych.

## Definicje

### Osoba

Wyróżniamy osoby `user(s)`, które odpowiadają fizycznym.
Osoby fizyczne mają kilka metod logowania(np. prze Googla/Facebook'a).

### Logowanie 

Metoda logowania `authMethod`, to sposób na uwierzytelnienie użytkowników aplikacji.
W aplikacji przewiduje istnienie wielu metod logowania.
Każda metoda autoryzacji ma nazwę `name` i parametry `options`.

### Sesja

Sesja `session` jest to fizyczne połączenie zalogowanego użytkownika z aplikacją klienta.
Sesja ma  identyfikator `id` i klucz `secretKey`, który jest tokenem to uwierzytelnienia.

### Wiadomość

Wiadomość `message` jest to wypowiedz użytkownika.
Parametry wiadomości:
 - czas dostarczenia do serwera `read_time`

   jest to czas kiedy serwer dostał wiadomość

 - czas napisania przez użytkownika `app_time`

   jest to czas kiedy wiadomość była napisana
  
 - źródło `from`, które określa od kogo zostało nadane

   będzie to id użytkownika

 - adresat `to:{type,id}`, z określonym typem i id adresata

   Na przykład `to:{type:"user",id:"XYZ"}`, `to:{type:"group",id:"123"}`.
   Implementujemy tylko typ `"user"`.

 - treść `content: (string|object)[]`
  

## Baza danych

### Baza użytkowników

Ta baza podlega pod RODO/GIODO/SRODO.

#### Tabela ludzi:

Tabela zawiera podstawowe informacje o użytkowniku.
Zawiera również flagę oznaczającą usunięcie użytkownika.

 - `id:uuid` - id użytkownika
 - `nation:text` - informacja o nacji(kulturze), czy ma tekst od prawej do lewej itp.
 - `name_family:text` - składowa imienia
 - `name_given:text` - składowa imienia
 - `name_middle:text` - składowa imienia
 - `name_prefix:text` - składowa imienia
 - `name_suffix:text` - składowa imienia
 - `address:text` - adres
 - `deleted:boolean=false` - flaga usunięcia konta

Wszystkie, za wyjątkiem `id` i `deleted` mogą być null, co będzie oznaczało, że konto jest usunięte
 
#### Tabele dla metod logowania

Dla każdego logowania będzie dostępna osobna tabela, jeżeli taka będzie potrzebna.

Ale na nasze potrzeby zaimplementujemy coś takiego:

 - `id:uuid` - id użytkownika
 - `password:text` - hasło użytkownika
  
  
### Baza wiadomości i wszystkiego innego:

#### Tabela sesji

Każda sesja musi być odnotowana.

 - `input_time:timestamp`
 - `id:uuid` - id sesji
 - `user_id:uuid` - id użytkownika
 - `auth_method:text` - nazwa metody logowania jaka była użyta

#### Tabela historii sesji

Do tej tabeli sesje z użytkownikiem będą raportować swój stan.
Tak aby można było określić, kto kiedy się logował.

 - `input_time:timestamp` - czas wejścia do systemu
 - `id:uuid` - id sesji
 - `event:text` - nazwa eventu sesji
 - `params:json` - parametry eventu, tak w postgre jest tym `json` :D, co ułatwia wiele rzeczy

#### Tabela wiadomości

Tabela przechowuje historyczne wiadomości.

 - `input_time:timestamp`
 - `session_id:uuid`
 - `id:uuid`
 - `from:uuid`
 - `to_type:text`
 - `to_id:uuid`
 - `content:json`

## Serwery

Wszystkie komunikacje odbywają się za pośrednictwem funkcji [`fetch`](node-fetch).
Parametry przesyłane po `POST`.
W dalszej części będe adresy URL pisał jakby miąły GET, ale będzie się to odnosiło do POST.

Wszystkie serwery komunikacji będą stały na [`expressjs`](https://expressjs.com/) oraz socketIO do subskrypcji danych.

### Komunikacja

Komunikacja `serwer:serwer` i `klient:serwer` wygląda następująco.

### Serwer CDN

Serwer przechowuje i udostępnia pliki takie jak: html, js, css, png, json.
Dodatkowo przechowuje informacje o obecnie dostępnych serwerach logowania.
Serwerów CDN, może być kilka.

### Serwer logowania

Jest to serwer odpowiadający za logowanie i tworzenie sesji dla użytkowników.
Użytkownik łączy się z serwerem przekazuje mu poświadczenia, czyli nazwę metody autoryzacji `authMethod.name` i parametry `authMethod.options`.
Jeżeli serwer potwierdził autentyczność użytkownika, tworzy tworzy sesje na serwerze sesji, wysyła id i klucz sesji do użytkownika.

#### Komunikacja z serwerem

Komunikacja polega na pojedyńczych zapytaniach REST

|HTTP Method|Zapytanie|Argumenty|Opis|Wartość zwracana|
|---|---|---|---|---|
|GET|`/version`||pobranie wersji serwera|
|POST|`/login`||pobranie|
|GET|`/profile`||pobranie mojego profilu|
|PATCH|`/profile`||zmiana mojego profilu|

### Serwer sesji

Serwer ten odpowiada za komunikacje z użytkownikiem, przyjmowaniem nowych wiadomośći i odpowiadanie na zapytania użytkownika.
Użytkownik łączy się z serwerm i podaje klucz sesji


#### Komunikacja z serwerem

Komunikacja odbywa się za pomocą ciągłego połączenia, SocketIO, ale zapytania REST teź są obsługiwane.

REST:

|HTTP Method|Zapytanie|Argumenty|Opis|Wartość zwracana|
|---|---|---|---|---|
|GET|`/version`||pobranie wersji serwera|

SocketIO

|Zapytanie|Argumenty|Opis|Wartość zwracana|
|---|---|---|---|---|
|`auth`||przesłanie klucza sesji||
|`contacts-get`||pobranie listy kontaktów||
|`message-send`||wysłanie wiadomości||
|`message-get`||pobranie wiadomości||

