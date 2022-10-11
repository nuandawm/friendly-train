# Pyramids

> There was not a lot that could be done to make Morpork a worse place. A direct hit by a meteorite, for example, would count as gentrification.
> 
> -- <cite>Sir Pterry - Pyramids</cite>

A simple problem about pyramids.

## Dependencies
The project has two dependencies:
- jest - test library
- moment - date maniplation library (used to measure algorithm performances)

To install the project dependencies run
```shell
npm ci
```

## Get started
To run the project using the "simplified Dijkstra" algorithm run
```shell
npm run start
```

To run the project using the "brute force" algorithm run
```shell
npm run start-brute-force
```

## Performance
There's a script to compare the performance of the two implemented
algorithms (_brute force_ and _simplified dijkstra_)

To start the performance script run
```shell
npm run performance-analysis
```

## Tests
To run all tests use
```shell
npm run test
```
