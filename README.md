# Getting started

> The Rust functions are in the `src` directory. You can put high performance workload into Rust functions.
> The JavaScript functions are in the `node` directory and they can access the Rust functions.

## use docker to run

```bash
docker run \
-p 3000:3000 \
--rm --it \
-v $(pwd):/app \
secondstate/ssvm-nodejs-starter:v1
```

and then

```bash
cd /app
ssvmup build # build wasm module
npm i # install express
npm start # start server
```

Now, you can test your local server.

```bash
# test express 
curl 0.0.0.0:3000/

# test javascript engine with optimized
curl -H "Content-Type:application/json" -X POST http://0.0.0.0:3000/solve -d '{"engine-select": "javascript", "mode-select": "optimized", "max-number": 10}'

# test javascript engine with brute
curl -H "Content-Type:application/json" -X POST http://0.0.0.0:3000/solve -d '{"engine-select": "javascript", "mode-select": "brute", "max-number": 10}'

# test wasm engine with optimized
curl -H "Content-Type:application/json" -X POST http://0.0.0.0:3000/solve -d '{"engine-select": "wasm", "mode-select": "optimized", "max-number": 10}'

# test wasm engine with brute
curl -H "Content-Type:application/json" -X POST http://0.0.0.0:3000/solve -d '{"engine-select": "wasm", "mode-select": "brute", "max-number": 10}'
```

You can also visit server by browser

## 参考资料

[学rust，免费拿树莓派](https://segmentfault.com/a/1190000023363546)

[入门文档，在Node.js中调用rust函数](https://www.secondstate.io/articles/get-started-with-rust-functions-in-node-zh/)