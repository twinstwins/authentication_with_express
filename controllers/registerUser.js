module.exports = ('auth/register',function(req,res){
  console.log('登録します！')
    res.render('../views/register',{errors: ""});
});

// 'auth/register'の形でgetで指定されるURLを記述しているが、
// ルーティングとの対応を明確にするための明記である。
// 動作上、必ずしも必要はない。
