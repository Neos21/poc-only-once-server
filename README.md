# PoC : Only Once Server

特定のパスにアクセスした時、1度しか情報が閲覧できないサーバを作る。


## How To Use : 試し方

```sh
# 秘密のメッセージファイルを用意する
$ npm run reset
# → secret.txt が生成されていることを確認する

# サーバを起動する
$ npm start
2020-01-01T00:00:00.000Z Server started on 8080

# 通常ページへのアクセス
$ curl http://localhost:8080/
# → You accessed [/]

# 秘密のページへのアクセス (初回) : 秘密のメッセージが閲覧できる
$ curl http://localhost:8080/secret
# → Congratulations! This text can only be seen once!
# (secret.txt は削除される)

# 秘密のページへのアクセス (2回目以降) : 秘密のメッセージが閲覧できない
$ curl http://localhost:8080/secret
# → Already accessed.
```


## How It Works : 仕組み

- 秘密のメッセージを書き込んだ `secret.txt` を用意しておく
- サーバ起動後、秘密のページへのアクセスがあったら `secret.txt` の中身を取得し、`secret.txt` を削除してからレスポンスする → 秘密のメッセージが閲覧できる
- 以降、秘密のページへのアクセスがあっても、`secret.txt` が存在しないため、秘密のメッセージが閲覧できない
- `$ npm run reset` を実行すると、秘密のメッセージを書き込んだ `secret.txt` を生成し直す

当初は、

- 秘密のページへのアクセス時、フラグファイルの存在チェックを行う
- フラグファイルが存在しなければ初回アクセスとみなし、フラグファイルを生成した上でレスポンスする → 秘密のメッセージが閲覧できる
- フラグファイルが存在すれば2度目以降のアクセスとみなし、秘密のメッセージをレスポンスしない

という実装を考えていたが、1度アクセスするとサーバ上からも秘密のメッセージが削除される方がよりセキュア (？) になるかと考え、この実装に至った。


## Author

[Neo](http://neo.s21.xrea.com/) ([@Neos21](https://twitter.com/Neos21))


## Links

- [Neo's World](http://neo.s21.xrea.com/)
- [Corredor](http://neos21.hatenablog.com/)
- [Murga](http://neos21.hatenablog.jp/)
- [El Mylar](http://neos21.hateblo.jp/)
- [Neo's GitHub Pages](https://neos21.github.io/)
- [GitHub - Neos21](https://github.com/Neos21/)
