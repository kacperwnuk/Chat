Sprawdzanie poprawności typów
=============================

Przed użyciem każdego obiketu należy sprawdzić czy jest o zgodny z oczekiwanie, tu należy trzymać funkcje za to odpowiedzialne.

## Przykład funkcji

```js
// Importujemy bibliotekę YUP 
import * as yup from "yup";

// Tworzymy ciało naszego obiektu
const requestBody = yup.object({
    session_id: yup.string().required(),
    secret_key: yup.string().required()
});

/**
 *
 * @param data
 * @return {Promise<AuthData>}
 */
export default function (data) {
    return requestBody.validate(data);
}
```

[Link](https://github.com/jquense/yup) do biblioteki YUP