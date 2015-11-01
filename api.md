#THENCH API DOCUMENT

현재 로그인 / 회원가입 작성되었음.
##Auth 유의사항 
**```Auth```** 태그가 붙은 모든 api는 AccessToken 인증과정을 거친다.
토큰에 문제가 있을 때에는 다음과 같은 Http Status로 응답을 한다.

| status code | reason |
|:-----------:|:------:|
| 401 | 토큰이 잘못되었을 경우. |
| 403 | 토큰이 만료되었을 경우. |

##User part
###```POST``` : /user | 회원가입한다.
####Request
```js
{
	userId : "Facebook User Id",
	accessToken : "Facebook Access Token",
	refreshToken : "Facebook refresh Token"
}
```
> 페이스북 계정을 통해 로그인 할 경우

```js
{
	email : "사용자의 이메일 (아이디)",
	passwd : "사용자의 password", //MD5 연산 후 결과.
	name : "사용자의 이름"
}
```
> 일반 이메일 계정으로 로그인할 경우

####Response
```js
{
	id : "Thench 내에서 사용될 user의 id", //하나의 해시값임.
	accessToken : "auth 인증을 위한 토큰",
	refreshToken : "accessToken 재발급을 위한 토큰"
}
```

###`Auth` ```GET``` : /user/me | 현재 사용자 정보를 받아온다. 
**Database Schema**를 참조하세요.

###`Auth` ```POST``` : /user/me/refresh | 새로운 accessToken을 발급받는다.

####Request
```js
{
	refreshToken : "저장하고 있던 refreshToken"
}
```

####Response
```js
{
	accessToken : "새로 발급받은 accessToken"
}
```