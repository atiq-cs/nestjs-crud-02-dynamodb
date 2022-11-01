## Nest JS CRUD DynamoDB Example
A barebone Nest JS Application that implements CRUD operations using AWS DynamoDB.

Based on [YT - DynamoDB NodeJS CRUD Example using NestJS](https://www.youtube.com/watch?v=RS4BbdabQhw) however modified,
- Schema (Primary Key)
- Adapts for JS V3 and latest AWS SDK

### AWS Configuration
Primary reference: [GitHub - awsdocs/aws-doc-sdk-examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/dynamodb/src)
- AWS Credentials are linked using AWS ToolKit.
- Region and Table name are defined in `src\db\libs\ddbClient.ts`

### Creating The Table
Let's create the table by running `createTable.js`,

This also helps us to test if our AWS account is properly linked.

```bash
$ nest build
$ node dist\db\media\createTable.js
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


### REST API Requests
After running the app, we can perform REST API client request to the NestJS web app.

Example, http requests can be found at [`REST_requests.http`](https://github.com/atiq-cs/nestjs-crud-02-dynamodb/blob/dev/REST_requests.http). These REST commands/requests are from [VS Code Rest Client](https://github.com/Huachao/vscode-restclient).

We are using HTTP/2 by default. Just replacing the string `HTTP/2` with `HTTP/1.1` in `REST_requests.http` will make it work for earlier versions of servers.

### Features
This Demo/Example demonstrates following,
- NestJS Database Modeling
- Using AWS SDK DynamoDB with NestJS
- using asyc/await pattern, handling promise and catching error in async calls


### DynamoDB Schema
The Table name is defined at `src\db\libs\ddbClient.ts`
Primary Key is a composite key: combines two keys to make it unique,

| Primary Key combines following |        |
| ------------------------------ | ------ |
| slug                           | string |
| year                           | number |

To elaborate the keys, a `slug` is a movie title (or title of a TV Show) obtained by normalizing the string. For example, slug for "The Man Who Knew Infinity" is 'the-man-who-knew-infinity'.

By *normalizing* we mean following here,
- Replace spaces with '-'
- Remove special characters, more specifically anything other than the alphabet and the digits. ref, RegEx: `[^a-z0-9,.-]`


Other attributes in the schema are,

| Other attributes |        |
| ---------------- | ------ |
| title            | string |
| synopsis         | string |
