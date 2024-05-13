### Concept blockchain
I developed a basic blockchain concept for a school project. Utilizing Node.js and Express, I built a REST API to manage all blockchain operations, adhering to the MVC design pattern. To ensure robustness, I implemented Vitest for Test-Driven Development (TDD).

### Get started
There a two nodes available for testing purposes in this project. They operate on ports "3001" (node-1) and "3002" (node-2). Make sure that they are available or change the ports in the package.json file.

#### What you need
- Postman to make requests to the server

In your terminal:

**Install all dependencies**
```
npm i
```

**Start a node of your choosing**
```
npm run node-1
```
```
npm run node-2
```

**Create a block**<br>
Pick which node and don't forget to provide data to the body.
```
http://localhost:3001/api/v1/blockchain/mine
```

**Get blockchain**
```
http://localhost:3001/api/v1/blockchain
```

**Get a specific block based on its block index**
```
http://localhost:3001/api/v1/blockchain/**replace this**
```

**List members**
```
http://localhost:3002/api/v1/members
```

**Register a member**
```
http://localhost:3002/api/v1/members/register
```

**Try the concensus method**
```
http://localhost:3002/api/v1/blockchain/concensus
```

