# 帳密檢查機制
初步練習使用者輸入帳號密碼之檢查與現存資料是否相符

## 功能說明
- 使用者資料為:
const users = [
 {
   firstName: 'Tony',
   email: 'tony@stark.com',
   password: 'iamironman'
 },
 {
   firstName: 'Steve',
   email: 'captain@hotmail.com',
   password: 'icandothisallday'
 },
 {
   firstName: 'Peter',
   email: 'peter@parker.com',
   password: 'enajyram'
 },
 {
   firstName: 'Natasha',
   email: 'natasha@gamil.com',
   password: '*parol#@$!'
 },
 {
   firstName: 'Nick',
   email: 'nick@shield.com',
   password: 'password'
 }
]
- 介面提供使用者輸入帳號以及密碼
- 若帳號密碼符合使用者資料，回覆其姓名（firstName）
- 若帳號密碼與使用者資料不相符，則在登入介面提示錯誤