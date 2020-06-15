---
layout: default
title: "Strona domowa"
---

<div class="video_wrapper">
<iframe 
    src="https://www.youtube.com/embed/hFOjz7BhsPo"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
</div>

Projekt zakłada wykonanie systemu komunikacji w postaci chatu.
Użytkownik będzie miał dostęp do listy kontaktów oraz do archiwalnych wiadomości.
Użytkownicy będą się logować do systemu poprzez zewnętrzne uwierzytelnianie np. Google. 

## Wymagania funkcjonalne.

Projekt zakłada spełnienie następujących wymagań funkcjonalnych:

 - wysyłanie i odbieranie wiadomości tekstowych
 - rejestracja
 - logowanie
 - obsługa emotikon
 - podgląd statusu innych użytkowników (dostępny/niedostępny)

## Wymagania niefunkcjonalne.

 - system powinien być skalowalny
 - zgodność z architekturą mikroserwisów
 - system powinien być odporny na ataki typu:
   - SQL Injection
