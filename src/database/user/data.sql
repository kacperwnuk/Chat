-- Generator adresów
-- https://www.fakenamegenerator.com/gen-random-pl-pl.php

truncate table public.users cascade;

insert into public.users
(user_id, law_type, username, name_family, name_given, name_middle, name_prefix, name_suffix, address,
 address_data, deleted, gender, email)
values ('2e655285-63c3-4ca5-b27d-0c74e7a40b87', 'pl', 'a.jedrzejowski', 'Jędrzejowski', 'Adam', null, null, null,
        'ul. Wyzwolenia 68', '{}'::json, false, 'male', 'email1@example.com'),
       ('0b95cb11-b966-44b1-812b-a10279deaf01', 'pl', 's.zielinski', 'Zieliński', 'Sławek', null, null, null,
        'ul. Barwinkowa 128', '{}'::json, false, 'male', 'email2@example.com'),
       ('60ab8649-27bb-43d9-b492-fb5669c070d1', 'pl', 'k.wnuk', 'Wnuk', 'Kacper', null, null, null,
        'ul. Ceglana 98', '{}'::json, false, 'male', 'email3@example.com'),
       ('5cce2d67-a56d-4e1b-80e5-f68b0407988a', 'pl', 'k.najda', 'Najda', 'Krzysztof', null, null, null,
        'ul. Świętopełka 147', '{}'::json, false, 'male', 'email4@example.com'),
       ('c2f833a3-8be3-45fc-986c-351c780c39df', 'pl', 'm.nawrot', 'Nawrot', 'Mateusz', null, null, null,
        'ul. Kurantowa 92', '{}'::json, false, 'male', 'email5@example.com'),
       ('bd68409d-ccdd-482d-808b-a91ee7c5f507', 'pl', 'm.derdak', 'Derdak', 'Michał', null, null, null,
        'ul. Księdza Łazarskiego 75', '{}'::json, false, 'male', 'email6@example.com');

insert into public.basic_auth
    (user_id, password)
values ('2e655285-63c3-4ca5-b27d-0c74e7a40b87', 'adam'),
       ('0b95cb11-b966-44b1-812b-a10279deaf01', 'slawek'),
       ('60ab8649-27bb-43d9-b492-fb5669c070d1', 'kacper'),
       ('5cce2d67-a56d-4e1b-80e5-f68b0407988a', 'krzysztof'),
       ('c2f833a3-8be3-45fc-986c-351c780c39df', 'mateusz'),
       ('bd68409d-ccdd-482d-808b-a91ee7c5f507', 'michal');