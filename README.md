
# API Code Challenge

A fun project to illustrate my capability building scalable and maintainable applications.




## API Reference

#### Get all items

```http
  GET /api/pull-requests
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `url` | `string` | **Required**. Url of repository |

E.G. /api/pull-requests?url=https://github.com/colinhacks/zod



## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Running Tests

To run tests, after app is running locally in separate terminal, run the following command

```bash
  npm test
```

