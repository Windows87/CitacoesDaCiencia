# Science Quotes
This is a API written in NodeJS to get, post, update and delete quotes about any kind of science, like astronomy and math. The objective is support different languages.

## Languages Supported

| Languages  | Quotes |
|------------|--------|
| Portuguese | 86     |

## API Documentation

- [API Documentation](#api-documentation)
  - [Install and Start](#install-and-start)
  - [Get Quotes](#get-quotes)
  - [Get Random Quotes](#get-random-quotes)
  - [Get Quote](#get-quote)
  - [Insert Quote](#insert-quote)
  - [Update Quote](#update-quote)
  - [Delete Quote](#delete-quote)

### Install and Start

#### Start Server
```bash
git clone https://github.com/Windows87/science-quotes ## Clone the repository
cd science-quotes ## Enter in repository path
npm install ## Install dependencies
node index.js ## Start server
```
#### Import Data
```bash
mongoimport --db ScienceQuotes --collection quotes --file ./quotes.json --jsonArray ## Import Quotes
mongo ## Start Mongo Server
```

### Get Quotes
* Method `GET`
* URL `/api/quotes/`
* Queries:

| Query    | Default |
|----------|---------|
| limit    | 10      |
| skip     | 0       |
| category | none    |
| author   | none    |
| language | none    |

* Request Example `/api/quotes/?limit=2&language=pt`

* Successfull Response:
```json
[
    {
        "keywords": [
            "átomo",
            "preconceito"
        ],
        "category": "general",
        "_id": "5d2fb1f5fe1e6e47b2dd2f87",
        "text": "Triste época! É mais fácil desintegrar um átomo do que um preconceito.",
        "author": "Albert Einstein",
        "language": "pt"
    },
    {
        "keywords": [
            "mundo",
            "ponto de apoio"
        ],
        "category": "general",
        "_id": "5d2fb32a36da8247d42e3499",
        "text": "Dai-me um ponto de apoio e levantarei o mundo.",
        "author": "Arquimedes",
        "language": "pt"
    }
]
```

### Get Random Quotes
* Method `GET`
* URL `/api/quotes/random/`
* Queries:

| Query    | Default |
|----------|---------|
| limit    | 1       |
| category | none    |
| author   | none    |
| language | none    |

* Request Example `/api/quotes/random/?language=pt`

* Successfull Response:
```json
[
    {
        "keywords": [
            "ciência"
        ],
        "category": "general",
        "_id": "5d2fbd357a24dc4bc9cf970d",
        "text": "O mais competente não discute, domina a sua ciência e cala-se.",
        "author": "Voltaire",
        "language": "pt"
    }
]
```

### Get Quote
* Method `GET`
* URL `/api/quotes/id`
* Params: `id`

* Request Example `/api/quotes/5d2fb1f5fe1e6e47b2dd2f87`

* Successfull Response:
```json
{
    "keywords": [
        "átomo",
        "preconceito"
    ],
    "category": "general",
    "_id": "5d2fb1f5fe1e6e47b2dd2f87",
    "text": "Triste época! É mais fácil desintegrar um átomo do que um preconceito.",
    "author": "Albert Einstein",
    "language": "pt"
}
```

### Insert Quote
* Method `POST`
* URL `/api/quotes/`
* Body:

| Param    | Required | Expect       |
|----------|----------|--------------|
| text     | true     | String       |
| author   | true     | String       |
| language | true     | pt, en       |
| category | false    | String       |
| keyword  | true     | String Array |

* Body Example:
```json
{
	"text": "De repente eu notei que aquela pequena e bela ervilha azul era a Terra. Eu levantei meu dedão e fechei um olho, e meu dedão cobriu totalmente a Terra. Eu não me senti um gigante. Me senti muito, muito pequeno.",
	"author": "Neil Armstrong",
	"language": "pt",
	"category": "astronomia",
	"keywords": ["Terra"]
}
```
* Successfull Response:
```json
{
    "keywords": [
        "Terra"
    ],
    "category": "astronomia",
    "_id": "5d333b2ecbae70181031b038",
    "text": "De repente eu notei que aquela pequena e bela ervilha azul era a Terra. Eu levantei meu dedão e fechei um olho, e meu dedão cobriu totalmente a Terra. Eu não me senti um gigante. Me senti muito, muito pequeno.",
    "author": "Neil Armstrong",
    "language": "pt",
    "__v": 0
}
```

### Update Quote
* Method `PUT`
* URL `/api/quotes/id`
* Params: `id`
* Body:

| Param    | Required | Expect       |
|----------|----------|--------------|
| text     | false    | String       |
| author   | false    | String       |
| language | false    | pt, en       |
| category | false    | String       |
| keyword  | false    | String Array |

* Request Example `/api/quotes/5d2fb32a36da8247d42e3499`

* Body Example
```json
{
    "category": "fisica"
}
```

* Successfull Response:
```json
{
    "successfull": true
}
```

### Delete Quote
* Method `DELETE`
* URL `/api/quotes/id`
* Params: `id`

* Request Example `/api/quotes/5d2fb32a36da8247d42e3499`

* Successfull Response:
```json
{
    "successfull": true
}
```
