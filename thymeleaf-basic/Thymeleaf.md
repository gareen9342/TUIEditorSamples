## 타임리프 특징
- SSR
- 네츄럴 템플릿
- 스프링 통합 지원 

백엔드에서 HTML을 동적으로 렌더링하는 용도로 사용된다.

네츄럴 템플릿 : 순수 HTML을 최대한 유지하는 특징을 이렇게 부른다. 

### text, utext

```html
<li>th:text 사용 <span th:text="${data}">여기 안에 들어감</span></li>
<li>컨텐츠 안에서 직접 출력하기 = [[${data}]]</li>바로 출력하고 싶을 때 사용하는 방법
```

**뷰템플릿사용시 Excape문자열에 주의!! > or <**


기본적으로 escape 처리를 하되, 필요할 때에 강조하고 싶을 때에 unescape

**unescape 하는 법 :** `[[...]] -> [(...)]`

java ===

```java
model.addAttribute("data", "Hello <b>Spring!</b>");
```

html ====
```html
[[...]] = Hello <b>Spring!</b>
[(...)] = Hello Spring!
```

## 변수

SpringEL 표현식


객체 / 리스트/리
```thymeleafexpressions
<h1>SpringEL 표현식</h1>
<ul>Object
    <li>${user.username} =    <span th:text="${user.username}"></span></li>
    <li>${user['username']} = <span th:text="${user['username']}"></span></li>
    <li>${user.getUsername()} = <span th:text="${user.getUsername()}"></span></li>
</ul>
<ul>List
    <li>${users[0].username}    = <span th:text="${users[0].username}"></span></li>
    <li>${users[0]['username']} = <span th:text="${users[0]['username']}"></span></li>
    <li>${users[0].getUsername()} = <span th:text="${users[0].getUsername()}"></span></li>
</ul>
<ul>Map
    <li>${userMap['userA'].username} =  <span th:text="${userMap['userA'].username}"></span></li>
    <li>${userMap['userA']['username']} = <span th:text="${userMap['userA']['username']}"></span></li>
    <li>${userMap['userA'].getUsername()} = <span th:text="${userMap['userA'].getUsername()}"></span></li>
</ul>
```

```thymeleafexpressions
<div th:with="first=${users[0]}"> // 지역변수를 사용할 수 있는 방법 
    <p>처음 사람의 이름은 <span th:text="${first.username}"></span></p>
</div>
```

## 타임리프가 제공하는 기본 객체들

기본적으로 아래와 같은 객체들을 제공한다. 

```
${#request}
${#response}
${#session} 
${#servletContext} 
${#locale}
```


그런데 #request 는 HttpServletRequest 객체가 그대로 제공되기 때문에 데이터를 조회하려면 request.getParameter("Data")와 같이 불편하게 접근해야함. 

이러한 문제를 해결하기 위한 편의 객체들.. 


HTTP 요청 파라미터 접근: param 예) ${param.paramData}

HTTP 세션 접근: session

예) ${session.sessionData}

스프링 빈 접근: @

예) ${@helloBean.hello('Spring!')}


## 유틸리티 객체들..

링크

타임리프 유틸리티 객체 ====================

https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#expression-utility- objects

## java 8의 Date

java 8 의 Date를 사용하려면 추가적인 라이브러리

`#temporals`


```html
${#temporals.day(localDateTime)} = <span th:text="${#temporals.day(localDateTime)}"></span>
```

Date 객체는 이렇게 사용할 수 있다. 

## operation 

no-operation

```html
<ul>
      <li>${data}?: _ = <span th:text="${data}?: _">데이터가 없습니다.</span></li>
      언더바는, 아무런 타임리프 렌더링을 안한단느 뜻, 결국, 일반 html을 렌더링 한다는 뜻
      null 이기 때문에 _ 가 헨더링 된 것이다. 
      <li>${nullData}?: _ = <span th:text="${nullData}?: _">데이터가 없습니다.</span></li>
    </ul>
```

## th 속성값 지정

```html
th로 값을 추가 하게 되면 
<input type="text" name="mock" th:name="userA" />

이렇게 렌더링 된다. 
<input type="text" name="userA" />
```

## 조건문 

조건에 만족하지 않으면, 해당 태그가 전체다 출력이 되지 않는다. 
```html
 <span th:text="'미성년자'" th:if="${user.age lt 20}"></span>
 <span th:text="'미성년자'" th:unless="${user.age ge 20}"></span>
```

## 주석

HTML주석:그대로 남겨둠

타임리프 파서 주석 : 타임리프의 진짜 주석, 렌더링에서 주석 부분을 제거한다. 

타임리프 프로토타입 주석 : HTML 에선 그대로 주석처리가 되지만, 타임리프를 렌더링 한 경우에만 보이는 기능

```html
<!--
<span th:text="${data}">html data</span>
-->

<h1>2. 타임리프 파서 주석</h1>
<!--/* [[${data}]] */-->

<!--/*-->
<span th:text="${data}">html data</span>
<!--*/-->

<h1>3. 타임리프 프로토타입 주석</h1>
<!--/*/
<span th:text="${data}">html data</span>
/*/-->
```

## block

어떤 div 블록을 뭉쳐서 렌더링하고싶을때 each만으로 해결이 어려울 때 

## 자바스크립트 인라인

타임리프는 자바스크립트에서 타임리프를 편리하게 사용할 수 있는 자바슼릡트 인라인 기능을 제공한ㄷ. 

`<script th:inline="javascript">`

자바스크립트는 위와 같이 적용하면 된다. 

자바스크립트와 타임리프 코드를 섞섞할 수 있다. 
