Sprawdzanie poprawności typów
=============================

Przed użyciem każdego obiketu należy sprawdzić czy jest o zgodny z oczekiwanie, tu należy trzymać funkcje za to odpowiedzialne.

## Przykład funkcji

```typescript
// Importujemy bibliotekę YUP 
import * as yup from "yup";

// Tworzymy ciało naszego obiektu
const requestBody = yup.object({
    session_id: yup.string().required(),
    secret_key: yup.string().required()
});

export default function (data: any): Promise<SessionAuthData> {
    return requestBody.validate(data);
}
```

[Link](https://github.com/jquense/yup) do biblioteki YUP