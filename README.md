## 機能概説

## ◇機能１－１　ユーザーアカウントを作成する機能/ログイン画面からログインする機能/ログインに成功した場合に、ログイン後の画面を表示する機能

基本機能。Sequelizeを用いてDBを操作
セッションの作成には、express-sessionを使用  
bcryptモジュールを使用し、ハッシュ化(=暗号化)してパスワードをセキュアに保存  
　　
## ◇機能１－２　悪意のある別サイトからの、ユーザーアカウント作成のPOST処理で、ユーザーアカウントを作成出来ないようにしてください

CSRF対策。画面上に表示されている入力フォームの情報のみではユーザーを登録できないように処理。csurfを使用し、ユーザー登録フォーム内にhidden_valueとしてCSRFトークンを埋め込む。 
そして、ユーザーが、ユーザー登録用のPOSTメソッドを送信した際、ミドルウェアのcsrfProtectionを通し、CSRFトークンの一致を検証する  
　　
## ◇機能１－３　ログインしていない状態で、ログイン後の画面のURLを入力した場合、ログイン画面を表示し、ログイン成功後、入力したURLの画面を表示してください

RESTはステートレスであり、前回の処理・内容に依存しないことを基本とする。そして、前回の処理・内容を使用したい場合にはsession活用する。この基本原則に従い、セッションを活用する。  
非ログイン状態で、要ログインページにアクセスした場合、「req.session.url」に要ログインページのURLを保存して、ログインページにリダイレクトする。そして、リダイレクト後にログインが完了すると、session.urlに保存された値を利用してリダイレクトする。
  
　　
## ◇機能１－４ ユーザがパスワードを忘れた場合の仕様を考え、機能を作ってください　　
　　
パスワードリセットには、メールを使用し、SMTPサーバーにはMailgunを使用する。　　  
1.パスワードリセットを希望するユーザーのメールアドレス宛に、トークンと当人のメールアドレスがクエリパラメータとして埋め込まれたリセット用URLを送信  
2.ユーザーがメールに記載されたURLをクリックすると、リセット用ページにアクセス  
3.hidden_valueに埋め込まれたトークンと当人のメールアドレスを活用して検証を行い、正しければパスワードを変更
